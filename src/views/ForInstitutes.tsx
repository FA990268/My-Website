import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { INITIAL_COHORTS } from '../lib/instituteData';
import { InstituteCohort } from '../types';
import {
  Building2,
  Users,
  Award,
  BarChart3,
  Download,
  Plus,
  Upload,
  CheckCircle2,
  AlertCircle,
  FileText,
  Mail,
  ShieldCheck,
  TrendingUp,
  Search,
  Printer
} from 'lucide-react';

export const ForInstitutes: React.FC = () => {
  const [cohorts, setCohorts] = useState<InstituteCohort[]>(INITIAL_COHORTS);
  const [selectedCohortId, setSelectedCohortId] = useState<string>('cohort_tokyo_kaigo_14');
  const [studentSearch, setStudentSearch] = useState<string>('');
  const [showEnrollModal, setShowEnrollModal] = useState<boolean>(false);
  const [newStudentName, setNewStudentName] = useState<string>('');
  const [newStudentEmail, setNewStudentEmail] = useState<string>('');
  const [selectedStudentForReport, setSelectedStudentForReport] = useState<any | null>(null);

  const activeCohort = cohorts.find(c => c.id === selectedCohortId) || cohorts[0];

  const handleEnrollStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName.trim() || !newStudentEmail.trim()) return;

    const newStudent = {
      id: `st_${Date.now()}`,
      name: newStudentName,
      email: newStudentEmail,
      testsTaken: 0,
      lastScore: 0,
      passProbability: 50,
      weakArea: 'Diagnostic Pending',
      status: 'Needs Review' as const
    };

    setCohorts(prev =>
      prev.map(c => {
        if (c.id === selectedCohortId) {
          return {
            ...c,
            studentCount: c.studentCount + 1,
            students: [newStudent, ...c.students]
          };
        }
        return c;
      })
    );

    setNewStudentName('');
    setNewStudentEmail('');
    setShowEnrollModal(false);
  };

  const filteredStudents = activeCohort.students.filter(
    s =>
      s.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
      s.email.toLowerCase().includes(studentSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen font-sans py-8 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Banner */}
        <div className="rounded-[2.25rem] glass-panel p-6 sm:p-8 text-white shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-white/30 backdrop-blur-2xl">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/15 text-white border border-white/30 backdrop-blur">
              <Building2 className="w-3.5 h-3.5" />
              <span>B2B Portal for Japanese Language Academies & SSW Sending Organizations</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Institutional CBT Assessment & Cohort Management
            </h1>
            <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
              Empower your academy teachers with real-time student pass predictions, bulk exam enrollment, batch weakness heatmaps, and official printable immigration progress reports.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setShowEnrollModal(true)}
              className="px-5 py-2.5 glass-btn-primary text-white rounded-full text-xs font-bold shadow-lg transition flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Enroll Students</span>
            </button>
          </div>
        </div>

        {/* Cohort Selector Tabs */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-white/70">
              Select Academy Batch / Cohort:
            </span>
            <span className="text-xs font-bold text-rose-300">3 Active Cohorts</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {cohorts.map(c => (
              <button
                key={c.id}
                onClick={() => setSelectedCohortId(c.id)}
                className={`p-5 rounded-2xl border text-left transition space-y-2 ${
                  selectedCohortId === c.id
                    ? 'glass-capsule-item-active'
                    : 'glass-capsule-item'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white/70">
                    {c.track}
                  </span>
                  <span className="text-xs font-black text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-400/30">
                    {c.passRate}% Pass Rate
                  </span>
                </div>
                <h3 className="text-sm font-extrabold text-white">{c.name}</h3>
                <div className="flex items-center justify-between text-xs text-white/70 pt-1 border-t border-white/15">
                  <span>{c.studentCount} Students</span>
                  <span>Avg: {c.avgScore}/250 pts</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Cohort Overview Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="glass-panel p-5 rounded-2xl text-center shadow-sm">
            <div className="text-2xl font-black text-white">{activeCohort.studentCount}</div>
            <div className="text-[11px] font-bold text-white/70 uppercase mt-0.5">Enrolled Candidates</div>
          </div>
          <div className="glass-panel p-5 rounded-2xl text-center shadow-sm">
            <div className="text-2xl font-black text-rose-300">{activeCohort.avgScore} <span className="text-xs text-white/70 font-normal">/ 250</span></div>
            <div className="text-[11px] font-bold text-white/70 uppercase mt-0.5">Batch Average Score</div>
          </div>
          <div className="glass-panel p-5 rounded-2xl text-center shadow-sm">
            <div className="text-2xl font-black text-emerald-300">{activeCohort.passRate}%</div>
            <div className="text-[11px] font-bold text-white/70 uppercase mt-0.5">Predicted Pass Rate</div>
          </div>
          <div className="glass-panel p-5 rounded-2xl text-center shadow-sm">
            <div className="text-2xl font-black text-indigo-300">{activeCohort.targetExamDate}</div>
            <div className="text-[11px] font-bold text-white/70 uppercase mt-0.5">Target Prometric Date</div>
          </div>
        </div>

        {/* Student Roster & Leaderboard */}
        <div className="rounded-[2.5rem] glass-panel shadow-2xl p-6 sm:p-8 space-y-6 text-white">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/15">
            <div>
              <h2 className="text-xl font-black text-white tracking-tight">
                Batch Leaderboard & Pass Probability
              </h2>
              <p className="text-xs text-white/75">
                Sorted by most recent Prometric simulation score and diagnostic pass prediction.
              </p>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-white/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search candidate name..."
                value={studentSearch}
                onChange={e => setStudentSearch(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2 text-xs rounded-full border border-white/25 bg-white/10 backdrop-blur text-white placeholder-white/60 focus:outline-none"
              />
            </div>
          </div>

          {/* Roster Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-white/10 text-white/80 uppercase text-[10px] font-bold tracking-wider border-y border-white/15">
                <tr>
                  <th className="py-3 px-4">Candidate</th>
                  <th className="py-3 px-4">Tests Completed</th>
                  <th className="py-3 px-4">Last Score (250)</th>
                  <th className="py-3 px-4">Pass Probability</th>
                  <th className="py-3 px-4">Primary Weak Area</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 font-medium text-white/90">
                {filteredStudents.map(st => (
                  <tr key={st.id} className="hover:bg-white/10 transition">
                    <td className="py-3 px-4">
                      <div className="font-bold text-white">{st.name}</div>
                      <div className="text-[10px] text-white/60">{st.email}</div>
                    </td>
                    <td className="py-3 px-4">{st.testsTaken} Sets</td>
                    <td className="py-3 px-4 font-bold">
                      <span className={st.lastScore >= 200 ? 'text-emerald-300' : 'text-rose-300'}>
                        {st.lastScore} / 250
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-white/20 h-2 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${st.passProbability >= 85 ? 'bg-emerald-400' : 'bg-amber-400'}`}
                            style={{ width: `${st.passProbability}%` }}
                          ></div>
                        </div>
                        <span className="font-bold text-white">{st.passProbability}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-500">{st.weakArea}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          st.status === 'Ready'
                            ? 'bg-emerald-100 text-emerald-800'
                            : st.status === 'Needs Review'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {st.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setSelectedStudentForReport(st)}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition inline-flex items-center gap-1"
                      >
                        <FileText className="w-3.5 h-3.5 text-slate-400" />
                        <span>Report</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Enroll Student Modal */}
      {showEnrollModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-4 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-black text-base text-slate-900">Enroll Student into {activeCohort.name}</h3>
              <button
                onClick={() => setShowEnrollModal(false)}
                className="w-7 h-7 rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleEnrollStudent} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maria Santos"
                  value={newStudentName}
                  onChange={e => setNewStudentName(e.target.value)}
                  className="w-full p-2.5 border rounded-xl text-xs focus:outline-rose-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="maria.s@example.com"
                  value={newStudentEmail}
                  onChange={e => setNewStudentEmail(e.target.value)}
                  className="w-full p-2.5 border rounded-xl text-xs focus:outline-rose-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowEnrollModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-xl shadow-md"
                >
                  Enroll Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Official Student Report Sheet Modal */}
      {selectedStudentForReport && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-4 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600">
                  Institutional Academy Scorecard
                </span>
                <h3 className="font-black text-lg text-slate-900">{selectedStudentForReport.name}</h3>
              </div>
              <button
                onClick={() => setSelectedStudentForReport(null)}
                className="w-7 h-7 rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                <div><strong>Email:</strong> {selectedStudentForReport.email}</div>
                <div><strong>Cohort:</strong> {activeCohort.name}</div>
                <div><strong>Track:</strong> {activeCohort.track}</div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                  <div className="text-xl font-black text-emerald-700">{selectedStudentForReport.lastScore} / 250</div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase">Recent CBT Score</div>
                </div>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl">
                  <div className="text-xl font-black text-blue-700">{selectedStudentForReport.passProbability}%</div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase">Pass Prediction</div>
                </div>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900">
                <strong>Pedagogical Weak Point:</strong> {selectedStudentForReport.weakArea}.
                Targeted drills recommended before {activeCohort.targetExamDate}.
              </div>
            </div>

            <div className="pt-2 flex justify-between items-center">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Scorecard</span>
              </button>
              <button
                onClick={() => setSelectedStudentForReport(null)}
                className="px-5 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
