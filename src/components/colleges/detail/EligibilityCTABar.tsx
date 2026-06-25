"use client";

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Target, Bookmark } from 'lucide-react';
import { useCollegeStore } from '@/store/collegeStore';

interface EligibilityCTABarProps {
  collegeId: string;
}

export function EligibilityCTABar({ collegeId }: EligibilityCTABarProps) {
  const router = useRouter();
  const { bookmarks, toggleBookmark } = useCollegeStore();
  const isBookmarked = bookmarks.includes(collegeId);

  return (
    <div className="sticky bottom-0 left-0 right-0 z-40 bg-white/90 dark:bg-[#0A0A0A]/90 backdrop-blur-xl border-t border-black/5 dark:border-white/5 px-4 py-4 md:py-5 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)]">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <div className="text-center sm:text-left">
          <h3 className="font-bold text-[#111827] dark:text-white text-lg">Want to know if you're eligible?</h3>
          <p className="text-sm text-[#6B7280]">Evaluate your profile to see your chances of admission.</p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button 
            onClick={() => toggleBookmark(collegeId)}
            variant="outline" 
            className={`flex-1 sm:flex-none rounded-xl h-12 px-6 font-bold ${
              isBookmarked 
                ? 'border-[#4F46E5] text-[#4F46E5] bg-[#4F46E5]/5 hover:bg-[#4F46E5]/10' 
                : 'text-[#4B5563] dark:text-white hover:bg-black/5 dark:hover:bg-white/5'
            }`}
          >
            <Bookmark className={`mr-2 h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
            {isBookmarked ? 'Saved' : 'Save College'}
          </Button>

          <Button 
            onClick={() => router.push(`/evaluate?college_id=${collegeId}`)}
            className="flex-1 sm:flex-none rounded-xl h-12 px-6 bg-[#111827] dark:bg-white text-white dark:text-[#111827] font-bold hover:scale-[1.02] transition-transform"
          >
            <Target className="mr-2 h-4 w-4" />
            Check Eligibility
          </Button>
        </div>
      </div>
    </div>
  );
}
