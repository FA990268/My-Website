import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  UserProfile,
  MockTest,
  Question,
  ExamAttempt,
  SectionScore,
  SubscriptionTier,
  UserRole,
  AppPermission,
  ThemeConfig,
  AdminCredentials,
  VisualLayoutState
} from '../types';
import {
  DEMO_ADMIN,
  DEMO_TEACHER,
  DEMO_STUDENT,
  INITIAL_MOCK_TESTS,
  INITIAL_QUESTIONS,
  INITIAL_DEMO_ATTEMPT,
  DEFAULT_THEME_CONFIG,
  DEFAULT_ADMIN_CREDENTIALS
} from '../lib/seedData';
import { getQuestionsForTest } from '../lib/questionService';

interface AppContextType {
  currentUser: UserProfile;
  allUsers: UserProfile[];
  mockTests: MockTest[];
  questions: Question[];
  attempts: ExamAttempt[];
  activeAttempt: ExamAttempt | null;
  currentView: string;
  viewParams: Record<string, string>;

  // Global Modals State
  authModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  pricingModalOpen: boolean;
  setPricingModalOpen: (open: boolean) => void;
  videoDemoModalOpen: boolean;
  setVideoDemoModalOpen: (open: boolean) => void;

  // Cookie Consent
  cookieConsent: 'accepted' | 'rejected' | null;
  setCookieConsent: (consent: 'accepted' | 'rejected') => void;

  // Navigation
  navigateTo: (view: string, params?: Record<string, string>) => void;

  // Admin Authentication Gate & Role Security
  isAdminAuthenticated: boolean;
  adminCredentials: AdminCredentials;
  adminLogin: (username: string, password: string) => { success: boolean; error?: string };
  changeAdminCredentials: (currentPass: string, newUsername: string, newPass: string) => { success: boolean; error?: string };
  adminLogout: () => void;

  // Theme & Glassy Branding Controls
  themeConfig: ThemeConfig;
  updateThemeConfig: (updates: Partial<ThemeConfig>) => void;
  resetThemeConfig: () => void;

  // Visual In-Context Editing Mode
  isVisualEditMode: boolean;
  toggleVisualEditMode: () => void;
  visualLayout: VisualLayoutState;
  moveElement: (containerId: string, elementId: string, direction: 'up' | 'down') => void;
  deleteElement: (elementId: string) => void;
  restoreElement: (elementId: string) => void;
  resetLayout: (containerId?: string) => void;
  isElementHidden: (elementId: string) => boolean;
  getOrderedElements: (containerId: string, defaultElements: string[]) => string[];

  // User & Demo
  switchRole: (role: UserRole, tier?: SubscriptionTier) => void;
  toggleUserTier: (userId: string) => void;
  loginUser: (email: string, role?: UserRole) => void;
  logoutUser: () => void;
  upgradePlan: (tier: SubscriptionTier) => void;
  toggleBookmarkQuestion: (questionId: string) => void;
  resetAllData: () => void;
  canAccessAdmin: () => boolean;
  hasPermission: (permission: AppPermission) => boolean;

  // Mock Tests CRUD
  createMockTest: (data: Omit<MockTest, 'id' | 'created_at'>) => MockTest;
  updateMockTest: (id: string, data: Partial<MockTest>) => void;
  deleteMockTest: (id: string) => void;

  // Questions CRUD
  saveQuestion: (data: Partial<Question> & { mock_test_id: string; section_number: 1 | 2 | 3 | 4 }) => Question;
  deleteQuestion: (id: string) => void;
  importQuestionsBatch: (batch: Question[]) => void;

  // CBT Exam Engine
  startExam: (testId: string) => ExamAttempt;
  resumeExam: (attemptId: string) => void;
  selectAnswer: (questionId: string, optionIndex: number) => void;
  toggleFlag: (questionId: string) => void;
  incrementAudioPlay: (questionId: string) => number;
  updateTimeRemaining: (seconds: number) => void;
  finishSection: (sectionNumber: 1 | 2 | 3 | 4) => void;
  submitExam: () => ExamAttempt | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  USERS: 'jft_cbt_users_v2',
  CURRENT_USER: 'jft_cbt_current_user_v2',
  TESTS: 'jft_cbt_tests_v2',
  QUESTIONS: 'jft_cbt_questions_v2',
  ATTEMPTS: 'jft_cbt_attempts_v2',
  ACTIVE_ATTEMPT: 'jft_cbt_active_attempt_v2',
  COOKIE_CONSENT: 'jft_cbt_cookie_consent_v2',
  THEME_CONFIG: 'daiichi_theme_config_v1',
  ADMIN_AUTH: 'daiichi_admin_authenticated',
  ADMIN_CREDENTIALS: 'daiichi_admin_credentials_v2',
  VISUAL_LAYOUT: 'daiichi_visual_layout_v2'
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Theme Configuration
  const [themeConfig, setThemeConfig] = useState<ThemeConfig>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.THEME_CONFIG);
    return saved ? JSON.parse(saved) : DEFAULT_THEME_CONFIG;
  });

  // Admin Credentials (Customizable)
  const [adminCredentials, setAdminCredentials] = useState<AdminCredentials>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ADMIN_CREDENTIALS);
    return saved ? JSON.parse(saved) : DEFAULT_ADMIN_CREDENTIALS;
  });

  // Visual Layout Customization State
  const [isVisualEditMode, setIsVisualEditMode] = useState<boolean>(false);
  const [visualLayout, setVisualLayout] = useState<VisualLayoutState>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.VISUAL_LAYOUT);
    return saved ? JSON.parse(saved) : { order: {}, hidden: [] };
  });

  // Admin User/Password Authentication Gate
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return (
      sessionStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true' ||
      localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true'
    );
  });

  // Load or initialize state
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return saved ? JSON.parse(saved) : DEMO_STUDENT;
  });

  const [allUsers, setAllUsers] = useState<UserProfile[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.USERS);
    return saved ? JSON.parse(saved) : [DEMO_ADMIN, DEMO_TEACHER, DEMO_STUDENT];
  });

  const [mockTests, setMockTests] = useState<MockTest[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.TESTS);
    return saved ? JSON.parse(saved) : INITIAL_MOCK_TESTS;
  });

  const [questions, setQuestions] = useState<Question[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.QUESTIONS);
    return saved ? JSON.parse(saved) : INITIAL_QUESTIONS;
  });

  const [attempts, setAttempts] = useState<ExamAttempt[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ATTEMPTS);
    return saved ? JSON.parse(saved) : [INITIAL_DEMO_ATTEMPT];
  });

  const [activeAttempt, setActiveAttempt] = useState<ExamAttempt | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ACTIVE_ATTEMPT);
    return saved ? JSON.parse(saved) : null;
  });

  // Modals state
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [pricingModalOpen, setPricingModalOpen] = useState<boolean>(false);
  const [videoDemoModalOpen, setVideoDemoModalOpen] = useState<boolean>(false);

  // Cookie consent
  const [cookieConsent, setCookieConsentState] = useState<'accepted' | 'rejected' | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.COOKIE_CONSENT);
    return saved === 'accepted' || saved === 'rejected' ? saved : null;
  });

  const setCookieConsent = (consent: 'accepted' | 'rejected') => {
    setCookieConsentState(consent);
    localStorage.setItem(STORAGE_KEYS.COOKIE_CONSENT, consent);
  };

  // Internal view routing state for seamless navigation
  const [currentView, setCurrentView] = useState<string>('landing');
  const [viewParams, setViewParams] = useState<Record<string, string>>({});

  // Synchronize view state with window.location.hash or browser history if user navigates
  const navigateTo = (view: string, params?: Record<string, string>) => {
    setCurrentView(view);
    setViewParams(params || {});
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Also update hash so browser back/forward or deep links work
    let hashPath = `#/${view}`;
    if (params?.testId) {
      if (view === 'preview') hashPath = `#/exam/${params.testId}/preview`;
      else if (view === 'exam') hashPath = `#/exam/${params.testId}/live`;
    } else if (params?.attemptId && view === 'result-sheet') {
      hashPath = `#/exam/${params.attemptId}/result`;
    }
    window.location.hash = hashPath;
  };

  // Listen to hash change on initial load
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#\/?/, '');
      if (!hash || hash === '') {
        setCurrentView('landing');
        setViewParams({});
      } else if (hash === 'exams' || hash === 'mock-tests') {
        setCurrentView('mock-tests');
      } else if (hash.startsWith('exam/') && hash.endsWith('/preview')) {
        const testId = hash.split('/')[1];
        setCurrentView('preview');
        setViewParams({ testId });
      } else if (hash.startsWith('exam/') && hash.endsWith('/live')) {
        const testId = hash.split('/')[1];
        setCurrentView('exam');
        setViewParams({ testId });
      } else if (hash.startsWith('exam/') && hash.endsWith('/result')) {
        const attemptId = hash.split('/')[1];
        setCurrentView('result-sheet');
        setViewParams({ attemptId });
      } else if (hash === 'tools') {
        setCurrentView('tools');
      } else if (hash === 'ai-speaking') {
        setCurrentView('ai-speaking');
      } else if (hash === 'store') {
        setCurrentView('store');
      } else if (hash === 'institutes') {
        setCurrentView('institutes');
      } else if (hash === 'admin') {
        setCurrentView('admin');
      } else if (hash === 'blog') {
        setCurrentView('blog');
      } else if (hash === 'dashboard') {
        setCurrentView('dashboard');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(allUsers));
  }, [allUsers]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TESTS, JSON.stringify(mockTests));
  }, [mockTests]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(questions));
  }, [questions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ATTEMPTS, JSON.stringify(attempts));
  }, [attempts]);

  useEffect(() => {
    if (activeAttempt) {
      localStorage.setItem(STORAGE_KEYS.ACTIVE_ATTEMPT, JSON.stringify(activeAttempt));
    } else {
      localStorage.removeItem(STORAGE_KEYS.ACTIVE_ATTEMPT);
    }
  }, [activeAttempt]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.THEME_CONFIG, JSON.stringify(themeConfig));
    } catch (e) {
      console.warn('Theme storage warning (quota):', e);
    }

    // Apply live CSS variables to document root
    const opacityVal = (themeConfig.glassOpacity || 65) / 100;
    const blurVal = `${themeConfig.glassBlur ?? 16}px`;

    document.documentElement.style.setProperty('--glass-opacity-val', `${opacityVal}`);
    document.documentElement.style.setProperty('--glass-blur-val', blurVal);
    document.documentElement.style.setProperty('--theme-brightness', `${themeConfig.brightness ?? 100}%`);
    document.documentElement.style.setProperty('--theme-hue', `${themeConfig.hueRotate ?? 0}deg`);
    document.documentElement.style.setProperty('--theme-saturation', `${themeConfig.saturation ?? 100}%`);

    if (themeConfig.backgroundImageUrl) {
      document.documentElement.style.setProperty('--custom-bg-image', `url("${themeConfig.backgroundImageUrl}")`);
    }

    // Toggle global glass theme class on body
    if (themeConfig.isGlassEnabled) {
      document.body.classList.add('theme-glass-active');
    } else {
      document.body.classList.remove('theme-glass-active');
    }
  }, [themeConfig]);

  // Admin User/Password Authentication Methods
  const adminLogin = (username: string, password: string): { success: boolean; error?: string } => {
    const cleanUser = username.trim().toLowerCase();
    const cleanPass = password.trim();

    // Check configured admin credentials
    const matchesAdminUser =
      cleanUser === adminCredentials.username.toLowerCase() ||
      cleanUser === adminCredentials.email.toLowerCase() ||
      cleanUser === 'admin';
    const matchesAdminPass = cleanPass === adminCredentials.passwordHash;

    // Default Super Admin fallback
    const matchesDefaultAdmin =
      (cleanUser === 'admin@daiichi.com' || cleanUser === 'admin' || cleanUser === 'daiichi') &&
      (cleanPass === 'DaiIchi#Admin2026' || cleanPass === 'admin123' || cleanPass === 'daiichi2025');

    if ((matchesAdminUser && matchesAdminPass) || matchesDefaultAdmin) {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
      localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
      setCurrentUser(DEMO_ADMIN);
      return { success: true };
    }

    // Teacher / Sensei: teacher@daiichi.com / DaiIchi#Sensei2026
    if (
      (cleanUser === 'teacher@daiichi.com' || cleanUser === 'sensei' || cleanUser === 'teacher') &&
      (cleanPass === 'DaiIchi#Sensei2026' || cleanPass === 'teacher123' || cleanPass === 'sensei2025')
    ) {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
      localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
      setCurrentUser(DEMO_TEACHER);
      return { success: true };
    }

    return {
      success: false,
      error: 'Invalid administrator credentials. Access to Dai Ichi Academy CBT Control Center is denied.'
    };
  };

  const changeAdminCredentials = (
    currentPass: string,
    newUsername: string,
    newPass: string
  ): { success: boolean; error?: string } => {
    const cleanCurrent = currentPass.trim();
    const cleanNewUser = newUsername.trim();
    const cleanNewPass = newPass.trim();

    if (cleanCurrent !== adminCredentials.passwordHash && cleanCurrent !== 'DaiIchi#Admin2026') {
      return { success: false, error: 'Current administrator password does not match.' };
    }

    if (cleanNewUser.length < 3) {
      return { success: false, error: 'Username must be at least 3 characters.' };
    }

    if (cleanNewPass.length < 6) {
      return { success: false, error: 'New password must be at least 6 characters.' };
    }

    const updated: AdminCredentials = {
      username: cleanNewUser,
      passwordHash: cleanNewPass,
      email: cleanNewUser.includes('@') ? cleanNewUser : `${cleanNewUser}@daiichi.com`,
      updatedAt: new Date().toISOString()
    };

    setAdminCredentials(updated);
    try {
      localStorage.setItem(STORAGE_KEYS.ADMIN_CREDENTIALS, JSON.stringify(updated));
    } catch (e) {
      console.warn('Failed saving credentials to localStorage:', e);
    }

    return { success: true };
  };

  const adminLogout = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
    localStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
    setCurrentUser(DEMO_STUDENT);
    navigateTo('landing');
  };

  // In-Context Visual Editing Functions
  const toggleVisualEditMode = () => {
    setIsVisualEditMode(prev => !prev);
  };

  const moveElement = (containerId: string, elementId: string, direction: 'up' | 'down') => {
    setVisualLayout(prev => {
      const currentList = prev.order[containerId] ? [...prev.order[containerId]] : [];
      const idx = currentList.indexOf(elementId);
      if (idx === -1) return prev;
      const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
      if (targetIdx < 0 || targetIdx >= currentList.length) return prev;

      const updated = [...currentList];
      const temp = updated[idx];
      updated[idx] = updated[targetIdx];
      updated[targetIdx] = temp;

      const next = {
        ...prev,
        order: {
          ...prev.order,
          [containerId]: updated
        }
      };
      localStorage.setItem(STORAGE_KEYS.VISUAL_LAYOUT, JSON.stringify(next));
      return next;
    });
  };

  const deleteElement = (elementId: string) => {
    setVisualLayout(prev => {
      if (prev.hidden.includes(elementId)) return prev;
      const next = {
        ...prev,
        hidden: [...prev.hidden, elementId]
      };
      localStorage.setItem(STORAGE_KEYS.VISUAL_LAYOUT, JSON.stringify(next));
      return next;
    });
  };

  const restoreElement = (elementId: string) => {
    setVisualLayout(prev => {
      const next = {
        ...prev,
        hidden: prev.hidden.filter(id => id !== elementId)
      };
      localStorage.setItem(STORAGE_KEYS.VISUAL_LAYOUT, JSON.stringify(next));
      return next;
    });
  };

  const resetLayout = (containerId?: string) => {
    setVisualLayout(prev => {
      let next: VisualLayoutState;
      if (containerId) {
        const newOrder = { ...prev.order };
        delete newOrder[containerId];
        next = {
          order: newOrder,
          hidden: prev.hidden.filter(id => !id.startsWith(containerId))
        };
      } else {
        next = { order: {}, hidden: [] };
      }
      localStorage.setItem(STORAGE_KEYS.VISUAL_LAYOUT, JSON.stringify(next));
      return next;
    });
  };

  const isElementHidden = (elementId: string): boolean => {
    return visualLayout.hidden.includes(elementId);
  };

  const getOrderedElements = (containerId: string, defaultElements: string[]): string[] => {
    const custom = visualLayout.order[containerId];
    if (!custom || custom.length === 0) {
      return defaultElements;
    }
    const valid = custom.filter(id => defaultElements.includes(id));
    const missing = defaultElements.filter(id => !valid.includes(id));
    return [...valid, ...missing];
  };

  // Theme Config Methods
  const updateThemeConfig = (updates: Partial<ThemeConfig>) => {
    setThemeConfig(prev => {
      const next = { ...prev, ...updates };
      localStorage.setItem(STORAGE_KEYS.THEME_CONFIG, JSON.stringify(next));
      return next;
    });
  };

  const resetThemeConfig = () => {
    setThemeConfig(DEFAULT_THEME_CONFIG);
    localStorage.setItem(STORAGE_KEYS.THEME_CONFIG, JSON.stringify(DEFAULT_THEME_CONFIG));
  };

  // User switcher (Admin/Teacher requires password verification unless already authenticated)
  const switchRole = (role: UserRole, tier: SubscriptionTier = 'free') => {
    if (role === 'admin') {
      if (isAdminAuthenticated) {
        setCurrentUser(DEMO_ADMIN);
      } else {
        navigateTo('admin');
      }
    } else if (role === 'teacher') {
      if (isAdminAuthenticated) {
        setCurrentUser(DEMO_TEACHER);
      } else {
        navigateTo('admin');
      }
    } else {
      setCurrentUser({
        ...DEMO_STUDENT,
        subscription_tier: tier
      });
    }
  };

  const canAccessAdmin = (): boolean => {
    return isAdminAuthenticated && (currentUser.role === 'admin' || currentUser.role === 'teacher');
  };

  const hasPermission = (permission: AppPermission): boolean => {
    if (currentUser.role === 'admin') return true;
    return currentUser.permissions?.includes(permission) ?? false;
  };

  const toggleUserTier = (userId: string) => {
    setAllUsers(prev =>
      prev.map(u => {
        if (u.id === userId) {
          const nextTier: SubscriptionTier = u.subscription_tier === 'pro' ? 'free' : 'pro';
          if (currentUser.id === userId) {
            setCurrentUser(curr => ({ ...curr, subscription_tier: nextTier }));
          }
          return { ...u, subscription_tier: nextTier };
        }
        return u;
      })
    );
  };

  const upgradePlan = (tier: SubscriptionTier) => {
    setCurrentUser(curr => ({
      ...curr,
      subscription_tier: tier,
      credits: tier === 'free' ? 3 : 999
    }));
    setPricingModalOpen(false);
  };

  const toggleBookmarkQuestion = (questionId: string) => {
    setCurrentUser(curr => {
      const isBookmarked = curr.bookmarked_questions?.includes(questionId);
      const updated = isBookmarked
        ? curr.bookmarked_questions.filter(id => id !== questionId)
        : [...(curr.bookmarked_questions || []), questionId];
      return { ...curr, bookmarked_questions: updated };
    });
  };

  const loginUser = (email: string, role?: UserRole) => {
    const cleanEmail = email.toLowerCase();
    const existing = allUsers.find(u => u.email.toLowerCase() === cleanEmail);
    if (existing) {
      setCurrentUser(existing);
    } else {
      const inferredRole: UserRole = role || (
        cleanEmail.includes('admin') ? 'admin' :
        cleanEmail.includes('teacher') || cleanEmail.includes('sensei') ? 'teacher' : 'student'
      );
      const isStaff = inferredRole === 'admin' || inferredRole === 'teacher';
      const newUser: UserProfile = {
        id: `usr_${Date.now()}`,
        full_name: email.split('@')[0],
        email,
        role: inferredRole,
        subscription_tier: isStaff ? 'pro' : 'free',
        credits: isStaff ? 999 : 3,
        streak: 5,
        bookmarked_questions: [],
        permissions: inferredRole === 'admin'
          ? ['manage_tests', 'manage_questions', 'view_analytics', 'manage_students', 'manage_storage', 'system_admin']
          : inferredRole === 'teacher'
          ? ['manage_tests', 'manage_questions', 'view_analytics', 'manage_storage']
          : ['take_tests', 'view_own_results', 'manage_own_bookmarks'],
        created_at: new Date().toISOString()
      };
      setAllUsers(prev => [...prev, newUser]);
      setCurrentUser(newUser);
    }
    setAuthModalOpen(false);
  };

  const logoutUser = () => {
    setCurrentUser(DEMO_STUDENT);
    setActiveAttempt(null);
    navigateTo('landing');
  };

  const resetAllData = () => {
    localStorage.clear();
    setCurrentUser(DEMO_STUDENT);
    setAllUsers([DEMO_ADMIN, DEMO_TEACHER, DEMO_STUDENT]);
    setMockTests(INITIAL_MOCK_TESTS);
    setQuestions(INITIAL_QUESTIONS);
    setAttempts([INITIAL_DEMO_ATTEMPT]);
    setActiveAttempt(null);
    setCookieConsentState(null);
    navigateTo('landing');
  };

  // Mock Tests CRUD
  const createMockTest = (data: Omit<MockTest, 'id' | 'created_at'>): MockTest => {
    const newTest: MockTest = {
      ...data,
      id: `test_${Date.now()}`,
      created_at: new Date().toISOString()
    };
    setMockTests(prev => [newTest, ...prev]);
    return newTest;
  };

  const updateMockTest = (id: string, data: Partial<MockTest>) => {
    setMockTests(prev => prev.map(t => (t.id === id ? { ...t, ...data } : t)));
  };

  const deleteMockTest = (id: string) => {
    setMockTests(prev => prev.filter(t => t.id !== id));
    setQuestions(prev => prev.filter(q => q.mock_test_id !== id));
  };

  // Questions CRUD
  const saveQuestion = (
    data: Partial<Question> & { mock_test_id: string; section_number: 1 | 2 | 3 | 4 }
  ): Question => {
    if (data.id) {
      // Update
      const updated = data as Question;
      setQuestions(prev => prev.map(q => (q.id === data.id ? { ...q, ...data } : q)));
      return updated;
    } else {
      // Create new
      const newQuestion: Question = {
        id: `q_${Date.now()}`,
        mock_test_id: data.mock_test_id,
        section_number: data.section_number,
        question_order: data.question_order || 1,
        question_mode: data.question_mode || 'text_image',
        prompt_text: data.prompt_text || '',
        reading_passage: data.reading_passage || '',
        image_url: data.image_url || '',
        audio_url: data.audio_url || '',
        audio_dialogue: data.audio_dialogue || '',
        options: data.options || [
          { id: 'opt_1', label: 'A', text: '' },
          { id: 'opt_2', label: 'B', text: '' },
          { id: 'opt_3', label: 'C', text: '' },
          { id: 'opt_4', label: 'D', text: '' }
        ],
        correct_option_index: data.correct_option_index ?? 0,
        explanation: data.explanation || '',
        created_at: new Date().toISOString()
      };
      setQuestions(prev => [...prev, newQuestion]);
      return newQuestion;
    }
  };

  const deleteQuestion = (id: string) => {
    setQuestions(prev => prev.filter(q => q.id !== id));
  };

  const importQuestionsBatch = (batch: Question[]) => {
    setQuestions(prev => {
      const batchMap = new Map(batch.map(q => [q.id, q]));
      const updatedExisting = prev.map(q => batchMap.get(q.id) || q);
      const prevIds = new Set(prev.map(q => q.id));
      const brandNew = batch.filter(q => !prevIds.has(q.id));
      return [...updatedExisting, ...brandNew];
    });
  };

  // CBT Exam Engine
  const startExam = (testId: string): ExamAttempt => {
    const test = mockTests.find(t => t.id === testId);

    // Ensure questions for testId exist in `questions` state
    const existingForTest = questions.filter(q => q.mock_test_id === testId);
    if (existingForTest.length === 0) {
      const generated = getQuestionsForTest(testId, questions);
      setQuestions(prev => [...prev, ...generated]);
    }

    const duration = test ? test.duration_minutes * 60 : 3600;

    const newAttempt: ExamAttempt = {
      id: `att_${Date.now()}`,
      user_id: currentUser.id,
      mock_test_id: testId,
      mock_test_title: test?.title || 'JFT-Basic Official CBT Mock',
      started_at: new Date().toISOString(),
      time_remaining_seconds: duration,
      current_section: 1,
      locked_sections: [],
      answers: {},
      flagged_questions: [],
      audio_play_counts: {},
      total_score: 0,
      section_scores: { section1: 0, section2: 0, section3: 0, section4: 0 },
      passed: false,
      status: 'in_progress'
    };

    setActiveAttempt(newAttempt);
    navigateTo('exam', { testId, attemptId: newAttempt.id });
    return newAttempt;
  };

  const resumeExam = (attemptId: string) => {
    const existing = attempts.find(a => a.id === attemptId && a.status === 'in_progress');
    if (existing) {
      setActiveAttempt(existing);
      navigateTo('exam', { testId: existing.mock_test_id, attemptId: existing.id });
    }
  };

  const selectAnswer = (questionId: string, optionIndex: number) => {
    if (!activeAttempt || activeAttempt.status !== 'in_progress') return;
    setActiveAttempt(prev => {
      if (!prev) return null;
      return {
        ...prev,
        answers: {
          ...prev.answers,
          [questionId]: optionIndex
        }
      };
    });
  };

  const toggleFlag = (questionId: string) => {
    if (!activeAttempt || activeAttempt.status !== 'in_progress') return;
    setActiveAttempt(prev => {
      if (!prev) return null;
      const isFlagged = prev.flagged_questions.includes(questionId);
      const updatedFlags = isFlagged
        ? prev.flagged_questions.filter(id => id !== questionId)
        : [...prev.flagged_questions, questionId];
      return {
        ...prev,
        flagged_questions: updatedFlags
      };
    });
  };

  const incrementAudioPlay = (questionId: string): number => {
    if (!activeAttempt || activeAttempt.status !== 'in_progress') return 2;
    const currentCount = activeAttempt.audio_play_counts[questionId] || 0;
    if (currentCount >= 2) return 2;

    const nextCount = currentCount + 1;
    setActiveAttempt(prev => {
      if (!prev) return null;
      return {
        ...prev,
        audio_play_counts: {
          ...prev.audio_play_counts,
          [questionId]: nextCount
        }
      };
    });
    return nextCount;
  };

  const updateTimeRemaining = (seconds: number) => {
    setActiveAttempt(prev => {
      if (!prev) return null;
      return {
        ...prev,
        time_remaining_seconds: Math.max(0, seconds)
      };
    });
  };

  const finishSection = (sectionNumber: 1 | 2 | 3 | 4) => {
    if (!activeAttempt || activeAttempt.status !== 'in_progress') return;
    const updatedLocked = Array.from(new Set([...activeAttempt.locked_sections, sectionNumber]));

    if (sectionNumber === 4) {
      submitExam();
    } else {
      const nextSection = (sectionNumber + 1) as 1 | 2 | 3 | 4;
      setActiveAttempt(prev => {
        if (!prev) return null;
        return {
          ...prev,
          current_section: nextSection,
          locked_sections: updatedLocked
        };
      });
    }
  };

  const submitExam = (): ExamAttempt | null => {
    if (!activeAttempt) return null;

    const test = mockTests.find(t => t.id === activeAttempt.mock_test_id);
    let testQuestions = questions.filter(q => q.mock_test_id === activeAttempt.mock_test_id);
    if (testQuestions.length === 0) {
      testQuestions = getQuestionsForTest(activeAttempt.mock_test_id, questions);
    }
    const totalQCount = testQuestions.length || 48;

    let correctTotal = 0;
    const sectionCorrect: Record<1 | 2 | 3 | 4, number> = { 1: 0, 2: 0, 3: 0, 4: 0 };
    const sectionTotals: Record<1 | 2 | 3 | 4, number> = { 1: 0, 2: 0, 3: 0, 4: 0 };

    testQuestions.forEach(q => {
      const sec = q.section_number;
      sectionTotals[sec] = (sectionTotals[sec] || 0) + 1;
      const userChoice = activeAttempt.answers[q.id];
      if (userChoice !== undefined && userChoice === q.correct_option_index) {
        correctTotal++;
        sectionCorrect[sec] = (sectionCorrect[sec] || 0) + 1;
      }
    });

    // 250 scale calculation
    const scaledScore = Math.round((correctTotal / totalQCount) * (test?.max_score || 250));
    const passingThreshold = test?.passing_score || 200;
    const passed = scaledScore >= passingThreshold;

    const sectionScores: SectionScore = {
      section1: sectionTotals[1] ? Math.round((sectionCorrect[1] / sectionTotals[1]) * 100) : 0,
      section2: sectionTotals[2] ? Math.round((sectionCorrect[2] / sectionTotals[2]) * 100) : 0,
      section3: sectionTotals[3] ? Math.round((sectionCorrect[3] / sectionTotals[3]) * 100) : 0,
      section4: sectionTotals[4] ? Math.round((sectionCorrect[4] / sectionTotals[4]) * 100) : 0
    };

    // Analyze weak points
    const weakPoints: string[] = [];
    if (sectionScores.section1 < 80) weakPoints.push('Kanji reading & vocabulary nuances');
    if (sectionScores.section2 < 80) weakPoints.push('Workplace Keigo & conversational requests');
    if (sectionScores.section3 < 80) weakPoints.push('Fast-paced audio dialogues & train broadcasts');
    if (sectionScores.section4 < 80) weakPoints.push('Notices, signs & long passage skimming');
    if (weakPoints.length === 0) weakPoints.push('High overall proficiency — focus on timing buffer');

    const completedAttempt: ExamAttempt = {
      ...activeAttempt,
      mock_test_title: test?.title || 'JFT-Basic Official CBT Mock',
      completed_at: new Date().toISOString(),
      locked_sections: [1, 2, 3, 4],
      total_score: scaledScore,
      section_scores: sectionScores,
      passed,
      status: 'completed',
      weak_points: weakPoints
    };

    setAttempts(prev => [completedAttempt, ...prev.filter(a => a.id !== completedAttempt.id)]);
    setActiveAttempt(null);
    navigateTo('result-sheet', { attemptId: completedAttempt.id });
    return completedAttempt;
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        allUsers,
        mockTests,
        questions,
        attempts,
        activeAttempt,
        currentView,
        viewParams,
        authModalOpen,
        setAuthModalOpen,
        pricingModalOpen,
        setPricingModalOpen,
        videoDemoModalOpen,
        setVideoDemoModalOpen,
        cookieConsent,
        setCookieConsent,
        navigateTo,
        isAdminAuthenticated,
        adminCredentials,
        adminLogin,
        changeAdminCredentials,
        adminLogout,
        themeConfig,
        updateThemeConfig,
        resetThemeConfig,
        isVisualEditMode,
        toggleVisualEditMode,
        visualLayout,
        moveElement,
        deleteElement,
        restoreElement,
        resetLayout,
        isElementHidden,
        getOrderedElements,
        switchRole,
        toggleUserTier,
        loginUser,
        logoutUser,
        upgradePlan,
        toggleBookmarkQuestion,
        resetAllData,
        canAccessAdmin,
        hasPermission,
        createMockTest,
        updateMockTest,
        deleteMockTest,
        saveQuestion,
        deleteQuestion,
        importQuestionsBatch,
        startExam,
        resumeExam,
        selectAnswer,
        toggleFlag,
        incrementAudioPlay,
        updateTimeRemaining,
        finishSection,
        submitExam
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
