import { Question } from '../types';

/**
 * Returns questions for a given mock test ID.
 * If questions exist with matching mock_test_id, returns those.
 * Otherwise, clones and re-maps the 48 baseline questions to ensure
 * full interactive CBT experience across all 24+ mock tests.
 */
export function getQuestionsForTest(testId: string, allQuestions: Question[]): Question[] {
  const directMatches = allQuestions.filter(q => q.mock_test_id === testId);
  if (directMatches.length >= 12) {
    return directMatches.sort((a, b) => {
      if (a.section_number !== b.section_number) return a.section_number - b.section_number;
      return a.question_order - b.question_order;
    });
  }

  // Fallback: adapt the 48 baseline questions (test_jft_01)
  const baseQuestions = allQuestions.filter(q => q.mock_test_id === 'test_jft_01');
  if (baseQuestions.length === 0) {
    return allQuestions.slice(0, 48);
  }

  return baseQuestions.map(q => ({
    ...q,
    id: `${testId}_${q.section_number}_${q.question_order}`,
    mock_test_id: testId
  }));
}
