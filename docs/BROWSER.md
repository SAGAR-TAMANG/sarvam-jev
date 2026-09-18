# The browser demo

`browser/` is a fully static page that runs sarvam-1 in the visitor's own tab through
[wllama](https://github.com/ngxson/wllama) — llama.cpp compiled to WebAssembly, with a
WebGPU backend. There is no backend, nothing to install, and the state and criteria
never leave the page because there is nowhere to send them.

It is a sibling of the FastAPI demo, not a replacement. The two measure different
things and the numbers are not interchangeable.

## What differs from the Python engine

**Criteria are scored one at a time.** This is the important one. The Python engine
prefills the state once and evaluates every criterion in a single batched forward pass,
which is where its 8.8×-at-twenty-criteria result comes from. wllama exposes no batched
branch evaluation, so the browser scores each criterion separately with `cache_prompt`
keeping the shared prefix warm between them. That is the serial reuse path, not the
parallel one, and it produces a visibly smaller ratio.

**Answer-slot ids are listed, not discovered.** openjev's browser demo can assume
`labelBase + index` because BPE vocabularies lay `A`, `B`, `C` out contiguously.
Neither vocabulary here does: sarvam-1 has `▁A` at 4585, `▁B` at 4799, `▁C` at 4637,
and Qwen3-0.6B has `ĠA` at 362, `ĠB` at 425, `ĠC` at 356. The ids are therefore carried
per model in `models.json`, having been derived beforehand by probing both Hugging
Face's tokenizer and llama.cpp's and confirming they agree. They cannot be probed in
the page: this build of wllama exposes no `tokenize()`. What survives in the browser is
the downstream check — `optionScores()` refuses to return a distribution unless every
declared option came back with a finite score, so a vocabulary mismatch surfaces as a
refusal rather than as quietly wrong numbers. `bench/quantization.py` still probes
properly and is the place a drift would be caught.

**The readout needs a grammar.** Constraining the single sampled token to the answer
letters is what makes the returned distribution be over those letters. `logit_bias`
alone only nudges the scores and gives no guarantee every letter lands inside the
returned top-N window.

**Two request shapes.** wllama routes a `prompt` to llama.cpp's native completion
handler, which wants `n_probs`, and `messages` to the OpenAI adapter, which wants
`top_logprobs`. Asking the native path for `top_logprobs` is not an error: it returns
the single sampled token, which is indistinguishable from a model refusing to score
the other options. The completion path is preferred because sarvam-1 is a base model
and scored 0.516 on few-shot completion against 0.404 on its chat template; chat is
the automatic fallback if a build ignores `n_probs`.

**A BOS token is prepended.** `tokenizer.ggml.add_bos_token` is true and, without
`tokenize()`, there is no way to hand llama.cpp a token array instead of a string. The
Python engine sends no BOS. Measured on the fixture, that single token is worth a lot
on a model this near-indifferent, so the page says so on load rather than implying
parity.

**The baseline always gets a demonstration, the readout may not.** The browser runs the
readout with zero few-shot demonstrations, because on sarvam-1 the few-shot block was
half the prompt and measured no better than none (0.490 against 0.516). The generation
baseline is still shown at least one worked example. That asymmetry is deliberate and
runs against our own interest: the readout's output shape is enforced by the grammar
and the answer slots, while generation cannot know the requested key convention unless
it is shown one. With none, a base model echoes the option ids back as keys -- eleven
hallucinated keys on a four-criterion Tamil ticket -- which inflates the ratio by
comparing against a baseline that was never given a chance.

**Weights are quantized.** Every accuracy figure in `README.md` is for native BF16.

## What was verified before shipping

Run against `bartowski/sarvam-1-GGUF` at revision `3bcf10b`, using `llama-cpp-python`
so llama.cpp's own tokenizer and sampler are exercised rather than a stand-in.

**Answer slots are identical across implementations.** Hugging Face and llama.cpp both
select the leading-space continuation and return the same ids:

```
GGUF probe   separator=' '  slots=[4585, 4799, 4637, 4884, 4918, 4898]
HF probe     separator=' '  slots=[4585, 4799, 4637, 4884, 4918, 4898]
SLOTS MATCH  True
```

**The prompt tokenizes differently, and it does not matter.** The two implementations
disagree on capital letters immediately after a newline — Hugging Face emits a
byte-fallback token where llama.cpp merges normally:

```
'\nEvidence:'     HF=[4103, 67709, 67581, 10967, 67736]   GGUF=[4103, 26566, 10967, 67736]
'\nCriterion: x'  HF=[4103, 67695, 6185, 4376, 4426, ...] GGUF=[4103, 48230, 4376, 4426, ...]
```

Our prompt hits this on every `Evidence:`, `Criterion:`, `Options:` and `Answer:`, so
llama.cpp's encoding of the same text is about 3% shorter. Feeding llama.cpp's token
ids into the BF16 model gives the same answers as Hugging Face's, so the divergence is
cosmetic for our purposes:

| Criterion | HF tokenization, BF16 | llama.cpp tokenization, BF16 |
| --- | --- | --- |
| which team | payments 46% | payments 46% |
| urgency | p0 31% | p0 33% |
| customer dissatisfied | yes 73% | yes 68% |

It is worth remembering when comparing token counts between the two demos, and the
byte-fallback behaviour may be worth revisiting server-side.

**Quantization is what actually costs answers, and it has not been measured yet.** A
five-criterion spot check on the Hindi preset had Q4_K_M flipping all three of the
argmaxes it shares with the BF16 reference, each to a worse answer — consistent with a
model that sits near-indifferent having little margin to spend. That is five decisions,
not a measurement. `bench/quantization.py` scores a build on the full fixture and should
be run on each before any tier is called a default or any number is put on the page.

## Deployment

The page is static, so any static host works.

**GitHub Pages** is wired up in `.github/workflows/pages.yml` and publishes `browser/`
on every push that touches it. One wrinkle: wllama's multi-threaded WebAssembly needs
`SharedArrayBuffer`, which browsers only expose to cross-origin-isolated pages, and
GitHub Pages cannot set response headers. `browser/coi-serviceworker.js` registers a
service worker that re-serves responses with `Cross-Origin-Opener-Policy` and
`Cross-Origin-Embedder-Policy` attached, which wins isolation back. Without it the demo
still runs, single-threaded and slower.

**Cloudflare Pages or Netlify** honour `browser/_headers` and get isolation directly,
no service worker involved.

Locally:

```bash
cd browser && python3 -m http.server 8090
```

## Limits

- Probabilities are conditional on the supplied options and uncalibrated, exactly as in
  the Python engine.
- Timings are the visitor's own hardware and browser. They are not comparable to the
  RTX 3060 figures in `README.md`, and not comparable between visitors.
- First load downloads between 639 MB and 2.69 GB depending on the selected build.
  Browser cache makes later visits instant; clearing site data starts over.
- No quality measurement has been made on any quantized build. Treat every published
  accuracy figure as applying to BF16, three demonstrations and no BOS — none of which
  the browser matches.
- Speed is the visitor's, not the model's: roughly a second per decision on a desktop
  GPU and about ten times that on a phone, measured on sarvam-1 Q4_K_M and Qwen3-0.6B.
- Every example ships with at least ten criteria. On a narrow viewport, or a device
  reporting four cores or fewer, a preset loads its first four rows and offers a single
  click to restore the rest — ten rows is a good demonstration on a desktop and a
  two-minute wait on a phone. Rows are editable either way, so this is a default rather
  than a restriction.
- More criteria do not make the browser faster in absolute terms — each is a separate
  call. What falls is the cost per decision, because the state is prefilled once. The
  batched server path is the one where total time is flat in the number of criteria.
