# Repository instructions

## Git: never commit

**Do not run `git commit`, `git push`, `git tag`, `git merge`, `git rebase`, `git reset`,
or anything else that writes to history or to the remote. Not even when it seems obviously
wanted, and not even when asked to "finish up" or "wrap this up".**

Sagar commits and pushes everything himself. When work is ready, stop and hand over:

- a short summary of what changed and why,
- the exact commands to run,
- a complete commit message, in a `git commit -F - <<'EOF'` heredoc so it can be pasted as-is.

Read-only git is fine and encouraged: `git status`, `git diff`, `git log`, `git show`,
`git ls-files`, `git check-ignore`. Staging with `git add` is also fine when it helps verify
what would be included — just never take the next step.

## Environment

- System Python is 3.14 and cannot install torch. The project is managed with `uv` against a
  Python 3.12 `.venv`. Use `uv run <command>` — it resolves against `pyproject.toml` and
  `uv.lock`, so the environment cannot drift from what is declared.
- Everything the project needs is declared: runtime deps in `[project.dependencies]` (the demo
  server included, deliberately not behind an extra), and `pytest`, `playwright`,
  `llama-cpp-python` and `gguf` in `[dependency-groups] dev`, which `uv run` installs by
  default. Do not `uv pip install` into `.venv` ad hoc — an undeclared package is one
  `uv sync` away from being removed.
- One CUDA device (RTX 3060, 12GB). sarvam-1 in bf16 fits with room to spare; nothing larger
  in the Sarvam family does, even 4-bit.
- `reference/` holds clones of other people's projects for comparison. It is gitignored and
  must never be committed or modified.

## Commands

```bash
uv run pytest tests/ -q                                                # tokenizer-level, no GPU
uv run uvicorn server.app:app --host 127.0.0.1 --port 8000             # server demo
cd browser && python3 -m http.server 8092                              # browser demo (static)

uv run python bench/phase0.py --model sarvamai/sarvam-1 \
  --input reference/openjev/benchmarks/data/authored144.jsonl \
  --output results/local/<new-name>.json
```

Benchmark outputs are create-only: `bench/` scripts refuse to overwrite an existing output
path. Use a new filename rather than deleting the old one.

## Conventions

- Probabilities from this engine are **conditional on the supplied options and uncalibrated**.
  Every surface that shows them says so. Do not remove or soften that wording.
- Headline numbers in `README.md` and `results/phase0-summary.json` must be backed by a
  committed row-level file under `results/raw/`. If a number changes, regenerate the evidence.
- Do not hand the autoregressive baseline a worse prompt than the readout gets. Both paths use
  the same `q1..qN` key convention and the same few-shot format; an unfair baseline produced a
  flattering 9.1x that turned out to be 5.7x once corrected. "Same settings" is not the same as
  "fair": the readout's output shape is enforced structurally by the grammar and answer slots,
  so dropping few-shot demonstrations costs it almost nothing while leaving generation unable to
  guess the key convention at all. The baseline therefore always gets at least one worked
  example, even when the readout gets none.
- Don't guess at UI rendering. Screenshot it. Two shipped-looking bugs (invisible probability
  bars, Devanagari falling back to tofu) were only visible in a render.
