import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  MockTest,
  Question,
  QuestionMode,
  SECTIONS_CONFIG,
  ExamCategory
} from '../types';
import { renderFurigana } from '../lib/furigana';
import { RestrictedAudioPlayer } from '../components/RestrictedAudioPlayer';
import {
  Users,
  Sparkles,
  BookOpen,
  Award,
  Plus,
  Edit2,
  Trash2,
  FileText,
  Volume2,
  Image as ImageIcon,
  CheckCircle2,
  Eye,
  Search,
  Upload,
  ArrowRight,
  HelpCircle,
  FolderOpen,
  Lock,
  Download,
  Check,
  Columns
} from 'lucide-react';
import { AdminSplitScreenEditor } from '../components/AdminSplitScreenEditor';
import { AdminSetupPanel } from '../components/AdminSetupPanel';

export const AdminPanel: React.FC = () => {
  const {
    currentUser,
    allUsers,
    mockTests,
    questions,
    attempts,
    createMockTest,
    updateMockTest,
    deleteMockTest,
    saveQuestion,
    deleteQuestion,
    importQuestionsBatch,
    toggleUserTier,
    navigateTo,
    startExam
  } = useApp();

  const [activeAdminTab, setActiveAdminTab] = useState<'setup' | 'overview' | 'split-screen' | 'tests' | 'questions' | 'users' | 'import'>('setup');
  const [selectedTestId, setSelectedTestId] = useState<string>(mockTests[0]?.id || 'test_jft_01');
  const [selectedSectionNumber, setSelectedSectionNumber] = useState<1 | 2 | 3 | 4>(1);
  const [userSearchTerm, setUserSearchTerm] = useState<string>('');

  // Test Modal State (Create / Edit)
  const [isTestModalOpen, setIsTestModalOpen] = useState<boolean>(false);
  const [editingTest, setEditingTest] = useState<Partial<MockTest> | null>(null);

  // Question Modal State (Create / Edit)
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState<boolean>(false);
  const [editingQuestion, setEditingQuestion] = useState<Partial<Question> | null>(null);
  const [questionInputMode, setQuestionInputMode] = useState<QuestionMode>('text_image');

  // Excel / JSON Import State
  const [importJsonText, setImportJsonText] = useState<string>('');
  const [importStatusMessage, setImportStatusMessage] = useState<string | null>(null);

  // Stats calculation
  const totalStudents = allUsers.filter(u => u.role === 'student').length;
  const proSubscribers = allUsers.filter(u => u.subscription_tier === 'pro').length;
  const completedAttempts = attempts.filter(a => a.status === 'completed');
  const passCount = completedAttempts.filter(a => a.passed).length;
  const passRate = completedAttempts.length > 0
    ? Math.round((passCount / completedAttempts.length) * 100)
    : 0;

  // Questions for current test and section in CMS
  const filteredQuestions = questions
    .filter(q => q.mock_test_id === selectedTestId && q.section_number === selectedSectionNumber)
    .sort((a, b) => a.question_order - b.question_order);

  // Filtered users
  const filteredUsers = allUsers.filter(u =>
    u.full_name.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(userSearchTerm.toLowerCase())
  );

  const handleOpenCreateTest = () => {
    setEditingTest({
      title: '',
      category: 'JFT Basic',
      duration_minutes: 60,
      total_questions: 48,
      max_score: 250,
      passing_score: 200,
      is_pro: false,
      is_published: true
    });
    setIsTestModalOpen(true);
  };

  const handleOpenEditTest = (test: MockTest) => {
    setEditingTest(test);
    setIsTestModalOpen(true);
  };

  const handleSaveTest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTest) return;

    if (editingTest.id) {
      updateMockTest(editingTest.id, editingTest);
    } else {
      createMockTest(editingTest as any);
    }
    setIsTestModalOpen(false);
    setEditingTest(null);
  };

  const handleOpenCreateQuestion = () => {
    setQuestionInputMode(selectedSectionNumber === 3 ? 'audio_mcq' : 'text_image');
    setEditingQuestion({
      mock_test_id: selectedTestId,
      section_number: selectedSectionNumber,
      question_order: filteredQuestions.length + 1,
      question_mode: selectedSectionNumber === 3 ? 'audio_mcq' : 'text_image',
      prompt_text: '',
      reading_passage: '',
      audio_url: '',
      options: [
        { id: 'opt_1', label: 'A', text: '' },
        { id: 'opt_2', label: 'B', text: '' },
        { id: 'opt_3', label: 'C', text: '' },
        { id: 'opt_4', label: 'D', text: '' }
      ],
      correct_option_index: 0,
      explanation: ''
    });
    setIsQuestionModalOpen(true);
  };

  const handleOpenEditQuestion = (q: Question) => {
    setEditingQuestion(q);
    setQuestionInputMode(q.question_mode);
    setIsQuestionModalOpen(true);
  };

  const handleSaveQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingQuestion) return;

    saveQuestion({
      ...editingQuestion,
      mock_test_id: selectedTestId,
      section_number: selectedSectionNumber,
      question_mode: questionInputMode
    } as any);

    setIsQuestionModalOpen(false);
    setEditingQuestion(null);
  };

  return (
    <div className="w-full min-h-screen space-y-5 font-sans p-2 sm:p-4 md:p-6">
      {/* Admin Panel Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Master Administration & Question Management Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Admin & Teacher Control Center</h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Configure CBT mock sets, author questions with audio/passages, manage student subscriptions, and bulk import items.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1.5 bg-slate-800/90 p-1.5 rounded-2xl border border-slate-700/80 overflow-x-auto">
          <button
            onClick={() => setActiveAdminTab('setup')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition flex items-center gap-1.5 ${
              activeAdminTab === 'setup'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                : 'text-blue-300 hover:text-white bg-blue-950/60 border border-blue-500/30'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>ADMIN SETUP (Model)</span>
            <span className="bg-amber-400 text-slate-900 text-[9px] font-black px-1.5 py-0.2 rounded-full uppercase">NEW</span>
          </button>
          <button
            onClick={() => setActiveAdminTab('split-screen')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeAdminTab === 'split-screen' ? 'bg-rose-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Columns className="w-3.5 h-3.5" />
            <span>Split-Screen Editor</span>
          </button>
          <button
            onClick={() => setActiveAdminTab('overview')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              activeAdminTab === 'overview' ? 'bg-rose-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveAdminTab('tests')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              activeAdminTab === 'tests' ? 'bg-rose-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
            }`}
          >
            Mock Tests
          </button>
          <button
            onClick={() => setActiveAdminTab('questions')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              activeAdminTab === 'questions' ? 'bg-rose-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
            }`}
          >
            Questions
          </button>
          <button
            onClick={() => setActiveAdminTab('users')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              activeAdminTab === 'users' ? 'bg-rose-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
            }`}
          >
            Students
          </button>
          <button
            onClick={() => setActiveAdminTab('import')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              activeAdminTab === 'import' ? 'bg-rose-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
            }`}
          >
            Import JSON/Excel
          </button>
        </div>
      </div>

      {/* =========================================================================
          TAB SETUP: ADMIN SETUP MODEL BUILDER (Screenshot 1)
          ========================================================================= */}
      {activeAdminTab === 'setup' && (
        <AdminSetupPanel
          onClose={() => setActiveAdminTab('overview')}
          onLaunchLiveExam={(testId) => {
            startExam(testId);
            navigateTo('exam');
          }}
        />
      )}

      {/* =========================================================================
          TAB 0: SPLIT-SCREEN PAPER & OPTIONS EDITOR
          ========================================================================= */}
      {activeAdminTab === 'split-screen' && (
        <AdminSplitScreenEditor
          selectedTestId={selectedTestId}
          onSelectTestId={setSelectedTestId}
        />
      )}

      {/* =========================================================================
          TAB 1: OVERVIEW METRICS
          ========================================================================= */}
      {activeAdminTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Students</span>
                <h3 className="text-2xl font-black text-slate-900 mt-0.5">{totalStudents}</h3>
                <p className="text-[10px] text-slate-500">Registered candidates</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
              <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">PRO Subscribers</span>
                <h3 className="text-2xl font-black text-slate-900 mt-0.5">{proSubscribers}</h3>
                <p className="text-[10px] text-slate-500">Unlocked 114+ sets</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Exam Pass Rate</span>
                <h3 className="text-2xl font-black text-slate-900 mt-0.5">{passRate}%</h3>
                <p className="text-[10px] text-slate-500">Scaled score ≥ 200/250</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
              <div className="p-3 bg-rose-50 text-rose-600 rounded-xl">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Mock Tests</span>
                <h3 className="text-2xl font-black text-slate-900 mt-0.5">{mockTests.length}</h3>
                <p className="text-[10px] text-slate-500">Active test sets</p>
              </div>
            </div>
          </div>

          {/* Student Exam Attempts Log */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-slate-900">Recent Student CBT Exam Submissions</h3>
                <p className="text-xs text-slate-500">Live feed of completed 250-scale tests</p>
              </div>
              <span className="text-xs font-bold text-slate-500">{attempts.length} Total Attempts</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold border-y border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Attempt ID</th>
                    <th className="py-3 px-4">Candidate</th>
                    <th className="py-3 px-4">Mock Test</th>
                    <th className="py-3 px-4">Total Score (250)</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4 text-right">Certificate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {attempts.map(att => {
                    const testItem = mockTests.find(t => t.id === att.mock_test_id);
                    return (
                      <tr key={att.id} className="hover:bg-slate-50 transition">
                        <td className="py-3 px-4 font-mono text-[10px]">{att.id.slice(0, 16)}</td>
                        <td className="py-3 px-4 font-bold text-slate-900">{currentUser.full_name}</td>
                        <td className="py-3 px-4">{testItem?.title || att.mock_test_title || 'JFT-Basic Mock'}</td>
                        <td className="py-3 px-4 font-black">
                          <span className={att.passed ? 'text-emerald-600' : 'text-rose-600'}>
                            {att.total_score} / 250
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${att.passed ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                            {att.passed ? 'PASSED ✓' : 'FAILED ✗'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-slate-400 text-[11px]">
                          {att.completed_at ? new Date(att.completed_at).toLocaleDateString() : 'Just now'}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => navigateTo('result-sheet', { attemptId: att.id })}
                            className="text-xs font-bold text-rose-600 hover:underline"
                          >
                            View Result →
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 2: MOCK TESTS MANAGEMENT
          ========================================================================= */}
      {activeAdminTab === 'tests' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <div>
              <h3 className="font-extrabold text-sm text-slate-900">Configured Mock Tests ({mockTests.length})</h3>
              <p className="text-xs text-slate-500">Edit duration, passing criteria, and PRO status</p>
            </div>
            <button
              onClick={handleOpenCreateTest}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-rose-600/30"
            >
              <Plus className="w-4 h-4" />
              <span>Create Mock Test</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockTests.map(t => (
              <div key={t.id} className="bg-white border border-slate-200 rounded-3xl p-5 space-y-3 shadow-xs hover:shadow-sm transition flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
                      {t.category}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${t.is_pro ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>
                      {t.is_pro ? 'PRO' : 'FREE'}
                    </span>
                  </div>
                  <h4 className="font-extrabold text-sm text-slate-900 leading-snug">{t.title}</h4>
                  <div className="text-xs text-slate-500 flex gap-3">
                    <span>{t.total_questions} Questions</span>
                    <span>•</span>
                    <span>{t.duration_minutes} Mins</span>
                    <span>•</span>
                    <span>Pass: {t.passing_score}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEditTest(t)}
                      className="p-1.5 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteMockTest(t.id)}
                      className="p-1.5 text-rose-500 hover:text-rose-700 rounded-lg hover:bg-rose-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setSelectedTestId(t.id);
                        setActiveAdminTab('split-screen');
                      }}
                      className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1"
                    >
                      <Columns className="w-3.5 h-3.5" />
                      <span>Split-Screen →</span>
                    </button>
                    <button
                      onClick={() => {
                        setSelectedTestId(t.id);
                        setActiveAdminTab('questions');
                      }}
                      className="text-xs font-bold text-rose-600 hover:underline"
                    >
                      Questions →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 3: QUESTIONS BUILDER
          ========================================================================= */}
      {activeAdminTab === 'questions' && (
        <div className="space-y-4">
          {/* Split Screen Promo Banner */}
          <div className="bg-gradient-to-r from-indigo-900 to-slate-900 text-white p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-500/20 text-indigo-300 rounded-xl border border-indigo-400/30">
                <Columns className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-extrabold">New: Split-Screen Paper & Options Editor</h4>
                <p className="text-[11px] text-slate-300">
                  View PDF question sheet on the left with options on the right, plus sequential bulk audio & image uploads!
                </p>
              </div>
            </div>
            <button
              onClick={() => setActiveAdminTab('split-screen')}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold transition shrink-0 flex items-center gap-1.5 shadow-sm"
            >
              <span>Launch Split-Screen</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Select Mock Test</label>
                <select
                  value={selectedTestId}
                  onChange={e => setSelectedTestId(e.target.value)}
                  className="px-3 py-1.5 border border-slate-300 rounded-xl text-xs font-bold text-slate-800"
                >
                  {mockTests.map(t => (
                    <option key={t.id} value={t.id}>
                      {t.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Select Section</label>
                <div className="flex rounded-xl bg-slate-100 p-1">
                  {[1, 2, 3, 4].map(s => (
                    <button
                      key={s}
                      onClick={() => setSelectedSectionNumber(s as 1 | 2 | 3 | 4)}
                      className={`px-3 py-1 text-xs font-bold rounded-lg transition ${
                        selectedSectionNumber === s ? 'bg-rose-600 text-white' : 'text-slate-600'
                      }`}
                    >
                      Sec {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={handleOpenCreateQuestion}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-rose-600/30"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Question</span>
            </button>
          </div>

          {/* List of Questions */}
          <div className="space-y-3">
            {filteredQuestions.length === 0 ? (
              <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center text-slate-500 text-xs">
                No custom questions configured for Section {selectedSectionNumber} yet.
                Click "Add New Question" above or import via JSON!
              </div>
            ) : (
              filteredQuestions.map((q, idx) => (
                <div key={q.id} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-black text-xs bg-slate-900 text-white px-2 py-0.5 rounded">
                        Q{q.question_order}
                      </span>
                      <span className="text-[10px] text-slate-400 uppercase font-bold">
                        Mode: {q.question_mode}
                      </span>
                    </div>
                    <div className="text-xs font-japanese font-semibold text-slate-800 line-clamp-1">
                      {q.prompt_text}
                    </div>
                    <div className="text-[11px] text-emerald-600 font-bold">
                      Answer: Option {q.options[q.correct_option_index]?.label} ({q.options[q.correct_option_index]?.text})
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEditQuestion(q)}
                      className="p-1.5 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteQuestion(q.id)}
                      className="p-1.5 text-rose-500 hover:text-rose-700 rounded-lg hover:bg-rose-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 4: STUDENTS MANAGEMENT
          ========================================================================= */}
      {activeAdminTab === 'users' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">Student Subscription & Role Management</h3>
              <p className="text-xs text-slate-500">1-click tier promoter for candidate accounts</p>
            </div>
            <div className="relative w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search candidates..."
                value={userSearchTerm}
                onChange={e => setUserSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-rose-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold border-y border-slate-200">
                <tr>
                  <th className="py-3 px-4">Candidate Name</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Subscription Tier</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {filteredUsers.map(user => (
                  <tr key={user.id} className="hover:bg-slate-50 transition">
                    <td className="py-3 px-4 font-bold text-slate-900">{user.full_name}</td>
                    <td className="py-3 px-4 font-mono text-[11px] text-slate-500">{user.email}</td>
                    <td className="py-3 px-4 uppercase text-[10px] font-bold text-slate-500">{user.role}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${user.subscription_tier === 'pro' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>
                        {user.subscription_tier.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => toggleUserTier(user.id)}
                        className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition"
                      >
                        {user.subscription_tier === 'pro' ? 'Switch to Free' : 'Promote to PRO'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 5: EXCEL / JSON QUESTION UPLOADER
          ========================================================================= */}
      {activeAdminTab === 'import' && (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
                Batch Import Tool
              </span>
              <h2 className="text-xl font-black text-slate-900 mt-0.5">
                Import Questions from JSON / Excel Format
              </h2>
              <p className="text-xs text-slate-500">
                Upload or paste structured Japanese questions to instantly populate mock test sets.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                const sample = [
                  {
                    id: `q_import_${Date.now()}_1`,
                    mock_test_id: selectedTestId,
                    section_number: selectedSectionNumber,
                    question_order: 1,
                    question_mode: 'text_image',
                    prompt_text: 'つぎの ぶんの ＿＿＿の ことばの よみかたとして、もっとも よい ものを １・２・３・４から ひとつ えらんでください。\n\nあしたは [友][とも]だちと [駅][えき]の [前][まえ]で 会います。',
                    options: [
                      { id: 'opt_1', label: 'A', text: 'あいます' },
                      { id: 'opt_2', label: 'B', text: 'いいます' },
                      { id: 'opt_3', label: 'C', text: 'かいます' },
                      { id: 'opt_4', label: 'D', text: 'すいます' }
                    ],
                    correct_option_index: 0,
                    explanation: '「会います」の読み方は「あいます」です。正解はA。'
                  }
                ];
                setImportJsonText(JSON.stringify(sample, null, 2));
                setImportStatusMessage('Sample JSON template loaded below. Edit and click Validate & Import.');
              }}
              className="px-3.5 py-1.5 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-xl text-xs font-bold border border-rose-200 transition"
            >
              Load Sample JSON Template
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Target Mock Test</label>
              <select
                value={selectedTestId}
                onChange={e => setSelectedTestId(e.target.value)}
                className="w-full p-2.5 border border-slate-300 rounded-xl text-xs"
              >
                {mockTests.map(t => (
                  <option key={t.id} value={t.id}>
                    {t.title} ({t.category})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Target Section</label>
              <select
                value={selectedSectionNumber}
                onChange={e => setSelectedSectionNumber(Number(e.target.value) as 1 | 2 | 3 | 4)}
                className="w-full p-2.5 border border-slate-300 rounded-xl text-xs"
              >
                {[1, 2, 3, 4].map(s => (
                  <option key={s} value={s}>
                    Section {s}: {SECTIONS_CONFIG[s as 1 | 2 | 3 | 4].titleEn}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              JSON Data (Array of Question Objects):
            </label>
            <textarea
              rows={8}
              value={importJsonText}
              onChange={e => setImportJsonText(e.target.value)}
              placeholder="Paste JSON array containing questions..."
              className="w-full p-3 font-mono text-xs border border-slate-300 rounded-2xl focus:outline-rose-500 bg-slate-50"
            />
          </div>

          {importStatusMessage && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-900 rounded-xl text-xs font-medium">
              {importStatusMessage}
            </div>
          )}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                try {
                  const parsed = JSON.parse(importJsonText);
                  if (Array.isArray(parsed) && parsed.length > 0) {
                    const mapped = parsed.map((q, idx) => ({
                      ...q,
                      id: q.id || `q_imported_${Date.now()}_${idx}`,
                      mock_test_id: selectedTestId,
                      section_number: selectedSectionNumber,
                      created_at: new Date().toISOString()
                    }));
                    importQuestionsBatch(mapped);
                    setImportStatusMessage(`✓ Successfully imported ${mapped.length} questions into Section ${selectedSectionNumber}!`);
                  } else {
                    setImportStatusMessage('Error: JSON must be an array of question objects.');
                  }
                } catch (err: any) {
                  setImportStatusMessage(`JSON Parse Error: ${err.message}`);
                }
              }}
              className="px-6 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold shadow-md shadow-rose-600/30 transition"
            >
              Validate & Import Questions Now
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: MOCK TEST CONFIGURATION (Create / Edit)
          ========================================================================= */}
      {isTestModalOpen && editingTest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <form onSubmit={handleSaveTest} className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200">
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
              <h3 className="font-bold text-base">
                {editingTest.id ? 'Edit Mock Test' : 'Create New Mock Test'}
              </h3>
              <button
                type="button"
                onClick={() => setIsTestModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs text-slate-700 max-h-[75vh] overflow-y-auto">
              <div>
                <label className="font-bold text-slate-900 block mb-1">Exam Title</label>
                <input
                  type="text"
                  required
                  value={editingTest.title || ''}
                  onChange={e => setEditingTest({ ...editingTest, title: e.target.value })}
                  placeholder="e.g. JFT-Basic Official CBT Mock Test 02"
                  className="w-full p-2.5 border border-slate-300 rounded-xl text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-900 block mb-1">Category Track</label>
                  <select
                    value={editingTest.category || 'JFT Basic'}
                    onChange={e => setEditingTest({ ...editingTest, category: e.target.value as any })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl text-xs"
                  >
                    <option value="JFT Basic">JFT Basic</option>
                    <option value="Irodori Books">Irodori Books</option>
                    <option value="SSW Care Worker">SSW Care Worker</option>
                    <option value="SSW Food Service">SSW Food Service</option>
                    <option value="SSW Construction">SSW Construction</option>
                    <option value="SSW Agriculture">SSW Agriculture</option>
                    <option value="SSW Building Cleaning">SSW Building Cleaning</option>
                    <option value="JLPT Mock Tests">JLPT Mock Tests</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-900 block mb-1">Duration (Minutes)</label>
                  <input
                    type="number"
                    value={editingTest.duration_minutes || 60}
                    onChange={e => setEditingTest({ ...editingTest, duration_minutes: Number(e.target.value) })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-900 block mb-1">Max Score</label>
                  <input
                    type="number"
                    value={editingTest.max_score || 250}
                    onChange={e => setEditingTest({ ...editingTest, max_score: Number(e.target.value) })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-900 block mb-1">Passing Threshold</label>
                  <input
                    type="number"
                    value={editingTest.passing_score || 200}
                    onChange={e => setEditingTest({ ...editingTest, passing_score: Number(e.target.value) })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-900">
                  <input
                    type="checkbox"
                    checked={editingTest.is_pro || false}
                    onChange={e => setEditingTest({ ...editingTest, is_pro: e.target.checked })}
                    className="rounded text-rose-600"
                  />
                  <span>PRO Tier Access Only</span>
                </label>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsTestModalOpen(false)}
                className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold shadow-md"
              >
                Save Mock Test
              </button>
            </div>
          </form>
        </div>
      )}

      {/* =========================================================================
          MODAL: QUESTION BUILDER (Create / Edit)
          ========================================================================= */}
      {isQuestionModalOpen && editingQuestion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <form onSubmit={handleSaveQuestion} className="bg-white rounded-3xl shadow-2xl max-w-xl w-full overflow-hidden border border-slate-200">
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
              <h3 className="font-bold text-base">
                {editingQuestion.id ? 'Edit Question' : 'Add Question'} (Section {selectedSectionNumber})
              </h3>
              <button
                type="button"
                onClick={() => setIsQuestionModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs text-slate-700 max-h-[75vh] overflow-y-auto">
              <div>
                <label className="font-bold text-slate-900 block mb-1">Question Prompt (Japanese)</label>
                <textarea
                  rows={2}
                  required
                  value={editingQuestion.prompt_text || ''}
                  onChange={e => setEditingQuestion({ ...editingQuestion, prompt_text: e.target.value })}
                  placeholder="e.g. つぎの ぶんの ＿＿＿の ことばの よみかたとして..."
                  className="w-full p-2.5 border border-slate-300 rounded-xl font-japanese text-xs"
                />
              </div>

              <div>
                <label className="font-bold text-slate-900 block mb-1">
                  Reading Passage / Audio Script Dialogue
                </label>
                <textarea
                  rows={3}
                  value={editingQuestion.reading_passage || ''}
                  onChange={e => setEditingQuestion({ ...editingQuestion, reading_passage: e.target.value })}
                  placeholder="Optional reading text or Japanese listening dialogue for audio speech synthesis..."
                  className="w-full p-2.5 border border-slate-300 rounded-xl font-japanese text-xs"
                />
              </div>

              {/* 4 Options */}
              <div className="space-y-2">
                <label className="font-bold text-slate-900 block">4 Options (Select radio for correct answer):</label>
                {['A', 'B', 'C', 'D'].map((lbl, idx) => (
                  <div key={lbl} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="correct_opt"
                      checked={editingQuestion.correct_option_index === idx}
                      onChange={() => setEditingQuestion({ ...editingQuestion, correct_option_index: idx })}
                      className="accent-rose-600"
                    />
                    <span className="font-black text-xs text-slate-500 w-4">{lbl}</span>
                    <input
                      type="text"
                      required
                      value={editingQuestion.options?.[idx]?.text || ''}
                      onChange={e => {
                        const newOpts = [...(editingQuestion.options || [])];
                        newOpts[idx] = { id: `opt_${idx + 1}`, label: lbl as any, text: e.target.value };
                        setEditingQuestion({ ...editingQuestion, options: newOpts });
                      }}
                      placeholder={`Option ${lbl} text`}
                      className="flex-1 p-2 border border-slate-300 rounded-xl font-japanese text-xs"
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="font-bold text-slate-900 block mb-1">Explanation</label>
                <input
                  type="text"
                  value={editingQuestion.explanation || ''}
                  onChange={e => setEditingQuestion({ ...editingQuestion, explanation: e.target.value })}
                  placeholder="e.g. 正解はAです。「会います」は「あいます」と読みます。"
                  className="w-full p-2.5 border border-slate-300 rounded-xl text-xs"
                />
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsQuestionModalOpen(false)}
                className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold shadow-md"
              >
                Save Question
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
