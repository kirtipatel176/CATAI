"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Bookmark, MapPin } from 'lucide-react';
import { useCollegeStore } from '@/store/collegeStore';

interface CollegeCardProps {
  id: string;
  name: string;
  logo: string;
  city: string;
  state: string;
  description?: string;
  exam: string[];
  cutoffMin: number;
  cutoffMax: number;
  fees: number;
  isBookmarked: boolean;
}

export function CollegeCard({ id, name, logo, city, state, description, exam, cutoffMin, cutoffMax, fees, isBookmarked }: CollegeCardProps) {
  const toggleBookmark = useCollegeStore((state) => state.toggleBookmark);

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to detail page when clicking bookmark
    toggleBookmark(id);
  };

  const formattedFees = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(fees);

  const feesInLakhs = (fees / 100000).toFixed(1);

  return (
    <Link href={`/colleges/${id}`} className="block group">
      <div className="bg-white dark:bg-[#111827] rounded-2xl border border-black/5 dark:border-white/5 p-5 shadow-sm transition-all duration-200 hover:scale-[1.01] hover:shadow-md h-full flex flex-col">
        
        <div className="flex items-start gap-4">
          <div className="relative h-12 w-12 rounded-xl overflow-hidden bg-white shrink-0 border border-black/5">
            {logo ? (
              <Image src={logo} alt={name} fill className="object-contain p-1" />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 font-bold text-lg">
                {name.charAt(0)}
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-[#111827] dark:text-white truncate" title={name}>{name}</h3>
            <div className="flex items-center gap-1 text-sm text-[#6B7280] mt-1">
              <MapPin className="h-3 w-3 shrink-0" />
              <span className="truncate">{city}, {state}</span>
            </div>
            {description && (
              <p className="mt-2 text-xs text-[#6B7280] dark:text-gray-400 line-clamp-2 leading-relaxed" title={description}>
                {description}
              </p>
            )}
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-4 flex-1">
          <div>
            <div className="flex items-center gap-1.5 mb-1 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">
              <span>Exams</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {exam.slice(0, 2).map(e => (
                <span key={e} className="px-2 py-0.5 bg-[#4F46E5]/10 text-[#4F46E5] rounded text-xs font-bold">
                  {e}
                </span>
              ))}
              {exam.length > 2 && (
                <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-500 rounded text-xs font-bold">
                  +{exam.length - 2}
                </span>
              )}
            </div>
            <p className="text-sm font-semibold text-[#111827] dark:text-white mt-1.5">
              {cutoffMin}–{cutoffMax} %ile
            </p>
          </div>
          
          <div className="text-right">
            <div className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-1">
              Total Fees
            </div>
            <p className="text-base font-bold text-[#111827] dark:text-white mt-1">
              ₹{feesInLakhs}L
            </p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-black/5 dark:border-white/5 flex justify-end">
          <button 
            onClick={handleBookmarkClick}
            className={`p-2 rounded-full transition-colors ${
              isBookmarked 
                ? 'text-[#4F46E5] bg-[#4F46E5]/10' 
                : 'text-gray-400 hover:text-[#4F46E5] hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <Bookmark className={`h-5 w-5 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>
        
      </div>
    </Link>
  );
}
