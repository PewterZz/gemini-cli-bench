import { allScenarios } from '../src/scenarios';
import { runScenario } from '../src/runner';
import { score } from '../src/scorer';
import { printSummary, saveResults } from '../src/reporter';
import { AgentId, AGENTS } from '../src/agents';
import { Category } from '../src/types';

const args = process.argv.slice(2);

function getArg(flag: string): string | null {
  const idx = args.indexOf(flag);
  return idx !== -1 ? args[idx + 1] : null;
}

const agentId = (getArg('--agent') ?? 'gemini') as AgentId;
const agent = AGENTS[agentId];
if (!agent) {
  console.error(`Unknown agent: ${agentId}. Available: ${Object.keys(AGENTS).join(', ')}`);
  process.exit(1);
}

const categoryFilter = getArg('--category') as Category | null;
const idFilter = getArg('--id');

let scenarios = allScenarios;
if (categoryFilter) {
  scenarios = scenarios.filter((s) => s.category === categoryFilter);
  console.log(`Running ${scenarios.length} scenarios in category: ${categoryFilter} (agent: ${agent.label})`);
} else if (idFilter) {
  scenarios = scenarios.filter((s) => s.id === idFilter);
  console.log(`Running scenario: ${idFilter} (agent: ${agent.label})`);
} else {
  console.log(`Running all ${scenarios.length} scenarios (agent: ${agent.label})...\n`);
}

const results = [];
for (const scenario of scenarios) {
  process.stdout.write(`  [${scenario.id}] ${scenario.description}... `);
  const result = runScenario(scenario, agent);
  results.push(result);
  const icon = result.passed ? 'PASS' : `FAIL (${Math.round(result.score * 100)}%)`;
  console.log(icon + ` (${result.durationMs}ms)`);
}

const benchResults = score(results, agent);
printSummary(benchResults);
const outPath = saveResults(benchResults);
console.log(`\nResults saved to: ${outPath}`);
