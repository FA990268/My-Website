import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { INITIAL_EBOOKS } from '../lib/storeData';
import { EBookItem } from '../types';
import {
  BookOpen,
  Star,
  Eye,
  Download,
  Check,
  ShoppingBag,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Layers,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const DigitalStore: React.FC = () => {
  const { navigateTo } = useApp();
  const [selectedBookForViewer, setSelectedBookForViewer] = useState<EBookItem | null>(null);
  const [activePreviewPage, setActivePreviewPage] = useState<number>(0);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [purchaseSuccessModal, setPurchaseSuccessModal] = useState<EBookItem | null>(null);

  const handleOpenViewer = (book: EBookItem) => {
    setSelectedBookForViewer(book);
    setActivePreviewPage(0);
    setZoomLevel(100);
  };

  const handleSimulatePurchase = (book: EBookItem) => {
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });
    setPurchaseSuccessModal(book);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Store Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>Official Digital E-Books & Revision Notes</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              JFT & SSW Digital Study Book Store
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Carefully curated by licensed Japanese educators for rapid exam revision. Instant secure digital access with our built-in e-book reader.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur p-4 rounded-2xl border border-white/15 text-center shrink-0">
            <div className="text-3xl font-black text-rose-400">{INITIAL_EBOOKS.length} Titles</div>
            <div className="text-[11px] font-bold text-slate-300">Free Preview Available</div>
          </div>
        </div>

        {/* E-Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INITIAL_EBOOKS.map(book => (
            <div
              key={book.id}
              className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition flex flex-col justify-between group"
            >
              {/* Book Header / Simulated Cover */}
              <div className={`p-6 bg-gradient-to-tr ${book.coverColor} text-white space-y-3 relative`}>
                {book.badge && (
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/20 backdrop-blur border border-white/30 text-white">
                    {book.badge}
                  </span>
                )}
                <div>
                  <h3 className="text-lg font-black leading-snug line-clamp-2">{book.title}</h3>
                  <p className="text-xs text-slate-200 font-japanese mt-1 opacity-90">{book.japaneseTitle}</p>
                </div>
                <div className="flex items-center gap-3 text-[11px] text-slate-200">
                  <span className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <strong>{book.rating}</strong> ({book.reviewCount})
                  </span>
                  <span>•</span>
                  <span>{book.pages} Pages</span>
                </div>
              </div>

              {/* Book Description & TOC Preview */}
              <div className="p-6 space-y-4">
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {book.description}
                </p>

                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Sample Table of Contents:
                  </span>
                  <ul className="space-y-1 text-xs text-slate-600">
                    {book.tableOfContents.slice(0, 3).map((ch, idx) => (
                      <li key={idx} className="flex items-center gap-1.5 truncate">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0"></span>
                        <span className="truncate">{ch}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Instant PDF</span>
                  <span className="text-lg font-black text-slate-900">${book.price}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenViewer(book)}
                    className="px-3 py-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold transition flex items-center gap-1 shadow-2xs"
                  >
                    <Eye className="w-3.5 h-3.5 text-slate-400" />
                    <span>Read Preview</span>
                  </button>

                  <button
                    onClick={() => handleSimulatePurchase(book)}
                    className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-rose-600/30"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Buy Now</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* =========================================================================
          BUILT-IN SECURE E-BOOK VIEWER MODAL
          ========================================================================= */}
      {selectedBookForViewer && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 text-white rounded-3xl max-w-4xl w-full p-6 space-y-4 shadow-2xl animate-in fade-in zoom-in-95 font-sans relative max-h-[92vh] flex flex-col">
            {/* Viewer Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-rose-600 flex items-center justify-center text-xs font-bold">
                  PDF
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-white line-clamp-1">{selectedBookForViewer.title}</h3>
                  <p className="text-[10px] text-slate-400 font-japanese">{selectedBookForViewer.japaneseTitle}</p>
                </div>
              </div>

              {/* Zoom & Close Controls */}
              <div className="flex items-center gap-2">
                <div className="hidden sm:flex items-center gap-1 bg-slate-800 px-2 py-1 rounded-lg text-xs">
                  <button
                    onClick={() => setZoomLevel(prev => Math.max(80, prev - 15))}
                    className="p-1 hover:text-rose-400"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-mono text-[11px] w-12 text-center">{zoomLevel}%</span>
                  <button
                    onClick={() => setZoomLevel(prev => Math.min(140, prev + 15))}
                    className="p-1 hover:text-rose-400"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={() => setSelectedBookForViewer(null)}
                  className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center text-xs font-bold"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Viewer Main Page Area */}
            <div className="flex-1 overflow-y-auto p-4 bg-slate-950 rounded-2xl border border-slate-800 flex justify-center">
              {selectedBookForViewer.previewPages[activePreviewPage] ? (
                <div
                  className="bg-white text-slate-900 rounded-xl p-8 max-w-2xl w-full shadow-lg space-y-6 font-sans transition-all origin-top"
                  style={{ transform: `scale(${zoomLevel / 100})` }}
                >
                  {/* Page Subtitle */}
                  <div className="border-b border-slate-200 pb-3 flex items-center justify-between text-xs">
                    <span className="font-black text-rose-600">
                      Page {selectedBookForViewer.previewPages[activePreviewPage].pageNumber} of {selectedBookForViewer.pages}
                    </span>
                    <span className="text-slate-400 text-[10px]">JFT Guru Educational Press</span>
                  </div>

                  <div className="space-y-1">
                    <h2 className="text-lg font-black text-slate-900 leading-snug">
                      {selectedBookForViewer.previewPages[activePreviewPage].title}
                    </h2>
                    <h3 className="text-sm font-bold text-rose-700 font-japanese">
                      {selectedBookForViewer.previewPages[activePreviewPage].japaneseHeader}
                    </h3>
                  </div>

                  {/* Content Paragraphs */}
                  <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
                    {selectedBookForViewer.previewPages[activePreviewPage].content.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>

                  {/* Grammar Box */}
                  {selectedBookForViewer.previewPages[activePreviewPage].grammarBox && (
                    <div className="p-4 bg-rose-50 border-l-4 border-rose-600 rounded-r-xl space-y-2 text-xs">
                      <div className="font-extrabold text-rose-900">
                        Rule: {selectedBookForViewer.previewPages[activePreviewPage].grammarBox?.rule}
                      </div>
                      <p className="text-rose-800">
                        {selectedBookForViewer.previewPages[activePreviewPage].grammarBox?.explanation}
                      </p>
                      <ul className="space-y-1 font-japanese text-rose-900 text-[11px] pt-1">
                        {selectedBookForViewer.previewPages[activePreviewPage].grammarBox?.examples.map((ex, i) => (
                          <li key={i}>• {ex}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Vocabulary List */}
                  {selectedBookForViewer.previewPages[activePreviewPage].vocabularyList && (
                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      <div className="text-xs font-bold uppercase text-slate-500">Core Vocabulary:</div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {selectedBookForViewer.previewPages[activePreviewPage].vocabularyList?.map((v, i) => (
                          <div key={i} className="p-2 bg-slate-50 rounded-lg border border-slate-200">
                            <span className="font-japanese font-bold text-slate-900">{v.word}</span>
                            <span className="text-slate-400 text-[10px] ml-1.5 font-japanese">({v.kana})</span>
                            <p className="text-[11px] text-slate-600 mt-0.5">{v.meaning}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-12 text-center text-slate-400">Page not found.</div>
              )}
            </div>

            {/* Viewer Bottom Navigation */}
            <div className="flex items-center justify-between border-t border-slate-800 pt-3">
              <div className="flex items-center gap-2">
                <button
                  disabled={activePreviewPage === 0}
                  onClick={() => setActivePreviewPage(prev => Math.max(0, prev - 1))}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 rounded-lg text-xs font-bold transition flex items-center gap-1"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Previous Page</span>
                </button>
                <button
                  disabled={activePreviewPage >= selectedBookForViewer.previewPages.length - 1}
                  onClick={() => setActivePreviewPage(prev => Math.min(selectedBookForViewer.previewPages.length - 1, prev + 1))}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 rounded-lg text-xs font-bold transition flex items-center gap-1"
                >
                  <span>Next Page</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-slate-400">
                  Sample Preview ({activePreviewPage + 1}/{selectedBookForViewer.previewPages.length})
                </span>
                <button
                  onClick={() => {
                    handleSimulatePurchase(selectedBookForViewer);
                    setSelectedBookForViewer(null);
                  }}
                  className="px-4 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-bold shadow transition flex items-center gap-1"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Buy Full E-Book (${selectedBookForViewer.price})</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Purchase Success Modal */}
      {purchaseSuccessModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-4 shadow-2xl animate-in fade-in zoom-in-95 text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center text-2xl font-bold">
              ✓
            </div>
            <h3 className="text-xl font-black text-slate-900">Purchase Completed!</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Your copy of <strong>"{purchaseSuccessModal.title}"</strong> has been unlocked. Instant PDF download link has been dispatched to your email.
            </p>
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs font-mono text-slate-700">
              License ID: JFT-BOOK-{Date.now()}
            </div>
            <button
              onClick={() => setPurchaseSuccessModal(null)}
              className="w-full py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800"
            >
              Continue Browsing
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
