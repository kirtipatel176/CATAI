"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  ArrowRight,
  CheckCircle2,
  XCircle,
  Clock,
  BookOpen,
  BrainCircuit,
  Calculator,
  PlayCircle,
  ChevronRight,
  ListTodo,
  TrendingUp,
  Target
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- MOCK DATA ---

const AI_INSIGHT = {
  struggles: ["Percentages", "Ratio", "Time & Work"],
  primaryError: "Concept Errors",
  expectedImprovement: "10-15 marks",
  expectedPercentile: "+3.2 Percentile",
  weakestArea: "Arithmetic"
};

const ERROR_STREAM = [
  {
    id: 1,
    type: "Concept Error",
    icon: BrainCircuit,
    colorClass: "text-rose-500",
    bgClass: "bg-rose-100",
    borderClass: "border-rose-200 dark:border-rose-900/30",
    topic: "Quantitative Ability",
    subtopic: "Percentages",
    timeAgo: "2 days ago",
    question: "If the price of petrol increases by 25% and Raj intends to spend only an additional 15% on petrol, by what % should he reduce the quantity of petrol purchased?",
    yourAnswer: "B) 10%",
    correctAnswer: "D) 8%",
    timeTaken: "2m 45s",
    solution: "Let original price = 100, original quantity = 100. Total spend = 10000. New price = 125. New total spend = 11500 (15% increase). New quantity = 11500 / 125 = 92. Reduction in quantity = 100 - 92 = 8%.",
    aiExplanation: "You applied the percentage change sequentially instead of finding the ratio of total expenditures. Remember: Expenditure = Price × Quantity. If Price becomes 1.25P and Expenditure becomes 1.15E, then New Quantity = 1.15 / 1.25.",
    whyMistakeHappened: "Formula misapplication.",
    keyConcept: "Successive Percentage Changes vs Product Constancy",
    relatedCount: 12
  },
  {
    id: 2,
    type: "Calculation Error",
    icon: Calculator,
    colorClass: "text-orange-500",
    bgClass: "bg-orange-100 dark:bg-orange-900/20",
    borderClass: "border-orange-200 dark:border-orange-900/30",
    topic: "Quantitative Ability",
    subtopic: "Profit & Loss",
    timeAgo: "Yesterday",
    question: "A shopkeeper sells an article at a loss of 12.5%. Had he sold it for Rs. 51.80 more, he would have earned a profit of 6%. The cost price of the article is:",
    yourAnswer: "B) Rs. 300",
    correctAnswer: "A) Rs. 280",
    timeTaken: "3m 10s",
    solution: "Let CP be x. SP1 = 0.875x. SP2 = 1.06x. Difference = 0.185x = 51.80. x = 51.80 / 0.185 = 280.",
    aiExplanation: "You correctly identified the difference in percentages (18.5%), but made an arithmetic mistake while dividing 51.80 by 0.185. 51.80 / 0.185 is exactly 280, not 300.",
    whyMistakeHappened: "Divided incorrectly under time pressure.",
    keyConcept: "Decimal Division",
    relatedCount: 6
  },
  {
    id: 3,
    type: "Time Management",
    icon: Clock,
    colorClass: "text-purple-500",
    bgClass: "bg-purple-100 dark:bg-purple-900/20",
    borderClass: "border-purple-200 dark:border-purple-900/30",
    topic: "Quantitative Ability",
    subtopic: "Time & Work",
    timeAgo: "Today",
    question: "A and B can do a piece of work in 10 and 15 days respectively. They started the work together but B left after 2 days. In how many days will the remaining work be completed by A?",
    yourAnswer: "A) 5 days",
    correctAnswer: "C) 6.66 days",
    timeTaken: "5m 20s",
    solution: "Total work = LCM(10, 15) = 30 units. A's rate = 3 units/day. B's rate = 2 units/day. In 2 days, they complete (3+2)*2 = 10 units. Remaining work = 20 units. A completes it in 20/3 = 6.66 days.",
    aiExplanation: "You spent over 5 minutes calculating LCM and individual rates. This question should take < 90 seconds. You also calculated the total days (2 + ~5) instead of the remaining days.",
    whyMistakeHappened: "Did not read the question carefully ('remaining work') and over-complicated the fraction math.",
    keyConcept: "LCM Method for Work",
    relatedCount: 8
  }
];

const PRACTICE_RECOMMENDATIONS = [
  { topic: "Percentages", category: "Arithmetic", questions: 20, gain: "+0.8 Percentile" },
  { topic: "Ratio", category: "Arithmetic", questions: 15, gain: "+0.5 Percentile" },
  { topic: "Time & Work", category: "Arithmetic", questions: 10, gain: "+0.4 Percentile" },
];

// --- COMPONENTS ---

export default function ErrorLogPage() {
  const [expandedMistakeId, setExpandedMistakeId] = useState<number | null>(null);
  const [workspaceActiveTopic, setWorkspaceActiveTopic] = useState<string | null>(null);
  const [workspaceQuestionIndex, setWorkspaceQuestionIndex] = useState(0);

  // Retry Workspace Interactive Flow
  if (workspaceActiveTopic) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-transparent text-slate-900 dark:text-white font-sans p-6 md:p-12 max-w-4xl mx-auto relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-blue-500/5 rounded-full blur-[80px] md:blur-[100px] pointer-events-none -z-10" />

        <button 
          onClick={() => { setWorkspaceActiveTopic(null); setWorkspaceQuestionIndex(0); }}
          className="text-slate-500 dark:text-slate-400 dark:text-slate-500 hover:text-blue-600 mb-8 md:mb-12 flex items-center gap-2 text-sm font-semibold transition-colors bg-white dark:bg-white/5 px-4 py-2 rounded-full border border-slate-200 dark:border-white/10 shadow-sm w-fit"
        >
          <ArrowRight className="w-4 h-4 rotate-180" /> Back to Error Log
        </button>

        <div className="flex items-center gap-4 mb-8">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-white dark:bg-white/5 flex items-center justify-center border border-slate-200 dark:border-white/10 shadow-sm text-blue-600 shrink-0">
            <Target className="w-5 h-5 md:w-6 md:h-6" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight">Practice: {workspaceActiveTopic}</h1>
            <p className="text-slate-500 dark:text-slate-400 dark:text-slate-500 text-sm font-medium">Targeted reinforcement workspace</p>
          </div>
        </div>

        {/* Progress */}
        <div className="flex gap-2 md:gap-3 mb-8 md:mb-12">
          {[0, 1, 2].map((idx) => (
            <div 
              key={idx} 
              className={cn(
                "h-1.5 md:h-2 flex-1 rounded-full transition-all duration-500",
                idx < workspaceQuestionIndex ? "bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.5)]" :
                idx === workspaceQuestionIndex ? "bg-blue-400" : "bg-slate-200 dark:bg-white/20"
              )}
            />
          ))}
        </div>

        <div className="bg-white dark:bg-white/5 rounded-[24px] md:rounded-[32px] p-6 md:p-10 border border-slate-200 dark:border-white/10 shadow-apple-soft dark:shadow-none">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 md:mb-8 gap-3 sm:gap-0">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
              Question {workspaceQuestionIndex + 1} of 3
            </span>
            <span className={cn(
              "text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg border w-fit",
              workspaceQuestionIndex === 0 ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 border-emerald-200 dark:border-emerald-900/30" :
              workspaceQuestionIndex === 1 ? "bg-amber-50 text-amber-700 border-amber-200" : "bg-rose-50 dark:bg-rose-900/20 text-rose-700 border-rose-200 dark:border-rose-900/30"
            )}>
              {workspaceQuestionIndex === 0 ? "Easy" : workspaceQuestionIndex === 1 ? "Medium" : "Hard"}
            </span>
          </div>

          <h2 className="text-base md:text-lg leading-relaxed font-semibold text-slate-800 dark:text-slate-100 mb-8 md:mb-10">
            {/* Dummy question content based on step */}
            {workspaceQuestionIndex === 0 
              ? "A number is increased by 20% and then decreased by 20%. What is the net percentage change in the number?" 
              : workspaceQuestionIndex === 1 
              ? "In an election between two candidates, one got 55% of the total valid votes, 20% of the votes were invalid. If the total number of votes was 7500, the number of valid votes that the other candidate got, was:" 
              : "Fresh fruit contains 68% water and dry fruit contains 20% water. How much dry fruit can be obtained from 100 kg of fresh fruits?"}
          </h2>

          <div className="space-y-3 md:space-y-4">
            {['A', 'B', 'C', 'D'].map((opt) => (
              <button key={opt} className="w-full text-left p-4 md:p-5 rounded-xl md:rounded-2xl border-2 border-slate-100 dark:border-white/5 hover:border-blue-500 hover:bg-blue-50 dark:bg-blue-900/20 transition-all font-medium text-base md:text-lg text-slate-700 dark:text-slate-200 group">
                <span className="inline-block w-8 font-bold text-slate-400 dark:text-slate-500 group-hover:text-blue-600 transition-colors">{opt}.</span> Option {opt}
              </button>
            ))}
          </div>

          <div className="pt-8 md:pt-10 mt-8 md:mt-10 border-t border-slate-100 dark:border-white/5 flex justify-end">
            <button 
              onClick={() => {
                if (workspaceQuestionIndex < 2) {
                  setWorkspaceQuestionIndex(prev => prev + 1);
                } else {
                  setWorkspaceActiveTopic(null);
                  setWorkspaceQuestionIndex(0);
                }
              }}
              className="btn-primary-gradient px-6 py-3 md:px-8 md:py-4 rounded-xl text-sm md:text-base font-bold flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 w-full md:w-auto"
            >
              {workspaceQuestionIndex < 2 ? "Next Question" : "Complete Practice"} <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0A0A0A] text-slate-900 dark:text-white font-sans pb-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-12 overflow-x-hidden">
        
        {/* --- SECTION 1: HERO --- */}
        <div className="py-12 md:py-20 border-b border-slate-200 dark:border-white/10">
          <div className="inline-flex items-center gap-2 mb-6 md:mb-8 bg-blue-50 dark:bg-blue-900/20 px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-blue-100 dark:border-blue-900/30">
            <BrainCircuit className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
            <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-blue-700">Mistake Intelligence</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-8 md:mb-12 text-slate-900 dark:text-white leading-tight">
            142 Questions Need Review
          </h1>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-12">
            <div className="bg-white dark:bg-white/5 p-5 md:p-6 rounded-2xl md:rounded-3xl border border-slate-200 dark:border-white/10 shadow-sm flex-1">
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 dark:text-slate-500 mb-2">
                <TrendingUp className="w-4 h-4 text-emerald-500" />
                <p className="text-xs md:text-sm font-bold uppercase tracking-widest">Expected Improvement</p>
              </div>
              <p className="text-2xl md:text-3xl font-black text-emerald-600">{AI_INSIGHT.expectedPercentile}</p>
            </div>
            <div className="bg-white dark:bg-white/5 p-5 md:p-6 rounded-2xl md:rounded-3xl border border-slate-200 dark:border-white/10 shadow-sm flex-1">
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 dark:text-slate-500 mb-2">
                <Target className="w-4 h-4 text-rose-500" />
                <p className="text-xs md:text-sm font-bold uppercase tracking-widest">Weakest Area</p>
              </div>
              <p className="text-2xl md:text-3xl font-black text-slate-800 dark:text-slate-100">{AI_INSIGHT.weakestArea}</p>
            </div>
          </div>
        </div>

        {/* --- SECTION 2: AI INSIGHT --- */}
        <div className="py-10 md:py-14 border-b border-slate-200 dark:border-white/10">
          <div className="flex flex-col sm:flex-row items-start gap-4 md:gap-6 bg-white dark:bg-white/5 p-6 md:p-8 rounded-2xl md:rounded-[32px] border border-blue-100 dark:border-blue-900/30 shadow-apple-soft dark:shadow-none relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 md:w-64 md:h-64 bg-blue-500/5 rounded-full blur-[40px] md:blur-[60px] pointer-events-none" />
            
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-premium-gradient flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20">
              <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <div className="space-y-4 md:space-y-5 relative z-10">
              <p className="text-base md:text-lg leading-relaxed font-semibold text-slate-800 dark:text-slate-100">
                You repeatedly struggle with <span className="font-black text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-2 py-0.5 rounded-lg border border-blue-100 dark:border-blue-900/30">Percentages</span>, <span className="font-black text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-2 py-0.5 rounded-lg border border-blue-100 dark:border-blue-900/30">Ratio</span>, and <span className="font-black text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-2 py-0.5 rounded-lg border border-blue-100 dark:border-blue-900/30">Time & Work</span>.
              </p>
              <p className="text-sm md:text-base leading-relaxed text-slate-600 dark:text-slate-300 dark:text-slate-400 font-medium">
                Most errors are classified as <strong className="text-rose-600 bg-rose-50 dark:bg-rose-900/20 px-2 py-0.5 rounded-md">{AI_INSIGHT.primaryError}</strong>. Fixing these specific topics could improve your expected CAT score by <span className="text-emerald-600 font-bold">{AI_INSIGHT.expectedImprovement}</span>.
              </p>
            </div>
          </div>
        </div>

        {/* MAIN LAYOUT: Vertical Flow */}
        <div className="py-12 md:py-20">
          <div className="flex items-center gap-3 mb-8 md:mb-14">
            <ListTodo className="w-5 h-5 md:w-6 md:h-6 text-slate-800 dark:text-slate-100" />
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Mistake Stream</h2>
          </div>
          
          <div className="relative pl-6 md:pl-0">
            {/* Vertical timeline line */}
            <div className="absolute left-[11px] md:left-[19px] top-6 bottom-0 w-[2px] md:w-1 bg-slate-200 dark:bg-white/20 rounded-full" />

            {/* --- SECTION 3: MISTAKE STREAM --- */}
            <div className="space-y-8 md:space-y-12 relative">
              {ERROR_STREAM.map((mistake) => {
                const isExpanded = expandedMistakeId === mistake.id;
                const Icon = mistake.icon;

                return (
                  <div key={mistake.id} className="relative">
                    {/* Timeline Dot with Icon */}
                    <div className="absolute -left-3 md:-left-10 md:left-0 top-0 md:top-2 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-[#F8FAFC] dark:bg-[#0A0A0A]">
                      <div className={cn("w-8 h-8 md:w-10 md:h-10 rounded-xl md:rounded-2xl flex items-center justify-center shadow-sm border", mistake.bgClass, mistake.borderClass, mistake.colorClass)}>
                        <Icon className="w-4 h-4 md:w-5 md:h-5" />
                      </div>
                    </div>

                    <div className="pl-8 md:pl-16">
                      {/* Stream Item Header */}
                      <div 
                        className="cursor-pointer group flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-4 bg-white dark:bg-white/5 p-5 md:p-6 rounded-2xl md:rounded-[24px] border border-slate-200 dark:border-white/10 shadow-sm hover:shadow-md transition-all hover:border-slate-300"
                        onClick={() => setExpandedMistakeId(isExpanded ? null : mistake.id)}
                      >
                        <div>
                          <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-2">
                            <span className={cn("text-[10px] md:text-xs font-bold uppercase tracking-widest px-2 py-1 rounded-lg border whitespace-nowrap", mistake.bgClass, mistake.colorClass, mistake.borderClass)}>
                              {mistake.type}
                            </span>
                            <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-slate-300 hidden sm:block" />
                            <span className="text-xs md:text-sm text-slate-500 dark:text-slate-400 dark:text-slate-500 font-bold whitespace-nowrap">{mistake.subtopic}</span>
                          </div>
                          <p className="text-base md:text-lg font-semibold text-slate-800 dark:text-slate-100 line-clamp-2 md:line-clamp-1">{mistake.question}</p>
                        </div>
                        
                        <div className="flex items-center justify-between md:justify-end gap-4 md:gap-6 w-full md:w-auto mt-2 md:mt-0">
                          <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">{mistake.timeAgo}</p>
                          <div className={cn("flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full transition-colors shrink-0", isExpanded ? "bg-slate-900 text-white" : "bg-slate-100 dark:bg-white/10 text-slate-400 dark:text-slate-500 group-hover:bg-slate-200 dark:bg-white/20 group-hover:text-slate-900 dark:text-white")}>
                            <ChevronRight className={cn("w-4 h-4 md:w-5 md:h-5 transition-transform", isExpanded && "rotate-90")} />
                          </div>
                        </div>
                      </div>

                      {/* --- SECTION 4 & 5: MISTAKE DETAILS (Inline Split Layout) --- */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="pt-4 md:pt-6 pb-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-10">
                                
                                {/* LEFT SIDE: Question & Answers */}
                                <div className="space-y-4 md:space-y-6 bg-white dark:bg-white/5 p-5 md:p-8 rounded-2xl md:rounded-[32px] border border-slate-200 dark:border-white/10 shadow-apple-soft dark:shadow-none">
                                  <div>
                                    <h4 className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3 md:mb-4 flex items-center justify-between">
                                      Question
                                      <span className="flex items-center gap-1 md:gap-1.5 font-bold text-slate-600 dark:text-slate-300 dark:text-slate-400 normal-case px-2 py-1 md:px-3 md:py-1 bg-slate-100 dark:bg-white/10 rounded-lg">
                                        <Clock className="w-3 h-3 md:w-3.5 md:h-3.5" /> {mistake.timeTaken}
                                      </span>
                                    </h4>
                                    <p className="text-sm md:text-base leading-relaxed font-semibold text-slate-800 dark:text-slate-100">{mistake.question}</p>
                                  </div>

                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 pt-4 border-t border-slate-100 dark:border-white/5">
                                    <div className="p-4 md:p-5 rounded-xl md:rounded-2xl border border-rose-200 dark:border-rose-900/30 bg-rose-50 dark:bg-rose-900/20/50 relative overflow-hidden">
                                      <div className="absolute top-0 left-0 w-1 h-full bg-rose-500" />
                                      <div className="flex items-center gap-2 mb-2 md:mb-3 text-rose-600">
                                        <XCircle className="w-4 h-4 md:w-5 md:h-5" />
                                        <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest">Your Answer</span>
                                      </div>
                                      <p className="font-bold text-rose-900 text-sm md:text-base">{mistake.yourAnswer}</p>
                                    </div>
                                    <div className="p-4 md:p-5 rounded-xl md:rounded-2xl border border-emerald-200 dark:border-emerald-900/30 bg-emerald-50 dark:bg-emerald-900/20/50 relative overflow-hidden">
                                      <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500" />
                                      <div className="flex items-center gap-2 mb-2 md:mb-3 text-emerald-600">
                                        <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5" />
                                        <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest">Correct Answer</span>
                                      </div>
                                      <p className="font-bold text-emerald-900 text-sm md:text-base">{mistake.correctAnswer}</p>
                                    </div>
                                  </div>
                                </div>

                                {/* RIGHT SIDE: Solutions & Insights */}
                                <div className="space-y-4 md:space-y-6 bg-slate-900 text-white p-5 md:p-8 rounded-2xl md:rounded-[32px] shadow-apple-soft dark:shadow-none relative overflow-hidden">
                                  {/* Subtle inner glow */}
                                  <div className="absolute top-0 right-0 w-32 h-32 md:w-48 md:h-48 bg-blue-500/20 rounded-full blur-[40px] md:blur-[50px] pointer-events-none" />

                                  <div>
                                    <h4 className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3 md:mb-4 flex items-center gap-2">
                                      <BookOpen className="w-3 h-3 md:w-4 md:h-4" /> Solution
                                    </h4>
                                    <p className="text-sm md:text-base leading-relaxed text-slate-300 dark:text-slate-400 font-medium">{mistake.solution}</p>
                                  </div>

                                  <div>
                                    <h4 className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-blue-400 mb-3 md:mb-4 flex items-center gap-2">
                                      <Sparkles className="w-3 h-3 md:w-4 md:h-4" /> AI Explanation
                                    </h4>
                                    <p className="text-sm md:text-base leading-relaxed font-semibold bg-white dark:bg-white/5 p-4 md:p-5 rounded-xl md:rounded-2xl border border-white/10 backdrop-blur-sm">
                                      {mistake.aiExplanation}
                                    </p>
                                  </div>

                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 pt-4 md:pt-6 border-t border-white/10">
                                    <div>
                                      <h4 className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1 md:mb-2">Why it happened</h4>
                                      <p className="text-xs md:text-sm font-semibold text-rose-300">{mistake.whyMistakeHappened}</p>
                                    </div>
                                    <div>
                                      <h4 className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1 md:mb-2">Key Concept</h4>
                                      <p className="text-xs md:text-sm font-semibold text-emerald-300">{mistake.keyConcept}</p>
                                    </div>
                                  </div>

                                  {/* SECTION 5: RELATED MISTAKES (Topic Pills) */}
                                  <div className="pt-4 md:pt-6 flex flex-wrap items-center gap-2 md:gap-3">
                                    <span className="text-[10px] md:text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Related:</span>
                                    <div className="px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white dark:bg-white/5 border border-white/20 text-[10px] md:text-xs font-bold flex items-center gap-1.5 md:gap-2">
                                      {mistake.subtopic}
                                      <span className="bg-white dark:bg-white/5 text-slate-900 dark:text-white px-1.5 py-0.5 md:px-2 md:py-0.5 rounded-full whitespace-nowrap">{mistake.relatedCount} mistakes</span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* SECTION 7 TRIGGER: Practice Similar Questions */}
                              <div className="mt-6 md:mt-8 flex justify-center md:justify-start">
                                <button 
                                  onClick={() => setWorkspaceActiveTopic(mistake.subtopic)}
                                  className="btn-primary-gradient px-6 py-3 md:px-8 md:py-4 rounded-xl md:rounded-full text-sm md:text-base font-bold flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 w-full md:w-auto"
                                >
                                  <PlayCircle className="w-4 h-4 md:w-5 md:h-5" /> Practice Similar Questions
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* --- SECTION 6: PRACTICE RECOMMENDATION (Table Layout) --- */}
        <div className="py-12 md:py-20 border-t border-slate-200 dark:border-white/10 mt-6 md:mt-10">
          <div className="flex items-center gap-2 md:gap-3 mb-8 md:mb-10">
            <Target className="w-6 h-6 md:w-7 md:h-7 text-rose-500" />
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Targeted Practice</h2>
          </div>

          <div className="bg-white dark:bg-white/5 rounded-2xl md:rounded-[32px] border border-slate-200 dark:border-white/10 shadow-apple-soft dark:shadow-none overflow-hidden">
            {/* Table Header - Hidden on small mobile, visible on sm and up */}
            <div className="hidden sm:grid grid-cols-12 gap-2 md:gap-4 p-4 md:p-6 border-b border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-transparent text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
              <div className="col-span-5 md:col-span-4 pl-2 md:pl-4">Topic Focus</div>
              <div className="col-span-3 hidden md:block">Category</div>
              <div className="col-span-3 md:col-span-2 text-center">Volume</div>
              <div className="col-span-4 md:col-span-3 text-right pr-2 md:pr-4">Expected Gain</div>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-slate-100">
              {PRACTICE_RECOMMENDATIONS.map((rec, i) => (
                <div 
                  key={i} 
                  className="flex flex-col sm:grid sm:grid-cols-12 gap-3 md:gap-4 p-4 md:p-6 sm:items-center hover:bg-slate-50 dark:bg-transparent transition-colors group cursor-pointer"
                  onClick={() => setWorkspaceActiveTopic(rec.topic)}
                >
                  <div className="sm:col-span-5 md:col-span-4 flex items-center gap-3 md:gap-4 pl-0 md:pl-2">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 text-sm md:text-base font-bold border border-blue-100 dark:border-blue-900/30 group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0">
                      {i + 1}
                    </div>
                    <h3 className="font-bold text-sm md:text-lg text-slate-900 dark:text-white">{rec.topic}</h3>
                  </div>
                  
                  <div className="hidden md:flex md:col-span-3 items-center">
                    <span className="px-2 py-1 md:px-3 md:py-1 bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 dark:text-slate-400 rounded-md md:rounded-lg text-[10px] md:text-sm font-semibold">{rec.category}</span>
                  </div>

                  <div className="sm:col-span-3 md:col-span-2 flex items-center sm:justify-center">
                    <span className="font-bold text-xs md:text-sm text-slate-600 dark:text-slate-300 dark:text-slate-400 ml-11 sm:ml-0">{rec.questions} Qs</span>
                  </div>
                  
                  <div className="sm:col-span-4 md:col-span-3 flex items-center justify-between sm:justify-end gap-4 md:gap-6 pr-0 md:pr-2 ml-11 sm:ml-0">
                    <div className="text-left sm:text-right">
                      <p className="font-bold text-xs md:text-sm text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 md:px-3 md:py-1 rounded-md md:rounded-lg border border-emerald-100 dark:border-emerald-900/20">{rec.gain}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-slate-300 dark:text-slate-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
