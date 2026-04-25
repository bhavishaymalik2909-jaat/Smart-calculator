import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';

export const GenericFormScreen = ({ title, inputs, calculateResult, initialValues, onBack, formatResult }) => {
    const [values, setValues] = useState(initialValues || {});
    const [resultData, setResultData] = useState(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (calculateResult) {
                const res = calculateResult(values);
                setResultData(res);
            }
        }, 150);
        return () => clearTimeout(timer);
    }, [values, calculateResult]);

    const handleChange = (e) => {
        setValues(v => ({ ...v, [e.target.name]: e.target.value }));
    };

    return (
        <div className="flex flex-col w-full bg-white dark:bg-dark-bg transition-colors">
            {/* Header */}
            <div className="flex items-center px-4 pt-4 pb-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-[#1A1A1A]/80">
                <button onClick={onBack} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full transition-colors mr-2 focus:outline-none">
                    <ChevronLeft size={24} className="text-gray-600 dark:text-gray-300" />
                </button>
                <h2 className="text-xl font-bold text-black dark:text-white uppercase tracking-wider">{title}</h2>
            </div>

            {/* Form */}
            <div className="px-6 py-6 bg-gray-50 dark:bg-dark-bg pb-8">
                <div className="space-y-4 mb-8">
                    {inputs.map((inp, idx) => (
                        <div key={inp.name} className="bg-white dark:bg-[#1A1A1A] p-5 rounded-2xl shadow-sm border border-transparent dark:border-gray-800 flex flex-col gap-2 focus-within:ring-2 focus-within:ring-primary/50 transition-all">
                            <label className="text-[13px] font-bold text-gray-400 tracking-widest uppercase pl-1">{inp.label}</label>
                            <div className="flex items-center gap-2">
                                {inp.prefix && <span className="text-2xl font-semibold text-gray-400">{inp.prefix}</span>}
                                <input
                                    type="number"
                                    name={inp.name}
                                    value={values[inp.name] === undefined ? '' : values[inp.name]}
                                    onChange={handleChange}
                                    placeholder={inp.placeholder || '0'}
                                    autoFocus={idx === 0}
                                    className="bg-transparent text-right text-3xl sm:text-4xl font-semibold text-black dark:text-white outline-none w-full" />
                                {inp.suffix && <span className="text-2xl font-semibold text-gray-400">{inp.suffix}</span>}
                            </div>
                        </div>
                    ))}
                </div>

                {resultData !== null && !resultData?.error && formatResult && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                        className="bg-primary/5 dark:bg-primary/10 border border-primary/20 text-black dark:text-white p-6 rounded-3xl shadow-sm">
                        {formatResult(resultData)}
                    </motion.div>
                )}
            </div>
        </div>
    );
};