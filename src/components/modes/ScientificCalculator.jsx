import React, { useMemo, useCallback } from 'react';
import Button from '../keypad/Button';
import { useCalculatorStore } from '../../store/useCalculatorStore';

const ScientificCalculator = () => {
  const handleInput = useCalculatorStore(state => state.handleInput);
  const isDegree = useCalculatorStore(state => state.isDegree);
  const toggleAngleMode = useCalculatorStore(state => state.toggleAngleMode);

  const buttons = useMemo(() => [
    { label: 'MC', type: 'memory', variant: 'action' },
    { label: 'MR', type: 'memory', variant: 'action' },
    { label: 'M+', type: 'memory', variant: 'action' },
    { label: 'M-', type: 'memory', variant: 'action' },
    { label: 'sin', type: 'function', variant: 'action' },
    { label: 'cos', type: 'function', variant: 'action' },
    { label: 'tan', type: 'function', variant: 'action' },
    { label: '^', type: 'operator', variant: 'action' },
    { label: 'log', type: 'function', variant: 'action' },
    { label: 'ln', type: 'function', variant: 'action' },
    { label: 'sqrt', type: 'function', variant: 'action' },
    { label: '∛', type: 'function', variant: 'action' },
    { label: '(', type: 'function', variant: 'action' },
    { label: ')', type: 'operator', variant: 'action' },
    { label: 'DEL', type: 'delete', variant: 'action' },
    { label: 'C', type: 'clear', variant: 'action', className: 'text-red-500' },
    { label: '7', type: 'number', variant: 'default' },
    { label: '8', type: 'number', variant: 'default' },
    { label: '9', type: 'number', variant: 'default' },
    { label: '÷', type: 'operator', variant: 'primary' },
    { label: '4', type: 'number', variant: 'default' },
    { label: '5', type: 'number', variant: 'default' },
    { label: '6', type: 'number', variant: 'default' },
    { label: '×', type: 'operator', variant: 'primary' },
    { label: '1', type: 'number', variant: 'default' },
    { label: '2', type: 'number', variant: 'default' },
    { label: '3', type: 'number', variant: 'default' },
    { label: '−', type: 'operator', variant: 'primary' },
    { label: '0', type: 'number', variant: 'default' },
    { label: '.', type: 'number', variant: 'default' },
    { label: '=', type: 'calculate', variant: 'primary' },
    { label: '+', type: 'operator', variant: 'primary' }
  ], []);

  const onButtonClick = useCallback((label) => {
    const btn = buttons.find(b => b.label === label);
    if (btn) handleInput(btn.type, label);
  }, [buttons, handleInput]);

  return (
    <div className="h-full flex flex-col relative pb-2 overflow-hidden">
      <div className="flex justify-between items-center px-1 pb-3 pt-1 shrink-0">
         <span className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Scientific</span>
         <button 
            onClick={toggleAngleMode}
            className="text-xs font-bold px-3 py-1 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-full transition-transform active:scale-95 border border-gray-300 dark:border-gray-700"
         >
            {isDegree ? 'DEG' : 'RAD'}
         </button>
      </div>
      <div 
        className="grid grid-cols-4 gap-2 sm:gap-3 flex-1 overflow-y-auto pr-1 pb-8 custom-scrollbar touch-pan-y"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {buttons.map((btn, index) => {
        return (
          <Button 
            key={`${btn.label}-${index}`} 
            label={btn.label} 
            variant={btn.variant} 
            className={`text-base sm:text-xl py-2 min-h-[3rem] ${btn.className || ''}`} 
            onClick={onButtonClick} 
          />
        );
      })}
      </div>
    </div>
  );
};

export default ScientificCalculator;
