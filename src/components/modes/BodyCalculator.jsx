import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Flame, Droplets, Calendar, Heart } from 'lucide-react';
import { BODY_TOOLS } from '../../utils/bodyData';
import { GenericFormScreen } from '../ui/GenericFormScreen';
import { ModuleGridCard } from '../ui/ModuleGridCard';
import { useCalculatorStore } from '../../store/useCalculatorStore';

const iconMap = { Activity, Flame, Droplets, Calendar, Heart };

const BodyCalculator = () => {
    const [selectedTool, setSelectedTool] = useState(null);
    const { profile } = useCalculatorStore();

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
                            <h2 className="text-2xl font-bold text-black dark:text-white tracking-tight">Body & Health</h2>
                        </div>
                        <div className="grid grid-cols-3 gap-3 sm:gap-4 pb-4">
                            {Object.entries(BODY_TOOLS).map(([name, data]) => {
                                const Icon = iconMap[data.icon] || Activity;
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
                    >
                        <GenericFormScreen
                            title={selectedTool}
                            inputs={BODY_TOOLS[selectedTool].inputs}
                            calculateResult={BODY_TOOLS[selectedTool].calculate}
                            formatResult={BODY_TOOLS[selectedTool].formatResult}
                            initialValues={{
                                weight: profile?.weight || '',
                                height: profile?.height || ''
                            }}
                            onBack={() => setSelectedTool(null)}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default BodyCalculator;