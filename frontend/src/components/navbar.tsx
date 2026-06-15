"use client";

import * as React from "react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-6xl glass-panel rounded-full shadow-2xl border-white/10">
      <div className="px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-premium-gradient flex items-center justify-center text-white font-bold text-lg shadow-sm">
              M
            </div>
            <span className="font-bold text-xl tracking-tight text-white drop-shadow-md">MBAOS</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm font-medium text-white/80 hover:text-white transition-colors">Features</Link>
            <Link href="#how-it-works" className="text-sm font-medium text-white/80 hover:text-white transition-colors">How It Works</Link>
            <Link href="#colleges" className="text-sm font-medium text-white/80 hover:text-white transition-colors">Colleges</Link>
            <Link href="#resources" className="text-sm font-medium text-white/80 hover:text-white transition-colors">Resources</Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-2 md:gap-4">
          <div className="hidden md:flex items-center gap-4">
            <Link href="/login" className={cn(buttonVariants({ variant: "ghost" }), "rounded-full text-white hover:bg-white/10 hover:text-white")}>
              Login
            </Link>
            <Link href="/dashboard" className={cn(buttonVariants({ variant: "default" }), "rounded-full px-6 bg-premium-gradient text-white border-0 hover:opacity-90 shadow-[0_0_20px_rgba(79,70,229,0.4)] transition-all hover:scale-105")}>
              Start Free
            </Link>
          </div>
          
          <Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-white/10" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-20 left-0 w-full glass-panel rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="p-6 flex flex-col gap-4 text-white">
              <Link href="#features" className="text-sm font-medium" onClick={() => setIsOpen(false)}>Features</Link>
              <Link href="#how-it-works" className="text-sm font-medium" onClick={() => setIsOpen(false)}>How It Works</Link>
              <Link href="#colleges" className="text-sm font-medium" onClick={() => setIsOpen(false)}>Colleges</Link>
              <Link href="#resources" className="text-sm font-medium" onClick={() => setIsOpen(false)}>Resources</Link>
              <hr className="my-2 border-white/10" />
              <div className="flex flex-col gap-3">
                <Link href="/login" className={cn(buttonVariants({ variant: "outline" }), "w-full justify-center rounded-full border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white")} onClick={() => setIsOpen(false)}>Login</Link>
                <Link href="/dashboard" className={cn(buttonVariants({ variant: "default" }), "w-full justify-center rounded-full bg-premium-gradient text-white border-0")} onClick={() => setIsOpen(false)}>Start Free</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
