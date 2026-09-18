"""Parallel decisions over one shared state using a native prefix KV cache.

Prefill the state once, replicate the cache across the branch batch, then evaluate
every criterion's suffix in a single padded forward pass. Branches are isolated by
the batch dimension, so no criterion can see another's text.

This is the JEV *interface*, not JEV's architecture: the state KV is still held once
per branch. Replacing that with a single packed sequence under a block-diagonal mask
is phase 2.
"""

from __future__ import annotations

import inspect
import time

from .core import build_prompt, softmax
from .direct import PROMPT_VERSION, encode_prompt


def state_prefix(tokenizer, row: dict, style: str, shots: int) -> list[int]:
    """Token IDs of the shared head, trimmed by one token.

    The last token is dropped because the character that follows the state can merge
    into it, which would make the head stop being an exact token-level prefix of the
    full prompt.
    """
    head, _ = build_prompt(tokenizer, row, style, shots)
    ids = tokenizer.encode(head, add_special_tokens=False)
    if len(ids) < 2:
        raise ValueError("Shared head is too short to form a prefix")
    return ids[:-1]


def _suffix_layout(sequences: list[list[int]], prefix_length: int, pad_id: int):
    """Right-pad branch suffixes and give each one positions continuing the prefix."""
    if not sequences or any(not sequence for sequence in sequences):
        raise ValueError("Every decision needs a nonempty suffix")
    width = max(map(len, sequences))
    ids, masks, positions, ends = [], [], [], []
    for sequence in sequences:
        padding = width - len(sequence)
        ids.append(sequence + [pad_id] * padding)
        masks.append([1] * (prefix_length + len(sequence)) + [0] * padding)
        positions.append(list(range(prefix_length, prefix_length + len(sequence))) + [0] * padding)
        ends.append(len(sequence) - 1)
    return {"input_ids": ids, "attention_mask": masks, "position_ids": positions}, ends


def score_shared(model, tokenizer, rows: list[dict], metadata: dict,
                 style: str = "completion", shots: int = 3, max_tokens: int = 4096):
    """Return every option distribution together after one state prefill."""
    import torch

    if not rows:
        raise ValueError("Shared scoring needs at least one decision")
    if any(row["state"] != rows[0]["state"] for row in rows[1:]):
        raise ValueError("Shared scoring requires one exact state across all rows")
    if len({row["id"] for row in rows}) != len(rows):
        raise ValueError("Decision IDs must be unique")

    started = time.perf_counter()
    encoded = [encode_prompt(tokenizer, row, style, shots, max_tokens) for row in rows]
    prefix = state_prefix(tokenizer, rows[0], style, shots)
    if not prefix or any(ids[: len(prefix)] != prefix or len(ids) <= len(prefix)
                         for ids, _, _, _ in encoded):
        raise ValueError("The fixed state prefix does not match every full prompt")

    pad = tokenizer.pad_token_id if tokenizer.pad_token_id is not None else tokenizer.eos_token_id
    if pad is None:
        raise ValueError("Tokenizer requires a padding or EOS token")
    layout, ends = _suffix_layout(
        [ids[len(prefix):] for ids, _, _, _ in encoded], len(prefix), pad
    )
    selected_positions = sorted(set(ends))
    encode_seconds = time.perf_counter() - started

    device = next(model.parameters()).device
    sync = lambda: torch.cuda.synchronize(device) if device.type == "cuda" else None
    parameters = inspect.signature(model.forward).parameters
    if "logits_to_keep" not in parameters:
        raise RuntimeError("Model lacks selective-position logits needed by shared scoring")

    model.eval()
    with torch.inference_mode():
        sync()
        mark = time.perf_counter()
        output = model(
            input_ids=torch.tensor([prefix], dtype=torch.long, device=device),
            attention_mask=torch.ones((1, len(prefix)), dtype=torch.long, device=device),
            use_cache=True,
            return_dict=True,
            logits_to_keep=1,
        )
        cache = output.past_key_values
        del output
        sync()
        prefill_seconds = time.perf_counter() - mark
        if cache is None or cache.get_seq_length() != len(prefix):
            raise RuntimeError("Invalid native prefix cache")
        if not callable(getattr(cache, "reorder_cache", None)):
            raise RuntimeError("Native cache does not support duplicate branch selection")

        sync()
        mark = time.perf_counter()
        cache.reorder_cache(torch.zeros(len(rows), dtype=torch.long, device=device))
        sync()
        replicate_seconds = time.perf_counter() - mark

        inputs = {key: torch.tensor(value, dtype=torch.long, device=device)
                  for key, value in layout.items()}
        sync()
        mark = time.perf_counter()
        output = model(
            **inputs,
            past_key_values=cache,
            use_cache=True,
            return_dict=True,
            logits_to_keep=torch.tensor(selected_positions, dtype=torch.long, device=device),
        )
        sync()
        suffix_seconds = time.perf_counter() - mark

        results = []
        for index, (row, (ids, slots, prompt_hash, separator)) in enumerate(zip(rows, encoded)):
            vocabulary = output.logits[index, selected_positions.index(ends[index]), :].float()
            selected_tensor = vocabulary[slots]
            selected = selected_tensor.cpu().tolist()
            results.append({
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
                "prompt_sha256": prompt_hash,
                "prompt_version": PROMPT_VERSION,
                "prompt_style": style,
                "shots": shots,
                "model": {**metadata, "serving_config": "native-state-prefix-parallel-v1"},
                "readout": "native selected suffix-position logits",
                "probability_status": "conditional option score; uncalibrated as decision confidence",
            })
        del output, cache
    sync()

    timing = {
        "total_seconds": time.perf_counter() - started,
        "encode_seconds": encode_seconds,
        "prefix_tokens": len(prefix),
        "prefill_seconds": prefill_seconds,
        "replicate_seconds": replicate_seconds,
        "suffix_forward_seconds": suffix_seconds,
        "batch_size": len(rows),
        "true_suffix_tokens": sum(len(ids) - len(prefix) for ids, _, _, _ in encoded),
        "padded_suffix_tokens": len(rows) * len(layout["input_ids"][0]),
    }
    return results, timing
