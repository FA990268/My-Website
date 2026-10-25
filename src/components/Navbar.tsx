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
  X
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentUser,
    logoutUser,
    navigateTo,
    currentView,
    setAuthModalOpen,
    setPricingModalOpen,
    switchRole
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
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200/80 shadow-xs font-sans transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo with Torii Emblem */}
          <div
            onClick={() => handleNav('landing')}
            className="flex items-center gap-2.5 cursor-pointer select-none group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 via-red-600 to-amber-500 flex items-center justify-center shadow-md shadow-rose-500/20 text-white font-black text-xl transition-transform group-hover:scale-105">
              {/* Torii Gate SVG Icon */}
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M2 5h20v2h-2v13h-2V7H6v13H4V7H2V5zm3-3h14v2H5V2zm1 7h12v2H6V9z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg text-slate-900 tracking-tight">
                  JFT <span className="text-rose-600">GURU</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200/60">
                  CBT
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium hidden sm:block">
                JFT-Basic & SSW Prometric Official Simulator
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => handleNav('landing')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                currentView === 'landing'
                  ? 'text-rose-600 bg-rose-50'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Home
            </button>

            {/* Mock Tests Dropdown */}
            <div className="relative">
              <button
                onClick={() => setMockTestsDropdownOpen(!mockTestsDropdownOpen)}
                onBlur={() => setTimeout(() => setMockTestsDropdownOpen(false), 200)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition flex items-center gap-1 ${
                  currentView === 'mock-tests' || currentView === 'exam' || currentView === 'preview'
                    ? 'text-rose-600 bg-rose-50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span>Mock Tests</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {mockTestsDropdownOpen && (
                <div className="absolute left-0 mt-2 w-72 rounded-2xl bg-white border border-slate-200 shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-1.5 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Official Exam Tracks (7 Tracks)
                  </div>
                  <button
                    onClick={() => handleNav('mock-tests', { track: 'JFT Basic' })}
                    className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-rose-50 hover:text-rose-700 flex items-center justify-between"
                  >
                    <span>⛩️ JFT-Basic CBT Official (8 Sets)</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">Free Available</span>
                  </button>
                  <button
                    onClick={() => handleNav('mock-tests', { track: 'Irodori Books' })}
                    className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-rose-50 hover:text-rose-700 flex items-center justify-between"
                  >
                    <span>📖 Irodori Starter A1 & Elementary A2</span>
                    <span className="text-[10px] text-slate-400">3 Sets</span>
                  </button>
                  <button
                    onClick={() => handleNav('mock-tests', { track: 'SSW Care Worker' })}
                    className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-rose-50 hover:text-rose-700 flex items-center justify-between"
                  >
                    <span>🩺 SSW Care Worker (Kaigo)</span>
                    <span className="text-[10px] text-amber-600 font-bold">PRO</span>
                  </button>
                  <button
                    onClick={() => handleNav('mock-tests', { track: 'SSW Food Service' })}
                    className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-rose-50 hover:text-rose-700 flex items-center justify-between"
                  >
                    <span>🍳 SSW Food Service & Restaurant</span>
                    <span className="text-[10px] text-amber-600 font-bold">PRO</span>
                  </button>
                  <button
                    onClick={() => handleNav('mock-tests', { track: 'SSW Construction' })}
                    className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-rose-50 hover:text-rose-700 flex items-center justify-between"
                  >
                    <span>🏗️ SSW Construction & Safety</span>
                    <span className="text-[10px] text-amber-600 font-bold">PRO</span>
                  </button>
                  <button
                    onClick={() => handleNav('mock-tests', { track: 'SSW Agriculture' })}
                    className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-rose-50 hover:text-rose-700 flex items-center justify-between"
                  >
                    <span>🌾 SSW Agriculture & Livestock</span>
                    <span className="text-[10px] text-amber-600 font-bold">PRO</span>
                  </button>
                  <button
                    onClick={() => handleNav('mock-tests', { track: 'JLPT Mock Tests' })}
                    className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-rose-50 hover:text-rose-700 flex items-center justify-between"
                  >
                    <span>🎌 JLPT N5, N4, N3, N2, N1</span>
                    <span className="text-[10px] text-slate-400">5 Sets</span>
                  </button>
                  <div className="border-t border-slate-100 mt-1 pt-1 px-3">
                    <button
                      onClick={() => handleNav('mock-tests')}
                      className="w-full py-1.5 text-center text-xs font-bold text-rose-600 hover:underline"
                    >
                      View All 24+ Mock Tests →
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => handleNav('tools')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition flex items-center gap-1.5 ${
                currentView === 'tools'
                  ? 'text-rose-600 bg-rose-50'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-indigo-500" />
              <span>25 Japanese Tools</span>
              <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1 rounded">Free</span>
            </button>

            <button
              onClick={() => handleNav('ai-speaking')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition flex items-center gap-1.5 ${
                currentView === 'ai-speaking'
                  ? 'text-rose-600 bg-rose-50'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Mic className="w-3.5 h-3.5 text-rose-500" />
              <span>AI Speaking</span>
            </button>

            <button
              onClick={() => handleNav('store')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition flex items-center gap-1.5 ${
                currentView === 'store'
                  ? 'text-rose-600 bg-rose-50'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5 text-amber-500" />
              <span>Digital Store</span>
            </button>

            <button
              onClick={() => handleNav('institutes')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition flex items-center gap-1.5 ${
                currentView === 'institutes'
                  ? 'text-rose-600 bg-rose-50'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Building2 className="w-3.5 h-3.5 text-blue-500" />
              <span>For Institutes</span>
            </button>

            <button
              onClick={() => handleNav('blog')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition flex items-center gap-1.5 ${
                currentView === 'blog'
                  ? 'text-rose-600 bg-rose-50'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Newspaper className="w-3.5 h-3.5 text-slate-500" />
              <span>Blog</span>
            </button>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2.5">
            {/* Study Streak Pill */}
            <div
              title={`${currentUser.streak || 7}-day study streak! Keep practicing daily.`}
              className="hidden md:flex items-center gap-1 px-2.5 py-1 bg-amber-50 border border-amber-200/80 rounded-full text-xs font-bold text-amber-800 cursor-default"
            >
              <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500 animate-pulse" />
              <span>{currentUser.streak || 7} Days</span>
            </div>

            {/* User Plan / Credits Badge */}
            <button
              onClick={() => setPricingModalOpen(true)}
              className={`px-2.5 py-1 rounded-full text-xs font-bold border transition flex items-center gap-1.5 ${
                isPro
                  ? 'bg-gradient-to-r from-amber-50 to-orange-50 border-amber-300 text-amber-900 hover:shadow-xs'
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {isPro ? (
                <>
                  <Crown className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
                  <span>PRO Unlimited</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3 h-3 text-orange-500" />
                  <span>Free ({currentUser.credits ?? 3} Credits)</span>
                  <span className="text-[10px] text-rose-600 font-extrabold underline ml-0.5">Upgrade</span>
                </>
              )}
            </button>

            {/* Profile / Account Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                onBlur={() => setTimeout(() => setProfileDropdownOpen(false), 200)}
                className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-200 transition"
              >
                <User className="w-4 h-4" />
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white border border-slate-200 shadow-xl py-2 z-50">
                  <div className="px-3 py-2 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-900 truncate">{currentUser.full_name}</p>
                    <p className="text-[10px] text-slate-500 truncate">{currentUser.email}</p>
                    <span className={`inline-block mt-1 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                      currentUser.role === 'admin'
                        ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                        : currentUser.role === 'teacher'
                        ? 'bg-amber-50 text-amber-800 border border-amber-200'
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}>
                      Role: {currentUser.role.toUpperCase()}
                    </span>
                  </div>

                  <button
                    onClick={() => handleNav('dashboard')}
                    className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>My Dashboard & Results</span>
                  </button>

                  <button
                    onClick={() => handleNav('admin')}
                    className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <Monitor className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Teacher / Admin Panel</span>
                  </button>

                  <div className="border-t border-slate-100 my-1"></div>

                  {/* Quick role fast-switcher */}
                  <div className="px-3 py-1 text-[10px] font-bold text-slate-400">
                    Switch Test Account:
                  </div>
                  <button
                    onClick={() => switchRole('student', 'free')}
                    className="w-full text-left px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-50 flex items-center justify-between"
                  >
                    <span>Student (Free)</span>
                    {currentUser.role === 'student' && !isPro && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                  </button>
                  <button
                    onClick={() => switchRole('student', 'pro')}
                    className="w-full text-left px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-50 flex items-center justify-between"
                  >
                    <span>Student (PRO)</span>
                    {currentUser.role === 'student' && isPro && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                  </button>
                  <button
                    onClick={() => switchRole('teacher', 'pro')}
                    className="w-full text-left px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-50 flex items-center justify-between"
                  >
                    <span>Teacher (Sensei)</span>
                    {currentUser.role === 'teacher' && <CheckCircle2 className="w-3 h-3 text-amber-600" />}
                  </button>
                  <button
                    onClick={() => switchRole('admin', 'pro')}
                    className="w-full text-left px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-50 flex items-center justify-between"
                  >
                    <span>Admin Master</span>
                    {currentUser.role === 'admin' && <CheckCircle2 className="w-3 h-3 text-indigo-600" />}
                  </button>

                  <div className="border-t border-slate-100 my-1"></div>

                  <button
                    onClick={() => logoutUser()}
                    className="w-full text-left px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>

            {/* Primary Action Button: Start Mock Test */}
            <button
              onClick={() => handleNav('mock-tests')}
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 active:scale-95 text-white rounded-xl text-xs font-bold shadow-md shadow-rose-600/20 transition"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Start Mock Test</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-slate-100 space-y-1 animate-in fade-in">
            <button
              onClick={() => handleNav('landing')}
              className="w-full text-left px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-lg"
            >
              Home
            </button>
            <button
              onClick={() => handleNav('mock-tests')}
              className="w-full text-left px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-lg flex items-center justify-between"
            >
              <span>Mock Tests (24+ Sets)</span>
              <span className="text-xs bg-rose-100 text-rose-700 font-bold px-2 py-0.5 rounded">All Tracks</span>
            </button>
            <button
              onClick={() => handleNav('tools')}
              className="w-full text-left px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-lg flex items-center justify-between"
            >
              <span>25 Japanese Tools</span>
              <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">100% Free</span>
            </button>
            <button
              onClick={() => handleNav('ai-speaking')}
              className="w-full text-left px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-lg"
            >
              AI Speaking & Interview Coach
            </button>
            <button
              onClick={() => handleNav('store')}
              className="w-full text-left px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-lg"
            >
              Digital Book Store
            </button>
            <button
              onClick={() => handleNav('institutes')}
              className="w-full text-left px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-lg"
            >
              For Language Academies & Institutes
            </button>
            <button
              onClick={() => handleNav('blog')}
              className="w-full text-left px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-lg"
            >
              Exam Guides & Blog
            </button>
            <div className="pt-2 border-t border-slate-100 flex gap-2">
              <button
                onClick={() => setAuthModalOpen(true)}
                className="flex-1 py-2 text-center text-xs font-bold text-slate-700 bg-slate-100 rounded-lg"
              >
                Sign In
              </button>
              <button
                onClick={() => handleNav('mock-tests')}
                className="flex-1 py-2 text-center text-xs font-bold text-white bg-rose-600 rounded-lg"
              >
                Launch CBT
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
