export type UserRole = 'student' | 'teacher' | 'admin';
export type SubscriptionTier = 'free' | 'trial' | 'monthly' | 'confidence' | 'pro';
export type QuestionMode = 'text_image' | 'pdf_view' | 'audio_mcq';

export type AppPermission =
  | 'take_tests'
  | 'view_own_results'
  | 'manage_own_bookmarks'
  | 'manage_tests'
  | 'manage_questions'
  | 'view_analytics'
  | 'manage_storage'
  | 'manage_students'
  | 'system_admin';

export type StorageBucket =
  | 'exam-pdfs'
  | 'audio-tracks'
  | 'stimulus-images'
  | 'documents'
  | 'user-avatars';

export interface ThemeConfig {
  customLogoUrl: string;
  backgroundImageUrl: string;
  instituteName: string; // 'DAI ICHI ACADEMY CBT'
  instituteTitle: string; // 'Dai Ichi Academy Khulna'
  instituteSlogan: string; // 'Japanese Language and Visa Consultancy'
  isGlassEnabled: boolean;
  glassOpacity: number; // 20 to 100 (%)
  glassBlur: number; // 0 to 40 (px)
  glassBorder: boolean;
  fullTransparency: boolean;
  brightness: number; // 50 to 150 (%)
  colorTone: 'indigo' | 'crimson' | 'sapphire' | 'emerald' | 'amber' | 'obsidian';
  hueRotate: number; // 0 to 360 (deg)
  saturation: number; // 50 to 150 (%)
}

export interface AdminCredentials {
  username: string;
  passwordHash: string;
  email: string;
  updatedAt: string;
}

export interface VisualLayoutState {
  order: Record<string, string[]>; // containerId -> elementIds[]
  hidden: string[]; // elementIds[]
}

export interface CloudFileItem {
  id: string;
  bucket: StorageBucket;
  name: string;
  size: number;
  mime_type: string;
  url: string;
  uploaded_at: string;
  uploaded_by?: string;
}

export type ExamCategory =
  | 'JFT Basic'
  | 'Irodori Books'
  | 'SSW Care Worker'
  | 'SSW Agriculture'
  | 'SSW Construction'
  | 'SSW Building Cleaning'
  | 'SSW Food Service'
  | 'JLPT Mock Tests';

export interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  role: UserRole;
  subscription_tier: SubscriptionTier;
  credits: number;
  streak: number;
  bookmarked_questions: string[];
  avatar_url?: string;
  permissions?: AppPermission[];
  created_at: string;
}

export interface QuestionOption {
  id: string;
  label: 'A' | 'B' | 'C' | 'D';
  text: string;
  image_url?: string;
  translation?: string;
}

export interface Question {
  id: string;
  mock_test_id: string;
  section_number: 1 | 2 | 3 | 4; // 1: Vocab, 2: Conversation, 3: Listening, 4: Reading
  question_order: number; // 1 to 12 within section
  question_mode: QuestionMode;
  prompt_text: string;
  reading_passage?: string;
  image_url?: string;
  pdf_url?: string;
  pdf_page?: number;
  visual_sign_type?: 'hospital' | 'train' | 'calendar' | 'garbage' | 'work_memo' | 'store_poster' | 'emergency';
  audio_url?: string;
  audio_dialogue?: string; // Japanese script for TTS
  audio_characters?: { role: string; text: string }[];
  options: QuestionOption[];
  correct_option_index: number; // 0, 1, 2, 3
  translation_en?: string;
  vocab_breakdown?: { word: string; reading: string; meaning: string }[];
  explanation?: string;
  skill_tag?: 'kanji_reading' | 'kanji_writing' | 'particles' | 'keigo' | 'listening_announcement' | 'listening_conversation' | 'sign_reading' | 'workplace_memo';
  created_at: string;
}

export interface MockTest {
  id: string;
  title: string;
  category: ExamCategory;
  subCategory?: string;
  duration_minutes: number;
  total_questions: number;
  audio_questions_count?: number;
  image_questions_count?: number;
  max_score: number;
  passing_score: number;
  is_pro: boolean;
  pass_rate?: number;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  tags?: string[];
  description?: string;
  master_pdf_url?: string;
  is_published: boolean;
  created_at: string;
}

export interface SectionScore {
  section1: number; // Script & Vocab %
  section2: number; // Conversation %
  section3: number; // Listening %
  section4: number; // Reading %
}

export interface ExamAttempt {
  id: string;
  user_id: string;
  mock_test_id: string;
  mock_test_title?: string;
  started_at: string;
  completed_at?: string;
  time_remaining_seconds: number;
  current_section: 1 | 2 | 3 | 4;
  locked_sections: number[];
  answers: Record<string, number>; // question_id -> selected_option_index
  flagged_questions: string[]; // array of question_ids
  audio_play_counts: Record<string, number>; // question_id -> play_count (max 2)
  total_score: number; // 0 - 250
  section_scores: SectionScore;
  passed: boolean;
  status: 'in_progress' | 'completed';
  weak_points?: string[];
}

export interface SectionMeta {
  sectionNumber: 1 | 2 | 3 | 4;
  titleEn: string;
  titleJp: string;
  questionCount: number;
  description: string;
}

export const SECTIONS_CONFIG: Record<1 | 2 | 3 | 4, SectionMeta> = {
  1: {
    sectionNumber: 1,
    titleEn: 'Script and Vocabulary',
    titleJp: '文字と語彙 (もじとごい)',
    questionCount: 12,
    description: 'Testing Kanji reading, Kanji writing, context vocabulary and usage.'
  },
  2: {
    sectionNumber: 2,
    titleEn: 'Conversation and Expression',
    titleJp: '会話と表現 (かいわとひょうげん)',
    questionCount: 12,
    description: 'Testing practical everyday and workplace conversations in Japan.'
  },
  3: {
    sectionNumber: 3,
    titleEn: 'Listening Comprehension',
    titleJp: '聴解 (ちょうかい)',
    questionCount: 12,
    description: 'Testing auditory comprehension. Note: Max 2 audio plays per question!'
  },
  4: {
    sectionNumber: 4,
    titleEn: 'Reading Comprehension',
    titleJp: '読解 (どっかい)',
    questionCount: 12,
    description: 'Testing understanding of practical texts, notices, emails, and instructions.'
  }
};

export interface EBookItem {
  id: string;
  title: string;
  japaneseTitle: string;
  author: string;
  category: string;
  price: number;
  rating: number;
  reviewCount: number;
  pages: number;
  level: string;
  coverColor: string;
  badge?: string;
  description: string;
  tableOfContents: string[];
  previewPages: {
    pageNumber: number;
    title: string;
    japaneseHeader: string;
    content: string[];
    grammarBox?: { rule: string; explanation: string; examples: string[] };
    vocabularyList?: { word: string; kana: string; meaning: string }[];
  }[];
}

export interface InstituteCohort {
  id: string;
  name: string;
  track: string;
  studentCount: number;
  avgScore: number;
  passRate: number;
  startDate: string;
  targetExamDate: string;
  students: {
    id: string;
    name: string;
    email: string;
    testsTaken: number;
    lastScore: number;
    passProbability: number;
    weakArea: string;
    status: 'Ready' | 'Needs Review' | 'At Risk';
  }[];
}
