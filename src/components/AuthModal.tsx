import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import { LogIn, UserPlus, Shield, Sparkles, Check, ArrowRight, GraduationCap } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { authModalOpen, setAuthModalOpen, loginUser, switchRole, themeConfig } = useApp();
  const [tab, setTab] = useState<'signin' | 'register'>('signin');
  const [email, setEmail] = useState('student@daiichi.com');
  const [password, setPassword] = useState('password123');
  const [fullName, setFullName] = useState('Tanaka Kenji (田中 健二)');
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [teacherPasskey, setTeacherPasskey] = useState('');
  const [passkeyError, setPasskeyError] = useState<string | null>(null);

  if (!authModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasskeyError(null);

    if (tab === 'register' && selectedRole === 'teacher') {
      if (teacherPasskey && teacherPasskey !== 'SENSEI2025' && teacherPasskey !== 'GURU-TEACHER') {
        setPasskeyError('Invalid Educator Passkey. For demo testing, use "SENSEI2025" or leave blank.');
        return;
      }
    }

    loginUser(email, tab === 'register' ? selectedRole : undefined);
  };

  const handleQuickAccount = (type: UserRole) => {
    if (type === 'student') {
      switchRole('student', 'free');
    } else if (type === 'teacher') {
      switchRole('teacher', 'pro');
    } else {
      switchRole('admin', 'pro');
    }
    setAuthModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl animate-in fade-in zoom-in-95 font-sans relative max-h-[95vh] overflow-y-auto">
        <button
          onClick={() => setAuthModalOpen(false)}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center text-xs font-bold transition"
        >
          ✕
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-1">
          {themeConfig.customLogoUrl ? (
            <div className="mx-auto flex justify-center mb-2">
              <img
                src={themeConfig.customLogoUrl}
                alt={themeConfig.instituteTitle}
                className="h-12 w-auto object-contain rounded-xl p-0.5 bg-white shadow-md border border-slate-200"
              />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-600 to-amber-500 mx-auto flex items-center justify-center text-white shadow-lg shadow-rose-500/25 mb-2">
              <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
                <path d="M2 5h20v2h-2v13h-2V7H6v13H4V7H2V5zm3-3h14v2H5V2zm1 7h12v2H6V9z" />
              </svg>
            </div>
          )}
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            {themeConfig.instituteName}
          </h2>
          <p className="text-xs font-bold text-rose-600">
            {themeConfig.instituteTitle}
          </p>
          <p className="text-[11px] text-slate-500 italic">
            {themeConfig.instituteSlogan}
          </p>
        </div>

        {/* Fast-Switch 1-Click Demo Accounts */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 space-y-2">
          <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            <span>Fast 1-Click Demo Access</span>
            <Sparkles className="w-3 h-3 text-amber-500" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleQuickAccount('student')}
              className="px-2.5 py-2 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl text-left text-xs transition shadow-2xs group"
            >
              <div className="font-bold text-slate-900 group-hover:text-rose-600 text-[11px] truncate">Student Profile</div>
              <div className="text-[10px] text-slate-400 truncate">Tanaka Kenji (Free)</div>
            </button>
            <button
              type="button"
              onClick={() => handleQuickAccount('teacher')}
              className="px-2.5 py-2 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl text-left text-xs transition shadow-2xs group"
            >
              <div className="font-bold text-slate-900 group-hover:text-amber-600 text-[11px] truncate">Teacher (Sensei)</div>
              <div className="text-[10px] text-slate-400 truncate">Yamamoto Sensei</div>
            </button>
            <button
              type="button"
              onClick={() => handleQuickAccount('admin')}
              className="px-2.5 py-2 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl text-left text-xs transition shadow-2xs group"
            >
              <div className="font-bold text-slate-900 group-hover:text-indigo-600 text-[11px] truncate">Admin Master</div>
              <div className="text-[10px] text-slate-400 truncate">Super Admin 001</div>
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex rounded-xl bg-slate-100 p-1">
          <button
            type="button"
            onClick={() => {
              setTab('signin');
              setPasskeyError(null);
            }}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition ${
              tab === 'signin' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setTab('register');
              setPasskeyError(null);
            }}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition ${
              tab === 'register' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Register
          </button>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {tab === 'register' && (
            <>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Account Type / Role
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedRole('student')}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition ${
                      selectedRole === 'student'
                        ? 'border-rose-500 bg-rose-50 text-rose-700 shadow-xs'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>Student / Learner</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedRole('teacher')}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition ${
                      selectedRole === 'teacher'
                        ? 'border-amber-500 bg-amber-50 text-amber-800 shadow-xs'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>Teacher / Sensei</span>
                  </button>
                </div>
              </div>

              {selectedRole === 'teacher' && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-2.5 space-y-1">
                  <label className="block text-[10px] font-bold text-amber-900">
                    Educator Access Passkey (Demo: SENSEI2025)
                  </label>
                  <input
                    type="text"
                    value={teacherPasskey}
                    onChange={e => {
                      setTeacherPasskey(e.target.value);
                      setPasskeyError(null);
                    }}
                    placeholder="SENSEI2025"
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-amber-300 bg-white focus:outline-amber-600"
                  />
                  {passkeyError && (
                    <p className="text-[10px] text-red-600 font-bold">{passkeyError}</p>
                  )}
                </div>
              )}

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Full Name (Japanese or English)</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  placeholder="Tanaka Kenji"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-rose-500 transition"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="student@jftguru.com"
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-rose-500 transition"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-rose-500 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 active:scale-95 text-white rounded-xl text-xs font-bold shadow-md shadow-rose-600/30 transition flex items-center justify-center gap-1.5"
          >
            <span>{tab === 'signin' ? 'Sign In to Portal' : 'Create Account'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Google OAuth Simulation */}
        <div className="relative flex py-1 items-center">
          <div className="grow border-t border-slate-200"></div>
          <span className="shrink mx-3 text-[10px] uppercase font-bold text-slate-400">Or continue with</span>
          <div className="grow border-t border-slate-200"></div>
        </div>

        <button
          type="button"
          onClick={() => {
            loginUser('student@gmail.com', 'student');
          }}
          className="w-full py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>
      </div>
    </div>
  );
};
