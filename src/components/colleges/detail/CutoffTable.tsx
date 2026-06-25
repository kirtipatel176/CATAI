"use client";

import { useState } from 'react';
import { CutoffEntry } from '@/types/college';
import { Info } from 'lucide-react';

interface CutoffTableProps {
  cutoffs: CutoffEntry[];
}

export function CutoffTable({ cutoffs }: CutoffTableProps) {
  // Extract unique years and sort descending
  const years = Array.from(new Set(cutoffs.map(c => c.year))).sort((a, b) => b - a);
  const fallbackYears = [2024, 2023, 2022, 2021, 2020];
  const displayYears = years.length > 0 ? years : fallbackYears;
  
  const [activeYear, setActiveYear] = useState<number>(displayYears[0]);

  const yearData = cutoffs.filter(c => c.year === activeYear);

  return (
    <div className="bg-white dark:bg-[#111827] rounded-[24px] border border-black/5 dark:border-white/5 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-black/5 dark:border-white/5 flex items-center justify-between">
        <h3 className="text-xl font-bold text-[#111827] dark:text-white">Cutoff Percentiles</h3>
        <div className="flex bg-black/5 dark:bg-white/5 rounded-xl p-1 overflow-x-auto max-w-[250px] sm:max-w-none">
          {displayYears.map(year => (
            <button
              key={year}
              onClick={() => setActiveYear(year)}
              className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all shrink-0 ${
                activeYear === year 
                  ? 'bg-white dark:bg-[#1F2937] text-[#4F46E5] shadow-sm' 
                  : 'text-[#6B7280] hover:text-[#111827] dark:hover:text-white'
              }`}
            >
              {year}
            </button>
          ))}
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-[#6B7280] uppercase bg-black/[0.02] dark:bg-white/[0.02]">
            <tr>
              <th className="px-6 py-4 font-bold">Category</th>
              <th className="px-6 py-4 font-bold">Percentile</th>
              <th className="px-6 py-4 font-bold text-center">GD Required</th>
              <th className="px-6 py-4 font-bold text-center">PI Required</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5 dark:divide-white/5">
            {yearData.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-[#6B7280]">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Info className="h-6 w-6 text-gray-400" />
                    <p>Data not available for {activeYear}</p>
                  </div>
                </td>
              </tr>
            ) : (
              yearData.map((row, i) => (
                <tr key={i} className="hover:bg-black/[0.01] dark:hover:bg-white/[0.01]">
                  <td className="px-6 py-4 font-semibold text-[#111827] dark:text-white">{row.category}</td>
                  <td className="px-6 py-4 font-bold text-[#4F46E5]">{row.percentile}</td>
                  <td className="px-6 py-4 text-center">
                    {row.gd ? (
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 font-bold">✓</span>
                    ) : (
                      <span className="text-gray-400 font-bold">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {row.pi ? (
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 font-bold">✓</span>
                    ) : (
                      <span className="text-gray-400 font-bold">-</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
