export type AssertionType =
  | 'file-contains'
  | 'file-not-contains'
  | 'file-exists'
  | 'exit-code'
  | 'stdout-contains';

export type Category = 'debugging' | 'refactoring' | 'new-features' | 'code-review';

export interface Assertion {
  type: AssertionType;
  target: string;  // file path relative to workspace, or 'stdout'
  value: string;   // substring to match, or exit code as string
}

export interface Scenario {
  id: string;
  category: Category;
  description: string;
  prompt: string;
  setup: string;      // shell command to create workspace files
  assertions: Assertion[];
}

export interface AssertionResult {
  type: AssertionType;
  target: string;
  value: string;
  passed: boolean;
  actual?: string;
}

export interface ScenarioResult {
  id: string;
  category: Category;
  description: string;
  passed: boolean;
  score: number;        // assertions passed / total
  assertionResults: AssertionResult[];
  durationMs: number;
  error?: string;
}

export interface BenchmarkResults {
  timestamp: string;
  agent: string;
  agentVersion: string;
  overallScore: number;
  categoryScores: Record<Category, number>;
  scenarios: ScenarioResult[];
}
