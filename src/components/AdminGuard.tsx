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
  EyeOff,
  Check
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
  const [rememberMe, setRememberMe] = useState(true);
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
        setErrorMessage(result.error || 'Invalid administrator credentials. Access denied.');
      }
      setIsSubmitting(false);
    }, 350);
  };

  return (
    <div
      className="min-h-screen text-slate-100 flex items-center justify-center p-4 sm:p-6 font-sans relative select-none"
      style={{
        backgroundImage: themeConfig.backgroundImageUrl ? `url(${themeConfig.backgroundImageUrl})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundColor: '#090c15'
      }}
    >
      {/* Subtle glass reflection overlay without blocking the background */}
      <div className="absolute inset-0 bg-black/10 pointer-events-none" />

      {/* Pure Glassmorphic Login Card (Exact Match to User Reference Screenshot 4) */}
      <div className="max-w-md w-full glass-panel rounded-[2.5rem] p-8 sm:p-10 shadow-2xl relative z-10 space-y-6 animate-in fade-in zoom-in-95 duration-300">
        {/* Card Header */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Login
            </h1>
            {themeConfig.customLogoUrl ? (
              <img
                src={themeConfig.customLogoUrl}
                alt="Logo"
                className="w-10 h-10 object-contain rounded-full p-1 border border-white/40 bg-white/10 backdrop-blur"
              />
            ) : (
              <div className="w-10 h-10 rounded-full border border-white/40 bg-white/15 flex items-center justify-center text-white backdrop-blur shadow-sm">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M2 5h20v2h-2v13h-2V7H6v13H4V7H2V5zm3-3h14v2H5V2zm1 7h12v2H6V9z" />
                </svg>
              </div>
            )}
          </div>
          <p className="text-xs sm:text-sm text-white/80 font-medium pt-1">
            Welcome back please login to your account
          </p>
          <div className="text-[11px] text-rose-300 font-bold uppercase tracking-wider pt-0.5">
            {themeConfig.instituteName} • Staff Portal
          </div>
        </div>

        {/* Authentication Form with Glass Inputs */}
        <form onSubmit={handleAuthSubmit} className="space-y-4 pt-2">
          {/* User Name Field */}
          <div className="relative">
            <input
              type="text"
              required
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="User Name"
              className="w-full px-5 py-3.5 pr-12 text-xs sm:text-sm glass-input"
            />
            <User className="w-5 h-5 text-white/70 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Password Field */}
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-5 py-3.5 pr-12 text-xs sm:text-sm glass-input"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {/* Remember Me Option */}
          <div className="flex items-center justify-between text-xs text-white/90 pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={e => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded-md border border-white/50 bg-white/20 text-rose-600 focus:ring-0 cursor-pointer"
              />
              <span className="font-medium text-xs">Remember me</span>
            </label>
            <span className="text-[11px] text-white/60">Protected Session</span>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="p-3 bg-red-950/70 border border-red-500/50 rounded-2xl text-red-200 text-xs flex items-center gap-2 animate-in fade-in backdrop-blur">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Login Button with Full Glassmorphic Shine */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 text-sm sm:text-base font-extrabold text-white rounded-2xl glass-btn-primary transition flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              {isSubmitting ? (
                <span className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                <span>Login</span>
              )}
            </button>
          </div>
        </form>

        {/* Footer Navigation */}
        <div className="text-center pt-2 text-xs text-white/80 space-y-2">
          <p>
            Don't have an account?{' '}
            <button
              type="button"
              onClick={() => navigateTo('dashboard')}
              className="text-white font-bold underline hover:text-rose-300 transition ml-0.5"
            >
              Student Portal
            </button>
          </p>

          <div className="pt-3 border-t border-white/15 flex items-center justify-between text-[11px] text-white/70">
            <button
              type="button"
              onClick={() => navigateTo('landing')}
              className="hover:text-white flex items-center gap-1 transition"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </button>

            <span className="italic">{themeConfig.instituteSlogan}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
