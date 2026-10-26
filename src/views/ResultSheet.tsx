import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { SECTIONS_CONFIG, Question } from '../types';
import { getQuestionsForTest } from '../lib/questionService';
import { renderFurigana } from '../lib/furigana';
import confetti from 'canvas-confetti';
import {
  Printer,
  RotateCcw,
  BookOpen,
  CheckCircle2,
  XCircle,
  Award,
  Calendar,
  Clock,
  User,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  Compass,
  Filter,
  Flag,
  Share2,
  Download,
  BarChart3
} from 'lucide-react';

export const ResultSheet: React.FC = () => {
  const { attempts, mockTests, questions, viewParams, navigateTo, currentUser } = useApp();

  const attemptId = viewParams.attemptId || (attempts.length > 0 ? attempts[0].id : null);
  const attempt = attempts.find(a => a.id === attemptId) || attempts[0];

  const [reviewFilter, setReviewFilter] = useState<'all' | 'correct' | 'incorrect' | 'flagged'>('all');

  useEffect(() => {
    if (attempt && attempt.passed) {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  }, [attempt?.id, attempt?.passed]);

  if (!attempt) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 font-sans">
        <div className="glass-panel rounded-3xl p-8 text-center space-y-4 max-w-md">
          <div className="text-4xl">📄</div>
          <h3 className="font-extrabold text-lg text-slate-800 dark:text-white">No Exam Attempt Found</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Please select a mock test to launch the Prometric CBT simulator.
          </p>
          <button
            onClick={() => navigateTo('mock-tests')}
            className="px-5 py-2.5 glass-btn-primary font-bold rounded-xl text-xs"
          >
            Go to Mock Tests Directory
          </button>
        </div>
      </div>
    );
  }

  const test = mockTests.find(t => t.id === attempt.mock_test_id);
  const testQuestions = getQuestionsForTest(attempt.mock_test_id, questions);

  const sectionScores = [
    { num: 1, name: 'Script & Vocabulary (文字と語彙)', score: attempt.section_scores.section1, color: 'bg-rose-500' },
    { num: 2, name: 'Conversation & Expression (会話と表現)', score: attempt.section_scores.section2, color: 'bg-amber-500' },
    { num: 3, name: 'Listening Comprehension (聴解)', score: attempt.section_scores.section3, color: 'bg-blue-500' },
    { num: 4, name: 'Reading Comprehension (読解)', score: attempt.section_scores.section4, color: 'bg-emerald-500' }
  ];

  // Weakest section
  const lowestSection = [...sectionScores].sort((a, b) => a.score - b.score)[0];

  // Recommended tool link mapping based on weakest section
  const getToolRecommendation = (secNum: number) => {
    switch (secNum) {
      case 1:
        return {
          toolName: 'Hiragana/Katakana & Kanji Radical Tools',
          desc: 'Practice Kanji stroke orders and N5/N4 vocabulary flashcards.',
          toolId: 'kanji-stroke'
        };
      case 2:
        return {
          toolName: 'Particle Quiz & Keigo Converter',
          desc: 'Strengthen workplace honorific expressions and particles (は, が, を, に, で).',
          toolId: 'particle-quiz'
        };
      case 3:
        return {
          toolName: 'Quick Listening Practice & AI Speaking',
          desc: 'Train your ears with natural-speed dialogues and speech recognition.',
          toolId: 'quick-listening'
        };
      default:
        return {
          toolName: 'JFT Topic Word Lists & Reading Reference',
          desc: 'Learn high-frequency signs, posters, and clinic notices.',
          toolId: 'jft-topics'
        };
    }
  };

  const recommendation = getToolRecommendation(lowestSection.num);

  // Filtered review questions
  const filteredReviewQuestions = testQuestions.filter(q => {
    const userChoice = attempt.answers[q.id];
    const isCorrect = userChoice !== undefined && userChoice === q.correct_option_index;
    const isFlagged = attempt.flagged_questions?.includes(q.id);

    if (reviewFilter === 'correct') return isCorrect;
    if (reviewFilter === 'incorrect') return !isCorrect;
    if (reviewFilter === 'flagged') return isFlagged;
    return true;
  });

  return (
    <div className="min-h-screen font-sans py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Actions & Breadcrumb */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <button
            onClick={() => navigateTo('mock-tests')}
            className="glass-capsule-item px-4 py-2 inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 transition"
          >
            <span>← Back to Mock Tests</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="glass-capsule-item px-4 py-2 text-slate-700 dark:text-slate-200 text-xs font-bold transition flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500" />
              <span>Print Official Certificate</span>
            </button>

            <button
              onClick={() => navigateTo('preview', { testId: attempt.mock_test_id })}
              className="px-4 py-2 glass-btn-primary rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-rose-600/30"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Mock Exam</span>
            </button>
          </div>
        </div>

        {/* 1. OFFICIAL-STYLE SCORE CERTIFICATE CARD */}
        <div className="glass-panel rounded-3xl overflow-hidden">
          {/* Certificate Header Banner */}
          <div className="bg-gradient-to-r from-slate-900/80 via-indigo-950/80 to-slate-900/80 backdrop-blur-md text-white p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-white/10">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded bg-rose-600 flex items-center justify-center font-black text-xs">
                  JFT
                </span>
                <span className="text-xs font-extrabold uppercase tracking-wider text-rose-400">
                  Official CBT Result Sheet • 判定通知書
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                {attempt.mock_test_title || test?.title || 'JFT-Basic Official CBT Mock'}
              </h1>
              <p className="text-xs text-slate-300">
                Japan Foundation Test for Basic Japanese • Computer-Based Testing Simulation
              </p>
            </div>

            <div className="glass-panel rounded-2xl p-4 border border-white/20 text-right shrink-0">
              <div className="text-[10px] font-bold text-slate-300 uppercase">Candidate Name</div>
              <div className="text-sm font-black text-white">{currentUser.full_name}</div>
              <div className="text-[10px] text-slate-400 mt-1">ID: {attempt.id.slice(0, 16)}</div>
            </div>
          </div>

          {/* Pass / Fail Status Banner */}
          <div
            className={`p-5 flex flex-col sm:flex-row items-center justify-between gap-4 ${
              attempt.passed
                ? 'bg-emerald-500/85 backdrop-blur-md text-slate-950'
                : 'bg-rose-600/85 backdrop-blur-md text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              {attempt.passed ? (
                <CheckCircle2 className="w-8 h-8 shrink-0 text-slate-950" />
              ) : (
                <XCircle className="w-8 h-8 shrink-0 text-white" />
              )}
              <div>
                <h2 className="text-lg sm:text-xl font-black uppercase tracking-tight">
                  {attempt.passed
                    ? 'PASSED — Eligible for Specified Skilled Worker (SSW 1号) Visa'
                    : 'NEEDS IMPROVEMENT — Score Below 200 Passing Benchmark'}
                </h2>
                <p className="text-xs font-semibold opacity-90">
                  {attempt.passed
                    ? 'Congratulations! Your score meets the official Japan Foundation requirement for SSW residency status.'
                    : 'You need at least 200 points to pass. Review your weak points below and retake the test.'}
                </p>
              </div>
            </div>

            <div className="bg-slate-950/30 backdrop-blur-md px-4 py-2 rounded-2xl text-center shrink-0 border border-white/20">
              <div className="text-2xl sm:text-3xl font-black">
                {attempt.total_score} <span className="text-sm font-normal">/ 250</span>
              </div>
              <div className="text-[10px] font-bold uppercase tracking-wider">
                Scaled Score (Pass: 200)
              </div>
            </div>
          </div>

          {/* Section-Wise Percentages & Score Bars */}
          <div className="p-6 sm:p-8 space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Section Breakdown & Accuracy Percentages
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sectionScores.map(sec => (
                <div key={sec.num} className="p-4 glass-panel rounded-2xl space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-900 dark:text-white">
                      Section {sec.num}: {sec.name}
                    </span>
                    <span className={`text-sm font-black ${sec.score >= 80 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600'}`}>
                      {sec.score}%
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-200/50 dark:bg-white/10 h-2.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        sec.score >= 80 ? 'bg-emerald-500' : 'bg-rose-500'
                      }`}
                      style={{ width: `${sec.score}%` }}
                    ></div>
                  </div>

                  <div className="flex justify-between text-[10px] text-slate-500 dark:text-slate-400">
                    <span>12 Questions</span>
                    <span>Target: 80%+ (10/12 Correct)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 2. AI WEAK POINT ANALYSIS PANEL */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-600">
                <BarChart3 className="w-4 h-4" />
                <span>Diagnostic Engine</span>
              </div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                AI Weak Point Analysis & Recommended Actions
              </h2>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/30">
              Priority Review Identified
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Visual Radar / Skill Polygon Simulator */}
            <div className="glass-panel rounded-2xl p-6 text-center space-y-3">
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Skill Balance Radar
              </span>
              <div className="relative w-40 h-40 mx-auto flex items-center justify-center">
                {/* SVG Polygon Radar */}
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <polygon
                    points="50,10 90,50 50,90 10,50"
                    fill="none"
                    stroke="#cbd5e1"
                    strokeWidth="1"
                  />
                  <polygon
                    points="50,25 75,50 50,75 25,50"
                    fill="none"
                    stroke="#e2e8f0"
                    strokeWidth="1"
                  />
                  {/* Dynamic Score Polygon */}
                  <polygon
                    points={`50,${50 - (attempt.section_scores.section1 / 100) * 40} ${
                      50 + (attempt.section_scores.section2 / 100) * 40
                    },50 50,${50 + (attempt.section_scores.section3 / 100) * 40} ${
                      50 - (attempt.section_scores.section4 / 100) * 40
                    },50`}
                    fill="rgba(225, 29, 72, 0.2)"
                    stroke="#e11d48"
                    strokeWidth="2"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-slate-700 dark:text-slate-300">
                  JFT-Basic
                </div>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">
                Vocab: {attempt.section_scores.section1}% • Conv: {attempt.section_scores.section2}%<br />
                Audio: {attempt.section_scores.section3}% • Read: {attempt.section_scores.section4}%
              </p>
            </div>

            {/* Diagnostic Report */}
            <div className="md:col-span-2 space-y-4">
              <div className="p-4 glass-panel border-rose-500/30 bg-rose-500/10 rounded-2xl space-y-2">
                <div className="flex items-center gap-2 text-rose-900 dark:text-rose-200 font-bold text-xs">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>Lowest Scoring Area: Section {lowestSection.num} ({lowestSection.name.split(' ')[0]})</span>
                </div>
                <p className="text-xs text-rose-800 dark:text-rose-200/90 leading-relaxed">
                  Your accuracy in Section {lowestSection.num} was <strong>{lowestSection.score}%</strong>. In a Prometric CBT exam, this single section reduces your aggregate scaled buffer.
                </p>
              </div>

              {/* Actionable recommendation with direct tool link */}
              <div className="p-4 glass-panel rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Recommended Study Tool</span>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">{recommendation.toolName}</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300">{recommendation.desc}</p>
                </div>
                <button
                  onClick={() => navigateTo('tools')}
                  className="px-4 py-2 glass-btn-primary rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shrink-0"
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Practice in Tools Hub</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 3. QUESTION-BY-QUESTION ANSWER REVIEW */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                Question-by-Question Answer Review
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Inspect your selections, correct answers, full translations, and grammar breakdowns.
              </p>
            </div>

            {/* Filter Tabs as Transparent Capsules */}
            <div className="flex items-center gap-1.5 p-1 rounded-full glass-capsule-bar text-xs font-bold">
              <button
                onClick={() => setReviewFilter('all')}
                className={`px-3 py-1.5 rounded-full transition ${
                  reviewFilter === 'all' ? 'glass-capsule-item-active' : 'glass-capsule-item text-slate-700 dark:text-slate-300'
                }`}
              >
                All ({testQuestions.length})
              </button>
              <button
                onClick={() => setReviewFilter('correct')}
                className={`px-3 py-1.5 rounded-full transition ${
                  reviewFilter === 'correct' ? 'glass-capsule-item-active text-emerald-300' : 'glass-capsule-item text-slate-700 dark:text-slate-300'
                }`}
              >
                Correct
              </button>
              <button
                onClick={() => setReviewFilter('incorrect')}
                className={`px-3 py-1.5 rounded-full transition ${
                  reviewFilter === 'incorrect' ? 'glass-capsule-item-active text-rose-300' : 'glass-capsule-item text-slate-700 dark:text-slate-300'
                }`}
              >
                Incorrect
              </button>
              <button
                onClick={() => setReviewFilter('flagged')}
                className={`px-3 py-1.5 rounded-full transition ${
                  reviewFilter === 'flagged' ? 'glass-capsule-item-active text-amber-300' : 'glass-capsule-item text-slate-700 dark:text-slate-300'
                }`}
              >
                Flagged
              </button>
            </div>
          </div>

          {/* List of Questions */}
          <div className="space-y-4">
            {filteredReviewQuestions.map((q, idx) => {
              const userChoice = attempt.answers[q.id];
              const isCorrect = userChoice !== undefined && userChoice === q.correct_option_index;
              const isFlagged = attempt.flagged_questions?.includes(q.id);

              return (
                <div
                  key={q.id}
                  className={`p-5 rounded-2xl glass-panel space-y-3 transition ${
                    isCorrect
                      ? 'border-emerald-500/30 bg-emerald-500/10'
                      : 'border-rose-500/30 bg-rose-500/10'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-black text-slate-900 dark:text-white">
                        Question #{q.question_order} (Section {q.section_number})
                      </span>
                      {isFlagged && (
                        <span className="flex items-center gap-1 text-[10px] font-bold bg-amber-400/20 text-amber-800 dark:text-amber-300 border border-amber-400/30 px-2 py-0.5 rounded-full">
                          <Flag className="w-2.5 h-2.5 fill-amber-500" />
                          <span>Flagged</span>
                        </span>
                      )}
                    </div>

                    <span
                      className={`text-xs font-black px-2.5 py-0.5 rounded-full ${
                        isCorrect ? 'bg-emerald-400/20 text-emerald-900 dark:text-emerald-300 border border-emerald-400/30' : 'bg-rose-400/20 text-rose-900 dark:text-rose-300 border border-rose-400/30'
                      }`}
                    >
                      {isCorrect ? '✓ Correct' : '✗ Incorrect'}
                    </span>
                  </div>

                  {/* Japanese Prompt */}
                  <div className="font-japanese text-sm font-semibold text-slate-900 dark:text-white leading-relaxed">
                    {renderFurigana(q.prompt_text)}
                  </div>

                  {/* Reading Passage if present */}
                  {q.reading_passage && (
                    <div className="p-3 bg-white/40 dark:bg-black/30 border border-white/20 rounded-xl text-xs text-slate-800 dark:text-slate-200 font-japanese leading-relaxed whitespace-pre-line backdrop-blur-sm">
                      {renderFurigana(q.reading_passage)}
                    </div>
                  )}

                  {/* Options Comparison */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {q.options.map((opt, optIdx) => {
                      const isUserSelected = userChoice === optIdx;
                      const isOptionCorrect = optIdx === q.correct_option_index;

                      let styleClass = 'glass-capsule-item text-slate-800 dark:text-slate-200';
                      if (isOptionCorrect) {
                        styleClass = 'bg-emerald-500/25 border-emerald-400/50 text-emerald-950 dark:text-emerald-200 font-bold';
                      } else if (isUserSelected && !isOptionCorrect) {
                        styleClass = 'bg-rose-500/25 border-rose-400/50 text-rose-950 dark:text-rose-200 line-through';
                      }

                      return (
                        <div
                          key={opt.id}
                          className={`p-2.5 rounded-xl text-xs border flex items-center justify-between ${styleClass}`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-md bg-white/30 dark:bg-white/10 font-bold text-[10px] flex items-center justify-center">
                              {opt.label}
                            </span>
                            <span className="font-japanese">{opt.text}</span>
                          </div>
                          {isOptionCorrect && (
                            <span className="text-[9px] font-black uppercase text-emerald-800 dark:text-emerald-300 bg-emerald-400/20 px-1.5 py-0.5 rounded-full">
                              Correct Choice
                            </span>
                          )}
                          {isUserSelected && !isOptionCorrect && (
                            <span className="text-[9px] font-black uppercase text-rose-800 dark:text-rose-300 bg-rose-400/20 px-1.5 py-0.5 rounded-full">
                              Your Answer
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation Callout */}
                  {q.explanation && (
                    <div className="p-3 bg-white/40 dark:bg-black/30 border border-white/20 rounded-xl text-xs text-slate-700 dark:text-slate-300 leading-relaxed backdrop-blur-sm">
                      <strong>💡 Explanation:</strong> {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
