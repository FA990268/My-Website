import React from 'react';
import { useApp } from '../context/AppContext';
import { SECTIONS_CONFIG } from '../types';
import { getQuestionsForTest } from '../lib/questionService';
import {
  Monitor,
  Clock,
  Volume2,
  Image as ImageIcon,
  CheckCircle2,
  ArrowRight,
  ChevronLeft,
  ShieldAlert,
  HelpCircle,
  Award,
  Layers,
  Lock
} from 'lucide-react';

export const ExamPreview: React.FC = () => {
  const {
    mockTests,
    questions,
    viewParams,
    startExam,
    navigateTo,
    currentUser,
    setPricingModalOpen
  } = useApp();

  const testId = viewParams.testId || 'test_jft_01';
  const test = mockTests.find(t => t.id === testId) || mockTests[0];
  const isPro = currentUser.subscription_tier !== 'free';
  const isLocked = test.is_pro && !isPro;

  // Get test questions or clone baseline
  const testQuestions = getQuestionsForTest(test.id, questions);
  // Pick 5 sample questions across sections
  const sampleQuestions = testQuestions.slice(0, 5);

  const handleLaunchExam = () => {
    if (isLocked) {
      setPricingModalOpen(true);
      return;
    }
    startExam(test.id);
  };

  return (
    <div className="min-h-screen font-sans py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Back Link */}
        <button
          onClick={() => navigateTo('mock-tests')}
          className="glass-capsule-item px-4 py-2 inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 transition"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Mock Tests Directory</span>
        </button>

        {/* Header Hero Banner */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/20 dark:border-white/10 pb-6">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                    test.is_pro ? 'bg-amber-400/20 text-amber-900 dark:text-amber-300 border border-amber-400/30' : 'bg-emerald-400/20 text-emerald-900 dark:text-emerald-300 border border-emerald-400/30'
                  }`}
                >
                  {test.is_pro ? 'PRO Set' : 'Free Access'}
                </span>
                <span className="text-xs font-bold text-rose-600 bg-rose-500/15 border border-rose-500/25 px-2 py-0.5 rounded-full">
                  {test.category}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                {test.title}
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                {test.description}
              </p>
            </div>

            <div className="flex flex-col sm:items-end gap-2 shrink-0">
              <button
                onClick={handleLaunchExam}
                className={`px-6 py-3 rounded-2xl text-xs font-bold shadow-lg transition flex items-center justify-center gap-2 ${
                  isLocked
                    ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-amber-500/20'
                    : 'glass-btn-primary shadow-rose-600/30 active:scale-95'
                }`}
              >
                {isLocked ? (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Unlock PRO Access to Start</span>
                  </>
                ) : (
                  <>
                    <Monitor className="w-4 h-4" />
                    <span>Launch Live CBT Exam Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">
                Official 60:00 Prometric Timer begins immediately
              </p>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-3 glass-panel rounded-2xl">
              <div className="text-xl font-black text-slate-900 dark:text-white">{test.total_questions} Qs</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase">Total Questions</div>
            </div>
            <div className="p-3 glass-panel rounded-2xl">
              <div className="text-xl font-black text-slate-900 dark:text-white">{test.duration_minutes} Mins</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase">Time Limit</div>
            </div>
            <div className="p-3 glass-panel rounded-2xl">
              <div className="text-xl font-black text-rose-600">{test.passing_score} / {test.max_score}</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase">Passing Score</div>
            </div>
            <div className="p-3 glass-panel rounded-2xl">
              <div className="text-xl font-black text-emerald-600 dark:text-emerald-400">2 Plays</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase">Audio Max Limit</div>
            </div>
          </div>
        </div>

        {/* 4 Sections Breakdown */}
        <div className="space-y-4">
          <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-rose-600" />
            <span>4 Sequential Sections in this Exam Paper</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map(num => {
              const sec = SECTIONS_CONFIG[num as 1 | 2 | 3 | 4];
              return (
                <div key={num} className="glass-panel rounded-2xl p-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-600 bg-rose-500/15 border border-rose-500/25 px-2.5 py-0.5 rounded-full">
                      Section {num} • 12 Questions
                    </span>
                    <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
                      Sequential One-Way Lock
                    </span>
                  </div>
                  <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                    {sec.titleEn}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-japanese">
                    {sec.titleJp}
                  </p>
                  <p className="text-xs text-slate-700 dark:text-slate-300 pt-1">
                    {sec.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 5 Sample Questions Preview */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-600">Sample Preview</span>
              <span className="text-[10px] glass-capsule-item px-2 py-0.5 text-slate-700 dark:text-slate-300 font-bold">5 Sample Questions</span>
            </div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
              Sample Questions from this Mock Test
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Familiarize yourself with the style and difficulty of questions contained in this set.
            </p>
          </div>

          <div className="space-y-4">
            {sampleQuestions.map((q, idx) => (
              <div key={q.id} className="p-4 glass-panel rounded-2xl space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-extrabold text-slate-900 dark:text-white">
                    Sample Question #{idx + 1} (Section {q.section_number})
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium uppercase">
                    Mode: {q.question_mode}
                  </span>
                </div>

                <div className="font-japanese text-sm text-slate-900 dark:text-white font-semibold leading-relaxed">
                  {q.prompt_text}
                </div>

                {q.reading_passage && (
                  <div className="p-3 bg-white/40 dark:bg-black/30 border border-white/20 rounded-xl text-xs text-slate-800 dark:text-slate-200 font-japanese leading-relaxed whitespace-pre-line backdrop-blur-sm">
                    {q.reading_passage}
                  </div>
                )}

                {/* Options preview */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {q.options.map((opt, optIdx) => (
                    <div
                      key={opt.id}
                      className={`p-2.5 rounded-xl text-xs border font-medium flex items-center justify-between backdrop-blur-md ${
                        optIdx === q.correct_option_index
                          ? 'bg-emerald-500/20 border-emerald-400/40 text-emerald-950 dark:text-emerald-200'
                          : 'glass-capsule-item text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-md bg-white/30 dark:bg-white/10 text-slate-800 dark:text-slate-200 font-bold text-[10px] flex items-center justify-center">
                          {opt.label}
                        </span>
                        <span className="font-japanese">{opt.text}</span>
                      </div>
                      {optIdx === q.correct_option_index && (
                        <span className="text-[9px] font-black text-emerald-800 dark:text-emerald-300 uppercase bg-emerald-400/30 px-1.5 py-0.5 rounded-full">
                          Answer
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                {q.explanation && (
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 italic pt-1 border-t border-white/10">
                    💡 Explanation: {q.explanation}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Exam Protocol & Safety Checklist */}
        <div className="glass-panel border-amber-400/40 bg-amber-500/10 rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-amber-900 dark:text-amber-300 font-extrabold text-sm">
            <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
            <span>Important Prometric CBT Rules & Instructions</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-amber-950 dark:text-amber-200">
            <div className="space-y-1">
              <div className="font-bold">1. 60-Minute Non-Stop Clock</div>
              <p className="text-amber-800 dark:text-amber-300/80 text-[11px]">The timer cannot be paused once initiated. If time expires, the test automatically submits.</p>
            </div>
            <div className="space-y-1">
              <div className="font-bold">2. Maximum 2 Audio Plays</div>
              <p className="text-amber-800 dark:text-amber-300/80 text-[11px]">Section 3 dialogues play a maximum of 2 times. The replay button locks automatically.</p>
            </div>
            <div className="space-y-1">
              <div className="font-bold">3. One-Way Section Locking</div>
              <p className="text-amber-800 dark:text-amber-300/80 text-[11px]">When transitioning from Section 1 to Section 2, previous answers are permanently locked.</p>
            </div>
          </div>

          <div className="pt-3 border-t border-amber-400/20 flex justify-end">
            <button
              onClick={handleLaunchExam}
              className="px-6 py-2.5 glass-btn-primary rounded-xl text-xs font-bold shadow-md shadow-rose-600/30 transition flex items-center gap-2"
            >
              <span>I Understand the Rules — Begin CBT</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
