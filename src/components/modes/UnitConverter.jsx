import React, { useState } from 'react';
import { Ruler, Maximize, Cylinder, Scale, HardDrive, Gauge, Clock, Thermometer, Binary, Banknote, Fuel, Utensils, Superscript, Flame, Globe, Pencil, Circle, Wind, Dumbbell, Wrench, Volume2, Droplet, Zap, RefreshCw, Snowflake, RotateCw, Box, Droplets, FlaskConical, Layers, Activity, Layout, Monitor, Wifi, Radio, Sun, Magnet, TrendingUp } from 'lucide-react';
import { CATEGORY_DATA } from '../../utils/conversionData';
import { ConverterScreen } from './ConverterScreen';
import { ModuleGridCard } from '../ui/ModuleGridCard';
import { motion, AnimatePresence } from 'framer-motion';

const iconMap = { Ruler, Maximize, Cylinder, Scale, HardDrive, Gauge, Clock, Thermometer, Binary, Banknote, Fuel, Utensils, Superscript, Flame, Globe, Pencil, Circle, Wind, Dumbbell, Wrench, Volume2, Droplet, Zap, RefreshCw, Snowflake, RotateCw, Box, Droplets, FlaskConical, Layers, Activity, Layout, Monitor, Wifi, Radio, Sun, Magnet, TrendingUp };

const UnitConverter = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);

    return (
        <div className="w-full">
            <AnimatePresence mode="wait">
                {!selectedCategory ? (
                    <motion.div
                        key="grid"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, x: -20 }}
                    >
                        <div className="flex justify-between items-center mb-6 px-2">
                            <h2 className="text-2xl font-bold text-black dark:text-white tracking-tight">Conversions</h2>
                        </div>
                        <div className="grid grid-cols-3 gap-3 sm:gap-4 pb-4">
                            {Object.entries(CATEGORY_DATA).map(([category, data]) => {
                                const Icon = iconMap[data.icon] || Box;
                                return (
                                    <ModuleGridCard
                                        key={category}
                                        id={category}
                                        category={category}
                                        icon={Icon}
                                        onClick={() => setSelectedCategory(category)}
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
                        <ConverterScreen category={selectedCategory} onBack={() => setSelectedCategory(null)} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default UnitConverter;