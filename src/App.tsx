import React from 'react';
import { useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CookieBanner } from './components/CookieBanner';
import { AuthModal } from './components/AuthModal';
import { PricingModal } from './components/PricingModal';
import { VideoDemoModal } from './components/VideoDemoModal';
import { DemoToolbar } from './components/DemoToolbar';
import { AdminGuard } from './components/AdminGuard';

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
  const { currentView, themeConfig } = useApp();

  const isExamLive = currentView === 'exam';

  return (
    <div
      className="min-h-screen flex flex-col font-sans text-slate-900 selection:bg-rose-500 selection:text-white relative"
      style={{
        backgroundImage: themeConfig.backgroundImageUrl ? `url(${themeConfig.backgroundImageUrl})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundColor: '#090c15'
      }}
    >
      {/* Dynamic Background Glassy Overlay */}
      {themeConfig.backgroundImageUrl && (
        <div
          className="fixed inset-0 pointer-events-none transition-all duration-300 z-0"
          style={{
            backgroundColor: themeConfig.fullTransparency ? 'rgba(15, 23, 42, 0.45)' : 'rgba(248, 250, 252, 0.82)',
            backdropFilter: themeConfig.isGlassEnabled ? `blur(${themeConfig.glassBlur}px)` : undefined
          }}
        />
      )}

      {/* 1-Click Role Switcher Demo Control Bar */}
      <DemoToolbar />

      {/* Global Navbar (hidden during live CBT exam for Prometric full-screen immersion) */}
      {!isExamLive && <Navbar />}

      {/* Primary Page Content */}
      <div className="flex-1 flex flex-col relative z-10">
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
          <AdminGuard allowedRoles={['admin', 'teacher']}>
            <div className="min-h-screen w-full bg-[#090c15]">
              <AdminPanel />
            </div>
          </AdminGuard>
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
