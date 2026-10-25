import React, { ReactNode } from 'react';
import { useApp } from '../context/AppContext';
import {
  LayoutDashboard,
  BookOpen,
  Layers,
  FileSpreadsheet,
  LogOut,
  Sparkles,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

interface StudentLayoutProps {
  children: ReactNode;
}

export const StudentLayout: React.FC<StudentLayoutProps> = ({ children }) => {
  const {
    currentUser,
    currentView,
    navigateTo,
    logoutUser,
    activeAttempt
  } = useApp();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'mock-tests', label: 'Mock Tests', icon: BookOpen },
    { id: 'section-practice', label: 'Section Practice', icon: Layers },
    { id: 'results', label: 'Results & History', icon: FileSpreadsheet },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar Menu */}
        <aside className="no-print w-60 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 shadow-sm z-30">
          <div>
            {/* Logo */}
            <div className="p-5 border-b border-slate-100 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center font-black text-white text-base shadow-sm">
                JFT
              </div>
              <div>
                <h2 className="font-extrabold text-sm text-slate-900 leading-tight">JFT Guru CBT</h2>
                <p className="text-[10px] text-slate-400">Student Portal</p>
              </div>
            </div>

            {/* Ongoing Exam Pill (if active) */}
            {activeAttempt && (
              <div className="p-3 mx-3 my-2 bg-orange-50 border border-orange-200 rounded-xl">
                <span className="text-[10px] font-bold uppercase text-orange-600 block">Exam In Progress</span>
                <p className="text-xs font-semibold text-slate-800 truncate mt-0.5">JFT-Basic Mock</p>
                <button
                  onClick={() => navigateTo('exam', { testId: activeAttempt.mock_test_id })}
                  className="mt-2 w-full py-1.5 bg-orange-600 hover:bg-orange-500 text-white rounded text-xs font-bold transition flex items-center justify-center gap-1"
                >
                  <span>Resume Exam</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Navigation Links */}
            <nav className="p-3 space-y-1">
              {navItems.map(item => {
                const Icon = item.icon;
                const isActive = currentView === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => navigateTo(item.id)}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                      isActive
                        ? 'bg-slate-900 text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-orange-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* User Profile & Footer Controls */}
          <div className="p-4 border-t border-slate-100 space-y-3">
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-slate-800 truncate max-w-[120px]">
                  {currentUser.full_name}
                </span>
                <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                  currentUser.subscription_tier === 'pro'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {currentUser.subscription_tier.toUpperCase()}
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono truncate mt-0.5">{currentUser.email}</p>
            </div>

            {currentUser.role === 'admin' && (
              <button
                onClick={() => navigateTo('admin')}
                className="w-full py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Go to Admin CMS</span>
              </button>
            )}

            <button
              onClick={logoutUser}
              className="w-full py-2 text-slate-500 hover:text-slate-800 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition hover:bg-slate-50"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
