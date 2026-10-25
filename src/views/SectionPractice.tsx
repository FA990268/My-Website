import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SECTIONS_CONFIG, Question } from '../types';
import { renderFurigana } from '../lib/furigana';
import { RestrictedAudioPlayer } from '../components/RestrictedAudioPlayer';
import { PDFQuestionViewer } from '../components/PDFQuestionViewer';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  RotateCcw,
  BookOpen,
  Volume2,
  MessageSquare,
  FileText
} from 'lucide-react';

export const SectionPractice: React.FC = () => {
  const { questions, mockTests, viewParams } = useApp();

  const initialSection = viewParams.section ? (parseInt(viewParams.section) as 1 | 2 | 3 | 4) : 1;
  const [selectedSection, setSelectedSection] = useState<1 | 2 | 3 | 4>(initialSection);

  // Filter questions for the selected section (from all tests or primary test)
  const practiceQuestions: Question[] = questions.filter(q => q.section_number === selectedSection);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState<boolean>(false);
  const [playCount, setPlayCount] = useState<number>(0);

  const currentQ: Question | undefined = practiceQuestions[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (isAnswerRevealed) return;
    setSelectedOption(idx);
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null) return;
    setIsAnswerRevealed(true);
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setIsAnswerRevealed(false);
    setPlayCount(0);
    if (currentIndex < practiceQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handleSectionChange = (sec: 1 | 2 | 3 | 4) => {
    setSelectedSection(sec);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerRevealed(false);
    setPlayCount(0);
  };

  const isCorrect = currentQ && selectedOption === currentQ.correct_option_index;

  const sectionIcons = {
    1: <BookOpen className="w-4 h-4 text-blue-500" />,
    2: <MessageSquare className="w-4 h-4 text-indigo-500" />,
    3: <Volume2 className="w-4 h-4 text-emerald-500" />,
    4: <FileText className="w-4 h-4 text-orange-500" />
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
            Targeted Skill Mastery
          </span>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
            Section Practice & Immediate Explanations
          </h1>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            Strengthen your weakest area with instant feedback and comprehensive grammatical explanations.
          </p>
        </div>
      </div>

      {/* Section Selector Pills */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {([1, 2, 3, 4] as const).map(sec => {
          const meta = SECTIONS_CONFIG[sec];
          const isSelected = selectedSection === sec;

          return (
            <button
              key={sec}
              onClick={() => handleSectionChange(sec)}
              className={`p-3.5 rounded-xl border text-left transition flex items-start gap-3 shadow-sm ${
                isSelected
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-orange-500/30'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div className={`p-2 rounded-lg shrink-0 ${isSelected ? 'bg-slate-800' : 'bg-slate-100'}`}>
                {sectionIcons[sec]}
              </div>
              <div className="truncate">
                <span className={`text-[10px] font-bold uppercase tracking-wider block ${
                  isSelected ? 'text-orange-400' : 'text-slate-400'
                }`}>
                  Section {sec}
                </span>
                <h4 className="font-bold text-xs truncate mt-0.5">{meta.titleEn}</h4>
                <p className={`text-[10px] truncate ${isSelected ? 'text-slate-400' : 'text-slate-500'}`}>
                  {meta.titleJp}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Practice Card */}
      {currentQ ? (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Card Header */}
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs font-semibold text-slate-600">
            <div className="flex items-center gap-2">
              <span className="bg-slate-900 text-white px-2 py-0.5 rounded text-[11px] font-bold">
                Question {currentIndex + 1} of {practiceQuestions.length}
              </span>
              <span>{SECTIONS_CONFIG[selectedSection].titleEn}</span>
            </div>

            <button
              onClick={() => {
                setSelectedOption(null);
                setIsAnswerRevealed(false);
              }}
              className="text-slate-500 hover:text-slate-800 flex items-center gap-1 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Choice</span>
            </button>
          </div>

          {/* Question Body */}
          <div className="p-6 space-y-6">
            {/* Mode 3: Audio if in Section 3 */}
            {currentQ.question_mode === 'audio_mcq' && (
              <RestrictedAudioPlayer
                questionId={currentQ.id}
                audioUrl={currentQ.audio_url}
                audioScript={currentQ.reading_passage || currentQ.prompt_text || ''}
                playCount={playCount}
                onPlayIncrement={() => setPlayCount(p => Math.min(2, p + 1))}
              />
            )}

            {/* Mode 2: PDF if in PDF mode */}
            {currentQ.question_mode === 'pdf_view' && (
              <div className="h-[400px] w-full">
                <PDFQuestionViewer
                  pdfUrl={currentQ.pdf_url}
                  pdfPage={currentQ.pdf_page || 1}
                  readingPassage={currentQ.reading_passage}
                />
              </div>
            )}

            {/* Prompt Text with Furigana */}
            {currentQ.prompt_text && (
              <div className="text-base md:text-lg leading-relaxed font-japanese text-slate-900 bg-slate-50 p-4 rounded-xl border border-slate-200">
                {renderFurigana(currentQ.prompt_text)}
              </div>
            )}

            {/* Reading Passage if Text Mode */}
            {currentQ.question_mode === 'text_image' && currentQ.reading_passage && (
              <div className="bg-amber-50/60 border-l-4 border-amber-500 p-4 rounded-r-lg text-sm md:text-base leading-relaxed font-japanese text-slate-800 whitespace-pre-line shadow-inner">
                {renderFurigana(currentQ.reading_passage)}
              </div>
            )}

            {/* Options List */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                Choose an Option:
              </span>

              {currentQ.options.map((opt, optIdx) => {
                const isSelected = selectedOption === optIdx;
                const isCorrectOption = optIdx === currentQ.correct_option_index;

                let optionStyle = 'bg-white border-slate-300 text-slate-800 hover:border-slate-400 hover:bg-slate-50';

                if (isAnswerRevealed) {
                  if (isCorrectOption) {
                    optionStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-400/50';
                  } else if (isSelected && !isCorrectOption) {
                    optionStyle = 'bg-red-50 border-red-500 text-red-950 font-bold';
                  } else {
                    optionStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                  }
                } else if (isSelected) {
                  optionStyle = 'bg-orange-500 border-orange-600 text-white font-semibold shadow-md';
                }

                return (
                  <button
                    key={opt.id || opt.label}
                    onClick={() => handleSelectOption(optIdx)}
                    disabled={isAnswerRevealed}
                    className={`w-full text-left p-3.5 rounded-lg border-2 transition flex items-center justify-between shadow-sm ${optionStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border ${
                        isSelected && !isAnswerRevealed
                          ? 'bg-white text-orange-600 border-white'
                          : isAnswerRevealed && isCorrectOption
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-slate-100 text-slate-700 border-slate-300'
                      }`}>
                        {opt.label}
                      </span>
                      <span className="text-sm md:text-base font-japanese leading-relaxed">
                        {renderFurigana(opt.text)}
                      </span>
                    </div>

                    {isAnswerRevealed && (
                      <div>
                        {isCorrectOption ? (
                          <span className="text-emerald-600 font-bold text-xs flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4" /> Correct Answer
                          </span>
                        ) : isSelected ? (
                          <span className="text-red-600 font-bold text-xs flex items-center gap-1">
                            <XCircle className="w-4 h-4" /> Your Choice
                          </span>
                        ) : null}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Answer & Explanation Box (Reveals when "Check Answer" is clicked) */}
            {isAnswerRevealed && (
              <div className={`p-5 rounded-xl border-2 space-y-2 animate-fade-in ${
                isCorrect ? 'bg-emerald-50 border-emerald-300' : 'bg-red-50 border-red-300'
              }`}>
                <div className="flex items-center gap-2">
                  {isCorrect ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <span className="font-bold text-emerald-900 text-sm">Correct! よくできました！</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-red-600" />
                      <span className="font-bold text-red-900 text-sm">
                        Incorrect. Correct answer is Option {currentQ.options[currentQ.correct_option_index]?.label}.
                      </span>
                    </>
                  )}
                </div>

                <div className="pt-2 text-xs md:text-sm text-slate-800 space-y-1 font-japanese">
                  <span className="font-bold text-slate-900 block flex items-center gap-1">
                    <HelpCircle className="w-4 h-4 text-orange-500" />
                    <span>解説 (Answer Explanation):</span>
                  </span>
                  <p className="leading-relaxed pl-5 text-slate-700">
                    {currentQ.explanation || '正解の選択肢を確認して文脈を復習しましょう。'}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Action Footer */}
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              {currentIndex + 1} / {practiceQuestions.length} Questions
            </span>

            <div className="flex items-center gap-3">
              {!isAnswerRevealed ? (
                <button
                  onClick={handleCheckAnswer}
                  disabled={selectedOption === null}
                  className="px-5 py-2.5 bg-orange-600 hover:bg-orange-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold rounded-lg shadow transition active:scale-95"
                >
                  Check Answer
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg shadow transition flex items-center gap-2 active:scale-95"
                >
                  <span>Next Question</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white p-12 text-center rounded-xl border border-slate-200 text-slate-500">
          No practice questions in this section yet.
        </div>
      )}
    </div>
  );
};
