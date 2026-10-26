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
    <div className="space-y-6 text-white font-sans">
      {/* Welcome Banner */}
      <div className="rounded-[2.25rem] glass-panel p-6 md:p-8 text-white shadow-2xl relative overflow-hidden border border-white/30 backdrop-blur-2xl">
        <div className="relative z-10 max-w-xl space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-white/15 text-white border border-white/30 backdrop-blur">
              JFT-Basic Official CBT Simulation
            </span>
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
              currentUser.subscription_tier === 'pro'
                ? 'bg-amber-400 text-slate-950 font-black'
                : 'bg-white/20 text-white border border-white/20'
            }`}>
              {currentUser.subscription_tier.toUpperCase()} MEMBER
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white">
            Welcome back, {currentUser.full_name}!
          </h1>
          <p className="text-xs md:text-sm text-white/85 leading-relaxed">
            Prepare for the Japan Foundation Test for Basic Japanese with accurate Prometric CBT conditions, 60-minute single countdown, one-way section lock, and 250-point scoring.
          </p>

          <div className="pt-3 flex flex-wrap items-center gap-3">
            {activeAttempt ? (
              <button
                onClick={() => navigateTo('exam', { testId: activeAttempt.mock_test_id })}
                className="px-6 py-2.5 glass-btn-primary text-white rounded-full text-xs font-bold shadow-lg flex items-center gap-2 transition animate-pulse"
              >
                <Clock className="w-4 h-4" />
                <span>Resume Ongoing Exam</span>
              </button>
            ) : (
              <button
                onClick={() => navigateTo('mock-tests')}
                className="px-6 py-2.5 glass-btn-primary text-white rounded-full text-xs font-bold shadow-lg flex items-center gap-2 transition"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Launch Mock Exam</span>
              </button>
            )}

            <button
              onClick={() => navigateTo('tools')}
              className="px-5 py-2.5 glass-capsule-item text-white rounded-full text-xs font-semibold flex items-center gap-2 transition"
            >
              <Layers className="w-4 h-4 text-amber-300" />
              <span>Free Japanese Tools</span>
            </button>
          </div>
        </div>

        {/* Decorative badge background icon */}
        <Award className="absolute -right-6 -bottom-6 w-48 h-48 text-white/10 pointer-events-none" />
      </div>

      {/* 4 OVERVIEW STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Tests Taken */}
        <div className="glass-panel p-5 rounded-3xl shadow-lg border border-white/25 flex items-center gap-4 text-white">
          <div className="p-3 bg-white/15 text-white rounded-2xl border border-white/20 backdrop-blur">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-white/70">Total Tests Taken</span>
            <h3 className="text-2xl font-black text-white mt-0.5">{totalTaken}</h3>
            <p className="text-[10px] text-white/60">Official full mock exams</p>
          </div>
        </div>

        {/* Card 2: Average Score out of 250 */}
        <div className="glass-panel p-5 rounded-3xl shadow-lg border border-white/25 flex items-center gap-4 text-white">
          <div className="p-3 bg-emerald-500/20 text-emerald-300 rounded-2xl border border-emerald-400/30 backdrop-blur">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-white/70">Average Score</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <h3 className="text-2xl font-black text-white">{averageScore}</h3>
              <span className="text-xs font-semibold text-white/70">/ 250</span>
            </div>
            <p className="text-[10px] text-white/60">Pass benchmark: 200/250</p>
          </div>
        </div>

        {/* Card 3: Highest Score */}
        <div className="glass-panel p-5 rounded-3xl shadow-lg border border-white/25 flex items-center gap-4 text-white">
          <div className="p-3 bg-amber-500/20 text-amber-300 rounded-2xl border border-amber-400/30 backdrop-blur">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-white/70">Highest Score</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <h3 className="text-2xl font-black text-white">{highestScore}</h3>
              <span className="text-xs font-semibold text-white/70">/ 250</span>
            </div>
            <p className="text-[10px] text-white/60">Personal best result</p>
          </div>
        </div>

        {/* Card 4: Weakest Section Alert */}
        <div className="glass-panel p-5 rounded-3xl shadow-lg border border-white/25 flex items-center gap-4 text-white">
          <div className="p-3 bg-rose-500/20 text-rose-300 rounded-2xl border border-rose-400/30 backdrop-blur">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-white/70">Weakest Area</span>
            <h3 className="text-xs font-bold text-white truncate max-w-[140px] mt-0.5">
              {totalTaken > 0 ? weakest.name.split(' ')[0] : 'No attempts yet'}
            </h3>
            <p className="text-[10px] text-rose-300 font-semibold mt-0.5">
              {totalTaken > 0 ? `Avg: ${weakest.avg}% — Practice needed` : 'Take test to evaluate'}
            </p>
          </div>
        </div>
      </div>

      {/* RECENT ATTEMPTS TABLE */}
      <div className="rounded-[2.25rem] glass-panel shadow-2xl border border-white/25 overflow-hidden text-white">
        <div className="p-5 border-b border-white/15 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-white text-sm">Recent Exam Attempts</h3>
            <p className="text-xs text-white/70">View official scores and print result certificates</p>
          </div>
        </div>

        {userAttempts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-white/10 text-white/80 font-semibold border-b border-white/15">
                <tr>
                  <th className="px-5 py-3">Mock Test</th>
                  <th className="px-5 py-3">Completed Date</th>
                  <th className="px-5 py-3">Score (250 Scale)</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3 text-right">Official Report</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {userAttempts.slice(0, 5).map(att => {
                  const test = mockTests.find(t => t.id === att.mock_test_id);
                  return (
                    <tr key={att.id} className="hover:bg-white/10 transition">
                      <td className="px-5 py-3.5 font-semibold text-white">
                        {test?.title || 'JFT-Basic Mock'}
                      </td>
                      <td className="px-5 py-3.5 text-white/70">
                        {att.completed_at ? new Date(att.completed_at).toLocaleDateString() : '—'}
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="font-mono font-bold text-white text-sm">{att.total_score}</span>
                        <span className="text-white/60"> / 250</span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                          att.passed
                            ? 'bg-emerald-500/25 text-emerald-200 border-emerald-400/40'
                            : 'bg-rose-500/25 text-rose-200 border-rose-400/40'
                        }`}>
                          {att.passed ? 'PASSED (合格)' : 'FAILED (不合格)'}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <button
                          onClick={() => navigateTo('result-sheet', { attemptId: att.id })}
                          className="px-3.5 py-1.5 glass-capsule-item text-white rounded-full font-semibold text-[11px] inline-flex items-center gap-1.5 transition"
                        >
                          <FileSpreadsheet className="w-3.5 h-3.5 text-amber-300" />
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
          <div className="p-8 text-center text-white/70 text-xs">
            No exams taken yet. Click "Launch Mock Exam" above to start your first JFT-Basic simulation!
          </div>
        )}
      </div>
    </div>
  );
};
