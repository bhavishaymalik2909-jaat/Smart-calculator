import React, { memo } from 'react';
import { motion } from 'framer-motion';

const Button = memo(({ label, onClick, className = "", variant = 'default', haptic = true }) => {
  const baseStyle = "flex items-center justify-center text-xl sm:text-2xl font-medium rounded-2xl shadow-md transition-colors duration-200 select-none touch-manipulation focus:outline-none";
  
  const variants = {
    default: "bg-white dark:bg-dark-surface text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800",
    primary: "bg-primary text-white hover:opacity-90 shadow-primary/30",
    action: "bg-gray-200 dark:bg-gray-800 text-black dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700"
  };

  const handlePress = () => {
    if (haptic && navigator.vibrate) {
      navigator.vibrate(10); // Subtle haptic feedback
    }
    onClick(label);
  };

  return (
    <motion.button
      whileTap={{ scale: 0.92, boxShadow: "0px 0px 8px rgba(0,0,0,0.1)" }}
      onClick={handlePress}
      className={`${baseStyle} ${variants[variant]} ${className}`}
      aria-label={String(label)}
    >
      {label}
    </motion.button>
  );
});

export default Button;
