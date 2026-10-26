import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import { LogIn, UserPlus, Shield, Sparkles, Check, ArrowRight, GraduationCap, User, Lock, Mail, Eye, EyeOff } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { authModalOpen, setAuthModalOpen, loginUser, switchRole, themeConfig } = useApp();
  const [tab, setTab] = useState<'signin' | 'register'>('signin');
  const [email, setEmail] = useState('student@daiichi.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
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
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md flex items-center justify-center p-4">
      {/* Pure Glassmorphic Dialog matching User Screenshot 4 */}
      <div className="glass-panel rounded-[2.5rem] max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl animate-in fade-in zoom-in-95 font-sans relative max-h-[95vh] overflow-y-auto text-white">
        <button
          onClick={() => setAuthModalOpen(false)}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-xs font-bold transition border border-white/30"
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
                className="h-12 w-auto object-contain rounded-full p-1 bg-white/10 backdrop-blur border border-white/40 shadow-md"
              />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-full border border-white/40 bg-white/15 mx-auto flex items-center justify-center text-white shadow-lg mb-2 backdrop-blur">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M2 5h20v2h-2v13h-2V7H6v13H4V7H2V5zm3-3h14v2H5V2zm1 7h12v2H6V9z" />
              </svg>
            </div>
          )}
          <h2 className="text-2xl font-black text-white tracking-tight">
            {themeConfig.instituteName}
          </h2>
          <p className="text-xs font-bold text-rose-300">
            {themeConfig.instituteTitle}
          </p>
          <p className="text-[11px] text-white/70 italic">
            {themeConfig.instituteSlogan}
          </p>
        </div>

        {/* Fast-Switch 1-Click Demo Accounts */}
        <div className="bg-white/10 border border-white/20 rounded-2xl p-3 space-y-2 backdrop-blur">
          <div className="flex items-center justify-between text-[10px] font-bold text-white/70 uppercase tracking-wider">
            <span>Fast 1-Click Demo Profiles</span>
            <Sparkles className="w-3 h-3 text-amber-300" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleQuickAccount('student')}
              className="px-2.5 py-2 bg-white/10 hover:bg-white/20 border border-white/25 rounded-xl text-left text-xs transition shadow-2xs group"
            >
              <div className="font-bold text-white group-hover:text-rose-300 text-[11px] truncate">Student Profile</div>
              <div className="text-[10px] text-white/60 truncate">Tanaka Kenji (Free)</div>
            </button>
            <button
              type="button"
              onClick={() => handleQuickAccount('teacher')}
              className="px-2.5 py-2 bg-white/10 hover:bg-white/20 border border-white/25 rounded-xl text-left text-xs transition shadow-2xs group"
            >
              <div className="font-bold text-white group-hover:text-amber-300 text-[11px] truncate">Sensei / Teacher</div>
              <div className="text-[10px] text-white/60 truncate">Yamamoto Sensei</div>
            </button>
            <button
              type="button"
              onClick={() => handleQuickAccount('admin')}
              className="px-2.5 py-2 bg-white/10 hover:bg-white/20 border border-white/25 rounded-xl text-left text-xs transition shadow-2xs group"
            >
              <div className="font-bold text-white group-hover:text-indigo-300 text-[11px] truncate">Admin Master</div>
              <div className="text-[10px] text-white/60 truncate">Super Admin CBT</div>
            </button>
          </div>
        </div>

        {/* Tab Switcher Pills */}
        <div className="flex rounded-full bg-white/10 p-1 border border-white/20">
          <button
            type="button"
            onClick={() => setTab('signin')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-full transition ${
              tab === 'signin'
                ? 'glass-capsule-item-active text-white'
                : 'text-white/70 hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setTab('register')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-full transition ${
              tab === 'register'
                ? 'glass-capsule-item-active text-white'
                : 'text-white/70 hover:text-white'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Main Form with Glass Inputs */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {tab === 'register' && (
            <div>
              <label className="block text-[11px] font-bold text-white/80 mb-1">
                Full Name (with Kanji / Romaji)
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  placeholder="e.g. Kenji Tanaka"
                  className="w-full px-4 py-2.5 pr-10 text-xs glass-input"
                />
                <User className="w-4 h-4 text-white/60 absolute right-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-bold text-white/80 mb-1">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-4 py-2.5 pr-10 text-xs glass-input"
              />
              <Mail className="w-4 h-4 text-white/60 absolute right-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-white/80 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-2.5 pr-10 text-xs glass-input"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {passkeyError && (
            <div className="p-3 bg-red-950/70 border border-red-500/50 rounded-xl text-red-200 text-xs font-semibold">
              {passkeyError}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 glass-btn-primary rounded-2xl text-xs font-extrabold uppercase tracking-wider transition shadow-lg mt-2 active:scale-95"
          >
            {tab === 'signin' ? 'Sign In to Portal' : 'Register New Account'}
          </button>
        </form>
      </div>
    </div>
  );
};
