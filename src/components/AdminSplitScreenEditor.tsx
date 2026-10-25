import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import {
  Question,
  MockTest,
  QuestionMode,
  SECTIONS_CONFIG
} from '../types';
import { getQuestionsForTest } from '../lib/questionService';
import { renderFurigana } from '../lib/furigana';
import {
  Upload,
  Volume2,
  FileText,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCw,
  ExternalLink,
  Play,
  Pause,
  Plus,
  Trash2,
  ArrowRight,
  ArrowLeft,
  Save,
  Sparkles,
  Layers,
  RefreshCw,
  AlertCircle,
  FileUp,
  Music,
  Check,
  Columns,
  Maximize2,
  Image as ImageIcon,
  Eye,
  X
} from 'lucide-react';

interface AdminSplitScreenEditorProps {
  selectedTestId: string;
  onSelectTestId: (testId: string) => void;
}

export const AdminSplitScreenEditor: React.FC<AdminSplitScreenEditorProps> = ({
  selectedTestId,
  onSelectTestId
}) => {
  const {
    mockTests,
    questions,
    saveQuestion,
    deleteQuestion,
    importQuestionsBatch,
    updateMockTest
  } = useApp();

  const currentTest = mockTests.find(t => t.id === selectedTestId) || mockTests[0];

  // Layout & View Mode States
  const [layoutRatio, setLayoutRatio] = useState<'split' | 'wide-left' | 'wide-right'>('split');
  const [selectedSectionNumber, setSelectedSectionNumber] = useState<1 | 2 | 3 | 4>(1);
  const [activeQuestionOrder, setActiveQuestionOrder] = useState<number>(1);
  const [pdfViewMode, setPdfViewMode] = useState<'interactive_paper' | 'custom_pdf'>(
    currentTest?.master_pdf_url ? 'custom_pdf' : 'interactive_paper'
  );
  const [customPdfUrl, setCustomPdfUrl] = useState<string | null>(currentTest?.master_pdf_url || null);
  const [customPdfName, setCustomPdfName] = useState<string | null>(currentTest?.master_pdf_url ? 'Test_Question_Paper.pdf' : null);
  const [pdfPage, setPdfPage] = useState<number>(1);
  const [pdfZoom, setPdfZoom] = useState<number>(100);

  // Active question editing form state
  const [formPromptText, setFormPromptText] = useState<string>('');
  const [formQuestionMode, setFormQuestionMode] = useState<QuestionMode>('text_image');
  const [formOptions, setFormOptions] = useState<{ id: string; label: 'A' | 'B' | 'C' | 'D'; text: string }[]>([
    { id: 'opt_1', label: 'A', text: '' },
    { id: 'opt_2', label: 'B', text: '' },
    { id: 'opt_3', label: 'C', text: '' },
    { id: 'opt_4', label: 'D', text: '' }
  ]);
  const [formCorrectIndex, setFormCorrectIndex] = useState<number>(0);
  const [formExplanation, setFormExplanation] = useState<string>('');
  const [formAudioUrl, setFormAudioUrl] = useState<string>('');
  const [formImageUrl, setFormImageUrl] = useState<string>('');
  const [formPdfPage, setFormPdfPage] = useState<number>(1);

  // Bulk Upload feedback modal / toast
  const [bulkModalData, setBulkModalData] = useState<{
    type: 'audio' | 'image';
    count: number;
    mappings: { order: number; fileName: string; questionId: string }[];
  } | null>(null);

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [saveSuccessAnim, setSaveSuccessAnim] = useState<boolean>(false);

  // File input refs
  const bulkAudioInputRef = useRef<HTMLInputElement>(null);
  const bulkImageInputRef = useRef<HTMLInputElement>(null);
  const masterPdfInputRef = useRef<HTMLInputElement>(null);
  const activeAudioPlayerRef = useRef<HTMLAudioElement>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  // Ensure questions exist for the selected test
  useEffect(() => {
    const directMatches = questions.filter(q => q.mock_test_id === selectedTestId);
    if (directMatches.length === 0) {
      const generated = getQuestionsForTest(selectedTestId, questions);
      if (generated.length > 0) {
        importQuestionsBatch(generated);
      }
    }
  }, [selectedTestId, questions, importQuestionsBatch]);

  // Questions for current test & section
  const sectionQuestions = questions
    .filter(q => q.mock_test_id === selectedTestId && q.section_number === selectedSectionNumber)
    .sort((a, b) => a.question_order - b.question_order);

  // Active question object
  const activeQuestion = sectionQuestions.find(q => q.question_order === activeQuestionOrder) || sectionQuestions[0];

  // Synchronize form when active question or section changes
  useEffect(() => {
    if (activeQuestion) {
      setFormPromptText(activeQuestion.prompt_text || '');
      setFormQuestionMode(activeQuestion.question_mode || (selectedSectionNumber === 3 ? 'audio_mcq' : 'text_image'));
      setFormOptions(
        activeQuestion.options && activeQuestion.options.length === 4
          ? activeQuestion.options.map((opt, i) => ({
              id: opt.id || `opt_${i + 1}`,
              label: (['A', 'B', 'C', 'D'][i] || 'A') as 'A' | 'B' | 'C' | 'D',
              text: opt.text || ''
            }))
          : [
              { id: 'opt_1', label: 'A', text: '' },
              { id: 'opt_2', label: 'B', text: '' },
              { id: 'opt_3', label: 'C', text: '' },
              { id: 'opt_4', label: 'D', text: '' }
            ]
      );
      setFormCorrectIndex(activeQuestion.correct_option_index ?? 0);
      setFormExplanation(activeQuestion.explanation || '');
      setFormAudioUrl(activeQuestion.audio_url || '');
      setFormImageUrl(activeQuestion.image_url || '');
      setFormPdfPage(activeQuestion.pdf_page || selectedSectionNumber);
      setIsPlayingAudio(false);
    } else {
      // If no question exists yet for this order
      setFormPromptText('');
      setFormQuestionMode(selectedSectionNumber === 3 ? 'audio_mcq' : 'text_image');
      setFormOptions([
        { id: 'opt_1', label: 'A', text: '' },
        { id: 'opt_2', label: 'B', text: '' },
        { id: 'opt_3', label: 'C', text: '' },
        { id: 'opt_4', label: 'D', text: '' }
      ]);
      setFormCorrectIndex(0);
      setFormExplanation('');
      setFormAudioUrl('');
      setFormImageUrl('');
      setFormPdfPage(selectedSectionNumber);
    }
  }, [activeQuestion?.id, activeQuestionOrder, selectedSectionNumber]);

  // Synchronize PDF page with active question or section
  useEffect(() => {
    setPdfPage(selectedSectionNumber);
  }, [selectedSectionNumber]);

  // Show temporary toast
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4500);
  };

  // Master PDF Upload Handler
  const handleMasterPdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setCustomPdfUrl(url);
    setCustomPdfName(file.name);
    setPdfViewMode('custom_pdf');
    updateMockTest(selectedTestId, { master_pdf_url: url });
    triggerToast(`✓ Master PDF paper "${file.name}" loaded into left viewer!`);
    e.target.value = '';
  };

  // =========================================================================
  // BULK AUDIO UPLOAD & SEQUENTIAL AUTO-MAPPING
  // =========================================================================
  const handleBulkAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const fileList = Array.from(files);
    // Sort naturally by filename (e.g. q1.mp3, q2.mp3, 10.mp3)
    fileList.sort((a, b) =>
      a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' })
    );

    const currentSecQuestions = questions
      .filter(q => q.mock_test_id === selectedTestId && q.section_number === selectedSectionNumber)
      .sort((a, b) => a.question_order - b.question_order);

    const updatedOrCreated: Question[] = [];
    const mappings: { order: number; fileName: string; questionId: string }[] = [];

    fileList.forEach((file, index) => {
      const order = index + 1;
      const audioUrl = URL.createObjectURL(file);
      const existing = currentSecQuestions.find(q => q.question_order === order);

      if (existing) {
        const updated: Question = {
          ...existing,
          audio_url: audioUrl,
          question_mode: 'audio_mcq'
        };
        updatedOrCreated.push(updated);
        mappings.push({
          order,
          fileName: file.name,
          questionId: existing.id
        });
      } else {
        const newId = `q_${selectedTestId}_s${selectedSectionNumber}_o${order}_${Date.now()}`;
        const newQ: Question = {
          id: newId,
          mock_test_id: selectedTestId,
          section_number: selectedSectionNumber,
          question_order: order,
          question_mode: 'audio_mcq',
          prompt_text: `【聴解問題 ${order}】音声を聞いて、ただしい答えを ひとつ 選んでください。`,
          audio_url: audioUrl,
          options: [
            { id: 'opt_1', label: 'A', text: 'せんたくし 1' },
            { id: 'opt_2', label: 'B', text: 'せんたくし 2' },
            { id: 'opt_3', label: 'C', text: 'せんたくし 3' },
            { id: 'opt_4', label: 'D', text: 'せんたくし 4' }
          ],
          correct_option_index: 0,
          explanation: `第${selectedSectionNumber}セクション・問題${order}の解説です。音声ファイル「${file.name}」に基づいて解答します。`,
          created_at: new Date().toISOString()
        };
        updatedOrCreated.push(newQ);
        mappings.push({
          order,
          fileName: file.name,
          questionId: newId
        });
      }
    });

    importQuestionsBatch(updatedOrCreated);

    // If active question was updated, refresh its audio in form
    if (activeQuestionOrder <= fileList.length) {
      setFormAudioUrl(URL.createObjectURL(fileList[activeQuestionOrder - 1]));
      setFormQuestionMode('audio_mcq');
    }

    setBulkModalData({
      type: 'audio',
      count: fileList.length,
      mappings
    });

    triggerToast(`✓ Sequentially mapped ${fileList.length} audio files to Section ${selectedSectionNumber} (Q1 to Q${fileList.length})!`);
    e.target.value = '';
  };

  // =========================================================================
  // BULK IMAGE UPLOAD & SEQUENTIAL AUTO-MAPPING
  // =========================================================================
  const handleBulkImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const fileList = Array.from(files);
    fileList.sort((a, b) =>
      a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' })
    );

    const currentSecQuestions = questions
      .filter(q => q.mock_test_id === selectedTestId && q.section_number === selectedSectionNumber)
      .sort((a, b) => a.question_order - b.question_order);

    const updatedOrCreated: Question[] = [];
    const mappings: { order: number; fileName: string; questionId: string }[] = [];

    fileList.forEach((file, index) => {
      const order = index + 1;
      const imageUrl = URL.createObjectURL(file);
      const existing = currentSecQuestions.find(q => q.question_order === order);

      if (existing) {
        const updated: Question = {
          ...existing,
          image_url: imageUrl
        };
        updatedOrCreated.push(updated);
        mappings.push({
          order,
          fileName: file.name,
          questionId: existing.id
        });
      } else {
        const newId = `q_${selectedTestId}_s${selectedSectionNumber}_o${order}_${Date.now()}`;
        const newQ: Question = {
          id: newId,
          mock_test_id: selectedTestId,
          section_number: selectedSectionNumber,
          question_order: order,
          question_mode: 'text_image',
          prompt_text: `【読解・資料問題 ${order}】下の 資料・案内を見て、ただしいものを えらんでください。`,
          image_url: imageUrl,
          options: [
            { id: 'opt_1', label: 'A', text: 'せんたくし 1' },
            { id: 'opt_2', label: 'B', text: 'せんたくし 2' },
            { id: 'opt_3', label: 'C', text: 'せんたくし 3' },
            { id: 'opt_4', label: 'D', text: 'せんたくし 4' }
          ],
          correct_option_index: 0,
          explanation: `資料「${file.name}」を確認してください。正解は選択肢Aです。`,
          created_at: new Date().toISOString()
        };
        updatedOrCreated.push(newQ);
        mappings.push({
          order,
          fileName: file.name,
          questionId: newId
        });
      }
    });

    importQuestionsBatch(updatedOrCreated);

    if (activeQuestionOrder <= fileList.length) {
      setFormImageUrl(URL.createObjectURL(fileList[activeQuestionOrder - 1]));
    }

    setBulkModalData({
      type: 'image',
      count: fileList.length,
      mappings
    });

    triggerToast(`✓ Sequentially mapped ${fileList.length} images to Section ${selectedSectionNumber} (Q1 to Q${fileList.length})!`);
    e.target.value = '';
  };

  // Save current active question
  const handleSaveActiveQuestion = () => {
    const questionToSave: Partial<Question> & { mock_test_id: string; section_number: 1 | 2 | 3 | 4 } = {
      id: activeQuestion?.id,
      mock_test_id: selectedTestId,
      section_number: selectedSectionNumber,
      question_order: activeQuestionOrder,
      question_mode: formQuestionMode,
      prompt_text: formPromptText,
      options: formOptions,
      correct_option_index: formCorrectIndex,
      explanation: formExplanation,
      audio_url: formAudioUrl,
      image_url: formImageUrl,
      pdf_page: formPdfPage
    };

    saveQuestion(questionToSave);
    setSaveSuccessAnim(true);
    setTimeout(() => setSaveSuccessAnim(false), 2000);
    triggerToast(`✓ Question #${activeQuestionOrder} saved successfully!`);
  };

  // Save and proceed to next question
  const handleSaveAndNext = () => {
    handleSaveActiveQuestion();
    const maxOrder = Math.max(...sectionQuestions.map(q => q.question_order), activeQuestionOrder);
    if (activeQuestionOrder < maxOrder) {
      setActiveQuestionOrder(activeQuestionOrder + 1);
    } else {
      // Create new question in this section
      const nextOrder = activeQuestionOrder + 1;
      const newQ: Question = {
        id: `q_${selectedTestId}_s${selectedSectionNumber}_o${nextOrder}_${Date.now()}`,
        mock_test_id: selectedTestId,
        section_number: selectedSectionNumber,
        question_order: nextOrder,
        question_mode: selectedSectionNumber === 3 ? 'audio_mcq' : 'text_image',
        prompt_text: '',
        options: [
          { id: 'opt_1', label: 'A', text: '' },
          { id: 'opt_2', label: 'B', text: '' },
          { id: 'opt_3', label: 'C', text: '' },
          { id: 'opt_4', label: 'D', text: '' }
        ],
        correct_option_index: 0,
        explanation: '',
        created_at: new Date().toISOString()
      };
      saveQuestion(newQ);
      setActiveQuestionOrder(nextOrder);
    }
  };

  const handleAddNewQuestion = () => {
    const nextOrder = sectionQuestions.length > 0
      ? Math.max(...sectionQuestions.map(q => q.question_order)) + 1
      : 1;

    const newQ: Question = {
      id: `q_${selectedTestId}_s${selectedSectionNumber}_o${nextOrder}_${Date.now()}`,
      mock_test_id: selectedTestId,
      section_number: selectedSectionNumber,
      question_order: nextOrder,
      question_mode: selectedSectionNumber === 3 ? 'audio_mcq' : 'text_image',
      prompt_text: '',
      options: [
        { id: 'opt_1', label: 'A', text: '' },
        { id: 'opt_2', label: 'B', text: '' },
        { id: 'opt_3', label: 'C', text: '' },
        { id: 'opt_4', label: 'D', text: '' }
      ],
      correct_option_index: 0,
      explanation: '',
      created_at: new Date().toISOString()
    };
    saveQuestion(newQ);
    setActiveQuestionOrder(nextOrder);
    triggerToast(`✓ Added Question #${nextOrder} to Section ${selectedSectionNumber}!`);
  };

  const handleDeleteActiveQuestion = () => {
    if (!activeQuestion) return;
    if (window.confirm(`Delete Question #${activeQuestionOrder}? This cannot be undone.`)) {
      deleteQuestion(activeQuestion.id);
      setActiveQuestionOrder(Math.max(1, activeQuestionOrder - 1));
      triggerToast(`Question #${activeQuestionOrder} deleted.`);
    }
  };

  // Audio test playback toggle
  const togglePlayAudio = () => {
    if (!formAudioUrl) return;
    if (!activeAudioPlayerRef.current) return;

    if (isPlayingAudio) {
      activeAudioPlayerRef.current.pause();
      setIsPlayingAudio(false);
    } else {
      activeAudioPlayerRef.current.play().then(() => {
        setIsPlayingAudio(true);
      }).catch(err => {
        console.error('Audio playback failed', err);
      });
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Hidden File Inputs */}
      <input
        ref={bulkAudioInputRef}
        type="file"
        multiple
        accept="audio/*,.mp3,.wav,.ogg,.m4a"
        className="hidden"
        onChange={handleBulkAudioUpload}
      />
      <input
        ref={bulkImageInputRef}
        type="file"
        multiple
        accept="image/*,.png,.jpg,.jpeg,.webp,.svg"
        className="hidden"
        onChange={handleBulkImageUpload}
      />
      <input
        ref={masterPdfInputRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={handleMasterPdfUpload}
      />

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-rose-500/40 flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* =========================================================================
          TOP CONTROL BAR: TEST SELECTOR, SECTIONS, BULK ACTIONS, LAYOUT TOGGLE
          ========================================================================= */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            {/* Mock Test Selector */}
            <div>
              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Active Mock Test Paper
              </span>
              <select
                value={selectedTestId}
                onChange={e => {
                  onSelectTestId(e.target.value);
                  setActiveQuestionOrder(1);
                }}
                className="px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 focus:outline-rose-500 max-w-[260px] truncate"
              >
                {mockTests.map(t => (
                  <option key={t.id} value={t.id}>
                    {t.title} ({t.category})
                  </option>
                ))}
              </select>
            </div>

            {/* Section Selector */}
            <div>
              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Target Section
              </span>
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
                {[1, 2, 3, 4].map(s => {
                  const secNum = s as 1 | 2 | 3 | 4;
                  const secQs = questions.filter(q => q.mock_test_id === selectedTestId && q.section_number === secNum);
                  const hasAudioCount = secQs.filter(q => Boolean(q.audio_url)).length;
                  const hasImgCount = secQs.filter(q => Boolean(q.image_url)).length;

                  return (
                    <button
                      key={s}
                      onClick={() => {
                        setSelectedSectionNumber(secNum);
                        setActiveQuestionOrder(1);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                        selectedSectionNumber === s
                          ? 'bg-rose-600 text-white shadow-sm'
                          : 'text-slate-700 hover:text-slate-900 hover:bg-white'
                      }`}
                    >
                      <span>Sec {s}</span>
                      <span className="text-[10px] opacity-75 font-normal">
                        ({secQs.length} Qs{hasAudioCount > 0 ? ` • ♫${hasAudioCount}` : ''}{hasImgCount > 0 ? ` • 🖼${hasImgCount}` : ''})
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bulk Upload Buttons & Layout Mode */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Bulk Audio Upload Button */}
            <button
              onClick={() => bulkAudioInputRef.current?.click()}
              className="px-3.5 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
              title="Upload multiple audio files. Sorted by name & sequentially mapped 1..N to Section questions."
            >
              <Music className="w-3.5 h-3.5 text-indigo-600" />
              <span>Bulk Audio (Auto-Map 1..N)</span>
            </button>

            {/* Bulk Image Upload Button */}
            <button
              onClick={() => bulkImageInputRef.current?.click()}
              className="px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
              title="Upload multiple image files. Sorted by name & sequentially mapped 1..N to Section questions."
            >
              <ImageIcon className="w-3.5 h-3.5 text-emerald-600" />
              <span>Bulk Images (Auto-Map 1..N)</span>
            </button>

            {/* Layout width split toggles */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => setLayoutRatio('wide-left')}
                className={`p-1.5 rounded-lg text-xs font-bold transition ${
                  layoutRatio === 'wide-left' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Expand PDF Paper Pane (65% / 35%)"
              >
                <Columns className="w-4 h-4 rotate-180" />
              </button>
              <button
                onClick={() => setLayoutRatio('split')}
                className={`p-1.5 rounded-lg text-xs font-bold transition ${
                  layoutRatio === 'split' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Equal Split Screen (50% / 50%)"
              >
                <Columns className="w-4 h-4" />
              </button>
              <button
                onClick={() => setLayoutRatio('wide-right')}
                className={`p-1.5 rounded-lg text-xs font-bold transition ${
                  layoutRatio === 'wide-right' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Expand Question Options Pane (35% / 65%)"
              >
                <Columns className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Section title banner */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-900">
              Section {selectedSectionNumber}: {SECTIONS_CONFIG[selectedSectionNumber].titleJp} ({SECTIONS_CONFIG[selectedSectionNumber].titleEn})
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-600">
              {sectionQuestions.length} Questions Configured
            </span>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-500">
            <span className="inline-flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
              Audio MCQ Supported
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Auto Sequential Mapping Active
            </span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          MAIN SPLIT-SCREEN WORKSPACE
          ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* =====================================================================
            LEFT PANEL: PDF MAIN QUESTION PAPER (Page controls, zoom, upload)
            ===================================================================== */}
        <div
          className={`${
            layoutRatio === 'wide-left'
              ? 'lg:col-span-8'
              : layoutRatio === 'wide-right'
              ? 'lg:col-span-4'
              : 'lg:col-span-6'
          } flex flex-col bg-slate-900 rounded-3xl border border-slate-700 shadow-xl overflow-hidden min-h-[750px]`}
        >
          {/* Left Panel Toolbar */}
          <div className="bg-slate-800 border-b border-slate-700 text-white px-4 py-3 flex flex-wrap items-center justify-between gap-2 select-none">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-rose-400" />
              <span className="text-xs font-bold tracking-tight truncate max-w-[200px] sm:max-w-[260px]">
                {pdfViewMode === 'custom_pdf' && customPdfName
                  ? customPdfName
                  : `Master Paper: ${currentTest.title}`}
              </span>
            </div>

            {/* View Mode Switcher & Upload */}
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-slate-700/80 p-0.5 rounded-lg text-[11px]">
                <button
                  onClick={() => setPdfViewMode('interactive_paper')}
                  className={`px-2 py-1 rounded font-bold transition ${
                    pdfViewMode === 'interactive_paper' ? 'bg-rose-600 text-white' : 'text-slate-300 hover:text-white'
                  }`}
                  title="Official interactive CBT paper simulation"
                >
                  Interactive Paper
                </button>
                <button
                  onClick={() => {
                    if (!customPdfUrl) {
                      masterPdfInputRef.current?.click();
                    } else {
                      setPdfViewMode('custom_pdf');
                    }
                  }}
                  className={`px-2 py-1 rounded font-bold transition flex items-center gap-1 ${
                    pdfViewMode === 'custom_pdf' ? 'bg-rose-600 text-white' : 'text-slate-300 hover:text-white'
                  }`}
                  title="View or upload custom PDF file"
                >
                  <FileUp className="w-3 h-3" />
                  <span>{customPdfUrl ? 'PDF File' : 'Upload PDF'}</span>
                </button>
              </div>

              {/* Upload New / Replace PDF */}
              <button
                onClick={() => masterPdfInputRef.current?.click()}
                className="p-1.5 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg text-xs"
                title="Upload or replace master PDF file"
              >
                <Upload className="w-3.5 h-3.5" />
              </button>

              {customPdfUrl && (
                <a
                  href={customPdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg text-xs"
                  title="Open PDF in new tab"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>

          {/* Sub-toolbar: Page Switcher & Zoom Controls */}
          <div className="bg-slate-800/60 border-b border-slate-700/60 px-4 py-2 flex items-center justify-between text-xs text-slate-300">
            {/* Page selection */}
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold uppercase text-slate-400">Sheet Page:</span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4].map(p => (
                  <button
                    key={p}
                    onClick={() => setPdfPage(p)}
                    className={`w-6 h-6 rounded text-xs font-bold transition flex items-center justify-center ${
                      pdfPage === p ? 'bg-rose-500 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
              <span className="text-[11px] text-slate-400 pl-1 hidden sm:inline">
                {pdfPage === 1 && '(文字・語彙)'}
                {pdfPage === 2 && '(会話・表現)'}
                {pdfPage === 3 && '(聴解スクリプト)'}
                {pdfPage === 4 && '(読解・資料)'}
              </span>
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center gap-1 bg-slate-700/80 px-2 py-0.5 rounded-lg">
              <button
                onClick={() => setPdfZoom(z => Math.max(z - 15, 60))}
                className="hover:text-white p-0.5"
                title="Zoom Out"
              >
                <ZoomOut className="w-3 h-3" />
              </button>
              <span className="text-[10px] font-mono w-9 text-center text-slate-200">{pdfZoom}%</span>
              <button
                onClick={() => setPdfZoom(z => Math.min(z + 15, 180))}
                className="hover:text-white p-0.5"
                title="Zoom In"
              >
                <ZoomIn className="w-3 h-3" />
              </button>
              <button
                onClick={() => setPdfZoom(100)}
                className="hover:text-white p-0.5 border-l border-slate-600 pl-1"
                title="Reset Zoom"
              >
                <RotateCw className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Left Panel Canvas Render Area */}
          <div className="flex-1 overflow-auto p-4 flex justify-center bg-slate-950/80 min-h-[620px]">
            {pdfViewMode === 'custom_pdf' && customPdfUrl ? (
              <div className="w-full h-full flex flex-col items-center">
                <iframe
                  src={customPdfUrl}
                  title="Master Question Paper PDF"
                  className="w-full h-full min-h-[620px] rounded-2xl border border-slate-700 bg-white"
                />
              </div>
            ) : (
              /* Realistic Prometric Japanese CBT Examination Paper Document */
              <div
                style={{ transform: `scale(${pdfZoom / 100})`, transformOrigin: 'top center' }}
                className="transition-transform duration-150 ease-out bg-white text-slate-900 shadow-2xl border border-slate-400 rounded-xl p-8 max-w-2xl w-full min-h-[680px] flex flex-col justify-between"
              >
                {/* Paper Header Banner */}
                <div>
                  <div className="border-b-2 border-slate-900 pb-3 mb-4 flex items-start justify-between">
                    <div>
                      <div className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">
                        Japan Foundation Test for Basic Japanese (JFT-Basic)
                      </div>
                      <h2 className="text-lg font-black text-slate-900 font-japanese mt-0.5">
                        {currentTest.title} — Official Question Paper Sheet
                      </h2>
                      <div className="text-xs text-rose-600 font-bold font-japanese mt-0.5">
                        {pdfPage === 1 && '第１セクション：文字と語彙（もじ・ごい）'}
                        {pdfPage === 2 && '第２セクション：会話と表現（かいわ・ひょうげん）'}
                        {pdfPage === 3 && '第３セクション：聴解（ちょうかい）会話・アナウンス'}
                        {pdfPage === 4 && '第４セクション：読解（どっかい）生活・仕事の文書'}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-block border-2 border-slate-800 text-slate-800 px-2.5 py-1 text-xs font-mono font-bold rounded">
                        Sheet P-{pdfPage} / 4
                      </span>
                    </div>
                  </div>

                  {/* Page 1: Script & Vocab Stimulus */}
                  {pdfPage === 1 && (
                    <div className="space-y-4 font-japanese text-xs leading-relaxed">
                      <div className="bg-slate-50 border border-slate-300 p-3 rounded-lg text-slate-700">
                        <p className="font-bold text-slate-900">【もんだい 1】つぎの ぶんの ＿＿＿の ことばの よみかたとして、もっとも よい ものを １・２・３・４から ひとつ えらんでください。</p>
                      </div>

                      <div className="space-y-3 pl-2">
                        <div className="p-2 border-b border-slate-100">
                          <span className="font-black text-slate-900 mr-2">問 1:</span>
                          <span>あしたは <span className="font-bold underline decoration-rose-500 underline-offset-4">友だち</span> と 駅の 前で 会います。</span>
                        </div>
                        <div className="p-2 border-b border-slate-100">
                          <span className="font-black text-slate-900 mr-2">問 2:</span>
                          <span>部屋の 電気の スイッチを <span className="font-bold underline decoration-rose-500 underline-offset-4">消して</span> ください。</span>
                        </div>
                        <div className="p-2 border-b border-slate-100">
                          <span className="font-black text-slate-900 mr-2">問 3:</span>
                          <span>この <span className="font-bold underline decoration-rose-500 underline-offset-4">料理</span> は とても おいしいです。</span>
                        </div>
                        <div className="p-2 border-b border-slate-100">
                          <span className="font-black text-slate-900 mr-2">問 4:</span>
                          <span>日本の <span className="font-bold underline decoration-rose-500 underline-offset-4">生活</span> に だいぶ 慣れました。</span>
                        </div>
                      </div>

                      <div className="bg-slate-50 border border-slate-300 p-3 rounded-lg text-slate-700 mt-4">
                        <p className="font-bold text-slate-900">【もんだい 2】（　）に 何を 入れますか。もっとも よい ものを １・２・３・４から ひとつ えらんでください。</p>
                      </div>

                      <div className="space-y-3 pl-2">
                        <div className="p-2 border-b border-slate-100">
                          <span className="font-black text-slate-900 mr-2">問 5:</span>
                          <span>毎月 25日までに、へやの やちんを（　）なければ なりません。</span>
                        </div>
                        <div className="p-2 border-b border-slate-100">
                          <span className="font-black text-slate-900 mr-2">問 6:</span>
                          <span>けがを 予防するために、必（かなら）ず 安全靴（あんぜんぐつ）を（　）ください。</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Page 2: Conversation & Expression Stimulus */}
                  {pdfPage === 2 && (
                    <div className="space-y-4 font-japanese text-xs leading-relaxed">
                      <div className="bg-sky-50 border-l-4 border-sky-600 p-3 rounded-r text-slate-700">
                        <p className="font-bold text-sky-950">【会話場面 1: 職場で 上司に 相談します】</p>
                        <p className="text-slate-600 mt-1">
                          A:「田中主任、いま 少し お時間 よろしいでしょうか。」<br />
                          B:「ええ、いいですよ。どうしましたか。」<br />
                          A:「来週の 火曜日に 市役所へ 行かなければ ならないのですが、（　）。」
                        </p>
                      </div>

                      <div className="bg-amber-50 border-l-4 border-amber-600 p-3 rounded-r text-slate-700">
                        <p className="font-bold text-amber-950">【会話場面 2: 病院の 受付で 症状を 伝えます】</p>
                        <p className="text-slate-600 mt-1">
                          患者:「すみません、きのうから 熱が あって、のども 痛いんです。」<br />
                          受付:「わかりました。こちらの 問診票（もんしんひょう）に（　）をお書きになって、お待ちください。」
                        </p>
                      </div>

                      <div className="bg-emerald-50 border-l-4 border-emerald-600 p-3 rounded-r text-slate-700">
                        <p className="font-bold text-emerald-950">【会話場面 3: スーパーの レジで 買い物を します】</p>
                        <p className="text-slate-600 mt-1">
                          店員:「お会計は 2,480円で ございます。ポイントカードは お持ちですか。」<br />
                          客:「はい、（　）。」
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Page 3: Listening Comprehension Stimulus */}
                  {pdfPage === 3 && (
                    <div className="space-y-4 font-japanese text-xs leading-relaxed">
                      <div className="bg-indigo-50 border border-indigo-200 p-3 rounded-lg text-slate-700">
                        <div className="flex items-center gap-2 text-indigo-900 font-bold mb-1">
                          <Volume2 className="w-4 h-4 text-indigo-600" />
                          <span>【聴解スクリプト資料】問題 1〜12 の 音声テキスト対応表</span>
                        </div>
                        <p className="text-slate-600 text-[11px]">
                          右側の「Bulk Audio Upload」ボタンでセクション3の音声を一括登録できます（自動で Q1〜Q12 に順次マッピングされます）。
                        </p>
                      </div>

                      <div className="space-y-3">
                        <div className="border border-slate-200 p-3 rounded bg-slate-50">
                          <span className="font-black text-rose-600">問題 1（音声トラック 01）:</span>
                          <p className="mt-1 text-slate-800">
                            女の人と 男の人が 会社の 会議室で 話しています。男の人は このあと まず 何を しますか。<br />
                            女:「木村さん、午後の ミーティングの 資料、もう 印刷してくれた？」<br />
                            男:「あ、まだです。すぐに コピー機へ 行ってきます！」
                          </p>
                        </div>

                        <div className="border border-slate-200 p-3 rounded bg-slate-50">
                          <span className="font-black text-rose-600">問題 2（駅構内アナウンス 02）:</span>
                          <p className="mt-1 text-slate-800">
                            駅で アナウンスが 流れています。新宿方面へ 行く 人は、何番ホームの 電車に 乗らなければ なりませんか。<br />
                            「本日、中央線は 点検のため ダイヤが 乱れております。お急ぎのお客様は 3番線の 快速電車をご利用ください。」
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Page 4: Reading Comprehension Stimulus */}
                  {pdfPage === 4 && (
                    <div className="space-y-4 font-japanese text-xs leading-relaxed">
                      {/* Document Notice 1 */}
                      <div className="border-2 border-slate-800 p-4 rounded-lg bg-sky-50/50">
                        <div className="border-b border-slate-400 pb-2 mb-2 flex justify-between items-center">
                          <h4 className="font-bold text-sm text-slate-900">【市民図書館 利用案内】</h4>
                          <span className="text-[10px] text-slate-500 font-mono">資料 1</span>
                        </div>
                        <p className="text-slate-800 font-medium">
                          ■ 開館時間：火曜日〜日曜日（午前 9:00 〜 午後 19:00）<br />
                          ■ 休館日：毎週月曜日（祝日の場合は 翌火曜日が休館）<br />
                          ■ 返却について：閉館中は 正面入口横の「返却ブックポスト」をご利用ください。<br />
                          <span className="text-red-700 font-bold">※注意：CD・DVDなどの壊れやすいメディアは ポストに入れないでください。</span>
                        </p>
                      </div>

                      {/* Document Notice 2 */}
                      <div className="border-2 border-slate-800 p-4 rounded-lg bg-emerald-50/50">
                        <div className="border-b border-slate-400 pb-2 mb-2 flex justify-between items-center">
                          <h4 className="font-bold text-sm text-slate-900">【資源ゴミ（ペットボトル）の 分別ルール】</h4>
                          <span className="text-[10px] text-slate-500 font-mono">資料 2</span>
                        </div>
                        <div className="space-y-1 text-slate-800">
                          <p>① キャップと ラベルは 必ず はずして、プラスチック容器包装ゴミへ。</p>
                          <p>② ボトルの 中を 水で 軽く すすいでください。</p>
                          <p>③ 上から 足で つぶして、収集日当日の 朝8:30までに 出してください。</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Paper Footer */}
                <div className="border-t border-slate-300 pt-3 mt-6 text-[10px] text-slate-400 flex justify-between items-center">
                  <span>Prometric CBT Simulation System 2026</span>
                  <span>Japan Foundation CBT Reference Material</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* =====================================================================
            RIGHT PANEL: CORRESPONDING QUESTION OPTIONS & SEQUENTIAL BULK UPLOADS
            ===================================================================== */}
        <div
          className={`${
            layoutRatio === 'wide-left'
              ? 'lg:col-span-4'
              : layoutRatio === 'wide-right'
              ? 'lg:col-span-8'
              : 'lg:col-span-6'
          } flex flex-col space-y-4`}
        >
          {/* Question Navigator Pill Bar */}
          <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-rose-600" />
                <span>Section {selectedSectionNumber} Questions ({sectionQuestions.length})</span>
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleAddNewQuestion}
                  className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-lg text-[11px] font-bold transition flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Question</span>
                </button>
              </div>
            </div>

            {/* Question sequence pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-0.5">
              {sectionQuestions.map(q => {
                const isSelected = q.question_order === activeQuestionOrder;
                const hasAudio = Boolean(q.audio_url);
                const hasImage = Boolean(q.image_url);
                const isComplete = Boolean(q.prompt_text && q.options.some(o => Boolean(o.text)));
                const correctLetter = q.options[q.correct_option_index]?.label || 'A';

                return (
                  <button
                    key={q.id}
                    onClick={() => setActiveQuestionOrder(q.question_order)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0 flex items-center gap-1.5 border ${
                      isSelected
                        ? 'bg-rose-600 text-white border-rose-600 shadow-md ring-2 ring-rose-300'
                        : isComplete
                        ? 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                        : 'bg-white text-slate-400 border-dashed border-slate-300'
                    }`}
                  >
                    <span>Q{q.question_order}</span>
                    <span className="text-[10px] opacity-80 font-mono font-normal">[{correctLetter}]</span>
                    {hasAudio && <span title="Audio attached">♫</span>}
                    {hasImage && <span title="Image attached">🖼</span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Question Options Form Editor */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-5">
            {/* Form Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-xl bg-slate-900 text-white font-black text-xs flex items-center justify-center">
                  Q{activeQuestionOrder}
                </span>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900">
                    Question #{activeQuestionOrder} Options & Settings
                  </h3>
                  <span className="text-[10px] text-slate-400">
                    Section {selectedSectionNumber} • Corresponding with Sheet Page {pdfPage}
                  </span>
                </div>
              </div>

              {/* Prev / Next Question rapid switcher */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setActiveQuestionOrder(Math.max(1, activeQuestionOrder - 1))}
                  disabled={activeQuestionOrder <= 1}
                  className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg disabled:opacity-30"
                  title="Previous Question"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <span className="text-xs font-bold text-slate-500 px-1">
                  {activeQuestionOrder} / {Math.max(sectionQuestions.length, 12)}
                </span>
                <button
                  onClick={() => setActiveQuestionOrder(activeQuestionOrder + 1)}
                  className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
                  title="Next Question"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Media status strip */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Question Mode */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Question Mode
                </label>
                <select
                  value={formQuestionMode}
                  onChange={e => setFormQuestionMode(e.target.value as QuestionMode)}
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                >
                  <option value="text_image">Text & Image Stimulus</option>
                  <option value="audio_mcq">Audio MCQ Dialogue</option>
                  <option value="pdf_view">PDF / Document Reference</option>
                </select>
              </div>

              {/* Question Sheet Page Link */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  PDF Sheet Page Link
                </label>
                <select
                  value={formPdfPage}
                  onChange={e => {
                    const pageVal = Number(e.target.value);
                    setFormPdfPage(pageVal);
                    setPdfPage(pageVal);
                  }}
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                >
                  <option value={1}>Page 1 (文字・語彙)</option>
                  <option value={2}>Page 2 (会話・表現)</option>
                  <option value={3}>Page 3 (聴解スクリプト)</option>
                  <option value={4}>Page 4 (読解・資料)</option>
                </select>
              </div>
            </div>

            {/* Attached Media Cards (Audio / Image) */}
            {(formAudioUrl || formImageUrl) && (
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Attached Question Media
                </span>

                {formAudioUrl && (
                  <div className="flex items-center justify-between gap-3 bg-white p-2.5 rounded-xl border border-slate-200">
                    <div className="flex items-center gap-2 truncate">
                      <Music className="w-4 h-4 text-indigo-600 shrink-0" />
                      <span className="text-xs font-bold text-slate-800 truncate">
                        Audio Track Mapped (Q{activeQuestionOrder})
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <audio ref={activeAudioPlayerRef} src={formAudioUrl} onEnded={() => setIsPlayingAudio(false)} />
                      <button
                        type="button"
                        onClick={togglePlayAudio}
                        className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold flex items-center gap-1 transition"
                      >
                        {isPlayingAudio ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                        <span>{isPlayingAudio ? 'Stop' : 'Test Audio'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setFormAudioUrl('');
                          triggerToast(`Audio unlinked from Question #${activeQuestionOrder}`);
                        }}
                        className="p-1 text-slate-400 hover:text-rose-600 rounded"
                        title="Remove audio"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {formImageUrl && (
                  <div className="flex items-center justify-between gap-3 bg-white p-2.5 rounded-xl border border-slate-200">
                    <div className="flex items-center gap-3">
                      <img
                        src={formImageUrl}
                        alt="Question Stimulus"
                        className="w-10 h-10 object-cover rounded-lg border border-slate-200"
                      />
                      <span className="text-xs font-bold text-slate-800">
                        Image Stimulus Mapped (Q{activeQuestionOrder})
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setFormImageUrl('');
                        triggerToast(`Image unlinked from Question #${activeQuestionOrder}`);
                      }}
                      className="p-1 text-slate-400 hover:text-rose-600 rounded"
                      title="Remove image"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Prompt Text Input */}
            <div className="space-y-1.5">
              <label className="block text-xs font-extrabold text-slate-900">
                Question Prompt Text (Japanese / Furigana)
              </label>
              <textarea
                rows={2}
                value={formPromptText}
                onChange={e => setFormPromptText(e.target.value)}
                placeholder="例: あしたは [友][とも]だちと [駅][えき]の [前][まえ]で 会います。"
                className="w-full p-3 font-japanese text-xs border border-slate-300 rounded-xl focus:outline-rose-500 bg-slate-50 focus:bg-white"
              />
              {formPromptText && (
                <div className="p-2 bg-slate-100 rounded-lg text-xs font-japanese text-slate-700">
                  <span className="text-[10px] font-bold text-slate-400 block mb-0.5">Rendered Furigana Preview:</span>
                  {renderFurigana(formPromptText)}
                </div>
              )}
            </div>

            {/* =================================================================
                CORRESPONDING QUESTION OPTIONS (A, B, C, D)
                ================================================================= */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-extrabold text-slate-900">
                  Question Options (A, B, C, D)
                </label>
                <span className="text-[11px] text-emerald-600 font-bold">
                  ● Option {formOptions[formCorrectIndex]?.label} is set as Correct
                </span>
              </div>

              <div className="space-y-2.5">
                {formOptions.map((opt, idx) => {
                  const isCorrect = formCorrectIndex === idx;

                  return (
                    <div
                      key={opt.id || idx}
                      className={`p-3 rounded-2xl border transition flex items-center gap-3 ${
                        isCorrect
                          ? 'bg-emerald-50/70 border-emerald-400 ring-1 ring-emerald-300'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {/* Radio for Correct Answer */}
                      <button
                        type="button"
                        onClick={() => setFormCorrectIndex(idx)}
                        className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition ${
                          isCorrect
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'border-2 border-slate-300 text-transparent hover:border-emerald-500'
                        }`}
                        title="Mark as correct answer"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>

                      {/* Option Label Badge */}
                      <span
                        className={`w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center shrink-0 ${
                          isCorrect ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {opt.label}
                      </span>

                      {/* Option Text Input */}
                      <input
                        type="text"
                        value={opt.text}
                        onChange={e => {
                          const updated = [...formOptions];
                          updated[idx] = { ...updated[idx], text: e.target.value };
                          setFormOptions(updated);
                        }}
                        placeholder={`Option ${opt.label} Japanese text...`}
                        className="flex-1 px-3 py-1.5 font-japanese text-xs border border-slate-200 rounded-xl focus:outline-rose-500 bg-white"
                      />

                      {/* Correct Status Tag */}
                      {isCorrect && (
                        <span className="text-[10px] font-black uppercase text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded shrink-0">
                          Correct Choice ✓
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Explanation */}
            <div className="space-y-1">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Answer Explanation & Vocab Notes
              </label>
              <textarea
                rows={2}
                value={formExplanation}
                onChange={e => setFormExplanation(e.target.value)}
                placeholder="解説を入力してください（例:「会います」の読み方は「あいます」です。正解は選択肢A。）"
                className="w-full p-2.5 font-japanese text-xs border border-slate-200 rounded-xl focus:outline-rose-500 bg-slate-50"
              />
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={handleDeleteActiveQuestion}
                disabled={!activeQuestion}
                className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-xl transition disabled:opacity-30"
                title="Delete this question"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSaveActiveQuestion}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs ${
                    saveSuccessAnim
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  {saveSuccessAnim ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                  <span>{saveSuccessAnim ? 'Saved ✓' : 'Save Question'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleSaveAndNext}
                  className="px-5 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-rose-600/30"
                >
                  <span>Save & Next</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          MODAL: BULK UPLOAD SEQUENTIAL MAPPING SUMMARY
          ========================================================================= */}
      {bulkModalData && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className={`p-2 rounded-xl ${bulkModalData.type === 'audio' ? 'bg-indigo-50 text-indigo-600' : 'bg-emerald-50 text-emerald-600'}`}>
                  {bulkModalData.type === 'audio' ? <Music className="w-5 h-5" /> : <ImageIcon className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">
                    Bulk {bulkModalData.type === 'audio' ? 'Audio' : 'Image'} Sequential Mapping Complete
                  </h3>
                  <p className="text-xs text-slate-500">
                    {bulkModalData.count} files automatically mapped to Section {selectedSectionNumber}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setBulkModalData(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Sequential Mapping Table */}
            <div className="max-h-64 overflow-y-auto space-y-1.5 pr-1 text-xs">
              {bulkModalData.mappings.map(m => (
                <div
                  key={m.order}
                  className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-slate-900 text-white font-black text-[11px] flex items-center justify-center">
                      Q{m.order}
                    </span>
                    <span className="font-bold text-slate-800">
                      Question #{m.order}
                    </span>
                  </div>

                  <span className="font-mono text-[11px] text-slate-600 truncate max-w-[200px]">
                    ← {m.fileName}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setBulkModalData(null)}
                className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition shadow-xs"
              >
                Close & Continue Editing
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
