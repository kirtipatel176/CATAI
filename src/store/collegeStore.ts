import { create } from 'zustand';
import axios from 'axios';
import { College } from '@/types/college';

interface CollegeStore {
  colleges: College[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;
  bookmarks: string[];
  fetchColleges: (params: Record<string, any>) => Promise<void>;
  setPage: (page: number) => void;
  toggleBookmark: (id: string) => Promise<void>;
}

export const useCollegeStore = create<CollegeStore>((set, get) => ({
  colleges: [],
  totalCount: 0,
  currentPage: 1,
  totalPages: 0,
  isLoading: false,
  error: null,
  bookmarks: [],

  fetchColleges: async (params: Record<string, any>) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get('/api/colleges', { params });
      set({ 
        colleges: response.data.colleges, 
        totalCount: response.data.total,
        currentPage: response.data.page,
        totalPages: response.data.totalPages,
        isLoading: false 
      });
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Failed to fetch colleges', 
        isLoading: false 
      });
    }
  },

  setPage: (page: number) => {
    set({ currentPage: page });
  },

  toggleBookmark: async (id: string) => {
    try {
      const response = await axios.post('/api/user/bookmarks', { collegeId: id });
      set({ bookmarks: response.data.bookmarks });
    } catch (error) {
      console.error('Failed to toggle bookmark', error);
    }
  }
}));
