"use client";

import Image from 'next/image';
import { MapPin, Bookmark, Share2 } from 'lucide-react';
import { useCollegeStore } from '@/store/collegeStore';

interface CollegeHeroProps {
  id: string;
  name: string;
  logo: string;
  city: string;
  state: string;
  accreditation: string[];
  examsAccepted: string[];
}

export function CollegeHero({ id, name, logo, city, state, accreditation, examsAccepted }: CollegeHeroProps) {
  const { bookmarks, toggleBookmark } = useCollegeStore();
  const isBookmarked = bookmarks.includes(id);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: name,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="bg-white dark:bg-[#111827] rounded-[32px] border border-black/5 dark:border-white/5 p-6 md:p-10 shadow-sm relative overflow-hidden">
      
      <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
        <div className="relative h-24 w-24 md:h-32 md:w-32 rounded-2xl overflow-hidden bg-white shrink-0 border border-black/5 flex items-center justify-center">
          {logo ? (
            <Image src={logo} alt={name} fill className="object-contain p-2" />
          ) : (
            <span className="text-4xl font-black text-gray-300">{name.charAt(0)}</span>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-[#111827] dark:text-white tracking-tight mb-2">
                {name}
              </h1>
              <div className="flex items-center gap-2 text-[#6B7280] font-medium">
                <MapPin className="h-4 w-4" />
                <span>{city}, {state}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3 shrink-0">
              <button 
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-black/5 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 font-semibold text-[#4B5563] dark:text-[#D1D5DB] transition-colors"
              >
                <Share2 className="h-4 w-4" /> <span className="hidden sm:inline">Share</span>
              </button>
              <button 
                onClick={() => toggleBookmark(id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-colors font-semibold ${
                  isBookmarked 
                    ? 'border-[#4F46E5] bg-[#4F46E5]/10 text-[#4F46E5]' 
                    : 'border-black/5 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 text-[#4B5563] dark:text-[#D1D5DB]'
                }`}
              >
                <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
                <span className="hidden sm:inline">{isBookmarked ? 'Saved' : 'Save'}</span>
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-6">
            {accreditation.map(acc => (
              <span key={acc} className="px-3 py-1 bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-lg text-sm font-bold border border-purple-100 dark:border-purple-500/20">
                {acc}
              </span>
            ))}
            {examsAccepted.map(exam => (
              <span key={exam} className="px-3 py-1 bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 rounded-lg text-sm font-bold border border-teal-100 dark:border-teal-500/20">
                {exam}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      {/* Decorative background element */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br from-[#4F46E5]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
    </div>
  );
}
