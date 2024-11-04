'use client';

import { type ReactNode, createContext, useContext, useRef } from 'react';
import { useStore } from 'zustand';

import { type ProgramStore, createProgramStore } from '@/stores/program-store';

export type ProgramStoreApi = ReturnType<typeof createProgramStore>;

export const ProgramStoreContext = createContext<ProgramStoreApi | undefined>(undefined);

export const ProgramStoreProvider = ({ children }: { children: ReactNode }) => {
  const storeRef = useRef<ProgramStoreApi>();
  if (!storeRef.current) storeRef.current = createProgramStore();
  return <ProgramStoreContext.Provider value={storeRef.current}>{children}</ProgramStoreContext.Provider>;
};

export const useProgramStore = <T,>(selector: (store: ProgramStore) => T): T => {
  const programStoreContext = useContext(ProgramStoreContext);

  if (!programStoreContext) throw new Error('useProgramStore must be used within ProgramStoreProvider');

  return useStore(programStoreContext, selector);
};
