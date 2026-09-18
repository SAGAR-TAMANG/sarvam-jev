"use strict";

const $ = (id) => document.getElementById(id);
const LETTERS = "ABCDEFGHIJKLMNOP";
const criteriaBox = $("criteria");
let presets = [];

const pct = (value) => `${(value * 100).toFixed(1)}%`;
const secs = (value) => `${value.toFixed(2)}s`;
const escapeHtml = (text) => String(text).replace(/[&<>"']/g, (c) =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* ---------- criteria editor ---------- */

function syncOptions(criterion) {
  const optionsBox = criterion.querySelector(".options");
  const rows = [...optionsBox.children];
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

/* ---------- lane clocks ---------- */

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

function renderReadout(decisions) {
  const box = $("readout-output");
  box.className = "output";
  box.innerHTML = decisions.map((decision, index) => {
    const options = decision.options.map((option, rank) => `
      <div class="opt${rank === 0 ? " top" : ""}">
        <span class="letter">${option.letter}</span>
        <span class="name">${escapeHtml(option.id)}</span>
        <span class="pct">${pct(option.probability)}</span>
        <span class="track"><span class="fill" style="width:0%"></span></span>
      </div>`).join("");
    return `<div class="decision reveal" style="animation-delay:${index * 40}ms">
        <div class="q"><b>Q${index + 1}</b> ${escapeHtml(decision.question)}</div>${options}
      </div>`;
  }).join("");
  requestAnimationFrame(() => {
    decisions.forEach((decision, index) => {
      const fills = box.children[index].querySelectorAll(".fill");
      decision.options.forEach((option, rank) => {
        fills[rank].style.width = `${(option.probability * 100).toFixed(2)}%`;
      });
    });
  });
}

function renderVerdict(result) {
  const problems = [];
  if (!result.is_valid_json) problems.push(result.hit_token_cap ? "invalid JSON, hit the token cap" : "invalid JSON");
  if (result.missing_keys.length) problems.push(`${result.missing_keys.length} missing key(s)`);
  if (result.hallucinated_keys.length) problems.push(`${result.hallucinated_keys.length} hallucinated key(s)`);
  if (result.out_of_range_values.length) {
    problems.push(`${result.out_of_range_values.length} value(s) from another criterion's option set`);
  }
  $("gen-verdict").innerHTML = problems.length
    ? `<span class="fail">✗ ${escapeHtml(problems.join(" · "))}</span>`
    : `<span class="ok">✓ valid JSON · every key present · every value in range</span>`;
}

const DEFAULT_NOTE = "The methods run sequentially on the same loaded model so they do not " +
  "contend for one GPU. The readout runs first, then generation.";

function resetLanes() {
  readoutClock.reset();
  genClock.reset();
  for (const [id, text] of [["readout-output", "waiting for a run"], ["gen-output", "waiting for a run"]]) {
    const node = $(id);
    node.className = "output empty";
    node.textContent = text;
  }
  ["readout-total", "readout-passes", "gen-ttft", "gen-total", "gen-passes", "gen-tokens"]
    .forEach((id) => { $(id).textContent = "—"; });
  $("readout-tokens").textContent = "0 tokens";
  $("gen-verdict").innerHTML = "";
  $("ratio").textContent = "run it on your GPU";
  $("scorenote").textContent = DEFAULT_NOTE;
}

/* ---------- the run ---------- */

function revealRace() {
  // The button sits at the top of the decision slab, so on a short viewport the
  // lanes are below the fold exactly when there is something to watch.
  const race = document.querySelector(".race");
  const box = race.getBoundingClientRect();
  const visible = Math.min(box.bottom, innerHeight) - Math.max(box.top, 0);
  if (visible < Math.min(box.height, innerHeight) * 0.6) {
    race.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

async function run() {
  const state = $("state").value.trim();
  const criteria = readCriteria();
  if (!state) return fail("Add a state first.");
  if (!criteria.length) return fail("Add at least one row with two complete options.");

  const button = $("run");
  button.disabled = true;
  button.textContent = "▶ RUNNING…";
  resetLanes();
  revealRace();
  $("ratio").textContent = "measuring…";
  readoutClock.start("reading logits");

  let generationText = "";
  let readoutSeconds = 0;

  try {
    const response = await fetch("/api/race", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ state, criteria }),
    });
    if (!response.ok) throw new Error((await response.json()).detail || response.statusText);

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const chunks = buffer.split("\n\n");
      buffer = chunks.pop();
      for (const chunk of chunks) {
        const line = chunk.split("\n").find((l) => l.startsWith("data: "));
        if (!line) continue;
        const event = JSON.parse(line.slice(6));

        if (event.type === "error") throw new Error(event.message);

        if (event.type === "readout") {
          readoutSeconds = event.seconds;
          readoutClock.stop(event.seconds, `${event.decisions.length} decisions`);
          renderReadout(event.decisions);
          $("readout-total").textContent = secs(event.seconds);
          $("readout-passes").textContent = event.forward_passes;
          $("readout-tokens").textContent = "0 tokens";
          $("disclaimer").textContent = event.probability_status;
          const gen = $("gen-output");
          gen.className = "output";
          gen.innerHTML = '<span class="caret"></span>';
          genClock.start("decoding");
        }

        if (event.type === "token") {
          generationText += event.token;
          const gen = $("gen-output");
          gen.innerHTML = `${escapeHtml(generationText)}<span class="caret"></span>`;
          gen.scrollTop = gen.scrollHeight;
          $("gen-tokens").textContent = `${event.token_count} tokens`;
          if (event.token_count === 1) $("gen-ttft").textContent = secs(event.elapsed_seconds);
        }

        if (event.type === "generation_done") {
          const result = event.result;
          genClock.stop(result.total_seconds, `${result.generated_tokens} tokens written`);
          $("gen-output").textContent = result.raw_text || "(nothing generated)";
          $("gen-total").textContent = secs(result.total_seconds);
          $("gen-passes").textContent = result.forward_passes;
          $("gen-tokens").textContent = `${result.generated_tokens} tokens`;
          if (result.first_token_seconds) $("gen-ttft").textContent = secs(result.first_token_seconds);
          renderVerdict(result);
          $("ratio").textContent = `${result.speedup.toFixed(1)}× faster`;
          $("scorenote").textContent =
            `The readout finished in ${secs(readoutSeconds)} having written no tokens. ` +
            `Generation needed ${result.generated_tokens} tokens across ` +
            `${result.forward_passes} forward passes to say the same thing. ` +
            `Measured separately on the same loaded model and aligned at t=0.`;
        }
      }
    }
  } catch (error) {
    readoutClock.reset();
    genClock.reset();
    fail(error.message);
  } finally {
    button.disabled = false;
    button.textContent = "▶ RUN BOTH METHODS";
  }
}

function fail(message) {
  const box = $("readout-output");
  box.className = "output";
  box.innerHTML = `<div class="error-box">${escapeHtml(message)}</div>`;
  $("ratio").textContent = "—";
}

/* ---------- presets & boot ---------- */

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

$("add-criterion").onclick = () => {
  addCriterion();
  criteriaBox.lastElementChild?.scrollIntoView({ block: "nearest" });
};
$("run").onclick = run;
$("state").addEventListener("input", updateChars);

(async function boot() {
  try {
    presets = await (await fetch("/api/presets")).json();
    $("preset-buttons").innerHTML = presets.map((preset) =>
      `<button class="chip" data-preset="${preset.id}">${escapeHtml(preset.title)}</button>`).join("");
    [...$("preset-buttons").children].forEach((button) => {
      button.onclick = () => loadPreset(button.dataset.preset);
    });
    if (presets.length) loadPreset(presets[0].id);
  } catch { /* presets are optional */ }

  try {
    const info = await (await fetch("/api/model")).json();
    if (info.detail) throw new Error(info.detail);
    $("model-chip").textContent = `${info.source} · ${info.dtype}`;
    $("map-model").textContent = info.source;
  } catch (error) {
    $("model-chip").textContent = error.message;
  }
})();
