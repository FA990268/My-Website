import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { SECTIONS_CONFIG, Question } from '../types';
import { renderFurigana } from '../lib/furigana';
import { RestrictedAudioPlayer } from '../components/RestrictedAudioPlayer';
import {
  Clock,
  Flag,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  CheckSquare,
  Lock,
  Type,
  Eye,
  EyeOff,
  User,
  PanelLeftClose,
  PanelLeftOpen,
  LogOut,
  HelpCircle,
  Columns
} from 'lucide-react';
import { SplitScreenLiveExam } from '../components/SplitScreenLiveExam';

export const PrometricCBTExam: React.FC = () => {
  const {
    currentUser,
    mockTests,
    questions,
    activeAttempt,
    selectAnswer,
    toggleFlag,
    incrementAudioPlay,
    updateTimeRemaining,
    finishSection,
    submitExam,
    navigateTo
  } = useApp();

  const [examViewMode, setExamViewMode] = useState<'splitscreen' | 'prometric'>('splitscreen');

  // Redirect if no active attempt
  useEffect(() => {
    if (!activeAttempt) {
      navigateTo('mock-tests');
    }
  }, [activeAttempt, navigateTo]);

  if (!activeAttempt) return null;

  // Render the requested Split-Screen Live Exam Interface (Screenshots 2 & 3) by default
  if (examViewMode === 'splitscreen') {
    return <SplitScreenLiveExam onToggleMode={() => setExamViewMode('prometric')} />;
  }

  const currentTest = mockTests.find(t => t.id === activeAttempt.mock_test_id);
  const currentSectionMeta = SECTIONS_CONFIG[activeAttempt.current_section];

  // Get all questions belonging to current test and current section
  const sectionQuestions: Question[] = questions
    .filter(
      q =>
        q.mock_test_id === activeAttempt.mock_test_id &&
        q.section_number === activeAttempt.current_section
    )
    .sort((a, b) => a.question_order - b.question_order);

  // States
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [showSectionSummary, setShowSectionSummary] = useState<boolean>(false);
  const [showLockWarningModal, setShowLockWarningModal] = useState<boolean>(false);
  const [showFinishExamModal, setShowFinishExamModal] = useState<boolean>(false);

  // Prometric Controls
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg'>('base');
  const [furiganaEnabled, setFuriganaEnabled] = useState<boolean>(true);
  const [paletteDrawerOpen, setPaletteDrawerOpen] = useState<boolean>(true);

  // Safely clamp question index when section changes
  useEffect(() => {
    setCurrentQuestionIndex(0);
    setShowSectionSummary(false);
  }, [activeAttempt.current_section]);

  const activeQuestion: Question | undefined = sectionQuestions[currentQuestionIndex];

  // 60-Minute Countdown Clock Timer
  useEffect(() => {
    const timer = setInterval(() => {
      if (activeAttempt.time_remaining_seconds <= 1) {
        clearInterval(timer);
        updateTimeRemaining(0);
        submitExam();
      } else {
        updateTimeRemaining(activeAttempt.time_remaining_seconds - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [activeAttempt.time_remaining_seconds]);

  // Format seconds to mm:ss
  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const isTimeCritical = activeAttempt.time_remaining_seconds <= 300; // Final 5 minutes

  // Current question states
  const isQuestionAnswered = (qId: string) => activeAttempt.answers[qId] !== undefined;
  const isQuestionFlagged = (qId: string) => activeAttempt.flagged_questions.includes(qId);
  const selectedOptionIdx = activeQuestion ? activeAttempt.answers[activeQuestion.id] : undefined;

  // Next / Previous navigation within section
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < sectionQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setShowSectionSummary(true);
    }
  };

  // Section Lock confirmation handler
  const handleConfirmNextSection = () => {
    setShowLockWarningModal(false);
    setShowSectionSummary(false);
    finishSection(activeAttempt.current_section);
  };

  // Font size styling class
  const getFontSizeClass = () => {
    if (fontSize === 'sm') return 'text-xs md:text-sm';
    if (fontSize === 'lg') return 'text-base md:text-xl';
    return 'text-sm md:text-base';
  };

  // Render question text with optional furigana toggle
  const renderJapaneseText = (rawText?: string) => {
    if (!rawText) return null;
    if (!furiganaEnabled) {
      // Strip [furigana] notation for testing without ruby
      const plain = rawText.replace(/\[([^\]]+)\]/g, '');
      return <span className="font-japanese whitespace-pre-line">{plain}</span>;
    }
    return renderFurigana(rawText);
  };

  // Calculate overall answered count across entire 48-question exam
  const totalAnsweredCount = Object.keys(activeAttempt.answers).length;

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 font-sans select-none overflow-hidden">
      {/* 1. OFFICIAL PROMETRIC CBT TOP HEADER BAR */}
      <header className="bg-slate-900 text-white border-b border-slate-800 shadow-md z-40">
        {/* Top Brand & Candidate Row */}
        <div className="px-4 py-2 border-b border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded bg-rose-600 flex items-center justify-center font-black text-white text-xs">
              JFT
            </div>
            <span className="font-bold text-slate-200 truncate">
              {currentTest?.title || 'Japan Foundation Test for Basic Japanese (JFT-Basic)'}
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-300">
            <div className="hidden sm:flex items-center gap-1.5 bg-slate-800 px-2.5 py-1 rounded-md">
              <User className="w-3.5 h-3.5 text-slate-400" />
              <span>Candidate: <strong>{currentUser.full_name || 'Tanaka Kenji'}</strong></span>
            </div>

            <button
              onClick={() => setExamViewMode('splitscreen')}
              className="px-2.5 py-1 bg-blue-600/90 hover:bg-blue-600 text-white rounded font-bold transition flex items-center gap-1"
              title="Switch to Split-Screen Live Exam View (Screenshots 2 & 3)"
            >
              <Columns className="w-3 h-3" />
              <span>Split-Screen Mode</span>
            </button>

            <button
              onClick={() => setShowFinishExamModal(true)}
              className="px-3 py-1 bg-red-600/90 hover:bg-red-600 text-white rounded font-bold transition flex items-center gap-1"
            >
              <LogOut className="w-3 h-3" />
              <span>Finish Exam</span>
            </button>
          </div>
        </div>

        {/* Section Tabs & Prometric Controls Row */}
        <div className="px-4 py-2 flex flex-wrap items-center justify-between gap-3 bg-slate-850">
          {/* 4 Section Status Indicators */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {[1, 2, 3, 4].map(num => {
              const secNum = num as 1 | 2 | 3 | 4;
              const isCurrent = activeAttempt.current_section === secNum;
              const isLocked = activeAttempt.locked_sections.includes(secNum);

              return (
                <div
                  key={secNum}
                  className={`px-3 py-1 rounded-md text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
                    isCurrent
                      ? 'bg-rose-600 text-white shadow-xs'
                      : isLocked
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  {isLocked && <Lock className="w-3 h-3 text-slate-500" />}
                  <span>Sec {secNum}</span>
                  <span className="hidden md:inline font-normal text-[11px]">
                    ({SECTIONS_CONFIG[secNum].titleEn.split(' ')[0]})
                  </span>
                </div>
              );
            })}
          </div>

          {/* Center / Right Exam Controls */}
          <div className="flex items-center gap-3">
            {/* Furigana Toggle */}
            <button
              onClick={() => setFuriganaEnabled(!furiganaEnabled)}
              title="Toggle Japanese reading furigana on/off"
              className={`px-2.5 py-1 rounded text-xs font-bold border transition flex items-center gap-1.5 ${
                furiganaEnabled
                  ? 'bg-indigo-950/80 border-indigo-700 text-indigo-300'
                  : 'bg-slate-800 border-slate-700 text-slate-400'
              }`}
            >
              {furiganaEnabled ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              <span>Furigana: {furiganaEnabled ? 'ON' : 'OFF'}</span>
            </button>

            {/* Font Size Toggle */}
            <div className="hidden sm:flex items-center gap-1 bg-slate-800 border border-slate-700 rounded p-0.5 text-xs">
              <span className="text-[10px] text-slate-400 px-1 font-semibold">Font:</span>
              <button
                onClick={() => setFontSize('sm')}
                className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${fontSize === 'sm' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                Small
              </button>
              <button
                onClick={() => setFontSize('base')}
                className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${fontSize === 'base' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                Med
              </button>
              <button
                onClick={() => setFontSize('lg')}
                className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${fontSize === 'lg' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                Large
              </button>
            </div>

            {/* Palette Drawer Toggle */}
            <button
              onClick={() => setPaletteDrawerOpen(!paletteDrawerOpen)}
              className="px-2.5 py-1 bg-slate-800 border border-slate-700 hover:bg-slate-700 rounded text-xs font-bold text-slate-300 flex items-center gap-1"
            >
              {paletteDrawerOpen ? <PanelLeftClose className="w-3.5 h-3.5" /> : <PanelLeftOpen className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">Palette</span>
            </button>

            {/* Live Countdown Timer */}
            <div
              className={`flex items-center gap-1.5 px-3 py-1 rounded font-mono font-black text-sm tracking-wider border shadow-xs ${
                isTimeCritical
                  ? 'bg-red-950/90 text-red-400 border-red-700 animate-pulse'
                  : 'bg-slate-900 text-emerald-400 border-slate-700'
              }`}
            >
              <Clock className="w-4 h-4 shrink-0" />
              <span>{formatTime(activeAttempt.time_remaining_seconds)}</span>
            </div>
          </div>
        </div>
      </header>

      {/* 2. CBT MAIN WORKSPACE (Split / Dual Pane) */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Drawer: Question Palette (1–48 Grid) */}
        {paletteDrawerOpen && (
          <aside className="w-64 bg-white border-r border-slate-200 flex flex-col p-4 z-20 shrink-0 overflow-y-auto">
            <div className="space-y-1 pb-3 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">Question Palette</span>
                <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                  {totalAnsweredCount}/48 Answered
                </span>
              </div>
              <p className="text-[10px] text-slate-400">
                Section {activeAttempt.current_section}: {currentSectionMeta.titleEn}
              </p>
            </div>

            {/* Grid of Section Questions */}
            <div className="py-4 flex-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 block">
                Section {activeAttempt.current_section} Questions (1–12):
              </span>
              <div className="grid grid-cols-4 gap-2">
                {sectionQuestions.map((q, idx) => {
                  const answered = isQuestionAnswered(q.id);
                  const flagged = isQuestionFlagged(q.id);
                  const isCurrent = idx === currentQuestionIndex && !showSectionSummary;

                  return (
                    <button
                      key={q.id}
                      onClick={() => {
                        setShowSectionSummary(false);
                        setCurrentQuestionIndex(idx);
                      }}
                      className={`h-10 rounded-lg text-xs font-black relative flex flex-col items-center justify-center transition border ${
                        isCurrent
                          ? 'border-2 border-rose-600 bg-rose-50 text-rose-700 ring-2 ring-rose-300'
                          : answered
                          ? 'bg-emerald-600 border-emerald-700 text-white'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>{idx + 1}</span>
                      {flagged && (
                        <span className="absolute -top-1 -right-1 bg-amber-500 rounded-full p-0.5 shadow-xs">
                          <Flag className="w-2 h-2 text-white fill-white" />
                        </span>
                      )}
                      <span className="text-[7px] uppercase font-bold opacity-75">
                        {answered ? 'Ans' : '—'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Palette Legend */}
            <div className="pt-3 border-t border-slate-200 text-[10px] space-y-1.5 text-slate-600">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-emerald-600 inline-block shrink-0"></span>
                <span>Answered</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded border border-slate-300 bg-white inline-block shrink-0"></span>
                <span>Unanswered</span>
              </div>
              <div className="flex items-center gap-2">
                <Flag className="w-3 h-3 text-amber-500 fill-amber-500 shrink-0" />
                <span>Marked for Review</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded border-2 border-rose-600 bg-rose-50 inline-block shrink-0"></span>
                <span>Current Question</span>
              </div>
            </div>
          </aside>
        )}

        {/* Center / Right Main Content Workspace */}
        <main className="flex-1 flex flex-col bg-slate-50 overflow-y-auto">
          {showSectionSummary ? (
            /* =========================================================================
               SECTION SUMMARY SCREEN (Review Before Locking)
               ========================================================================= */
            <div className="p-6 max-w-4xl mx-auto w-full space-y-6">
              <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 sm:p-8 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
                      Prometric Section Review
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                      Section {activeAttempt.current_section}: {currentSectionMeta.titleEn}
                    </h2>
                    <p className="text-xs text-slate-500 font-japanese mt-0.5">
                      {currentSectionMeta.titleJp} • Review all answers before permanently locking.
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setShowSectionSummary(false)}
                      className="px-4 py-2 border border-slate-300 rounded-xl text-slate-700 hover:bg-slate-100 text-xs font-bold transition"
                    >
                      Return to Questions
                    </button>
                    <button
                      onClick={() => setShowLockWarningModal(true)}
                      className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-xl shadow-md transition flex items-center gap-2 active:scale-95"
                    >
                      <span>
                        {activeAttempt.current_section === 4 ? 'Confirm & Submit Exam' : 'Confirm & Proceed to Next Section'}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Summary Grid of 12 Questions */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider">
                    Status of Section {activeAttempt.current_section} Questions (Click any box to inspect):
                  </h3>

                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                    {sectionQuestions.map((q, idx) => {
                      const answered = isQuestionAnswered(q.id);
                      const flagged = isQuestionFlagged(q.id);

                      return (
                        <div
                          key={q.id}
                          onClick={() => {
                            setShowSectionSummary(false);
                            setCurrentQuestionIndex(idx);
                          }}
                          className={`p-3 rounded-2xl border-2 cursor-pointer transition flex flex-col items-center justify-between min-h-[85px] shadow-2xs hover:shadow-sm hover:scale-102 ${
                            answered
                              ? 'bg-emerald-50 border-emerald-500 text-emerald-950'
                              : 'bg-white border-slate-200 text-slate-800'
                          }`}
                        >
                          <div className="flex justify-between w-full items-center">
                            <span className="font-black text-sm">No. {idx + 1}</span>
                            {flagged && (
                              <Flag className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                            )}
                          </div>

                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              answered ? 'bg-emerald-200 text-emerald-900' : 'bg-slate-100 text-slate-500'
                            }`}
                          >
                            {answered ? 'Answered' : 'Unanswered'}
                          </span>

                          <span className="text-[9px] text-slate-400">Click to review</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Lock Alert Callout */}
                <div className="p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-2xl flex items-start gap-3 text-xs text-amber-900">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold">Prometric One-Way Section Locking Protocol:</h4>
                    <p className="mt-0.5 leading-relaxed text-amber-800">
                      Once you proceed past Section {activeAttempt.current_section}, this section will be permanently locked.
                      You cannot return to change your answers later.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : activeQuestion ? (
            /* =========================================================================
               QUESTION & STIMULUS WORKSPACE (Dual Pane or Clean Layout)
               ========================================================================= */
            <div className="flex-1 p-4 md:p-6 max-w-4xl mx-auto w-full space-y-6">
              {/* Question Sub-Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="font-black text-sm bg-slate-900 text-white px-3 py-1 rounded-lg">
                    Question {currentQuestionIndex + 1} of {sectionQuestions.length}
                  </span>
                  <span className="text-xs font-bold text-slate-500">
                    Section {activeAttempt.current_section} ({currentSectionMeta.titleEn})
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleFlag(activeQuestion.id)}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition ${
                      isQuestionFlagged(activeQuestion.id)
                        ? 'bg-amber-50 border-amber-400 text-amber-800 shadow-2xs'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Flag
                      className={`w-3.5 h-3.5 ${
                        isQuestionFlagged(activeQuestion.id) ? 'text-amber-500 fill-amber-500' : 'text-slate-400'
                      }`}
                    />
                    <span>{isQuestionFlagged(activeQuestion.id) ? 'Marked for Review' : 'Mark for Review'}</span>
                  </button>
                </div>
              </div>

              {/* Stimulus & Prompt Area */}
              <div className="space-y-4">
                {/* Listening Audio Mode (Section 3) */}
                {activeQuestion.question_mode === 'audio_mcq' && (
                  <div className="space-y-4">
                    <RestrictedAudioPlayer
                      questionId={activeQuestion.id}
                      audioUrl={activeQuestion.audio_url}
                      audioScript={activeQuestion.reading_passage || activeQuestion.prompt_text || ''}
                      playCount={activeAttempt.audio_play_counts[activeQuestion.id] || 0}
                      onPlayIncrement={() => incrementAudioPlay(activeQuestion.id)}
                    />
                  </div>
                )}

                {/* Reading Passage / Workplace Memo Stimulus */}
                {activeQuestion.reading_passage && activeQuestion.question_mode !== 'audio_mcq' && (
                  <div className="bg-white border-2 border-slate-300 rounded-2xl p-5 shadow-xs font-japanese space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-2 text-xs font-bold text-slate-500">
                      <span>📄 Reading Material / Workplace Notice</span>
                      <span>Read carefully before answering</span>
                    </div>
                    <div className={`leading-relaxed text-slate-800 whitespace-pre-line ${getFontSizeClass()}`}>
                      {renderJapaneseText(activeQuestion.reading_passage)}
                    </div>
                  </div>
                )}

                {/* Question Prompt */}
                {activeQuestion.prompt_text && (
                  <div
                    className={`bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs leading-relaxed text-slate-900 font-japanese font-semibold ${getFontSizeClass()}`}
                  >
                    {renderJapaneseText(activeQuestion.prompt_text)}
                  </div>
                )}

                {/* Uploaded / Sample Image Illustration if present */}
                {activeQuestion.image_url && (
                  <div className="flex justify-center p-3 bg-white rounded-2xl border border-slate-200">
                    <img
                      src={activeQuestion.image_url}
                      alt="Question Illustration"
                      className="max-h-60 object-contain rounded-lg"
                    />
                  </div>
                )}

                {/* 4 PROMETRIC MULTIPLE-CHOICE OPTION BUTTONS */}
                <div className="pt-2 space-y-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    Select One Answer (A, B, C, or D):
                  </span>

                  {activeQuestion.options.map((opt, optIdx) => {
                    const isSelected = selectedOptionIdx === optIdx;

                    return (
                      <button
                        key={opt.id || opt.label}
                        type="button"
                        onClick={() => selectAnswer(activeQuestion.id, optIdx)}
                        className={`w-full text-left p-4 rounded-2xl border-2 transition flex items-center justify-between group shadow-2xs ${
                          isSelected
                            ? 'bg-gradient-to-r from-rose-600 to-red-600 border-rose-600 text-white font-bold shadow-md translate-x-1'
                            : 'bg-white border-slate-200 text-slate-800 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black transition ${
                              isSelected
                                ? 'bg-white text-rose-600 shadow-xs'
                                : 'bg-slate-100 text-slate-700 group-hover:bg-slate-200'
                            }`}
                          >
                            {opt.label}
                          </span>
                          <span className={`font-japanese leading-relaxed ${getFontSizeClass()}`}>
                            {renderJapaneseText(opt.text)}
                          </span>
                        </div>

                        {isSelected && (
                          <div className="shrink-0 flex items-center gap-1.5 text-xs text-white pr-2">
                            <CheckSquare className="w-5 h-5 fill-white text-rose-600" />
                            <span className="font-bold uppercase tracking-wider text-[10px] hidden sm:inline">
                              Selected
                            </span>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-slate-500">No question found.</div>
          )}
        </main>
      </div>

      {/* 3. PROMETRIC BOTTOM NAVIGATION BAR */}
      <footer className="bg-slate-900 text-white px-4 py-3 flex items-center justify-between border-t border-slate-800 z-30 select-none">
        <div>
          {activeQuestion && (
            <button
              onClick={() => toggleFlag(activeQuestion.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition ${
                isQuestionFlagged(activeQuestion.id)
                  ? 'bg-amber-600 border-amber-500 text-white shadow-xs'
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Flag
                className={`w-3.5 h-3.5 ${
                  isQuestionFlagged(activeQuestion.id) ? 'fill-white text-white' : 'text-slate-400'
                }`}
              />
              <span>{isQuestionFlagged(activeQuestion.id) ? 'Flagged for Review' : 'Mark for Review'}</span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0 || showSectionSummary}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          {currentQuestionIndex < sectionQuestions.length - 1 && !showSectionSummary ? (
            <button
              onClick={handleNext}
              className="px-5 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition shadow-md shadow-rose-600/30 active:scale-95"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => setShowSectionSummary(true)}
              className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition shadow-md shadow-amber-600/30 active:scale-95"
            >
              <span>Finish Section</span>
              <CheckCircle className="w-4 h-4" />
            </button>
          )}
        </div>
      </footer>

      {/* 4. ONE-WAY SECTION LOCK CONFIRMATION MODAL */}
      {showLockWarningModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200">
            <div className="bg-amber-600 text-white p-5 flex items-center gap-3">
              <div className="p-2 bg-amber-700 rounded-xl shrink-0">
                <Lock className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-base">Prometric One-Way Lock Alert</h3>
                <p className="text-xs text-amber-100">Permanent Lock Confirmation</p>
              </div>
            </div>

            <div className="p-6 space-y-3 text-xs text-slate-700 leading-relaxed">
              <p className="font-bold text-slate-900 text-sm">
                Are you ready to lock Section {activeAttempt.current_section}?
              </p>
              <div className="bg-rose-50 p-3 rounded-xl border border-rose-200 text-rose-900">
                <strong>Prometric Rule:</strong> Once you advance, Section {activeAttempt.current_section} is locked permanently. You will not be permitted to revisit or modify these answers.
              </div>
              <p className="text-slate-500">
                {activeAttempt.current_section === 4
                  ? 'Confirming will submit your entire exam and calculate your official scaled score out of 250 points.'
                  : `Confirming will lock Section ${activeAttempt.current_section} and start Section ${activeAttempt.current_section + 1}.`}
              </p>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
              <button
                onClick={() => setShowLockWarningModal(false)}
                className="px-4 py-2 border border-slate-300 rounded-xl text-slate-700 hover:bg-slate-100 text-xs font-bold"
              >
                Cancel & Review
              </button>
              <button
                onClick={handleConfirmNextSection}
                className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-xl shadow-md active:scale-95 transition"
              >
                {activeAttempt.current_section === 4 ? 'Confirm & Submit Exam' : 'Confirm & Lock Section'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. FINISH EXAM EARLY MODAL */}
      {showFinishExamModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 space-y-4 border border-slate-200">
            <h3 className="text-lg font-black text-slate-900">Finish and Submit Exam Now?</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              You currently have <strong>{formatTime(activeAttempt.time_remaining_seconds)}</strong> remaining.
              Submitting now will grade all completed questions and generate your official score report immediately.
            </p>
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 font-medium">
              Answered so far: {totalAnsweredCount} / 48 questions.
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowFinishExamModal(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl"
              >
                Resume Exam
              </button>
              <button
                onClick={() => {
                  setShowFinishExamModal(false);
                  submitExam();
                }}
                className="px-5 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-xl shadow-md"
              >
                Yes, Submit Exam Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
