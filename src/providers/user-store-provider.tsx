'use client';

import { type ReactNode, createContext, useContext, useRef } from 'react';
import { useStore } from 'zustand';

import { type UserStore, createUserStore } from '@/stores/user-store';

export type UserStoreApi = ReturnType<typeof createUserStore>;

export const UserStoreContext = createContext<UserStoreApi | undefined>(undefined);

export const userStore = createUserStore();

export const UserStoreProvider = ({ children }: { children: ReactNode }) => {
  const storeRef = useRef<UserStoreApi>();
  if (!storeRef.current) storeRef.current = userStore;
  return <UserStoreContext.Provider value={storeRef.current}>{children}</UserStoreContext.Provider>;
};

export const useUserStore = <T,>(selector: (store: UserStore) => T): T => {
  const userStoreContext = useContext(UserStoreContext);

  if (!userStoreContext) throw new Error('useUserStore must be used within UserStoreProvider');

  return useStore(userStoreContext, selector);
};
