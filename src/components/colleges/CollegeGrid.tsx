"use client";

import { College } from '@/types/college';
import { CollegeCard } from './CollegeCard';
import { CollegeSkeleton } from './CollegeSkeleton';
import { useCollegeStore } from '@/store/collegeStore';
import { Button } from '@/components/ui/button';
import { SearchX } from 'lucide-react';

interface CollegeGridProps {
  colleges: College[];
  loading: boolean;
  onResetFilters: () => void;
}

export function CollegeGrid({ colleges, loading, onResetFilters }: CollegeGridProps) {
  const bookmarks = useCollegeStore((state) => state.bookmarks);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <CollegeSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (colleges.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center border border-dashed border-gray-300 dark:border-gray-700 rounded-2xl bg-gray-50/50 dark:bg-gray-900/20">
        <div className="h-16 w-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
          <SearchX className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-bold text-[#111827] dark:text-white mb-2">No colleges match your filters</h3>
        <p className="text-sm text-[#6B7280] mb-6 max-w-sm">Try adjusting your search criteria, selecting a different exam, or broadening your budget.</p>
        <Button onClick={onResetFilters} className="bg-[#4F46E5] hover:bg-[#4338CA] text-white rounded-full">
          Clear all filters
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {colleges.map((college) => (
        <CollegeCard
          key={college.id}
          id={college.id}
          name={college.name}
          logo={college.logo}
          city={college.city}
          state={college.state}
          description={college.description}
          exam={college.examsAccepted}
          cutoffMin={college.cutoffMin}
          cutoffMax={college.cutoffMax}
          fees={college.totalFees}
          isBookmarked={bookmarks.includes(college.id)}
        />
      ))}
    </div>
  );
}
