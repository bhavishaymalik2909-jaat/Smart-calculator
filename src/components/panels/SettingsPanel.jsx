import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCalculatorStore } from '../../store/useCalculatorStore';
import { 
  X, User, Settings as SettingsIcon, Heart, Star, Trash2, Smartphone,
  Info, Shield, FileText, HelpCircle, Share2, Star as StarOutline, Hand
} from 'lucide-react';

export const SettingsPanel = ({ isOpen, onClose }) => {
  const { profile, updateProfile, preferences, updatePreferences, favorites, toggleFavorite, resetApp, theme, setTheme, oneHandMode, toggleOneHandMode } = useCalculatorStore();
  const [activeTab, setActiveTab] = useState('profile'); // profile | app | about
  
  // Isolate profile state locally to prevent massive global store re-renders on every keystroke
  const [localProfile, setLocalProfile] = useState(profile);

  const handleProfileChange = (e) => {
      setLocalProfile(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleProfileBlur = (e) => {
      updateProfile({ [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to absolute reset App and all configurations?")) {
      resetApp();
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-40"
          />
          <motion.div 
            initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            style={{ willChange: "transform" }}
            className="fixed bottom-0 left-0 w-full h-[90vh] bg-white dark:bg-[#1A1A1A] z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] rounded-t-[2rem] flex flex-col"
          >
            <div className="p-4 pt-6 flex items-center justify-between border-b border-gray-100 dark:border-gray-800">
              <h2 className="text-xl font-bold text-black dark:text-white ml-3">Settings</h2>
              <button onClick={onClose} className="p-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors focus:outline-none">
                <X size={20} className="text-gray-600 dark:text-gray-300" />
              </button>
            </div>

            {/* TABS */}
            <div className="flex px-4 pt-4 border-b border-gray-100 dark:border-gray-800">
                <button onClick={() => setActiveTab('profile')} className={`flex-1 pb-3 text-sm font-semibold tracking-wide transition-colors ${activeTab === 'profile' ? 'border-b-2 border-primary text-primary' : 'text-gray-500'}`}><User size={18} className="mx-auto mb-1"/>Profile</button>
                <button onClick={() => setActiveTab('app')} className={`flex-1 pb-3 text-sm font-semibold tracking-wide transition-colors ${activeTab === 'app' ? 'border-b-2 border-primary text-primary' : 'text-gray-500'}`}><SettingsIcon size={18} className="mx-auto mb-1"/>Preferences</button>
                <button onClick={() => setActiveTab('about')} className={`flex-1 pb-3 text-sm font-semibold tracking-wide transition-colors ${activeTab === 'about' ? 'border-b-2 border-primary text-primary' : 'text-gray-500'}`}><Info size={18} className="mx-auto mb-1"/>About</button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-5 pb-10">
               {/* ---------------- PROFILE TAB ---------------- */}
               {activeTab === 'profile' && (
                   <div className="space-y-4">
                       {[
                           { name: 'fullName', label: 'Full Name', type: 'text', placeholder: 'John Doe' },
                           { name: 'dob', label: 'Date of Birth', type: 'date' },
                           { name: 'weight', label: 'Weight (kg)', type: 'number', placeholder: '75' },
                           { name: 'height', label: 'Height (cm)', type: 'number', placeholder: '180' },
                           { name: 'email', label: 'Email', type: 'email', placeholder: 'john@example.com' },
                           { name: 'phone', label: 'Phone', type: 'tel', placeholder: '+1 234 567 8900' }
                       ].map(field => (
                           <div key={field.name} className="flex flex-col gap-1.5">
                               <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest pl-2">{field.label}</label>
                               <input 
                                  type={field.type} name={field.name} value={localProfile?.[field.name] || ''} onChange={handleProfileChange} onBlur={handleProfileBlur} placeholder={field.placeholder}
                                  className="w-full bg-gray-50 dark:bg-dark-bg p-4 rounded-xl border border-transparent focus:border-primary/50 outline-none text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-600 font-medium transition-colors"
                               />
                           </div>
                       ))}
                   </div>
               )}

               {/* ---------------- PREFERENCES TAB ---------------- */}
               {activeTab === 'app' && (
                   <div className="space-y-6">
                       
                       <div className="space-y-2">
                           <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest pl-2 mb-2">Display & Haptics</h3>
                           
                           <div className="bg-gray-50 dark:bg-dark-bg p-4 rounded-2xl flex items-center justify-between shadow-sm border border-transparent dark:border-gray-800">
                               <span className="font-medium text-black dark:text-white">Theme</span>
                               <select value={theme || 'system'} onChange={(e) => setTheme(e.target.value)} className="bg-white dark:bg-[#1A1A1A] p-2 px-3 rounded-lg border border-gray-200 dark:border-gray-700 outline-none font-medium cursor-pointer">
                                   <option value="light">Light</option>
                                   <option value="dark">Dark</option>
                                   <option value="system">System</option>
                               </select>
                           </div>

                           <button onClick={() => updatePreferences({ vibration: !preferences?.vibration })} className="w-full mt-2 bg-gray-50 dark:bg-dark-bg p-4 rounded-2xl flex items-center justify-between active:scale-[0.98] transition-transform shadow-sm border border-transparent dark:border-gray-800 focus:outline-none">
                               <div className="flex items-center gap-3">
                                   <Smartphone size={18} className="text-primary"/>
                                   <span className="font-medium text-black dark:text-white">Haptic Vibration</span>
                               </div>
                               <div className={`w-12 h-6 rounded-full transition-colors relative ${preferences?.vibration ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'}`}>
                                   <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-all ${preferences?.vibration ? 'left-6' : 'left-0.5'}`} />
                               </div>
                           </button>

                           <button onClick={() => toggleOneHandMode()} className="w-full mt-2 bg-gray-50 dark:bg-dark-bg p-4 rounded-2xl flex items-center justify-between active:scale-[0.98] transition-transform shadow-sm border border-transparent dark:border-gray-800 focus:outline-none">
                               <div className="flex items-center gap-3">
                                   <Hand size={18} className="text-primary"/>
                                   <span className="font-medium text-black dark:text-white">One-Hand Mode</span>
                               </div>
                               <div className={`w-12 h-6 rounded-full transition-colors relative ${oneHandMode ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'}`}>
                                   <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-all ${oneHandMode ? 'left-6' : 'left-0.5'}`} />
                               </div>
                           </button>
                       </div>

                       <div className="space-y-2 mt-6">
                           <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest pl-2 mb-2">My Favorites</h3>
                           <div className="space-y-2">
                               {favorites?.length === 0 ? (
                                   <div className="text-center py-6 text-gray-400 font-medium px-4 flex flex-col items-center">
                                       <StarOutline size={32} className="mb-2 opacity-30 text-gray-400" />
                                       <p className="text-[13px] leading-relaxed">No pinned modules. Pin them by clicking the Star icon!</p>
                                   </div>
                               ) : (
                                   favorites?.map(fav => (
                                       <div key={fav} className="bg-gray-50 dark:bg-dark-bg p-4 rounded-xl flex items-center justify-between shadow-sm border border-transparent dark:border-gray-800">
                                           <span className="font-semibold text-sm text-black dark:text-white tracking-wide">{fav}</span>
                                           <button onClick={() => toggleFavorite(fav)} className="p-2 -m-2 opacity-80 hover:opacity-100 text-yellow-500 active:scale-90 transition-transform focus:outline-none">
                                               <Star size={18} className="fill-yellow-500 drop-shadow-sm" />
                                           </button>
                                       </div>
                                   ))
                               )}
                           </div>
                       </div>

                       <div className="space-y-2 mt-8">
                           <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest pl-2 mb-2">Danger Zone</h3>
                           <button onClick={handleReset} className="w-full bg-red-50 dark:bg-red-900/10 hover:bg-red-100 dark:hover:bg-red-900/20 p-4 rounded-2xl flex items-center justify-between active:scale-[0.98] transition-colors text-red-600 dark:text-red-400 focus:outline-none">
                               <div className="flex items-center gap-3">
                                   <Trash2 size={18} />
                                   <span className="font-semibold tracking-wide">Format & Factory Reset</span>
                               </div>
                           </button>
                       </div>
                   </div>
               )}

               {/* ---------------- ABOUT TAB ---------------- */}
               {activeTab === 'about' && (
                   <div className="space-y-6">
                        <div className="flex flex-col items-center py-6">
                            <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mb-4 text-primary">
                                <Info size={36} />
                            </div>
                            <h3 className="text-xl font-bold text-black dark:text-white">Super App</h3>
                            <p className="text-gray-500 font-medium">Version 2.3.0</p>
                        </div>

                        <div className="space-y-2">
                             {[
                                 { icon: Shield, label: 'Privacy Policy', action: () => alert('Privacy Policy opened') },
                                 { icon: FileText, label: 'Terms of Service', action: () => alert('Terms of Service opened') },
                                 { icon: HelpCircle, label: 'Customer Support', action: () => alert('Support opened') }
                             ].map((item, idx) => (
                                 <button key={idx} onClick={item.action} className="w-full bg-gray-50 dark:bg-dark-bg p-4 rounded-xl flex items-center gap-4 active:scale-[0.99] transition-transform text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800">
                                     <item.icon size={20} className="text-primary opacity-80" />
                                     <span className="font-semibold tracking-wide">{item.label}</span>
                                 </button>
                             ))}
                        </div>

                        <div className="space-y-2">
                             {[
                                 { icon: Share2, label: 'Share App', action: () => alert('Share options') },
                                 { icon: Star, label: 'Rate Us', action: () => alert('App Store rating') }
                             ].map((item, idx) => (
                                 <button key={idx} onClick={item.action} className="w-full bg-gray-50 dark:bg-dark-bg p-4 rounded-xl flex items-center gap-4 active:scale-[0.99] transition-transform text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800">
                                     <item.icon size={20} className="text-primary opacity-80" />
                                     <span className="font-semibold tracking-wide">{item.label}</span>
                                 </button>
                             ))}
                        </div>
                   </div>
               )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
