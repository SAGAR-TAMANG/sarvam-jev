"""Verify the shared-state path against fresh scoring, and measure what it buys.

Groups a fixture by exact state, scores each group both ways, and reports argmax
agreement and probability drift alongside the throughput difference. BF16 batching is
not bit-exact, so some drift is expected; the point is to measure it rather than
assume it away.

Usage:
    python bench/shared_check.py --model sarvamai/sarvam-1 \
        --input reference/openjev/benchmarks/data/authored144.jsonl \
        --output results/local/shared-check.json
"""

from __future__ import annotations

import argparse
import json
import statistics
import sys
import time
from collections import defaultdict
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "src"))

from sarvam_jev.core import load_causal_model, render_state, validate_row  # noqa: E402
from sarvam_jev.direct import score  # noqa: E402
from sarvam_jev.shared import score_shared  # noqa: E402


def argmax(values: list[float]) -> int:
    return max(range(len(values)), key=values.__getitem__)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__,
                                     formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--model", required=True)
    parser.add_argument("--revision", default="")
    parser.add_argument("--input", type=Path, required=True)
    parser.add_argument("--output", type=Path, required=True)
    parser.add_argument("--style", choices=("completion", "chat"), default="completion")
    parser.add_argument("--shots", type=int, default=3)
    parser.add_argument("--min-group", type=int, default=2)
    args = parser.parse_args()

    if args.output.exists():
        parser.error(f"Output {args.output} already exists; benchmark outputs are create-only")

    rows = [json.loads(line) for line in args.input.read_text().splitlines() if line.strip()]
    for row in rows:
        validate_row(row)
    groups: dict[str, list[dict]] = defaultdict(list)
    for row in rows:
        groups[render_state(row["state"])].append(row)
    groups = {key: value for key, value in groups.items() if len(value) >= args.min_group}
    if not groups:
        parser.error("No state is shared by enough rows to exercise the shared path")

    print(f"Loading {args.model} ...", flush=True)
    model, tokenizer, metadata = load_causal_model(args.model, args.revision)
    print(f"Loaded on {metadata['device']} ({metadata['dtype']}).", flush=True)

    # Warm the kernels so the first group does not absorb compilation cost.
    first = next(iter(groups.values()))
    score_shared(model, tokenizer, first, metadata, args.style, args.shots)
    score(model, tokenizer, first[0], metadata, args.style, args.shots)

    fresh_seconds = shared_seconds = 0.0
    decisions = agreements = 0
    drifts, sizes, speedups = [], [], []

    for index, members in enumerate(groups.values(), 1):
        started = time.perf_counter()
        fresh = [score(model, tokenizer, row, metadata, args.style, args.shots) for row in members]
        fresh_elapsed = time.perf_counter() - started

        started = time.perf_counter()
        parallel, timing = score_shared(model, tokenizer, members, metadata, args.style, args.shots)
        shared_elapsed = time.perf_counter() - started

        fresh_seconds += fresh_elapsed
        shared_seconds += shared_elapsed
        sizes.append(len(members))
        speedups.append(fresh_elapsed / max(shared_elapsed, 1e-9))
        for a, b in zip(fresh, parallel):
            decisions += 1
            agreements += argmax(a["probabilities"]) == argmax(b["probabilities"])
            drifts.append(max(abs(x - y) for x, y in
                              zip(a["probabilities"], b["probabilities"])))
        if index % 10 == 0 or index == len(groups):
            print(f"  {index}/{len(groups)} groups", flush=True)

    report = {
        "schema": "sarvam-jev-shared-check-v1",
        "model": metadata,
        "fixture": {"path": str(args.input), "groups": len(groups), "decisions": decisions},
        "prompt": {"style": args.style, "shots": args.shots},
        "group_sizes": {"min": min(sizes), "max": max(sizes),
                        "median": statistics.median(sizes)},
        "agreement": {
            "argmax_agreement": f"{agreements}/{decisions}",
            "argmax_agreement_rate": agreements / decisions,
            "max_probability_drift": max(drifts),
            "median_probability_drift": statistics.median(drifts),
        },
        "throughput": {
            "fresh_seconds": fresh_seconds,
            "shared_seconds": shared_seconds,
            "fresh_decisions_per_second": decisions / fresh_seconds,
            "shared_decisions_per_second": decisions / shared_seconds,
            "overall_speedup": fresh_seconds / shared_seconds,
            "median_group_speedup": statistics.median(speedups),
        },
        "note": "BF16 batching is not bit-exact; drift between paths is expected and measured, not assumed away.",
    }
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(report, indent=2, allow_nan=False) + "\n")

    print()
    print(f"groups                  : {len(groups)} (sizes {min(sizes)}-{max(sizes)})")
    print(f"decisions               : {decisions}")
    print(f"argmax agreement        : {agreements}/{decisions} "
          f"({100 * agreements / decisions:.2f}%)")
    print(f"max probability drift   : {max(drifts):.5f}")
    print(f"fresh                   : {fresh_seconds:.2f} s "
          f"({decisions / fresh_seconds:.2f} dec/s)")
    print(f"shared                  : {shared_seconds:.2f} s "
          f"({decisions / shared_seconds:.2f} dec/s)")
    print(f"overall speedup         : {fresh_seconds / shared_seconds:.2f}x")
    print(f"wrote {args.output}")


if __name__ == "__main__":
    main()
