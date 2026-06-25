"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useDebounce } from '@/hooks/useDebounce';
import { Search, Filter, X } from 'lucide-react';

export function CollegeFilterBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Local state for instant UI updates
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [exam, setExam] = useState(searchParams.get('exam') || '');
  const [tier, setTier] = useState(searchParams.get('tier') || '');
  const [stateLocation, setStateLocation] = useState(searchParams.get('state') || '');
  const [maxFees, setMaxFees] = useState(searchParams.get('maxFees') || '3000000');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Debounce search term to prevent excessive URL updates
  const debouncedSearch = useDebounce(searchTerm, 400);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (debouncedSearch) {
      params.set('search', debouncedSearch);
    } else {
      params.delete('search');
    }

    if (exam) params.set('exam', exam);
    else params.delete('exam');

    if (tier) params.set('tier', tier);
    else params.delete('tier');

    if (stateLocation) params.set('state', stateLocation);
    else params.delete('state');

    if (maxFees && maxFees !== '3000000') params.set('maxFees', maxFees);
    else params.delete('maxFees');

    // Reset page to 1 when filters change
    params.set('page', '1');

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [debouncedSearch, exam, tier, stateLocation, maxFees, pathname, router]);

  // Sync state with URL if URL changes externally
  useEffect(() => {
    setSearchTerm(searchParams.get('search') || '');
    setExam(searchParams.get('exam') || '');
    setTier(searchParams.get('tier') || '');
    setStateLocation(searchParams.get('state') || '');
    setMaxFees(searchParams.get('maxFees') || '3000000');
  }, [searchParams]);

  const exams = ['CAT', 'XAT', 'GMAT', 'CMAT', 'NMAT'];
  const tiers = ['Tier 1', 'Tier 2', 'Tier 3'];
  const states = ['Gujarat', 'Karnataka', 'Maharashtra', 'Jharkhand', 'Haryana'];

  return (
    <div className="sticky top-0 z-20 bg-[#F8FAFC]/90 dark:bg-[#0A0A0A]/90 backdrop-blur-xl border-b border-black/5 dark:border-white/5 py-4 mb-8">
      
      {/* Mobile Filter Toggle */}
      <div className="md:hidden flex items-center justify-between mb-4 px-1">
        <div className="relative flex-1 mr-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search colleges..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
          />
        </div>
        <button 
          onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
          className="p-2.5 rounded-xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 text-[#4B5563] dark:text-white"
        >
          <Filter className="h-5 w-5" />
        </button>
      </div>

      <div className={`md:flex items-center gap-4 px-1 ${isMobileFiltersOpen ? 'block' : 'hidden'}`}>
        
        {/* Desktop Search */}
        <div className="hidden md:block relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search colleges..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
          />
        </div>

        <div className="grid grid-cols-2 lg:flex lg:gap-3 gap-3 mt-4 md:mt-0 lg:flex-wrap">
          {/* Exam Dropdown */}
          <select 
            value={exam}
            onChange={(e) => setExam(e.target.value)}
            className="py-2.5 px-3 rounded-xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#4F46E5] appearance-none"
          >
            <option value="">Any Exam</option>
            {exams.map(e => <option key={e} value={e}>{e}</option>)}
          </select>

          {/* Tier Dropdown */}
          <select 
            value={tier}
            onChange={(e) => setTier(e.target.value)}
            className="py-2.5 px-3 rounded-xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#4F46E5] appearance-none"
          >
            <option value="">Any Tier</option>
            {tiers.map(t => <option key={t} value={t}>{t}</option>)}
          </select>

          {/* State Dropdown */}
          <select 
            value={stateLocation}
            onChange={(e) => setStateLocation(e.target.value)}
            className="py-2.5 px-3 rounded-xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#4F46E5] appearance-none"
          >
            <option value="">Any State</option>
            {states.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {/* Fees Range */}
        <div className="mt-4 md:mt-0 md:min-w-[200px] bg-white dark:bg-white/5 rounded-xl border border-black/5 dark:border-white/10 px-4 py-2">
          <div className="flex justify-between text-xs font-semibold text-[#6B7280] mb-1">
            <span>Max Fees</span>
            <span>₹{(Number(maxFees) / 100000).toFixed(0)}L</span>
          </div>
          <input
            type="range"
            min="0"
            max="3000000"
            step="100000"
            value={maxFees}
            onChange={(e) => setMaxFees(e.target.value)}
            className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#4F46E5]"
          />
        </div>

        {/* Clear Filters */}
        {(searchTerm || exam || tier || stateLocation || maxFees !== '3000000') && (
          <button 
            onClick={() => {
              setSearchTerm('');
              setExam('');
              setTier('');
              setStateLocation('');
              setMaxFees('3000000');
            }}
            className="mt-4 md:mt-0 flex items-center justify-center p-2.5 rounded-xl text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors w-full md:w-auto"
            title="Clear Filters"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
}
