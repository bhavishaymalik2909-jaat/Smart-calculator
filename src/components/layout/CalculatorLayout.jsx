import React from 'react';
import { motion } from 'framer-motion';
import { useCalculatorStore } from '../../store/useCalculatorStore';

export const CalculatorLayout = ({ display, keypad, bottomNavigation }) => {
  const { oneHandMode } = useCalculatorStore();

  const layoutClasses = oneHandMode 
    ? "w-full max-w-[300px] h-[600px] shadow-[0_20px_60px_rgba(0,0,0,0.3)] rounded-[2.5rem] bg-white dark:bg-dark-bg transition-colors duration-300 overflow-hidden relative select-none absolute bottom-10 right-4 border border-gray-300 dark:border-gray-700 cursor-grab z-50"
    : "w-full max-w-[420px] mx-auto h-[100dvh] flex flex-col bg-white dark:bg-dark-bg transition-colors duration-300 shadow-2xl overflow-hidden relative select-none sm:max-w-full sm:rounded-none sm:border-none";

  return (
    <motion.div 
      drag={oneHandMode}
      dragConstraints={{ left: -150, right: 50, top: -250, bottom: 50 }}
      dragElastic={0.2}
      whileDrag={{ scale: 0.95, cursor: "grabbing" }}
      className={`${layoutClasses} flex flex-col`}
    >
      
      {display && (
        <div className="flex-none pt-8 px-6">
          {display}
        </div>
      )}

      <div className={`flex-1 relative overflow-hidden ${display ? 'px-6 pb-6 mt-2' : ''}`}>
        {keypad}
      </div>

      <div className="flex-none pt-2 pb-8 sm:pb-6 bg-gray-50/90 dark:bg-[#111111]/90 backdrop-blur-md border-t border-gray-100 dark:border-gray-900 z-50 relative">
        {bottomNavigation}
      </div>
    </motion.div>
  );
};
