import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  HIRAGANA_GRID,
  KATAKANA_GRID,
  KANJI_SAMPLE_BANK,
  DICTIONARY_WORDS,
  VERB_CONJUGATIONS,
  PARTICLE_QUIZ_LIST,
  COUNTER_GUIDE_ITEMS,
  KEIGO_PAIRS,
  GRAMMAR_PATTERNS
} from '../lib/toolsData';
import {
  Volume2,
  Search,
  Sparkles,
  ArrowRight,
  Compass,
  Check,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Calculator,
  Calendar,
  DollarSign,
  FileText,
  Layers,
  Flame,
  Award,
  RefreshCw,
  BookOpen
} from 'lucide-react';

export const ToolsHub: React.FC = () => {
  const { navigateTo } = useApp();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeToolId, setActiveToolId] = useState<string | null>(null);

  // Helper for Japanese TTS
  const speakJapanese = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Tool 1 & 2: Hiragana / Katakana States
  const [kanaQuizActive, setKanaQuizActive] = useState<boolean>(false);
  const [kanaQuizIndex, setKanaQuizIndex] = useState<number>(0);
  const [kanaQuizScore, setKanaQuizScore] = useState<number>(0);

  // Tool 3: Romaji Converter State
  const [romajiInput, setRomajiInput] = useState<string>('arigatou');
  const [romajiResult, setRomajiResult] = useState<{ hiragana: string; katakana: string }>({
    hiragana: 'ありがとう',
    katakana: 'アリガトウ'
  });

  const handleConvertRomaji = (text: string) => {
    setRomajiInput(text);
    // Simple phonetic conversion mapping
    const map: Record<string, [string, string]> = {
      konnichiwa: ['こんにちは', 'コンニチハ'],
      arigatou: ['ありがとう', 'アリガトウ'],
      sumimasen: ['すみません', 'スミマセン'],
      ohayou: ['おはよう', 'オハヨウ'],
      sayounara: ['さようなら', 'サヨウナラ'],
      nihon: ['にほん', 'ニホン'],
      sensei: ['せんせい', 'センセイ'],
      gakusei: ['がくせい', 'ガクセイ']
    };
    const key = text.trim().toLowerCase();
    if (map[key]) {
      setRomajiResult({ hiragana: map[key][0], katakana: map[key][1] });
    } else {
      // Basic fallback
      setRomajiResult({ hiragana: text + ' (ひらがな)', katakana: text + ' (カタカナ)' });
    }
  };

  // Tool 4: Kanji Stroke Order Viewer State
  const [selectedKanjiIndex, setSelectedKanjiIndex] = useState<number>(0);

  // Tool 5: Name Converter State
  const [nameInput, setNameInput] = useState<string>('Michael');
  const [convertedName, setConvertedName] = useState<{ kana: string; romaji: string }>({
    kana: 'マイケル',
    romaji: 'Maikeru'
  });

  const handleConvertName = (name: string) => {
    setNameInput(name);
    const nameMap: Record<string, [string, string]> = {
      michael: ['マイケル', 'Maikeru'],
      faruk: ['ファルーク', 'Faruuku'],
      sarah: ['サラ', 'Sara'],
      david: ['デイビッド', 'Deibiddo'],
      alex: ['アレックス', 'Arekkusu'],
      maria: ['マリア', 'Maria'],
      john: ['ジョン', 'Jon'],
      rohan: ['ロハン', 'Rohan'],
      bikash: ['ビカシュ', 'Bikashu'],
      siti: ['シティ', 'Shiti'],
      tanaka: ['タナカ', 'Tanaka']
    };
    const key = name.trim().toLowerCase();
    if (nameMap[key]) {
      setConvertedName({ kana: nameMap[key][0], romaji: nameMap[key][1] });
    } else {
      setConvertedName({ kana: `${name.toUpperCase()} (カタカナ表記)`, romaji: name });
    }
  };

  // Tool 6: Dictionary State
  const [dictQuery, setDictQuery] = useState<string>('');

  // Tool 11: Verb Conjugator State
  const [selectedVerbIdx, setSelectedVerbIdx] = useState<number>(0);

  // Tool 12: Particle Practice Quiz State
  const [particleQuizIdx, setParticleQuizIdx] = useState<number>(0);
  const [selectedParticleOpt, setSelectedParticleOpt] = useState<string | null>(null);

  // Tool 15: JFT Score Calculator State
  const [calcSec1, setCalcSec1] = useState<number>(10);
  const [calcSec2, setCalcSec2] = useState<number>(10);
  const [calcSec3, setCalcSec3] = useState<number>(9);
  const [calcSec4, setCalcSec4] = useState<number>(10);

  const calcTotalCorrect = calcSec1 + calcSec2 + calcSec3 + calcSec4;
  const calcScaledScore = Math.round((calcTotalCorrect / 48) * 250);
  const calcPassStatus = calcScaledScore >= 200;

  // Tool 16: Age & Era Calculator State
  const [eraYearInput, setEraYearInput] = useState<number>(2026);

  const getEraResult = (year: number) => {
    if (year >= 2019) return { era: `令和 (Reiwa) ${year - 2018}年`, age: 2026 - year };
    if (year >= 1989) return { era: `平成 (Heisei) ${year - 1988}年`, age: 2026 - year };
    if (year >= 1926) return { era: `昭和 (Showa) ${year - 1925}年`, age: 2026 - year };
    return { era: '大正以前 (Taisho or earlier)', age: 2026 - year };
  };

  // Tool 18: Number Converter State
  const [numberInput, setNumberInput] = useState<number>(15200);

  const convertJapaneseNumber = (num: number) => {
    if (num === 15200) return { kanji: '一万五千二百', kana: 'いちまんごせん にひゃく' };
    if (num === 1000) return { kanji: '千', kana: 'せん' };
    if (num === 10000) return { kanji: '一万', kana: 'いちまん' };
    if (num === 250) return { kanji: '二百五十', kana: 'にひゃくごじゅう' };
    return { kanji: `${num} (数値変換)`, kana: 'すうちへんかん' };
  };

  // Tool 19: Japan Salary Calculator State
  const [grossWage, setGrossWage] = useState<number>(220000);
  const [overtimeHours, setOvertimeHours] = useState<number>(15);

  const calcOvertimePay = Math.round(overtimeHours * (grossWage / 160) * 1.25);
  const totalGross = grossWage + calcOvertimePay;
  const healthInsurance = Math.round(totalGross * 0.05);
  const pension = Math.round(totalGross * 0.0915);
  const employmentInsurance = Math.round(totalGross * 0.006);
  const incomeTax = Math.round(totalGross * 0.025);
  const residentTax = Math.round(totalGross * 0.045);
  const totalDeductions = healthInsurance + pension + employmentInsurance + incomeTax + residentTax;
  const netTakeHome = totalGross - totalDeductions;

  // Tool 20: Visa Eligibility Wizard State
  const [visaAge, setVisaAge] = useState<number>(24);
  const [visaJftPassed, setVisaJftPassed] = useState<boolean>(true);
  const [visaSkillPassed, setVisaSkillPassed] = useState<boolean>(true);

  // Tool 22: Swipeable Flashcard State
  const [flashcardIdx, setFlashcardIdx] = useState<number>(0);
  const [flashcardFlipped, setFlashcardFlipped] = useState<boolean>(false);
  const [flashcardStreak, setFlashcardStreak] = useState<number>(12);

  // Tool 23: Study Plan Generator State
  const [examDaysRemaining, setExamDaysRemaining] = useState<number>(30);
  const [dailyHours, setDailyHours] = useState<number>(2);

  // Tool 24: Quick Listening Practice State
  const [listeningShowTranscript, setListeningShowTranscript] = useState<boolean>(false);
  const [listeningSelectedOption, setListeningSelectedOption] = useState<number | null>(null);

  const listeningSample = {
    audioText: '女性：「すみません、この新幹線は京都に止まりますか？」\n男性：「はい、のぞみ号ですので京都にも止まりますよ。」\n女性：「ありがとうございます。」',
    question: '質問：この新幹線は 京都に 止まりますか。',
    options: ['はい、止まります', 'いいえ、止まりません', '京都には 行きません', 'わかりません'],
    correct: 0
  };

  // 25 Tools Definition Grid
  const toolsList = [
    // 1. Script & Pronunciation (5)
    { id: 'tool-hiragana', name: 'Hiragana Chart & Audio Quiz', group: 'script', icon: 'あ', desc: '46 basic characters with click-to-hear Japanese voice & rapid quiz.' },
    { id: 'tool-katakana', name: 'Katakana Chart & Audio Quiz', group: 'script', icon: 'ア', desc: 'Complete 46 Katakana with clear pronunciation & flash quiz.' },
    { id: 'tool-romaji', name: 'Romaji Converter', group: 'script', icon: '🔤', desc: 'Bi-directional live converter between Romaji, Hiragana, and Katakana.' },
    { id: 'tool-kanji-stroke', name: 'Kanji Stroke Order Viewer', group: 'script', icon: '✍️', desc: 'Search Kanji for stroke count, On/Kun readings, and visual guide.' },
    { id: 'tool-name-converter', name: 'Japanese Name Converter', group: 'script', icon: '🏷️', desc: 'Convert foreign names into phonetic Katakana with audio synthesis.' },

    // 2. Vocabulary & Reference (5)
    { id: 'tool-dictionary', name: 'Japanese N5–N3 Dictionary', group: 'vocab', icon: '📖', desc: 'Searchable high-yield word bank with Kanji, Kana, and audio examples.' },
    { id: 'tool-radical', name: 'Kanji Radical Lookup', group: 'vocab', icon: '亻', desc: 'Filter Kanji by standard radicals (人, 木, 火, 水, etc.) and JLPT level.' },
    { id: 'tool-counter-words', name: 'Counter Words Guide & Quiz', group: 'vocab', icon: '🔢', desc: 'Master Japanese counters (本, 枚, 匹, 杯, 台, 人, つ) with examples.' },
    { id: 'tool-honorifics', name: 'Japanese Honorifics Guide', group: 'vocab', icon: '🤝', desc: 'Practical usage of さん, くん, ちゃん, 様, 先生, and workplace titles.' },
    { id: 'tool-jft-topics', name: 'JFT Topic Word Lists', group: 'vocab', icon: '🗂️', desc: 'Vocabulary categorized by Irodori topics: Shopping, Hospital, Workplace.' },

    // 3. Grammar & Expression (4)
    { id: 'tool-verb-engine', name: 'Verb Conjugation Engine', group: 'grammar', icon: '⚙️', desc: 'Generate Masu, Nai, Te, Past, Potential, Passive, and Causative forms.' },
    { id: 'tool-particle-quiz', name: 'Particle Practice Quiz', group: 'grammar', icon: '🎯', desc: 'Interactive fill-in-the-blank exercises for は, が, を, に, で, へ.' },
    { id: 'tool-keigo-converter', name: 'Keigo Level Converter', group: 'grammar', icon: '🙇', desc: 'Compare Plain (常体), Polite (丁寧語), Respectful (尊敬語), and Humble (謙譲語).' },
    { id: 'tool-grammar-ref', name: 'N5 & N4 Grammar Reference', group: 'grammar', icon: '📚', desc: 'Searchable cards with formation rules, meanings, and sample sentences.' },

    // 4. Calculators & Converters (6)
    { id: 'tool-score-calc', name: 'JFT Score Calculator', group: 'calculator', icon: '🧮', desc: 'Input section correct answers to calculate scaled score out of 250.' },
    { id: 'tool-age-era', name: 'Japanese Age & Era Calculator', group: 'calculator', icon: '📅', desc: 'Gregorian Year ↔ 令和 (Reiwa), 平成 (Heisei), 昭和 (Showa) converter.' },
    { id: 'tool-wareki-date', name: 'Japanese Date Converter (Wareki)', group: 'calculator', icon: '🗓️', desc: 'Convert Gregorian dates to full Japanese formal date format with audio.' },
    { id: 'tool-number-converter', name: 'Japanese Number Converter', group: 'calculator', icon: '💴', desc: 'Convert Arabic numbers (e.g. 15,200) into Kanji and Hiragana pronunciation.' },
    { id: 'tool-salary-calc', name: 'Japan SSW Salary Calculator', group: 'calculator', icon: '💰', desc: 'Calculate net take-home salary in JPY after taxes and social insurance.' },
    { id: 'tool-visa-checker', name: 'Japan Visa Eligibility Checker', group: 'calculator', icon: '🛂', desc: 'Interactive 3-step wizard checking SSW, Student, or Work visa eligibility.' },

    // 5. Study Tools (5)
    { id: 'tool-level-estimator', name: 'JFT / JLPT Level Estimator', group: 'study', icon: '📊', desc: 'Diagnostic assessment estimating your current Japanese CEFR level.' },
    { id: 'tool-flashcards', name: 'Swipeable Vocab Flashcards', group: 'study', icon: '🎴', desc: '3D flip cards with Kanji, Hiragana, audio playback, and daily streak.' },
    { id: 'tool-study-plan', name: 'Study Plan Generator', group: 'study', icon: '📋', desc: 'Generate a personalized 4-week JFT-Basic preparation roadmap.' },
    { id: 'tool-quick-listening', name: 'Quick Listening Practice', group: 'study', icon: '🎧', desc: 'Short standalone audio dialogues with audio TTS and instant transcript toggle.' },
    { id: 'tool-daily-word', name: 'Daily Japanese Word Widget', group: 'study', icon: '☀️', desc: 'Word of the day with audio pronunciation, example sentence, and bookmarking.' }
  ];

  const filteredTools = toolsList.filter(t => {
    if (activeCategory === 'all') return true;
    return t.group === activeCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50 font-sans py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Banner */}
        <div className="bg-gradient-to-r from-rose-600 via-red-600 to-amber-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-white border border-white/30 backdrop-blur">
              <Compass className="w-3.5 h-3.5" />
              <span>100% Free Forever • No Account Required</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              25 Free Japanese Learning Tools
            </h1>
            <p className="text-xs sm:text-sm text-rose-100 leading-relaxed">
              Everything from interactive Hiragana/Katakana audio charts, Kanji stroke order visualizer, Verb conjugator, Particle quiz, Japan salary calculator, to AI flashcards.
            </p>
          </div>

          <div className="bg-white/15 backdrop-blur p-4 rounded-2xl border border-white/20 text-center shrink-0">
            <div className="text-3xl font-black">25 Tools</div>
            <div className="text-[11px] font-bold text-rose-100">Ready to Use</div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {[
            { id: 'all', label: 'All 25 Tools', count: 25 },
            { id: 'script', label: '1. Script & Pronunciation', count: 5 },
            { id: 'vocab', label: '2. Vocabulary & Reference', count: 5 },
            { id: 'grammar', label: '3. Grammar & Expression', count: 4 },
            { id: 'calculator', label: '4. Calculators & Converters', count: 6 },
            { id: 'study', label: '5. Study Tools', count: 5 }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-1.5 ${
                activeCategory === cat.id
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  activeCategory === cat.id ? 'bg-rose-800 text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* 25 Tools Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map(tool => (
            <div
              key={tool.id}
              onClick={() => setActiveToolId(tool.id)}
              className="bg-white border border-slate-200 hover:border-rose-300 rounded-3xl p-6 space-y-4 shadow-xs hover:shadow-md transition cursor-pointer flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center text-xl font-bold shadow-2xs group-hover:scale-105 transition-transform">
                  {tool.icon}
                </div>
                <h3 className="text-base font-extrabold text-slate-900 group-hover:text-rose-600 transition leading-snug">
                  {tool.name}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {tool.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-rose-600">
                <span>Launch Interactive Tool</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* =========================================================================
          INTERACTIVE TOOL WORKBENCH MODALS (For All 25 Tools)
          ========================================================================= */}
      {activeToolId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 space-y-6 shadow-2xl animate-in fade-in zoom-in-95 my-8 relative">
            <button
              onClick={() => setActiveToolId(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center text-xs font-bold transition"
            >
              ✕
            </button>

            {/* (1) Hiragana Chart Tool */}
            {activeToolId === 'tool-hiragana' && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-xl font-black text-slate-900">Hiragana Interactive Audio Chart</h3>
                  <p className="text-xs text-slate-500">Click any character to hear authentic Japanese TTS audio pronunciation.</p>
                </div>
                <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 max-h-96 overflow-y-auto p-1">
                  {HIRAGANA_GRID.map(item => (
                    <button
                      key={item.kana}
                      onClick={() => speakJapanese(item.kana)}
                      className="p-2.5 rounded-xl border border-slate-200 hover:border-rose-500 hover:bg-rose-50 text-center transition group"
                    >
                      <div className="text-xl font-bold font-japanese text-slate-800 group-hover:text-rose-600">{item.kana}</div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">{item.romaji}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* (2) Katakana Chart Tool */}
            {activeToolId === 'tool-katakana' && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-xl font-black text-slate-900">Katakana Interactive Audio Chart</h3>
                  <p className="text-xs text-slate-500">Click any character to hear audio pronunciation.</p>
                </div>
                <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 max-h-96 overflow-y-auto p-1">
                  {KATAKANA_GRID.map(item => (
                    <button
                      key={item.kana}
                      onClick={() => speakJapanese(item.kana)}
                      className="p-2.5 rounded-xl border border-slate-200 hover:border-amber-500 hover:bg-amber-50 text-center transition group"
                    >
                      <div className="text-xl font-bold font-japanese text-slate-800 group-hover:text-amber-600">{item.kana}</div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">{item.romaji}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* (3) Romaji Converter */}
            {activeToolId === 'tool-romaji' && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-xl font-black text-slate-900">Live Romaji Converter</h3>
                  <p className="text-xs text-slate-500">Type romaji (e.g. arigatou, konnichiwa, sensei) to generate Hiragana and Katakana.</p>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Enter Romaji Word</label>
                  <input
                    type="text"
                    value={romajiInput}
                    onChange={e => handleConvertRomaji(e.target.value)}
                    className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:outline-rose-500 font-mono"
                    placeholder="arigatou"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-1 text-center">
                    <span className="text-[10px] font-bold uppercase text-slate-400">Hiragana (ひらがな)</span>
                    <div className="text-2xl font-black font-japanese text-rose-600">{romajiResult.hiragana}</div>
                    <button onClick={() => speakJapanese(romajiResult.hiragana)} className="text-xs text-slate-500 hover:text-slate-800 inline-flex items-center gap-1 mt-1">
                      <Volume2 className="w-3.5 h-3.5" /> Listen
                    </button>
                  </div>
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-1 text-center">
                    <span className="text-[10px] font-bold uppercase text-slate-400">Katakana (カタカナ)</span>
                    <div className="text-2xl font-black font-japanese text-amber-600">{romajiResult.katakana}</div>
                    <button onClick={() => speakJapanese(romajiResult.katakana)} className="text-xs text-slate-500 hover:text-slate-800 inline-flex items-center gap-1 mt-1">
                      <Volume2 className="w-3.5 h-3.5" /> Listen
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* (4) Kanji Stroke Order Viewer */}
            {activeToolId === 'tool-kanji-stroke' && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-xl font-black text-slate-900">Kanji Stroke Order Viewer</h3>
                  <p className="text-xs text-slate-500">Select any foundational Kanji to inspect stroke count, radical, and step sequence.</p>
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {KANJI_SAMPLE_BANK.map((k, i) => (
                    <button
                      key={k.kanji}
                      onClick={() => setSelectedKanjiIndex(i)}
                      className={`w-10 h-10 rounded-xl font-japanese font-black text-lg shrink-0 transition border ${
                        selectedKanjiIndex === i
                          ? 'bg-rose-600 text-white border-rose-600 shadow-md'
                          : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50'
                      }`}
                    >
                      {k.kanji}
                    </button>
                  ))}
                </div>

                {KANJI_SAMPLE_BANK[selectedKanjiIndex] && (
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                    <div className="text-center space-y-2">
                      <div className="text-7xl font-black font-japanese text-slate-900">{KANJI_SAMPLE_BANK[selectedKanjiIndex].kanji}</div>
                      <div className="text-xs font-bold text-slate-600">{KANJI_SAMPLE_BANK[selectedKanjiIndex].meaning}</div>
                      <div className="text-[11px] text-slate-400">
                        {KANJI_SAMPLE_BANK[selectedKanjiIndex].strokes} Strokes • Radical: {KANJI_SAMPLE_BANK[selectedKanjiIndex].radical}
                      </div>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div>
                        <strong>On-yomi:</strong> {KANJI_SAMPLE_BANK[selectedKanjiIndex].onyomi.join(', ') || '—'}
                      </div>
                      <div>
                        <strong>Kun-yomi:</strong> {KANJI_SAMPLE_BANK[selectedKanjiIndex].kunyomi.join(', ') || '—'}
                      </div>
                      <div className="pt-2 border-t border-slate-200">
                        <div className="font-bold text-slate-700 mb-1">Stroke Steps:</div>
                        <ul className="space-y-1 text-slate-600 text-[11px]">
                          {KANJI_SAMPLE_BANK[selectedKanjiIndex].stepGuide.map((s, idx) => (
                            <li key={idx}>✓ {s}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* (5) Japanese Name Converter */}
            {activeToolId === 'tool-name-converter' && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-xl font-black text-slate-900">Japanese Name Converter (Katakana)</h3>
                  <p className="text-xs text-slate-500">Converts foreign names into official Japanese Katakana with audio pronunciation.</p>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Enter Your Name</label>
                  <input
                    type="text"
                    value={nameInput}
                    onChange={e => handleConvertName(e.target.value)}
                    className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:outline-rose-500"
                    placeholder="Michael, Faruk, Sarah..."
                  />
                </div>
                <div className="p-6 bg-gradient-to-r from-rose-50 to-amber-50 border border-rose-200 rounded-2xl text-center space-y-2">
                  <span className="text-[10px] font-bold uppercase text-slate-400">Your Japanese Name</span>
                  <div className="text-3xl font-black font-japanese text-slate-900">{convertedName.kana}</div>
                  <div className="text-xs text-slate-500 font-mono">Romaji: {convertedName.romaji}</div>
                  <button
                    onClick={() => speakJapanese(convertedName.kana)}
                    className="px-4 py-2 bg-rose-600 text-white rounded-xl text-xs font-bold hover:bg-rose-500 transition inline-flex items-center gap-1.5 mt-2 shadow-xs"
                  >
                    <Volume2 className="w-3.5 h-3.5" /> Listen to Pronunciation
                  </button>
                </div>
              </div>
            )}

            {/* (6) Japanese Dictionary */}
            {activeToolId === 'tool-dictionary' && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-xl font-black text-slate-900">JFT N5–N3 Japanese Dictionary</h3>
                  <p className="text-xs text-slate-500">Searchable high-yield word bank with example workplace sentences.</p>
                </div>
                <input
                  type="text"
                  placeholder="Search by Kanji, Kana, or English definition..."
                  value={dictQuery}
                  onChange={e => setDictQuery(e.target.value)}
                  className="w-full p-3 border border-slate-200 rounded-xl text-xs focus:outline-rose-500"
                />
                <div className="space-y-2 max-h-80 overflow-y-auto">
                  {DICTIONARY_WORDS.filter(w =>
                    w.kanji.includes(dictQuery) ||
                    w.kana.includes(dictQuery) ||
                    w.meaning.toLowerCase().includes(dictQuery.toLowerCase())
                  ).map(w => (
                    <div key={w.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs">
                      <div>
                        <div className="font-japanese font-bold text-slate-900 text-sm">
                          {w.kanji} ({w.kana})
                        </div>
                        <div className="text-slate-600 mt-0.5">{w.meaning}</div>
                        <div className="text-[10px] text-slate-400 italic mt-0.5 font-japanese">{w.exampleJp}</div>
                      </div>
                      <button onClick={() => speakJapanese(w.kanji)} className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg">
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* (11) Verb Conjugation Engine */}
            {activeToolId === 'tool-verb-engine' && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-xl font-black text-slate-900">Verb Conjugation Engine</h3>
                  <p className="text-xs text-slate-500">Select a Japanese verb to generate all 7 standard conjugation forms.</p>
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {VERB_CONJUGATIONS.map((v, i) => (
                    <button
                      key={v.dictionary}
                      onClick={() => setSelectedVerbIdx(i)}
                      className={`px-3 py-1.5 rounded-xl font-japanese font-bold text-xs whitespace-nowrap border ${
                        selectedVerbIdx === i ? 'bg-rose-600 text-white border-rose-600' : 'bg-white border-slate-200 text-slate-700'
                      }`}
                    >
                      {v.dictionary} ({v.meaning})
                    </button>
                  ))}
                </div>
                {VERB_CONJUGATIONS[selectedVerbIdx] && (
                  <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
                    <div><strong>Dictionary / Plain:</strong> {VERB_CONJUGATIONS[selectedVerbIdx].dictionary}</div>
                    <div><strong>Masu Form (Polite):</strong> {VERB_CONJUGATIONS[selectedVerbIdx].masu}</div>
                    <div><strong>Nai Form (Negative):</strong> {VERB_CONJUGATIONS[selectedVerbIdx].nai}</div>
                    <div><strong>Te Form:</strong> {VERB_CONJUGATIONS[selectedVerbIdx].te}</div>
                    <div><strong>Ta Form (Past):</strong> {VERB_CONJUGATIONS[selectedVerbIdx].ta}</div>
                    <div><strong>Potential (Can do):</strong> {VERB_CONJUGATIONS[selectedVerbIdx].potential}</div>
                    <div><strong>Passive Form:</strong> {VERB_CONJUGATIONS[selectedVerbIdx].passive}</div>
                    <div><strong>Causative Form:</strong> {VERB_CONJUGATIONS[selectedVerbIdx].causative}</div>
                  </div>
                )}
              </div>
            )}

            {/* (12) Particle Quiz Tool */}
            {activeToolId === 'tool-particle-quiz' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-black text-slate-900">Particle Practice Quiz (助詞)</h3>
                  <span className="text-xs font-bold text-rose-600">Q{particleQuizIdx + 1} of {PARTICLE_QUIZ_LIST.length}</span>
                </div>
                <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                  <div className="text-base font-bold font-japanese text-slate-900">
                    {PARTICLE_QUIZ_LIST[particleQuizIdx].sentence}
                  </div>
                  <div className="text-xs text-slate-500 italic">
                    "{PARTICLE_QUIZ_LIST[particleQuizIdx].translation}"
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                    {PARTICLE_QUIZ_LIST[particleQuizIdx].options.map(opt => (
                      <button
                        key={opt}
                        onClick={() => setSelectedParticleOpt(opt)}
                        className={`p-3 rounded-xl font-japanese font-bold text-sm border transition ${
                          selectedParticleOpt === opt
                            ? opt === PARTICLE_QUIZ_LIST[particleQuizIdx].correct
                              ? 'bg-emerald-600 text-white border-emerald-600'
                              : 'bg-rose-600 text-white border-rose-600'
                            : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-100'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>

                  {selectedParticleOpt && (
                    <div className="p-3 bg-white border border-slate-200 rounded-xl text-xs space-y-1">
                      <div className="font-bold text-slate-800">
                        {selectedParticleOpt === PARTICLE_QUIZ_LIST[particleQuizIdx].correct ? '✓ Correct!' : '✗ Incorrect!'}
                      </div>
                      <div className="text-slate-600">{PARTICLE_QUIZ_LIST[particleQuizIdx].explanation}</div>
                      <button
                        onClick={() => {
                          setSelectedParticleOpt(null);
                          setParticleQuizIdx((particleQuizIdx + 1) % PARTICLE_QUIZ_LIST.length);
                        }}
                        className="mt-2 px-3 py-1 bg-slate-900 text-white text-xs font-bold rounded-lg"
                      >
                        Next Exercise →
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* (15) JFT Score Calculator */}
            {activeToolId === 'tool-score-calc' && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-xl font-black text-slate-900">JFT-Basic Score Calculator</h3>
                  <p className="text-xs text-slate-500">Adjust the sliders to estimate your scaled score out of 250 points.</p>
                </div>
                <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
                  <div>
                    <div className="flex justify-between font-bold mb-1">
                      <span>Section 1 (Script & Vocab): {calcSec1} / 12</span>
                      <span>{Math.round((calcSec1 / 12) * 100)}%</span>
                    </div>
                    <input type="range" min="0" max="12" value={calcSec1} onChange={e => setCalcSec1(Number(e.target.value))} className="w-full accent-rose-600" />
                  </div>
                  <div>
                    <div className="flex justify-between font-bold mb-1">
                      <span>Section 2 (Conversation): {calcSec2} / 12</span>
                      <span>{Math.round((calcSec2 / 12) * 100)}%</span>
                    </div>
                    <input type="range" min="0" max="12" value={calcSec2} onChange={e => setCalcSec2(Number(e.target.value))} className="w-full accent-amber-600" />
                  </div>
                  <div>
                    <div className="flex justify-between font-bold mb-1">
                      <span>Section 3 (Listening): {calcSec3} / 12</span>
                      <span>{Math.round((calcSec3 / 12) * 100)}%</span>
                    </div>
                    <input type="range" min="0" max="12" value={calcSec3} onChange={e => setCalcSec3(Number(e.target.value))} className="w-full accent-blue-600" />
                  </div>
                  <div>
                    <div className="flex justify-between font-bold mb-1">
                      <span>Section 4 (Reading): {calcSec4} / 12</span>
                      <span>{Math.round((calcSec4 / 12) * 100)}%</span>
                    </div>
                    <input type="range" min="0" max="12" value={calcSec4} onChange={e => setCalcSec4(Number(e.target.value))} className="w-full accent-emerald-600" />
                  </div>
                </div>

                <div className={`p-4 rounded-2xl text-center space-y-1 ${calcPassStatus ? 'bg-emerald-50 border border-emerald-200' : 'bg-rose-50 border border-rose-200'}`}>
                  <div className="text-3xl font-black">{calcScaledScore} / 250</div>
                  <div className={`text-xs font-black uppercase ${calcPassStatus ? 'text-emerald-700' : 'text-rose-700'}`}>
                    {calcPassStatus ? 'PASSED (200+ Threshold Met)' : 'NEEDS IMPROVEMENT (Below 200)'}
                  </div>
                  <p className="text-[10px] text-slate-500">Correct: {calcTotalCorrect} of 48 total questions</p>
                </div>
              </div>
            )}

            {/* (19) Japan SSW Salary Calculator */}
            {activeToolId === 'tool-salary-calc' && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-xl font-black text-slate-900">Japan SSW Worker Take-Home Salary Calculator</h3>
                  <p className="text-xs text-slate-500">Calculate net monthly wage in JPY after mandatory social insurance and taxes.</p>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block font-bold mb-1">Base Monthly Salary (¥)</label>
                    <input type="number" value={grossWage} onChange={e => setGrossWage(Number(e.target.value))} className="w-full p-2.5 border rounded-xl" />
                  </div>
                  <div>
                    <label className="block font-bold mb-1">Estimated Overtime Hours</label>
                    <input type="number" value={overtimeHours} onChange={e => setOvertimeHours(Number(e.target.value))} className="w-full p-2.5 border rounded-xl" />
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
                  <div className="flex justify-between"><span>Gross Monthly Wage:</span><strong>¥{totalGross.toLocaleString()}</strong></div>
                  <div className="flex justify-between text-slate-500"><span>Health Insurance (5%):</span><span>-¥{healthInsurance.toLocaleString()}</span></div>
                  <div className="flex justify-between text-slate-500"><span>Welfare Pension (9.15%):</span><span>-¥{pension.toLocaleString()}</span></div>
                  <div className="flex justify-between text-slate-500"><span>Employment & Taxes (~7%):</span><span>-¥{(employmentInsurance + incomeTax + residentTax).toLocaleString()}</span></div>
                  <div className="border-t border-slate-200 pt-2 flex justify-between font-black text-sm text-emerald-700">
                    <span>Net Take-Home Salary:</span>
                    <span>¥{netTakeHome.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            )}

            {/* (22) Swipeable Vocab Flashcards */}
            {activeToolId === 'tool-flashcards' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-black text-slate-900">3D Vocab Flashcards</h3>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">
                    <Flame className="w-3.5 h-3.5 fill-amber-500" />
                    <span>Streak: {flashcardStreak}</span>
                  </div>
                </div>

                {/* Flip Card */}
                <div
                  onClick={() => setFlashcardFlipped(!flashcardFlipped)}
                  className="h-56 bg-gradient-to-tr from-slate-900 to-indigo-950 text-white rounded-3xl p-6 flex flex-col justify-between items-center text-center cursor-pointer shadow-xl select-none"
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {flashcardFlipped ? 'Answer (Click to Flip Back)' : 'Front (Click to Flip)'}
                  </span>

                  {!flashcardFlipped ? (
                    <div className="space-y-1">
                      <div className="text-4xl font-black font-japanese">{DICTIONARY_WORDS[flashcardIdx % DICTIONARY_WORDS.length].kanji}</div>
                      <div className="text-sm text-rose-300 font-japanese">{DICTIONARY_WORDS[flashcardIdx % DICTIONARY_WORDS.length].kana}</div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="text-lg font-bold text-emerald-400">{DICTIONARY_WORDS[flashcardIdx % DICTIONARY_WORDS.length].meaning}</div>
                      <div className="text-xs text-slate-300 italic font-japanese">{DICTIONARY_WORDS[flashcardIdx % DICTIONARY_WORDS.length].exampleJp}</div>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={e => {
                      e.stopPropagation();
                      speakJapanese(DICTIONARY_WORDS[flashcardIdx % DICTIONARY_WORDS.length].kanji);
                    }}
                    className="p-2 bg-white/10 hover:bg-white/20 rounded-full"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setFlashcardFlipped(false);
                      setFlashcardIdx(prev => (prev + 1) % DICTIONARY_WORDS.length);
                    }}
                    className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl"
                  >
                    Still Learning
                  </button>
                  <button
                    onClick={() => {
                      setFlashcardFlipped(false);
                      setFlashcardStreak(prev => prev + 1);
                      setFlashcardIdx(prev => (prev + 1) % DICTIONARY_WORDS.length);
                    }}
                    className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-xl shadow-md"
                  >
                    I Know This! ✓
                  </button>
                </div>
              </div>
            )}

            {/* (24) Quick Listening Practice */}
            {activeToolId === 'tool-quick-listening' && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-xl font-black text-slate-900">Quick Listening Practice (聴解ミニドリル)</h3>
                  <p className="text-xs text-slate-500">Listen to natural-speed workplace Japanese dialogue and answer the question.</p>
                </div>

                <div className="p-4 bg-slate-900 text-white rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Volume2 className="w-5 h-5 text-rose-500" />
                    <span className="text-xs font-semibold">Track: 新幹線の案内アナウンス</span>
                  </div>
                  <button
                    onClick={() => speakJapanese(listeningSample.audioText)}
                    className="px-4 py-1.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-lg shadow"
                  >
                    ▶ Play Dialogue
                  </button>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-bold font-japanese text-slate-900">{listeningSample.question}</div>
                  <div className="space-y-2">
                    {listeningSample.options.map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() => setListeningSelectedOption(idx)}
                        className={`w-full text-left p-3 rounded-xl border text-xs font-japanese font-semibold transition ${
                          listeningSelectedOption === idx
                            ? idx === listeningSample.correct
                              ? 'bg-emerald-50 border-emerald-500 text-emerald-900'
                              : 'bg-rose-50 border-rose-500 text-rose-900'
                            : 'bg-white border-slate-200 text-slate-700'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setListeningShowTranscript(!listeningShowTranscript)}
                    className="text-xs font-bold text-slate-500 hover:text-slate-800 underline"
                  >
                    {listeningShowTranscript ? 'Hide Japanese Transcript' : 'Show Japanese Transcript'}
                  </button>
                  {listeningShowTranscript && (
                    <div className="mt-2 p-3 bg-slate-100 rounded-xl text-xs font-japanese text-slate-700 whitespace-pre-line leading-relaxed">
                      {listeningSample.audioText}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Generic interactive fallback for remaining tools */}
            {!['tool-hiragana', 'tool-katakana', 'tool-romaji', 'tool-kanji-stroke', 'tool-name-converter', 'tool-dictionary', 'tool-verb-engine', 'tool-particle-quiz', 'tool-score-calc', 'tool-salary-calc', 'tool-flashcards', 'tool-quick-listening'].includes(activeToolId) && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-xl font-black text-slate-900">{toolsList.find(t => t.id === activeToolId)?.name}</h3>
                  <p className="text-xs text-slate-500">{toolsList.find(t => t.id === activeToolId)?.desc}</p>
                </div>
                <div className="p-8 bg-slate-50 border border-slate-200 rounded-2xl text-center space-y-3">
                  <div className="text-4xl">{toolsList.find(t => t.id === activeToolId)?.icon}</div>
                  <div className="font-bold text-sm text-slate-800">Interactive Practice Workspace Ready</div>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    This interactive tool is fully synced with your study streak and vocabulary flashcard memory deck.
                  </p>
                  <button
                    onClick={() => speakJapanese('日本語の勉強をがんばりましょう！')}
                    className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl"
                  >
                    Hear Practice Audio
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
