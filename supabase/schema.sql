-- ==============================================================================
-- JFT-Basic CBT Mock Exam Platform & Admin CMS Database Schema
-- Compatible with Supabase PostgreSQL (Row-Level Security & Multi-Role RBAC)
-- Roles: 'student', 'teacher', 'admin'
-- ==============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Create PROFILES Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL CHECK (role IN ('student', 'teacher', 'admin')) DEFAULT 'student',
  subscription_tier TEXT NOT NULL CHECK (subscription_tier IN ('free', 'trial', 'monthly', 'confidence', 'pro')) DEFAULT 'free',
  credits INTEGER NOT NULL DEFAULT 3,
  streak INTEGER NOT NULL DEFAULT 0,
  bookmarked_questions TEXT[] DEFAULT '{}',
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. Create MOCK_TESTS Table
CREATE TABLE IF NOT EXISTS public.mock_tests (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'JFT Basic',
  sub_category TEXT,
  duration_minutes INTEGER NOT NULL DEFAULT 60,
  total_questions INTEGER NOT NULL DEFAULT 48,
  audio_questions_count INTEGER DEFAULT 0,
  image_questions_count INTEGER DEFAULT 0,
  max_score INTEGER NOT NULL DEFAULT 250,
  passing_score INTEGER NOT NULL DEFAULT 200,
  is_pro BOOLEAN NOT NULL DEFAULT FALSE,
  pass_rate NUMERIC(5,2) DEFAULT 0,
  difficulty TEXT CHECK (difficulty IN ('Beginner', 'Intermediate', 'Advanced')) DEFAULT 'Intermediate',
  description TEXT,
  master_pdf_url TEXT,
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 4. Create TEST_SECTIONS Table (for dynamic split-screen section configurations)
CREATE TABLE IF NOT EXISTS public.test_sections (
  id TEXT PRIMARY KEY,
  mock_test_id TEXT NOT NULL REFERENCES public.mock_tests(id) ON DELETE CASCADE,
  section_number INTEGER NOT NULL CHECK (section_number >= 1),
  title_en TEXT NOT NULL,
  title_jp TEXT,
  points_per_question INTEGER NOT NULL DEFAULT 1,
  section_order INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 5. Create QUESTIONS Table (Supports unlimited questions per section)
CREATE TABLE IF NOT EXISTS public.questions (
  id TEXT PRIMARY KEY,
  mock_test_id TEXT NOT NULL REFERENCES public.mock_tests(id) ON DELETE CASCADE,
  section_number INTEGER NOT NULL CHECK (section_number >= 1),
  question_order INTEGER NOT NULL CHECK (question_order >= 1),
  question_mode TEXT NOT NULL CHECK (question_mode IN ('text_image', 'pdf_view', 'audio_mcq')) DEFAULT 'text_image',
  prompt_text TEXT,
  reading_passage TEXT,
  image_url TEXT,
  pdf_url TEXT,
  pdf_page INTEGER DEFAULT 1,
  visual_sign_type TEXT,
  audio_url TEXT,
  audio_dialogue TEXT,
  options JSONB NOT NULL DEFAULT '[]'::jsonb,
  correct_option_index INTEGER NOT NULL CHECK (correct_option_index BETWEEN 0 AND 3),
  translation_en TEXT,
  explanation TEXT,
  skill_tag TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  UNIQUE(mock_test_id, section_number, question_order)
);

-- 6. Create EXAM_ATTEMPTS Table
CREATE TABLE IF NOT EXISTS public.exam_attempts (
  id TEXT PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  mock_test_id TEXT NOT NULL REFERENCES public.mock_tests(id) ON DELETE CASCADE,
  mock_test_title TEXT,
  started_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  completed_at TIMESTAMPTZ,
  time_remaining_seconds INTEGER NOT NULL DEFAULT 3600,
  current_section INTEGER NOT NULL DEFAULT 1 CHECK (current_section >= 1),
  locked_sections INTEGER[] NOT NULL DEFAULT '{}',
  answers JSONB NOT NULL DEFAULT '{}'::jsonb,
  flagged_questions JSONB NOT NULL DEFAULT '[]'::jsonb,
  audio_play_counts JSONB NOT NULL DEFAULT '{}'::jsonb,
  total_score INTEGER DEFAULT 0,
  section_scores JSONB NOT NULL DEFAULT '{"section1": 0, "section2": 0, "section3": 0, "section4": 0}'::jsonb,
  passed BOOLEAN DEFAULT FALSE,
  status TEXT NOT NULL CHECK (status IN ('in_progress', 'completed')) DEFAULT 'in_progress',
  weak_points TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 7. Create USER_BOOKMARKS Table
CREATE TABLE IF NOT EXISTS public.user_bookmarks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  question_id TEXT NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  UNIQUE(user_id, question_id)
);

-- ==============================================================================
-- 8. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mock_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.test_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exam_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_bookmarks ENABLE ROW LEVEL SECURITY;

-- Helper function to check if current user is Staff (Teacher or Admin)
CREATE OR REPLACE FUNCTION public.is_staff()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
    AND role IN ('teacher', 'admin')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper function to check if current user is Super Admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
    AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- PROFILES POLICIES:
-- 1. Users can view their own profile; Teachers & Admins can view all student profiles for cohorts
CREATE POLICY "Profiles viewable by owner or staff"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id OR public.is_staff());

-- 2. Users can update their own personal info (avatar, name)
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- 3. Only Admins can change user roles and subscription tiers
CREATE POLICY "Admins have full control over profiles"
  ON public.profiles FOR ALL
  USING (public.is_admin());

-- MOCK TESTS POLICIES:
-- 1. Students can view published mock tests
CREATE POLICY "Published tests viewable by all authenticated users"
  ON public.mock_tests FOR SELECT
  USING (is_published = TRUE OR public.is_staff());

-- 2. Teachers and Admins can create and modify mock tests
CREATE POLICY "Teachers and Admins can create and edit tests"
  ON public.mock_tests FOR ALL
  USING (public.is_staff());

-- TEST SECTIONS POLICIES:
CREATE POLICY "Sections viewable by all authenticated users"
  ON public.test_sections FOR SELECT
  USING (TRUE);

CREATE POLICY "Sections manageable by staff"
  ON public.test_sections FOR ALL
  USING (public.is_staff());

-- QUESTIONS POLICIES:
CREATE POLICY "Questions viewable by all authenticated users"
  ON public.questions FOR SELECT
  USING (TRUE);

CREATE POLICY "Questions manageable by staff"
  ON public.questions FOR ALL
  USING (public.is_staff());

-- EXAM ATTEMPTS POLICIES:
-- 1. Students can view and update their own attempts; Staff can view all attempts for analytics
CREATE POLICY "Attempts viewable by owner or staff"
  ON public.exam_attempts FOR SELECT
  USING (auth.uid() = user_id OR public.is_staff());

CREATE POLICY "Users can insert their own attempts"
  ON public.exam_attempts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own in-progress attempts"
  ON public.exam_attempts FOR UPDATE
  USING (auth.uid() = user_id);

-- USER BOOKMARKS POLICIES:
CREATE POLICY "Bookmarks manageable by owner"
  ON public.user_bookmarks FOR ALL
  USING (auth.uid() = user_id);

-- ==============================================================================
-- 9. CLOUD STORAGE BUCKETS SETUP & STORAGE POLICIES
-- ==============================================================================

-- Create buckets for Exam PDFs, Audio tracks, Stimulus images, Documents, and Avatars
INSERT INTO storage.buckets (id, name, public) VALUES 
  ('exam-pdfs', 'exam-pdfs', true),
  ('audio-tracks', 'audio-tracks', true),
  ('stimulus-images', 'stimulus-images', true),
  ('documents', 'documents', true),
  ('user-avatars', 'user-avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS: Public can view assets; Only Staff (Teacher/Admin) can upload exam media
CREATE POLICY "Public Read Access for Exam Media"
  ON storage.objects FOR SELECT
  USING (bucket_id IN ('exam-pdfs', 'audio-tracks', 'stimulus-images', 'documents', 'user-avatars'));

CREATE POLICY "Staff Upload Access for Exam Media"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id IN ('exam-pdfs', 'audio-tracks', 'stimulus-images', 'documents')
    AND public.is_staff()
  );

CREATE POLICY "User Avatar Upload"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'user-avatars' AND auth.uid() IS NOT NULL);

-- ==============================================================================
-- 10. AUTOMATIC PROFILE TRIGGER ON SIGNUP
-- ==============================================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (
    id,
    full_name,
    email,
    role,
    subscription_tier,
    credits,
    streak
  )
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'role', 'student'),
    'free',
    3,
    0
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Trigger to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER touch_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

CREATE TRIGGER touch_mock_tests_updated_at
  BEFORE UPDATE ON public.mock_tests
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
