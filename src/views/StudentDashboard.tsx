import React from 'react';
import { useApp } from '../context/AppContext';
import {
  BookOpen,
  Award,
  TrendingUp,
  AlertTriangle,
  Play,
  FileSpreadsheet,
  Layers,
  ChevronRight,
  Clock,
  Sparkles
} from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const {
    currentUser,
    attempts,
    mockTests,
    navigateTo,
    activeAttempt
  } = useApp();

  const userAttempts = attempts.filter(a => a.user_id === currentUser.id && a.status === 'completed');
  const totalTaken = userAttempts.length;

  const averageScore = totalTaken > 0
    ? Math.round(userAttempts.reduce((acc, a) => acc + a.total_score, 0) / totalTaken)
    : 0;

  const highestScore = totalTaken > 0
    ? Math.max(...userAttempts.map(a => a.total_score))
    : 0;

  // Weakest section calculation across past attempts
  let sec1Avg = 0, sec2Avg = 0, sec3Avg = 0, sec4Avg = 0;
  if (totalTaken > 0) {
    sec1Avg = Math.round(userAttempts.reduce((acc, a) => acc + a.section_scores.section1, 0) / totalTaken);
    sec2Avg = Math.round(userAttempts.reduce((acc, a) => acc + a.section_scores.section2, 0) / totalTaken);
    sec3Avg = Math.round(userAttempts.reduce((acc, a) => acc + a.section_scores.section3, 0) / totalTaken);
    sec4Avg = Math.round(userAttempts.reduce((acc, a) => acc + a.section_scores.section4, 0) / totalTaken);
  }

  const sectionsRanking = [
    { num: 1, name: 'Script & Vocabulary (文字と語彙)', avg: sec1Avg },
    { num: 2, name: 'Conversation & Expression (会話と表現)', avg: sec2Avg },
    { num: 3, name: 'Listening Comprehension (聴解)', avg: sec3Avg },
    { num: 4, name: 'Reading Comprehension (読解)', avg: sec4Avg }
  ].sort((a, b) => a.avg - b.avg);

  const weakest = sectionsRanking[0];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-6 md:p-8 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-xl space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-orange-500/20 text-orange-400 border border-orange-500/30">
              JFT-Basic Official CBT Simulation
            </span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
              currentUser.subscription_tier === 'pro'
                ? 'bg-amber-400 text-slate-950'
                : 'bg-slate-700 text-slate-300'
            }`}>
              {currentUser.subscription_tier.toUpperCase()} MEMBER
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-black tracking-tight">
            Welcome back, {currentUser.full_name}!
          </h1>
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            Prepare for the Japan Foundation Test for Basic Japanese with accurate Prometric CBT conditions, 60-minute single countdown, one-way section lock, and 250-point scoring.
          </p>

          <div className="pt-3 flex flex-wrap items-center gap-3">
            {activeAttempt ? (
              <button
                onClick={() => navigateTo('exam', { testId: activeAttempt.mock_test_id })}
                className="px-5 py-2.5 bg-orange-600 hover:bg-orange-500 text-white rounded-lg text-xs font-bold shadow-lg shadow-orange-500/30 flex items-center gap-2 transition active:scale-95 animate-pulse"
              >
                <Clock className="w-4 h-4" />
                <span>Resume Ongoing Exam</span>
              </button>
            ) : (
              <button
                onClick={() => navigateTo('mock-tests')}
                className="px-5 py-2.5 bg-orange-600 hover:bg-orange-500 text-white rounded-lg text-xs font-bold shadow-lg shadow-orange-500/30 flex items-center gap-2 transition active:scale-95"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Launch Mock Exam</span>
              </button>
            )}

            <button
              onClick={() => navigateTo('section-practice')}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white rounded-lg text-xs font-semibold flex items-center gap-2 transition"
            >
              <Layers className="w-4 h-4 text-orange-400" />
              <span>Targeted Section Practice</span>
            </button>
          </div>
        </div>

        {/* Decorative badge background icon */}
        <Award className="absolute -right-6 -bottom-6 w-48 h-48 text-white/5 pointer-events-none" />
      </div>

      {/* 4 OVERVIEW STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Tests Taken */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Tests Taken</span>
            <h3 className="text-2xl font-black text-slate-900 mt-0.5">{totalTaken}</h3>
            <p className="text-[10px] text-slate-500">Official full mock exams</p>
          </div>
        </div>

        {/* Card 2: Average Score out of 250 */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Average Score</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <h3 className="text-2xl font-black text-slate-900">{averageScore}</h3>
              <span className="text-xs font-semibold text-slate-400">/ 250</span>
            </div>
            <p className="text-[10px] text-slate-500">Pass benchmark: 200/250</p>
          </div>
        </div>

        {/* Card 3: Highest Score */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Highest Score</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <h3 className="text-2xl font-black text-slate-900">{highestScore}</h3>
              <span className="text-xs font-semibold text-slate-400">/ 250</span>
            </div>
            <p className="text-[10px] text-slate-500">Personal best result</p>
          </div>
        </div>

        {/* Card 4: Weakest Section Alert */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="p-3 bg-red-50 text-red-600 rounded-xl">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Weakest Area</span>
            <h3 className="text-xs font-bold text-slate-900 truncate max-w-[140px] mt-0.5">
              {totalTaken > 0 ? weakest.name.split(' ')[0] : 'No attempts yet'}
            </h3>
            <p className="text-[10px] text-red-600 font-semibold mt-0.5">
              {totalTaken > 0 ? `Avg: ${weakest.avg}% — Practice needed` : 'Take test to evaluate'}
            </p>
          </div>
        </div>
      </div>

      {/* RECENT ATTEMPTS TABLE */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Recent Exam Attempts</h3>
            <p className="text-xs text-slate-500">View official scores and print result certificates</p>
          </div>
          <button
            onClick={() => navigateTo('results')}
            className="text-xs font-semibold text-orange-600 hover:text-orange-700 flex items-center gap-1"
          >
            <span>View All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {userAttempts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-5 py-3">Mock Test</th>
                  <th className="px-5 py-3">Completed Date</th>
                  <th className="px-5 py-3">Score (250 Scale)</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3 text-right">Official Report</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {userAttempts.slice(0, 5).map(att => {
                  const test = mockTests.find(t => t.id === att.mock_test_id);
                  return (
                    <tr key={att.id} className="hover:bg-slate-50/70 transition">
                      <td className="px-5 py-3.5 font-semibold text-slate-900">
                        {test?.title || 'JFT-Basic Mock'}
                      </td>
                      <td className="px-5 py-3.5 text-slate-500">
                        {att.completed_at ? new Date(att.completed_at).toLocaleDateString() : '—'}
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="font-mono font-bold text-slate-900 text-sm">{att.total_score}</span>
                        <span className="text-slate-400"> / 250</span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          att.passed
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'bg-red-100 text-red-800 border border-red-300'
                        }`}>
                          {att.passed ? 'PASSED (合格)' : 'FAILED (不合格)'}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <button
                          onClick={() => navigateTo('result-sheet', { attemptId: att.id })}
                          className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded font-semibold text-[11px] inline-flex items-center gap-1.5 transition"
                        >
                          <FileSpreadsheet className="w-3.5 h-3.5 text-orange-500" />
                          <span>View & Print</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center text-slate-500 text-xs">
            No exams taken yet. Click "Launch Mock Exam" above to start your first JFT-Basic simulation!
          </div>
        )}
      </div>
    </div>
  );
};
