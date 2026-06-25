"use client";

import { useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useCollegeStore } from '@/store/collegeStore';
import { CollegeFilterBar } from './CollegeFilterBar';
import { CollegeGrid } from './CollegeGrid';
import { RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CollegeListingClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  
  const { colleges, isLoading, error, fetchColleges, currentPage, totalPages } = useCollegeStore();

  useEffect(() => {
    // Convert URLSearchParams to a plain object
    const params: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    
    fetchColleges(params);
  }, [searchParams, fetchColleges]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleResetFilters = () => {
    router.push(pathname);
  };

  const handleRetry = () => {
    const params: Record<string, string> = {};
    searchParams.forEach((value, key) => { params[key] = value; });
    fetchColleges(params);
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[#111827] dark:text-white">Explore Colleges</h1>
        <p className="text-[#6B7280] mt-2">Discover, filter, and shortlist the top MBA programs in India.</p>
      </div>

      <CollegeFilterBar />

      {error ? (
        <div className="p-8 text-center rounded-2xl bg-red-50 dark:bg-red-500/5 border border-red-100 dark:border-red-500/10">
          <p className="text-red-500 font-semibold mb-4">{error}</p>
          <Button onClick={handleRetry} className="bg-red-500 hover:bg-red-600 text-white rounded-full">
            <RefreshCcw className="mr-2 h-4 w-4" /> Retry
          </Button>
        </div>
      ) : (
        <>
          <CollegeGrid 
            colleges={colleges} 
            loading={isLoading} 
            onResetFilters={handleResetFilters} 
          />
          
          {totalPages > 1 && !isLoading && (
            <div className="mt-10 flex justify-center items-center gap-2">
              <Button 
                variant="outline" 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="rounded-full"
              >
                Previous
              </Button>
              
              <div className="flex items-center gap-1 mx-2">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handlePageChange(i + 1)}
                    className={`w-10 h-10 rounded-full text-sm font-medium transition-colors ${
                      currentPage === i + 1
                        ? 'bg-[#4F46E5] text-white'
                        : 'bg-white dark:bg-[#111827] text-[#6B7280] hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-800'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              
              <Button 
                variant="outline" 
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="rounded-full"
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
