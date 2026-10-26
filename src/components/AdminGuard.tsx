import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import {
  ShieldAlert,
  Lock,
  ArrowRight,
  Sparkles,
  Home,
  LayoutDashboard,
  KeyRound,
  User,
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff
} from 'lucide-react';

interface AdminGuardProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export const AdminGuard: React.FC<AdminGuardProps> = ({
  children,
  allowedRoles = ['admin', 'teacher']
}) => {
  const {
    currentUser,
    isAdminAuthenticated,
    adminLogin,
    navigateTo,
    themeConfig
  } = useApp();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If already authenticated with credentials and has role, grant immediate access
  const isAuthorized =
    isAdminAuthenticated &&
    allowedRoles.includes(currentUser.role);

  if (isAuthorized) {
    return <>{children}</>;
  }

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    setTimeout(() => {
      const result = adminLogin(username, password);
      if (!result.success) {
        setErrorMessage(result.error || 'Invalid credentials. Access denied.');
      }
      setIsSubmitting(false);
    }, 400);
  };

  return (
    <div
      className="min-h-screen text-slate-100 flex items-center justify-center p-4 sm:p-6 font-sans relative"
      style={{
        backgroundImage: themeConfig.backgroundImageUrl ? `url(${themeConfig.backgroundImageUrl})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundColor: '#090c15'
      }}
    >
      {/* Background glass overlay */}
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md pointer-events-none" />

      <div className="max-w-md w-full bg-slate-900/80 border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-2xl relative z-10 space-y-6">
        {/* Header with Custom Logo or Torii Emblem */}
        <div className="text-center space-y-3">
          {themeConfig.customLogoUrl ? (
            <div className="mx-auto flex justify-center">
              <img
                src={themeConfig.customLogoUrl}
                alt={themeConfig.instituteTitle}
                className="h-16 w-auto object-contain rounded-xl p-1 bg-white/10 backdrop-blur-md border border-white/20 shadow-lg"
              />
            </div>
          ) : (
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-rose-600 via-red-600 to-amber-500 mx-auto flex items-center justify-center text-white shadow-xl shadow-rose-600/30 border border-white/20">
              <Lock className="w-7 h-7 text-white animate-pulse" />
            </div>
          )}

          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-[10px] font-bold uppercase tracking-wider mb-1.5">
              <ShieldAlert className="w-3 h-3" />
              <span>Staff & Admin Password Authentication</span>
            </div>
            <h1 className="text-xl font-black text-white tracking-tight">
              {themeConfig.instituteName}
            </h1>
            <p className="text-xs font-semibold text-rose-400 mt-0.5">
              {themeConfig.instituteTitle}
            </p>
            <p className="text-[11px] text-slate-400 italic mt-0.5">
              {themeConfig.instituteSlogan}
            </p>
          </div>
        </div>

        {/* Password Authentication Form */}
        <form onSubmit={handleAuthSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold text-slate-300 mb-1">
              Authorized Staff Username or Email
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Enter administrator username"
                className="w-full pl-9 pr-3.5 py-2.5 text-xs rounded-xl bg-slate-950/70 border border-white/20 text-white placeholder-slate-500 focus:outline-rose-500 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-300 mb-1">
              Secret Password
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full pl-9 pr-10 py-2.5 text-xs rounded-xl bg-slate-950/70 border border-white/20 text-white placeholder-slate-500 focus:outline-rose-500 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {errorMessage && (
            <div className="p-3 bg-red-950/60 border border-red-800/80 rounded-xl text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 active:scale-[0.98] text-white rounded-xl text-xs font-black shadow-lg shadow-rose-600/30 border border-white/20 transition flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
            ) : (
              <>
                <Lock className="w-3.5 h-3.5" />
                <span>Verify Password & Access Admin Center</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>

        {/* Navigation Actions */}
        <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
          <button
            onClick={() => navigateTo('dashboard')}
            className="text-slate-400 hover:text-white flex items-center gap-1.5 transition text-[11px]"
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Student Dashboard</span>
          </button>

          <button
            onClick={() => navigateTo('landing')}
            className="text-slate-400 hover:text-white flex items-center gap-1.5 transition text-[11px]"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </button>
        </div>
      </div>
    </div>
  );
};
