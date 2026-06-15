"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, MessageSquare, BarChart3, Target, Settings, BrainCircuit } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "CATGPT", href: "/dashboard/catgpt", icon: MessageSquare },
  { name: "Profile Evaluator", href: "/dashboard/profile-evaluator", icon: BarChart3 },
  { name: "Study Planner", href: "/dashboard/study-planner", icon: Target },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 w-[280px] border-r bg-background flex flex-col">
      <div className="h-16 flex items-center px-6 border-b">
        <Link href="/" className="flex items-center space-x-2">
          <BrainCircuit className="w-6 h-6 text-primary" />
          <span className="font-bold text-xl tracking-tight text-foreground">
            MBAOS
          </span>
        </Link>
      </div>

      <div className="flex-1 px-4 py-6 overflow-y-auto">
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className={cn("w-5 h-5", isActive ? "text-primary" : "text-muted-foreground")} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
            JD
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">John Doe</span>
            <span className="text-xs text-muted-foreground">Free Plan</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
