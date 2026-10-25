import { supabase, isSupabaseConfigured } from './supabase';
import { MockTest, Question, ExamAttempt, UserProfile } from '../types';
import { ALL_MOCK_TESTS } from './mockTestsData';
import { INITIAL_QUESTIONS } from './seedData';

/**
 * DB Service: Unified data interface supporting live Supabase PostgreSQL
 * with automatic fallback to browser localStorage for 100% offline-first reliability.
 */

export interface DatabaseStatus {
  isConnected: boolean;
  provider: 'Supabase PostgreSQL' | 'Offline Local Storage (LocalStorage/Cache)';
  lastSyncAt: string | null;
  testsCount: number;
  questionsCount: number;
}

/**
 * Fetch mock tests from Supabase with local fallback
 */
export async function getMockTests(): Promise<MockTest[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('mock_tests')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        return data as MockTest[];
      }
    } catch (err) {
      console.warn('Supabase getMockTests warning, using local data:', err);
    }
  }

  // Fallback to local storage or bundled seed data
  try {
    const local = localStorage.getItem('jft_cbt_tests_v2');
    if (local) {
      return JSON.parse(local);
    }
  } catch (err) {
    console.warn('LocalStorage read error:', err);
  }

  return ALL_MOCK_TESTS;
}

/**
 * Save or update a mock test
 */
export async function persistMockTest(test: MockTest): Promise<MockTest> {
  // 1. Sync to Supabase if configured
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase
        .from('mock_tests')
        .upsert({
          id: test.id,
          title: test.title,
          category: test.category,
          sub_category: test.subCategory,
          duration_minutes: test.duration_minutes,
          total_questions: test.total_questions,
          max_score: test.max_score,
          passing_score: test.passing_score,
          is_pro: test.is_pro,
          master_pdf_url: test.master_pdf_url,
          is_published: test.is_published,
          updated_at: new Date().toISOString()
        });

      if (error) {
        console.warn('Supabase mock test upsert warning:', error.message);
      }
    } catch (err) {
      console.warn('Supabase persistMockTest error:', err);
    }
  }

  // 2. Sync to local storage
  try {
    const local = localStorage.getItem('jft_cbt_tests_v2');
    const existing: MockTest[] = local ? JSON.parse(local) : ALL_MOCK_TESTS;
    const index = existing.findIndex(t => t.id === test.id);
    let updated: MockTest[];
    if (index >= 0) {
      updated = [...existing];
      updated[index] = test;
    } else {
      updated = [test, ...existing];
    }
    localStorage.setItem('jft_cbt_tests_v2', JSON.stringify(updated));
  } catch (err) {
    console.warn('LocalStorage save error:', err);
  }

  return test;
}

/**
 * Fetch questions for a specific mock test
 */
export async function getQuestionsForTest(testId: string): Promise<Question[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('questions')
        .select('*')
        .eq('mock_test_id', testId)
        .order('section_number', { ascending: true })
        .order('question_order', { ascending: true });

      if (!error && data && data.length > 0) {
        return data as Question[];
      }
    } catch (err) {
      console.warn('Supabase getQuestionsForTest warning:', err);
    }
  }

  // Local fallback
  try {
    const local = localStorage.getItem('jft_cbt_questions_v2');
    if (local) {
      const allQ: Question[] = JSON.parse(local);
      const filtered = allQ.filter(q => q.mock_test_id === testId);
      if (filtered.length > 0) return filtered;
    }
  } catch (err) {
    console.warn('LocalStorage questions read error:', err);
  }

  return INITIAL_QUESTIONS.filter(q => q.mock_test_id === testId);
}

/**
 * Save an exam attempt
 */
export async function persistExamAttempt(attempt: ExamAttempt): Promise<ExamAttempt> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase
        .from('exam_attempts')
        .upsert({
          id: attempt.id,
          user_id: attempt.user_id,
          mock_test_id: attempt.mock_test_id,
          mock_test_title: attempt.mock_test_title,
          started_at: attempt.started_at,
          completed_at: attempt.completed_at,
          time_remaining_seconds: attempt.time_remaining_seconds,
          current_section: attempt.current_section,
          locked_sections: attempt.locked_sections,
          answers: attempt.answers,
          total_score: attempt.total_score,
          section_scores: attempt.section_scores,
          passed: attempt.passed,
          status: attempt.status,
          weak_points: attempt.weak_points || []
        });

      if (error) {
        console.warn('Supabase exam attempt upsert warning:', error.message);
      }
    } catch (err) {
      console.warn('Supabase persistExamAttempt error:', err);
    }
  }

  return attempt;
}

/**
 * Save or update student/user profile
 */
export async function persistUserProfile(profile: UserProfile): Promise<UserProfile> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: profile.id,
          full_name: profile.full_name,
          email: profile.email,
          role: profile.role,
          subscription_tier: profile.subscription_tier,
          credits: profile.credits,
          streak: profile.streak,
          bookmarked_questions: profile.bookmarked_questions,
          avatar_url: profile.avatar_url,
          updated_at: new Date().toISOString()
        });

      if (error) {
        console.warn('Supabase profile upsert warning:', error.message);
      }
    } catch (err) {
      console.warn('Supabase persistUserProfile error:', err);
    }
  }

  return profile;
}

/**
 * Get current Database Connection & Statistics
 */
export function getDatabaseStatus(): DatabaseStatus {
  let testsCount = ALL_MOCK_TESTS.length;
  let questionsCount = INITIAL_QUESTIONS.length;

  try {
    const rawTests = localStorage.getItem('jft_cbt_tests_v2');
    if (rawTests) {
      testsCount = JSON.parse(rawTests).length;
    }
    const rawQuestions = localStorage.getItem('jft_cbt_questions_v2');
    if (rawQuestions) {
      questionsCount = JSON.parse(rawQuestions).length;
    }
  } catch (_) {
    // ignore
  }

  return {
    isConnected: isSupabaseConfigured,
    provider: isSupabaseConfigured ? 'Supabase PostgreSQL' : 'Offline Local Storage (LocalStorage/Cache)',
    lastSyncAt: new Date().toISOString(),
    testsCount,
    questionsCount
  };
}
