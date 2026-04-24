import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { useCalculatorStore } from '../../store/useCalculatorStore';

export const ModuleGridCard = ({ id, category, icon: Icon, onClick }) => {
    const { favorites, toggleFavorite } = useCalculatorStore();
    const isFav = favorites.includes(id);

    return (
        <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className="bg-white dark:bg-[#1A1A1A] relative rounded-[1.25rem] p-5 shadow-sm hover:shadow-md border border-transparent hover:border-primary/20 dark:border-gray-800 transition flex flex-col items-start gap-4 focus:outline-none"
        >
            <div 
                className="absolute top-4 right-4 z-10 p-2 -m-2 opacity-60 hover:opacity-100" 
                onClick={(e) => { 
                    e.stopPropagation(); 
                    toggleFavorite(id); 
                }}
            >
                <Star size={18} className={`transition-all shadow-sm ${isFav ? 'fill-yellow-400 text-yellow-400 scale-110 drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]' : 'text-gray-300 dark:text-gray-600 hover:text-yellow-400'}`} />
            </div>
            <div className="p-3 bg-purple-50 dark:bg-primary/10 rounded-xl text-primary">
                {Icon && <Icon size={24} />}
            </div>
            <span className="font-semibold text-black dark:text-white tracking-wide text-left">{category}</span>
        </motion.button>
    );
};
