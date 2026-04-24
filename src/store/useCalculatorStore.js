import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { evaluateExpression } from '../utils/evaluateExpression';

export const useCalculatorStore = create(
  persist(
    (set, get) => ({
      expression: '',
      result: '',
      mode: 'basic', // 'basic', 'scientific', 'converter'
      history: [],
      memory: { value: 0 },
      theme: 'system', // 'light', 'dark', 'system'
      hasCalculated: false, // flag to know if next input should clear the screen
      sessionTimeSeconds: 0,
      isDegree: true,
      oneHandMode: false,
      favorites: [],
      profile: { fullName: '', dob: '', weight: '', height: '', email: '', phone: '' },
      preferences: { vibration: true, theme: 'system' },

      setMode: (mode) => set({ mode }),
      setTheme: (theme) => set({ theme }),
      toggleAngleMode: () => set(state => ({ isDegree: !state.isDegree })),
      toggleOneHandMode: () => set(state => ({ oneHandMode: !state.oneHandMode })),
      toggleFavorite: (moduleId) => set((state) => ({
        favorites: state.favorites.includes(moduleId)
          ? state.favorites.filter(id => id !== moduleId)
          : [...state.favorites, moduleId]
      })),
      updateProfile: (updates) => set((state) => ({
        profile: { ...state.profile, ...updates }
      })),
      updatePreferences: (updates) => set((state) => ({
        preferences: { ...state.preferences, ...updates }
      })),
      incrementSessionTime: () => set(state => ({ sessionTimeSeconds: state.sessionTimeSeconds + 1 })),
      resetApp: () => set({ 
         history: [], memory: { value: 0 }, expression: '', result: '', 
         sessionTimeSeconds: 0, favorites: [], profile: { fullName: '', dob: '', weight: '', height: '', email: '', phone: '' }
      }),
      setExpression: (expr) => {
        const { result, error } = evaluateExpression(expr, get().isDegree);
        set({ 
          expression: expr, 
          result: (!error && result && result !== expr) ? result : '', 
          hasCalculated: false 
        });
      },

      handleInput: (type, value) => {
        const state = get();
        let newExpr = state.expression;
        let requiresEval = true;
        let newHasCalculated = false;

        switch (type) {
          case 'number':
          case 'constant':
            // If just calculated and user types a number, start fresh
            if (state.hasCalculated) {
              newExpr = String(value);
            } else {
              newExpr = state.expression + value;
            }
            break;

          case 'operator':
            if (state.hasCalculated) {
              // Chain calculation: '5+5=' -> 10, then '+' means '10+'
              newExpr = state.result + value;
            } else {
              newExpr = state.expression + value;
            }
            break;

          case 'function':
            if (state.hasCalculated) {
              newExpr = value + '(' + state.result + ')';
            } else {
              newExpr = state.expression + value + '(';
            }
            break;

          case 'clear':
            set({ expression: '', result: '', hasCalculated: false });
            return;

          case 'delete':
            if (state.hasCalculated) {
              set({ expression: '', result: '', hasCalculated: false });
              return;
            }
            newExpr = state.expression.slice(0, -1);
            break;

          case 'calculate':
            if (state.expression) {
              const { result, error } = evaluateExpression(state.expression, state.isDegree);
              if (!error && result && result !== state.expression) {
                // Save to history
                const historyItem = {
                  id: Date.now(),
                  expression: state.expression,
                  result: result,
                  createdAt: new Date().toISOString()
                };

                const newHistory = [historyItem, ...state.history].slice(0, 50);

                set({
                  expression: state.expression,
                  result: result,
                  history: newHistory,
                  hasCalculated: true
                });
              } else if (error) {
                set({ result: 'Invalid Expression', hasCalculated: true });
              }
            }
            return;

          case 'memory':
            if (value === 'MC') set({ memory: { value: 0 } });
            if (value === 'MR') newExpr = state.expression + String(state.memory.value);
            if (value === 'M+') {
              const res = Number(state.result || evaluateExpression(state.expression, state.isDegree).result || 0);
              set({ memory: { value: state.memory.value + res }, hasCalculated: true });
            }
            if (value === 'M-') {
              const res = Number(state.result || evaluateExpression(state.expression, state.isDegree).result || 0);
              set({ memory: { value: state.memory.value - res }, hasCalculated: true });
            }
            // M operations might not trigger an immediate visible eval on newExpr if we returned
            break;

          case 'restore_history':
            set({ expression: value, result: '', hasCalculated: false });
            return;

          default:
            break;
        }

        // Live evaluation as you type (except for 'calculate' which resolves and stores history)
        if (requiresEval) {
          const liveEval = evaluateExpression(newExpr, state.isDegree);
          set({
            expression: newExpr,
            result: liveEval.error ? 'Error' : liveEval.result,
            hasCalculated: newHasCalculated
          });
        }
      },
    }),
    {
      name: 'calculator-storage',
      partialize: (state) => ({
        history: state.history,
        theme: state.theme,
        memory: state.memory,
        sessionTimeSeconds: state.sessionTimeSeconds,
        isDegree: state.isDegree,
        oneHandMode: state.oneHandMode,
        favorites: state.favorites,
        profile: state.profile,
        preferences: state.preferences
      }), // Persist only necessary slices
    }
  )
);
