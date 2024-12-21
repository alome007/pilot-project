import { create } from 'zustand';

interface AliasState {
    aliasCount: number;
    incrementAliasCount: () => void;
    decrementAliasCount: () => void;
    setAliasCount: (c: number) => void;
}

export const useAliasStore = create<AliasState>((set) => ({
    aliasCount: 0,
    incrementAliasCount: () => set((state) => ({ aliasCount: state.aliasCount + 1 })),
    decrementAliasCount: () => set((state) => ({ aliasCount: Math.max(0, state.aliasCount - 1) })),
    setAliasCount: (count: number) => set({ aliasCount: Math.max(0, count) })
}));