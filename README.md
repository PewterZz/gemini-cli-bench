# gemini-cli-bench

An outcome-based behavioral benchmark for [gemini-cli](https://github.com/google-gemini/gemini-cli).

gemini-cli's existing `evals/` suite tests whether the model *chooses* to use the right tool. This project tests whether the code actually got fixed, refactored, extended, or reviewed correctly. Closer in spirit to SWE-bench, but scoped to the everyday tasks gemini-cli is built for.

Built as a demo for GSoC 2026 idea [#2 — Behavioral Evaluation Test Framework](https://docs.google.com/document/d/1iaMZliqwUn-ACyZAbgzdXmDiQZ7l5gp8UQIIY2BnPO8).

---

## Benchmark Design

```
                    ┌──────────────────────────────────┐
                    │         Scenario Setup           │
                    │  shell commands create workspace │
                    │  (real source files with bugs,   │
                    │   code to refactor, etc.)        │
                    └────────────────┬─────────────────┘
                                     │
                                     ▼
                    ┌──────────────────────────────────┐
                    │       gemini -p '<prompt>'       │
                    │            --yolo                │
                    │  (runs in isolated temp dir,     │
                    │   edits files autonomously)      │
                    └────────────────┬─────────────────┘
                                     │
                                     ▼
                    ┌──────────────────────────────────┐
                    │         Assertion Check          │
                    │  file-contains / file-exists /   │
                    │  stdout-contains / exit-code     │
                    └────────────────┬─────────────────┘
                                     │
                                     ▼
                    ┌──────────────────────────────────┐
                    │     Score: passed / total        │
                    │  per scenario, category, overall │
                    └──────────────────────────────────┘
```

Each scenario is isolated in a fresh temp directory. No state leaks between runs.

---

## Scenario Categories

40 scenarios across 4 categories:

| Category | Count | What it measures |
|---|---|---|
| `debugging` | 10 | Does gemini find and fix real bugs? (off-by-one, wrong base case, mutable defaults, etc.) |
| `refactoring` | 10 | Does it clean up code correctly? (DRY, async/await, f-strings, dataclass, etc.) |
| `new-features` | 10 | Does it add features that work? (`__repr__`, `lru_cache`, context manager, argparse, etc.) |
| `code-review` | 10 | Does it identify real issues? (SQL injection, hardcoded creds, race conditions, MD5, etc.) |

Scenarios are specific, not synthetic. Every bug is a real class of bug; every review task targets a real class of vulnerability.

---

## Results

> Baseline run — gemini-cli v0.33.1, Gemini 2.5 Flash, 2026-03-17

| Category | Score | Pass | Total |
|---|---|---|---|
| debugging | -- | -- | 10 |
| refactoring | -- | -- | 10 |
| new-features | -- | -- | 10 |
| code-review | -- | -- | 10 |
| **Overall** | **--** | **--** | **40** |

*Results will be filled in after baseline run completes. Raw JSON in `results/`.*

---

## Setup

Requires Node.js 18+ and gemini-cli:

```bash
npm install -g @google/gemini-cli
gemini auth   # or set GEMINI_API_KEY
```

Clone and install:

```bash
git clone https://github.com/PewterZz/gemini-cli-bench.git
cd gemini-cli-bench
npm install
```

---

## Usage

```bash
# Run all 40 scenarios
npm run bench

# Run one category
npm run bench:category debugging
npm run bench:category refactoring
npm run bench:category new-features
npm run bench:category code-review

# Run a single scenario (useful for debugging assertions)
npx ts-node scripts/run-bench.ts --id debug-001
```

Results print to stdout and save to `results/YYYY-MM-DD.json`.

---

## Adding Scenarios

Each scenario follows this interface:

```typescript
interface Scenario {
  id: string;
  category: 'debugging' | 'refactoring' | 'new-features' | 'code-review';
  description: string;
  prompt: string;         // sent to gemini verbatim
  setup: string;          // shell commands that create the workspace
  assertions: Assertion[];
}

interface Assertion {
  type: 'file-contains' | 'file-not-contains' | 'file-exists' | 'exit-code' | 'stdout-contains';
  target: string;         // file path relative to workspace, or 'stdout'
  value: string;          // substring to match, or exit code as string
}
```

Add to `src/scenarios/<category>.ts` and export from `src/scenarios/index.ts`. Keep assertions concrete — check for specific strings, not fuzzy matches.

---

## Architecture

```
src/
  types.ts              Scenario, Assertion, Result interfaces
  runner.ts             Creates temp workspace, runs gemini-cli, evaluates assertions
  scorer.ts             Computes category and overall pass rates
  reporter.ts           Prints summary table, saves JSON to results/
  scenarios/
    debugging.ts        10 scenarios
    refactoring.ts      10 scenarios
    new-features.ts     10 scenarios
    code-review.ts      10 scenarios
    index.ts            Exports all 40
scripts/
  run-bench.ts          CLI entry point
results/
  YYYY-MM-DD.json       Raw results per run
```

No runtime dependencies beyond `typescript` and `ts-node`.

---

## Limitations

- Assertions are substring-based, not AST-aware. A correct fix that uses different wording can fail.
- gemini-cli is non-deterministic. Results vary across runs.
- Free-tier API quota limits how many scenarios can run per day (~20 requests on gemini-2.5-flash-lite).
- Scenarios currently cover Python and JavaScript only.

---

## License

MIT
