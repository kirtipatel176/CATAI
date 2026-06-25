"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { College } from '@/types/college';
import { useCompareStore } from '@/store/compareStore';
import { Scale, X, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface CollegeCompareProps {
  currentCollege: College;
}

export function CollegeCompare({ currentCollege }: CollegeCompareProps) {
  const router = useRouter();
  const { compareList, addCollege, removeCollege } = useCompareStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isCurrentInCompare = compareList.some(c => c.id === currentCollege.id);

  const handleAdd = () => {
    const res = addCollege(currentCollege);
    if (res.success) {
      toast.success('Added to compare list');
    } else {
      toast.error(res.message);
    }
  };

  const handleRemove = () => {
    removeCollege(currentCollege.id);
    toast.success('Removed from compare list');
  };

  return (
    <div className="fixed bottom-24 right-4 sm:right-8 z-50 flex flex-col items-end gap-2">
      {/* Compare list preview popup (if there are items) */}
      {compareList.length > 0 && (
        <div className="bg-white dark:bg-[#111827] rounded-2xl border border-black/5 dark:border-white/5 shadow-xl p-4 w-64 animate-in slide-in-from-bottom-5">
          <div className="flex justify-between items-center mb-3 pb-2 border-b border-black/5 dark:border-white/5">
            <span className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">Compare ({compareList.length}/3)</span>
          </div>
          <ul className="space-y-2 mb-4">
            {compareList.map(c => (
              <li key={c.id} className="flex justify-between items-center text-sm font-medium">
                <span className="truncate max-w-[180px]">{c.name}</span>
                <button onClick={() => removeCollege(c.id)} className="text-gray-400 hover:text-red-500">
                  <X className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
          <button 
            onClick={() => router.push('/colleges/compare')} // Assuming there is or will be a compare page
            disabled={compareList.length < 2}
            className="w-full py-2 bg-[#4F46E5] text-white rounded-xl text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Compare Now
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={isCurrentInCompare ? handleRemove : handleAdd}
        className={`h-14 w-14 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 ${
          isCurrentInCompare 
            ? 'bg-emerald-500 text-white' 
            : 'bg-[#111827] dark:bg-white text-white dark:text-[#111827]'
        }`}
      >
        {isCurrentInCompare ? <X className="h-6 w-6" /> : <Scale className="h-6 w-6" />}
      </button>
    </div>
  );
}
