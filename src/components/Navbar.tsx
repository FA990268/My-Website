import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Monitor,
  Flame,
  Crown,
  ChevronDown,
  User,
  LogOut,
  Sparkles,
  BookOpen,
  Mic,
  ShoppingBag,
  Building2,
  Newspaper,
  Compass,
  CheckCircle2,
  Menu,
  X,
  Search,
  Lock,
  Layers,
  Home
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentUser,
    logoutUser,
    navigateTo,
    currentView,
    setAuthModalOpen,
    setPricingModalOpen,
    switchRole,
    themeConfig,
    isAdminAuthenticated,
    adminLogout
  } = useApp();

  const [mockTestsDropdownOpen, setMockTestsDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isPro = currentUser.subscription_tier !== 'free';

  const handleNav = (view: string, params?: Record<string, string>) => {
    navigateTo(view, params);
    setMockTestsDropdownOpen(false);
    setProfileDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-2 z-40 w-full px-3 sm:px-6 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center gap-2.5">
        {/* Main Floating Glass Capsule Bar (Exact Style of Screenshot 2 & 3) */}
        <div className="flex-1 rounded-full glass-capsule-bar px-4 sm:px-6 py-1.5 sm:py-2">
          <div className="flex items-center justify-between h-12 sm:h-14">
            {/* Brand Logo & Titles with Transparent Capsule Styling */}
            <div
              onClick={() => handleNav('landing')}
              className="flex items-center gap-2.5 cursor-pointer select-none group shrink-0"
            >
              {themeConfig.customLogoUrl ? (
                <img
                  src={themeConfig.customLogoUrl}
                  alt={themeConfig.instituteTitle}
                  className="w-9 h-9 object-contain rounded-full border border-white/40 p-0.5 bg-white/10 backdrop-blur shadow-sm group-hover:scale-105 transition-transform"
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-rose-500/80 via-red-500/70 to-amber-500/80 flex items-center justify-center shadow-md shadow-rose-500/30 text-white font-black text-lg transition-transform group-hover:scale-105 border border-white/40 backdrop-blur">
                  {/* Torii Gate SVG Icon */}
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M2 5h20v2h-2v13h-2V7H6v13H4V7H2V5zm3-3h14v2H5V2zm1 7h12v2H6V9z" />
                  </svg>
                </div>
              )}
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-sm sm:text-base text-white tracking-tight">
                    DAI ICHI <span className="text-rose-300">ACADEMY</span>
                  </span>
                  <span className="text-[9px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-white/15 text-white border border-white/30 backdrop-blur">
                    CBT
                  </span>
                </div>
                <p className="text-[10px] text-white/80 font-medium hidden md:block truncate max-w-xs lg:max-w-sm">
                  <strong className="text-white">{themeConfig.instituteTitle}</strong> • {themeConfig.instituteSlogan}
                </p>
              </div>
            </div>

            {/* Desktop Navigation Links — Translucent Glass Capsule Items */}
            <nav className="hidden lg:flex items-center gap-1">
              <button
                onClick={() => handleNav('landing')}
                className={`px-3.5 py-1.5 text-xs rounded-full transition flex items-center gap-1.5 ${
                  currentView === 'landing'
                    ? 'glass-capsule-item-active'
                    : 'text-white/80 hover:text-white hover:bg-white/10 font-semibold'
                }`}
              >
                <Home className="w-3.5 h-3.5" />
                <span>Home</span>
              </button>

              {/* Mock Tests Dropdown Capsule */}
              <div className="relative">
                <button
                  onClick={() => setMockTestsDropdownOpen(!mockTestsDropdownOpen)}
                  onBlur={() => setTimeout(() => setMockTestsDropdownOpen(false), 200)}
                  className={`px-3.5 py-1.5 text-xs rounded-full transition flex items-center gap-1 ${
                    currentView === 'mock-tests' || currentView === 'exam' || currentView === 'preview'
                      ? 'glass-capsule-item-active'
                      : 'text-white/80 hover:text-white hover:bg-white/10 font-semibold'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Mock Tests</span>
                  <ChevronDown className="w-3 h-3 opacity-70" />
                </button>

                {mockTestsDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-72 rounded-3xl glass-panel py-2 z-50 text-white animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-4 py-1.5 border-b border-white/15 text-[10px] font-bold text-white/60 uppercase tracking-wider">
                      Official Exam Tracks (7 Tracks)
                    </div>
                    <button
                      onClick={() => handleNav('mock-tests', { track: 'JFT Basic' })}
                      className="w-full text-left px-4 py-2 text-xs font-semibold text-white/90 hover:bg-white/15 hover:text-white flex items-center justify-between transition"
                    >
                      <span>⛩️ JFT-Basic CBT Official (8 Sets)</span>
                      <span className="text-[10px] bg-emerald-500/25 text-emerald-200 font-bold px-2 py-0.5 rounded-full border border-emerald-400/40">Free</span>
                    </button>
                    <button
                      onClick={() => handleNav('mock-tests', { track: 'Irodori Books' })}
                      className="w-full text-left px-4 py-2 text-xs font-semibold text-white/90 hover:bg-white/15 hover:text-white flex items-center justify-between transition"
                    >
                      <span>📖 Irodori Starter A1 & Elementary A2</span>
                      <span className="text-[10px] text-white/60">3 Sets</span>
                    </button>
                    <button
                      onClick={() => handleNav('mock-tests', { track: 'SSW Care Worker' })}
                      className="w-full text-left px-4 py-2 text-xs font-semibold text-white/90 hover:bg-white/15 hover:text-white flex items-center justify-between transition"
                    >
                      <span>🩺 SSW Care Worker (Kaigo)</span>
                      <span className="text-[10px] text-amber-300 font-bold">PRO</span>
                    </button>
                    <button
                      onClick={() => handleNav('mock-tests', { track: 'SSW Food Service' })}
                      className="w-full text-left px-4 py-2 text-xs font-semibold text-white/90 hover:bg-white/15 hover:text-white flex items-center justify-between transition"
                    >
                      <span>🍳 SSW Food Service & Restaurant</span>
                      <span className="text-[10px] text-amber-300 font-bold">PRO</span>
                    </button>
                    <button
                      onClick={() => handleNav('mock-tests', { track: 'SSW Construction' })}
                      className="w-full text-left px-4 py-2 text-xs font-semibold text-white/90 hover:bg-white/15 hover:text-white flex items-center justify-between transition"
                    >
                      <span>🏗️ SSW Construction & Safety</span>
                      <span className="text-[10px] text-amber-300 font-bold">PRO</span>
                    </button>
                    <button
                      onClick={() => handleNav('mock-tests', { track: 'SSW Agriculture' })}
                      className="w-full text-left px-4 py-2 text-xs font-semibold text-white/90 hover:bg-white/15 hover:text-white flex items-center justify-between transition"
                    >
                      <span>🌾 SSW Agriculture & Livestock</span>
                      <span className="text-[10px] text-amber-300 font-bold">PRO</span>
                    </button>
                    <button
                      onClick={() => handleNav('mock-tests', { track: 'JLPT Mock Tests' })}
                      className="w-full text-left px-4 py-2 text-xs font-semibold text-white/90 hover:bg-white/15 hover:text-white flex items-center justify-between transition"
                    >
                      <span>🎌 JLPT N5, N4, N3, N2, N1</span>
                      <span className="text-[10px] text-white/60">5 Sets</span>
                    </button>
                    <div className="border-t border-white/15 mt-1 pt-1.5 px-3">
                      <button
                        onClick={() => handleNav('mock-tests')}
                        className="w-full py-1 text-center text-xs font-bold text-rose-300 hover:text-white transition"
                      >
                        View All 24+ Mock Tests →
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => handleNav('tools')}
                className={`px-3.5 py-1.5 text-xs rounded-full transition flex items-center gap-1.5 ${
                  currentView === 'tools'
                    ? 'glass-capsule-item-active'
                    : 'text-white/80 hover:text-white hover:bg-white/10 font-semibold'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>25 Tools</span>
                <span className="text-[9px] bg-emerald-500/20 text-emerald-200 font-bold px-1.5 py-0.2 rounded-full border border-emerald-400/30">Free</span>
              </button>

              <button
                onClick={() => handleNav('ai-speaking')}
                className={`px-3.5 py-1.5 text-xs rounded-full transition flex items-center gap-1.5 ${
                  currentView === 'ai-speaking'
                    ? 'glass-capsule-item-active'
                    : 'text-white/80 hover:text-white hover:bg-white/10 font-semibold'
                }`}
              >
                <Mic className="w-3.5 h-3.5" />
                <span>AI Speaking</span>
              </button>

              <button
                onClick={() => handleNav('store')}
                className={`px-3.5 py-1.5 text-xs rounded-full transition flex items-center gap-1.5 ${
                  currentView === 'store'
                    ? 'glass-capsule-item-active'
                    : 'text-white/80 hover:text-white hover:bg-white/10 font-semibold'
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Store</span>
              </button>

              <button
                onClick={() => handleNav('institutes')}
                className={`px-3.5 py-1.5 text-xs rounded-full transition flex items-center gap-1.5 ${
                  currentView === 'institutes'
                    ? 'glass-capsule-item-active'
                    : 'text-white/80 hover:text-white hover:bg-white/10 font-semibold'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>For Institutes</span>
              </button>

              <button
                onClick={() => handleNav('blog')}
                className={`px-3.5 py-1.5 text-xs rounded-full transition flex items-center gap-1.5 ${
                  currentView === 'blog'
                    ? 'glass-capsule-item-active'
                    : 'text-white/80 hover:text-white hover:bg-white/10 font-semibold'
                }`}
              >
                <Newspaper className="w-3.5 h-3.5" />
                <span>Blog</span>
              </button>
            </nav>

            {/* Right Actions: Capsules */}
            <div className="flex items-center gap-2">
              {/* Study Streak Pill */}
              <div
                title={`${currentUser.streak || 7}-day study streak! Keep practicing daily.`}
                className="hidden md:flex items-center gap-1 px-3 py-1 bg-amber-500/20 border border-amber-400/40 rounded-full text-xs font-bold text-amber-200 backdrop-blur cursor-default"
              >
                <Flame className="w-3.5 h-3.5 text-amber-300 fill-amber-300 animate-pulse" />
                <span>{currentUser.streak || 7} Days</span>
              </div>

              {/* User Plan / Credits Capsule */}
              <button
                onClick={() => setPricingModalOpen(true)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold border transition flex items-center gap-1.5 backdrop-blur-md ${
                  isPro
                    ? 'bg-amber-500/25 border-amber-400/50 text-amber-200 hover:bg-amber-500/35'
                    : 'bg-white/15 border-white/30 text-white hover:bg-white/25'
                }`}
              >
                {isPro ? (
                  <>
                    <Crown className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                    <span>PRO Unlimited</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3 h-3 text-amber-300" />
                    <span>Free ({currentUser.credits ?? 3})</span>
                    <span className="text-[10px] text-rose-300 font-extrabold underline ml-0.5">Upgrade</span>
                  </>
                )}
              </button>

              {/* Profile / Account Dropdown Capsule */}
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  onBlur={() => setTimeout(() => setProfileDropdownOpen(false), 200)}
                  className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 border border-white/35 flex items-center justify-center text-white backdrop-blur transition shadow-sm"
                >
                  <User className="w-4 h-4" />
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 rounded-3xl glass-panel py-2 z-50 text-white animate-in fade-in slide-in-from-top-2">
                    <div className="px-4 py-2.5 border-b border-white/15">
                      <p className="text-xs font-bold text-white truncate">{currentUser.full_name}</p>
                      <p className="text-[10px] text-white/70 truncate">{currentUser.email}</p>
                      <span className={`inline-block mt-1 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                        currentUser.role === 'admin'
                          ? 'bg-indigo-500/25 text-indigo-200 border-indigo-400/40'
                          : currentUser.role === 'teacher'
                          ? 'bg-amber-500/25 text-amber-200 border-amber-400/40'
                          : 'bg-emerald-500/25 text-emerald-200 border-emerald-400/40'
                      }`}>
                        Role: {currentUser.role.toUpperCase()}
                      </span>
                    </div>

                    <button
                      onClick={() => handleNav('dashboard')}
                      className="w-full text-left px-4 py-2 text-xs font-semibold text-white/90 hover:bg-white/15 hover:text-white flex items-center gap-2 transition"
                    >
                      <User className="w-3.5 h-3.5 text-white/70" />
                      <span>My Dashboard & Results</span>
                    </button>

                    {/* Restrict Admin Panel: Only accessible via auth gate or when authenticated */}
                    <button
                      onClick={() => handleNav('admin')}
                      className="w-full text-left px-4 py-2 text-xs font-semibold text-white/90 hover:bg-white/15 hover:text-white flex items-center gap-2 transition"
                    >
                      <Monitor className="w-3.5 h-3.5 text-rose-300" />
                      <span>Authorized Admin Panel</span>
                      {!isAdminAuthenticated && (
                        <Lock className="w-3 h-3 text-white/60 ml-auto" />
                      )}
                    </button>

                    <div className="border-t border-white/15 my-1" />

                    {/* Role Switcher */}
                    <div className="px-4 py-1 text-[10px] font-bold text-white/60">
                      Demo Account Profiles:
                    </div>
                    <button
                      onClick={() => switchRole('student', 'free')}
                      className="w-full text-left px-4 py-1.5 text-xs text-white/85 hover:bg-white/15 hover:text-white flex items-center justify-between transition"
                    >
                      <span>Student Profile</span>
                      {currentUser.role === 'student' && !isPro && <CheckCircle2 className="w-3 h-3 text-emerald-300" />}
                    </button>
                    <button
                      onClick={() => switchRole('teacher', 'pro')}
                      className="w-full text-left px-4 py-1.5 text-xs text-white/85 hover:bg-white/15 hover:text-white flex items-center justify-between transition"
                    >
                      <span>Sensei / Teacher</span>
                      {currentUser.role === 'teacher' && <CheckCircle2 className="w-3 h-3 text-amber-300" />}
                    </button>
                    <button
                      onClick={() => switchRole('admin', 'pro')}
                      className="w-full text-left px-4 py-1.5 text-xs text-white/85 hover:bg-white/15 hover:text-white flex items-center justify-between transition"
                    >
                      <span>Admin Master</span>
                      {currentUser.role === 'admin' && <CheckCircle2 className="w-3 h-3 text-indigo-300" />}
                    </button>

                    <div className="border-t border-white/15 my-1" />

                    {isAdminAuthenticated ? (
                      <button
                        onClick={() => adminLogout()}
                        className="w-full text-left px-4 py-1.5 text-xs font-semibold text-rose-300 hover:bg-rose-500/25 flex items-center gap-2 transition"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Admin Sign Out</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => logoutUser()}
                        className="w-full text-left px-4 py-1.5 text-xs font-semibold text-rose-300 hover:bg-rose-500/25 flex items-center gap-2 transition"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Primary Action Button: Start Mock Test — Glass Pill */}
              <button
                onClick={() => handleNav('mock-tests')}
                className="hidden sm:flex items-center gap-1.5 px-5 py-2 glass-btn-primary rounded-full text-xs font-bold transition"
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Start Mock Test</span>
              </button>

              {/* Mobile Hamburger Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-white hover:bg-white/15 rounded-full transition"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Drawer */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-white/15 space-y-1 animate-in fade-in">
              <button
                onClick={() => handleNav('landing')}
                className="w-full text-left px-4 py-2 text-sm font-semibold text-white/90 hover:bg-white/15 rounded-2xl"
              >
                Home
              </button>
              <button
                onClick={() => handleNav('mock-tests')}
                className="w-full text-left px-4 py-2 text-sm font-semibold text-white/90 hover:bg-white/15 rounded-2xl flex items-center justify-between"
              >
                <span>Mock Tests (24+ Sets)</span>
                <span className="text-xs bg-rose-500/25 text-rose-200 font-bold px-2 py-0.5 rounded-full border border-rose-400/40">All Tracks</span>
              </button>
              <button
                onClick={() => handleNav('tools')}
                className="w-full text-left px-4 py-2 text-sm font-semibold text-white/90 hover:bg-white/15 rounded-2xl flex items-center justify-between"
              >
                <span>25 Japanese Tools</span>
                <span className="text-xs bg-emerald-500/25 text-emerald-200 font-bold px-2 py-0.5 rounded-full border border-emerald-400/40">100% Free</span>
              </button>
              <button
                onClick={() => handleNav('ai-speaking')}
                className="w-full text-left px-4 py-2 text-sm font-semibold text-white/90 hover:bg-white/15 rounded-2xl"
              >
                AI Speaking & Interview Coach
              </button>
              <button
                onClick={() => handleNav('store')}
                className="w-full text-left px-4 py-2 text-sm font-semibold text-white/90 hover:bg-white/15 rounded-2xl"
              >
                Digital Book Store
              </button>
              <button
                onClick={() => handleNav('institutes')}
                className="w-full text-left px-4 py-2 text-sm font-semibold text-white/90 hover:bg-white/15 rounded-2xl"
              >
                For Language Academies & Institutes
              </button>
              <button
                onClick={() => handleNav('blog')}
                className="w-full text-left px-4 py-2 text-sm font-semibold text-white/90 hover:bg-white/15 rounded-2xl"
              >
                Exam Guides & Blog
              </button>
              <div className="pt-2 border-t border-white/15 flex gap-2">
                <button
                  onClick={() => setAuthModalOpen(true)}
                  className="flex-1 py-2 text-center text-xs font-bold text-white bg-white/15 rounded-full border border-white/30"
                >
                  Sign In
                </button>
                <button
                  onClick={() => handleNav('mock-tests')}
                  className="flex-1 py-2 text-center text-xs font-bold text-white glass-btn-primary rounded-full"
                >
                  Launch CBT
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Circular Glass Lens Quick Search Button (Exact Style of Screenshot 2 Right Button) */}
        <button
          type="button"
          onClick={() => handleNav('tools')}
          title="Quick Search & 25 Japanese Tools"
          className="w-11 h-11 sm:w-12 sm:h-12 shrink-0 glass-circle-lens flex items-center justify-center text-white cursor-pointer shadow-lg active:scale-95 transition-transform"
        >
          <Search className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </button>
      </div>
    </header>
  );
};
