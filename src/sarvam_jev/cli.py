"""Create-only JSONL decision scorer."""

from __future__ import annotations

import argparse
import json
from pathlib import Path

from .core import load_causal_model, validate_row
from .direct import score as direct_score
from .shared import score_shared


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--mode", choices=("direct", "shared"), required=True)
    parser.add_argument("--model", required=True)
    parser.add_argument("--revision", default="")
    parser.add_argument("--input", type=Path, required=True)
    parser.add_argument("--output", type=Path, required=True)
    parser.add_argument("--style", choices=("completion", "chat"), default="completion")
    parser.add_argument("--shots", type=int, default=3)
    parser.add_argument("--max-tokens", type=int, default=4096)
    parser.add_argument("--trust-remote-code", action="store_true")
    args = parser.parse_args()

    if args.output.exists() or args.max_tokens < 1:
        parser.error("Output must be new and max-tokens must be positive")
    rows = [json.loads(line) for line in args.input.read_text().splitlines() if line.strip()]
    if not rows:
        parser.error("Input is empty")
    for row in rows:
        validate_row(row)

    model, tokenizer, metadata = load_causal_model(
        args.model, args.revision, trust_remote_code=args.trust_remote_code
    )
    args.output.parent.mkdir(parents=True, exist_ok=True)
    with args.output.open("x") as destination:
        if args.mode == "shared":
            results, timing = score_shared(
                model, tokenizer, rows, metadata, args.style, args.shots, args.max_tokens
            )
            for result in results:
                destination.write(json.dumps({**result, "shared_timing": timing}, allow_nan=False) + "\n")
        else:
            for row in rows:
                result = direct_score(
                    model, tokenizer, row, metadata, args.style, args.shots, args.max_tokens
                )
                destination.write(json.dumps(result, allow_nan=False) + "\n")
                destination.flush()


if __name__ == "__main__":
    main()
