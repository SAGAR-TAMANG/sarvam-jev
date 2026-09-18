"""The Python engine and the browser engine must build byte-identical prompts.

They are separate implementations -- one Python, one JavaScript -- because wllama
cannot run Python. That duplication is unavoidable and it silently drifts: Python's
``json.dumps`` puts a space after each colon while ``JSON.stringify`` does not, which
was enough to demonstrate a wordier output format to one baseline than the other and
make the two demos' ratios incomparable.

Nothing else pins this, so it is pinned here.
"""

from __future__ import annotations

import json
import shutil
import subprocess
import sys
from pathlib import Path

import pytest

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "src"))

from sarvam_jev import generate  # noqa: E402
from sarvam_jev.core import build_prompt  # noqa: E402

STATE = "टिकट #INC-4021. ग्राहक ने UPI से ₹4,250 का भुगतान किया।"
ROW = {
    "id": "q1",
    "state": STATE,
    "question": "इस टिकट को कौन सी टीम संभाले?",
    "options": [
        {"id": "payments", "description": "भुगतान और रिफ़ंड टीम"},
        {"id": "orders", "description": "ऑर्डर और डिलीवरी टीम"},
    ],
}

HARNESS = """
import { readoutPrompt, genPrompt } from "./prompts.mjs";
const row = %s;
const criterion = { question: row.question, options: row.options };
const criteria = [{ key: "q1", question: row.question,
  options: row.options.map((o) => [o.id, o.description]) }];
process.stdout.write("===READOUT===\\n" + readoutPrompt(row.state, criterion, 3));
process.stdout.write("\\n===GEN===\\n" + genPrompt(row.state, criteria, 2));
"""


def _javascript_prompts(tmp_path: Path) -> str:
    """Run browser/worker.js's prompt builders, without its wllama import."""
    source = (ROOT / "browser" / "worker.js").read_text()
    body = source[source.index("const LETTERS ="):source.index("/* ---------- answer slots")]
    (tmp_path / "prompts.mjs").write_text(body + """
export function readoutPrompt(state, criterion, n) {
  shots = n; return completionPrompt(state, criterion).join("");
}
export function genPrompt(state, criteria, n) { shots = n; return generationPrompt(state, criteria); }
""")
    (tmp_path / "run.mjs").write_text(HARNESS % json.dumps(ROW, ensure_ascii=False))
    result = subprocess.run([shutil.which("node"), str(tmp_path / "run.mjs")],
                            capture_output=True, text=True, cwd=tmp_path)
    assert result.returncode == 0, result.stderr
    return result.stdout


def _python_prompts() -> str:
    readout = "".join(build_prompt(None, ROW, "completion", 3))
    criteria = generate._criteria_from_rows([ROW])
    return f"===READOUT==={chr(10)}{readout}{chr(10)}===GEN==={chr(10)}" \
           f"{generate.build_prompt(STATE, criteria)}"


@pytest.mark.skipif(shutil.which("node") is None, reason="node is needed to run browser/worker.js")
def test_python_and_browser_build_identical_prompts(tmp_path):
    expected = _python_prompts()
    actual = _javascript_prompts(tmp_path)
    if expected != actual:
        for line_number, (left, right) in enumerate(
                zip(expected.splitlines(), actual.splitlines()), start=1):
            if left != right:
                pytest.fail(
                    f"prompts diverge at line {line_number}\n"
                    f"  python: {left!r}\n"
                    f"  browser: {right!r}"
                )
        pytest.fail(f"prompts differ in length: python {len(expected)}, browser {len(actual)}")
