"""Autoregressive JSON baseline, streamed token by token.

This is the path the decision readout replaces: ask the model to write its answers
as a JSON object and decode them one token at a time. It exists to be measured
against, so it is given every reasonable advantage — greedy decoding, a compact
output shape with no explanations, few-shot demonstrations of the exact format, and
an early stop as soon as the object closes.

Timings are wall-clock from the same start point the readout uses: prompt
construction, tokenization, prefill and decode all count.
"""

from __future__ import annotations

import json
import re
import time
from typing import Any, Generator

from .core import LETTERS, INSTRUCTION, render_state, validate_row

PROMPT_VERSION = "sarvam-jev-json-generation-v1"

GENERATION_INSTRUCTION = (
    "Apply each criterion to the evidence and choose one listed option for each. "
    "Answer with only a JSON object mapping every criterion key to the id of the "
    "chosen option."
)

# Same demonstrations as the readout path, rendered in the generation format so
# neither path is handicapped by an unfamiliar layout. Keys follow the same q1..qN
# convention the server assigns to real requests, so the baseline is shown the exact
# pattern it is asked to reproduce.
FEWSHOT = [
    {
        "state": "The parcel left the Chennai sorting facility on Tuesday. "
                 "The recipient reports it has not arrived.",
        "criteria": [
            {"key": "q1",
             "question": "Assess the claim: the parcel has been delivered.",
             "options": [("supported", "The evidence establishes the claim"),
                         ("insufficient", "The evidence does not establish either"),
                         ("contradicted", "The evidence establishes the opposite")],
             "answer": "contradicted"},
            {"key": "q2",
             "question": "Assess the claim: the parcel was dispatched.",
             "options": [("supported", "The evidence establishes the claim"),
                         ("insufficient", "The evidence does not establish either"),
                         ("contradicted", "The evidence establishes the opposite")],
             "answer": "supported"},
        ],
    },
    {
        "state": "A customer writes that their card was charged twice for one order "
                 "and asks for one of the charges to be reversed.",
        "criteria": [
            {"key": "q1",
             "question": "Which queue should handle this request?",
             "options": [("access", "Account access and authentication support"),
                         ("billing", "Billing and payment support"),
                         ("sales", "Sales and product evaluation")],
             "answer": "billing"},
            {"key": "q2",
             "question": "Is a refund being requested?",
             "options": [("yes", "A refund is requested"),
                         ("no", "No refund is requested")],
             "answer": "yes"},
        ],
    },
]


def _render(state, criteria: list[dict]) -> str:
    """Render one evidence block plus every criterion and its options."""
    lines = [f"Evidence:\n{render_state(state)}\n", "Criteria:"]
    for criterion in criteria:
        lines.append(f'- {criterion["key"]}: {criterion["question"]}')
        for option_id, description in criterion["options"]:
            lines.append(f"    {option_id} = {description}")
    lines.append("Answers (JSON):")
    return "\n".join(lines)


def build_prompt(state, criteria: list[dict]) -> str:
    parts = [GENERATION_INSTRUCTION, ""]
    for example in FEWSHOT:
        answer = {item["key"]: item["answer"] for item in example["criteria"]}
        parts.append(
            _render(example["state"], example["criteria"])
            + " " + json.dumps(answer, ensure_ascii=False) + "\n"
        )
    parts.append(_render(state, criteria))
    return "\n".join(parts)


def _criteria_from_rows(rows: list[dict]) -> list[dict]:
    return [
        {
            "key": row["id"],
            "question": row["question"],
            "options": [(option["id"], option["description"]) for option in row["options"]],
        }
        for row in rows
    ]


def stream_json_generation(model, tokenizer, rows: list[dict], metadata: dict,
                           max_new_tokens: int = 384) -> Generator[dict[str, Any], None, None]:
    """Greedily decode a JSON answer object, yielding one event per token.

    Yields ``{"type": "token", ...}`` events followed by a single ``{"type": "done"}``
    carrying the parse verdict and timings.
    """
    import torch

    for row in rows:
        validate_row(row)

    started = time.perf_counter()
    criteria = _criteria_from_rows(rows)
    prompt = build_prompt(rows[0]["state"], criteria)
    ids = tokenizer.encode(prompt, add_special_tokens=False)
    device = next(model.parameters()).device
    sync = lambda: torch.cuda.synchronize(device) if device.type == "cuda" else None

    stops = {tokenizer.eos_token_id}
    tokens: list[int] = []
    text = ""
    first_token_seconds = None
    depth = 0
    seen_open = False

    with torch.inference_mode():
        current = torch.tensor([ids], dtype=torch.long, device=device)
        cache = None
        for _ in range(max_new_tokens):
            output = model(
                input_ids=current,
                past_key_values=cache,
                use_cache=True,
                return_dict=True,
                logits_to_keep=1,
            )
            cache = output.past_key_values
            token = int(output.logits[0, -1, :].argmax())
            sync()
            if token in stops:
                break
            tokens.append(token)
            piece = tokenizer.decode([token])
            text += piece
            if first_token_seconds is None:
                first_token_seconds = time.perf_counter() - started
            yield {
                "type": "token",
                "token": piece,
                "token_count": len(tokens),
                "elapsed_seconds": time.perf_counter() - started,
            }
            # Stop as soon as the object closes; the baseline gets no penalty for
            # whatever it would have rambled afterwards.
            for character in piece:
                if character == "{":
                    depth += 1
                    seen_open = True
                elif character == "}":
                    depth -= 1
            if seen_open and depth <= 0:
                break
            current = torch.tensor([[token]], dtype=torch.long, device=device)

    elapsed = time.perf_counter() - started

    parsed, valid, error = None, False, None
    match = re.search(r"\{.*\}", text, re.DOTALL)
    if match:
        try:
            parsed = json.loads(match.group(0))
            valid = isinstance(parsed, dict)
        except json.JSONDecodeError as problem:
            error = str(problem)
    else:
        error = "no JSON object found in the generated text"

    expected = {row["id"] for row in rows}
    allowed = {row["id"]: {option["id"] for option in row["options"]} for row in rows}
    missing = sorted(expected - set(parsed)) if valid else sorted(expected)
    hallucinated = sorted(set(parsed) - expected) if valid else []
    out_of_range = sorted(
        key for key, value in (parsed or {}).items()
        if key in allowed and value not in allowed[key]
    ) if valid else []

    yield {
        "type": "done",
        "result": {
            "mode": "autoregressive_json",
            "raw_text": text,
            "parsed": parsed,
            "is_valid_json": valid,
            "parse_error": error,
            "missing_keys": missing,
            "hallucinated_keys": hallucinated,
            "out_of_range_values": out_of_range,
            "schema_match": valid and not missing and not hallucinated and not out_of_range,
            "input_tokens": len(ids),
            "generated_tokens": len(tokens),
            "first_token_seconds": first_token_seconds,
            "total_seconds": elapsed,
            "tokens_per_second": len(tokens) / elapsed if elapsed > 0 else 0.0,
            "forward_passes": len(tokens) + 1,
            "hit_token_cap": len(tokens) >= max_new_tokens,
            "prompt_version": PROMPT_VERSION,
            "model": metadata,
        },
    }
