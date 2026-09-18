"""Direct categorical decision readout from native next-token logits.

One forward pass per decision, batch size one. No token is sampled: the answer is
read from the logits sitting at the declared answer-letter slots.
"""

from __future__ import annotations

import inspect
import time

from .core import answer_slots, build_prompt, digest, softmax

PROMPT_VERSION = "sarvam-jev-letters-v1"


def _forward(model, inputs):
    parameters = inspect.signature(model.forward).parameters
    kwargs = dict(inputs, use_cache=False, return_dict=True)
    if "logits_to_keep" in parameters:
        kwargs["logits_to_keep"] = 1
    return model(**kwargs).logits[:, -1, :]


def encode_prompt(tokenizer, row: dict, style: str, shots: int, max_tokens: int):
    """Encode one decision and verify its answer slots at the exact boundary."""
    head, tail = build_prompt(tokenizer, row, style, shots)
    prompt = head + tail
    ids = tokenizer.encode(prompt, add_special_tokens=False)
    if not ids or len(ids) > max_tokens:
        raise ValueError(
            f"Row {row['id']}: {len(ids)} input tokens exceed limit {max_tokens}; no truncation allowed"
        )
    slots, separator = answer_slots(tokenizer, prompt, len(row["options"]))
    return ids, slots, digest(prompt), separator


def score(model, tokenizer, row: dict, metadata: dict, style: str = "completion",
          shots: int = 3, max_tokens: int = 4096) -> dict:
    import torch

    started = time.perf_counter()
    ids, slots, prompt_hash, separator = encode_prompt(tokenizer, row, style, shots, max_tokens)
    device = next(model.parameters()).device
    inputs = {
        "input_ids": torch.tensor([ids], dtype=torch.long, device=device),
        "attention_mask": torch.ones((1, len(ids)), dtype=torch.long, device=device),
    }
    sync = lambda: torch.cuda.synchronize(device) if device.type == "cuda" else None
    sync()
    forward_start = time.perf_counter()
    with torch.inference_mode():
        vocabulary = _forward(model, inputs)[0].float()
    sync()
    forward_seconds = time.perf_counter() - forward_start
    selected_tensor = vocabulary[slots]
    selected = selected_tensor.cpu().tolist()
    return {
        "id": row["id"],
        "option_ids": [option["id"] for option in row["options"]],
        "probabilities": softmax(selected),
        "option_logits": selected,
        "answer_token_ids": slots,
        "answer_separator": separator,
        "input_tokens": len(ids),
        "allowed_token_mass": float(
            (selected_tensor.logsumexp(-1) - vocabulary.logsumexp(-1)).exp()
        ),
        "full_vocab_argmax_id": int(vocabulary.argmax()),
        "forward_seconds": forward_seconds,
        "total_seconds": time.perf_counter() - started,
        "prompt_sha256": prompt_hash,
        "prompt_version": PROMPT_VERSION,
        "prompt_style": style,
        "shots": shots,
        "model": metadata,
        "readout": "native full-vocabulary last-position logits restricted to declared answer slots",
        "probability_status": "conditional option score; uncalibrated as decision confidence",
    }
