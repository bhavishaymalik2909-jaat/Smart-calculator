import React, { useCallback, useMemo } from 'react';
import Button from './Button';
import { useCalculatorStore } from '../../store/useCalculatorStore';

export const Keypad = () => {
  const handleInput = useCalculatorStore(state => state.handleInput);

  const buttons = useMemo(() => [
    { label: 'C', type: 'clear', variant: 'action' },
    { label: 'DEL', type: 'delete', variant: 'action' },
    { label: '%', type: 'function', variant: 'action' },
    { label: '÷', type: 'operator', variant: 'primary' },
    { label: '7', type: 'number', variant: 'default' },
    { label: '8', type: 'number', variant: 'default' },
    { label: '9', type: 'number', variant: 'default' },
    { label: '×', type: 'operator', variant: 'primary' },
    { label: '4', type: 'number', variant: 'default' },
    { label: '5', type: 'number', variant: 'default' },
    { label: '6', type: 'number', variant: 'default' },
    { label: '−', type: 'operator', variant: 'primary' },
    { label: '1', type: 'number', variant: 'default' },
    { label: '2', type: 'number', variant: 'default' },
    { label: '3', type: 'number', variant: 'default' },
    { label: '+', type: 'operator', variant: 'primary' },
    { label: '0', type: 'number', variant: 'default', className: 'col-span-2' },
    { label: '.', type: 'number', variant: 'default' },
    { label: '=', type: 'calculate', variant: 'primary' },
  ], []);

  const onButtonClick = useCallback((label) => {
    const btn = buttons.find(b => b.label === label);
    if (btn) handleInput(btn.type, label);
  }, [buttons, handleInput]);

  return (
    <div className="grid grid-cols-4 gap-3 h-full">
      {buttons.map((btn) => (
        <Button 
          key={btn.label} 
          label={btn.label} 
          variant={btn.variant} 
          className={btn.className} 
          onClick={onButtonClick} 
        />
      ))}
    </div>
  );
};
