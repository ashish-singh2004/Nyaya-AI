import React from 'react';
import { LanguageProvider, useApp } from './context/LanguageContext';
import { DisclaimerBanner } from './components/DisclaimerBanner';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { DemoScenarioModal } from './components/DemoScenarioModal';

import { Dashboard } from './pages/Dashboard';
import { AskLegal } from './pages/AskLegal';
import { DocumentSimplifier } from './pages/DocumentSimplifier';
import { SchemesDiscovery } from './pages/SchemesDiscovery';
import { FraudAwareness } from './pages/FraudAwareness';
import { LegalAidFinder } from './pages/LegalAidFinder';
import { AboutSocialImpact } from './pages/AboutSocialImpact';

const MainContent: React.FC = () => {
  const { activeTab } = useApp();

  return (
    <main className="flex-1">
      {activeTab === 'home' && <Dashboard />}
      {activeTab === 'ask' && <AskLegal />}
      {activeTab === 'simplifier' && <DocumentSimplifier />}
      {activeTab === 'schemes' && <SchemesDiscovery />}
      {activeTab === 'fraud' && <FraudAwareness />}
      {activeTab === 'legalaid' && <LegalAidFinder />}
      {activeTab === 'about' && <AboutSocialImpact />}
    </main>
  );
};

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans selection:bg-orange-100 selection:text-orange-900">
        <DisclaimerBanner />
        <Navbar />
        <MainContent />
        <Footer />
        <DemoScenarioModal />
      </div>
    </LanguageProvider>
  );
};

export default App;
