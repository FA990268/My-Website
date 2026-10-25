import React, { useState } from 'react';
import { ZoomIn, ZoomOut, RotateCw, FileText, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

interface PDFQuestionViewerProps {
  pdfUrl?: string;
  pdfPage?: number;
  readingPassage?: string;
  title?: string;
}

export const PDFQuestionViewer: React.FC<PDFQuestionViewerProps> = ({
  pdfUrl,
  pdfPage = 1,
  readingPassage,
  title = 'Official Exam Reading Sheet (PDF Document)'
}) => {
  const [zoom, setZoom] = useState<number>(100);
  const [currentPage, setCurrentPage] = useState<number>(pdfPage);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 20, 180));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 20, 70));
  const handleResetZoom = () => setZoom(100);

  return (
    <div className="flex flex-col h-full border border-slate-300 rounded-lg bg-slate-100 shadow-sm overflow-hidden">
      {/* PDF Viewer Header Toolbar */}
      <div className="bg-slate-800 text-white px-3 py-2 flex flex-wrap items-center justify-between text-xs gap-2 select-none">
        <div className="flex items-center gap-2 font-medium">
          <FileText className="w-4 h-4 text-orange-400" />
          <span className="truncate max-w-[200px] md:max-w-xs">{title}</span>
        </div>

        <div className="flex items-center gap-3">
          {/* Page Selector */}
          <div className="flex items-center gap-1 bg-slate-700/80 rounded px-1.5 py-0.5">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage <= 1}
              className="hover:text-orange-300 disabled:opacity-40 p-0.5"
              title="Previous Page"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <span className="px-1 text-[11px] font-mono">
              Page {currentPage} of 2
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(2, p + 1))}
              disabled={currentPage >= 2}
              className="hover:text-orange-300 disabled:opacity-40 p-0.5"
              title="Next Page"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Zoom controls */}
          <div className="flex items-center gap-1 bg-slate-700/80 rounded px-1.5 py-0.5">
            <button
              onClick={handleZoomOut}
              className="hover:text-orange-300 p-0.5"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] font-mono w-9 text-center">{zoom}%</span>
            <button
              onClick={handleZoomIn}
              className="hover:text-orange-300 p-0.5"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleResetZoom}
              className="hover:text-orange-300 p-0.5 ml-1 border-l border-slate-600 pl-1"
              title="Reset Zoom"
            >
              <RotateCw className="w-3 h-3" />
            </button>
          </div>

          {pdfUrl && (
            <a
              href={pdfUrl}
              target="_blank"
              rel="noreferrer"
              className="text-slate-300 hover:text-white p-0.5"
              title="Open full PDF in new tab"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>

      {/* PDF Document Render Area */}
      <div className="flex-1 overflow-auto p-4 flex justify-center bg-slate-200/90 min-h-[380px]">
        <div
          style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
          className="transition-transform duration-150 ease-out bg-white text-slate-900 shadow-xl border border-slate-300 rounded p-6 max-w-xl w-full min-h-[500px] flex flex-col"
        >
          {/* Document Header Stamp */}
          <div className="border-b-2 border-slate-800 pb-3 mb-4 flex items-center justify-between">
            <div>
              <span className="text-[10px] tracking-widest text-slate-500 font-semibold uppercase">
                Japan Foundation CBT Test Materials
              </span>
              <h3 className="font-bold text-base text-slate-800 font-japanese">
                {currentPage === 1 ? '【市民図書館 利用案内】' : '【資源ゴミ分別収集ルール】'}
              </h3>
            </div>
            <div className="text-right">
              <span className="inline-block border border-slate-400 text-slate-600 px-2 py-0.5 text-[10px] font-mono rounded">
                Sheet P-{currentPage}
              </span>
            </div>
          </div>

          {/* Document Visual Content */}
          <div className="flex-1 text-sm leading-relaxed font-japanese text-slate-800 space-y-3">
            {currentPage === 1 ? (
              <>
                <div className="bg-sky-50 border-l-4 border-sky-600 p-3 rounded-r text-xs">
                  <p className="font-semibold text-sky-900">市民図書館へ ようこそ</p>
                  <p className="text-sky-700 mt-0.5">どなたでも 自由にご利用いただけます。本を読むときは静かにしてください。</p>
                </div>

                <div className="space-y-1.5 text-xs">
                  <p className="font-bold text-slate-900">■ 開館時間（かいかんじかん）</p>
                  <p className="pl-3">火曜日〜日曜日：午前 9:00 〜 午後 19:00</p>
                  
                  <p className="font-bold text-slate-900 pt-1">■ 休館日（きゅうかんび）</p>
                  <p className="pl-3">毎週月曜日（月曜日が祝日のときは、その翌日の火曜日がお休みです）</p>

                  <p className="font-bold text-slate-900 pt-1">■ 本を返却するとき（へんきゃくについて）</p>
                  <div className="pl-3 space-y-1 bg-amber-50/70 p-2 border border-amber-200 rounded">
                    <p className="font-medium text-amber-950">① 開館中は、カウンターへ直接お持ちください。</p>
                    <p className="font-bold text-red-700">② 閉館している時間、および休館日は、入口横の「ブックポスト（返却箱）」に入れてください。</p>
                    <p className="text-[11px] text-slate-600 italic">※注意：CDやDVDは割れやすいため、ブックポストには入れず、開館中にカウンターでお返しください。</p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="bg-emerald-50 border-l-4 border-emerald-600 p-3 rounded-r text-xs">
                  <p className="font-semibold text-emerald-900">資源ゴミ（ペットボトル）の 正しい 出し方</p>
                  <p className="text-emerald-700 mt-0.5">リサイクルにご協力をお願いいたします。</p>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="border border-slate-200 p-2.5 rounded bg-slate-50 flex items-start gap-2">
                    <span className="bg-emerald-600 text-white font-bold text-[11px] px-1.5 py-0.5 rounded">ステップ 1</span>
                    <div>
                      <p className="font-bold text-red-700">キャップとフィルムラベルを 必ず 外してください。</p>
                      <p className="text-slate-600 text-[11px] mt-0.5">外したキャップとラベルは「プラスチック容器包装（プラゴミ）」の袋に入れてください。</p>
                    </div>
                  </div>

                  <div className="border border-slate-200 p-2.5 rounded bg-slate-50 flex items-start gap-2">
                    <span className="bg-emerald-600 text-white font-bold text-[11px] px-1.5 py-0.5 rounded">ステップ 2</span>
                    <div>
                      <p className="font-bold text-slate-900">ボトルの中を 水で軽く すすいでください。</p>
                      <p className="text-slate-600 text-[11px] mt-0.5">ジュースや油などの汚れを落とします。</p>
                    </div>
                  </div>

                  <div className="border border-slate-200 p-2.5 rounded bg-slate-50 flex items-start gap-2">
                    <span className="bg-emerald-600 text-white font-bold text-[11px] px-1.5 py-0.5 rounded">ステップ 3</span>
                    <div>
                      <p className="font-bold text-slate-900">足で 上から つぶしてください。</p>
                      <p className="text-slate-600 text-[11px] mt-0.5">専用の回収ネット袋に朝8:30までに出してください。</p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Optional raw reading passage text fallback if provided */}
            {readingPassage && (
              <div className="mt-4 pt-3 border-t border-slate-200 text-xs text-slate-600 whitespace-pre-line font-japanese">
                <span className="font-bold text-slate-700 block mb-1">【補足テキスト】</span>
                {readingPassage}
              </div>
            )}
          </div>

          {/* Document Footer */}
          <div className="border-t border-slate-200 pt-2 mt-4 text-[10px] text-slate-400 flex justify-between">
            <span>JFT-Basic Reading Comprehension Material</span>
            <span>Prometric CBT Simulation Mode 2</span>
          </div>
        </div>
      </div>
    </div>
  );
};
