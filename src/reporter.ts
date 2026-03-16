import * as fs from 'fs';
import * as path from 'path';
import { BenchmarkResults, Category } from './types';

function pct(n: number): string {
  return (n * 100).toFixed(1) + '%';
}

export function printSummary(results: BenchmarkResults): void {
  console.log('\n## gemini-cli-bench Results\n');
  console.log(`Timestamp : ${results.timestamp}`);
  console.log(`gemini    : ${results.geminiVersion}`);
  console.log(`Overall   : ${pct(results.overallScore)}\n`);

  const categories: Category[] = ['debugging', 'refactoring', 'new-features', 'code-review'];
  console.log('| Category      | Score  | Pass | Total |');
  console.log('|---------------|--------|------|-------|');
  for (const cat of categories) {
    const catScenarios = results.scenarios.filter((s) => s.category === cat);
    const passed = catScenarios.filter((s) => s.passed).length;
    console.log(
      `| ${cat.padEnd(13)} | ${pct(results.categoryScores[cat]).padEnd(6)} | ${String(passed).padEnd(4)} | ${catScenarios.length}     |`,
    );
  }

  console.log('\n### Failed scenarios\n');
  const failed = results.scenarios.filter((s) => !s.passed);
  if (failed.length === 0) {
    console.log('None.');
  } else {
    for (const s of failed) {
      console.log(`- [${s.id}] ${s.description}`);
      if (s.error) console.log(`  error: ${s.error}`);
    }
  }
}

export function saveResults(results: BenchmarkResults, outDir = 'results'): string {
  fs.mkdirSync(outDir, { recursive: true });
  const date = new Date().toISOString().slice(0, 10);
  const outPath = path.join(outDir, `${date}.json`);
  fs.writeFileSync(outPath, JSON.stringify(results, null, 2));
  return outPath;
}
