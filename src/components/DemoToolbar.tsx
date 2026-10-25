import React from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  User,
  Sparkles,
  RotateCcw,
  Monitor,
  FileSpreadsheet,
  Layers,
  GraduationCap,
  Lock,
  LogOut
} from 'lucide-react';

export const DemoToolbar: React.FC = () => {
  const {
    currentUser,
    switchRole,
    resetAllData,
    currentView,
    navigateTo,
    activeAttempt,
    isAdminAuthenticated,
    adminLogout,
    themeConfig
  } = useApp();

  return (
    <div className="no-print bg-slate-950/90 backdrop-blur-md border-b border-white/10 text-white text-xs px-4 py-2 flex flex-wrap items-center justify-between gap-3 shadow-md sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
        </span>
        <span className="font-extrabold text-white uppercase tracking-wider text-[11px]">
          {themeConfig.instituteName}
        </span>
        <span className="text-slate-500">|</span>
        <span className="text-slate-300 font-medium hidden sm:inline">
          {themeConfig.instituteTitle}
        </span>
        <span className="text-slate-600 hidden sm:inline">|</span>
        <span className="text-slate-400">
          User: <strong className="text-white">{currentUser.full_name}</strong> ({currentUser.role.toUpperCase()})
        </span>
        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
          currentUser.subscription_tier === 'pro'
            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
        }`}>
          {currentUser.subscription_tier.toUpperCase()} TIER
        </span>

        {isAdminAuthenticated && (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1">
            <Lock className="w-2.5 h-2.5" />
            <span>Staff Auth Active</span>
          </span>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {/* Switch Role Quick Buttons */}
        <span className="text-slate-400 text-[11px] hidden sm:inline">Role Mode:</span>
        <button
          onClick={() => switchRole('student', 'free')}
          className={`px-2.5 py-1 rounded-xl transition flex items-center gap-1.5 font-medium ${
            currentUser.role === 'student' && currentUser.subscription_tier === 'free'
              ? 'bg-emerald-600 text-white shadow'
              : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
          }`}
          title="Switch to Student with Free Tier"
        >
          <User className="w-3.5 h-3.5" />
          <span>Student (Free)</span>
        </button>

        <button
          onClick={() => switchRole('student', 'pro')}
          className={`px-2.5 py-1 rounded-xl transition flex items-center gap-1.5 font-medium ${
            currentUser.role === 'student' && currentUser.subscription_tier === 'pro'
              ? 'bg-rose-600 text-white shadow'
              : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
          }`}
          title="Switch to Student with Pro Tier"
        >
          <Sparkles className="w-3.5 h-3.5 text-rose-300" />
          <span>Student (Pro)</span>
        </button>

        <button
          onClick={() => {
            if (isAdminAuthenticated) {
              switchRole('teacher', 'pro');
              navigateTo('admin');
            } else {
              navigateTo('admin');
            }
          }}
          className={`px-2.5 py-1 rounded-xl transition flex items-center gap-1.5 font-medium ${
            currentUser.role === 'teacher'
              ? 'bg-amber-600 text-white shadow'
              : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
          }`}
          title="Access Teacher / Sensei Control Panel (Password Protected)"
        >
          <GraduationCap className="w-3.5 h-3.5 text-amber-300" />
          <span>Teacher {isAdminAuthenticated ? '(Active)' : '(Password)'}</span>
        </button>

        <button
          onClick={() => {
            if (isAdminAuthenticated) {
              switchRole('admin', 'pro');
              navigateTo('admin');
            } else {
              navigateTo('admin');
            }
          }}
          className={`px-2.5 py-1 rounded-xl transition flex items-center gap-1.5 font-medium ${
            currentUser.role === 'admin'
              ? 'bg-indigo-600 text-white shadow'
              : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
          }`}
          title="Access Super Admin CMS (Password Protected)"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-indigo-300" />
          <span>Admin {isAdminAuthenticated ? '(Active)' : '(Password)'}</span>
        </button>

        {isAdminAuthenticated && (
          <button
            onClick={adminLogout}
            className="px-2 py-1 rounded-xl bg-red-950/80 hover:bg-red-900 border border-red-700/60 text-red-300 flex items-center gap-1 font-bold"
            title="Lock Admin Session and Require Re-Authentication"
          >
            <Lock className="w-3 h-3 text-red-400" />
            <span>Lock Admin</span>
          </button>
        )}

        <span className="text-slate-600 mx-1">|</span>

        {/* Quick Nav shortcuts */}
        {activeAttempt && currentView !== 'exam' && (
          <button
            onClick={() => navigateTo('exam', { testId: activeAttempt.mock_test_id })}
            className="px-2.5 py-1 bg-orange-600 hover:bg-orange-500 text-white rounded font-medium flex items-center gap-1 animate-pulse"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Resume Exam</span>
          </button>
        )}

        <button
          onClick={() => navigateTo('results')}
          className={`px-2 py-1 rounded transition flex items-center gap-1 ${
            currentView === 'results' || currentView === 'result-sheet' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          <FileSpreadsheet className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Results</span>
        </button>

        <button
          onClick={resetAllData}
          className="px-2 py-1 bg-red-950/60 hover:bg-red-900 border border-red-800/50 text-red-300 rounded transition flex items-center gap-1 ml-1"
          title="Reset database and local storage to initial mock state"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden lg:inline">Reset Seed</span>
        </button>
      </div>
    </div>
  );
};
