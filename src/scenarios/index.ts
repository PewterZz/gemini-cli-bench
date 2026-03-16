import { Scenario } from '../types';
import { debuggingScenarios } from './debugging';
import { refactoringScenarios } from './refactoring';
import { newFeatureScenarios } from './new-features';
import { codeReviewScenarios } from './code-review';

export const allScenarios: Scenario[] = [
  ...debuggingScenarios,
  ...refactoringScenarios,
  ...newFeatureScenarios,
  ...codeReviewScenarios,
];
