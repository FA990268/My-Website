import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { SECTIONS_CONFIG, Question } from '../types';
import {
  Clock,
  LogOut,
  ChevronDown,
  Volume2,
  FileText,
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Eye,
  Sliders,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Upload,
  FileUp
} from 'lucide-react';

interface SplitScreenLiveExamProps {
  onToggleMode?: () => void;
}

export const SplitScreenLiveExam: React.FC<SplitScreenLiveExamProps> = ({ onToggleMode }) => {
  const {
    currentUser,
    mockTests,
    questions,
    activeAttempt,
    selectAnswer,
    updateTimeRemaining,
    submitExam,
    navigateTo,
    themeConfig
  } = useApp();

  // Glass opacity slider state (0 to 100)
  const [glassOpacity, setGlassOpacity] = useState<number>(themeConfig.glassOpacity || 75);

  // Mobile view tab toggle: 'paper' (PDF Stimulus) vs 'omr' (Answer Sheet)
  const [mobileTab, setMobileTab] = useState<'paper' | 'omr'>('paper');

  // Active section selection
  const [activeSectionNum, setActiveSectionNum] = useState<1 | 2 | 3 | 4>(
    activeAttempt?.current_section || 1
  );

  // Finish exam modal & Exit modal
  const [showFinishModal, setShowFinishModal] = useState<boolean>(false);
  const [showExitModal, setShowExitModal] = useState<boolean>(false);

  // PDF controls & zoom
  const [pdfZoom, setPdfZoom] = useState<number>(100);

  // Local file input ref for on-the-fly PDF swap
  const localPdfInputRef = useRef<HTMLInputElement>(null);

  // Redirect if no active attempt
  useEffect(() => {
    if (!activeAttempt) {
      navigateTo('mock-tests');
    }
  }, [activeAttempt, navigateTo]);

  if (!activeAttempt) return null;

  const currentTest = mockTests.find(t => t.id === activeAttempt.mock_test_id);

  // Get questions for this mock test
  const allTestQuestions = questions.filter(
    q => q.mock_test_id === activeAttempt.mock_test_id
  );

  // =========================================================================
  // CORE FEATURE 2: DYNAMIC PDF BINDING (100% Reliable Fix)
  // Resolves the exact uploaded PDF from:
  // 1. currentTest?.master_pdf_url
  // 2. Question.pdf_url
  // 3. Persistent localStorage keys ('jft_admin_active_pdf_url' / 'jft_admin_active_pdf_data')
  // =========================================================================
  const [activePdfUrl, setActivePdfUrl] = useState<string | null>(() => {
    return (
      currentTest?.master_pdf_url ||
      allTestQuestions.find(q => Boolean(q.pdf_url))?.pdf_url ||
      localStorage.getItem('jft_admin_active_pdf_url') ||
      localStorage.getItem('jft_admin_active_pdf_data') ||
      null
    );
  });

  const [activePdfName, setActivePdfName] = useState<string>(() => {
    return (
      localStorage.getItem('jft_admin_active_pdf_name') ||
      currentTest?.title ||
      'Exam_Question_Paper.pdf'
    );
  });

  useEffect(() => {
    const resolved =
      currentTest?.master_pdf_url ||
      allTestQuestions.find(q => Boolean(q.pdf_url))?.pdf_url ||
      localStorage.getItem('jft_admin_active_pdf_url') ||
      localStorage.getItem('jft_admin_active_pdf_data') ||
      null;

    if (resolved) {
      setActivePdfUrl(resolved);
    }
    if (currentTest?.title) {
      setActivePdfName(currentTest.title);
    }
  }, [currentTest, allTestQuestions]);

  // Handle local PDF upload right on the Live Exam screen
  const handleLocalPdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setActivePdfUrl(url);
    setActivePdfName(file.name);
    try {
      localStorage.setItem('jft_admin_active_pdf_url', url);
      localStorage.setItem('jft_admin_active_pdf_name', file.name);
    } catch (err) {
      console.warn('LocalStorage error:', err);
    }
    e.target.value = '';
  };

  // Get distinct section numbers present in this test
  const existingSectionNumbers = Array.from(
    new Set(allTestQuestions.map(q => q.section_number))
  ).sort((a, b) => a - b);

  // Filter questions for active section
  const sectionQuestions = allTestQuestions
    .filter(q => q.section_number === activeSectionNum)
    .sort((a, b) => a.question_order - b.question_order);

  // Fallback to all questions if section filtering is empty
  const displayQuestions = sectionQuestions.length > 0 ? sectionQuestions : allTestQuestions;

  // Active section title
  const activeSectionTitle =
    displayQuestions[0]?.prompt_text?.match(/【([^】]+)】/)?.[1] ||
    (SECTIONS_CONFIG[activeSectionNum]
      ? `${SECTIONS_CONFIG[activeSectionNum].titleEn}`
      : 'GMJG');

  // Format countdown seconds into mm:ss
  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Live Countdown Timer
  useEffect(() => {
    const timer = setInterval(() => {
      if (activeAttempt.time_remaining_seconds <= 1) {
        clearInterval(timer);
        updateTimeRemaining(0);
        submitExam();
        navigateTo('result-sheet', { attemptId: activeAttempt.id });
      } else {
        updateTimeRemaining(activeAttempt.time_remaining_seconds - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [activeAttempt.time_remaining_seconds, updateTimeRemaining, submitExam, navigateTo]);

  // Handle Option Selection
  const handleSelectOption = (questionId: string, optionNumber: 1 | 2 | 3 | 4) => {
    // optionNumber 1..4 maps to optionIndex 0..3
    selectAnswer(questionId, optionNumber - 1);
  };

  // Handle Finish Exam
  const handleConfirmFinish = () => {
    setShowFinishModal(false);
    const completedAttempt = submitExam();
    if (completedAttempt) {
      navigateTo('result-sheet', { attemptId: completedAttempt.id });
    } else {
      navigateTo('dashboard');
    }
  };

  // Answered count
  const totalAnswered = Object.keys(activeAttempt.answers).length;
  const candidateName = currentUser.full_name?.toUpperCase() || 'JIT HALDAR';

  return (
    <div
      className="w-full min-w-full h-screen flex flex-col bg-[#0b0e17] text-white font-sans select-none overflow-hidden relative"
      style={{
        backgroundColor: `rgba(11, 14, 23, ${glassOpacity / 100 + 0.1})`
      }}
    >
      {/* Hidden PDF file input for instant in-exam upload/swap */}
      <input
        ref={localPdfInputRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={handleLocalPdfChange}
      />

      {/* =========================================================================
          TOP STICKY HEADER (Matches Screenshot 2 & 3 Exactly, Fully Responsive)
          Left: EXIT, Center-Left: 59:59 box, Center-Right: CANDIDATE: [NAME], Right: FINISH
          ========================================================================= */}
      <header className="sticky top-0 z-50 bg-[#101420] border-b border-[#1c2438] px-3 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between shadow-xl w-full">
        {/* Left: EXIT Button & Mobile View Switcher */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowExitModal(true)}
            className="bg-[#232a3d] hover:bg-[#2d364f] text-slate-300 hover:text-white font-bold text-xs sm:text-sm px-4 sm:px-6 py-1.5 sm:py-2 rounded-xl uppercase tracking-wider transition shadow-sm"
          >
            EXIT
          </button>

          {onToggleMode && (
            <button
              onClick={onToggleMode}
              className="hidden xl:flex text-[10px] text-slate-400 hover:text-white bg-[#1a2030] px-2.5 py-1.5 rounded-lg border border-[#2b354e] font-semibold"
              title="Switch to Classic Prometric View"
            >
              Classic CBT
            </button>
          )}

          {/* Mobile Tab Switcher (Visible on Screens < lg) */}
          <div className="flex lg:hidden items-center bg-[#151c2e] p-1 rounded-xl border border-[#232f4a] ml-1">
            <button
              onClick={() => setMobileTab('paper')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                mobileTab === 'paper' ? 'bg-[#2563eb] text-white shadow-xs' : 'text-slate-400'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Paper</span>
            </button>
            <button
              onClick={() => setMobileTab('omr')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                mobileTab === 'omr' ? 'bg-[#2563eb] text-white shadow-xs' : 'text-slate-400'
              }`}
            >
              <CheckCircle className="w-3.5 h-3.5" />
              <span>OMR ({totalAnswered})</span>
            </button>
          </div>
        </div>

        {/* Center-Left: Red Digital Countdown Timer Box (59:59) */}
        <div className="bg-[#1c1218] border border-red-500/60 rounded-xl px-4 sm:px-8 py-1 shadow-inner shadow-red-950/70 flex items-center justify-center">
          <span className="text-[#ef4444] font-mono font-black text-lg sm:text-2xl tracking-widest drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]">
            {formatTime(activeAttempt.time_remaining_seconds)}
          </span>
        </div>

        {/* Center-Right: CANDIDATE: [Name] in Cyan Text + Institute Name */}
        <div className="hidden md:flex items-center gap-2.5">
          {themeConfig.customLogoUrl && (
            <img
              src={themeConfig.customLogoUrl}
              alt="Logo"
              className="w-6 h-6 object-contain rounded p-0.5 bg-white/10 border border-white/20"
            />
          )}
          <span className="text-[#38bdf8] font-bold text-xs sm:text-sm uppercase tracking-widest drop-shadow-[0_0_6px_rgba(56,189,248,0.4)]">
            CANDIDATE: {candidateName}
          </span>
          <span className="text-slate-600 text-xs">|</span>
          <span className="text-slate-300 font-extrabold text-[11px] uppercase tracking-wider hidden lg:inline">
            {themeConfig.instituteName}
          </span>
        </div>

        {/* Right: Red Pill-shaped FINISH Button */}
        <div>
          <button
            onClick={() => setShowFinishModal(true)}
            className="bg-[#ef4444] hover:bg-[#dc2626] text-white font-black text-xs sm:text-sm px-5 sm:px-8 py-1.5 sm:py-2 rounded-full uppercase tracking-wider shadow-lg shadow-red-500/40 transition active:scale-95"
          >
            FINISH
          </button>
        </div>
      </header>

      {/* =========================================================================
          MAIN WORKSPACE: FULL-WIDTH SPLIT-SCREEN (70% Left Pane / 30% Right Pane)
          Zero empty space on sides, 100% viewport coverage
          ========================================================================= */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden w-full h-[calc(100vh-60px)]">
        {/* =====================================================================
            LEFT PANE (70% WIDTH ON DESKTOP): PDF QUESTION PAPER VIEWER
            Displays the EXACT uploaded PDF with instant swap & new tab options!
            ===================================================================== */}
        <div
          className={`${
            mobileTab === 'paper' ? 'flex' : 'hidden lg:flex'
          } w-full lg:w-[70%] h-full bg-[#101422] border-r border-[#1c2336] flex-col relative overflow-hidden`}
        >
          {/* Top Sub-Bar for PDF Controls */}
          <div className="bg-[#131929] border-b border-[#1f283d] px-3 sm:px-4 py-2 flex items-center justify-between text-xs text-slate-300 select-none">
            <div className="flex items-center gap-2 truncate max-w-[280px] sm:max-w-md">
              <FileText className="w-4 h-4 text-rose-400 shrink-0" />
              <span className="font-bold text-white truncate text-xs">
                {activePdfName}
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => localPdfInputRef.current?.click()}
                className="px-2.5 py-1 bg-[#1e273d] hover:bg-[#2b3755] text-blue-300 rounded-lg font-bold text-[11px] transition flex items-center gap-1 border border-blue-500/30"
                title="Change or upload PDF paper"
              >
                <FileUp className="w-3 h-3" />
                <span>Upload PDF</span>
              </button>

              {activePdfUrl && (
                <a
                  href={activePdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1 bg-[#1e273d] hover:bg-[#2b3755] text-slate-300 hover:text-white rounded-lg text-xs"
                  title="Open PDF in new tab"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>

          {/* PDF Viewer Container - Full Bleed */}
          <div className="flex-1 overflow-auto bg-[#0d101a] relative flex justify-center p-1 sm:p-2 md:p-3 w-full h-full">
            {activePdfUrl ? (
              <iframe
                src={activePdfUrl}
                title="Exam Question Paper PDF"
                className="w-full h-full border-none rounded-none sm:rounded-xl bg-white shadow-2xl"
              />
            ) : (
              /* Fallback Interactive Exam Paper if no custom PDF uploaded yet */
              <div
                style={{ transform: `scale(${pdfZoom / 100})`, transformOrigin: 'top center' }}
                className="transition-transform duration-150 ease-out bg-white text-slate-900 shadow-2xl border border-slate-300 rounded-none sm:rounded-xl p-4 sm:p-8 max-w-4xl w-full min-h-[850px] flex flex-col justify-between"
              >
                <div>
                  {/* Paper Header */}
                  <div className="border-b-2 border-slate-900 pb-3 mb-6 flex items-start justify-between">
                    <div>
                      <div className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">
                        Japan Foundation & Prometric CBT Examination Materials
                      </div>
                      <h2 className="text-xl font-black text-slate-900 font-japanese mt-0.5">
                        {currentTest?.title || 'JFT-Basic Official Master Examination Paper'}
                      </h2>
                      <div className="text-xs text-rose-600 font-bold font-japanese mt-1">
                        【問題冊子：文字・語彙・会話・聴解・読解 総合問題】
                      </div>
                    </div>
                    <span className="border-2 border-slate-900 text-slate-900 px-3 py-1 text-xs font-mono font-bold rounded">
                      Sheet P-1
                    </span>
                  </div>

                  {/* Sample Authentic Japanese Stimulus Documents */}
                  <div className="space-y-6 font-japanese text-xs sm:text-sm text-slate-800 leading-relaxed">
                    <div className="bg-slate-50 border border-slate-300 p-4 rounded-xl">
                      <p className="font-bold text-slate-900">
                        【もんだい 1】つぎの ぶんの ＿＿＿の ことばの よみかたとして、もっとも よい ものを １・２・３・４から ひとつ えらんでください。
                      </p>
                    </div>

                    <div className="space-y-4 pl-3">
                      <div className="border-b border-slate-100 pb-2">
                        <span className="font-black text-slate-900 mr-2">問 1:</span>
                        <span>あしたは <span className="font-bold underline decoration-rose-500 underline-offset-4">友だち</span> と 駅の 前で 会います。</span>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2 text-xs font-mono text-slate-600">
                          <div>１. あいます</div>
                          <div>２. いいます</div>
                          <div>３. かいます</div>
                          <div>４. すいます</div>
                        </div>
                      </div>

                      <div className="border-b border-slate-100 pb-2">
                        <span className="font-black text-slate-900 mr-2">問 2:</span>
                        <span>部屋の 電気の スイッチを <span className="font-bold underline decoration-rose-500 underline-offset-4">消して</span> ください。</span>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2 text-xs font-mono text-slate-600">
                          <div>１. つけて</div>
                          <div>２. けして</div>
                          <div>３. だして</div>
                          <div>４. おして</div>
                        </div>
                      </div>

                      <div className="border-b border-slate-100 pb-2">
                        <span className="font-black text-slate-900 mr-2">問 3:</span>
                        <span>毎月 25日までに、へやの やちんを（　）なければ なりません。</span>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2 text-xs font-mono text-slate-600">
                          <div>１. はらわ</div>
                          <div>２. ひろわ</div>
                          <div>３. てつだわ</div>
                          <div>４. もらわ</div>
                        </div>
                      </div>
                    </div>

                    {/* Workplace Notice Material */}
                    <div className="border-2 border-slate-800 p-4 rounded-xl bg-sky-50/60 mt-6">
                      <div className="border-b border-slate-400 pb-2 mb-3 flex items-center justify-between">
                        <h4 className="font-bold text-sm text-slate-900 font-japanese">
                          【社内連絡：健康診断（けんこうしんだん）の お知らせ】
                        </h4>
                        <span className="text-[10px] text-slate-500 font-mono">資料 1</span>
                      </div>
                      <p className="text-slate-800 text-xs leading-normal">
                        日時：11月14日（金曜日） 午前 9:00 〜 12:00<br />
                        場所：本社 3階 第一会議室<br />
                        注意事項：当日の 朝ごはんは 食べずに 来てください。水やお茶は 飲んでも かまいません。
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-300 pt-3 mt-8 text-[10px] text-slate-400 flex justify-between">
                  <span>Prometric CBT Simulation System 2026</span>
                  <span>Japan Foundation Authorized Materials</span>
                </div>
              </div>
            )}
          </div>

          {/* Floating GLASS Opacity Slider at Bottom-Left Corner (Matches Screenshot 2 Exactly) */}
          <div className="absolute bottom-4 left-4 z-20 bg-[#161d2d]/90 backdrop-blur-md border border-[#2b3650] rounded-xl px-3.5 py-1.5 flex items-center gap-3 text-xs shadow-2xl">
            <span className="font-black text-[10px] tracking-wider text-slate-300 uppercase">
              GLASS
            </span>
            <input
              type="range"
              min="20"
              max="100"
              value={glassOpacity}
              onChange={e => setGlassOpacity(Number(e.target.value))}
              className="w-20 sm:w-24 h-1.5 bg-[#253048] rounded-lg appearance-none cursor-pointer accent-[#2563eb]"
              title="Adjust background glassmorphism opacity"
            />
          </div>

          {/* Mobile Quick Action Pill: Switch to Answer Sheet */}
          <div className="lg:hidden absolute bottom-4 right-4 z-20">
            <button
              onClick={() => setMobileTab('omr')}
              className="bg-[#2563eb] hover:bg-blue-600 text-white font-bold text-xs px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-1.5 animate-bounce"
            >
              <span>Answer Sheet ({totalAnswered}/{displayQuestions.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Zoom Controls on Left Bottom-Right (Desktop) */}
          {!activePdfUrl && (
            <div className="hidden sm:flex absolute bottom-4 right-4 lg:right-4 z-20 bg-[#161d2d]/90 backdrop-blur-md border border-[#2b3650] rounded-xl px-2.5 py-1 items-center gap-2 text-xs shadow-xl">
              <button
                onClick={() => setPdfZoom(z => Math.max(z - 15, 60))}
                className="text-slate-300 hover:text-white p-1"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-[10px] font-mono text-slate-300 w-9 text-center">{pdfZoom}%</span>
              <button
                onClick={() => setPdfZoom(z => Math.min(z + 15, 180))}
                className="text-slate-300 hover:text-white p-1"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* =====================================================================
            RIGHT PANE (30% WIDTH ON DESKTOP): OMR ANSWER SHEET & AUDIO SIDEBAR
            Matches Screenshot 2 (With Audio) & Screenshot 3 (Without Audio)
            Supports unlimited questions with smooth scrolling!
            ===================================================================== */}
        <div
          className={`${
            mobileTab === 'omr' ? 'flex' : 'hidden lg:flex'
          } w-full lg:w-[30%] h-full bg-[#0d101a] overflow-y-auto p-3 sm:p-5 space-y-4 flex-col relative`}
          style={{
            backgroundColor: `rgba(13, 16, 26, ${glassOpacity / 100})`
          }}
        >
          {/* Mobile Back Button to View Paper */}
          <div className="lg:hidden flex items-center justify-between pb-2 border-b border-[#1f283d]">
            <button
              onClick={() => setMobileTab('paper')}
              className="text-blue-400 hover:text-blue-300 font-bold text-xs flex items-center gap-1 bg-[#162035] px-3 py-1.5 rounded-xl border border-blue-500/30"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Question Paper</span>
            </button>
            <span className="text-xs text-slate-400 font-mono">
              Answered: {totalAnswered}/{displayQuestions.length}
            </span>
          </div>

          {/* Section Selection Bar (if multiple sections exist) */}
          {existingSectionNumbers.length > 1 && (
            <div className="flex items-center gap-1.5 bg-[#141926] p-1 rounded-xl border border-[#1e2538] overflow-x-auto w-full">
              {existingSectionNumbers.map(num => (
                <button
                  key={num}
                  onClick={() => setActiveSectionNum(num as 1 | 2 | 3 | 4)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition whitespace-nowrap ${
                    activeSectionNum === num
                      ? 'bg-[#2563eb] text-white shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Sec {num}
                </button>
              ))}
            </div>
          )}

          {/* Section Header Banner in Blue-Bordered Box (Matches Screenshot 2 & 3) */}
          <div className="border-2 border-[#2563eb] bg-[#141b2f] rounded-xl px-4 py-2.5 text-white font-black text-sm tracking-wide shadow-md flex items-center justify-between w-full">
            <span className="uppercase">{activeSectionTitle}</span>
            <span className="text-[11px] font-normal text-blue-300">
              {displayQuestions.length} Questions
            </span>
          </div>

          {/* List of Question Cards - Dynamically renders as many questions as exist */}
          <div className="space-y-3.5 w-full pb-8">
            {displayQuestions.map((q, idx) => {
              const questionNumber = q.question_order || idx + 1;
              const hasAudio = Boolean(q.audio_url);
              const selectedOptionIdx = activeAttempt.answers[q.id];

              return (
                <div
                  key={q.id}
                  className="bg-[#151a28] border border-[#21293e] rounded-2xl p-3.5 sm:p-4 space-y-3 shadow-md hover:border-[#2f3b58] transition w-full"
                >
                  {/* Card Header: "Question X" on Left, "1 Pts" on Right */}
                  <div className="flex items-center justify-between">
                    <span className="text-white font-bold text-xs sm:text-sm">
                      Question {questionNumber}
                    </span>
                    <span className="text-slate-400 font-medium text-xs">
                      1 Pts
                    </span>
                  </div>

                  {/* =============================================================
                      CONDITIONAL AUDIO PLAYER (Update 2 vs Update 3)
                      - If question has audio: Render clean HTML5 audio player (Screenshot 2)
                      - If no audio: Hide player completely, keep compact (Screenshot 3)
                      ============================================================= */}
                  {hasAudio && (
                    <div className="w-full pt-1">
                      <audio
                        controls
                        src={q.audio_url}
                        className="w-full h-10 rounded-full bg-slate-200 outline-none"
                      />
                    </div>
                  )}

                  {/* =============================================================
                      4 SELECTABLE OPTION BUTTONS (1, 2, 3, 4)
                      ============================================================= */}
                  <div className="grid grid-cols-4 gap-2 pt-1 w-full">
                    {[1, 2, 3, 4].map(optNum => {
                      // optNum 1..4 corresponds to index 0..3
                      const isSelected = selectedOptionIdx === optNum - 1;

                      return (
                        <button
                          key={optNum}
                          onClick={() => handleSelectOption(q.id, optNum as 1 | 2 | 3 | 4)}
                          className={`py-2 rounded-xl font-bold text-sm text-center transition flex items-center justify-center border ${
                            isSelected
                              ? 'bg-[#2563eb] text-white border-blue-400 ring-2 ring-blue-500/50 shadow-md shadow-blue-500/30'
                              : 'bg-[#21283d] hover:bg-[#2a344f] text-slate-200 border-transparent hover:border-slate-600'
                          }`}
                        >
                          {optNum}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Summary Pill at Bottom */}
          <div className="pt-2 pb-6 text-center text-xs text-slate-500">
            {totalAnswered} of {allTestQuestions.length} Questions Answered
          </div>
        </div>
      </div>

      {/* =========================================================================
          MODAL: FINISH EXAM CONFIRMATION
          ========================================================================= */}
      {showFinishModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#141926] border border-[#2b354e] rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-5 shadow-2xl text-center animate-in fade-in zoom-in-95">
            <div className="w-14 h-14 bg-red-500/10 text-red-400 border border-red-500/30 rounded-2xl flex items-center justify-center mx-auto">
              <AlertTriangle className="w-7 h-7" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-lg font-black text-white">
                Submit & Finish Exam?
              </h3>
              <p className="text-xs text-slate-400">
                You have answered <strong className="text-white">{totalAnswered}</strong> of{' '}
                <strong className="text-white">{allTestQuestions.length}</strong> questions.
                Once submitted, your official score certificate and AI report will be generated.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setShowFinishModal(false)}
                className="flex-1 px-4 py-2.5 bg-[#20273a] hover:bg-[#28324a] text-slate-300 font-bold rounded-xl text-xs uppercase tracking-wider transition"
              >
                Back to Exam
              </button>
              <button
                onClick={handleConfirmFinish}
                className="flex-1 px-4 py-2.5 bg-[#ef4444] hover:bg-[#dc2626] text-white font-black rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-red-500/40 transition"
              >
                Yes, Finish Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: EXIT CONFIRMATION
          ========================================================================= */}
      {showExitModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#141926] border border-[#2b354e] rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl text-center">
            <h3 className="text-base font-bold text-white">
              Exit Live CBT Exam?
            </h3>
            <p className="text-xs text-slate-400">
              Your answers will be saved. You can resume this exam later from your dashboard.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setShowExitModal(false)}
                className="flex-1 px-4 py-2 bg-[#20273a] text-slate-300 rounded-xl text-xs font-bold"
              >
                Continue Exam
              </button>
              <button
                onClick={() => {
                  setShowExitModal(false);
                  navigateTo('mock-tests');
                }}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-bold"
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
