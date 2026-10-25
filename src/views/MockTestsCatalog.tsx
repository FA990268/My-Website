import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ExamCategory, MockTest } from '../types';
import {
  Monitor,
  Clock,
  Volume2,
  Image as ImageIcon,
  Award,
  Crown,
  Sparkles,
  ArrowRight,
  Filter,
  CheckCircle2,
  Lock,
  Search,
  Eye,
  Layers,
  ChevronRight
} from 'lucide-react';

export const MockTestsCatalog: React.FC = () => {
  const {
    mockTests,
    currentUser,
    startExam,
    navigateTo,
    viewParams,
    setPricingModalOpen,
    attempts
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<ExamCategory>(() => {
    if (viewParams.track && viewParams.track !== '') {
      return viewParams.track as ExamCategory;
    }
    return 'JFT Basic';
  });

  const [activeSubFilter, setActiveSubFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories: { label: string; value: ExamCategory; icon: string }[] = [
    { label: 'JFT-Basic Official', value: 'JFT Basic', icon: '⛩️' },
    { label: 'Irodori Books', value: 'Irodori Books', icon: '📖' },
    { label: 'SSW Care Worker', value: 'SSW Care Worker', icon: '🩺' },
    { label: 'SSW Food Service', value: 'SSW Food Service', icon: '🍳' },
    { label: 'SSW Construction', value: 'SSW Construction', icon: '🏗️' },
    { label: 'SSW Agriculture', value: 'SSW Agriculture', icon: '🌾' },
    { label: 'SSW Cleaning', value: 'SSW Building Cleaning', icon: '🧹' },
    { label: 'JLPT (N5 - N1)', value: 'JLPT Mock Tests', icon: '🎌' }
  ];

  const subFiltersMap: Record<ExamCategory, string[]> = {
    'JFT Basic': ['All', 'Standard JFT-Basic', 'JFT Basic IMP Sets', 'Signs & Notices', 'Past Questions'],
    'Irodori Books': ['All', 'Starter A1', 'Elementary 1 A2', 'Elementary 2 A2'],
    'SSW Care Worker': ['All', 'Nursing Skill', 'Care Workplace Japanese'],
    'SSW Food Service': ['All', 'Customer Service', 'Kitchen Hygiene'],
    'SSW Construction': ['All', 'Safety & Site Management'],
    'SSW Agriculture': ['All', 'Crop Farming'],
    'SSW Building Cleaning': ['All', 'Sanitation & Chemical Safety'],
    'JLPT Mock Tests': ['All', 'N5', 'N4', 'N3', 'N2', 'N1']
  };

  const isPro = currentUser.subscription_tier !== 'free';

  // Filter test cards
  const filteredTests = mockTests.filter(test => {
    if (test.category !== activeCategory) return false;
    if (activeSubFilter !== 'All' && test.subCategory !== activeSubFilter) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchTitle = test.title.toLowerCase().includes(q);
      const matchDesc = test.description?.toLowerCase().includes(q);
      const matchTag = test.tags?.some(t => t.toLowerCase().includes(q));
      if (!matchTitle && !matchDesc && !matchTag) return false;
    }
    return true;
  });

  const handleStartExam = (test: MockTest) => {
    if (test.is_pro && !isPro) {
      setPricingModalOpen(true);
      return;
    }
    startExam(test.id);
  };

  const handlePreviewDetails = (testId: string) => {
    navigateTo('preview', { testId });
  };

  // Find user's best score for a test
  const getBestScore = (testId: string) => {
    const userAttempts = attempts.filter(a => a.mock_test_id === testId && a.status === 'completed');
    if (userAttempts.length === 0) return null;
    const maxScore = Math.max(...userAttempts.map(a => a.total_score));
    const latestAttempt = userAttempts[0];
    return { score: maxScore, passed: latestAttempt.passed };
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Catalog Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl relative overflow-hidden">
          <div className="space-y-2 relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Exact Prometric Computer-Based Testing Software Simulation</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Official CBT Mock Tests Catalog
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Choose from 24+ full-length sets across JFT-Basic, Irodori, SSW 1号, and JLPT. Each test enforces the real 60-minute Prometric timer and 2-play audio rules.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row gap-3">
            <div className="bg-white/10 backdrop-blur rounded-2xl p-4 border border-white/15 text-center min-w-[120px]">
              <div className="text-2xl font-black text-rose-400">{mockTests.length}</div>
              <div className="text-[11px] font-bold text-slate-300">Available Sets</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-2xl p-4 border border-white/15 text-center min-w-[120px]">
              <div className="text-2xl font-black text-emerald-400">3 Sets</div>
              <div className="text-[11px] font-bold text-slate-300">100% Free Access</div>
            </div>
          </div>
        </div>

        {/* 7 Certification Track Tabs */}
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none w-full sm:w-auto">
              {categories.map(cat => (
                <button
                  key={cat.value}
                  onClick={() => {
                    setActiveCategory(cat.value);
                    setActiveSubFilter('All');
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-1.5 ${
                    activeCategory === cat.value
                      ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search mock sets or keywords..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-rose-500 shadow-2xs"
              />
            </div>
          </div>

          {/* Sub-Filters Pill Bar */}
          {subFiltersMap[activeCategory] && (
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1 mr-1">
                <Filter className="w-3 h-3" /> Filter:
              </span>
              {subFiltersMap[activeCategory].map(sub => (
                <button
                  key={sub}
                  onClick={() => setActiveSubFilter(sub)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                    activeSubFilter === sub
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-200/70 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Mock Test Cards Grid */}
        {filteredTests.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3">
            <div className="text-4xl">🔍</div>
            <h3 className="text-base font-extrabold text-slate-800">No mock tests found matching your filter</h3>
            <p className="text-xs text-slate-500">
              Try selecting another subcategory or clearing your search keywords.
            </p>
            <button
              onClick={() => {
                setActiveSubFilter('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTests.map(test => {
              const bestScoreInfo = getBestScore(test.id);
              const isLocked = test.is_pro && !isPro;

              return (
                <div
                  key={test.id}
                  className={`bg-white rounded-3xl border transition flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-md ${
                    test.is_pro ? 'border-amber-200/80' : 'border-slate-200'
                  }`}
                >
                  <div className="p-6 space-y-4">
                    {/* Top Badges */}
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1 ${
                          test.is_pro
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        }`}
                      >
                        {test.is_pro ? (
                          <>
                            <Crown className="w-3 h-3 text-amber-600 fill-amber-500" />
                            <span>Mock PRO</span>
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>Mock FREE</span>
                          </>
                        )}
                      </span>

                      {test.subCategory && (
                        <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-md truncate max-w-[140px]">
                          {test.subCategory}
                        </span>
                      )}
                    </div>

                    {/* Test Title & Description */}
                    <div className="space-y-1.5">
                      <h3 className="text-base font-extrabold text-slate-900 leading-snug line-clamp-2">
                        {test.title}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {test.description}
                      </p>
                    </div>

                    {/* Test Metadata Grid */}
                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                      <div className="flex items-center gap-1.5 font-medium">
                        <Layers className="w-3.5 h-3.5 text-slate-400" />
                        <span>{test.total_questions} Questions</span>
                      </div>
                      <div className="flex items-center gap-1.5 font-medium">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{test.duration_minutes} Mins Limit</span>
                      </div>
                      <div className="flex items-center gap-1.5 font-medium">
                        <Volume2 className="w-3.5 h-3.5 text-blue-500" />
                        <span>{test.audio_questions_count || 12} Audio Qs</span>
                      </div>
                      <div className="flex items-center gap-1.5 font-medium">
                        <ImageIcon className="w-3.5 h-3.5 text-amber-500" />
                        <span>{test.image_questions_count || 4} Signs/Images</span>
                      </div>
                    </div>

                    {/* Tags */}
                    {test.tags && test.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {test.tags.map((t, i) => (
                          <span
                            key={i}
                            className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Best Score Alert if attempted */}
                    {bestScoreInfo && (
                      <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs">
                        <span className="font-bold text-emerald-900">Your Best Result:</span>
                        <span className="font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                          {bestScoreInfo.score} / {test.max_score} ({bestScoreInfo.passed ? 'Passed ✓' : 'Retry'})
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card Action Buttons */}
                  <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handlePreviewDetails(test.id)}
                      className="px-3 py-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 flex-1 shadow-2xs"
                    >
                      <Eye className="w-3.5 h-3.5 text-slate-400" />
                      <span>Preview Details</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleStartExam(test)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 flex-1 shadow-md ${
                        isLocked
                          ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-amber-500/20'
                          : 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/20 active:scale-95'
                      }`}
                    >
                      {isLocked ? (
                        <>
                          <Lock className="w-3.5 h-3.5" />
                          <span>Unlock PRO</span>
                        </>
                      ) : (
                        <>
                          <span>Start CBT Exam</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
