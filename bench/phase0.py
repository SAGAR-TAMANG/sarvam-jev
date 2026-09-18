"""Phase 0 go/no-go gate.

Score a labelled decision fixture with the direct letter-slot readout and report
mean family balanced accuracy, so a Sarvam number can be placed on the same scale
as openjev's published browser model ladder:

    Qwen3-0.6B      0.440   (chance on 3 options is 0.333)
    MiniCPM5-2B     0.686
    Qwen3.5-4B      0.813

Usage:
    python bench/phase0.py --model sarvamai/sarvam-1 \
        --input reference/openjev/benchmarks/data/authored144.jsonl \
        --output results/local/phase0-sarvam1.json
"""

from __future__ import annotations

import argparse
import json
import statistics
import sys
import time
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "src"))

from sarvam_jev.core import load_causal_model, validate_row  # noqa: E402
from sarvam_jev.direct import score  # noqa: E402
from sarvam_jev.metrics import summarize  # noqa: E402


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__,
                                     formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--model", required=True)
    parser.add_argument("--revision", default="")
    parser.add_argument("--input", type=Path, required=True)
    parser.add_argument("--output", type=Path, required=True)
    parser.add_argument("--style", choices=("completion", "chat"), default="completion")
    parser.add_argument("--shots", type=int, default=3)
    parser.add_argument("--limit", type=int, default=0, help="score only the first N rows")
    parser.add_argument("--max-tokens", type=int, default=4096)
    parser.add_argument("--trust-remote-code", action="store_true")
    args = parser.parse_args()

    if args.output.exists():
        parser.error(f"Output {args.output} already exists; benchmark outputs are create-only")

    rows = [json.loads(line) for line in args.input.read_text().splitlines() if line.strip()]
    if args.limit:
        rows = rows[: args.limit]
    if not rows:
        parser.error("Input is empty")
    for row in rows:
        validate_row(row)
        if not isinstance(row.get("label"), int):
            raise ValueError(f"Row {row['id']} has no integer gold label")

    print(f"Loading {args.model} ...", flush=True)
    model, tokenizer, metadata = load_causal_model(
        args.model, args.revision, trust_remote_code=args.trust_remote_code
    )
    print(f"Loaded on {metadata['device']} ({metadata['dtype']}).", flush=True)

    records, latencies = [], []
    started = time.perf_counter()
    for index, row in enumerate(rows, 1):
        result = score(model, tokenizer, row, metadata,
                       style=args.style, shots=args.shots, max_tokens=args.max_tokens)
        predicted = max(range(len(result["probabilities"])),
                        key=result["probabilities"].__getitem__)
        records.append({
            **result,
            "family": row.get("family", "all"),
            "gold_id": row["options"][row["label"]]["id"],
            "predicted_id": result["option_ids"][predicted],
            "predicted_probability": result["probabilities"][predicted],
        })
        latencies.append(result["forward_seconds"])
        if index % 25 == 0 or index == len(rows):
            print(f"  {index}/{len(rows)}", flush=True)
    wall_seconds = time.perf_counter() - started

    summary = summarize(records)
    mass = [record["allowed_token_mass"] for record in records]
    report = {
        "schema": "sarvam-jev-phase0-v1",
        "model": metadata,
        "fixture": {"path": str(args.input), "rows": len(rows)},
        "prompt": {"style": args.style, "shots": args.shots,
                   "version": records[0]["prompt_version"]},
        "quality": summary,
        "diagnostics": {
            "median_allowed_token_mass": statistics.median(mass),
            "min_allowed_token_mass": min(mass),
            "answer_separator": records[0]["answer_separator"],
            "median_input_tokens": statistics.median(r["input_tokens"] for r in records),
        },
        "timing": {
            "wall_seconds": wall_seconds,
            "decisions_per_second": len(rows) / wall_seconds,
            "median_forward_seconds": statistics.median(latencies),
        },
        "probability_status": "conditional option score; uncalibrated as decision confidence",
    }

    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(report, indent=2, allow_nan=False) + "\n")
    predictions = args.output.with_suffix(".predictions.jsonl")
    predictions.write_text(
        "".join(json.dumps(record, allow_nan=False) + "\n" for record in records)
    )

    print()
    print(f"mean family balanced accuracy : {summary['mean_family_balanced_accuracy']:.4f}")
    print(f"chance                        : {summary['chance_balanced_accuracy']:.4f}")
    print(f"accuracy                      : {summary['accuracy']:.4f}")
    for name, value in summary["family_results"].items():
        print(f"  {name:28} n={value['n']:3}  bal_acc={value['balanced_accuracy']:.4f}")
    print(f"median allowed-token mass     : {statistics.median(mass):.4f}")
    print(f"wrote {args.output} and {predictions}")


if __name__ == "__main__":
    main()
