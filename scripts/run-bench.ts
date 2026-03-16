import { allScenarios } from '../src/scenarios';
import { runScenario } from '../src/runner';
import { score } from '../src/scorer';
import { printSummary, saveResults } from '../src/reporter';
import { Category } from '../src/types';

const args = process.argv.slice(2);
const categoryFilter = args.includes('--category') ? args[args.indexOf('--category') + 1] as Category : null;
const idFilter = args.includes('--id') ? args[args.indexOf('--id') + 1] : null;

let scenarios = allScenarios;
if (categoryFilter) {
  scenarios = scenarios.filter((s) => s.category === categoryFilter);
  console.log(`Running ${scenarios.length} scenarios in category: ${categoryFilter}`);
} else if (idFilter) {
  scenarios = scenarios.filter((s) => s.id === idFilter);
  console.log(`Running scenario: ${idFilter}`);
} else {
  console.log(`Running all ${scenarios.length} scenarios...\n`);
}

const results = [];
for (const scenario of scenarios) {
  process.stdout.write(`  [${scenario.id}] ${scenario.description}... `);
  const result = runScenario(scenario);
  results.push(result);
  const icon = result.passed ? 'PASS' : `FAIL (${Math.round(result.score * 100)}%)`;
  console.log(icon + ` (${result.durationMs}ms)`);
}

const benchResults = score(results);
printSummary(benchResults);
const outPath = saveResults(benchResults);
console.log(`\nResults saved to: ${outPath}`);
