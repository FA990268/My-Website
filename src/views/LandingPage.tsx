import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { INITIAL_BLOG_ARTICLES, BlogPost } from '../lib/blogData';
import { VisualElement } from '../components/VisualElement';
import {
  Monitor,
  Play,
  Clock,
  Volume2,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Star,
  Users,
  ChevronRight,
  HelpCircle,
  BookOpen,
  Mic,
  Award,
  Layers,
  BarChart3,
  Check,
  Calendar,
  AlertCircle
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const {
    navigateTo,
    setVideoDemoModalOpen,
    setPricingModalOpen,
    themeConfig,
    getOrderedElements
  } = useApp();

  // Interactive Live Exam Preview Card State
  const [selectedOption, setSelectedOption] = useState<number | null>(0); // Default A selected
  const [miniTimerSeconds, setMiniTimerSeconds] = useState<number>(3570); // 59:30
  const [activeQuestionStep, setActiveQuestionStep] = useState<number>(1);
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState<number>(0);
  const [activeFaqIdx, setActiveFaqIdx] = useState<number | null>(0);
  const [selectedArticleModal, setSelectedArticleModal] = useState<BlogPost | null>(null);

  // Ticking mini-timer simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setMiniTimerSeconds(prev => (prev > 0 ? prev - 1 : 3599));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const previewQuestions = [
    {
      num: 1,
      kanjiText: '毎月[まいつき] 25日[にち]までに、へやの やちんを（  ）なければ なりません。',
      plainText: '毎月 25日までに、へやの やちんを（  ）なければ なりません。',
      meaningEn: 'Must pay room rent by the 25th of every month.',
      options: [
        { label: 'A', text: 'はらわ', isCorrect: true },
        { label: 'B', text: 'ひろわ', isCorrect: false },
        { label: 'C', text: 'てつだわ', isCorrect: false },
        { label: 'D', text: 'もらわ', isCorrect: false }
      ]
    },
    {
      num: 2,
      kanjiText: 'すみませんが、この 荷物[にもつ]を 受付[うけつけ]まで（  ）ください。',
      plainText: 'すみませんが、この 荷物を 受付まで（  ）ください。',
      meaningEn: 'Excuse me, but please carry this luggage to the reception counter.',
      options: [
        { label: 'A', text: 'はこんで', isCorrect: true },
        { label: 'B', text: 'あそんで', isCorrect: false },
        { label: 'C', text: 'のんで', isCorrect: false },
        { label: 'D', text: 'やすんで', isCorrect: false }
      ]
    }
  ];

  const currentPreviewQ = previewQuestions[activeQuestionStep - 1] || previewQuestions[0];

  const testimonials = [
    {
      name: 'Rohan Thapa',
      country: 'Nepal',
      target: 'SSW Caregiver (Kaigo)',
      score: '228 / 250 (Passed!)',
      text: 'I failed my first JFT exam in Kathmandu because the Prometric computer screen and ticking clock made me panic. Dai Ichi Academy CBT’s exact timer and 2-play audio player gave me the exact confidence I needed. Passed with 228 points on my second try!',
      avatar: '👨🏽'
    },
    {
      name: 'Siti Rahmawati',
      country: 'Indonesia',
      target: 'SSW Food Service',
      score: '236 / 250 (Passed!)',
      text: 'The AI Speaking coach helped me practice hospitality Keigo before my interview with a Japanese restaurant group. The Weak Point analysis pinpointed my particle mistakes right away.',
      avatar: '🧕🏽'
    },
    {
      name: 'Carlos Mendoza',
      country: 'Philippines',
      target: 'SSW Construction',
      score: '215 / 250 (Passed!)',
      text: 'Section 4 workplace notices and signs were identical in structure to what I faced in the actual Prometric test center in Manila. 100% recommended for every SSW candidate.',
      avatar: '👨🏻'
    }
  ];

  const faqs = [
    {
      q: 'What is the passing score for the JFT-Basic exam?',
      a: 'The JFT-Basic scaled score ranges from 10 to 250 points. A scaled score of 200 points or higher is required to pass and qualify for the Specified Skilled Worker (SSW Tokutei技能 1号) residency status.'
    },
    {
      q: 'How does Dai Ichi Academy CBT replicate the Prometric CBT interface?',
      a: 'The platform is engineered to mirror the exact Prometric testing software: 60-minute continuous countdown timer, 4 sequential sections (Script/Vocab, Conversation, Listening, Reading), permanent one-way section locking, and a strict 2-play maximum audio limit counter in the listening section.'
    },
    {
      q: 'Are the mock tests free?',
      a: 'Yes! We offer 3 Full-Length Mock Tests completely free forever, along with free access to all 25 Japanese Learning Tools and daily AI speaking practice. If you need all 114+ mock sets and advanced analytics, you can upgrade to the PRO tier for just $4.99/month.'
    },
    {
      q: 'Can I practice on my smartphone or tablet?',
      a: 'Yes, Dai Ichi Academy CBT is fully responsive and optimized for mobile, tablet, and desktop. However, to best prepare for Prometric test center conditions, we strongly recommend practicing on a desktop or laptop computer with headphones.'
    },
    {
      q: 'How does the AI Speaking & Interview Coach work?',
      a: 'Using modern Web Speech recognition and Japanese speech synthesis, our AI Sensei simulates realistic workplace conversations and job interview questions. It evaluates pronunciation accuracy, grammar naturalness, and provides immediate native feedback.'
    }
  ];

  const defaultSectionIds = [
    'hero_section',
    'stats_banner_section',
    'sections_breakdown_section',
    'features_bento_section',
    'pricing_section',
    'testimonials_section',
    'faq_section',
    'blog_preview_section'
  ];

  const orderedSections = getOrderedElements('landing_page_sections', defaultSectionIds);

  return (
    <div className="font-sans text-slate-100 space-y-6 sm:space-y-10 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto py-6">
      {orderedSections.map(secId => {
        if (secId === 'hero_section') {
          return (
            <VisualElement
              key={secId}
              id="hero_section"
              containerId="landing_page_sections"
              label="Hero Banner & CBT Preview"
            >
              <section className="relative overflow-hidden p-6 sm:p-10 lg:p-12 rounded-[2.25rem] glass-panel">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(225,29,72,0.15),rgba(0,0,0,0))] pointer-events-none" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
                  {/* Left Column: Headline & CTAs */}
                  <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                    {/* Top Pill Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-white/15 text-white border border-white/30 backdrop-blur shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
                      <span>{themeConfig.instituteTitle} • {themeConfig.instituteSlogan}</span>
                    </div>

                    {/* Headline */}
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15]">
                      {themeConfig.instituteName} — <br className="hidden sm:inline" />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-white to-amber-200">
                        {themeConfig.instituteTitle}
                      </span>
                    </h1>

                    {/* Subheadline */}
                    <p className="text-sm sm:text-base text-white/90 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                      <strong>{themeConfig.instituteSlogan}</strong>. Experience the real Prometric CBT exam environment before your test day in Khulna. Comprehensive preparation for <strong>JFT-Basic</strong>, <strong>Specified Skilled Worker (SSW Tokutei技能 1号)</strong>, and <strong>JLPT N5–N1</strong>.
                    </p>

                    {/* CTA Buttons — Transparent Capsules */}
                    <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3.5">
                      <button
                        onClick={() => navigateTo('mock-tests')}
                        className="px-7 py-3.5 glass-btn-primary rounded-full text-sm font-black shadow-lg flex items-center gap-2 transition"
                      >
                        <Monitor className="w-4 h-4" />
                        <span>Try Mock Test (Free)</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => setVideoDemoModalOpen(true)}
                        className="px-6 py-3.5 bg-white/15 hover:bg-white/25 border border-white/35 text-white rounded-full text-sm font-bold shadow-sm backdrop-blur flex items-center gap-2 transition"
                      >
                        <Play className="w-4 h-4 text-rose-300 fill-rose-300" />
                        <span>Watch CBT Demo</span>
                      </button>
                    </div>

                    {/* Key Trust Signals */}
                    <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-white/80">
                      <div className="flex items-center gap-1.5 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                        <span>Exact 60:00 Timer</span>
                      </div>
                      <div className="flex items-center gap-1.5 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                        <span>2-Play Audio Rule</span>
                      </div>
                      <div className="flex items-center gap-1.5 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                        <span>Instant 250 Score Card</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Live Interactive Exam Preview Card */}
                  <div className="lg:col-span-5 relative">
                    <div className="relative mx-auto max-w-md w-full">
                      {/* Floating Passed Badge */}
                      <div className="absolute -top-3.5 -right-3.5 z-20 bg-emerald-400/90 text-slate-950 font-black px-4 py-1.5 rounded-full text-xs shadow-xl flex items-center gap-1.5 animate-bounce border border-white/40 backdrop-blur">
                        <Award className="w-3.5 h-3.5" />
                        <span>Status: Passed (215/250)</span>
                      </div>

                      {/* Simulated Prometric Exam Widget */}
                      <div className="rounded-[2rem] glass-panel overflow-hidden font-sans">
                        {/* Top Exam Header */}
                        <div className="bg-white/10 text-white px-4 py-3 flex items-center justify-between text-xs border-b border-white/15 backdrop-blur">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                            <span className="font-bold">Prometric CBT Live Simulation</span>
                          </div>
                          <div className="flex items-center gap-1.5 bg-black/40 px-3 py-1 rounded-full text-rose-300 font-mono font-bold border border-white/20">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{formatTimer(miniTimerSeconds)}</span>
                          </div>
                        </div>

                        {/* Section & Question Indicator */}
                        <div className="bg-white/5 border-b border-white/10 px-4 py-2 flex items-center justify-between text-xs text-slate-300">
                          <span className="font-bold text-white">
                            Section 1: 文字と語彙 (Script & Vocab)
                          </span>
                          <span className="font-bold text-rose-300 bg-rose-500/20 px-2.5 py-0.5 rounded-full border border-rose-500/30">
                            Question {currentPreviewQ.num}/48
                          </span>
                        </div>

                        {/* Stimulus & Question Area */}
                        <div className="p-5 space-y-4">
                          <div className="p-3.5 bg-white/5 border border-white/10 rounded-2xl space-y-1">
                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                              つぎの ぶんの（  ）に 何を 入れますか。
                            </p>
                            <p className="text-sm font-semibold text-white leading-relaxed font-japanese">
                              {currentPreviewQ.plainText}
                            </p>
                            <p className="text-[10px] text-slate-400 italic">
                              "{currentPreviewQ.meaningEn}"
                            </p>
                          </div>

                          {/* 4 Clickable Options */}
                          <div className="space-y-2">
                            {currentPreviewQ.options.map((opt, idx) => (
                              <button
                                key={idx}
                                type="button"
                                onClick={() => setSelectedOption(idx)}
                                className={`w-full text-left p-2.5 rounded-2xl text-xs font-semibold border transition flex items-center justify-between ${
                                  selectedOption === idx
                                    ? opt.isCorrect
                                      ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200 shadow-sm'
                                      : 'bg-rose-500/20 border-rose-400 text-rose-200'
                                    : 'bg-white/5 border-white/10 hover:bg-white/10 text-slate-200'
                                }`}
                              >
                                <div className="flex items-center gap-2.5">
                                  <span
                                    className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${
                                      selectedOption === idx
                                        ? opt.isCorrect
                                          ? 'bg-emerald-500 text-slate-950 font-black'
                                          : 'bg-rose-600 text-white font-black'
                                        : 'bg-white/10 text-slate-300'
                                    }`}
                                  >
                                    {opt.label}
                                  </span>
                                  <span className="font-japanese text-sm">{opt.text}</span>
                                </div>
                                {selectedOption === idx && opt.isCorrect && (
                                  <span className="text-[10px] text-emerald-300 font-bold bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-500/30">
                                    ✓ Correct (はらわなければなりません)
                                  </span>
                                )}
                              </button>
                            ))}
                          </div>

                          {/* Next Question / Launch Button */}
                          <div className="pt-2 flex items-center justify-between">
                            <button
                              onClick={() => {
                                setActiveQuestionStep(prev => (prev === 1 ? 2 : 1));
                                setSelectedOption(0);
                              }}
                              className="text-xs font-bold text-slate-300 hover:text-white px-3 py-1.5 rounded-full hover:bg-white/10 transition"
                            >
                              Next Sample Q →
                            </button>

                            <button
                              onClick={() => navigateTo('mock-tests')}
                              className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-full text-xs font-bold shadow-md shadow-rose-600/30 transition flex items-center gap-1.5"
                            >
                              <span>Start Real CBT Test</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </VisualElement>
          );
        }

        if (secId === 'stats_banner_section') {
          return (
            <VisualElement
              key={secId}
              id="stats_banner_section"
              containerId="landing_page_sections"
              label="CBT Statistics Banner"
            >
              <section className="p-6 sm:p-10 rounded-[2.25rem] glass-panel">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7 space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-rose-300">
                      The Real Challenge Candidates Face
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                      Why Do 40% of Prepared Candidates Fail the JFT-Basic?
                    </h2>
                    <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
                      Most students fail not because their Japanese grammar is weak, but because they have never experienced the <strong>stress of the Computer-Based Testing (CBT) environment</strong>.
                    </p>
                    <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
                      At Prometric test centers, you cannot flip pages freely, audio plays exactly twice, and once you submit a section, it is locked forever. Our CBT simulation eliminates test-day panic through 100% realistic practice.
                    </p>
                  </div>

                  <div className="lg:col-span-5 grid grid-cols-2 gap-4">
                    <div className="bg-white/10 border border-white/20 rounded-2xl p-5 text-center space-y-1 backdrop-blur shadow-sm">
                      <div className="text-2xl sm:text-3xl font-black text-rose-300">250 pts</div>
                      <div className="text-xs font-bold text-white">Total Points</div>
                      <div className="text-[10px] text-white/70">200 Points to Pass</div>
                    </div>

                    <div className="bg-white/10 border border-white/20 rounded-2xl p-5 text-center space-y-1 backdrop-blur shadow-sm">
                      <div className="text-2xl sm:text-3xl font-black text-amber-300">60 mins</div>
                      <div className="text-xs font-bold text-white">Exam Duration</div>
                      <div className="text-[10px] text-white/70">48 Questions Paced</div>
                    </div>

                    <div className="bg-white/10 border border-white/20 rounded-2xl p-5 text-center space-y-1 backdrop-blur shadow-sm">
                      <div className="text-2xl sm:text-3xl font-black text-emerald-300">92%</div>
                      <div className="text-xs font-bold text-white">Pass Rate</div>
                      <div className="text-[10px] text-white/70">Dai Ichi Active Students</div>
                    </div>

                    <div className="bg-white/10 border border-white/20 rounded-2xl p-5 text-center space-y-1 backdrop-blur shadow-sm">
                      <div className="text-2xl sm:text-3xl font-black text-blue-300">100%</div>
                      <div className="text-xs font-bold text-white">Real CBT Replica</div>
                      <div className="text-[10px] text-white/70">Exact Prometric Layout</div>
                    </div>
                  </div>
                </div>
              </section>
            </VisualElement>
          );
        }

        if (secId === 'sections_breakdown_section') {
          return (
            <VisualElement
              key={secId}
              id="sections_breakdown_section"
              containerId="landing_page_sections"
              label="4 JFT Sections Breakdown"
            >
              <section className="p-6 sm:p-10 rounded-[2.25rem] glass-panel space-y-8">
                <div className="text-center max-w-2xl mx-auto space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-300">
                    Exam Structure Breakdown
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    Master All 4 Sections of the JFT-Basic
                  </h2>
                  <p className="text-xs sm:text-sm text-white/85">
                    The test consists of 4 sequential sections totaling 48 questions (12 questions each).
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Section 1 */}
                  <div className="bg-white/10 border border-white/25 hover:border-white/50 rounded-3xl p-6 space-y-4 shadow-sm transition hover:shadow-xl backdrop-blur">
                    <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-300 flex items-center justify-center text-xl font-bold border border-rose-500/30">
                      📝
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-white/70">Section 1 • 12 Questions</span>
                      <h3 className="text-lg font-black text-white">Script & Vocabulary</h3>
                      <p className="text-xs text-rose-200 font-japanese font-medium">文字と語彙 (もじとごい)</p>
                    </div>
                    <p className="text-xs text-white/80 leading-relaxed">
                      Tests Kanji readings, word meaning from context, and daily vocabulary for apartments, shops, and workplace shifts.
                    </p>
                    <div className="pt-2 border-t border-white/15 flex items-center justify-between text-[11px] font-bold">
                      <span className="text-white/70">Pass Benchmark</span>
                      <span className="text-emerald-300">80%+ Target</span>
                    </div>
                  </div>

                  {/* Section 2 */}
                  <div className="bg-white/10 border border-white/25 hover:border-white/50 rounded-3xl p-6 space-y-4 shadow-sm transition hover:shadow-xl backdrop-blur">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-300 flex items-center justify-center text-xl font-bold border border-amber-500/30">
                      💬
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-white/70">Section 2 • 12 Questions</span>
                      <h3 className="text-lg font-black text-white">Conversation & Expression</h3>
                      <p className="text-xs text-amber-200 font-japanese font-medium">会話と表現 (かいわとひょうげん)</p>
                    </div>
                    <p className="text-xs text-white/80 leading-relaxed">
                      Tests practical daily and workplace greetings, asking permission, giving instructions, and polite refusal phrases.
                    </p>
                    <div className="pt-2 border-t border-white/15 flex items-center justify-between text-[11px] font-bold">
                      <span className="text-white/70">Pass Benchmark</span>
                      <span className="text-emerald-300">80%+ Target</span>
                    </div>
                  </div>

                  {/* Section 3 */}
                  <div className="bg-white/10 border border-white/25 hover:border-white/50 rounded-3xl p-6 space-y-4 shadow-sm transition hover:shadow-xl backdrop-blur">
                    <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-300 flex items-center justify-center text-xl font-bold border border-blue-500/30">
                      🎧
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-white/70">Section 3 • 12 Questions</span>
                      <h3 className="text-lg font-black text-white">Listening Comprehension</h3>
                      <p className="text-xs text-blue-200 font-japanese font-medium">聴解 (ちょうかい)</p>
                    </div>
                    <p className="text-xs text-white/80 leading-relaxed">
                      Natural-speed audio dialogues, train broadcasts, hospital instructions, and shop announcements. Enforces the strict 2-play limit.
                    </p>
                    <div className="pt-2 border-t border-white/15 flex items-center justify-between text-[11px] font-bold">
                      <span className="text-white/70">Audio Play Limit</span>
                      <span className="text-rose-300">Max 2 Plays</span>
                    </div>
                  </div>

                  {/* Section 4 */}
                  <div className="bg-white/10 border border-white/25 hover:border-white/50 rounded-3xl p-6 space-y-4 shadow-sm transition hover:shadow-xl backdrop-blur">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-xl font-bold border border-emerald-500/30">
                      📄
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-white/70">Section 4 • 12 Questions</span>
                      <h3 className="text-lg font-black text-white">Reading Comprehension</h3>
                      <p className="text-xs text-emerald-200 font-japanese font-medium">読解 (どっかい)</p>
                    </div>
                    <p className="text-xs text-white/80 leading-relaxed">
                      Real-world stimulus reading: Japanese train station signboards, hospital clinic hours, trash sorting memos, and workplace safety rules.
                    </p>
                    <div className="pt-2 border-t border-white/15 flex items-center justify-between text-[11px] font-bold">
                      <span className="text-white/70">Visual Stimulus</span>
                      <span className="text-emerald-300">Signs & Memos</span>
                    </div>
                  </div>
                </div>
              </section>
            </VisualElement>
          );
        }

        if (secId === 'features_bento_section') {
          return (
            <VisualElement
              key={secId}
              id="features_bento_section"
              containerId="landing_page_sections"
              label="Complete Prep Suite Bento Grid"
            >
              <section className="p-6 sm:p-10 rounded-[2.25rem] glass-panel space-y-8">
                <div className="text-center max-w-2xl mx-auto space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-300">
                    Complete Prep Suite
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    Everything You Need to Pass the First Time
                  </h2>
                  <p className="text-xs sm:text-sm text-white/85">
                    A comprehensive ecosystem engineered specifically for JFT, SSW, and JLPT aspirants.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Bento Card 1: Question Repository */}
                  <div className="md:col-span-2 bg-gradient-to-br from-white/15 via-white/10 to-rose-950/20 text-white rounded-3xl p-8 flex flex-col justify-between space-y-6 shadow-xl border border-white/25 backdrop-blur">
                    <div className="space-y-3">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-white border border-white/30 backdrop-blur">
                        <Layers className="w-3.5 h-3.5" />
                        <span>Vast Question Repository</span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
                        5,297+ Questions & 114 Full Mock Sets
                      </h3>
                      <p className="text-xs sm:text-sm text-white/85 max-w-lg leading-relaxed">
                        Covering all major tracks: JFT-Basic Standard, Irodori A1/A2, SSW Care Worker (Kaigo), SSW Food Service, SSW Construction, SSW Agriculture, and JLPT N5–N1.
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/15">
                      <div>
                        <div className="text-xl sm:text-2xl font-black text-rose-300">114+</div>
                        <div className="text-[11px] text-white/70">Full CBT Mock Sets</div>
                      </div>
                      <div>
                        <div className="text-xl sm:text-2xl font-black text-amber-300">1,368+</div>
                        <div className="text-[11px] text-white/70">Audio Dialogues</div>
                      </div>
                      <div>
                        <div className="text-xl sm:text-2xl font-black text-emerald-300">450+</div>
                        <div className="text-[11px] text-white/70">Workplace Signs</div>
                      </div>
                    </div>
                  </div>

                  {/* Bento Card 2: Automated Weak Point Analysis */}
                  <div className="bg-white/10 border border-white/25 rounded-3xl p-8 space-y-4 shadow-sm flex flex-col justify-between backdrop-blur">
                    <div className="space-y-3">
                      <div className="w-10 h-10 rounded-2xl bg-blue-500/20 text-blue-300 flex items-center justify-center border border-blue-500/30">
                        <BarChart3 className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-black text-white tracking-tight">
                        Automated Weak Point Analysis
                      </h3>
                      <p className="text-xs text-white/85 leading-relaxed">
                        Our diagnostic engine scans your wrong answers to identify exact weaknesses in particles (助詞), keigo, or rapid listening broadcasts.
                      </p>
                    </div>
                    <div className="p-3 bg-black/30 rounded-2xl border border-white/15 space-y-2 backdrop-blur">
                      <div className="flex justify-between text-xs font-bold text-white">
                        <span>Listening Accuracy</span>
                        <span className="text-rose-300">62% (Needs Review)</span>
                      </div>
                      <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
                        <div className="bg-rose-500 h-full w-[62%]" />
                      </div>
                    </div>
                  </div>

                  {/* Bento Card 3: 25 Japanese Tools */}
                  <div className="bg-white/10 border border-white/25 rounded-3xl p-8 space-y-4 shadow-sm flex flex-col justify-between backdrop-blur">
                    <div className="space-y-3">
                      <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center border border-indigo-500/30">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-black text-white tracking-tight">
                        25 Free Japanese Tools
                      </h3>
                      <p className="text-xs text-white/85 leading-relaxed">
                        Hiragana/Katakana charts with TTS, Romaji converter, Verb Conjugator, Counter words guide, Japan Salary calculator, and Visa checker.
                      </p>
                    </div>
                    <button
                      onClick={() => navigateTo('tools')}
                      className="text-xs font-bold text-rose-300 hover:text-white flex items-center gap-1 transition"
                    >
                      <span>Explore all 25 Free Tools</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Bento Card 4: AI Sensei Speaking Coach */}
                  <div className="md:col-span-2 bg-gradient-to-r from-rose-950/30 via-amber-950/20 to-white/10 border border-white/25 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl backdrop-blur">
                    <div className="space-y-3 max-w-md">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-white border border-white/30 backdrop-blur shadow-sm">
                        <Mic className="w-3.5 h-3.5" />
                        <span>Voice AI Simulator</span>
                      </div>
                      <h3 className="text-2xl font-black text-white tracking-tight">
                        AI Sensei Interview & Speaking Coach
                      </h3>
                      <p className="text-xs text-white/85 leading-relaxed">
                        Practice spoken Japanese before your Japanese employer interview. Get instant feedback on pronunciation accuracy (%) and polite Keigo responses.
                      </p>
                      <button
                        onClick={() => navigateTo('ai-speaking')}
                        className="px-5 py-2.5 glass-btn-primary rounded-full text-xs font-bold transition flex items-center gap-2 shadow-lg"
                      >
                        <span>Practice with AI Sensei Now</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="w-32 h-32 rounded-full glass-circle-lens flex items-center justify-center text-6xl shadow-xl shrink-0">
                      👨🏻‍🏫
                    </div>
                  </div>
                </div>
              </section>
            </VisualElement>
          );
        }

        if (secId === 'pricing_section') {
          return (
            <VisualElement
              key={secId}
              id="pricing_section"
              containerId="landing_page_sections"
              label="Pricing & Plans"
            >
              <section className="p-6 sm:p-10 rounded-[2.25rem] glass-panel space-y-8">
                <div className="text-center max-w-2xl mx-auto space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-300">
                    Affordable Study Packages
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    Flexible Plans for Your Exam Prep
                  </h2>
                  <p className="text-xs sm:text-sm text-white/85">
                    Start with 3 free mock tests today. Upgrade when you need full question bank access.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Starter Free */}
                  <div className="bg-white/10 border border-white/25 rounded-3xl p-6 flex flex-col justify-between space-y-4 backdrop-blur shadow-sm">
                    <div>
                      <span className="text-xs font-bold text-white/70 uppercase tracking-wider">Free Forever</span>
                      <h3 className="text-xl font-black text-white mt-1">Starter Free</h3>
                      <div className="mt-2 text-3xl font-black text-white">$0</div>
                      <p className="text-xs text-white/80 mt-2">
                        Test your baseline skills under CBT conditions.
                      </p>
                      <ul className="mt-4 space-y-2 text-xs text-white/80">
                        <li className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-300" />
                          <span>3 Full CBT Mock Tests Free</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-300" />
                          <span>5 min Daily AI Speaking</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-300" />
                          <span>All 25 Japanese Tools Free</span>
                        </li>
                      </ul>
                    </div>
                    <button
                      onClick={() => navigateTo('mock-tests')}
                      className="w-full py-2.5 bg-white/15 hover:bg-white/25 text-white rounded-full text-xs font-bold transition border border-white/30 backdrop-blur"
                    >
                      Start Free Mock Tests
                    </button>
                  </div>

                  {/* Monthly Pass (Most Popular) */}
                  <div className="bg-gradient-to-b from-rose-500/25 to-white/10 border-2 border-rose-300/80 rounded-3xl p-6 flex flex-col justify-between space-y-4 relative shadow-2xl backdrop-blur">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-rose-500 text-white text-[10px] font-black uppercase tracking-wider px-3 py-0.5 rounded-full border border-white/30 shadow-md">
                      Most Popular
                    </div>
                    <div>
                      <span className="text-xs font-bold text-rose-300 uppercase tracking-wider">Unlimited Monthly</span>
                      <h3 className="text-xl font-black text-white mt-1">Monthly Pass</h3>
                      <div className="mt-2 text-3xl font-black text-white">$4.99 <span className="text-xs text-white/70 font-normal">/mo</span></div>
                      <p className="text-xs text-white/80 mt-2">
                        The complete package for candidates testing this month.
                      </p>
                      <ul className="mt-4 space-y-2 text-xs text-white/90 font-medium">
                        <li className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-rose-300" />
                          <span>All 114+ Mock Sets Unlocked</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-rose-300" />
                          <span>Unlimited AI Speaking Coach</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-rose-300" />
                          <span>Weak Point Diagnostics</span>
                        </li>
                      </ul>
                    </div>
                    <button
                      onClick={() => setPricingModalOpen(true)}
                      className="w-full py-2.5 glass-btn-primary rounded-full text-xs font-bold shadow-lg transition"
                    >
                      Upgrade to PRO ($4.99)
                    </button>
                  </div>

                  {/* Trial Pass */}
                  <div className="bg-white/10 border border-white/25 rounded-3xl p-6 flex flex-col justify-between space-y-4 backdrop-blur shadow-sm">
                    <div>
                      <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">Single Use</span>
                      <h3 className="text-xl font-black text-white mt-1">Trial Pass</h3>
                      <div className="mt-2 text-3xl font-black text-white">$1.99</div>
                      <p className="text-xs text-white/80 mt-2">
                        For last-minute practice right before exam day.
                      </p>
                      <ul className="mt-4 space-y-2 text-xs text-white/80">
                        <li className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-300" />
                          <span>5 Extra Mock Test Credits</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-300" />
                          <span>Access to Paid V.IMP Sets</span>
                        </li>
                      </ul>
                    </div>
                    <button
                      onClick={() => setPricingModalOpen(true)}
                      className="w-full py-2.5 bg-white/15 hover:bg-white/25 text-white rounded-full text-xs font-bold transition border border-white/30 backdrop-blur"
                    >
                      Get Trial ($1.99)
                    </button>
                  </div>

                  {/* Confidence 3-Mo */}
                  <div className="bg-white/10 border border-white/25 rounded-3xl p-6 flex flex-col justify-between space-y-4 backdrop-blur shadow-sm">
                    <div>
                      <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">Best Value</span>
                      <h3 className="text-xl font-black text-white mt-1">Confidence 3-Mo</h3>
                      <div className="mt-2 text-3xl font-black text-white">$11.99 <span className="text-xs text-white/70 font-normal">/3 mos</span></div>
                      <p className="text-xs text-white/80 mt-2">
                        Just $3.99/mo for complete 90-day peace of mind.
                      </p>
                      <ul className="mt-4 space-y-2 text-xs text-white/80">
                        <li className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-300" />
                          <span>90 Days Unlimited CBT Exams</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-300" />
                          <span>Pass Guarantee Extension</span>
                        </li>
                      </ul>
                    </div>
                    <button
                      onClick={() => setPricingModalOpen(true)}
                      className="w-full py-2.5 bg-white/15 hover:bg-white/25 text-white rounded-full text-xs font-bold transition border border-white/30 backdrop-blur"
                    >
                      Get 3 Months ($11.99)
                    </button>
                  </div>
                </div>
              </section>
            </VisualElement>
          );
        }

        if (secId === 'testimonials_section') {
          return (
            <VisualElement
              key={secId}
              id="testimonials_section"
              containerId="landing_page_sections"
              label="Student Testimonials"
            >
              <section className="p-6 sm:p-10 rounded-[2.25rem] glass-panel text-center space-y-8">
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-300">
                    Candidate Success Stories
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    Trusted by 30,000+ Students Worldwide
                  </h2>
                </div>

                <div className="bg-white/10 border border-white/25 rounded-3xl p-8 sm:p-10 relative shadow-sm max-w-3xl mx-auto backdrop-blur">
                  <div className="text-4xl mb-4">{testimonials[activeTestimonialIdx].avatar}</div>
                  <p className="text-sm sm:text-base text-white/90 italic leading-relaxed max-w-2xl mx-auto">
                    "{testimonials[activeTestimonialIdx].text}"
                  </p>
                  <div className="mt-6 space-y-1">
                    <h4 className="font-extrabold text-white">{testimonials[activeTestimonialIdx].name}</h4>
                    <p className="text-xs text-white/70">
                      {testimonials[activeTestimonialIdx].country} • Target: {testimonials[activeTestimonialIdx].target}
                    </p>
                    <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs mt-1 border border-emerald-500/30">
                      {testimonials[activeTestimonialIdx].score}
                    </span>
                  </div>

                  {/* Carousel navigation dots */}
                  <div className="flex justify-center items-center gap-2 mt-6">
                    {testimonials.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveTestimonialIdx(idx)}
                        className={`h-2 rounded-full transition-all ${
                          idx === activeTestimonialIdx ? 'w-6 bg-white' : 'w-2 bg-white/30'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </section>
            </VisualElement>
          );
        }

        if (secId === 'faq_section') {
          return (
            <VisualElement
              key={secId}
              id="faq_section"
              containerId="landing_page_sections"
              label="Frequently Asked Questions"
            >
              <section className="p-6 sm:p-10 rounded-[2.25rem] glass-panel space-y-8 max-w-4xl mx-auto">
                <div className="text-center space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-300">
                    Frequently Asked Questions
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    Common Questions About JFT-Basic CBT
                  </h2>
                </div>

                <div className="space-y-3">
                  {faqs.map((faq, idx) => (
                    <div
                      key={idx}
                      className="border border-white/20 rounded-2xl overflow-hidden transition bg-white/10 backdrop-blur"
                    >
                      <button
                        type="button"
                        onClick={() => setActiveFaqIdx(activeFaqIdx === idx ? null : idx)}
                        className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-white/15 transition"
                      >
                        <span className="text-xs sm:text-sm font-bold text-white">
                          {faq.q}
                        </span>
                        <span className="text-rose-300 font-extrabold text-lg">
                          {activeFaqIdx === idx ? '−' : '+'}
                        </span>
                      </button>
                      {activeFaqIdx === idx && (
                        <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-white/85 leading-relaxed border-t border-white/15 animate-in fade-in">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            </VisualElement>
          );
        }

        if (secId === 'blog_preview_section') {
          return (
            <VisualElement
              key={secId}
              id="blog_preview_section"
              containerId="landing_page_sections"
              label="Latest Exam Guides Blog"
            >
              <section className="p-6 sm:p-10 rounded-[2.25rem] glass-panel space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-rose-300">
                      Exam Guides & Strategy
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
                      Latest from the {themeConfig.instituteTitle} Blog
                    </h2>
                  </div>
                  <button
                    onClick={() => navigateTo('blog')}
                    className="text-xs font-bold text-rose-300 hover:text-white flex items-center gap-1 transition"
                  >
                    <span>View all articles</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {INITIAL_BLOG_ARTICLES.map(article => (
                    <div
                      key={article.id}
                      onClick={() => setSelectedArticleModal(article)}
                      className="bg-white/10 border border-white/25 hover:border-white/50 rounded-3xl p-6 space-y-4 shadow-sm hover:shadow-xl transition cursor-pointer flex flex-col justify-between group backdrop-blur"
                    >
                      <div className="space-y-3">
                        <div className={`h-36 rounded-2xl bg-gradient-to-tr ${article.imageGradient} flex items-center justify-center p-4 text-white text-center shadow-inner border border-white/20`}>
                          <span className="font-extrabold text-sm line-clamp-2">{article.title}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-bold text-white/70">
                          <span>{article.category}</span>
                          <span>•</span>
                          <span>{article.readTime}</span>
                        </div>
                        <h3 className="text-base font-extrabold text-white group-hover:text-rose-300 transition leading-snug line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-xs text-white/80 line-clamp-3 leading-relaxed">
                          {article.summary}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-white/15 flex items-center justify-between text-xs font-bold text-rose-300 group-hover:text-white transition">
                        <span>Read Full Guide</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </VisualElement>
          );
        }

        return null;
      })}

      {/* Article Read Modal */}
      {selectedArticleModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel text-white rounded-[2.25rem] max-w-2xl w-full p-6 sm:p-8 space-y-5 shadow-2xl animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/15 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-300">
                {selectedArticleModal.category} • {selectedArticleModal.readTime}
              </span>
              <button
                onClick={() => setSelectedArticleModal(null)}
                className="w-7 h-7 rounded-full bg-white/15 text-white/80 hover:text-white flex items-center justify-center text-xs font-bold transition border border-white/20"
              >
                ✕
              </button>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
              {selectedArticleModal.title}
            </h2>

            <div className="p-4 bg-rose-500/20 border border-rose-400/40 rounded-2xl space-y-2 backdrop-blur">
              <div className="text-xs font-bold text-rose-200">Key Takeaways:</div>
              <ul className="space-y-1 text-xs text-white/90 list-disc list-inside">
                {selectedArticleModal.keyTakeaways.map((k, i) => (
                  <li key={i}>{k}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-white/85 leading-relaxed">
              {selectedArticleModal.contentParagraphs.map((p, i) => (
                <div key={i} className="space-y-1.5">
                  <h4 className="font-bold text-white text-sm">{p.heading}</h4>
                  <p>{p.text}</p>
                  {p.callout && (
                    <div className="p-3 bg-amber-500/20 border-l-4 border-amber-300 text-amber-100 text-xs font-semibold rounded-r-lg">
                      {p.callout}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-white/15 flex justify-between items-center">
              <button
                onClick={() => setSelectedArticleModal(null)}
                className="px-4 py-2 bg-white/15 text-white rounded-full text-xs font-bold hover:bg-white/25 transition border border-white/25"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setSelectedArticleModal(null);
                  navigateTo('mock-tests');
                }}
                className="px-5 py-2 glass-btn-primary rounded-full text-xs font-bold shadow-md flex items-center gap-1.5 transition"
              >
                <span>Launch Free Mock Test Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
