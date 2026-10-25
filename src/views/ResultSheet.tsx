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
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center space-y-4 max-w-md shadow-sm">
          <div className="text-4xl">📄</div>
          <h3 className="font-extrabold text-lg text-slate-800">No Exam Attempt Found</h3>
          <p className="text-xs text-slate-500">
            Please select a mock test to launch the Prometric CBT simulator.
          </p>
          <button
            onClick={() => navigateTo('mock-tests')}
            className="px-5 py-2.5 bg-rose-600 text-white font-bold rounded-xl text-xs hover:bg-rose-500"
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
    <div className="min-h-screen bg-slate-50 font-sans py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Actions & Breadcrumb */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <button
            onClick={() => navigateTo('mock-tests')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition"
          >
            <span>← Back to Mock Tests</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-3.5 py-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-2xs"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500" />
              <span>Print Official Certificate</span>
            </button>

            <button
              onClick={() => navigateTo('preview', { testId: attempt.mock_test_id })}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-rose-600/30"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Mock Exam</span>
            </button>
          </div>
        </div>

        {/* 1. OFFICIAL-STYLE SCORE CERTIFICATE CARD */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-lg overflow-hidden">
          {/* Certificate Header Banner */}
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-slate-800">
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

            <div className="bg-white/10 backdrop-blur rounded-2xl p-4 border border-white/15 text-right shrink-0">
              <div className="text-[10px] font-bold text-slate-300 uppercase">Candidate Name</div>
              <div className="text-sm font-black text-white">{currentUser.full_name}</div>
              <div className="text-[10px] text-slate-400 mt-1">ID: {attempt.id.slice(0, 16)}</div>
            </div>
          </div>

          {/* Pass / Fail Status Banner */}
          <div
            className={`p-5 flex flex-col sm:flex-row items-center justify-between gap-4 ${
              attempt.passed
                ? 'bg-emerald-500 text-slate-950'
                : 'bg-rose-600 text-white'
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

            <div className="bg-slate-950/20 backdrop-blur px-4 py-2 rounded-2xl text-center shrink-0">
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
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Section Breakdown & Accuracy Percentages
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sectionScores.map(sec => (
                <div key={sec.num} className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-900">
                      Section {sec.num}: {sec.name}
                    </span>
                    <span className={`text-sm font-black ${sec.score >= 80 ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {sec.score}%
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        sec.score >= 80 ? 'bg-emerald-500' : 'bg-rose-500'
                      }`}
                      style={{ width: `${sec.score}%` }}
                    ></div>
                  </div>

                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>12 Questions</span>
                    <span>Target: 80%+ (10/12 Correct)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 2. AI WEAK POINT ANALYSIS PANEL */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-600">
                <BarChart3 className="w-4 h-4" />
                <span>Diagnostic Engine</span>
              </div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">
                AI Weak Point Analysis & Recommended Actions
              </h2>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
              Priority Review Identified
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Visual Radar / Skill Polygon Simulator */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center space-y-3">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
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
                <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-slate-700">
                  JFT-Basic
                </div>
              </div>
              <p className="text-[10px] text-slate-500">
                Vocab: {attempt.section_scores.section1}% • Conv: {attempt.section_scores.section2}%<br />
                Audio: {attempt.section_scores.section3}% • Read: {attempt.section_scores.section4}%
              </p>
            </div>

            {/* Diagnostic Report */}
            <div className="md:col-span-2 space-y-4">
              <div className="p-4 bg-rose-50 border border-rose-200/80 rounded-2xl space-y-2">
                <div className="flex items-center gap-2 text-rose-900 font-bold text-xs">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>Lowest Scoring Area: Section {lowestSection.num} ({lowestSection.name.split(' ')[0]})</span>
                </div>
                <p className="text-xs text-rose-800 leading-relaxed">
                  Your accuracy in Section {lowestSection.num} was <strong>{lowestSection.score}%</strong>. In a Prometric CBT exam, this single section reduces your aggregate scaled buffer.
                </p>
              </div>

              {/* Actionable recommendation with direct tool link */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Recommended Study Tool</span>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">{recommendation.toolName}</h4>
                  <p className="text-xs text-slate-500">{recommendation.desc}</p>
                </div>
                <button
                  onClick={() => navigateTo('tools')}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shrink-0"
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Practice in Tools Hub</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 3. QUESTION-BY-QUESTION ANSWER REVIEW */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">
                Question-by-Question Answer Review
              </h2>
              <p className="text-xs text-slate-500">
                Inspect your selections, correct answers, full translations, and grammar breakdowns.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold">
              <button
                onClick={() => setReviewFilter('all')}
                className={`px-3 py-1.5 rounded-lg transition ${
                  reviewFilter === 'all' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                All ({testQuestions.length})
              </button>
              <button
                onClick={() => setReviewFilter('correct')}
                className={`px-3 py-1.5 rounded-lg transition ${
                  reviewFilter === 'correct' ? 'bg-white text-emerald-700 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Correct
              </button>
              <button
                onClick={() => setReviewFilter('incorrect')}
                className={`px-3 py-1.5 rounded-lg transition ${
                  reviewFilter === 'incorrect' ? 'bg-white text-rose-700 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Incorrect
              </button>
              <button
                onClick={() => setReviewFilter('flagged')}
                className={`px-3 py-1.5 rounded-lg transition ${
                  reviewFilter === 'flagged' ? 'bg-white text-amber-700 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
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
                  className={`p-5 rounded-2xl border space-y-3 transition ${
                    isCorrect
                      ? 'bg-emerald-50/30 border-emerald-200'
                      : 'bg-rose-50/30 border-rose-200'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-black text-slate-800">
                        Question #{q.question_order} (Section {q.section_number})
                      </span>
                      {isFlagged && (
                        <span className="flex items-center gap-1 text-[10px] font-bold bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">
                          <Flag className="w-2.5 h-2.5 fill-amber-500" />
                          <span>Flagged</span>
                        </span>
                      )}
                    </div>

                    <span
                      className={`text-xs font-black px-2.5 py-0.5 rounded-full ${
                        isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {isCorrect ? '✓ Correct' : '✗ Incorrect'}
                    </span>
                  </div>

                  {/* Japanese Prompt */}
                  <div className="font-japanese text-sm font-semibold text-slate-900 leading-relaxed">
                    {renderFurigana(q.prompt_text)}
                  </div>

                  {/* Reading Passage if present */}
                  {q.reading_passage && (
                    <div className="p-3 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 font-japanese leading-relaxed whitespace-pre-line">
                      {renderFurigana(q.reading_passage)}
                    </div>
                  )}

                  {/* Options Comparison */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {q.options.map((opt, optIdx) => {
                      const isUserSelected = userChoice === optIdx;
                      const isOptionCorrect = optIdx === q.correct_option_index;

                      let styleClass = 'bg-white border-slate-200 text-slate-700';
                      if (isOptionCorrect) {
                        styleClass = 'bg-emerald-100/70 border-emerald-500 text-emerald-950 font-bold';
                      } else if (isUserSelected && !isOptionCorrect) {
                        styleClass = 'bg-rose-100/70 border-rose-500 text-rose-950 line-through';
                      }

                      return (
                        <div
                          key={opt.id}
                          className={`p-2.5 rounded-xl text-xs border flex items-center justify-between ${styleClass}`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-md bg-white/80 font-bold text-[10px] flex items-center justify-center">
                              {opt.label}
                            </span>
                            <span className="font-japanese">{opt.text}</span>
                          </div>
                          {isOptionCorrect && (
                            <span className="text-[9px] font-black uppercase text-emerald-800">
                              Correct Choice
                            </span>
                          )}
                          {isUserSelected && !isOptionCorrect && (
                            <span className="text-[9px] font-black uppercase text-rose-800">
                              Your Answer
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation Callout */}
                  {q.explanation && (
                    <div className="p-3 bg-white/80 border border-slate-200 rounded-xl text-xs text-slate-600 leading-relaxed">
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
