import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDownUp, ChevronLeft } from 'lucide-react';
import { CATEGORY_DATA, formatConversionResult, performConversion } from '../../utils/conversionData';

export const ConverterScreen = ({ category, onBack }) => {
    const data = CATEGORY_DATA[category];
    const unitNames = data.custom ? data.units : Object.keys(data.units);

    const [fromUnit, setFromUnit] = useState(unitNames[0]);
    const [toUnit, setToUnit] = useState(unitNames[1] || unitNames[0]);
    
    const [fromValue, setFromValue] = useState("");
    const [toValue, setToValue] = useState("");
    const [activeInput, setActiveInput] = useState(null); // 'from' | 'to'

    const [rates, setRates] = useState(null);
    const [loadingRates, setLoadingRates] = useState(category === 'Currency');

    // Fetch currency rates
    useEffect(() => {
        if (category === 'Currency') {
            fetch('https://v6.exchangerate-api.com/v6/a58c49b4447b407ffd227249/latest/USD')
              .then(res => res.json())
              .then(data => {
                  if (data && data.conversion_rates) {
                      setRates(data.conversion_rates);
                  }
                  setLoadingRates(false);
              })
              .catch(err => {
                  console.error("Currency API failed", err);
                  setRates({ USD: 1, EUR: 0.9, GBP: 0.8, JPY: 150, CAD: 1.3, AUD: 1.5, INR: 83 });
                  setLoadingRates(false);
              });
        }
    }, [category]);

    // Handle conversions when inputs or units change
    useEffect(() => {
        if (!activeInput) return; // Prevent initial double renders or loops
        if (category === 'Currency' && loadingRates) return;

        // Slight debounce using a fast timeout to prevent lag spikes on very rapid typing
        const timer = setTimeout(() => {
            if (activeInput === 'from') {
                const res = performConversion(category, fromValue, fromUnit, toUnit, rates);
                // For Binary, don't format mathematically
                setToValue(category === "Binary" ? res : formatConversionResult(res));
            } else if (activeInput === 'to') {
                const res = performConversion(category, toValue, toUnit, fromUnit, rates);
                setFromValue(category === "Binary" ? res : formatConversionResult(res));
            }
        }, 50);

        return () => clearTimeout(timer);
    }, [fromValue, toValue, fromUnit, toUnit, activeInput, category, rates, loadingRates]);

    const handleSwap = () => {
        setActiveInput('from'); // Force evaluation stream direction
        const tempUnit = fromUnit;
        setFromUnit(toUnit);
        setToUnit(tempUnit);
        // The values will swap naturally by the flip of units and the active loop,
        // but better UX is to stick the fromValue to whatever it was.
    };

    return (
        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col h-full bg-white dark:bg-dark-bg transition-colors w-full relative sm:rounded-[2rem] sm:h-[850px] shadow-2xl overflow-hidden"
        >
            {/* Header */}
            <div className="flex items-center px-4 pt-10 pb-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-[#1A1A1A]/80 backdrop-blur-md">
                <button onClick={onBack} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full transition-colors mr-2 focus:outline-none">
                    <ChevronLeft size={24} className="text-gray-600 dark:text-gray-300" />
                </button>
                <h2 className="text-xl font-semibold text-black dark:text-white uppercase tracking-wider">{category}</h2>
                {loadingRates && <span className="ml-auto text-xs text-primary animate-pulse tracking-widest font-bold">LIVE RATES...</span>}
            </div>

            {/* Content area */}
            <div className="flex-1 px-5 py-6 relative bg-gray-50 dark:bg-dark-bg rounded-t-3xl sm:rounded-none">
                {/* FROM BOX */}
                <div className="bg-white dark:bg-[#1A1A1A] p-5 rounded-2xl shadow-md border border-gray-100 dark:border-gray-800 flex flex-col gap-2 focus-within:ring-2 focus-within:ring-primary/50 transition-shadow">
                    <select 
                        value={fromUnit} onChange={(e) => setFromUnit(e.target.value)}
                        className="bg-transparent text-gray-500 dark:text-gray-400 font-medium text-lg outline-none cursor-pointer p-0 appearance-none hover:text-primary"
                    >
                        {unitNames.map(u => <option key={u} value={u} className="text-black">{u}</option>)}
                    </select>
                    <input 
                        type="text" 
                        placeholder="0"
                        value={fromValue}
                        onFocus={() => setActiveInput('from')}
                        onChange={(e) => {
                           setActiveInput('from');
                           setFromValue(e.target.value);
                        }}
                        className="bg-transparent text-right text-4xl sm:text-5xl font-semibold text-black dark:text-white outline-none w-full"
                    />
                </div>

                {/* SWAP BUTTON */}
                <div className="flex justify-center -my-4 relative z-10">
                    <motion.button 
                        whileTap={{ scale: 0.85, rotate: 180 }}
                        onClick={handleSwap}
                        className="p-4 bg-primary text-white rounded-full shadow-lg hover:shadow-primary/50 hover:bg-opacity-90 transition-all focus:outline-none"
                    >
                        <ArrowDownUp size={24} />
                    </motion.button>
                </div>

                {/* TO BOX */}
                <div className="bg-white dark:bg-[#1A1A1A] p-5 rounded-2xl shadow-md border border-gray-100 dark:border-gray-800 flex flex-col gap-2 focus-within:ring-2 focus-within:ring-primary/50 transition-shadow">
                    <select 
                        value={toUnit} onChange={(e) => setToUnit(e.target.value)}
                        className="bg-transparent text-gray-500 dark:text-gray-400 font-medium text-lg outline-none cursor-pointer p-0 appearance-none hover:text-primary"
                    >
                        {unitNames.map(u => <option key={u} value={u} className="text-black">{u}</option>)}
                    </select>
                    <input 
                        type="text" 
                        placeholder="0"
                        value={toValue}
                        onFocus={() => setActiveInput('to')}
                        onChange={(e) => {
                           setActiveInput('to');
                           setToValue(e.target.value);
                        }}
                        className="bg-transparent text-right text-4xl sm:text-5xl font-semibold text-primary outline-none w-full"
                    />
                </div>
            </div>
        </motion.div>
    );
};
