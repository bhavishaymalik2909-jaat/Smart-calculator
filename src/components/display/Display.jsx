import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCalculatorStore } from '../../store/useCalculatorStore';

export const Display = ({ expression, result, onCopy }) => {
  const setExpression = useCalculatorStore(state => state.setExpression);
  const inputRef = useRef(null);

  const getExpressionSize = (text) => {
    const len = text ? String(text).length : 0;
    if (len < 18) return '1.25rem'; // xl
    if (len < 28) return '1rem'; // base
    return '0.875rem'; // sm
  };

  const getResultSize = (text) => {
    const len = text ? String(text).length : 0;
    if (len < 11) return '3rem'; // 5xl
    if (len < 15) return '2.25rem'; // 4xl
    if (len < 19) return '1.875rem'; // 3xl
    if (len < 24) return '1.5rem'; // 2xl
    return '1.25rem'; // xl
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-end gap-1 p-6 mb-4 rounded-3xl bg-gray-50 dark:bg-[#1A1A1A] shadow-[inset_0_2px_10px_rgba(0,0,0,0.05)] cursor-pointer select-text overflow-hidden"
      onClick={() => onCopy && onCopy(result)}
      title="Tap to copy result"
    >
      <div className="h-8 w-full">
        <AnimatePresence mode="wait">
          <motion.input
            key="expr"
            ref={inputRef}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.15 }}
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
            style={{ fontSize: getExpressionSize(expression) }}
            className="bg-transparent border-none text-gray-500 dark:text-gray-400 tracking-wider font-light w-full text-right outline-none truncate pb-1 transition-all duration-200"
            placeholder=""
          />
        </AnimatePresence>
      </div>

      <div className="h-16 w-full flex justify-end items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={result || 'empty-res'}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{ fontSize: getResultSize(result || "0") }}
            className="text-black dark:text-white font-semibold w-full text-right truncate tracking-tight overflow-x-auto pb-1 transition-all duration-200"
          >
            {result || "0"}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
