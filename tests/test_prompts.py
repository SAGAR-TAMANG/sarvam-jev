"""Tokenizer-level tests. No GPU or model weights required."""

from __future__ import annotations

import sys
from pathlib import Path

import pytest

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "src"))

from sarvam_jev.core import (  # noqa: E402
    LETTERS,
    answer_slots,
    build_prompt,
    completion_prompt,
    validate_row,
)
from sarvam_jev.shared import _suffix_layout, state_prefix  # noqa: E402

MODEL = "sarvamai/sarvam-1"

ROW = {
    "id": "r1",
    "state": "टिकट #INC-4021. ग्राहक ने UPI से ₹4,250 का भुगतान किया लेकिन ऑर्डर पेंडिंग है।",
    "question": "इस टिकट को कौन सी टीम संभाले?",
    "options": [
        {"id": "payments", "description": "भुगतान और रिफ़ंड टीम"},
        {"id": "orders", "description": "ऑर्डर और डिलीवरी टीम"},
        {"id": "accounts", "description": "खाता और लॉगिन टीम"},
    ],
}


@pytest.fixture(scope="module")
def tokenizer():
    transformers = pytest.importorskip("transformers")
    return transformers.AutoTokenizer.from_pretrained(MODEL)


def test_validate_row_rejects_malformed():
    with pytest.raises(ValueError):
        validate_row({**ROW, "options": ROW["options"][:1]})
    with pytest.raises(ValueError):
        validate_row({**ROW, "state": ""})
    with pytest.raises(ValueError):
        validate_row({**ROW, "options": [ROW["options"][0], ROW["options"][0]]})


def test_head_is_a_string_prefix_and_ends_at_the_state():
    head, tail = completion_prompt(ROW)
    assert head.endswith(ROW["state"] + "\n")
    assert ROW["question"] in tail
    assert ROW["question"] not in head


def test_head_is_shared_across_criteria_over_one_state():
    other = {**ROW, "id": "r2", "question": "इसकी तात्कालिकता क्या है?"}
    assert completion_prompt(ROW)[0] == completion_prompt(other)[0]


def test_answer_slots_are_unique_and_boundary_stable(tokenizer):
    head, tail = build_prompt(tokenizer, ROW, "completion")
    prompt = head + tail
    slots, separator = answer_slots(tokenizer, prompt, len(ROW["options"]))
    assert len(slots) == len(set(slots)) == len(ROW["options"])
    base = tokenizer.encode(prompt, add_special_tokens=False)
    for letter, slot in zip(LETTERS, slots):
        assert tokenizer.encode(prompt + separator + letter, add_special_tokens=False) == base + [slot]


def test_answer_slots_cover_the_full_letter_range(tokenizer):
    wide = {**ROW, "options": [{"id": f"o{i}", "description": f"विकल्प {i}"} for i in range(16)]}
    head, tail = build_prompt(tokenizer, wide, "completion")
    slots, _ = answer_slots(tokenizer, head + tail, 16)
    assert len(set(slots)) == 16


def test_state_prefix_is_an_exact_token_prefix_of_every_full_prompt(tokenizer):
    """The invariant the whole shared-state path depends on."""
    rows = [
        ROW,
        {**ROW, "id": "r2", "question": "क्या ग्राहक असंतुष्ट है?",
         "options": [{"id": "yes", "description": "हाँ"}, {"id": "no", "description": "नहीं"}]},
        {**ROW, "id": "r3", "question": "What is the urgency tier?",
         "options": [{"id": "p0", "description": "Immediate"},
                     {"id": "p1", "description": "High"},
                     {"id": "p2", "description": "Normal"}]},
    ]
    prefix = state_prefix(tokenizer, rows[0], "completion", 3)
    assert prefix
    for row in rows:
        head, tail = build_prompt(tokenizer, row, "completion")
        ids = tokenizer.encode(head + tail, add_special_tokens=False)
        assert ids[: len(prefix)] == prefix, f"prefix diverges for {row['id']}"
        assert len(ids) > len(prefix)


def test_suffix_layout_positions_continue_the_prefix():
    layout, ends = _suffix_layout([[1, 2, 3], [4, 5]], prefix_length=10, pad_id=0)
    assert layout["input_ids"] == [[1, 2, 3], [4, 5, 0]]
    assert layout["attention_mask"] == [[1] * 13, [1] * 12 + [0]]
    assert layout["position_ids"][0] == [10, 11, 12]
    assert layout["position_ids"][1][:2] == [10, 11]
    assert ends == [2, 1]
