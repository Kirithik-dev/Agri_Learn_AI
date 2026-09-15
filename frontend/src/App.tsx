import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { GenerateTraining } from './pages/GenerateTraining';
import { TrainingLibrary } from './pages/TrainingLibrary';
import { KnowledgeBase } from './pages/KnowledgeBase';
import { EvaluationHub } from './pages/EvaluationHub';
import { Analytics } from './pages/Analytics';
import { About } from './pages/About';
import { TrainingModule } from './types';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [language, setLanguage] = useState<string>('English');
  const [isDark, setIsDark] = useState<boolean>(false);
  const [currentModule, setCurrentModule] = useState<TrainingModule | null>(null);

  // Sync dark class on documentElement
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const handleSelectTrainingFromAnywhere = (training: TrainingModule) => {
    setCurrentModule(training);
    setActiveTab('generate');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        language={language}
        setLanguage={setLanguage}
        isDark={isDark}
        setIsDark={setIsDark}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'home' && (
          <Home setActiveTab={setActiveTab} language={language} />
        )}

        {activeTab === 'dashboard' && (
          <Dashboard
            setActiveTab={setActiveTab}
            onSelectTraining={handleSelectTrainingFromAnywhere}
          />
        )}

        {activeTab === 'generate' && (
          <GenerateTraining
            currentModule={currentModule}
            setCurrentModule={setCurrentModule}
            defaultLanguage={language}
          />
        )}

        {activeTab === 'library' && (
          <TrainingLibrary
            onSelectTraining={handleSelectTrainingFromAnywhere}
          />
        )}

        {activeTab === 'knowledge' && <KnowledgeBase />}

        {activeTab === 'evaluation' && <EvaluationHub />}

        {activeTab === 'analytics' && <Analytics />}

        {activeTab === 'about' && <About />}
      </main>

      <Footer />
    </div>
  );
}

export default App;
