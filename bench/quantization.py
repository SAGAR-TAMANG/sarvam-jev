"""Score a GGUF build on a labelled fixture, for the browser demo's model ladder.

The browser demo ships quantized weights while every published figure is for native
BF16. This runs the same fixture and the same metric through llama.cpp so the ladder
can state a measured number instead of asking visitors to assume quantization is free.

It deliberately mirrors the browser engine rather than the Python one: answer slots
are discovered by probing llama.cpp's tokenizer, and options are read back from a
constrained one-token completion with an equal logit bias on every answer letter.

Usage:
    python bench/quantization.py --gguf sarvam-1-Q4_K_M.gguf --label Q4_K_M \
        --input reference/openjev/benchmarks/data/authored144.jsonl \
        --output results/local/quant-q4km.json
"""

from __future__ import annotations

import argparse
import json
import math
import statistics
import sys
import time
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "src"))

from sarvam_jev.core import LETTERS, build_prompt, validate_row  # noqa: E402
from sarvam_jev.metrics import summarize  # noqa: E402


def probe_slots(llm, tokenizer, sample_row) -> tuple[list[int], str]:
    """Find answer-letter ids under llama.cpp's tokenizer, exactly as the page does."""
    wide = {**sample_row,
            "options": [{"id": f"o{i}", "description": f"Option {i}"} for i in range(len(LETTERS))]}
    prompt = "".join(build_prompt(tokenizer, wide, "completion", 3))
    base = llm.tokenize(prompt.encode(), add_bos=False, special=False)
    for separator in (" ", ""):
        ids = []
        for letter in LETTERS:
            full = llm.tokenize((prompt + separator + letter).encode(), add_bos=False, special=False)
            if len(full) != len(base) + 1 or full[: len(base)] != base:
                ids = []
                break
            ids.append(full[-1])
        if ids and len(set(ids)) == len(ids):
            return ids, separator
    raise RuntimeError("No answer-letter continuation keeps the prompt boundary stable")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__,
                                     formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--gguf", type=Path, required=True)
    parser.add_argument("--label", required=True, help="quantization name, e.g. Q4_K_M")
    parser.add_argument("--input", type=Path, required=True)
    parser.add_argument("--output", type=Path, required=True)
    parser.add_argument("--tokenizer", default="sarvamai/sarvam-1")
    parser.add_argument("--n-gpu-layers", type=int, default=0)
    parser.add_argument("--limit", type=int, default=0)
    args = parser.parse_args()

    if args.output.exists():
        parser.error(f"Output {args.output} already exists; benchmark outputs are create-only")

    from llama_cpp import Llama
    from transformers import AutoTokenizer

    rows = [json.loads(line) for line in args.input.read_text().splitlines() if line.strip()]
    if args.limit:
        rows = rows[: args.limit]
    for row in rows:
        validate_row(row)
        if not isinstance(row.get("label"), int):
            raise ValueError(f"Row {row['id']} has no integer gold label")

    tokenizer = AutoTokenizer.from_pretrained(args.tokenizer)
    print(f"Loading {args.gguf.name} ...", flush=True)
    llm = Llama(model_path=str(args.gguf), n_ctx=4096, n_gpu_layers=args.n_gpu_layers,
                verbose=False, logits_all=True)
    slots, separator = probe_slots(llm, tokenizer, rows[0])
    print(f"Answer slots {slots[:6]}… separator={separator!r}", flush=True)

    records, latencies, masses = [], [], []
    started = time.perf_counter()
    for index, row in enumerate(rows, 1):
        prompt = "".join(build_prompt(tokenizer, row, "completion", 3))
        count = len(row["options"])
        # Pass tokens, not a string. A string prompt is tokenized with add_bos=True,
        # which prepends a BOS the Python engine never sends -- enough to shift a
        # near-indifferent model's argmax and drag the whole score toward chance.
        tokens = llm.tokenize(prompt.encode(), add_bos=False, special=False)
        call = time.perf_counter()
        output = llm(tokens, max_tokens=1, temperature=1.0, top_k=0, top_p=1.0,
                     logprobs=len(LETTERS) + 8,
                     logit_bias={slots[i]: 100.0 for i in range(count)})
        latencies.append(time.perf_counter() - call)

        top = output["choices"][0]["logprobs"]["top_logprobs"][0]
        values = []
        for i in range(count):
            key = next((k for k in top if k.strip() == LETTERS[i]), None)
            values.append(top[key] if key is not None else None)
        if any(v is None for v in values):
            raise RuntimeError(f"Row {row['id']}: model returned no score for every option")

        peak = max(values)
        weights = [math.exp(v - peak) for v in values]
        total = sum(weights)
        probabilities = [w / total for w in weights]
        # Share of returned mass sitting on the answer letters, as a health check.
        masses.append(sum(math.exp(v) for v in values))
        best = max(range(count), key=probabilities.__getitem__)

        records.append({
            "id": row["id"],
            "family": row.get("family", "all"),
            "option_ids": [o["id"] for o in row["options"]],
            "probabilities": probabilities,
            "gold_id": row["options"][row["label"]]["id"],
            "predicted_id": row["options"][best]["id"],
            "predicted_probability": probabilities[best],
        })
        if index % 25 == 0 or index == len(rows):
            print(f"  {index}/{len(rows)}", flush=True)

    wall = time.perf_counter() - started
    summary = summarize(records)
    report = {
        "schema": "sarvam-jev-quantization-v1",
        "build": {"gguf": args.gguf.name, "label": args.label,
                  "source": "bartowski/sarvam-1-GGUF",
                  "revision": "3bcf10bf1d019a55a8824cb648eb1b990a05ed41",
                  "n_gpu_layers": args.n_gpu_layers},
        "fixture": {"path": str(args.input), "rows": len(rows)},
        "readout": {"slots": slots[:8], "separator": separator,
                    "engine": "llama.cpp via llama-cpp-python",
                    "bos": "not prepended, matching the Python engine"},
        "quality": summary,
        "diagnostics": {"median_allowed_token_mass": statistics.median(masses)},
        "timing": {"wall_seconds": wall, "median_readout_seconds": statistics.median(latencies)},
        "probability_status": "conditional option score; uncalibrated as decision confidence",
    }
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(report, indent=2, allow_nan=False) + "\n")
    args.output.with_suffix(".predictions.jsonl").write_text(
        "".join(json.dumps(r, allow_nan=False) + "\n" for r in records))

    print()
    print(f"{args.label}: mean family balanced accuracy "
          f"{summary['mean_family_balanced_accuracy']:.4f} "
          f"(chance {summary['chance_balanced_accuracy']:.4f})")
    print(f"wrote {args.output}")


if __name__ == "__main__":
    main()
