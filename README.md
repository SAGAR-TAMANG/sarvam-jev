# sarvam-jev

Generation-free typed decisions on Sarvam's Indic models.

Most decisions software asks a model to make are small: *route this ticket*, *is this
claim supported*, *does this need approval*. A chat model can answer, but it spends
its time generating text that the caller immediately parses back into an `if`.

This project reads the answer straight out of the logits instead. Options are
presented as lettered slots, and the probability distribution is taken over the token
IDs of those letters. Nothing is sampled, so nothing can be malformed, and one
expensive state prefill is amortised across every question asked about that state.

The interface pattern is TypeSafe's Jev. The point of doing it on Sarvam is the
tokenizer: sarvam-1 encodes Devanagari at roughly 4 characters per token where
Qwen-class tokenizers are 2–4× worse. Since the whole economic argument is "pay for
the state once, then ask it many cheap questions", a model that encodes Indic states
more compactly starts from a structurally better position.

## Status

Phase 0 is done. The mechanism works; the model is the limit.

| Phase | Goal | State |
| --- | --- | --- |
| 0 | Direct + shared-state readout on sarvam-1; measure against openjev's ladder | **done** |
| 1 | Indic decision fixture; sarvam-1 vs Qwen head-to-head on Indic states | next |
| 2 | Packed branch attention — one state KV, block-diagonal mask | planned |
| 3 | Calibration head (LoRA + Brier/log loss); report ECE | planned |

## Phase 0 results

144 authored decisions, 3 options each, one RTX 3060, sarvam-1 in BF16.
Metric is mean family balanced accuracy; full evidence in [`results/`](results/).

| System | Score |
| --- | ---: |
| chance | 0.333 |
| Qwen3-0.6B *(openjev, published)* | 0.440 |
| **sarvam-1 (2B, base)** | **0.516** |
| MiniCPM5-2B *(openjev, published)* | 0.686 |
| Qwen3.5-4B *(openjev, published)* | 0.813 |

The prompt is not the bottleneck: 0 shots scores 0.490, 1 shot 0.470, 3 shots 0.516,
and the chat template scores 0.404. Meanwhile 99.8% of full-vocabulary probability
mass lands on the answer-letter slots, so the *format* is learned almost perfectly
from three demonstrations. What is missing is decision semantics, which is what a 2B
base model has no reason to have. Phase 3 is therefore required, not optional.

The shared-state path is correct and fast. On the Hindi preset, five criteria over one
ticket: 1489 ms fresh versus 280 ms shared, a 5.31× speedup, 2521 prompt tokens down
to 737, with all five argmaxes agreeing.

One caveat worth stating loudly: across the 36 shared-state groups in the fixture,
shared and fresh scoring agreed on only 64 of 72 argmaxes. That is *not* an
implementation error. Re-running the split-prefill comparison in fp32 collapses the
drift from 0.061 to 0.000021, so the path is mathematically sound. BF16 noise flips
argmaxes here because sarvam-1 sits near-indifferent between options — the same noise
flipped only 5–6 of 777 for openjev's confident 4B model. Argmax instability is a
symptom of the uncalibrated model, and phase 3 should fix it too.

## Quick start

```bash
uv venv --python 3.12 .venv
VIRTUAL_ENV=.venv uv pip install -e '.[serve,test]'
```

Score a labelled fixture and print the headline metric:

```bash
.venv/bin/python bench/phase0.py \
  --model sarvamai/sarvam-1 \
  --input reference/openjev/benchmarks/data/authored144.jsonl \
  --output results/local/phase0-sarvam1.json
```

### Try it with no install

`browser/` is a static page that runs sarvam-1 in your own tab through wllama
(llama.cpp compiled to WebAssembly, with a WebGPU backend). No backend, nothing to
install, and your ticket never leaves the page because there is nowhere to send it.
`.github/workflows/pages.yml` publishes it to GitHub Pages; any static host works.

```bash
cd browser && python3 -m http.server 8090
```

It is a sibling of the server demo, not a replacement — it scores criteria one at a
time, because wllama exposes no batched branch evaluation, so its ratio is smaller than
the numbers above. More criteria do not make it faster in absolute terms; what falls is
the cost per decision, which the page reports, because the state is prefilled once. [`docs/BROWSER.md`](docs/BROWSER.md) records what differs and what
was verified before shipping it.

### Run the server demo

```bash
.venv/bin/python -m uvicorn server.app:app --host 127.0.0.1 --port 8000
```

Then open `http://127.0.0.1:8000`. It is a split screen: the left lane reads typed
probabilities out of the logits, the right lane asks the same model to write the same
answers as JSON and streams them token by token. Add as many criterion rows as you
like; presets in Hindi, Tamil, Bengali and English ship in `fixtures/presets.json`.

Measured on one RTX 3060, sarvam-1 BF16, warm:

| Preset | Rows | Readout | Generation | Ratio | Generation verdict |
| --- | ---: | ---: | ---: | ---: | --- |
| Hindi support | 5 | 223 ms | 1281 ms | 5.7× | valid JSON, 3 values out of range |
| English incident | 6 | 257 ms | 1604 ms | 6.2× | valid JSON, 4 values out of range |
| Hindi triage | 20 | 542 ms | 4773 ms | 8.8× | valid JSON, 9 values out of range |

The ratio grows with the number of criteria, because the readout adds a branch where
generation adds a whole answer. The generation verdict is the more interesting column:
the JSON parses and every key is present, but sarvam-1 repeatedly fills a criterion
with an option id belonging to a *different* criterion. A schema validator would wave
that through. The typed readout cannot produce it, because each criterion's softmax
only ranges over its own options.

Both lanes are measured separately and aligned at t=0 by the page. Running them
concurrently on one GPU would make both numbers meaningless — openjev takes the same
precaution for the same reason.

Score JSONL directly:

```bash
.venv/bin/python -m sarvam_jev.cli --mode shared \
  --model sarvamai/sarvam-1 --input decisions.jsonl --output out.jsonl
```

## How it works

```
                        ┌── "which team?"     ──→ logits[A,B,C,D] ──→ softmax
state (prefilled once)  ├── "how urgent?"     ──→ logits[A,B,C,D] ──→ softmax
   KV cache             ├── "is it angry?"    ──→ logits[A,B]     ──→ softmax
                        └── "needs approval?" ──→ logits[A,B]     ──→ softmax
                            (one batched forward pass)
```

1. **Prefill** the shared head — instructions, few-shot demonstrations, and the state —
   into a KV cache. Exactly once.
2. **Branch** the cache across criteria. Each branch carries only its own question and
   option list, with `position_ids` continuing from the end of the prefix. Branches
   cannot see each other.
3. **Read** the logits at each branch's final position, restricted to that criterion's
   answer-letter token IDs, and softmax over just those.

Two forward passes total, regardless of how many criteria are asked.

### Answer slots

Options are rendered `A.`, `B.`, `C.` … and the readout takes the logits of the
letter tokens. Reading the logits of the *option values* instead — the obvious
approach — breaks badly on Indic scripts, where a value like `उच्च_जोखिम` is five
tokens and shares them unpredictably with its neighbours.

The letter is not appended naively. Sarvam's SentencePiece vocabulary holds `▁A` as
the ordinary token and a separate rare byte-level `A`; which one continues the prompt
depends on the preceding character. `core.answer_slots` probes both and keeps whichever
appends exactly one token per letter without disturbing the prompt's own tokenization.
`tests/test_prompts.py` pins this, along with the invariant that the shared head stays
an exact *token-level* prefix of every full prompt.

### Base-model prompting

sarvam-1 is a text-completion model — it was never instruction-tuned, so a chat
template alone will not make it follow the task. The default `completion` style uses
fixed, project-authored few-shot demonstrations whose correct answers are spread
across letter positions, so the format is taught without teaching a letter prior. The
`chat` style is available for instruction-tuned checkpoints.

## Honest limits

- Probabilities are **conditional on the supplied options and uncalibrated**. They are
  not operational confidence. Phase 3 exists to change that; until then, do not
  threshold on them.
- Branch isolation currently comes from the batch dimension, which means the state KV
  is held once per branch. This is the same shortcut both reference implementations
  take. It is *not* Jev's architecture, and it caps how many criteria fit in memory.
- BF16 batching is not bit-exact: shared and fresh scoring can disagree on a small
  number of near-tied decisions. openjev measured 5–6 of 777. Serving configuration is
  part of the system under test.

## Credits

The engine structure, the letter-slot readout, the prefix-verification discipline and
the evaluation metric follow [TheoLeeCJ/openjev](https://github.com/TheoLeeCJ/openjev)
(MIT). Architectural background on Jev itself is from
[archerhume's teardown](https://archerhume.com/posts/jevs-architecture-unmasked/).
Neither project is affiliated with this one.
