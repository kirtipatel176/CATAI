"use client";

import { useState } from 'react';
import { Programme } from '@/types/college';
import { Briefcase, Clock, Users, Banknote } from 'lucide-react';

interface FeesAndSeatsProps {
  programmes: Programme[];
}

export function FeesAndSeats({ programmes }: FeesAndSeatsProps) {
  const [activeTab, setActiveTab] = useState(0);

  if (programmes.length === 0) return null;

  const activeProg = programmes[activeTab];

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="bg-white dark:bg-[#111827] rounded-[24px] border border-black/5 dark:border-white/5 shadow-sm p-6">
      <h3 className="text-xl font-bold text-[#111827] dark:text-white mb-6">Programmes & Fees</h3>
      
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 border-b border-black/5 dark:border-white/5 pb-4">
        {programmes.map((p, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              activeTab === i 
                ? 'bg-[#4F46E5] text-white shadow-md' 
                : 'bg-black/5 dark:bg-white/5 text-[#6B7280] hover:text-[#111827] dark:hover:text-white'
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="flex items-start gap-4 p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
            <div className="h-10 w-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
              <Banknote className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-1">Total Fees</p>
              <p className="text-xl font-black text-[#111827] dark:text-white">{formatCurrency(activeProg.fees)}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
            <div className="h-10 w-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
              <Briefcase className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-1">Average Salary</p>
              <p className="text-xl font-black text-[#111827] dark:text-white">{formatCurrency(activeProg.avgSalary)}</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-start gap-4 p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
            <div className="h-10 w-10 rounded-xl bg-purple-50 dark:bg-purple-500/10 flex items-center justify-center text-purple-500 shrink-0">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-1">Duration</p>
              <p className="text-xl font-black text-[#111827] dark:text-white">{activeProg.duration}</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
            <div className="h-10 w-10 rounded-xl bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center text-amber-500 shrink-0">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-1">Total Intake</p>
              <p className="text-xl font-black text-[#111827] dark:text-white">{activeProg.intake} Seats</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-black/5 dark:border-white/5">
        <p className="text-sm font-bold text-[#111827] dark:text-white mb-3">Top Recruiters</p>
        <div className="flex flex-wrap gap-2">
          {activeProg.topRecruiters.map((r, i) => (
            <span key={i} className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium">
              {r}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
