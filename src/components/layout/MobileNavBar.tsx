"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  MessageSquare, 
  UserCheck, 
  CalendarDays, 
  Settings,
  BookOpen
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function MobileNavBar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const tabs = [
    { name: "Mission", href: "/dashboard", icon: LayoutDashboard },
    { name: "CATGPT", href: "/catgpt", icon: MessageSquare },
    { name: "Profile", href: "/profile-evaluator", icon: UserCheck },
    { name: "Planning", href: "/study-planner", icon: CalendarDays },
    { name: "Mocks", href: "/mocks", icon: BookOpen },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <div 
      className="fixed md:hidden z-50 left-0 right-0 bottom-0 px-4 pointer-events-none"
      style={{ paddingBottom: "max(16px, env(safe-area-inset-bottom))" }}
    >
      <motion.nav
        initial={{ y: 120 }}
        animate={{ y: 0 }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 0.1 
        }}
        className="mx-auto w-full max-w-md h-[72px] rounded-[28px] flex items-center justify-between px-2 pointer-events-auto"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.75)",
          backdropFilter: "blur(32px) saturate(200%)",
          WebkitBackdropFilter: "blur(32px) saturate(200%)",
          border: "0.5px solid rgba(255, 255, 255, 0.9)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,1), 0 12px 40px rgba(0,0,0,0.08)"
        }}
      >
        {tabs.map((tab) => {
          const isActive = pathname === tab.href || (tab.name === "Mission" && pathname === "/");

          return (
            <Link 
              key={tab.name} 
              href={tab.href} 
              className="relative flex flex-col items-center justify-center w-full h-full touch-manipulation"
            >
              <div className="relative flex flex-col items-center justify-center w-full h-full z-10">
                <motion.div 
                  animate={{ y: isActive ? -14 : 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="relative flex items-center justify-center w-12 h-12"
                >
                  {isActive && (
                    <motion.div
                      layoutId="mobile-nav-pill"
                      className="absolute inset-0 rounded-[18px] bg-gradient-to-br from-[#7F77DD] to-[#534AB7]"
                      style={{
                        boxShadow: "0 8px 20px -4px rgba(127,119,221,0.5), inset 0 2px 4px rgba(255,255,255,0.2)"
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    />
                  )}
                  <tab.icon 
                    className={cn(
                      "relative z-20 w-[22px] h-[22px] transition-colors duration-200", 
                      isActive ? "text-white" : "text-[#A19D92]"
                    )} 
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                </motion.div>
                
                <motion.span 
                  animate={{ 
                    opacity: isActive ? 1 : 0,
                    y: isActive ? 0 : 10,
                    scale: isActive ? 1 : 0.8
                  }}
                  transition={{ duration: 0.2 }}
                  className={cn("absolute bottom-[6px] text-[10px] font-bold tracking-wide whitespace-nowrap", isActive ? "nav-item-text-gradient" : "text-[#534AB7]")}
                >
                  {tab.name}
                </motion.span>
              </div>
            </Link>
          );
        })}
      </motion.nav>
    </div>
  );
}
