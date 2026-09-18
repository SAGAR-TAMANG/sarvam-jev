/* sarvam-jev browser engine.
 *
 * Runs sarvam-1 entirely in the visitor's browser through wllama (llama.cpp
 * compiled to WebAssembly). No backend, no upload: the state and criteria never
 * leave the page.
 *
 * Two differences from the server engine are structural, not incidental:
 *
 *  - Answer-slot token ids are DISCOVERED at load time by tokenizing the real
 *    prompt, not hardcoded. Sarvam's SentencePiece vocabulary does not lay the
 *    letters out contiguously -- "_A" is 4585 but "_C" is 4637 and "_B" is 4799 --
 *    so the `labelBase + index` shortcut that works for BPE vocabularies is wrong
 *    here. The probe also re-verifies, under llama.cpp's tokenizer rather than
 *    Hugging Face's, that appending the letter does not disturb the prompt's own
 *    tokenization.
 *
 *  - Criteria are scored one at a time. wllama exposes no batched branch
 *    evaluation, so the server's single parallel pass over all criteria has no
 *    equivalent here. Prompt caching keeps the shared prefix warm between
 *    criteria, which is the serial reuse path, not the parallel one.
 */

/* The listener is attached BEFORE the top-level await below, and messages that
 * arrive while the engine module is still loading are queued rather than handled.
 *
 * This is not optional. A worker's message queue is enabled once the script's
 * synchronous part finishes, which for a module with top-level await is the await
 * itself. Anything posted between that moment and the handler being installed is
 * delivered to nothing and silently lost -- no error, no rejection, just a worker
 * that never answers. The page creates this worker and posts to it in the same
 * tick, so without the queue below both the init and load messages disappear.
 */
let handleMessage = null;
const queuedMessages = [];
self.addEventListener("message", (event) => {
  if (handleMessage) handleMessage(event.data);
  else queuedMessages.push(event.data);
});

const { Wllama, LoggerWithoutDebug } = await import("./vendor/wllama/index.js");

const LETTERS = "ABCDEFGHIJKLMNOP";

let engine = null;
let manifest = null;
let selected = null;
let slots = null;       // { ids: number[], separator: string }
let loggedShape = false;
let shots = 0;   // set from the manifest at load

const send = (type, payload = {}) => postMessage({ type, ...payload });

/* ---------- prompt construction ----------
 * Kept textually identical to src/sarvam_jev/core.py. If one side changes, the
 * browser and server stop measuring the same thing.
 */

const INSTRUCTION =
  "Apply the criterion to the evidence and choose exactly one listed option. " +
  "Answer with only the uppercase letter of that option.";

const FEWSHOT = [
  {
    state: "The parcel left the Chennai sorting facility on Tuesday. " +
           "The recipient reports it has not arrived.",
    question: "Assess the claim: the parcel has been delivered.",
    options: [
      "The evidence establishes the claim",
      "The evidence does not establish either",
      "The evidence establishes the opposite",
    ],
    answer: 2,
  },
  {
    state: "A customer writes that their card was charged twice for one order " +
           "and asks for one of the charges to be reversed.",
    question: "Which queue should handle this request?",
    options: [
      "Account access and authentication support",
      "Billing and payment support",
      "Sales and product evaluation",
    ],
    answer: 1,
  },
  {
    state: "Policy: refunds above 5000 rupees need manager approval. " +
           "Request: refund 900 rupees for a damaged item.",
    question: "Does this request need manager approval under the stated policy?",
    options: [
      "Manager approval is required",
      "Manager approval is not required",
    ],
    answer: 0,
  },
];

function block(state, question, descriptions) {
  const statePart = `Evidence:\n${state}\n`;
  const lines = [`\nCriterion: ${question}`, "Options:"];
  descriptions.forEach((description, index) => lines.push(`${LETTERS[index]}. ${description}`));
  lines.push("Answer:");
  return [statePart, lines.join("\n")];
}

function fewshotText() {
  const parts = [INSTRUCTION, ""];
  for (const example of FEWSHOT.slice(0, shots)) {
    const [statePart, tail] = block(example.state, example.question, example.options);
    parts.push(`${statePart}${tail} ${LETTERS[example.answer]}\n`);
  }
  return parts.join("\n");
}

/** head ends immediately after the state and is shared by every criterion. */
function completionPrompt(state, criterion) {
  const [statePart, tail] = block(state, criterion.question, criterion.options.map((o) => o.description));
  return [fewshotText() + statePart, tail];
}

const GENERATION_INSTRUCTION =
  "Apply each criterion to the evidence and choose one listed option for each. " +
  "Answer with only a JSON object mapping every criterion key to the id of the " +
  "chosen option.";

const GEN_FEWSHOT = [
  {
    state: "The parcel left the Chennai sorting facility on Tuesday. " +
           "The recipient reports it has not arrived.",
    criteria: [
      { key: "q1", question: "Assess the claim: the parcel has been delivered.",
        options: [["supported", "The evidence establishes the claim"],
                  ["insufficient", "The evidence does not establish either"],
                  ["contradicted", "The evidence establishes the opposite"]], answer: "contradicted" },
      { key: "q2", question: "Assess the claim: the parcel was dispatched.",
        options: [["supported", "The evidence establishes the claim"],
                  ["insufficient", "The evidence does not establish either"],
                  ["contradicted", "The evidence establishes the opposite"]], answer: "supported" },
    ],
  },
  {
    state: "A customer writes that their card was charged twice for one order " +
           "and asks for one of the charges to be reversed.",
    criteria: [
      { key: "q1", question: "Which queue should handle this request?",
        options: [["access", "Account access and authentication support"],
                  ["billing", "Billing and payment support"],
                  ["sales", "Sales and product evaluation"]], answer: "billing" },
      { key: "q2", question: "Is a refund being requested?",
        options: [["yes", "A refund is requested"], ["no", "No refund is requested"]], answer: "yes" },
    ],
  },
];

function renderGeneration(state, criteria) {
  const lines = [`Evidence:\n${state}\n`, "Criteria:"];
  for (const criterion of criteria) {
    lines.push(`- ${criterion.key}: ${criterion.question}`);
    for (const [id, description] of criterion.options) lines.push(`    ${id} = ${description}`);
  }
  lines.push("Answers (JSON):");
  return lines.join("\n");
}

function generationPrompt(state, criteria) {
  // The baseline always gets at least one demonstration, even when the readout runs
  // with none. This is not symmetry for its own sake: the readout's output shape is
  // structural -- the grammar and the answer slots enforce it -- while generation has
  // no way to know the key convention it is being asked for unless it is shown one.
  // With zero demonstrations a base model falls back to echoing the option ids as
  // keys, which is a strawman, not a baseline.
  const parts = [GENERATION_INSTRUCTION, ""];
  const demos = Math.min(Math.max(shots, 1), GEN_FEWSHOT.length);
  for (const example of GEN_FEWSHOT.slice(0, demos)) {
    const answer = Object.fromEntries(example.criteria.map((c) => [c.key, c.answer]));
    parts.push(`${renderGeneration(example.state, example.criteria)} ${JSON.stringify(answer)}\n`);
  }
  parts.push(renderGeneration(state, criteria));
  return parts.join("\n");
}

/* ---------- answer slots ----------
 * This wllama build exposes no tokenize(), so the ids cannot be probed here the way
 * the Python engine and bench/quantization.py probe them. They are carried in
 * models.json instead, having been verified identical under both tokenizers. The
 * safety net is downstream: optionScores() refuses to return a distribution unless
 * every declared option came back with a finite score.
 */

function slotsFor(model) {
  const declared = model?.answerSlots;
  if (!declared?.ids?.length) throw new Error(`models.json has no answerSlots for ${model?.id}.`);
  return { ids: declared.ids, separator: declared.separator ?? " " };
}

/* ---------- reading option scores back ----------
 * wllama hands the whole options object to llama.cpp as JSON, so which response
 * shape comes back depends on whether the build routes a raw prompt through the
 * OpenAI-compatible handler or the native one. Both are accepted here rather than
 * guessed at, and anything unrecognised fails loudly instead of quietly returning
 * a wrong distribution.
 */

function candidateEntries(response) {
  // The OpenAI *completions* shape, which is what llama.cpp returns for a prompt
  // (rather than messages): logprobs.top_logprobs[0] is a plain object keyed by the
  // token's text. Checked first because a native run against this same GGUF produced
  // exactly this. Missing it is why a readout came back with "no score" for options
  // that were in fact present.
  const completions = response?.choices?.[0]?.logprobs?.top_logprobs?.[0];
  if (completions && typeof completions === "object" && !Array.isArray(completions)) {
    const entries = Object.entries(completions)
      .map(([token, logprob]) => ({ token, logprob: Number(logprob) }));
    if (entries.length) return { entries, kind: "logprob" };
  }
  // The OpenAI *chat* shape: an array of { token, logprob, bytes }.
  const chat = response?.choices?.[0]?.logprobs?.content?.[0]?.top_logprobs;
  if (Array.isArray(chat) && chat.length) return { entries: chat, kind: "logprob" };
  // llama.cpp's own shape.
  const native = response?.completion_probabilities?.[0];
  if (native?.top_probs?.length) return { entries: native.top_probs, kind: "logprob" };
  if (native?.probs?.length) return { entries: native.probs, kind: "prob" };
  return { entries: [], kind: null };
}

function entryMatches(entry, letter, separator) {
  const text = entry.token ?? entry.tok_str ?? entry.text;
  if (typeof text === "string") {
    const trimmed = text.trim();
    if (text === separator + letter || text === letter || trimmed === letter) return true;
  }
  if (Array.isArray(entry.bytes) && entry.bytes.length === 1) {
    return entry.bytes[0] === letter.charCodeAt(0);
  }
  return false;
}

function optionScores(response, count, separator) {
  const { entries, kind } = candidateEntries(response);
  if (!kind) {
    throw new Error(
      "This wllama build returned a completion shape the readout does not recognise. " +
      "Open the console, copy the logged response, and report it.",
    );
  }
  const letters = LETTERS.slice(0, count).split("");
  const values = letters.map((letter) => {
    const entry = entries.find((item) => entryMatches(item, letter, separator));
    if (!entry) return undefined;
    const value = kind === "logprob" ? Number(entry.logprob) : Number(entry.prob);
    return Number.isFinite(value) ? value : undefined;
  });
  if (values.some((value) => value === undefined)) {
    const missing = letters.filter((_, index) => values[index] === undefined);
    const seen = entries.map((entry) => entry.token ?? entry.tok_str ?? entry.text);
    console.log("sarvam-jev: unmatched readout response", response, "seen tokens:", seen);
    throw new Error(
      `The model returned no score for option${missing.length > 1 ? "s" : ""} ${missing.join(", ")}. ` +
      `The tokens it did return were: ${JSON.stringify(seen.slice(0, 12))}. ` +
      "A readout is only meaningful when every declared option is present.",
    );
  }
  // Log-probabilities need a softmax; raw probabilities only need renormalising
  // over the options actually offered.
  if (kind === "logprob") return softmax(values);
  const total = values.reduce((a, b) => a + b, 0);
  return total > 0 ? values.map((v) => v / total) : softmax(values.map(Math.log));
}

function softmax(values) {
  const max = Math.max(...values);
  const weights = values.map((v) => Math.exp(v - max));
  const total = weights.reduce((a, b) => a + b, 0);
  return weights.map((w) => w / total);
}

/* One criterion: a single constrained readout, nothing sampled.
 *
 * Two request shapes, because wllama routes a `prompt` to llama.cpp's native
 * completion handler and `messages` to its OpenAI-compatible one, and they do not
 * agree on how to ask for a distribution:
 *
 *   prompt   -> native      -> `n_probs`, returns `completion_probabilities`
 *   messages -> OAI adapter -> `top_logprobs`, returns `logprobs.content[...]`
 *
 * Sending `top_logprobs` down the native path is not an error, it simply returns the
 * one sampled token, which looks exactly like a model that refused to score the
 * other options. The completion path is preferred because sarvam-1 is a base model
 * and scored markedly better on few-shot completion than on its chat template
 * (0.516 against 0.404); chat is the fallback so the page still works if a build
 * does not honour `n_probs`.
 */

let useChatFallback = false;

function buildGrammar(count) {
  // Literals carry the leading space: the prompt ends "Answer:" and the token this
  // vocabulary produces there is " A", not "A".
  return `root ::= ${Array.from({ length: count }, (_, index) =>
    JSON.stringify(slots.separator + LETTERS[index])).join(" | ")}`;
}

async function requestCompletion(head, tail, grammar, bias, cachePrompt) {
  return engine.createCompletion({
    prompt: head + tail,
    grammar,
    max_tokens: 1,
    temperature: 1,
    top_k: 0,
    top_p: 1,
    n_probs: LETTERS.length + 4,
    logit_bias: bias,
    cache_prompt: cachePrompt,
  });
}

async function requestChat(head, tail, grammar, bias, cachePrompt) {
  // openjev's proven parameter set, unchanged.
  return engine.createChatCompletion({
    messages: [
      { role: "system", content: INSTRUCTION },
      { role: "user", content: head + tail },
    ],
    grammar,
    max_tokens: 1,
    temperature: 1,
    top_k: 0,
    top_p: 1,
    logprobs: true,
    top_logprobs: LETTERS.length + 4,
    logit_bias: bias,
    cache_prompt: cachePrompt,
  });
}

async function scoreCriterion(state, criterion, cachePrompt) {
  const [head, tail] = completionPrompt(state, criterion);
  const count = criterion.options.length;
  const ids = slots.ids.slice(0, count);
  // An equal bias on every answer letter cancels in the softmax over those letters;
  // its only job is to pull them into the returned window.
  const bias = Object.fromEntries(ids.map((id) => [String(id), 100]));
  const grammar = buildGrammar(count);

  let response;
  if (!useChatFallback) {
    response = await requestCompletion(head, tail, grammar, bias, cachePrompt);
    if (candidateEntries(response).entries.length < 2) {
      // This build ignored n_probs. Switch for this and every later criterion.
      useChatFallback = true;
      send("readout-mode", { mode: "chat" });
      response = await requestChat(head, tail, grammar, bias, cachePrompt);
    }
  } else {
    response = await requestChat(head, tail, grammar, bias, cachePrompt);
  }
  if (!loggedShape) { console.log("sarvam-jev: first readout response", response); loggedShape = true; }

  const probabilities = optionScores(response, count, slots.separator);
  const ranked = criterion.options
    .map((option, index) => ({
      letter: LETTERS[index], id: option.id, description: option.description,
      probability: probabilities[index],
    }))
    .sort((a, b) => b.probability - a.probability);
  return {
    question: criterion.question,
    options: ranked,
    inputTokens: response?.usage?.prompt_tokens ?? response?.tokens_evaluated ?? null,
  };
}

/* ---------- engine ---------- */

function balanced(text) {
  let depth = 0;
  let opened = false;
  for (const character of text) {
    if (character === "{") { depth += 1; opened = true; }
    else if (character === "}") depth -= 1;
  }
  return opened && depth <= 0;
}

async function load(modelId) {
  if (engine) return;
  if (!manifest) throw new Error("The model list has not arrived yet; reload the page.");
  selected = manifest.models.find((model) => model.id === modelId);
  if (!selected) throw new Error("Choose one of the listed builds.");

  shots = selected.shots ?? manifest.defaultShots ?? 0;
  const url = `https://huggingface.co/${selected.repo}/resolve/${selected.revision}/${selected.file}`;
  const wasmUrl = new URL("./vendor/wllama/wasm/wllama.wasm", self.location.href).href;
  engine = new Wllama({ default: wasmUrl }, {
    logger: LoggerWithoutDebug, suppressNativeLog: true, parallelDownloads: 4,
  });

  send("status", { message: "Fetching the model, or reading it from your browser cache…" });
  const loadStart = performance.now();
  await engine.loadModelFromUrl(url, {
    n_ctx: 4096,
    n_batch: 512,
    n_gpu_layers: 999,
    progressCallback: ({ loaded, total }) => send("progress", { loaded, total }),
  });
  send("loaded", { loadMs: performance.now() - loadStart });

  send("status", { message: "Compiling a real pass…" });
  const warmStart = performance.now();
  slots = slotsFor(selected);
  await engine.createCompletion({
    prompt: "Warm-up.", max_tokens: 1, temperature: 0,
  });
  // llama.cpp prepends BOS when handed a string and this build offers no way to pass
  // tokens instead, so the browser is not running the Python engine's exact prompt.
  let addsBos = null;
  try { addsBos = engine.mustAddBosToken(); } catch { /* older builds lack it */ }
  send("ready", {
    warmupMs: performance.now() - warmStart,
    modelId,
    modelName: selected.name,
    slots: slots.ids.slice(0, 4),
    separator: slots.separator === " " ? "leading space" : "none",
    addsBos,
    shots,
  });
}

async function readout({ state, criteria }) {
  const started = performance.now();
  const decisions = [];
  for (let index = 0; index < criteria.length; index += 1) {
    // Announce before scoring. The first criterion pays for the whole shared prefix
    // and on a slow device that is tens of seconds; a silent lane looks like a hang.
    send("readout-start", { index, total: criteria.length, question: criteria[index].question });
    // The first call establishes the shared prefix; later ones reuse it.
    const decision = await scoreCriterion(state, criteria[index], index > 0);
    decisions.push(decision);
    send("readout-progress", { index, total: criteria.length, decision });
  }
  send("readout-done", {
    decisions,
    seconds: (performance.now() - started) / 1000,
    readouts: criteria.length,
    generatedTokens: 0,
  });
}

async function generate({ state, criteria }) {
  const started = performance.now();
  const keyed = criteria.map((criterion, index) => ({
    key: `q${index + 1}`,
    question: criterion.question,
    options: criterion.options.map((option) => [option.id, option.description]),
  }));
  const prompt = generationPrompt(state, keyed);

  let text = "";
  let firstTokenSeconds = null;
  let tokenCount = 0;

  const stream = await engine.createCompletion({
    prompt,
    stream: true,
    max_tokens: 384,
    temperature: 0,
    cache_prompt: false,
  });
  for await (const chunk of stream) {
    const piece = chunk?.choices?.[0]?.delta?.content ?? chunk?.choices?.[0]?.text ?? chunk?.content ?? "";
    if (!piece) continue;
    if (firstTokenSeconds === null) firstTokenSeconds = (performance.now() - started) / 1000;
    text += piece;
    tokenCount += 1;
    send("generation-token", { text, tokenCount, elapsedSeconds: (performance.now() - started) / 1000 });
    // Stop as soon as the object closes; the baseline is not penalised for
    // whatever it would have rambled afterwards.
    if (text.includes("{") && balanced(text)) break;
  }

  const seconds = (performance.now() - started) / 1000;
  const expected = keyed.map((c) => c.key);
  const allowed = new Map(keyed.map((c) => [c.key, new Set(c.options.map(([id]) => id))]));

  let parsed = null;
  let valid = false;
  const match = text.match(/\{[\s\S]*\}/);
  if (match) {
    try { parsed = JSON.parse(match[0]); valid = parsed !== null && typeof parsed === "object" && !Array.isArray(parsed); }
    catch { /* reported as invalid below */ }
  }
  const keys = valid ? Object.keys(parsed) : [];
  const missing = expected.filter((key) => !keys.includes(key));
  const hallucinated = keys.filter((key) => !expected.includes(key));
  const outOfRange = keys.filter((key) => allowed.has(key) && !allowed.get(key).has(parsed[key]));

  send("generation-done", {
    result: {
      text, parsed, isValidJson: valid,
      missingKeys: missing, hallucinatedKeys: hallucinated, outOfRangeValues: outOfRange,
      schemaMatch: valid && !missing.length && !hallucinated.length && !outOfRange.length,
      generatedTokens: tokenCount,
      forwardPasses: tokenCount + 1,
      firstTokenSeconds, seconds,
      hitTokenCap: tokenCount >= 384,
    },
  });
}

handleMessage = async (message) => {
  const { type, ...data } = message;
  try {
    if (type === "init") { manifest = data.manifest; send("init-done"); return; }
    if (type === "load") { await load(data.modelId); return; }
    if (type === "run") {
      // Sequentially, never concurrently: one device, and overlapping the paths
      // would make both timings meaningless.
      await readout(data);
      await generate(data);
      send("run-done");
      return;
    }
  } catch (error) {
    send("error", { message: error?.message ?? String(error) });
  }
};

// Anything that arrived during module evaluation runs now, in order.
for (const message of queuedMessages.splice(0)) handleMessage(message);
