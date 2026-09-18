"""Input validation, prompt construction, answer-slot discovery, and model loading.

Adapted from TheoLeeCJ/openjev (MIT). The substantive changes are Sarvam-specific:

* Sarvam-1 is a base completion model, so a few-shot completion prompt style sits
  alongside the chat-template style used for instruction-tuned models.
* Sarvam's SentencePiece tokenizer never emits a bare ``A`` after ``Answer:`` --
  the natural continuation is ``_A``. Answer slots are therefore discovered by
  probing which continuation keeps the prompt boundary stable, rather than being
  assumed.
"""

from __future__ import annotations

import hashlib
import json
import math
import re
from pathlib import Path

LETTERS = "ABCDEFGHIJKLMNOP"

INSTRUCTION = (
    "Apply the criterion to the evidence and choose exactly one listed option. "
    "Answer with only the uppercase letter of that option."
)

# Fixed, project-authored demonstrations for base (non-instruction-tuned) models.
# Deliberately not drawn from any evaluation fixture, and the correct letters are
# spread across positions so the format is taught without teaching a letter prior.
FEWSHOT = [
    {
        "state": "The parcel left the Chennai sorting facility on Tuesday. "
                 "The recipient reports it has not arrived.",
        "question": "Assess the claim: the parcel has been delivered.",
        "options": [
            "The evidence establishes the claim",
            "The evidence does not establish either",
            "The evidence establishes the opposite",
        ],
        "answer": 2,
    },
    {
        "state": "A customer writes that their card was charged twice for one order "
                 "and asks for one of the charges to be reversed.",
        "question": "Which queue should handle this request?",
        "options": [
            "Account access and authentication support",
            "Billing and payment support",
            "Sales and product evaluation",
        ],
        "answer": 1,
    },
    {
        "state": "Policy: refunds above 5000 rupees need manager approval. "
                 "Request: refund 900 rupees for a damaged item.",
        "question": "Does this request need manager approval under the stated policy?",
        "options": [
            "Manager approval is required",
            "Manager approval is not required",
        ],
        "answer": 0,
    },
]


def validate_row(row: dict) -> None:
    """Reject anything the scorers cannot score exactly as written."""
    required = {"id", "state", "question", "options"}
    if not required <= row.keys():
        raise ValueError(f"Row is missing fields: {sorted(required - row.keys())}")
    if not all(isinstance(row[key], str) and row[key] for key in ("id", "question")):
        raise ValueError("id and question must be nonempty strings")
    state = row["state"]
    if not isinstance(state, (str, dict, list)) or not state:
        raise ValueError("state must be a nonempty string, object, or array")
    try:
        json.dumps(state, ensure_ascii=False, allow_nan=False)
    except (TypeError, ValueError) as error:
        raise ValueError("state must be finite JSON-compatible data") from error
    options = row["options"]
    if not isinstance(options, list) or not 2 <= len(options) <= len(LETTERS):
        raise ValueError(f"options must contain 2-{len(LETTERS)} entries")
    ids = []
    for option in options:
        if not isinstance(option, dict) or not isinstance(option.get("id"), str) \
                or not isinstance(option.get("description"), str):
            raise ValueError("Each option needs string id and description fields")
        ids.append(option["id"])
    if len(ids) != len(set(ids)):
        raise ValueError("Option IDs must be unique")


def render_state(state) -> str:
    """Render a state as prompt text, preserving structure for JSON states."""
    if isinstance(state, str):
        return state
    return json.dumps(state, ensure_ascii=False)


def _block(state, question: str, descriptions: list[str]) -> tuple[str, str]:
    """Return (state_part, tail_part) for one decision.

    The split point matters: everything in ``state_part`` is identical across all
    decisions that share a state, which is what makes prefix reuse possible.
    """
    state_part = f"Evidence:\n{render_state(state)}\n"
    lines = [f"\nCriterion: {question}", "Options:"]
    for letter, description in zip(LETTERS, descriptions):
        lines.append(f"{letter}. {description}")
    lines.append("Answer:")
    return state_part, "\n".join(lines)


def _fewshot_text(shots: int) -> str:
    parts = [INSTRUCTION, ""]
    for example in FEWSHOT[:shots]:
        state_part, tail = _block(example["state"], example["question"], example["options"])
        parts.append(state_part + tail + " " + LETTERS[example["answer"]] + "\n")
    return "\n".join(parts)


def completion_prompt(row: dict, shots: int = len(FEWSHOT)) -> tuple[str, str]:
    """Build a base-model completion prompt, split at the state boundary.

    Returns ``(head, tail)`` where ``head + tail`` is the full prompt and ``head``
    ends immediately after the state. ``head`` is shared by every decision over the
    same state.
    """
    validate_row(row)
    preamble = _fewshot_text(shots) if shots else INSTRUCTION + "\n\n"
    state_part, tail = _block(
        row["state"], row["question"], [option["description"] for option in row["options"]]
    )
    return preamble + state_part, tail


def chat_prompt(tokenizer, row: dict) -> tuple[str, str]:
    """Build an instruction-model prompt via the tokenizer's chat template.

    Split at the state boundary the same way, by locating the rendered state inside
    the templated text.
    """
    validate_row(row)
    state_part, tail = _block(
        row["state"], row["question"], [option["description"] for option in row["options"]]
    )
    content = state_part + tail
    messages = [
        {"role": "system", "content": INSTRUCTION},
        {"role": "user", "content": content},
    ]
    prompt = tokenizer.apply_chat_template(
        messages, tokenize=False, add_generation_prompt=True
    )
    if prompt.count(content) != 1:
        raise ValueError("Chat template altered or duplicated the decision payload")
    head = prompt[: prompt.index(content)] + state_part
    return head, prompt[len(head):]


def build_prompt(tokenizer, row: dict, style: str, shots: int = len(FEWSHOT)):
    if style == "completion":
        return completion_prompt(row, shots)
    if style == "chat":
        return chat_prompt(tokenizer, row)
    raise ValueError(f"Unknown prompt style {style!r}")


def answer_slots(tokenizer, prompt: str, count: int) -> tuple[list[int], str]:
    """Find token IDs for the first ``count`` answer letters at this exact boundary.

    Sarvam's SentencePiece vocabulary holds ``_A`` as the ordinary token and a
    separate rare ``A``; which one continues the prompt depends on the preceding
    character. Probe both and keep whichever appends exactly one token per letter
    without disturbing the prompt's own tokenization.
    """
    base = tokenizer.encode(prompt, add_special_tokens=False)
    if not base:
        raise ValueError("Prompt encoded to zero tokens")
    for separator in (" ", ""):
        slots = []
        for letter in LETTERS[:count]:
            encoded = tokenizer.encode(prompt + separator + letter, add_special_tokens=False)
            if len(encoded) != len(base) + 1 or encoded[: len(base)] != base:
                slots = []
                break
            slots.append(encoded[-1])
        if slots and len(slots) == len(set(slots)):
            return slots, separator
    raise ValueError(
        "No answer-letter continuation keeps the prompt boundary stable; "
        "the prompt tail needs adjusting for this tokenizer"
    )


def softmax(values: list[float]) -> list[float]:
    if len(values) < 2 or any(not math.isfinite(value) for value in values):
        raise ValueError("Need at least two finite scores")
    maximum = max(values)
    weights = [math.exp(value - maximum) for value in values]
    total = sum(weights)
    return [weight / total for weight in weights]


def digest(text: str) -> str:
    return hashlib.sha256(text.encode()).hexdigest()


def load_causal_model(source: str, revision: str = "", trust_remote_code: bool = False):
    """Load one pinned causal model onto a single CUDA device (or CPU as a fallback)."""
    import torch
    import transformers

    local = Path(source).exists()
    if not local and revision and not re.fullmatch(r"[0-9a-f]{40}", revision):
        raise ValueError("A supplied revision must be a 40-character commit hash")
    common = {
        "revision": None if local or not revision else revision,
        "local_files_only": local,
        "trust_remote_code": trust_remote_code,
    }
    if torch.cuda.is_available():
        if torch.cuda.device_count() != 1:
            raise ValueError("Expose exactly one CUDA GPU, e.g. with CUDA_VISIBLE_DEVICES")
        device_map, dtype = {"": "cuda:0"}, torch.bfloat16
    else:
        device_map, dtype = {"": "cpu"}, torch.float32

    config = transformers.AutoConfig.from_pretrained(source, **common)
    tokenizer = transformers.AutoTokenizer.from_pretrained(source, **common)
    model, loading = transformers.AutoModelForCausalLM.from_pretrained(
        source,
        config=config,
        dtype=dtype,
        device_map=device_map,
        low_cpu_mem_usage=True,
        output_loading_info=True,
        **common,
    )
    if any(loading.get(key) for key in ("missing_keys", "mismatched_keys", "error_msgs")):
        raise RuntimeError(f"Checkpoint did not load completely: {loading}")
    model.eval()
    metadata = {
        "source": source,
        "revision": revision or "unpinned-local-development",
        "dtype": str(dtype).replace("torch.", ""),
        "device": str(next(model.parameters()).device),
        "torch_version": torch.__version__,
        "transformers_version": transformers.__version__,
    }
    return model, tokenizer, metadata
