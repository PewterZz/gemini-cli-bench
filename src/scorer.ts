import { execSync } from 'child_process';
import { AgentConfig, AGENTS } from './agents';
import { BenchmarkResults, Category, ScenarioResult } from './types';

function getAgentVersion(agent: AgentConfig): string {
  try {
    if (agent.id === 'gemini') return execSync('gemini --version', { encoding: 'utf8' }).trim();
    if (agent.id === 'claude') return execSync('claude --version', { encoding: 'utf8' }).trim().split('\n')[0];
    if (agent.id === 'codex') return execSync('codex --version', { encoding: 'utf8' }).trim().split('\n')[0];
    return 'unknown';
  } catch {
    return 'unknown';
  }
}

export function score(results: ScenarioResult[], agent: AgentConfig = AGENTS.gemini): BenchmarkResults {
  const categories: Category[] = ['debugging', 'refactoring', 'new-features', 'code-review'];
  const categoryScores = {} as Record<Category, number>;

  for (const cat of categories) {
    const catResults = results.filter((r) => r.category === cat);
    if (catResults.length === 0) {
      categoryScores[cat] = 0;
    } else {
      categoryScores[cat] =
        catResults.reduce((sum, r) => sum + r.score, 0) / catResults.length;
    }
  }

  const overallScore =
    categories.reduce((sum, cat) => sum + categoryScores[cat], 0) / categories.length;

  return {
    timestamp: new Date().toISOString(),
    agent: agent.label,
    agentVersion: getAgentVersion(agent),
    overallScore,
    categoryScores,
    scenarios: results,
  };
}
