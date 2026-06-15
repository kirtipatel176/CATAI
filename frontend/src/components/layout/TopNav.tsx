"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export function TopNav() {
  return (
    <header className="sticky top-0 z-50 flex h-[72px] items-center justify-between px-6 backdrop-blur-[20px] bg-[rgba(255,255,255,0.75)] dark:bg-[rgba(0,0,0,0.75)] border-b border-black/5 dark:border-white/5 transition-all">
      {/* Left: Logo */}
      <div className="flex items-center gap-3 w-auto md:w-[240px]">
        {/* Modern Geometric Logo */}
        <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#2563EB] to-[#111827] shadow-sm overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-1/2 bg-white/20 skew-y-12 transform -translate-y-2"></div>
          <span className="relative z-10 text-white font-bold text-sm tracking-tighter">M</span>
        </div>
        <span className="text-xl font-bold tracking-tight text-[#111827] dark:text-white">
          MBAOS
        </span>
      </div>

      {/* Center: Global Search */}
      <div className="hidden md:flex flex-1 max-w-xl mx-4 relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B7280] pointer-events-none" />
        <input 
          type="text" 
          placeholder="Search colleges, exams, plans, CATGPT" 
          className="search-input-glass w-full pl-10 pr-14"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1 opacity-70 pointer-events-none">
          <kbd className="inline-flex h-5 items-center gap-1 rounded-[6px] border border-black/10 dark:border-white/10 bg-white dark:bg-black px-1.5 font-mono text-[10px] font-semibold text-[#6B7280]">
            <span className="text-xs">⌘</span>K
          </kbd>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3 w-auto md:w-[240px] justify-end">
        <Link href="/profile" className="block h-8 w-8 rounded-full border border-black/10 dark:border-white/10 overflow-hidden cursor-pointer hover:opacity-80 transition-opacity ml-1">
          <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Kirti&backgroundColor=transparent" alt="Avatar" className="h-full w-full object-cover bg-white" />
        </Link>
      </div>
    </header>
  );
}

