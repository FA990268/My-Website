-- ==============================================================================
-- JFT-Basic CBT Mock Exam Platform & Admin CMS Database Schema
-- Compatible with Supabase PostgreSQL (Row-Level Security Enabled)
-- ==============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create PROFILES Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('student', 'admin')) DEFAULT 'student',
  subscription_tier TEXT NOT NULL CHECK (subscription_tier IN ('free', 'pro')) DEFAULT 'free',
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. Create MOCK_TESTS Table
CREATE TABLE IF NOT EXISTS public.mock_tests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'JFT Basic',
  duration_minutes INTEGER NOT NULL DEFAULT 60,
  total_questions INTEGER NOT NULL DEFAULT 48,
  max_score INTEGER NOT NULL DEFAULT 250,
  passing_score INTEGER NOT NULL DEFAULT 200,
  is_pro BOOLEAN NOT NULL DEFAULT FALSE,
  master_pdf_url TEXT,
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 4. Create QUESTIONS Table
CREATE TABLE IF NOT EXISTS public.questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  mock_test_id UUID NOT NULL REFERENCES public.mock_tests(id) ON DELETE CASCADE,
  section_number INTEGER NOT NULL CHECK (section_number IN (1, 2, 3, 4)),
  question_order INTEGER NOT NULL CHECK (question_order BETWEEN 1 AND 12),
  question_mode TEXT NOT NULL CHECK (question_mode IN ('text_image', 'pdf_view', 'audio_mcq')),
  prompt_text TEXT,
  reading_passage TEXT,
  image_url TEXT,
  pdf_url TEXT,
  pdf_page INTEGER DEFAULT 1,
  audio_url TEXT,
  options JSONB NOT NULL DEFAULT '[]'::jsonb,
  correct_option_index INTEGER NOT NULL CHECK (correct_option_index BETWEEN 0 AND 3),
  explanation TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  UNIQUE(mock_test_id, section_number, question_order)
);

-- 5. Create EXAM_ATTEMPTS Table
CREATE TABLE IF NOT EXISTS public.exam_attempts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  mock_test_id UUID NOT NULL REFERENCES public.mock_tests(id) ON DELETE CASCADE,
  started_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  completed_at TIMESTAMPTZ,
  time_remaining_seconds INTEGER NOT NULL DEFAULT 3600,
  current_section INTEGER NOT NULL DEFAULT 1 CHECK (current_section BETWEEN 1 AND 4),
  locked_sections INTEGER[] NOT NULL DEFAULT '{}',
  answers JSONB NOT NULL DEFAULT '{}'::jsonb,
  flagged_questions JSONB NOT NULL DEFAULT '[]'::jsonb,
  audio_play_counts JSONB NOT NULL DEFAULT '{}'::jsonb,
  total_score INTEGER DEFAULT 0,
  section_scores JSONB NOT NULL DEFAULT '{"section1": 0, "section2": 0, "section3": 0, "section4": 0}'::jsonb,
  passed BOOLEAN DEFAULT FALSE,
  status TEXT NOT NULL CHECK (status IN ('in_progress', 'completed')) DEFAULT 'in_progress'
);

-- 6. Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mock_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exam_attempts ENABLE ROW LEVEL SECURITY;

-- 7. RLS Policies
-- Profiles: Users can view their own profile; Admins can view/update all profiles
CREATE POLICY "Public profiles are viewable by owner and admin"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Users can update their own basic profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Mock Tests: Anyone can read published tests; Admins can do all
CREATE POLICY "Published tests are viewable by authenticated users"
  ON public.mock_tests FOR SELECT
  USING (is_published = TRUE OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Admins have full access to mock tests"
  ON public.mock_tests FOR ALL
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- Questions: Viewable by authenticated users taking exam; Admin full access
CREATE POLICY "Questions are viewable by authenticated users"
  ON public.questions FOR SELECT
  USING (TRUE);

CREATE POLICY "Admins have full access to questions"
  ON public.questions FOR ALL
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- Exam Attempts: Users manage their own attempts; Admins can view all
CREATE POLICY "Users can view and manage own exam attempts"
  ON public.exam_attempts FOR ALL
  USING (auth.uid() = user_id OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- 8. Storage Buckets (Execute in Supabase Storage dashboard or SQL)
INSERT INTO storage.buckets (id, name, public) VALUES 
  ('exam-images', 'exam-images', true),
  ('exam-pdfs', 'exam-pdfs', true),
  ('exam-audio', 'exam-audio', true)
ON CONFLICT (id) DO NOTHING;

-- 9. Trigger for New User Creation (Automatic Profile Setup)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, role, subscription_tier)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    NEW.email,
    'student',
    'free'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
