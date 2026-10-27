import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.en;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isDemoModalOpen: boolean;
  setIsDemoModalOpen: (open: boolean) => void;
  demoScenario: string | null;
  triggerDemoScenario: (scenarioId: string) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isDemoModalOpen, setIsDemoModalOpen] = useState<boolean>(false);
  const [demoScenario, setDemoScenario] = useState<string | null>(null);

  const t = translations[language];

  const triggerDemoScenario = (scenarioId: string) => {
    setDemoScenario(scenarioId);
    if (scenarioId === 'scenario-a') {
      setActiveTab('simplifier');
    } else if (scenarioId === 'scenario-b') {
      setActiveTab('fraud');
    } else if (scenarioId === 'scenario-c') {
      setActiveTab('legalaid');
    }
    setIsDemoModalOpen(false);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        activeTab,
        setActiveTab,
        isDemoModalOpen,
        setIsDemoModalOpen,
        demoScenario,
        triggerDemoScenario,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useApp must be used within a LanguageProvider');
  }
  return context;
};
