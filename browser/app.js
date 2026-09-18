"use strict";

const $ = (id) => document.getElementById(id);
const LETTERS = "ABCDEFGHIJKLMNOP";
const criteriaBox = $("criteria");

let presets = [];
let manifest = null;
let worker = null;
let modelReady = false;
let readoutSeconds = 0;
let criterionStarted = 0;
let criterionTimes = [];
let chosenModel = null;

const pct = (value) => `${(value * 100).toFixed(1)}%`;
const secs = (value) => `${value.toFixed(2)}s`;
const gb = (bytes) => `${(bytes / 1e9).toFixed(2)} GB`;
const escapeHtml = (text) => String(text).replace(/[&<>"']/g, (c) =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* ---------- criteria editor (same contract as the server page) ---------- */

function syncOptions(criterion) {
  const rows = [...criterion.querySelector(".options").children];
  rows.forEach((row, index) => { row.querySelector(".letter").textContent = LETTERS[index] ?? "·"; });
  criterion.querySelector(".count").textContent = `${rows.length} / ${LETTERS.length}`;
  criterion.querySelector(".remove-option").disabled = rows.length <= 2;
  criterion.querySelector(".add-option").disabled = rows.length >= LETTERS.length;
}

function addOption(criterion, option = { id: "", description: "" }) {
  const optionsBox = criterion.querySelector(".options");
  if (optionsBox.children.length >= LETTERS.length) return;
  const node = $("option-template").content.firstElementChild.cloneNode(true);
  node.querySelector(".opt-id").value = option.id;
  node.querySelector(".opt-desc").value = option.description;
  optionsBox.append(node);
  syncOptions(criterion);
}

function addCriterion(criterion) {
  const node = $("criterion-template").content.firstElementChild.cloneNode(true);
  node.querySelector(".question").value = criterion?.question ?? "";
  const options = criterion?.options?.length
    ? criterion.options
    : [{ id: "yes", description: "Yes" }, { id: "no", description: "No" }];
  options.forEach((option) => addOption(node, option));
  node.querySelector(".add-option").onclick = () => addOption(node);
  node.querySelector(".remove-option").onclick = () => {
    const optionsBox = node.querySelector(".options");
    if (optionsBox.children.length <= 2) return;
    optionsBox.lastElementChild.remove();
    syncOptions(node);
  };
  node.querySelector(".remove").onclick = () => { node.remove(); renumber(); };
  criteriaBox.append(node);
  renumber();
}

function renumber() {
  const rows = [...criteriaBox.children];
  rows.forEach((row, index) => { row.querySelector(".row-num").textContent = `Q${index + 1}`; });
  $("criteria-count").textContent = `${rows.length} row${rows.length === 1 ? "" : "s"}`;
}

function readCriteria() {
  return [...criteriaBox.children].map((node) => ({
    question: node.querySelector(".question").value.trim(),
    options: [...node.querySelectorAll(".option-row")]
      .map((row) => ({
        id: row.querySelector(".opt-id").value.trim(),
        description: row.querySelector(".opt-desc").value.trim(),
      }))
      .filter((option) => option.id && option.description),
  })).filter((criterion) => criterion.question && criterion.options.length >= 2);
}

/* ---------- clocks ---------- */

function makeClock(timeEl, subEl) {
  let raf = null, started = 0;
  return {
    start(label) {
      started = performance.now();
      timeEl.classList.remove("done");
      subEl.textContent = label;
      const tick = () => {
        timeEl.textContent = secs((performance.now() - started) / 1000);
        raf = requestAnimationFrame(tick);
      };
      tick();
    },
    stop(seconds, label) {
      if (raf) cancelAnimationFrame(raf);
      raf = null;
      timeEl.textContent = secs(seconds);
      timeEl.classList.add("done");
      subEl.textContent = label;
    },
    reset() {
      if (raf) cancelAnimationFrame(raf);
      raf = null;
      timeEl.textContent = "0.00s";
      timeEl.classList.remove("done");
      subEl.textContent = "idle";
    },
  };
}

const readoutClock = makeClock($("readout-clock"), $("readout-sub"));
const genClock = makeClock($("gen-clock"), $("gen-sub"));

/* ---------- rendering ---------- */

function decisionMarkup(decision, index) {
  const options = decision.options.map((option, rank) => `
    <div class="opt${rank === 0 ? " top" : ""}">
      <span class="letter">${option.letter}</span>
      <span class="name">${escapeHtml(option.id)}</span>
      <span class="pct">${pct(option.probability)}</span>
      <span class="track"><span class="fill" style="width:${(option.probability * 100).toFixed(2)}%"></span></span>
    </div>`).join("");
  return `<div class="decision reveal">
      <div class="q"><b>Q${index + 1}</b> ${escapeHtml(decision.question)}</div>${options}
    </div>`;
}

function appendDecision(decision, index) {
  const box = $("readout-output");
  if (box.classList.contains("empty")) { box.className = "output"; box.innerHTML = ""; }
  box.insertAdjacentHTML("beforeend", decisionMarkup(decision, index));
  box.scrollTop = box.scrollHeight;
}

function renderVerdict(result) {
  const problems = [];
  if (!result.isValidJson) problems.push(result.hitTokenCap ? "invalid JSON, hit the token cap" : "invalid JSON");
  if (result.missingKeys.length) problems.push(`${result.missingKeys.length} missing key(s)`);
  if (result.hallucinatedKeys.length) problems.push(`${result.hallucinatedKeys.length} hallucinated key(s)`);
  if (result.outOfRangeValues.length) {
    problems.push(`${result.outOfRangeValues.length} value(s) from another criterion's option set`);
  }
  $("gen-verdict").innerHTML = problems.length
    ? `<span class="fail">✗ ${escapeHtml(problems.join(" · "))}</span>`
    : `<span class="ok">✓ valid JSON · every key present · every value in range</span>`;
}

const DEFAULT_NOTE = "The methods run one after the other on the same loaded weights so they " +
  "never contend for your GPU. The readout runs first, then generation.";

function resetLanes() {
  readoutClock.reset();
  genClock.reset();
  for (const id of ["readout-output", "gen-output"]) {
    const node = $(id);
    node.className = "output empty";
    node.textContent = "waiting for a run";
  }
  ["readout-total", "readout-passes", "gen-ttft", "gen-total", "gen-passes", "gen-tokens"]
    .forEach((id) => { $(id).textContent = "—"; });
  $("readout-tokens").textContent = "0 tokens";
  $("gen-verdict").innerHTML = "";
  $("ratio").textContent = modelReady ? "run it on your machine" : "load a model first";
  $("scorenote").textContent = DEFAULT_NOTE;
}

function revealRace() {
  const race = document.querySelector(".race");
  const box = race.getBoundingClientRect();
  const visible = Math.min(box.bottom, innerHeight) - Math.max(box.top, 0);
  if (visible < Math.min(box.height, innerHeight) * 0.6) {
    race.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function support(kind, text) {
  const node = $("support");
  node.className = `support ${kind}`;
  node.textContent = text;
}

/* ---------- worker plumbing ---------- */

function startWorker() {
  worker = new Worker("worker.js", { type: "module" });
  worker.onmessage = ({ data }) => handle(data);
  worker.onerror = (event) => {
    support("error", `The engine failed to start: ${event.message}`);
    $("load").disabled = false;
  };
  worker.postMessage({ type: "init", manifest });
}

function handle(message) {
  switch (message.type) {
    case "status":
      support("warn", message.message);
      break;

    case "progress": {
      const { loaded, total } = message;
      if (!total) break;
      const fraction = loaded / total;
      $("download-meter").style.width = `${(fraction * 100).toFixed(1)}%`;
      $("download-value").textContent = `${(fraction * 100).toFixed(0)}%`;
      $("download-detail").textContent = `${gb(loaded)} of ${gb(total)}`;
      break;
    }

    case "loaded":
      $("load-value").textContent = secs(message.loadMs / 1000);
      $("download-meter").style.width = "100%";
      $("download-value").textContent = "done";
      break;

    case "ready":
      modelReady = true;
      $("warmup-value").textContent = secs(message.warmupMs / 1000);
      $("warmup-detail").textContent =
        `slots ${message.slots.join(", ")}… · separator: ${message.separator}`
        + (message.addsBos ? " · BOS prepended" : "")
        + ` · ${message.shots} demo${message.shots === 1 ? "" : "s"}`;
      $("map-slots").textContent = `A…P · ids ${message.slots.slice(0, 3).join(", ")}…`;
      $("map-model").textContent = message.modelName;
      support(message.addsBos ? "warn" : "ok",
        `${message.modelName} is loaded. `
        + (message.addsBos
            ? "Note: llama.cpp prepends a BOS token here that the Python engine does not send, "
              + "so answers can differ from the figures in the repository. Run a comparison below."
            : "Run a comparison below."));
      $("load").textContent = "✓ LOADED";
      // wllama holds one model per worker, so the choice is fixed once weights land.
      $("model-select").disabled = true;
      $("model-select").title = "Reload the page to try a different build";
      $("run").disabled = false;
      $("ratio").textContent = "run it on your machine";
      break;

    case "readout-mode":
      support("warn",
        "This build did not return a distribution for a plain prompt, so the readout "
        + "switched to the chat-template path. It works, but sarvam-1 is a base model "
        + "and scores lower this way, so expect weaker answers than the repository reports.");
      break;

    case "readout-start": {
      criterionStarted = performance.now();
      // After the first criterion has actually been timed on THIS device, say how
      // long the rest will take. On a phone a readout is tens of seconds and silence
      // is indistinguishable from a hang.
      let note = message.index === 0 ? " · first is slowest, it builds the shared prefix" : "";
      if (criterionTimes.length) {
        const mean = criterionTimes.reduce((a, b) => a + b, 0) / criterionTimes.length;
        const left = Math.round(mean * (message.total - message.index));
        note = ` · about ${left}s left`;
      }
      $("readout-sub").textContent = `scoring ${message.index + 1} of ${message.total}${note}`;
      if (message.index === 0) {
        const box = $("readout-output");
        box.className = "output empty";
        box.textContent = "processing the shared prefix…";
      }
      break;

    }

    case "readout-progress":
      if (criterionStarted) criterionTimes.push((performance.now() - criterionStarted) / 1000);
      appendDecision(message.decision, message.index);
      $("readout-sub").textContent = `${message.index + 1} of ${message.total} done`;
      break;

    case "readout-done":
      readoutSeconds = message.seconds;
      readoutClock.stop(message.seconds, `${message.decisions.length} decisions`);
      $("readout-total").textContent = secs(message.seconds);
      $("readout-passes").textContent = message.readouts;
      if (criterionTimes.length > 1) {
        const [first, ...rest] = criterionTimes;
        const mean = rest.reduce((a, b) => a + b, 0) / rest.length;
        // If the prefix cache is doing its job the first criterion, which pays for
        // the whole shared state, is markedly slower than the ones that follow.
        $("readout-split").textContent = `${first.toFixed(1)}s / ${mean.toFixed(1)}s`;
      }
      $("readout-tokens").textContent = "0 tokens";
      $("gen-output").className = "output";
      $("gen-output").innerHTML = '<span class="caret"></span>';
      genClock.start("decoding");
      break;

    case "generation-token": {
      const gen = $("gen-output");
      gen.innerHTML = `${escapeHtml(message.text)}<span class="caret"></span>`;
      gen.scrollTop = gen.scrollHeight;
      $("gen-tokens").textContent = `${message.tokenCount} tokens`;
      if (message.tokenCount === 1) $("gen-ttft").textContent = secs(message.elapsedSeconds);
      break;
    }

    case "generation-done": {
      const result = message.result;
      genClock.stop(result.seconds, `${result.generatedTokens} tokens written`);
      $("gen-output").textContent = result.text || "(nothing generated)";
      $("gen-total").textContent = secs(result.seconds);
      $("gen-passes").textContent = result.forwardPasses;
      $("gen-tokens").textContent = `${result.generatedTokens} tokens`;
      if (result.firstTokenSeconds) $("gen-ttft").textContent = secs(result.firstTokenSeconds);
      renderVerdict(result);
      const ratio = result.seconds / Math.max(readoutSeconds, 1e-9);
      $("ratio").textContent = `${ratio.toFixed(1)}× faster`;
      $("scorenote").textContent =
        `The readout finished in ${secs(readoutSeconds)} having written no tokens. Generation ` +
        `needed ${result.generatedTokens} tokens across ${result.forwardPasses} forward passes ` +
        `to say the same thing. Criteria are read one at a time here, so this ratio is lower ` +
        `than the batched server path reports.`;
      break;
    }

    case "run-done":
      $("run").disabled = false;
      $("run").textContent = "▶ RUN BOTH METHODS";
      break;

    case "error":
      readoutClock.reset();
      genClock.reset();
      support("error", message.message);
      $("readout-output").className = "output";
      $("readout-output").innerHTML = `<div class="error-box">${escapeHtml(message.message)}</div>`;
      $("run").disabled = !modelReady;
      $("run").textContent = "▶ RUN BOTH METHODS";
      $("load").disabled = false;
      if (!modelReady) $("load").textContent = "↓ LOAD MODEL";
      break;

    default:
      break;
  }
}

/* ---------- actions ---------- */

function chooseModel(id) {
  if (modelReady) return;                 // a model is already in memory
  chosenModel = id;
  const model = manifest.models.find((m) => m.id === id);
  $("model-select").value = id;
  $("size-chip").textContent = `${model.label} model`;
  $("load").textContent = `↓ LOAD ${model.name.toUpperCase()}`;
}

function loadModel() {
  const modelId = chosenModel;
  $("load").disabled = true;
  $("load").textContent = "LOADING…";
  support("warn", "Starting the engine…");
  if (!worker) startWorker();
  worker.postMessage({ type: "load", modelId });
}

function run() {
  const state = $("state").value.trim();
  const criteria = readCriteria();
  if (!state) return support("error", "Add a state first.");
  if (!criteria.length) return support("error", "Add at least one row with two complete options.");

  $("run").disabled = true;
  $("run").textContent = "▶ RUNNING…";
  resetLanes();
  revealRace();
  criterionTimes = [];
  criterionStarted = 0;
  $("ratio").textContent = "measuring…";
  readoutClock.start("reading logits");
  worker.postMessage({ type: "run", state, criteria });
}

function loadPreset(id) {
  const preset = presets.find((item) => item.id === id);
  if (!preset) return;
  $("state").value = preset.state;
  criteriaBox.innerHTML = "";
  preset.criteria.forEach(addCriterion);
  updateChars();
  resetLanes();
  [...$("preset-buttons").children].forEach((button) => {
    button.classList.toggle("active", button.dataset.preset === id);
  });
}

function updateChars() {
  $("state-chars").textContent = `${$("state").value.length} characters`;
}

/* ---------- boot ---------- */

$("add-criterion").onclick = () => {
  addCriterion();
  criteriaBox.lastElementChild?.scrollIntoView({ block: "nearest" });
};
$("run").onclick = run;
$("load").onclick = loadModel;
$("state").addEventListener("input", updateChars);

(async function boot() {
  try {
    manifest = await (await fetch("models.json")).json();
    const select = $("model-select");
    select.innerHTML = manifest.models.map((model) =>
      `<option value="${model.id}">${escapeHtml(model.name)} · ${model.label} · ${escapeHtml(model.tier)}`
      + `${model.indic === false ? " · not an Indic model" : ""}</option>`).join("");
    select.onchange = () => chooseModel(select.value);
    chooseModel((manifest.models.find((m) => m.default) ?? manifest.models[0]).id);
  } catch (error) {
    support("error", `Could not read models.json: ${error.message}`);
    return;
  }

  try {
    presets = await (await fetch("presets.json")).json();
    $("preset-buttons").innerHTML = presets.map((preset) =>
      `<button class="chip" data-preset="${preset.id}">${escapeHtml(preset.title)}</button>`).join("");
    [...$("preset-buttons").children].forEach((button) => {
      button.onclick = () => loadPreset(button.dataset.preset);
    });
    if (presets.length) loadPreset(presets[0].id);
  } catch { /* presets are a convenience, not a requirement */ }

  // Report what this browser can actually do before anything is downloaded.
  const threads = typeof SharedArrayBuffer !== "undefined" && self.crossOriginIsolated;
  const webgpu = "gpu" in navigator;
  if (!webgpu && !threads) {
    support("warn",
      "No WebGPU and no cross-origin isolation, so inference will run single-threaded on the " +
      "CPU. It works, but expect it to be slow. Chrome or Edge on a desktop is the fastest path.");
  } else if (!threads) {
    support("warn",
      "WebGPU is available, but this page is not cross-origin isolated, so multi-threading is " +
      "off. It will still run. Nothing downloads until you press load.");
  } else {
    support("ok",
      `Ready${webgpu ? " with WebGPU" : ""} and cross-origin isolated. Nothing downloads until ` +
      "you press load.");
  }
})();
