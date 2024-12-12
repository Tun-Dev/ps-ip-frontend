import type { Tokens, User } from '@/types';
import { persist } from 'zustand/middleware';
import { createStore } from 'zustand/vanilla';

export type UserState = {
  user: User | null;
  tokens: Tokens | null;
};

export type UserActions = {
  setUser: (user: User) => void;
  setTokens: (tokens: Tokens) => void;
  logout: () => void;
};

export type UserStore = UserState & UserActions;

export const defaultUserState: UserState = {
  user: null,
  tokens: null,
};

export const createUserStore = (initState: UserState = defaultUserState) => {
  return createStore<UserStore>()(
    persist(
      (set) => ({
        ...initState,
        setUser: (user) => set(() => ({ user })),
        setTokens: (tokens) => set(() => ({ tokens })),
        logout: () => set(() => defaultUserState),
      }),
      { name: 'user-storage' }
    )
  );
};
