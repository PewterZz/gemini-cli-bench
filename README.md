# gemini-cli-bench

A behavioral evaluation benchmark harness for [gemini-cli](https://github.com/google-gemini/gemini-cli).

Built as a demo project for GSoC 2026 idea #2: [Behavioral Evaluation Test Framework](https://docs.google.com/document/d/1iaMZliqwUn-ACyZAbgzdXmDiQZ7l5gp8UQIIY2BnPO8).

## What it tests

40 scenarios across 4 categories:

| Category | Count | What it measures |
|---|---|---|
| debugging | 10 | Can gemini-cli find and fix real bugs? |
| refactoring | 10 | Can it clean up messy code correctly? |
| new-features | 10 | Can it add features to existing code? |
| code-review | 10 | Can it identify real security/quality issues? |

Each scenario:
1. Creates a workspace with real source files
2. Runs `gemini -p '<prompt>' --yolo` against it
3. Asserts on file contents, file existence, or stdout

## Why this exists

gemini-cli already has `evals/` for behavioral tests, but those test whether the model *chooses* to use specific tools. This harness tests *outcomes* — did the code actually get fixed? Did the review actually catch the SQL injection? It is closer in spirit to SWE-bench but targeted at gemini-cli's core use case: helping developers with real coding tasks.

## Results

> Real results will be added after running against gemini-cli.

| Category | Score | Pass | Total |
|---|---|---|---|
| debugging | -- | -- | 10 |
| refactoring | -- | -- | 10 |
| new-features | -- | -- | 10 |
| code-review | -- | -- | 10 |
| **Overall** | **--** | **--** | **40** |

## Setup

```bash
npm install
npm run bench
```

You need `gemini` installed and authenticated:

```bash
npm install -g @google/gemini-cli
gemini auth
```

## Usage

```bash
# Run all 40 scenarios
npm run bench

# Run one category
npm run bench:category debugging

# Run a single scenario
npx ts-node scripts/run-bench.ts --id debug-001
```

Results are saved to `results/YYYY-MM-DD.json`.

## Adding scenarios

Each scenario follows this interface:

```typescript
interface Scenario {
  id: string;
  category: 'debugging' | 'refactoring' | 'new-features' | 'code-review';
  description: string;
  prompt: string;       // sent to gemini verbatim
  setup: string;        // shell commands to create workspace
  assertions: Assertion[];
}
```

Add new scenarios to `src/scenarios/<category>.ts` and export from `src/scenarios/index.ts`.

## Architecture

```
src/
  types.ts       - Scenario, Assertion, Result interfaces
  runner.ts      - Creates temp workspaces, runs gemini-cli, evaluates assertions
  scorer.ts      - Computes category and overall pass rates
  reporter.ts    - Prints summary table, saves JSON results
  scenarios/     - 40 scenarios across 4 categories
scripts/
  run-bench.ts   - CLI entry point
results/         - JSON results from each run
```

## License

MIT
