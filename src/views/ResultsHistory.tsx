import React from 'react';
import { useApp } from '../context/AppContext';
import {
  FileSpreadsheet,
  Award,
  CheckCircle2,
  XCircle,
  Calendar,
  Clock,
  Printer,
  TrendingUp,
  ArrowRight
} from 'lucide-react';

export const ResultsHistory: React.FC = () => {
  const { attempts, mockTests, navigateTo } = useApp();

  const completedAttempts = attempts.filter(a => a.status === 'completed');

  const passCount = completedAttempts.filter(a => a.passed).length;
  const passRate = completedAttempts.length > 0
    ? Math.round((passCount / completedAttempts.length) * 100)
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
            Historical Records
          </span>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
            Exam Attempt History & Score Trends
          </h1>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            Permanent archive of all your Prometric CBT mock attempts, section scores, and printable Result Sheets.
          </p>
        </div>

        {/* Aggregate Stats */}
        <div className="flex items-center gap-4 border-l border-slate-200 pl-4">
          <div>
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Total Completed</span>
            <span className="text-xl font-black text-slate-900">{completedAttempts.length}</span>
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Overall Pass Rate</span>
            <span className="text-xl font-black text-emerald-600">{passRate}%</span>
          </div>
        </div>
      </div>

      {/* Attempts List */}
      <div className="space-y-4">
        {completedAttempts.map(att => {
          const test = mockTests.find(t => t.id === att.mock_test_id);
          const dateStr = att.completed_at
            ? new Date(att.completed_at).toLocaleDateString('ja-JP', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })
            : '—';

          return (
            <div
              key={att.id}
              className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 hover:border-orange-300 transition flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    att.passed
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-red-100 text-red-800 border border-red-300'
                  }`}>
                    {att.passed ? 'PASSED (合格)' : 'FAILED (不合格)'}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                    <Calendar className="w-3.5 h-3.5" /> {dateStr}
                  </span>
                </div>

                <h3 className="font-bold text-base text-slate-900">
                  {test?.title || 'JFT-Basic Official CBT Mock Test'}
                </h3>

                {/* Section mini-bars */}
                <div className="grid grid-cols-4 gap-3 text-[11px] pt-1 text-slate-600 max-w-md">
                  <div>
                    <span className="text-[10px] text-slate-400 block">1. Vocab</span>
                    <span className="font-bold font-mono">{att.section_scores.section1}%</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">2. Convers.</span>
                    <span className="font-bold font-mono">{att.section_scores.section2}%</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">3. Listening</span>
                    <span className="font-bold font-mono">{att.section_scores.section3}%</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">4. Reading</span>
                    <span className="font-bold font-mono">{att.section_scores.section4}%</span>
                  </div>
                </div>
              </div>

              {/* Score & Action Button */}
              <div className="flex items-center gap-4 self-end md:self-center">
                <div className="text-right">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Scaled Score</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black font-mono text-slate-900">{att.total_score}</span>
                    <span className="text-xs font-semibold text-slate-400">/ 250</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">Passing: 200</span>
                </div>

                <button
                  onClick={() => navigateTo('result-sheet', { attemptId: att.id })}
                  className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow transition active:scale-95"
                >
                  <Printer className="w-4 h-4 text-orange-400" />
                  <span>Official Report</span>
                </button>
              </div>
            </div>
          );
        })}

        {completedAttempts.length === 0 && (
          <div className="bg-white p-12 text-center rounded-xl border border-slate-200 text-slate-500">
            <FileSpreadsheet className="w-8 h-8 mx-auto text-slate-300 mb-2" />
            <p className="font-semibold text-sm">No completed exam attempts found yet.</p>
            <button
              onClick={() => navigateTo('mock-tests')}
              className="mt-3 px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-lg text-xs font-bold shadow"
            >
              Take First Mock Exam
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
