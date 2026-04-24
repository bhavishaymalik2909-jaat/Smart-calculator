import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Tag, Briefcase, Percent, Landmark, TrendingUp, DollarSign, Wallet, CreditCard, ShoppingCart } from 'lucide-react';
import { financialData } from '../../utils/financialData';
import { GenericFormScreen } from '../ui/GenericFormScreen';
import { ModuleGridCard } from '../ui/ModuleGridCard';

// Using consistent icons if they missing from util mapping
const iconMap = { Home, Tag, Briefcase, Percent, Landmark, TrendingUp, DollarSign, Wallet, CreditCard, ShoppingCart };

const FinancialCalculator = () => {
    const [selectedTool, setSelectedTool] = useState(null);

    return (
        <div className="h-full w-full relative bg-gray-50 dark:bg-dark-bg">
            {(!financialData || !Array.isArray(financialData)) ? (
                <div className="flex h-full flex-col items-center justify-center p-8 text-center text-red-500">
                    <p className="font-semibold">Error: Financial data source unavailable or invalid format.</p>
                </div>
            ) : (
            <AnimatePresence mode="wait">
                {!selectedTool ? (
                    <motion.div 
                        key="grid"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="h-full w-full overflow-y-auto px-4 pb-32 pt-8 scrollbar-hide"
                    >
                        <div className="flex justify-between items-center mb-6 px-2">
                           <h2 className="text-2xl font-bold text-black dark:text-white tracking-tight">Financial</h2>
                        </div>
                        <div className="grid grid-cols-3 gap-3 sm:gap-4">
                            {financialData?.map((data) => {
                                const name = data.id;
                                const Icon = iconMap[data.icon] || DollarSign;
                                return (
                                    <ModuleGridCard 
                                        key={name}
                                        id={name}
                                        category={name}
                                        icon={Icon}
                                        onClick={() => setSelectedTool(name)}
                                    />
                                );
                            })}
                        </div>
                    </motion.div>
                ) : (
                    <motion.div 
                        key="screen"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="absolute inset-0 z-20 bg-white dark:bg-dark-bg"
                    >
                        <GenericFormScreen 
                            title={selectedTool}
                            inputs={financialData.find(d => d.id === selectedTool)?.inputs || []}
                            calculateResult={financialData.find(d => d.id === selectedTool)?.calculate}
                            formatResult={financialData.find(d => d.id === selectedTool)?.formatResult}
                            onBack={() => setSelectedTool(null)}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
            )}
        </div>
    );
};

export default FinancialCalculator;
