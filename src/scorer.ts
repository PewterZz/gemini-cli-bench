import { BenchmarkResults, Category, ScenarioResult } from './types';
import { execSync } from 'child_process';

export function score(results: ScenarioResult[]): BenchmarkResults {
  let geminiVersion = 'unknown';
  try {
    geminiVersion = execSync('gemini --version', { encoding: 'utf8' }).trim();
  } catch {
    // gemini not installed or not in PATH
  }

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
    geminiVersion,
    overallScore,
    categoryScores,
    scenarios: results,
  };
}
