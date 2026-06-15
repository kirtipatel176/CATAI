"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  MessageSquare, 
  UserCheck, 
  CalendarDays, 
  Settings,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isAdmin?: boolean;
}

export function Sidebar({ isAdmin = false }: SidebarProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const appNavigation = [
    { name: "Mission Control", href: "/dashboard", icon: LayoutDashboard },
    { name: "CATGPT", href: "/catgpt", icon: MessageSquare },
    { name: "Profile Intelligence", href: "/profile-evaluator", icon: UserCheck },
    { name: "Planning", href: "/study-planner", icon: CalendarDays },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  const adminNavigation = [
    { name: "Admin Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Documents", href: "/admin/documents", icon: MessageSquare },
    { name: "Colleges", href: "/admin/colleges", icon: UserCheck },
    { name: "Cutoffs", href: "/admin/cutoffs", icon: CalendarDays },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  const navigation = isAdmin ? adminNavigation : appNavigation;

  return (
    <motion.div 
      initial={false}
      animate={{ 
        width: isCollapsed ? 64 : 210,
      }}
      transition={{ ease: [0.4, 0, 0.2, 1], duration: 0.32 }}
      className="relative hidden md:flex h-full flex-col z-40 transition-all overflow-visible"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.52)",
        backdropFilter: "blur(28px) saturate(160%)",
        borderRight: "1px solid rgba(255, 255, 255, 0.75)",
        boxShadow: "inset 0 1.5px 0 rgba(255, 255, 255, 0.9)",
      }}
    >

      {/* SIDEBAR TOGGLE PILL */}
      <motion.button
        onClick={() => setIsCollapsed(!isCollapsed)}
        whileHover={{ scale: 1.04, backgroundColor: "rgba(255,255,255,0.85)" }}
        className="absolute -right-[13px] top-8 w-[26px] h-[50px] z-50 flex items-center justify-center shadow-sm outline-none"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.75)",
          border: "1px solid rgba(249, 115, 22, 0.25)",
          borderRadius: "0 10px 10px 0",
        }}
      >
        <motion.div
          animate={{ rotate: isCollapsed ? 0 : 180 }}
          transition={{ ease: [0.34, 1.56, 0.64, 1], duration: 0.32 }}
        >
          <ChevronRight className="h-4 w-4 text-[#F97316]" />
        </motion.div>
      </motion.button>

      {/* MAIN NAVIGATION */}
      <div className="relative z-20 flex-1 overflow-y-auto overflow-x-hidden pt-8 pb-4 flex flex-col custom-scrollbar">
        
        {/* Section Divider */}
        <div className="px-4 mb-2 flex items-center">
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span 
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="text-[10px] uppercase tracking-[0.06em] text-[rgba(0,0,0,0.35)] font-semibold whitespace-nowrap mr-3"
              >
                Main Menu
              </motion.span>
            )}
          </AnimatePresence>
          <div className="h-[0.5px] bg-[rgba(0,0,0,0.07)] flex-1" />
        </div>

        <nav className="flex flex-col gap-1 mt-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className="relative group block outline-none"
                title={isCollapsed ? item.name : undefined}
              >
                <div
                  className={cn(
                    "relative flex items-center gap-3 py-3 mx-2 nav-item-active-transition",
                    isActive
                      ? "rounded-[10px] px-3 bg-gradient-to-br from-orange-500/10 to-pink-500/10 border border-orange-500/30"
                      : "rounded-[10px] px-3 hover:bg-[rgba(255,255,255,0.5)] border border-transparent"
                  )}
                >
                  {isActive && (
                    <div className="absolute left-[-1px] top-[-1px] bottom-[-1px] w-[3px] bg-[#F97316] rounded-l-[10px]" />
                  )}
                  <Icon
                    className={cn(
                      "h-5 w-5 flex-shrink-0 relative z-10",
                      isActive 
                        ? "text-[#F97316]" 
                        : "text-[#B4B2A9] group-hover:text-[#F97316]"
                    )}
                  />
                  <AnimatePresence>
                    {!isCollapsed && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className={cn(
                          "truncate whitespace-nowrap relative z-10 text-sm font-medium",
                          isActive ? "nav-item-text-gradient" : "text-[#111827]/80 group-hover:text-[#F97316]"
                        )}
                      >
                        {item.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* USER FOOTER */}
      <div className="relative z-20 mt-auto p-4 border-t-[0.5px] border-[rgba(0,0,0,0.07)] bg-transparent">
        <Link href="/profile" className="flex items-center gap-3 group outline-none">
          <div className="relative shrink-0">
            <div 
              className="w-10 h-10 rounded-full shadow-sm flex items-center justify-center text-white font-bold text-sm"
              style={{ background: "linear-gradient(135deg, #FDBA74, #F472B6)" }}
            >
              KP
            </div>
            {/* Online Status Dot */}
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#10B981] rounded-full border-[2px] border-white shadow-sm" />
          </div>
          
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex flex-col whitespace-nowrap overflow-hidden"
              >
                <span className="text-[13px] font-medium text-[#1C1917]">Kirti Patel</span>
                <span className="text-[11px] text-[#78716C]">MBA Aspirant</span>
              </motion.div>
            )}
          </AnimatePresence>
        </Link>
      </div>
    </motion.div>
  );
}
