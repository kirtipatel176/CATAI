import { create } from 'zustand';
import axios from 'axios';
import { EvaluatorResult } from '@/types/college';

interface EvaluatorStore {
  formData: Record<string, any>;
  result: EvaluatorResult | null;
  isLoading: boolean;
  error: string | null;
  setFormData: (data: Record<string, any>) => void;
  submitEvaluation: (data: Record<string, any>) => Promise<void>;
  saveShortlist: (shortlist: EvaluatorResult) => Promise<boolean>;
  resetEvaluator: () => void;
}

export const useEvaluatorStore = create<EvaluatorStore>((set, get) => ({
  formData: {},
  result: null,
  isLoading: false,
  error: null,

  setFormData: (data) => {
    set({ formData: { ...get().formData, ...data } });
  },

  submitEvaluation: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post('/api/evaluate', data);
      set({ result: response.data, isLoading: false });
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Failed to submit evaluation', 
        isLoading: false 
      });
    }
  },

  saveShortlist: async (shortlist) => {
    try {
      // Flatten shortlist to send to API
      const allColleges = [...shortlist.dream, ...shortlist.target, ...shortlist.safe];
      await axios.post('/api/shortlist/save', { colleges: allColleges });
      return true;
    } catch (error) {
      console.error('Failed to save shortlist', error);
      return false;
    }
  },

  resetEvaluator: () => {
    set({ formData: {}, result: null, error: null });
  }
}));
