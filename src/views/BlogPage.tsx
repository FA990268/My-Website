import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { INITIAL_BLOG_ARTICLES, BlogPost } from '../lib/blogData';
import { Newspaper, Clock, ArrowRight, BookOpen, Sparkles, ChevronRight } from 'lucide-react';

export const BlogPage: React.FC = () => {
  const { navigateTo } = useApp();
  const [selectedArticle, setSelectedArticle] = useState<BlogPost | null>(null);

  return (
    <div className="min-h-screen font-sans py-8 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Banner */}
        <div className="rounded-[2.25rem] glass-panel p-6 sm:p-8 text-white shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-white/30 backdrop-blur-2xl">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/15 text-white border border-white/30 backdrop-blur">
              <Newspaper className="w-3.5 h-3.5" />
              <span>Official Exam Guides, CBT Strategies & SSW Visa News</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              JFT Guru Knowledge Base & Strategy Blog
            </h1>
            <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
              In-depth articles authored by Prometric test center supervisors and licensed Japanese immigration advisers.
            </p>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {INITIAL_BLOG_ARTICLES.map(article => (
            <div
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="rounded-[2.25rem] glass-panel p-6 space-y-4 shadow-xl hover:shadow-2xl transition cursor-pointer flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className={`h-40 rounded-2xl bg-gradient-to-tr ${article.imageGradient} flex items-center justify-center p-6 text-white text-center shadow-inner border border-white/20`}>
                  <span className="font-black text-base leading-snug line-clamp-2">{article.title}</span>
                </div>

                <div className="flex items-center gap-2 text-[10px] font-bold text-white/70">
                  <span className="text-rose-300 bg-white/15 px-2.5 py-0.5 rounded-full border border-white/20">{article.category}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                  <span>•</span>
                  <span>{article.publishDate}</span>
                </div>

                <h3 className="text-base font-black text-white group-hover:text-rose-300 transition leading-snug">
                  {article.title}
                </h3>

                <p className="text-xs text-white/80 line-clamp-3 leading-relaxed">
                  {article.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-white/15 flex items-center justify-between text-xs font-bold text-rose-300 group-hover:text-white transition">
                <span>Read Complete Guide</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel text-white rounded-[2.5rem] max-w-3xl w-full p-6 sm:p-8 space-y-5 shadow-2xl animate-in fade-in zoom-in-95 max-h-[92vh] overflow-y-auto font-sans relative border border-white/30 backdrop-blur-2xl">
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/15 text-white hover:bg-white/25 border border-white/30 flex items-center justify-center text-xs font-bold transition"
            >
              ✕
            </button>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-rose-300">
                <span>{selectedArticle.category}</span>
                <span>•</span>
                <span>{selectedArticle.readTime}</span>
                <span>•</span>
                <span>By {selectedArticle.author} ({selectedArticle.authorRole})</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
                {selectedArticle.title}
              </h2>
            </div>

            {/* Key Takeaways */}
            <div className="p-4 bg-white/10 border border-white/20 rounded-2xl space-y-2 backdrop-blur">
              <div className="text-xs font-extrabold text-rose-300">Key Takeaways for Exam Candidates:</div>
              <ul className="space-y-1 text-xs text-white/90 list-disc list-inside">
                {selectedArticle.keyTakeaways.map((k, i) => (
                  <li key={i}>{k}</li>
                ))}
              </ul>
            </div>

            {/* Body Paragraphs */}
            <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
              {selectedArticle.contentParagraphs.map((p, i) => (
                <div key={i} className="space-y-1.5">
                  <h4 className="font-extrabold text-slate-900 text-sm">{p.heading}</h4>
                  <p>{p.text}</p>
                  {p.callout && (
                    <div className="p-3 bg-amber-50 border-l-4 border-amber-500 text-amber-900 text-xs font-semibold rounded-r-lg">
                      {p.callout}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Modal Bottom CTA */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-200"
              >
                Close
              </button>

              <button
                onClick={() => {
                  setSelectedArticle(null);
                  navigateTo('mock-tests');
                }}
                className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold shadow-md shadow-rose-600/30 flex items-center gap-1.5"
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
