import { type ModuleProps } from '@/utils';
import { createStore } from 'zustand/vanilla';

export type ProgramState = {
  step: number;
  activeModuleId: number | null;
  selectedModules: ModuleProps[];
};

export type ProgramActions = {
  setStep: (step: number) => void;
  nextStep: () => void;
  previousStep: () => void;
  setActiveModuleId: (index: number) => void;
  setSelectedModules: (modules: ModuleProps[]) => void;
  reset: () => void;
};

export type ProgramStore = ProgramState & ProgramActions;

const MIN_STEP = 1;
const MAX_STEP = 4;

export const defaultProgramState: ProgramState = {
  step: MIN_STEP,
  selectedModules: [],
  activeModuleId: null,
};

export const createProgramStore = (initState: ProgramState = defaultProgramState) => {
  return createStore<ProgramStore>()((set) => ({
    ...initState,
    setStep: (step) => set(() => ({ step: Math.max(MIN_STEP, Math.min(step, MAX_STEP)) })),
    nextStep: () => set((state) => ({ step: Math.min(state.step + 1, MAX_STEP) })),
    previousStep: () => set((state) => ({ step: Math.max(state.step - 1, MIN_STEP) })),
    setActiveModuleId: (moduleId) => set(() => ({ activeModuleId: moduleId })),
    setSelectedModules: (modules) => set(() => ({ selectedModules: modules })),
    reset: () => set(() => defaultProgramState),
  }));
};
