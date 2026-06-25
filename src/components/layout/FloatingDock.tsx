"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  LineChart,
  Target,
  AlertCircle,
  User,
  MessageSquare,
  CalendarDays,
} from "lucide-react";

const NAV_ITEMS = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Planning", href: "/study-planner", icon: CalendarDays },
  { name: "Mocks", href: "/mocks", icon: BookOpen },
  { name: "Practice", href: "/practice", icon: Target },
  { name: "CATGPT", href: "/catgpt", icon: MessageSquare },
  { name: "Profile Evaluator", href: "/profile-evaluator", icon: User },
  { name: "Analysis", href: "/analytics", icon: LineChart },
  { name: "Error Log", href: "/error-log", icon: AlertCircle },
];

export const FloatingDock = () => {
  const pathname = usePathname();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <motion.div
        className="flex items-center gap-2 p-3 rounded-full bg-white/40 backdrop-blur-3xl border border-white/60 shadow-apple-soft"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {NAV_ITEMS.map((item, index) => {
          const isActive = pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link key={item.href} href={item.href}>
              <div
                className="relative flex items-center justify-center cursor-pointer"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <motion.div
                  className={`relative flex items-center justify-center rounded-full transition-colors ${
                    isActive ? "bg-primary/10" : "hover:bg-black/5"
                  }`}
                  animate={{
                    width: hoveredIndex === index ? 60 : 48,
                    height: hoveredIndex === index ? 60 : 48,
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <Icon
                    className={`w-6 h-6 transition-colors ${
                      isActive ? "text-primary" : "text-gray-600"
                    }`}
                  />
                  
                  {/* Tooltip on hover */}
                  {hoveredIndex === index && (
                    <motion.div
                      className="absolute -top-10 px-3 py-1.5 text-xs font-medium text-white bg-black/80 rounded-lg whitespace-nowrap pointer-events-none"
                      initial={{ opacity: 0, y: 10, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      {item.name}
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-black/80 rotate-45" />
                    </motion.div>
                  )}
                </motion.div>
                
                {/* Active indicator dot */}
                {isActive && (
                  <motion.div
                    layoutId="active-dot"
                    className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </div>
            </Link>
          );
        })}
      </motion.div>
    </div>
  );
};
