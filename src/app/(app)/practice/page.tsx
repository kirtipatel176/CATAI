"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Target, 
  TrendingUp, 
  Play, 
  ArrowRight,
  Brain,
  Calculator,
  BrainCircuit,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const RECOMMENDATIONS = [
  {
    id: "arithmetic-percentages",
    topic: "Percentages",
    section: "QA",
    questions: 20,
    expectedGain: "+0.8",
    icon: Calculator,
    color: "from-blue-500 to-cyan-500",
    bgLight: "bg-blue-50",
    textLight: "text-blue-700",
    borderLight: "border-blue-100",
    progress: 45
  },
  {
    id: "arithmetic-time-work",
    topic: "Time & Work",
    section: "QA",
    questions: 15,
    expectedGain: "+0.5",
    icon: Target,
    color: "from-purple-500 to-pink-500",
    bgLight: "bg-purple-50",
    textLight: "text-purple-700",
    borderLight: "border-purple-100",
    progress: 30
  },
  {
    id: "arithmetic-profit-loss",
    topic: "Profit & Loss",
    section: "QA",
    questions: 10,
    expectedGain: "+0.3",
    icon: BrainCircuit,
    color: "from-orange-500 to-amber-500",
    bgLight: "bg-orange-50",
    textLight: "text-orange-700",
    borderLight: "border-orange-100",
    progress: 60
  }
];

export default function PracticeCenterPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full flex flex-col gap-12 font-sans pb-12 md:pb-32">
      
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-2 px-2"
      >
        <div className="inline-flex items-center gap-2 bg-indigo-50 px-4 py-1.5 rounded-full border border-indigo-100 mb-2">
          <Brain className="w-4 h-4 text-indigo-600" />
          <span className="text-sm font-bold uppercase tracking-widest text-indigo-700">AI Adaptive Learning</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">Practice Center</h1>
        <p className="text-xl text-gray-500 font-medium">Curated sets specifically targeting your weak areas.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="px-2"
      >
        <div className="flex items-center gap-3 mb-8">
          <Sparkles className="w-6 h-6 text-gray-900" />
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Recommended Today</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {RECOMMENDATIONS.map((rec, i) => (
            <motion.div 
              key={rec.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.15 + 0.3 }}
              className="group bg-white/60 backdrop-blur-3xl border border-white/80 rounded-[32px] overflow-hidden shadow-apple-soft hover:shadow-xl transition-all duration-500 flex flex-col h-full hover:bg-white/80 relative"
            >
              {/* Card Header Background Graphic */}
              <div className="absolute top-0 right-0 w-32 h-32 opacity-10 blur-2xl group-hover:opacity-20 transition-opacity rounded-full bg-gradient-to-br -mr-10 -mt-10 pointer-events-none" style={{ backgroundImage: `var(--tw-gradient-stops)` }} />
              
              <div className="p-8 pb-6 flex-1 flex flex-col relative z-10">
                <div className="flex items-start justify-between mb-8">
                  <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center", rec.bgLight)}>
                    <rec.icon className={cn("w-7 h-7", rec.textLight)} />
                  </div>
                  <span className="px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-widest bg-gray-100 text-gray-600 border border-gray-200">
                    {rec.section}
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 tracking-tight mb-2">{rec.topic}</h3>
                
                <div className="flex items-center gap-3 mb-8">
                  <div className="flex items-center gap-1.5 text-gray-600 font-medium">
                    <Target className="w-4 h-4" />
                    {rec.questions} Questions
                  </div>
                </div>

                <div className="mt-auto space-y-4">
                  <div>
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-sm font-semibold text-gray-500 uppercase tracking-widest">Mastery Level</span>
                      <span className="text-sm font-bold text-gray-900">{rec.progress}%</span>
                    </div>
                    <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden border border-gray-200">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${rec.progress}%` }}
                        transition={{ duration: 1.5, delay: 0.8 }}
                        className={cn("h-full rounded-full bg-gradient-to-r", rec.color)}
                      />
                    </div>
                  </div>

                  <div className={cn("p-4 rounded-2xl border flex items-center justify-between", rec.bgLight, rec.borderLight)}>
                    <div className="flex items-center gap-2">
                      <TrendingUp className={cn("w-5 h-5", rec.textLight)} />
                      <span className={cn("font-bold text-sm", rec.textLight)}>Expected Gain</span>
                    </div>
                    <div className={cn("text-xl font-black", rec.textLight)}>
                      {rec.expectedGain} <span className="text-sm opacity-70">Percentile</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-50/50 border-t border-gray-100">
                <Link href={`/practice/${rec.id}`} className="w-full bg-gray-900 hover:bg-gray-800 text-white px-6 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-md">
                  <Play className="w-5 h-5 fill-current" />
                  Start Practice
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* TOPIC BROWSER */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="px-2 mt-8"
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Browse All Topics</h2>
          <Link href="#" className="text-blue-600 font-bold hover:text-blue-700 flex items-center gap-1 group">
            View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {['Algebra', 'Geometry', 'Number System', 'Modern Math', 'Reading Comprehension', 'Verbal Ability', 'Data Interpretation', 'Logical Reasoning'].map((topic, i) => (
            <Link key={i} href={`/practice/${topic.toLowerCase().replace(/ /g, '-')}`} className="bg-white/60 backdrop-blur-xl border border-white/80 p-5 rounded-2xl shadow-apple-soft hover:shadow-md transition-all cursor-pointer group hover:bg-white/80 block">
              <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{topic}</h4>
              <p className="text-sm text-gray-500 font-medium mt-1">Explore Sets</p>
            </Link>
          ))}
        </div>
      </motion.div>

    </div>
  );
}
