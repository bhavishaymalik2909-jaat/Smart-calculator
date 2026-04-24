import React, { useState, useCallback } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { useCalculatorStore } from '../../store/useCalculatorStore';
import { motion } from 'framer-motion';

export const VoiceInput = () => {
  const [isListening, setIsListening] = useState(false);
  const handleInput = useCalculatorStore(state => state.handleInput);
  
  const toggleListen = useCallback(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice input is not supported in this browser.");
      return;
    }
    
    if (isListening) return;

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      
      const mapped = transcript
        .replace(/plus/g, '+')
        .replace(/minus/g, '−')
        .replace(/times/g, '×')
        .replace(/multiplied by/g, '×')
        .replace(/divide(d)?( by)?/g, '÷')
        .replace(/percent/g, '%')
        .replace(/point/g, '.')
        .replace(/equal(s)?/g, '=')
        .replace(/[^0-9+\-×÷%.=]/g, ''); 
      
      for (const char of mapped) {
        if (/[0-9.]/.test(char)) handleInput('number', char);
        else if (/[+×÷−]/.test(char)) handleInput('operator', char);
        else if (char === '%') handleInput('function', char);
        else if (char === '=') handleInput('calculate', char);
      }
    };

    recognition.start();
  }, [isListening, handleInput]);

  return (
    <motion.button 
      whileTap={{ scale: 0.9 }}
      onClick={toggleListen}
      className={`p-3 rounded-full flex items-center justify-center transition-colors shadow-sm focus:outline-none
        ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-gray-100 dark:bg-dark-surface text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'}`}
      title="Tap to speak calculation"
    >
      {isListening ? <Mic size={20} /> : <MicOff size={20} />}
    </motion.button>
  );
};
