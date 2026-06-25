import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { College } from '@/types/college';

interface CompareStore {
  compareList: College[];
  addCollege: (college: College) => { success: boolean; message?: string };
  removeCollege: (id: string) => void;
  clearCompare: () => void;
}

export const useCompareStore = create<CompareStore>()(
  persist(
    (set, get) => ({
      compareList: [],

      addCollege: (college) => {
        const currentList = get().compareList;
        if (currentList.some(c => c.id === college.id)) {
          return { success: false, message: 'College already in compare list' };
        }
        if (currentList.length >= 3) {
          return { success: false, message: 'Remove one to add this' };
        }
        set({ compareList: [...currentList, college] });
        return { success: true };
      },

      removeCollege: (id) => {
        set({ compareList: get().compareList.filter(c => c.id !== id) });
      },

      clearCompare: () => {
        set({ compareList: [] });
      }
    }),
    {
      name: 'mbaos-compare-storage'
    }
  )
);
