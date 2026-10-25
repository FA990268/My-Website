import React from 'react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import {
  ShieldAlert,
  Lock,
  ArrowRight,
  UserCheck,
  Sparkles,
  Home,
  LayoutDashboard,
  LogIn
} from 'lucide-react';

interface AdminGuardProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export const AdminGuard: React.FC<AdminGuardProps> = ({
  children,
  allowedRoles = ['admin', 'teacher']
}) => {
  const { currentUser, switchRole, navigateTo, setAuthModalOpen } = useApp();

  const isAuthorized = allowedRoles.includes(currentUser.role);

  if (isAuthorized) {
    return <>{children}</>;
  }

  // Unauthorized view for Students
  return (
    <div className="min-h-screen bg-[#090c15] text-slate-100 flex items-center justify-center p-4 sm:p-6 font-sans">
      <div className="max-w-2xl w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header with Lock Emblem */}
        <div className="text-center space-y-3 relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-red-600 to-rose-700 mx-auto flex items-center justify-center text-white shadow-xl shadow-red-600/30 border border-red-500/30">
            <Lock className="w-8 h-8 text-white animate-pulse" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Staff Authorization Required • 講師・管理者専用</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Teacher & Admin Control Center
          </h1>

          <p className="text-sm text-slate-400 max-w-lg mx-auto leading-relaxed">
            This workspace contains exam authoring tools, split-screen question paper setups, and Prometric CBT configurations. Access is restricted to educators, teachers, and system administrators.
          </p>
        </div>

        {/* Current User Session Status Card */}
        <div className="my-6 p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 font-bold">
              {currentUser.full_name?.charAt(0) || 'U'}
            </div>
            <div>
              <div className="font-bold text-white flex items-center gap-2">
                <span>{currentUser.full_name}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {currentUser.role}
                </span>
              </div>
              <div className="text-slate-400 text-[11px]">{currentUser.email}</div>
            </div>
          </div>

          <div className="text-red-400 text-[11px] font-semibold flex items-center gap-1">
            <span>Status: Access Restricted</span>
          </div>
        </div>

        {/* Quick Demo Switcher Options */}
        <div className="space-y-3 pt-2">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span>Fast Switch to Staff Account (Demo)</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => switchRole('teacher', 'pro')}
              className="p-3.5 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-left transition group hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-amber-300 group-hover:text-amber-200">
                  Yamamoto Sensei (山本 先生)
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 font-bold">
                  Teacher
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Access test authoring, split-screen PDF setup, audio mapping, and student cohorts.
              </p>
            </button>

            <button
              onClick={() => switchRole('admin', 'pro')}
              className="p-3.5 rounded-2xl bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 text-left transition group hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-indigo-300 group-hover:text-indigo-200">
                  Administrator (Master)
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-400/20 text-indigo-300 font-bold">
                  Super Admin
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Full system control: student subscription management, database backups, and exam deletion.
              </p>
            </button>
          </div>
        </div>

        {/* Action Links */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => setAuthModalOpen(true)}
            className="text-xs font-bold text-slate-300 hover:text-white flex items-center gap-1.5 transition"
          >
            <LogIn className="w-3.5 h-3.5 text-rose-400" />
            <span>Sign in with Staff Credentials</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigateTo('dashboard')}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition flex items-center gap-1.5"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-slate-400" />
              <span>Student Dashboard</span>
            </button>

            <button
              onClick={() => navigateTo('landing')}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-xs font-bold text-white transition flex items-center gap-1.5 shadow-md shadow-rose-600/30"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
