import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCalculatorStore } from '../../store/useCalculatorStore';
import { X, Clock, Trash2 } from 'lucide-react';

export const HistoryPanel = ({ isOpen, onClose }) => {
  const history = useCalculatorStore(state => state.history);
  const handleInput = useCalculatorStore(state => state.handleInput);

  const handleRestore = (expr) => {
    handleInput('restore_history', expr);
    onClose();
  };

  const handleClearHistory = () => {
    useCalculatorStore.setState({ history: [] });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 w-80 h-full bg-white dark:bg-[#1A1A1A] z-50 shadow-2xl flex flex-col"
          >
            <div className="p-4 flex items-center justify-between border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <Clock size={20} className="text-primary" />
                <h2 className="text-lg font-medium text-black dark:text-white">History</h2>
              </div>
              <button 
                onClick={onClose} 
                className="p-2 text-gray-500 hover:text-black dark:hover:text-white rounded-full transition-colors focus:outline-none"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {history.length === 0 ? (
                <p className="text-gray-500 text-center mt-10">No history yet.</p>
              ) : (
                history.map((item) => (
                  <div 
                    key={item.id} 
                    onClick={() => handleRestore(item.expression)}
                    className="p-3 rounded-xl bg-gray-50 dark:bg-[#0F0F0F] hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition flex flex-col items-end gap-1"
                  >
                    <span className="text-gray-500 text-sm tracking-widest">{item.expression}</span>
                    <span className="text-black dark:text-white text-xl font-medium">={item.result}</span>
                  </div>
                ))
              )}
            </div>

            {history.length > 0 && (
              <div className="p-4 border-t border-gray-100 dark:border-gray-800">
                <button 
                  onClick={handleClearHistory}
                  className="w-full py-3 flex items-center justify-center gap-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition font-medium focus:outline-none"
                >
                  <Trash2 size={18} /> Clear History
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
