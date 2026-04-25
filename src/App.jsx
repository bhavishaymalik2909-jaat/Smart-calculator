import React, { useState, useEffect, Suspense, useCallback } from 'react';
import { useCalculatorStore } from './store/useCalculatorStore';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Display } from './components/display/Display';
import { CalculatorLayout } from './components/layout/CalculatorLayout';
import BasicCalculator from './components/modes/BasicCalculator';
import { HistoryPanel } from './components/panels/HistoryPanel';
import { VoiceInput } from './components/ui/VoiceInput';
import { History, Moon, Sun, Monitor, Calculator, FlaskConical, Scaling, Settings, PieChart, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SettingsPanel } from './components/panels/SettingsPanel';

const ScientificCalculator = React.lazy(() => import('./components/modes/ScientificCalculator'));
const UnitConverter = React.lazy(() => import('./components/modes/UnitConverter'));
const FinancialCalculator = React.lazy(() => import('./components/modes/FinancialCalculator'));
const BodyCalculator = React.lazy(() => import('./components/modes/BodyCalculator'));

const AppContent = () => {
  const expression = useCalculatorStore(state => state.expression);
  const result = useCalculatorStore(state => state.result);
  const mode = useCalculatorStore(state => state.mode);
  const setMode = useCalculatorStore(state => state.setMode);
  const theme = useCalculatorStore(state => state.theme);
  const setTheme = useCalculatorStore(state => state.setTheme);
  const handleInput = useCalculatorStore(state => state.handleInput);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      useCalculatorStore.getState().incrementSessionTime();
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (isDark) root.classList.add('dark');
    else root.classList.remove('dark');
  }, [theme]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (mode !== 'basic' && mode !== 'scientific') return;
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) return;
      const key = e.key;
      if (/[0-9.]/.test(key)) handleInput('number', key);
      else if (['+', '-', '*', '/'].includes(key)) {
        const op = key === '*' ? '×' : key === '/' ? '÷' : key === '-' ? '−' : '+';
        handleInput('operator', op);
      } else if (key === 'Enter' || key === '=') {
        e.preventDefault();
        handleInput('calculate', '=');
      } else if (key === 'Backspace') handleInput('delete');
      else if (key === 'Escape') handleInput('clear');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleInput, mode]);

  const copyToClipboard = useCallback((text) => {
    if (text) navigator.clipboard.writeText(text);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light';
    setTheme(nextTheme);
  };

  const TopControls = () => (
    <div className="flex justify-between items-center mb-6 w-full">
      <div className="flex gap-2">
        <VoiceInput />
        <motion.button whileTap={{ scale: 0.9 }} onClick={toggleTheme}
          className="p-3 rounded-full bg-gray-100 dark:bg-[#1A1A1A] text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#2A2A2A] transition shadow-sm focus:outline-none">
          {theme === 'light' ? <Sun size={20} /> : theme === 'dark' ? <Moon size={20} /> : <Monitor size={20} />}
        </motion.button>
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => setIsHistoryOpen(true)}
          className="p-3 rounded-full bg-gray-100 dark:bg-[#1A1A1A] text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#2A2A2A] transition shadow-sm focus:outline-none">
          <History size={20} />
        </motion.button>
      </div>
      <motion.button whileTap={{ scale: 0.9 }} onClick={() => setIsSettingsOpen(true)}
        className="p-3 rounded-full bg-gray-100 dark:bg-[#1A1A1A] text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#2A2A2A] transition shadow-sm focus:outline-none">
        <Settings size={20} />
      </motion.button>
    </div>
  );

  const BottomNav = () => (
    <div className="flex justify-center gap-8 sm:gap-12 px-4">
      {[
        { id: 'basic', label: 'Basic', icon: Calculator },
        { id: 'scientific', label: 'Sci', icon: FlaskConical },
        { id: 'converter', label: 'Conv', icon: Scaling },
        { id: 'financial', label: 'Fin', icon: PieChart },
        { id: 'body', label: 'Body', icon: Activity }
      ].map(m => (
        <button key={m.id} onClick={() => setMode(m.id)}
          className={`flex flex-col items-center gap-1.5 p-2 focus:outline-none transition-colors ${mode === m.id ? 'text-primary' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`}>
          <m.icon size={22} className={`transition-all ${mode === m.id ? "drop-shadow-[0_0_8px_rgba(124,58,237,0.5)] scale-110" : ""}`} />
          <span className="text-[10px] font-semibold tracking-wide uppercase">{m.label}</span>
        </button>
      ))}
    </div>
  );

  return (
    <>
      <CalculatorLayout
        display={
          (mode === 'converter' || mode === 'financial' || mode === 'body') ? (
            <TopControls />
          ) : (
            <>
              <TopControls />
              <Display expression={expression} result={result} onCopy={copyToClipboard} />
            </>
          )
        }
        keypad={
          <Suspense fallback={null}>
            <AnimatePresence mode="wait">
              <motion.div
                key={mode}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.15 }}
                style={{ willChange: "opacity, transform" }}
                className="w-full"
              >
                {mode === 'basic' && <BasicCalculator />}
                {mode === 'scientific' && <ScientificCalculator />}
                {mode === 'converter' && <UnitConverter />}
                {mode === 'financial' && <FinancialCalculator />}
                {mode === 'body' && <BodyCalculator />}
              </motion.div>
            </AnimatePresence>
          </Suspense>
        }
        bottomNavigation={<BottomNav />}
      />
      <HistoryPanel isOpen={isHistoryOpen} onClose={() => setIsHistoryOpen(false)} />
      <SettingsPanel isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </>
  );
};

function App() {
  return (
    <ErrorBoundary>
      <div className="h-[100dvh] bg-gray-100 dark:bg-black w-full flex items-center justify-center transition-colors duration-300 font-sans overflow-hidden">
        <AppContent />
      </div>
    </ErrorBoundary>
  );
}

export default App;
