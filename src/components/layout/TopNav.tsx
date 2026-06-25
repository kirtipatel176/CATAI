"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Search, Menu, X, LayoutDashboard, Building2, BookOpen, 
  Target, AlertCircle, BarChart3, MessageSquare, UserCheck, 
  CalendarDays, Settings as SettingsIcon, Bell, Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const appNavigation = [
  { name: "Mission Control", href: "/dashboard", icon: LayoutDashboard },
  { name: "Colleges", href: "/colleges", icon: Building2 },
  { name: "Mock Library", href: "/mocks", icon: BookOpen },
  { name: "Practice Center", href: "/practice", icon: Target },
  { name: "Error Log", href: "/error-log", icon: AlertCircle },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "CATGPT", href: "/catgpt", icon: MessageSquare },
  { name: "Profile Intelligence", href: "/profile-evaluator", icon: UserCheck },
  { name: "Planning", href: "/study-planner", icon: CalendarDays },
  { name: "Settings", href: "/settings", icon: SettingsIcon },
];

const PremiumLogo = () => (
  <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-b from-slate-900 to-black shadow-[0_4px_14px_0_rgba(0,0,0,0.25)] overflow-hidden border border-slate-800 group transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]">
    {/* Animated background glow on hover */}
    <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 via-transparent to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    {/* SVG Icon */}
    <svg viewBox="0 0 32 32" className="w-5 h-5 relative z-10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 22V10L16 17L26 10V22" stroke="url(#paint_gradient)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]"/>
      <circle cx="16" cy="17" r="2.5" fill="#F97316" className="animate-pulse shadow-[0_0_12px_rgba(249,115,22,1)] drop-shadow-[0_0_4px_rgba(249,115,22,0.8)]" />
      <defs>
        <linearGradient id="paint_gradient" x1="6" y1="10" x2="26" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#60A5FA"/>
          <stop offset="1" stopColor="#A78BFA"/>
        </linearGradient>
      </defs>
    </svg>
    {/* Shimmer effect */}
    <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[45deg] group-hover:animate-[shimmer_1.5s_ease-in-out_infinite]"></div>
  </div>
);

export function TopNav() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = React.useState(false);
  const pathname = usePathname();

  return (
    <>
      <header className="sticky top-0 z-50 flex h-[76px] items-center justify-between px-4 sm:px-6 md:px-8 backdrop-blur-xl bg-white/70 dark:bg-black/70 border-b border-slate-200/50 dark:border-slate-800/50 transition-all shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] dark:shadow-[0_1px_2px_0_rgba(255,255,255,0.02)]">
      {/* Left: Logo & Brand */}
      <div className="flex items-center gap-4 w-auto md:w-[260px]">
        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden flex items-center justify-center p-2.5 -ml-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors text-slate-600 dark:text-slate-300 active:scale-95"
          onClick={() => {
            setIsOpen(!isOpen);
            if (!isOpen) setIsMobileSearchOpen(false);
          }}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <Link href="/" className="flex items-center gap-3.5 group outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-xl">
          <PremiumLogo />
          <div className="hidden sm:flex flex-col">
            <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">
              MBAOS
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400 -mt-1 flex items-center gap-1">
              Elite <Sparkles className="w-2.5 h-2.5 text-orange-500" />
            </span>
          </div>
        </Link>
      </div>

      {/* Center: Premium Global Search */}
      <div className="hidden md:flex flex-1 max-w-2xl mx-8 relative items-center justify-center">
        <div className="relative group w-full">
          {/* Subtle glow behind the search bar when focused */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-orange-500/20 rounded-full blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          
          <div className="relative w-full flex items-center">
            <Search className="absolute left-4 h-[18px] w-[18px] text-slate-400 group-focus-within:text-blue-500 transition-colors z-10" />
            
            <input 
              type="text" 
              placeholder="Search colleges, exams, AI tools..." 
              className="w-full h-[44px] pl-[42px] pr-14 bg-white/80 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 rounded-full text-[15px] outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all shadow-sm placeholder:text-slate-400 dark:text-slate-100 text-slate-900 font-medium"
            />
            
            <div className="absolute right-3 flex items-center pointer-events-none">
              <kbd className="hidden lg:inline-flex items-center justify-center h-6 px-2 text-[11px] font-semibold text-slate-500 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md transition-opacity">
                <span className="mr-0.5 text-sm leading-none">⌘</span>K
              </kbd>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Actions & Profile */}
      <div className="flex items-center gap-2 sm:gap-4 w-auto md:w-[260px] justify-end">
        {/* Mobile Search Button */}
        <button 
          onClick={() => {
            setIsMobileSearchOpen(!isMobileSearchOpen);
            if (!isMobileSearchOpen) setIsOpen(false);
          }}
          className="md:hidden p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors text-slate-600 dark:text-slate-300"
        >
          {isMobileSearchOpen ? <X className="h-[20px] w-[20px]" /> : <Search className="h-[20px] w-[20px]" />}
        </button>
        
        {/* Notifications */}
        <button className="relative p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors text-slate-600 dark:text-slate-300 group hidden sm:flex">
          <Bell className="h-[20px] w-[20px] group-hover:animate-swing" />
          <span className="absolute top-2 right-2.5 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500 border border-white dark:border-slate-900"></span>
          </span>
        </button>
        
        {/* Profile Avatar */}
        <div className="pl-1 sm:pl-2 border-l border-slate-200 dark:border-slate-800 ml-1">
          <Link 
            href="/settings" 
            className="block relative h-[38px] w-[38px] rounded-full border-2 border-transparent hover:border-blue-500/50 transition-all overflow-hidden shadow-sm ring-2 ring-white dark:ring-slate-950"
          >
            <img 
              src="https://api.dicebear.com/7.x/notionists/svg?seed=Kirti&backgroundColor=transparent" 
              alt="Avatar" 
              className="h-full w-full object-cover bg-slate-100 dark:bg-slate-800" 
            />
          </Link>
        </div>
      </div>
    </header>

      {/* Mobile Search Overlay */}
      <AnimatePresence>
        {isMobileSearchOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileSearchOpen(false)}
              className="fixed inset-0 top-[76px] bg-slate-900/20 dark:bg-black/40 backdrop-blur-sm z-30 md:hidden"
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-[76px] left-0 w-full p-4 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 shadow-xl md:hidden z-40"
            >
              <div className="relative w-full flex items-center">
                <Search className="absolute left-4 h-[18px] w-[18px] text-slate-400 z-10" />
                <input 
                  type="text" 
                  placeholder="Search colleges, exams, AI tools..." 
                  autoFocus
                  className="w-full h-[48px] pl-[42px] pr-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-[15px] outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all text-slate-900 dark:text-slate-100 font-medium shadow-inner"
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Menu Dropdown Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 top-[76px] bg-slate-900/20 dark:bg-black/40 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed top-[76px] bottom-0 left-0 w-full bg-white dark:bg-slate-950 border-t border-slate-200/50 dark:border-slate-800/50 shadow-2xl md:hidden z-50 overflow-y-auto pb-6"
            >
              <div className="flex flex-col p-4 gap-1.5 min-h-max">
                {appNavigation.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-[15px] font-medium transition-all duration-200",
                        isActive
                          ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 shadow-sm"
                          : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900/50 hover:text-slate-900 dark:hover:text-white"
                      )}
                    >
                      <Icon className={cn(
                        "h-[18px] w-[18px]", 
                        isActive ? "text-blue-600 dark:text-blue-400" : "text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300"
                      )} />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
