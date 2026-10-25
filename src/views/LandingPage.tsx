import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { INITIAL_BLOG_ARTICLES, BlogPost } from '../lib/blogData';
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
  const { navigateTo, setVideoDemoModalOpen, setPricingModalOpen, themeConfig } = useApp();

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
      text: 'I failed my first JFT exam in Kathmandu because the Prometric computer screen and ticking clock made me panic. JFT Guru’s exact CBT timer and 2-play audio player gave me the exact confidence I needed. Passed with 228 points on my second try!',
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
      q: 'How does JFT Guru replicate the Prometric CBT interface?',
      a: 'JFT Guru is engineered to mirror the exact Prometric testing software: 60-minute continuous countdown timer, 4 sequential sections (Script/Vocab, Conversation, Listening, Reading), permanent one-way section locking, and a strict 2-play maximum audio limit counter in the listening section.'
    },
    {
      q: 'Are the mock tests free?',
      a: 'Yes! We offer 3 Full-Length Mock Tests completely free forever, along with free access to all 25 Japanese Learning Tools and daily AI speaking practice. If you need all 114+ mock sets and advanced analytics, you can upgrade to the PRO tier for just $4.99/month.'
    },
    {
      q: 'Can I practice on my smartphone or tablet?',
      a: 'Yes, JFT Guru is fully responsive and optimized for mobile, tablet, and desktop. However, to best prepare for Prometric test center conditions, we strongly recommend practicing on a desktop or laptop computer with headphones.'
    },
    {
      q: 'How does the AI Speaking & Interview Coach work?',
      a: 'Using modern Web Speech recognition and Japanese speech synthesis, our AI Sensei simulates realistic workplace conversations and job interview questions. It evaluates pronunciation accuracy, grammar naturalness, and provides immediate native feedback.'
    }
  ];

  return (
    <div className="font-sans text-slate-900">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-16 lg:pb-28 border-b border-slate-200/40">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(225,29,72,0.07),rgba(255,255,255,0))]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headline & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Top Pill Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200/80 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping"></span>
                <span>{themeConfig.instituteTitle} • {themeConfig.instituteSlogan}</span>
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
                {themeConfig.instituteName} — <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-red-600 to-amber-600">
                  {themeConfig.instituteTitle}
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                <strong>{themeConfig.instituteSlogan}</strong>. Experience the real Prometric CBT exam environment before your big test day in Khulna. Comprehensive preparation for <strong>JFT-Basic</strong>, <strong>Specified Skilled Worker (SSW Tokutei技能 1号)</strong>, and <strong>JLPT N5–N1</strong>.
              </p>

              {/* CTA Buttons */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3.5">
                <button
                  onClick={() => navigateTo('mock-tests')}
                  className="px-7 py-3.5 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 active:scale-95 text-white rounded-2xl text-sm font-bold shadow-lg shadow-rose-600/30 flex items-center gap-2 transition"
                >
                  <Monitor className="w-4 h-4" />
                  <span>Try Mock Test (Free)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setVideoDemoModalOpen(true)}
                  className="px-6 py-3.5 bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 rounded-2xl text-sm font-bold shadow-xs flex items-center gap-2 transition"
                >
                  <Play className="w-4 h-4 text-rose-600 fill-rose-600" />
                  <span>Watch CBT Demo</span>
                </button>
              </div>

              {/* Key Trust Signals */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-500">
                <div className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Exact 60:00 Timer</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>2-Play Audio Rule</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Instant 250 Score Card</span>
                </div>
              </div>
            </div>

            {/* Right Column: Live Interactive Exam Preview Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md w-full">
                {/* Floating Passed Badge */}
                <div className="absolute -top-3.5 -right-3.5 z-20 bg-emerald-500 text-slate-950 font-black px-3.5 py-1.5 rounded-full text-xs shadow-xl flex items-center gap-1.5 animate-bounce">
                  <Award className="w-3.5 h-3.5" />
                  <span>Status: Passed (215/250)</span>
                </div>

                {/* Simulated Prometric Exam Widget */}
                <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xl overflow-hidden font-sans">
                  {/* Top Exam Header */}
                  <div className="bg-slate-800 text-white px-4 py-3 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span className="font-bold">Prometric CBT Live Simulation</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-slate-900/90 px-2.5 py-1 rounded-lg text-rose-400 font-mono font-bold">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{formatTimer(miniTimerSeconds)}</span>
                    </div>
                  </div>

                  {/* Section & Question Indicator */}
                  <div className="bg-slate-100/90 border-b border-slate-200 px-4 py-2 flex items-center justify-between text-xs text-slate-600">
                    <span className="font-bold text-slate-800">
                      Section 1: 文字と語彙 (Script & Vocab)
                    </span>
                    <span className="font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
                      Question {currentPreviewQ.num}/48
                    </span>
                  </div>

                  {/* Stimulus & Question Area */}
                  <div className="p-5 space-y-4">
                    <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                      <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        つぎの ぶんの（  ）に 何を 入れますか。
                      </p>
                      <p className="text-sm font-semibold text-slate-900 leading-relaxed font-japanese">
                        {currentPreviewQ.plainText}
                      </p>
                      <p className="text-[10px] text-slate-500 italic">
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
                          className={`w-full text-left p-2.5 rounded-xl text-xs font-semibold border transition flex items-center justify-between ${
                            selectedOption === idx
                              ? opt.isCorrect
                                ? 'bg-emerald-50 border-emerald-500 text-emerald-900 shadow-2xs'
                                : 'bg-rose-50 border-rose-500 text-rose-900'
                              : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span
                              className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center ${
                                selectedOption === idx
                                  ? opt.isCorrect
                                    ? 'bg-emerald-600 text-white'
                                    : 'bg-rose-600 text-white'
                                  : 'bg-slate-100 text-slate-600'
                              }`}
                            >
                              {opt.label}
                            </span>
                            <span className="font-japanese text-sm">{opt.text}</span>
                          </div>
                          {selectedOption === idx && opt.isCorrect && (
                            <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100 px-1.5 py-0.5 rounded">
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
                        className="text-xs font-bold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-lg hover:bg-slate-100"
                      >
                        Next Sample Q →
                      </button>

                      <button
                        onClick={() => navigateTo('mock-tests')}
                        className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold shadow-md shadow-rose-600/30 transition flex items-center gap-1.5"
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
        </div>
      </section>

      {/* 2. "WHY JFT GURU?" & CBT FORMAT STATS BANNER */}
      <section className="py-16 bg-slate-900 text-white font-sans border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
                The Pain Point Every Candidate Faces
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Why Do 40% of Prepared Candidates Fail the JFT-Basic?
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Most students fail not because their Japanese grammar is weak, but because they have never experienced the <strong>stress of the Computer-Based Testing (CBT) environment</strong>.
              </p>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                At Prometric test centers, you cannot flip pages freely, audio plays exactly twice, and once you submit a section, it is locked forever. JFT Guru eliminates test-day panic by letting you practice under 100% exact test conditions.
              </p>
            </div>

            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 text-center space-y-1">
                <div className="text-2xl sm:text-3xl font-black text-rose-400">250 pts</div>
                <div className="text-xs font-bold text-slate-200">Total Points</div>
                <div className="text-[10px] text-slate-400">200 Points to Pass</div>
              </div>

              <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 text-center space-y-1">
                <div className="text-2xl sm:text-3xl font-black text-amber-400">60 mins</div>
                <div className="text-xs font-bold text-slate-200">Exam Duration</div>
                <div className="text-[10px] text-slate-400">48 Questions Paced</div>
              </div>

              <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 text-center space-y-1">
                <div className="text-2xl sm:text-3xl font-black text-emerald-400">92%</div>
                <div className="text-xs font-bold text-slate-200">Pass Rate</div>
                <div className="text-[10px] text-slate-400">JFT Guru Active Students</div>
              </div>

              <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 text-center space-y-1">
                <div className="text-2xl sm:text-3xl font-black text-blue-400">100%</div>
                <div className="text-xs font-bold text-slate-200">Real CBT Replica</div>
                <div className="text-[10px] text-slate-400">Exact Prometric Layout</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 4 JFT-BASIC SECTIONS BREAKDOWN GRID */}
      <section className="py-20 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
              Exam Structure Breakdown
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Master All 4 Sections of the JFT-Basic
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              The test consists of 4 sequential sections totaling 48 questions (12 questions each).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Section 1 */}
            <div className="bg-white border border-slate-200 hover:border-rose-300 rounded-3xl p-6 space-y-4 shadow-xs transition hover:shadow-md">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center text-xl font-bold">
                📝
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Section 1 • 12 Questions</span>
                <h3 className="text-lg font-black text-slate-900">Script & Vocabulary</h3>
                <p className="text-xs text-rose-600 font-japanese font-medium">文字と語彙 (もじとごい)</p>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tests Kanji readings, word meaning from context, and daily vocabulary for apartments, shops, and workplace shifts.
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-500">
                <span>Pass Benchmark</span>
                <span className="text-emerald-600">80%+ Target</span>
              </div>
            </div>

            {/* Section 2 */}
            <div className="bg-white border border-slate-200 hover:border-amber-300 rounded-3xl p-6 space-y-4 shadow-xs transition hover:shadow-md">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-xl font-bold">
                💬
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Section 2 • 12 Questions</span>
                <h3 className="text-lg font-black text-slate-900">Conversation & Expression</h3>
                <p className="text-xs text-amber-600 font-japanese font-medium">会話と表現 (かいわとひょうげん)</p>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tests practical daily and workplace greetings, asking permission, giving instructions, and polite refusal phrases.
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-500">
                <span>Pass Benchmark</span>
                <span className="text-emerald-600">80%+ Target</span>
              </div>
            </div>

            {/* Section 3 */}
            <div className="bg-white border border-slate-200 hover:border-blue-300 rounded-3xl p-6 space-y-4 shadow-xs transition hover:shadow-md">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl font-bold">
                🎧
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Section 3 • 12 Questions</span>
                <h3 className="text-lg font-black text-slate-900">Listening Comprehension</h3>
                <p className="text-xs text-blue-600 font-japanese font-medium">聴解 (ちょうかい)</p>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Natural-speed audio dialogues, train broadcasts, hospital instructions, and shop announcements. Enforces the strict 2-play limit.
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-500">
                <span>Audio Play Limit</span>
                <span className="text-rose-600">Max 2 Plays</span>
              </div>
            </div>

            {/* Section 4 */}
            <div className="bg-white border border-slate-200 hover:border-emerald-300 rounded-3xl p-6 space-y-4 shadow-xs transition hover:shadow-md">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl font-bold">
                📄
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Section 4 • 12 Questions</span>
                <h3 className="text-lg font-black text-slate-900">Reading Comprehension</h3>
                <p className="text-xs text-emerald-600 font-japanese font-medium">読解 (どっかい)</p>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Real-world stimulus reading: Japanese train station signboards, hospital clinic hours, trash sorting memos, and workplace safety rules.
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-500">
                <span>Visual Stimulus</span>
                <span className="text-emerald-600">Signs & Memos</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CORE FEATURES BENTO GRID ("Everything You Need to Pass") */}
      <section className="py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
              Complete Prep Suite
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Everything You Need to Pass the First Time
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Not just mock tests — a comprehensive ecosystem engineered specifically for JFT and SSW aspirants.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Bento Card 1: 5,297+ Questions */}
            <div className="md:col-span-2 bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 text-white rounded-3xl p-8 flex flex-col justify-between space-y-6 shadow-xl relative overflow-hidden">
              <div className="space-y-3 relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Vast Question Repository</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
                  5,297+ Questions & 114 Full Mock Sets
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-lg leading-relaxed">
                  Covering all 7 major tracks: JFT-Basic Standard, Irodori A1/A2, SSW Care Worker (Kaigo), SSW Food Service, SSW Construction, SSW Agriculture, and JLPT N5–N1.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800 relative z-10">
                <div>
                  <div className="text-xl sm:text-2xl font-black text-rose-400">114+</div>
                  <div className="text-[11px] text-slate-400">Full CBT Mock Sets</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-amber-400">1,368+</div>
                  <div className="text-[11px] text-slate-400">Audio Dialogues</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-emerald-400">450+</div>
                  <div className="text-[11px] text-slate-400">Workplace Signs</div>
                </div>
              </div>
            </div>

            {/* Bento Card 2: Automated Weak Point Analysis */}
            <div className="bg-slate-50 border border-slate-200/90 rounded-3xl p-8 space-y-4 shadow-xs flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-black text-slate-900 tracking-tight">
                  Automated Weak Point Analysis
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our diagnostic engine scans your wrong answers to identify exact weaknesses in particles (助詞), keigo, or rapid listening broadcasts.
                </p>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span>Listening Accuracy</span>
                  <span className="text-rose-600">62% (Needs Review)</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-rose-500 h-full w-[62%]"></div>
                </div>
              </div>
            </div>

            {/* Bento Card 3: 25 Japanese Tools */}
            <div className="bg-slate-50 border border-slate-200/90 rounded-3xl p-8 space-y-4 shadow-xs flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-black text-slate-900 tracking-tight">
                  25 Free Japanese Tools
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Hiragana/Katakana charts with TTS, Romaji converter, Verb Conjugator, Counter words guide, Japan Salary calculator, and Visa checker.
                </p>
              </div>
              <button
                onClick={() => navigateTo('tools')}
                className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1"
              >
                <span>Explore all 25 Free Tools</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Bento Card 4: AI Sensei Speaking Coach */}
            <div className="md:col-span-2 bg-gradient-to-r from-rose-50 via-amber-50 to-white border border-rose-200 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
              <div className="space-y-3 max-w-md">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-600 text-white">
                  <Mic className="w-3.5 h-3.5" />
                  <span>Voice AI Simulator</span>
                </div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                  AI Sensei Interview & Speaking Coach
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Practice spoken Japanese before your Japanese employer interview. Get instant feedback on pronunciation accuracy (%) and polite Keigo responses.
                </p>
                <button
                  onClick={() => navigateTo('ai-speaking')}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition flex items-center gap-2"
                >
                  <span>Practice with AI Sensei Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="w-36 h-36 rounded-full bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-6xl shadow-xl shrink-0">
                👨🏻‍🏫
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PRICING & PLANS SECTION */}
      <section className="py-20 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
              Affordable Study Packages
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Flexible Plans for Your Exam Prep
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Start with 3 free mock tests today. Upgrade when you need full question bank access.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Free Tier */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 flex flex-col justify-between space-y-4 shadow-xs">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Free Forever</span>
                <h3 className="text-xl font-black text-slate-900 mt-1">Starter Free</h3>
                <div className="mt-2 text-3xl font-black text-slate-900">$0</div>
                <p className="text-xs text-slate-500 mt-2">
                  Test your baseline skills under CBT conditions.
                </p>
                <ul className="mt-4 space-y-2 text-xs text-slate-600">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>3 Full CBT Mock Tests Free</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>5 min Daily AI Speaking</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>All 25 Japanese Tools Free</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => navigateTo('mock-tests')}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition"
              >
                Start Free Mock Tests
              </button>
            </div>

            {/* Trial Tier */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 flex flex-col justify-between space-y-4 shadow-xs">
              <div>
                <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Single Use</span>
                <h3 className="text-xl font-black text-slate-900 mt-1">Trial Pass</h3>
                <div className="mt-2 text-3xl font-black text-slate-900">$1.99</div>
                <p className="text-xs text-slate-500 mt-2">
                  For last-minute practice right before exam day.
                </p>
                <ul className="mt-4 space-y-2 text-xs text-slate-600">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>5 Extra Mock Test Credits</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Access to Paid V.IMP Sets</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Full Explanations & Translations</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => setPricingModalOpen(true)}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition"
              >
                Get Trial ($1.99)
              </button>
            </div>

            {/* Monthly (Most Popular) */}
            <div className="bg-gradient-to-b from-rose-50/50 to-white border-2 border-rose-500 rounded-3xl p-6 flex flex-col justify-between space-y-4 relative shadow-xl shadow-rose-500/10">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-rose-600 text-white text-[10px] font-black uppercase tracking-wider px-3 py-0.5 rounded-full">
                Most Popular
              </div>
              <div>
                <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">Unlimited Monthly</span>
                <h3 className="text-xl font-black text-slate-900 mt-1">Monthly Pass</h3>
                <div className="mt-2 text-3xl font-black text-slate-900">$4.99 <span className="text-xs text-slate-400 font-normal">/mo</span></div>
                <p className="text-xs text-slate-500 mt-2">
                  The complete package for candidates testing this month.
                </p>
                <ul className="mt-4 space-y-2 text-xs text-slate-700 font-medium">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-rose-600" />
                    <span>All 114+ Mock Sets Unlocked</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-rose-600" />
                    <span>Unlimited AI Speaking Coach</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-rose-600" />
                    <span>Weak Point Diagnostics</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => setPricingModalOpen(true)}
                className="w-full py-2.5 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white rounded-xl text-xs font-bold shadow-md shadow-rose-600/30 transition"
              >
                Upgrade to PRO ($4.99)
              </button>
            </div>

            {/* Confidence 3-Month */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 flex flex-col justify-between space-y-4 shadow-xs">
              <div>
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Best Value</span>
                <h3 className="text-xl font-black text-slate-900 mt-1">Confidence 3-Mo</h3>
                <div className="mt-2 text-3xl font-black text-slate-900">$11.99 <span className="text-xs text-slate-400 font-normal">/3 mos</span></div>
                <p className="text-xs text-slate-500 mt-2">
                  Just $3.99/mo for complete 90-day peace of mind.
                </p>
                <ul className="mt-4 space-y-2 text-xs text-slate-600">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>90 Days Unlimited CBT Exams</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>E-Book Bundle Discount</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Pass Guarantee Extension</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => setPricingModalOpen(true)}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition"
              >
                Get 3 Months ($11.99)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. STUDENT TESTIMONIALS CAROUSEL */}
      <section className="py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-center">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
              Candidate Success Stories
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Trusted by 30,000+ Students Worldwide
            </h2>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-10 relative shadow-sm">
            <div className="text-4xl mb-4">{testimonials[activeTestimonialIdx].avatar}</div>
            <p className="text-sm sm:text-base text-slate-700 italic leading-relaxed max-w-2xl mx-auto">
              "{testimonials[activeTestimonialIdx].text}"
            </p>
            <div className="mt-6 space-y-1">
              <h4 className="font-extrabold text-slate-900">{testimonials[activeTestimonialIdx].name}</h4>
              <p className="text-xs text-slate-500">
                {testimonials[activeTestimonialIdx].country} • Target: {testimonials[activeTestimonialIdx].target}
              </p>
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs mt-1">
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
                    idx === activeTestimonialIdx ? 'w-6 bg-rose-600' : 'w-2 bg-slate-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. LATEST BLOG POSTS GRID (3 Articles with read modals) */}
      <section className="py-20 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
                Exam Guides & Strategy
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
                Latest from the JFT Guru Blog
              </h2>
            </div>
            <button
              onClick={() => navigateTo('blog')}
              className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1"
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
                className="bg-white border border-slate-200 hover:border-slate-300 rounded-3xl p-6 space-y-4 shadow-xs hover:shadow-md transition cursor-pointer flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className={`h-36 rounded-2xl bg-gradient-to-tr ${article.imageGradient} flex items-center justify-center p-4 text-white text-center shadow-inner`}>
                    <span className="font-extrabold text-sm line-clamp-2">{article.title}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                    <span>{article.category}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h3 className="text-base font-extrabold text-slate-900 group-hover:text-rose-600 transition leading-snug line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                    {article.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-rose-600">
                  <span>Read Full Guide</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. INTERACTIVE FAQ ACCORDION */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
              Frequently Asked Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Common Questions About JFT-Basic CBT
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border border-slate-200 rounded-2xl overflow-hidden transition"
              >
                <button
                  type="button"
                  onClick={() => setActiveFaqIdx(activeFaqIdx === idx ? null : idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 bg-white hover:bg-slate-50 transition"
                >
                  <span className="text-xs sm:text-sm font-bold text-slate-900">
                    {faq.q}
                  </span>
                  <span className="text-rose-600 font-extrabold text-lg">
                    {activeFaqIdx === idx ? '−' : '+'}
                  </span>
                </button>
                {activeFaqIdx === idx && (
                  <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed bg-white border-t border-slate-100 animate-in fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Article Read Modal */}
      {selectedArticleModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-5 shadow-2xl animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
                {selectedArticleModal.category} • {selectedArticleModal.readTime}
              </span>
              <button
                onClick={() => setSelectedArticleModal(null)}
                className="w-7 h-7 rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
              {selectedArticleModal.title}
            </h2>

            <div className="p-4 bg-rose-50 border border-rose-200/60 rounded-2xl space-y-2">
              <div className="text-xs font-bold text-rose-900">Key Takeaways:</div>
              <ul className="space-y-1 text-xs text-rose-800 list-disc list-inside">
                {selectedArticleModal.keyTakeaways.map((k, i) => (
                  <li key={i}>{k}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
              {selectedArticleModal.contentParagraphs.map((p, i) => (
                <div key={i} className="space-y-1.5">
                  <h4 className="font-bold text-slate-900 text-sm">{p.heading}</h4>
                  <p>{p.text}</p>
                  {p.callout && (
                    <div className="p-3 bg-amber-50 border-l-4 border-amber-500 text-amber-900 text-xs font-semibold rounded-r-lg">
                      {p.callout}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
              <button
                onClick={() => setSelectedArticleModal(null)}
                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-200"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setSelectedArticleModal(null);
                  navigateTo('mock-tests');
                }}
                className="px-5 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold shadow-md shadow-rose-600/30 flex items-center gap-1.5"
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
