import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Tag, Briefcase, Percent, Landmark, TrendingUp, DollarSign, Wallet, CreditCard, ShoppingCart } from 'lucide-react';
import { financialData } from '../../utils/financialData';
import { GenericFormScreen } from '../ui/GenericFormScreen';
import { ModuleGridCard } from '../ui/ModuleGridCard';

const iconMap = { Home, Tag, Briefcase, Percent, Landmark, TrendingUp, DollarSign, Wallet, CreditCard, ShoppingCart };

const FinancialCalculator = () => {
    const [selectedTool, setSelectedTool] = useState(null);

    if (!financialData || !Array.isArray(financialData)) {
        return (
            <div className="flex flex-col items-center justify-center p-8 text-center text-red-500">
                <p className="font-semibold">Error: Financial data unavailable.</p>
            </div>
        );
    }

    return (
        <div className="w-full">
            <AnimatePresence mode="wait">
                {!selectedTool ? (
                    <motion.div
                        key="grid"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, x: -20 }}
                    >
                        <div className="flex justify-between items-center mb-6 px-2">
                            <h2 className="text-2xl font-bold text-black dark:text-white tracking-tight">Financial</h2>
                        </div>
                        <div className="grid grid-cols-3 gap-3 sm:gap-4 pb-4">
                            {financialData.map((data) => {
                                const Icon = iconMap[data.icon] || DollarSign;
                                return (
                                    <ModuleGridCard
                                        key={data.id}
                                        id={data.id}
                                        category={data.id}
                                        icon={Icon}
                                        onClick={() => setSelectedTool(data.id)}
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
        </div>
    );
};

export default FinancialCalculator;