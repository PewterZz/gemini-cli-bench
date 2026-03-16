# Contributing to gemini-cli-bench

Contributions are welcome. This is a small focused project — keep additions scoped and concrete.

## Setup

```bash
git clone https://github.com/PewterZz/gemini-cli-bench.git
cd gemini-cli-bench
npm install
npm install -g @google/gemini-cli
gemini auth   # or export GEMINI_API_KEY=...
```

## Running the benchmark

```bash
npm run bench                          # all 40 scenarios
npm run bench:category debugging       # one category
npx ts-node scripts/run-bench.ts --id debug-001  # single scenario
```

## Adding scenarios

1. Pick a category: `debugging`, `refactoring`, `new-features`, or `code-review`
2. Add to `src/scenarios/<category>.ts` following the existing pattern
3. Export from `src/scenarios/index.ts`
4. Verify your scenario works manually before opening a PR:

```bash
npx ts-node scripts/run-bench.ts --id <your-id>
```

**Good scenario checklist:**
- `setup` creates a self-contained workspace with real source files
- `prompt` ends with "Edit the file in place." for file-editing tasks
- Assertions are concrete — check for specific strings, not generic ones
- The scenario tests one thing, not several at once

## Code style

TypeScript strict mode. No external runtime dependencies. Keep it that way.

```bash
npx tsc --noEmit   # must pass before opening a PR
```

## Commit messages

One line, conventional prefix:

```
feat: add 10 TypeScript scenarios
fix: correct assertion for debug-003
docs: update results table
test: add scenario for async/await refactor
chore: bump ts-node version
```

## Pull request process

1. Fork, create a branch from `main`
2. Make changes, verify typecheck passes
3. Run the affected scenarios manually to confirm assertions are correct
4. Open a PR with a short description of what changed and why

## License

MIT — contributions are licensed under the same terms.
