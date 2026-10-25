import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { MockTest, Question } from '../types';
import {
  Sparkles,
  Upload,
  Plus,
  Trash2,
  X,
  Check,
  Music,
  FileText,
  Volume2,
  ExternalLink,
  ChevronDown,
  Play,
  Pause,
  Image as ImageIcon,
  Layers,
  HelpCircle,
  Copy,
  FolderOpen
} from 'lucide-react';

interface QuestionDraft {
  id: string;
  order: number;
  audioUrl?: string;
  audioFileName?: string;
  correctOption: 1 | 2 | 3 | 4;
}

interface SectionDraft {
  id: string;
  title: string;
  points: number;
  questions: QuestionDraft[];
}

interface AdminSetupPanelProps {
  onClose?: () => void;
  onLaunchLiveExam?: (testId: string) => void;
}

export const AdminSetupPanel: React.FC<AdminSetupPanelProps> = ({
  onClose,
  onLaunchLiveExam
}) => {
  const {
    mockTests,
    questions,
    createMockTest,
    updateMockTest,
    importQuestionsBatch,
    startExam,
    navigateTo,
    themeConfig
  } = useApp();

  // 1. Categories / Groups State
  const [categories, setCategories] = useState<string[]>([
    'JFT',
    'JLPT N5',
    'JLPT N4',
    'JLPT N3',
    'JLPT N2',
    'JLPT N1',
    'SSW Care Worker',
    'SSW Agriculture',
    'SSW Construction',
    'SSW Food Service'
  ]);
  const [newGroupName, setNewGroupName] = useState<string>('');

  // 2. Settings & Exam Metadata
  const [backgroundUrl, setBackgroundUrl] = useState<string | null>(null);
  const [backgroundFileName, setBackgroundFileName] = useState<string | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<string>('JFT');
  const [examModelName, setExamModelName] = useState<string>('Model Name');
  const [passMark, setPassMark] = useState<number>(200);
  const [durationMinutes, setDurationMinutes] = useState<number>(60);

  // Master PDF State (persistent in memory and localStorage for 100% reliable Live Exam rendering)
  const [pdfUrl, setPdfUrl] = useState<string | null>(() => {
    return (
      localStorage.getItem('jft_admin_active_pdf_url') ||
      localStorage.getItem('jft_admin_active_pdf_data') ||
      null
    );
  });
  const [pdfFileName, setPdfFileName] = useState<string | null>(() => {
    return localStorage.getItem('jft_admin_active_pdf_name') || null;
  });

  // Active / Selected Section ID for targeted question additions
  const [activeSectionId, setActiveSectionId] = useState<string>('sec_1');

  // Custom batch quantity input state
  const [customAddCounts, setCustomAddCounts] = useState<{ [sectionId: string]: number }>({});

  // Sections & Questions Drafts
  const [sections, setSections] = useState<SectionDraft[]>([
    {
      id: 'sec_1',
      title: 'Vocabulary',
      points: 1,
      questions: [
        {
          id: 'q_draft_1',
          order: 1,
          audioUrl: '',
          audioFileName: '',
          correctOption: 1
        },
        {
          id: 'q_draft_2',
          order: 2,
          audioUrl: '',
          audioFileName: '',
          correctOption: 1
        }
      ]
    }
  ]);

  // Toast / feedback message
  const [toast, setToast] = useState<string | null>(null);
  const [savedTestId, setSavedTestId] = useState<string | null>(null);

  // Refs for file pickers
  const backgroundInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);
  const questionAudioInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});
  const sectionBulkAudioInputRefs = useRef<{ [sectionId: string]: HTMLInputElement | null }>({});

  // Dynamic live Question Counter across all sections
  const totalQuestionCount = sections.reduce((acc, s) => acc + s.questions.length, 0);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4500);
  };

  // Add category / group
  const handleAddGroup = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newGroupName.trim();
    if (!trimmed) return;
    if (!categories.includes(trimmed)) {
      setCategories(prev => [...prev, trimmed]);
    }
    setSelectedGroup(trimmed);
    setNewGroupName('');
    showToast(`✓ Group "${trimmed}" added and selected!`);
  };

  // Handle custom background image upload
  const handleBackgroundUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setBackgroundUrl(url);
    setBackgroundFileName(file.name);
    showToast(`✓ Background image "${file.name}" loaded!`);
    e.target.value = '';
  };

  // Handle master PDF file upload (Stores both Blob URL and Base64 Data URL)
  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    setPdfUrl(objectUrl);
    setPdfFileName(file.name);

    // Save in localStorage for 100% reliable Live Exam rendering
    try {
      localStorage.setItem('jft_admin_active_pdf_url', objectUrl);
      localStorage.setItem('jft_admin_active_pdf_name', file.name);

      const reader = new FileReader();
      reader.onload = loadEvt => {
        const dataUrl = loadEvt.target?.result as string;
        if (dataUrl) {
          try {
            localStorage.setItem('jft_admin_active_pdf_data', dataUrl);
          } catch (storageErr) {
            console.warn('PDF data URL storage warning (quota):', storageErr);
          }
        }
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.warn('LocalStorage warning:', err);
    }

    showToast(`✓ Master PDF paper "${file.name}" attached successfully!`);
    e.target.value = '';
  };

  // Add Section container
  const handleAddSection = () => {
    const newSecNumber = sections.length + 1;
    const newSecId = `sec_${Date.now()}_${newSecNumber}`;
    const newSection: SectionDraft = {
      id: newSecId,
      title: `Section ${newSecNumber}`,
      points: 1,
      questions: [
        {
          id: `q_draft_${Date.now()}_1`,
          order: 1,
          audioUrl: '',
          audioFileName: '',
          correctOption: 1
        }
      ]
    };
    setSections(prev => [...prev, newSection]);
    setActiveSectionId(newSecId);
    showToast(`✓ Added Section ${newSecNumber}`);
  };

  // Delete Section
  const handleDeleteSection = (sectionId: string) => {
    if (sections.length <= 1) {
      showToast('At least one section is required.');
      return;
    }
    setSections(prev => {
      const filtered = prev.filter(s => s.id !== sectionId);
      if (activeSectionId === sectionId) {
        setActiveSectionId(filtered[0]?.id || '');
      }
      return filtered;
    });
    showToast('Section removed.');
  };

  // Update Section Title & Points
  const handleUpdateSectionTitle = (sectionId: string, title: string) => {
    setSections(prev =>
      prev.map(s => (s.id === sectionId ? { ...s, title } : s))
    );
  };

  const handleUpdateSectionPoints = (sectionId: string, points: number) => {
    setSections(prev =>
      prev.map(s => (s.id === sectionId ? { ...s, points: Math.max(1, points) } : s))
    );
  };

  // =========================================================================
  // CORE FEATURE 1: BULK AUDIO UPLOAD PER SECTION WITH AUTO-SEQUENTIAL MAPPING
  // If section has 15 questions and 15 audio files are selected:
  // Sort naturally by filename (01.mp3, 02.mp3 ... 15.mp3)
  // Maps 1st audio -> Q-1, 2nd -> Q-2, ..., 15th -> Q-15!
  // Automatically creates questions if needed!
  // =========================================================================
  const handleBulkAudioForSection = (
    sectionId: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const fileList = Array.from(files);

    // 1. Natural Alphanumeric Sort by filename (e.g. 01.mp3, 02.mp3, 10.mp3 or q1.mp3, q2.mp3)
    fileList.sort((a, b) =>
      a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' })
    );

    setSections(prev =>
      prev.map(s => {
        if (s.id === sectionId) {
          const updatedQuestions: QuestionDraft[] = [];
          const neededCount = Math.max(s.questions.length, fileList.length);

          for (let i = 0; i < neededCount; i++) {
            const order = i + 1;
            const existingQ = s.questions[i];
            const audioFile = fileList[i]; // i-th file maps sequentially to i-th question

            if (audioFile) {
              const audioUrl = URL.createObjectURL(audioFile);
              if (existingQ) {
                updatedQuestions.push({
                  ...existingQ,
                  order,
                  audioUrl,
                  audioFileName: audioFile.name
                });
              } else {
                // Auto-create new question row if section had fewer questions than uploaded audio files
                updatedQuestions.push({
                  id: `q_draft_${Date.now()}_${s.id}_${order}_${Math.random().toString(36).substring(2, 6)}`,
                  order,
                  audioUrl,
                  audioFileName: audioFile.name,
                  correctOption: 1
                });
              }
            } else {
              // Retain any existing questions beyond the uploaded audio count
              if (existingQ) {
                updatedQuestions.push({ ...existingQ, order });
              }
            }
          }

          return { ...s, questions: updatedQuestions };
        }
        return s;
      })
    );

    const targetSec = sections.find(s => s.id === sectionId);
    showToast(
      `✓ Auto-mapped ${fileList.length} audio files sequentially to "${targetSec?.title || 'Section'}" (Q-1 to Q-${fileList.length})!`
    );
    e.target.value = '';
  };

  // =========================================================================
  // CORE FEATURE 3: UNLIMITED MANUAL QUESTION ADDITION PER SECTION
  // No restrictions. Add 1, 5, 10, 20, 50, or any number of questions!
  // =========================================================================
  const handleAddQuestionToSection = (targetSectionId?: string, count: number = 1) => {
    const secId =
      targetSectionId ||
      activeSectionId ||
      sections[sections.length - 1]?.id ||
      sections[0]?.id;

    if (!secId) return;

    setSections(prev =>
      prev.map(s => {
        if (s.id === secId) {
          const newQuestions: QuestionDraft[] = [];
          const baseOrder = s.questions.length;

          for (let i = 1; i <= count; i++) {
            const nextOrder = baseOrder + i;
            newQuestions.push({
              id: `q_draft_${Date.now()}_${s.id}_${nextOrder}_${Math.random().toString(36).substring(2, 6)}`,
              order: nextOrder,
              audioUrl: '',
              audioFileName: '',
              correctOption: 1
            });
          }

          return { ...s, questions: [...s.questions, ...newQuestions] };
        }
        return s;
      })
    );

    setActiveSectionId(secId);
    const targetSection = sections.find(s => s.id === secId);
    const secTitle = targetSection?.title || 'Section';
    showToast(`✓ Added ${count} question${count > 1 ? 's' : ''} to "${secTitle}"!`);
  };

  // Upload Individual Question Audio
  const handleQuestionAudioUpload = (
    sectionId: string,
    questionId: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);

    setSections(prev =>
      prev.map(s => {
        if (s.id === sectionId) {
          return {
            ...s,
            questions: s.questions.map(q =>
              q.id === questionId
                ? { ...q, audioUrl: url, audioFileName: file.name }
                : q
            )
          };
        }
        return s;
      })
    );

    showToast(`✓ Attached audio "${file.name}" to question`);
    e.target.value = '';
  };

  // Change Question Correct Ans
  const handleQuestionCorrectChange = (
    sectionId: string,
    questionId: string,
    correctOption: 1 | 2 | 3 | 4
  ) => {
    setSections(prev =>
      prev.map(s => {
        if (s.id === sectionId) {
          return {
            ...s,
            questions: s.questions.map(q =>
              q.id === questionId ? { ...q, correctOption } : q
            )
          };
        }
        return s;
      })
    );
  };

  // Delete Question
  const handleDeleteQuestion = (sectionId: string, questionId: string) => {
    setSections(prev =>
      prev.map(s => {
        if (s.id === sectionId) {
          const filtered = s.questions.filter(q => q.id !== questionId);
          const reordered = filtered.map((q, idx) => ({ ...q, order: idx + 1 }));
          return { ...s, questions: reordered };
        }
        return s;
      })
    );
    showToast('Question removed.');
  };

  // =========================================================================
  // CORE FEATURE 2: SAVE MODEL & BIND EXACT UPLOADED PDF SYNCHRONOUSLY
  // Returns testId directly to eliminate race conditions!
  // =========================================================================
  const handleSaveModel = (): string | null => {
    if (!examModelName.trim()) {
      showToast('Please enter an Exam Model Name.');
      return null;
    }

    const testId = `test_custom_${Date.now()}`;
    const effectivePdf =
      pdfUrl ||
      localStorage.getItem('jft_admin_active_pdf_url') ||
      localStorage.getItem('jft_admin_active_pdf_data') ||
      undefined;

    const newTest: MockTest = {
      id: testId,
      title: examModelName.trim(),
      category: selectedGroup as any,
      duration_minutes: durationMinutes,
      total_questions: totalQuestionCount,
      max_score: 250,
      passing_score: passMark,
      is_pro: false,
      master_pdf_url: effectivePdf,
      is_published: true,
      created_at: new Date().toISOString()
    };

    createMockTest(newTest as any);

    // Build all questions for this exam model across all sections
    const questionsToSave: Question[] = [];
    sections.forEach((sec, secIdx) => {
      const secNum = ((secIdx % 4) + 1) as 1 | 2 | 3 | 4;
      sec.questions.forEach(qDraft => {
        const fullQ: Question = {
          id: `q_${testId}_sec${secNum}_ord${qDraft.order}`,
          mock_test_id: testId,
          section_number: secNum,
          question_order: qDraft.order,
          question_mode: qDraft.audioUrl ? 'audio_mcq' : 'pdf_view',
          prompt_text: `【${sec.title} - Question ${qDraft.order}】Refer to the PDF Question Paper on the left.`,
          audio_url: qDraft.audioUrl || undefined,
          pdf_url: effectivePdf,
          options: [
            { id: 'opt_1', label: 'A', text: 'Option 1' },
            { id: 'opt_2', label: 'B', text: 'Option 2' },
            { id: 'opt_3', label: 'C', text: 'Option 3' },
            { id: 'opt_4', label: 'D', text: 'Option 4' }
          ],
          correct_option_index: qDraft.correctOption - 1,
          explanation: `Correct answer is Option ${qDraft.correctOption}.`,
          created_at: new Date().toISOString()
        };
        questionsToSave.push(fullQ);
      });
    });

    if (questionsToSave.length > 0) {
      importQuestionsBatch(questionsToSave);
    }

    setSavedTestId(testId);
    showToast(
      `✓ Exam Model "${examModelName}" saved successfully with ${totalQuestionCount} questions & PDF attached!`
    );
    return testId;
  };

  // Launch live exam using the exact saved test ID
  const handleStartExamNow = () => {
    let targetId = savedTestId;
    if (!targetId) {
      targetId = handleSaveModel();
    }
    if (targetId) {
      if (onLaunchLiveExam) {
        onLaunchLiveExam(targetId);
      } else {
        startExam(targetId);
        navigateTo('exam');
      }
    }
  };

  return (
    <div className="w-full min-w-full min-h-screen bg-[#0c0f17] text-white p-3 sm:p-5 md:p-6 lg:p-8 space-y-5 font-sans relative selection:bg-blue-600 selection:text-white border-none shadow-2xl">
      {/* Toast Alert */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-[#141b2c] text-white px-5 py-3 rounded-2xl shadow-2xl border border-blue-500/50 flex items-center gap-3 animate-in fade-in slide-in-from-top-3">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-bold">{toast}</span>
        </div>
      )}

      {/* Hidden File Inputs for Background and Master PDF */}
      <input
        ref={backgroundInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleBackgroundUpload}
      />
      <input
        ref={pdfInputRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={handlePdfUpload}
      />

      {/* =========================================================================
          TOP ACTION BAR (Title, Dynamic Q-Count, SAVE MODEL, CLOSE)
          Full Width, responsive
          ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#1c2336] w-full">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            {themeConfig.customLogoUrl && (
              <img
                src={themeConfig.customLogoUrl}
                alt="Logo"
                className="w-7 h-7 object-contain rounded p-0.5 bg-white/10 border border-white/20"
              />
            )}
            <h1 className="text-xl sm:text-2xl font-black text-[#50a2ff] tracking-wider uppercase">
              ADMIN SETUP • {themeConfig.instituteName}
            </h1>
          </div>
          <p className="text-[11px] text-slate-400 font-medium">
            {themeConfig.instituteTitle} — <span className="italic text-slate-500">{themeConfig.instituteSlogan}</span>
          </p>
          <div className="inline-flex items-center gap-1.5 bg-[#141c2e] text-[#60a5fa] border border-[#2563eb]/40 text-xs font-mono font-bold px-3 py-0.5 rounded-md mt-1">
            <span>Q-Count: {totalQuestionCount}</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={handleStartExamNow}
            className="bg-[#2563eb] hover:bg-blue-600 text-white font-extrabold text-xs sm:text-sm px-5 py-2.5 rounded-xl uppercase tracking-wider shadow-lg shadow-blue-500/30 transition flex items-center gap-1.5"
            title="Launch and verify live exam with uploaded PDF & audio"
          >
            <Play className="w-4 h-4" />
            <span>Test Live Exam →</span>
          </button>

          <button
            onClick={() => handleSaveModel()}
            className="bg-[#22c55e] hover:bg-[#16a34a] text-white font-extrabold text-xs sm:text-sm px-6 py-2.5 rounded-xl uppercase tracking-wider shadow-lg shadow-green-600/30 transition flex items-center gap-1.5"
          >
            <Check className="w-4 h-4" />
            <span>SAVE MODEL</span>
          </button>

          <button
            onClick={() => {
              if (onClose) {
                onClose();
              } else {
                navigateTo('landing');
              }
            }}
            className="bg-[#ef4444] hover:bg-[#dc2626] text-white font-extrabold text-xs sm:text-sm px-6 py-2.5 rounded-xl uppercase tracking-wider shadow-lg shadow-red-600/30 transition flex items-center gap-1.5"
          >
            <X className="w-4 h-4" />
            <span>CLOSE</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          BOX 1 & BOX 2 (Add Category & Background Settings)
          ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
        {/* 1. ADD NEW CATEGORY / GROUP */}
        <div className="bg-[#121624] border border-[#1e2538] rounded-2xl p-4 space-y-3 shadow-md w-full">
          <h3 className="text-[#93a1ec] text-xs font-bold uppercase tracking-wider italic">
            1. ADD NEW CATEGORY / GROUP
          </h3>
          <form onSubmit={handleAddGroup} className="flex items-center gap-2">
            <input
              type="text"
              value={newGroupName}
              onChange={e => setNewGroupName(e.target.value)}
              placeholder="Enter Group Name (e.g. JLPT N3)"
              className="bg-[#181d2e] border border-[#2b354f] text-white placeholder-slate-500 text-xs sm:text-sm px-4 py-2.5 rounded-xl flex-1 focus:outline-none focus:border-[#2563eb]"
            />
            <button
              type="submit"
              className="bg-[#2563eb] hover:bg-blue-600 text-white font-bold text-xs sm:text-sm px-5 sm:px-6 py-2.5 rounded-xl transition shrink-0 shadow-md shadow-blue-600/20"
            >
              ADD
            </button>
          </form>
        </div>

        {/* 2. BACKGROUND & SETTINGS */}
        <div className="bg-[#121624] border border-[#1e2538] rounded-2xl p-4 space-y-3 shadow-md w-full">
          <h3 className="text-[#b68ef5] text-xs font-bold uppercase tracking-wider italic">
            2. BACKGROUND & SETTINGS
          </h3>
          <div className="flex items-center gap-3">
            <span className="text-slate-400 text-xs font-medium shrink-0">
              Upload Background:
            </span>
            <div
              onClick={() => backgroundInputRef.current?.click()}
              className="bg-[#181d2e] border border-[#2b354f] hover:border-slate-400 text-slate-300 text-xs rounded-xl px-3 py-2 flex-1 flex items-center justify-between cursor-pointer transition truncate"
            >
              <div className="flex items-center gap-2 truncate">
                <span className="bg-[#242c44] text-white px-2.5 py-0.5 rounded text-[11px] font-bold">
                  Choose File
                </span>
                <span className="text-slate-400 text-[11px] truncate">
                  {backgroundFileName || 'No file chosen'}
                </span>
              </div>
              <ImageIcon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          EXAM METADATA ROW (4 Fields in a single row - Fully responsive)
          ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full">
        {/* Field 1: Assign to Group */}
        <div className="space-y-1.5">
          <label className="block text-slate-400 text-xs font-medium">
            Assign to Group:
          </label>
          <div className="relative">
            <select
              value={selectedGroup}
              onChange={e => setSelectedGroup(e.target.value)}
              className="w-full bg-[#121624] border border-[#1e2538] text-white font-bold text-sm px-4 py-2.5 rounded-xl appearance-none focus:outline-none focus:border-[#2563eb]"
            >
              {categories.map(c => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Field 2: Exam Model Name */}
        <div className="space-y-1.5">
          <label className="block text-slate-400 text-xs font-medium">
            Exam Model Name:
          </label>
          <input
            type="text"
            value={examModelName}
            onChange={e => setExamModelName(e.target.value)}
            placeholder="Model Name"
            className="w-full bg-[#121624] border border-[#1e2538] text-white font-bold text-sm px-4 py-2.5 rounded-xl focus:outline-none focus:border-[#2563eb]"
          />
        </div>

        {/* Field 3: Pass Mark */}
        <div className="space-y-1.5">
          <label className="block text-slate-400 text-xs font-medium">
            Pass Mark:
          </label>
          <input
            type="number"
            value={passMark}
            onChange={e => setPassMark(Number(e.target.value))}
            className="w-full bg-[#121624] border border-[#1e2538] text-white font-bold text-sm px-4 py-2.5 rounded-xl focus:outline-none focus:border-[#2563eb]"
          />
        </div>

        {/* Field 4: Duration (Minutes) */}
        <div className="space-y-1.5">
          <label className="block text-slate-400 text-xs font-medium">
            Duration (Minutes):
          </label>
          <input
            type="number"
            value={durationMinutes}
            onChange={e => setDurationMinutes(Number(e.target.value))}
            className="w-full bg-[#121624] border border-[#1e2538] text-white font-bold text-sm px-4 py-2.5 rounded-xl focus:outline-none focus:border-[#2563eb]"
          />
        </div>
      </div>

      {/* =========================================================================
          MASTER PDF UPLOAD & GLOBAL ACTION BUTTONS (+ Add Section, + Add Question)
          ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 w-full">
        {/* PDF FILE Uploader */}
        <div className="flex items-center gap-2.5 flex-1 max-w-lg">
          <span className="text-slate-300 text-xs font-bold shrink-0">
            PDF FILE:
          </span>
          <div
            onClick={() => pdfInputRef.current?.click()}
            className="bg-[#121624] border border-[#1e2538] hover:border-slate-400 text-slate-300 text-xs rounded-xl px-3 py-2 flex items-center justify-between cursor-pointer transition w-full truncate"
          >
            <div className="flex items-center gap-2 truncate">
              <span className="bg-[#242c44] text-white px-2.5 py-0.5 rounded text-[11px] font-bold shrink-0">
                Choose File
              </span>
              <span className="text-slate-400 text-[11px] truncate">
                {pdfFileName || 'No file chosen'}
              </span>
            </div>
            <FileText className="w-3.5 h-3.5 text-rose-400 shrink-0" />
          </div>
        </div>

        {/* Buttons: + Add Section & + Add Question */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            type="button"
            onClick={handleAddSection}
            className="bg-[#f97316] hover:bg-[#ea580c] text-white font-black text-xs sm:text-sm px-5 sm:px-6 py-2.5 rounded-xl shadow-lg shadow-orange-500/20 transition flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Section</span>
          </button>

          <button
            type="button"
            onClick={() => handleAddQuestionToSection(activeSectionId, 1)}
            className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-black text-xs sm:text-sm px-5 sm:px-6 py-2.5 rounded-xl shadow-lg shadow-blue-500/20 transition flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Question</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          SECTIONS & QUESTIONS CONTAINER
          Supports unlimited questions, section-level bulk audio upload & sequential mapping!
          ========================================================================= */}
      <div className="border border-dashed border-[#242b3d] rounded-2xl md:rounded-3xl p-3 sm:p-5 md:p-6 space-y-6 bg-[#0e121d]/40 w-full">
        {sections.map(section => {
          const isActive = activeSectionId === section.id;

          return (
            <div
              key={section.id}
              onClick={() => setActiveSectionId(section.id)}
              className={`space-y-4 rounded-2xl p-2 sm:p-3 transition ${
                isActive ? 'ring-1 ring-blue-500/30' : ''
              }`}
            >
              {/* Hidden file input for section-specific bulk audio upload */}
              <input
                ref={el => {
                  sectionBulkAudioInputRefs.current[section.id] = el;
                }}
                type="file"
                accept="audio/*,.mp3,.wav,.m4a,.ogg"
                multiple
                className="hidden"
                onChange={e => handleBulkAudioForSection(section.id, e)}
              />

              {/* Orange Highlighted Section Container with direct section actions */}
              <div className="border-2 border-[#f97316] bg-[#141926] rounded-2xl p-3 sm:p-4 flex flex-wrap items-center justify-between gap-3 shadow-lg shadow-orange-500/5 w-full">
                <div className="flex items-center gap-2.5 flex-1 min-w-[200px]">
                  <input
                    type="text"
                    value={section.title}
                    onChange={e => handleUpdateSectionTitle(section.id, e.target.value)}
                    placeholder="Section Title (e.g. Vocabulary)"
                    className="bg-[#1a2030] border border-[#2a344d] text-white font-semibold text-xs sm:text-sm px-3.5 py-2 rounded-xl flex-1 focus:outline-none focus:border-[#f97316]"
                  />

                  <input
                    type="number"
                    value={section.points}
                    onChange={e => handleUpdateSectionPoints(section.id, Number(e.target.value))}
                    className="bg-[#1a2030] border border-[#2a344d] text-white font-bold text-xs sm:text-sm w-16 text-center py-2 rounded-xl focus:outline-none focus:border-[#f97316]"
                    title="Points / mark weight per question in this section"
                  />
                </div>

                {/* Section Action Controls: Bulk Audio, Add Questions, Delete */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-[#1a2236] text-blue-300 border border-blue-500/30 whitespace-nowrap">
                    {section.questions.length} Questions
                  </span>

                  {/* 1. BULK AUDIO UPLOAD FOR THIS SECTION */}
                  <button
                    type="button"
                    onClick={e => {
                      e.stopPropagation();
                      sectionBulkAudioInputRefs.current[section.id]?.click();
                    }}
                    className="bg-[#4f46e5] hover:bg-indigo-600 text-white font-bold text-xs px-3.5 py-1.5 rounded-lg transition flex items-center gap-1.5 shadow-md shadow-indigo-600/30"
                    title="Upload multiple audio files. Automatically sorts naturally & maps sequentially to Q-1..Q-N!"
                  >
                    <FolderOpen className="w-3.5 h-3.5" />
                    <span>Bulk Upload Audio</span>
                  </button>

                  {/* 2. UNLIMITED MANUAL QUESTION ADDITION */}
                  <button
                    type="button"
                    onClick={e => {
                      e.stopPropagation();
                      handleAddQuestionToSection(section.id, 1);
                    }}
                    className="bg-[#2563eb] hover:bg-blue-600 text-white font-bold text-xs px-3 py-1.5 rounded-lg transition flex items-center gap-1 shadow-sm"
                    title="Add 1 question to this section"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Add Question</span>
                  </button>

                  <button
                    type="button"
                    onClick={e => {
                      e.stopPropagation();
                      handleAddQuestionToSection(section.id, 5);
                    }}
                    className="bg-[#1e293b] hover:bg-[#334155] text-slate-200 font-bold text-xs px-2.5 py-1.5 rounded-lg border border-slate-700 transition"
                    title="Quick add 5 questions to this section"
                  >
                    +5 Qs
                  </button>

                  <button
                    type="button"
                    onClick={e => {
                      e.stopPropagation();
                      handleAddQuestionToSection(section.id, 10);
                    }}
                    className="bg-[#1e293b] hover:bg-[#334155] text-slate-200 font-bold text-xs px-2.5 py-1.5 rounded-lg border border-slate-700 transition"
                    title="Quick add 10 questions to this section"
                  >
                    +10 Qs
                  </button>

                  <button
                    type="button"
                    onClick={e => {
                      e.stopPropagation();
                      handleDeleteSection(section.id);
                    }}
                    className="text-red-400 hover:text-red-300 font-bold text-xl px-2 transition ml-1"
                    title="Delete this section"
                  >
                    ×
                  </button>
                </div>
              </div>

              {/* Questions within Section */}
              <div className="space-y-3 pl-1 sm:pl-3 md:pl-4 w-full">
                {section.questions.map(q => (
                  <div
                    key={q.id}
                    className="bg-[#141926] border border-[#20273a] border-l-4 border-l-[#2563eb] rounded-2xl p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm hover:border-slate-700 transition w-full"
                  >
                    {/* Left: Blue Q Pill + Audio Uploader */}
                    <div className="flex items-center gap-2.5 flex-1 flex-wrap">
                      <span className="bg-[#2563eb] text-white text-xs font-black px-3 py-1 rounded-md shrink-0 shadow-xs">
                        Q-{q.order}
                      </span>

                      {/* Hidden Audio Input for this Individual Question */}
                      <input
                        ref={el => {
                          questionAudioInputRefs.current[q.id] = el;
                        }}
                        type="file"
                        accept="audio/*,.mp3,.wav,.m4a,.ogg"
                        className="hidden"
                        onChange={e => handleQuestionAudioUpload(section.id, q.id, e)}
                      />

                      <div
                        onClick={() => questionAudioInputRefs.current[q.id]?.click()}
                        className="bg-[#1a2030] border border-[#2a344d] hover:border-slate-400 rounded-xl px-3 py-1.5 text-xs text-slate-300 flex items-center gap-2 cursor-pointer transition flex-1 min-w-[180px] max-w-sm truncate"
                        title="Click to upload/change audio for this question"
                      >
                        <span className="bg-[#242c44] text-white px-2.5 py-0.5 rounded text-[10px] font-bold shrink-0">
                          Choose File
                        </span>
                        <span className="text-slate-400 text-[11px] truncate flex-1">
                          {q.audioFileName || 'No file chosen'}
                        </span>
                        <Music className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                      </div>

                      {q.audioUrl && (
                        <audio
                          controls
                          src={q.audioUrl}
                          className="h-7 w-40 sm:w-48 rounded shrink-0 bg-slate-800"
                        />
                      )}
                    </div>

                    {/* Right: Correct Answer Selector + Delete Button */}
                    <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-1 sm:pt-0 border-t sm:border-t-0 border-[#1c2338]">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-slate-400 font-semibold">Correct Ans:</span>
                        <div className="relative">
                          <select
                            value={q.correctOption}
                            onChange={e =>
                              handleQuestionCorrectChange(
                                section.id,
                                q.id,
                                Number(e.target.value) as 1 | 2 | 3 | 4
                              )
                            }
                            className="bg-[#1a2030] border border-[#2a344d] text-white font-bold text-xs px-3 py-1.5 rounded-lg appearance-none pr-7 focus:outline-none focus:border-[#2563eb]"
                          >
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                          </select>
                          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleDeleteQuestion(section.id, q.id)}
                        className="text-red-400 hover:text-red-300 font-bold text-xl px-2 transition"
                        title="Delete this question"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}

                {/* Section Question Addition Bar at Bottom of Section */}
                <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-[#111624] border border-dashed border-[#242e47] rounded-xl w-full">
                  <span className="text-xs text-slate-400 font-medium">
                    Total: <strong className="text-white">{section.questions.length}</strong> questions in "{section.title}"
                  </span>
                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      type="button"
                      onClick={() => handleAddQuestionToSection(section.id, 1)}
                      className="bg-[#2563eb] hover:bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition flex items-center gap-1 shadow-xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>+ Add Question (Q-{section.questions.length + 1})</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAddQuestionToSection(section.id, 5)}
                      className="bg-[#1a2236] hover:bg-[#253252] text-blue-300 border border-blue-500/40 text-xs font-bold px-3 py-1.5 rounded-lg transition"
                    >
                      +5 Questions
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAddQuestionToSection(section.id, 10)}
                      className="bg-[#1a2236] hover:bg-[#253252] text-blue-300 border border-blue-500/40 text-xs font-bold px-3 py-1.5 rounded-lg transition"
                    >
                      +10 Questions
                    </button>
                    <button
                      type="button"
                      onClick={() => sectionBulkAudioInputRefs.current[section.id]?.click()}
                      className="bg-[#4f46e5]/90 hover:bg-indigo-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition flex items-center gap-1"
                    >
                      <FolderOpen className="w-3.5 h-3.5" />
                      <span>Bulk Audio (Auto-Map 1..N)</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
