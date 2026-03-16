import { execSync, spawnSync } from 'child_process';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { Assertion, AssertionResult, Scenario, ScenarioResult } from './types';

function evalAssertion(assertion: Assertion, workdir: string, stdout: string): AssertionResult {
  const base: Omit<AssertionResult, 'passed' | 'actual'> = {
    type: assertion.type,
    target: assertion.target,
    value: assertion.value,
  };

  try {
    switch (assertion.type) {
      case 'file-exists': {
        const filePath = path.join(workdir, assertion.target);
        const exists = fs.existsSync(filePath);
        return { ...base, passed: exists };
      }
      case 'file-contains': {
        const filePath = path.join(workdir, assertion.target);
        if (!fs.existsSync(filePath)) return { ...base, passed: false, actual: '<file missing>' };
        const content = fs.readFileSync(filePath, 'utf8');
        return { ...base, passed: content.includes(assertion.value), actual: content.slice(0, 200) };
      }
      case 'file-not-contains': {
        const filePath = path.join(workdir, assertion.target);
        if (!fs.existsSync(filePath)) return { ...base, passed: true };
        const content = fs.readFileSync(filePath, 'utf8');
        return { ...base, passed: !content.includes(assertion.value) };
      }
      case 'stdout-contains': {
        return { ...base, passed: stdout.includes(assertion.value), actual: stdout.slice(0, 200) };
      }
      case 'exit-code': {
        // exit-code assertions are evaluated in runScenario
        return { ...base, passed: false, actual: 'handled in runner' };
      }
    }
  } catch (err) {
    return { ...base, passed: false, actual: String(err) };
  }
}

export function runScenario(scenario: Scenario): ScenarioResult {
  const start = Date.now();
  const workdir = fs.mkdtempSync(path.join(os.tmpdir(), `gcb-${scenario.id}-`));

  try {
    // Run setup
    execSync(scenario.setup, { cwd: workdir, shell: '/bin/bash', timeout: 10000 });

    // Run gemini-cli
    const result = spawnSync('gemini', ['-p', scenario.prompt, '--yolo'], {
      cwd: workdir,
      timeout: 120000,
      encoding: 'utf8',
    });

    const stdout = (result.stdout || '') + (result.stderr || '');
    const exitCode = result.status ?? -1;

    // Evaluate assertions
    const assertionResults: AssertionResult[] = scenario.assertions.map((a) => {
      if (a.type === 'exit-code') {
        return {
          type: a.type,
          target: a.target,
          value: a.value,
          passed: String(exitCode) === a.value,
          actual: String(exitCode),
        };
      }
      return evalAssertion(a, workdir, stdout);
    });

    const passed = assertionResults.filter((r) => r.passed).length;
    const total = assertionResults.length;
    const score = total > 0 ? passed / total : 0;

    return {
      id: scenario.id,
      category: scenario.category,
      description: scenario.description,
      passed: passed === total,
      score,
      assertionResults,
      durationMs: Date.now() - start,
    };
  } catch (err) {
    return {
      id: scenario.id,
      category: scenario.category,
      description: scenario.description,
      passed: false,
      score: 0,
      assertionResults: [],
      durationMs: Date.now() - start,
      error: String(err),
    };
  } finally {
    fs.rmSync(workdir, { recursive: true, force: true });
  }
}
