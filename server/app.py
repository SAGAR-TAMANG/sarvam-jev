"""FastAPI server for the sarvam-jev demonstration UI.

Two endpoints do the interesting work:

* ``/api/decide``  — one shared-state prefill, all criteria evaluated in parallel.
* ``/api/compare`` — the same decisions run twice, once fresh per decision and once
  shared, so the page can show where the time actually goes.
"""

from __future__ import annotations

import json
import os
import sys
import threading
import time
from pathlib import Path
from typing import Any

from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException
from fastapi.responses import StreamingResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "src"))

from sarvam_jev.core import LETTERS, load_causal_model  # noqa: E402
from sarvam_jev.direct import score as direct_score  # noqa: E402
from sarvam_jev.generate import stream_json_generation  # noqa: E402
from sarvam_jev.shared import score_shared  # noqa: E402

MODEL_ID = os.environ.get("SARVAM_JEV_MODEL", "sarvamai/sarvam-1")
PROMPT_STYLE = os.environ.get("SARVAM_JEV_STYLE", "completion")
SHOTS = int(os.environ.get("SARVAM_JEV_SHOTS", "3"))

_engine: dict[str, Any] = {}

# Guards construction of the engine. FastAPI runs sync endpoints in a threadpool, so
# a bare `if not _engine` lets every concurrent request start its own load: one page
# load plus a couple of refreshes was enough to pull several 4 GB copies of the model
# at once and drive the machine into swap.
_engine_lock = threading.Lock()


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Load once, before the first request, rather than racing on the first one.
    print(f"Loading {MODEL_ID} ...", flush=True)
    engine()
    yield
    _engine.clear()


app = FastAPI(title="sarvam-jev", lifespan=lifespan)

# One GPU: serialise runs so the two paths never contend and their timings stay
# comparable. openjev does the same for the same reason.
_gpu = threading.Lock()


def engine():
    if not _engine:
        with _engine_lock:
            # Re-check inside the lock: whoever was ahead of us has finished by now.
            if not _engine:
                model, tokenizer, metadata = load_causal_model(MODEL_ID)
                _warm(model, tokenizer, metadata)
                # Published last, so no other thread sees a half-built engine.
                _engine.update(model=model, tokenizer=tokenizer, metadata=metadata)
    return _engine["model"], _engine["tokenizer"], _engine["metadata"]


def _warm(model, tokenizer, metadata) -> None:
    """Compile the kernels both paths use before anyone is timing them.

    Without this the first run pays CUDA warmup and reports a prefill several times
    its steady-state cost, which would overstate the readout's latency and flatter
    nothing.
    """
    rows = [
        {"id": f"q{index + 1}", "state": "वार्म-अप अवस्था। Warm-up state for kernel compilation.",
         "question": "Is this a warmup?",
         "options": [{"id": "yes", "description": "Yes"}, {"id": "no", "description": "No"}]}
        for index in range(4)
    ]
    try:
        score_shared(model, tokenizer, rows, metadata, style=PROMPT_STYLE, shots=SHOTS)
        for event in stream_json_generation(model, tokenizer, rows, metadata, max_new_tokens=4):
            pass
        print("Warmed up; both paths ready.", flush=True)
    except Exception as error:  # noqa: BLE001
        print(f"Warmup skipped: {error}", flush=True)


class Criterion(BaseModel):
    question: str
    options: list[dict]


class DecideRequest(BaseModel):
    state: str
    criteria: list[Criterion]


def _rows(request: DecideRequest) -> list[dict]:
    if not request.state.strip():
        raise HTTPException(400, "State must not be empty")
    if not request.criteria:
        raise HTTPException(400, "Supply at least one criterion")
    rows = []
    for index, criterion in enumerate(request.criteria):
        rows.append({
            "id": f"q{index + 1}",
            "state": request.state,
            "question": criterion.question,
            "options": criterion.options,
        })
    return rows


def _present(row: dict, result: dict) -> dict:
    # Carry the answer letter through: it is the slot the readout actually scored,
    # and ranking by probability would otherwise lose which option was which.
    ranked = sorted(
        (
            {
                "letter": LETTERS[index],
                "id": option["id"],
                "description": option["description"],
                "probability": probability,
            }
            for index, (option, probability) in enumerate(
                zip(row["options"], result["probabilities"])
            )
        ),
        key=lambda item: item["probability"],
        reverse=True,
    )
    return {
        "id": row["id"],
        "question": row["question"],
        "choice": ranked[0]["id"],
        "confidence": ranked[0]["probability"],
        "options": ranked,
        "input_tokens": result["input_tokens"],
        "allowed_token_mass": result["allowed_token_mass"],
    }


@app.get("/api/presets")
def presets():
    path = ROOT / "fixtures" / "presets.json"
    return json.loads(path.read_text()) if path.exists() else []


@app.get("/api/model")
def model_info():
    # The model is loaded during startup, so by the time this can be reached it is
    # either ready or genuinely broken.
    try:
        _, _, metadata = engine()
    except Exception as error:  # noqa: BLE001
        raise HTTPException(503, f"Model unavailable: {error}") from error
    return {**metadata, "prompt_style": PROMPT_STYLE, "shots": SHOTS}


@app.post("/api/decide")
def decide(request: DecideRequest):
    model, tokenizer, metadata = engine()
    rows = _rows(request)
    try:
        results, timing = score_shared(
            model, tokenizer, rows, metadata, style=PROMPT_STYLE, shots=SHOTS
        )
    except ValueError as error:
        raise HTTPException(400, str(error)) from error
    return {
        "mode": "shared_parallel",
        "decisions": [_present(row, result) for row, result in zip(rows, results)],
        "timing": timing,
        "model": metadata,
        "probability_status": results[0]["probability_status"],
    }


@app.post("/api/compare")
def compare(request: DecideRequest):
    model, tokenizer, metadata = engine()
    rows = _rows(request)

    started = time.perf_counter()
    fresh = [direct_score(model, tokenizer, row, metadata, style=PROMPT_STYLE, shots=SHOTS)
             for row in rows]
    fresh_seconds = time.perf_counter() - started

    try:
        results, timing = score_shared(
            model, tokenizer, rows, metadata, style=PROMPT_STYLE, shots=SHOTS
        )
    except ValueError as error:
        raise HTTPException(400, str(error)) from error

    agree = sum(
        max(range(len(a["probabilities"])), key=a["probabilities"].__getitem__)
        == max(range(len(b["probabilities"])), key=b["probabilities"].__getitem__)
        for a, b in zip(fresh, results)
    )
    return {
        "decisions": [_present(row, result) for row, result in zip(rows, results)],
        "fresh": {
            "seconds": fresh_seconds,
            "decisions_per_second": len(rows) / fresh_seconds,
            "forward_passes": len(rows),
            "prompt_tokens": sum(item["input_tokens"] for item in fresh),
        },
        "shared": {
            "seconds": timing["total_seconds"],
            "decisions_per_second": len(rows) / timing["total_seconds"],
            "forward_passes": 2,
            "prompt_tokens": timing["prefix_tokens"] + timing["true_suffix_tokens"],
            "timing": timing,
        },
        "speedup": fresh_seconds / max(timing["total_seconds"], 1e-9),
        "argmax_agreement": f"{agree}/{len(rows)}",
        "model": metadata,
        "probability_status": results[0]["probability_status"],
    }


@app.post("/api/race")
def race(request: DecideRequest):
    """Stream both paths for a side-by-side comparison.

    The readout runs first and its measured completion time is reported, then the
    generation streams with real per-token arrival times. The two are measured
    separately and aligned at t=0 by the page, exactly as openjev's replay does --
    running them concurrently on one GPU would make both numbers meaningless.
    """
    model, tokenizer, metadata = engine()
    rows = _rows(request)

    def events():
        with _gpu:
            try:
                started = time.perf_counter()
                results, timing = score_shared(
                    model, tokenizer, rows, metadata, style=PROMPT_STYLE, shots=SHOTS
                )
                readout_seconds = time.perf_counter() - started
                yield _sse({
                    "type": "readout",
                    "decisions": [_present(row, result) for row, result in zip(rows, results)],
                    "seconds": readout_seconds,
                    "timing": timing,
                    "forward_passes": 2,
                    "generated_tokens": 0,
                    "probability_status": results[0]["probability_status"],
                })

                for event in stream_json_generation(model, tokenizer, rows, metadata):
                    if event["type"] == "done":
                        result = event["result"]
                        result["speedup"] = result["total_seconds"] / max(readout_seconds, 1e-9)
                        yield _sse({"type": "generation_done", "result": result})
                    else:
                        yield _sse(event)
            except ValueError as error:
                yield _sse({"type": "error", "message": str(error)})
            except Exception as error:  # noqa: BLE001
                yield _sse({"type": "error", "message": f"{type(error).__name__}: {error}"})

    return StreamingResponse(
        events(),
        media_type="text/event-stream",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
    )


def _sse(payload: dict) -> str:
    return f"data: {json.dumps(payload, allow_nan=False)}\n\n"


WEB = ROOT / "web"
if WEB.exists():
    app.mount("/", StaticFiles(directory=WEB, html=True), name="web")
