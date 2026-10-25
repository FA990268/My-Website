import React from 'react';
import { useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CookieBanner } from './components/CookieBanner';
import { AuthModal } from './components/AuthModal';
import { PricingModal } from './components/PricingModal';
import { VideoDemoModal } from './components/VideoDemoModal';
import { DemoToolbar } from './components/DemoToolbar';

// Views
import { LandingPage } from './views/LandingPage';
import { MockTestsCatalog } from './views/MockTestsCatalog';
import { ExamPreview } from './views/ExamPreview';
import { PrometricCBTExam } from './views/PrometricCBTExam';
import { ResultSheet } from './views/ResultSheet';
import { ToolsHub } from './views/ToolsHub';
import { AISpeakingCoach } from './views/AISpeakingCoach';
import { DigitalStore } from './views/DigitalStore';
import { ForInstitutes } from './views/ForInstitutes';
import { BlogPage } from './views/BlogPage';
import { AdminPanel } from './views/AdminPanel';
import { StudentDashboard } from './views/StudentDashboard';

export function App() {
  const { currentView } = useApp();

  const isExamLive = currentView === 'exam';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900 selection:bg-rose-500 selection:text-white">
      {/* 1-Click Role Switcher Demo Control Bar */}
      <DemoToolbar />

      {/* Global Navbar (hidden during live CBT exam for Prometric full-screen immersion) */}
      {!isExamLive && <Navbar />}

      {/* Primary Page Content */}
      <div className="flex-1 flex flex-col">
        {currentView === 'landing' && <LandingPage />}
        {currentView === 'mock-tests' && <MockTestsCatalog />}
        {currentView === 'preview' && <ExamPreview />}
        {currentView === 'exam' && <PrometricCBTExam />}
        {currentView === 'result-sheet' && <ResultSheet />}
        {currentView === 'tools' && <ToolsHub />}
        {currentView === 'ai-speaking' && <AISpeakingCoach />}
        {currentView === 'store' && <DigitalStore />}
        {currentView === 'institutes' && <ForInstitutes />}
        {currentView === 'blog' && <BlogPage />}
        {currentView === 'admin' && (
          <div className="min-h-screen w-full bg-[#090c15]">
            <AdminPanel />
          </div>
        )}
        {currentView === 'dashboard' && (
          <div className="min-h-screen bg-slate-50 p-4 md:p-8">
            <div className="max-w-5xl mx-auto">
              <StudentDashboard />
            </div>
          </div>
        )}
      </div>

      {/* Global Footer (hidden during live CBT exam) */}
      {!isExamLive && <Footer />}

      {/* Persistent Cookie Banner */}
      <CookieBanner />

      {/* Global Modals */}
      <AuthModal />
      <PricingModal />
      <VideoDemoModal />
    </div>
  );
}

export default App;
