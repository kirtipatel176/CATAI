"use client";

import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Bot,
  Clock,
  CheckCircle2,
  BookOpen,
  Brain,
  Activity,
  MessageSquare,
  FileText,
  TrendingUp,
  Target
} from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

const cardClass = "bg-[rgba(255,255,255,0.8)] backdrop-blur-xl rounded-[24px] border border-[rgba(255,255,255,0.5)] shadow-[0_20px_60px_rgba(15,23,42,0.08)]";

export default function DashboardOverviewPage() {
  return (
    <div className="min-h-screen bg-[#F7F8FC] text-[#111827] pb-32 pt-8 selection:bg-[#2563EB]/20 font-sans w-full">
      <motion.div
        className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* SECTION 1: MISSION CONTROL HERO */}
        <motion.section variants={itemVariants} className="relative w-full rounded-[32px] overflow-hidden bg-gradient-to-br from-[#2563EB] via-[#4F46E5] to-[#7C3AED] text-white shadow-[0_20px_60px_rgba(79,70,229,0.2)]">
          <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
          <div className="relative z-10 flex flex-col lg:flex-row h-full min-h-[260px]">
            {/* Left Side */}
            <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="bg-white/20 backdrop-blur-md px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full border border-white/20">
                  CAT 2027
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-semibold tracking-tight mb-3">
                99 Percentile Goal
              </h1>
              <p className="text-white/80 text-base md:text-lg mb-8 max-w-lg leading-relaxed font-medium">
                248 days remaining until exam day.
                <br />
                Stay consistent and focus on your roadmap.
              </p>
              
              <div className="flex flex-wrap items-center gap-8 mb-8">
                <div className="flex flex-col gap-1">
                  <span className="text-white/60 text-[11px] font-bold uppercase tracking-widest">Profile Score</span>
                  <span className="font-semibold text-2xl tracking-tight">82<span className="text-white/60 text-base font-medium">/100</span></span>
                </div>
                <div className="w-px h-10 bg-white/20"></div>
                <div className="flex flex-col gap-1">
                  <span className="text-white/60 text-[11px] font-bold uppercase tracking-widest">Study Progress</span>
                  <span className="font-semibold text-2xl tracking-tight">72%</span>
                </div>
                <div className="w-px h-10 bg-white/20"></div>
                <div className="flex flex-col gap-1">
                  <span className="text-white/60 text-[11px] font-bold uppercase tracking-widest">Current Phase</span>
                  <span className="font-semibold text-2xl tracking-tight">Foundation</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <Button className="bg-white text-[#111827] hover:bg-white/90 rounded-2xl h-12 px-8 font-semibold shadow-sm transition-transform active:scale-95 text-base">
                  Continue Roadmap
                </Button>
                <Button variant="outline" className="bg-transparent border-white/30 text-white hover:bg-white/10 hover:text-white rounded-2xl h-12 px-8 font-semibold transition-transform active:scale-95 text-base">
                  <Bot className="w-4 h-4 mr-2" />
                  Open CATGPT
                </Button>
              </div>
            </div>

            {/* Right Side: Roadmap Visualization */}
            <div className="lg:w-[40%] bg-black/10 backdrop-blur-sm border-l border-white/10 p-8 md:p-12 flex flex-col justify-center">
              <div className="space-y-8 w-full max-w-sm mx-auto">
                
                {/* Foundation */}
                <div className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-semibold text-lg tracking-wide">Foundation</span>
                    <span className="text-[#22C55E] text-[10px] font-bold uppercase tracking-wider bg-[#22C55E]/20 border border-[#22C55E]/30 px-2 py-0.5 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.3)]">Active</span>
                  </div>
                  <div className="flex items-center relative">
                    <div className="h-[3px] w-full bg-white/20 rounded-full"></div>
                    <div className="absolute left-0 h-[3px] w-[30%] bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)]"></div>
                    <div className="absolute left-[30%] -translate-x-1/2 w-3.5 h-3.5 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,1)]"></div>
                  </div>
                </div>

                {/* Concept Building */}
                <div className="relative opacity-50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium text-lg tracking-wide">Concept Building</span>
                  </div>
                  <div className="flex items-center relative">
                    <div className="h-[3px] w-full bg-white/20 rounded-full"></div>
                  </div>
                </div>

                {/* Mocks */}
                <div className="relative opacity-50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium text-lg tracking-wide">Mocks</span>
                  </div>
                  <div className="flex items-center relative">
                    <div className="h-[3px] w-full bg-white/20 rounded-full"></div>
                  </div>
                </div>

                {/* Revision */}
                <div className="relative opacity-50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium text-lg tracking-wide">Revision</span>
                  </div>
                  <div className="flex items-center relative">
                    <div className="h-[3px] w-full bg-white/20 rounded-full"></div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </motion.section>

        {/* SECTION 2: TODAY'S FOCUS */}
        <motion.section variants={itemVariants} className="space-y-6">
          <h2 className="text-xl font-semibold tracking-tight">Today's Focus</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            
            <div className={`${cardClass} p-6 flex flex-col group hover:-translate-y-1 transition-transform duration-300 cursor-pointer`}>
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#DC2626]/10 flex items-center justify-center text-[#DC2626]">
                  <BookOpen className="w-6 h-6" />
                </div>
                <span className="px-2.5 py-1 bg-[#DC2626]/10 text-[#DC2626] border border-[#DC2626]/20 text-[10px] font-bold uppercase tracking-wider rounded-lg">High Priority</span>
              </div>
              <h3 className="font-semibold text-lg mb-2 text-[#111827]">Arithmetic Practice</h3>
              <p className="text-[#6B7280] text-sm font-medium flex items-center gap-1.5 mt-auto"><Clock className="w-4 h-4" /> 45 Minutes</p>
            </div>

            <div className={`${cardClass} p-6 flex flex-col group hover:-translate-y-1 transition-transform duration-300 cursor-pointer`}>
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#D97706]/10 flex items-center justify-center text-[#D97706]">
                  <Brain className="w-6 h-6" />
                </div>
                <span className="px-2.5 py-1 bg-[#D97706]/10 text-[#D97706] border border-[#D97706]/20 text-[10px] font-bold uppercase tracking-wider rounded-lg">Medium Priority</span>
              </div>
              <h3 className="font-semibold text-lg mb-2 text-[#111827]">DILR Arrangement Set</h3>
              <p className="text-[#6B7280] text-sm font-medium flex items-center gap-1.5 mt-auto"><Clock className="w-4 h-4" /> 30 Minutes</p>
            </div>

            <div className={`${cardClass} p-6 flex flex-col group hover:-translate-y-1 transition-transform duration-300 cursor-pointer`}>
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#D97706]/10 flex items-center justify-center text-[#D97706]">
                  <FileText className="w-6 h-6" />
                </div>
                <span className="px-2.5 py-1 bg-[#D97706]/10 text-[#D97706] border border-[#D97706]/20 text-[10px] font-bold uppercase tracking-wider rounded-lg">Medium Priority</span>
              </div>
              <h3 className="font-semibold text-lg mb-2 text-[#111827]">Reading Comprehension</h3>
              <p className="text-[#6B7280] text-sm font-medium flex items-center gap-1.5 mt-auto"><Clock className="w-4 h-4" /> 30 Minutes</p>
            </div>

            <div className={`${cardClass} p-6 flex flex-col group hover:-translate-y-1 transition-transform duration-300 cursor-pointer`}>
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#6B7280]/10 flex items-center justify-center text-[#6B7280]">
                  <Activity className="w-6 h-6" />
                </div>
                <span className="px-2.5 py-1 bg-[#6B7280]/10 text-[#6B7280] border border-[#6B7280]/20 text-[10px] font-bold uppercase tracking-wider rounded-lg">Optional</span>
              </div>
              <h3 className="font-semibold text-lg mb-2 text-[#111827]">Mock Analysis</h3>
              <p className="text-[#6B7280] text-sm font-medium flex items-center gap-1.5 mt-auto"><Clock className="w-4 h-4" /> 20 Minutes</p>
            </div>

          </div>
        </motion.section>

        {/* SECTION 3: AI COACH */}
        <motion.section variants={itemVariants} className="space-y-6">
          <h2 className="text-xl font-semibold tracking-tight">AI Coach</h2>
          <div className={`${cardClass} overflow-hidden p-8 md:p-10 relative flex flex-col justify-center min-h-[220px]`}>
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#7C3AED]/10 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
              <div className="flex items-start gap-6 max-w-3xl">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#7C3AED] flex items-center justify-center shadow-[0_10px_20px_rgba(124,58,237,0.2)] shrink-0">
                  <Bot className="w-7 h-7 text-white" />
                </div>
                <div className="pt-1">
                  <p className="text-xl md:text-2xl font-medium leading-relaxed tracking-tight text-[#111827]">
                    Your DILR accuracy has declined over the last 2 weeks.<br className="hidden md:block" />
                    Focus on arrangement and puzzle-based sets.
                  </p>
                  <div className="mt-5 inline-flex items-center gap-2 px-3 py-1.5 bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/20 rounded-xl font-semibold text-sm">
                    <TrendingUp className="w-4 h-4" />
                    Expected readiness improvement: +4%
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full md:w-auto">
                <Button className="w-full sm:w-auto bg-[#111827] text-white hover:bg-[#111827]/90 rounded-2xl h-12 px-6 shadow-md transition-transform active:scale-95 font-medium text-base">
                  Generate Practice Set
                </Button>
                <Button variant="outline" className="w-full sm:w-auto border-[#111827]/10 text-[#111827] hover:bg-[#111827]/5 rounded-2xl h-12 px-6 transition-transform active:scale-95 font-medium text-base bg-white">
                  Ask CATGPT
                </Button>
              </div>
            </div>
          </div>
        </motion.section>

        {/* SECTION 4: PREPARATION STATUS */}
        <motion.section variants={itemVariants} className="space-y-6">
          <h2 className="text-xl font-semibold tracking-tight">Preparation Status</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            
            <div className={`${cardClass} p-6 flex flex-col justify-center items-center text-center hover:scale-[1.02] transition-transform duration-300`}>
              <span className="text-[#6B7280] text-sm font-semibold uppercase tracking-wider mb-2">Academics</span>
              <span className="text-4xl font-semibold tracking-tight text-[#111827]">86<span className="text-lg text-[#6B7280] font-medium">/100</span></span>
            </div>

            <div className={`${cardClass} p-6 flex flex-col justify-center items-center text-center hover:scale-[1.02] transition-transform duration-300`}>
              <span className="text-[#6B7280] text-sm font-semibold uppercase tracking-wider mb-2">Profile Strength</span>
              <span className="text-4xl font-semibold tracking-tight text-[#111827]">82<span className="text-lg text-[#6B7280] font-medium">/100</span></span>
            </div>

            <div className={`${cardClass} p-6 flex flex-col justify-center items-center text-center hover:scale-[1.02] transition-transform duration-300`}>
              <span className="text-[#6B7280] text-sm font-semibold uppercase tracking-wider mb-2">Roadmap Completion</span>
              <span className="text-4xl font-semibold tracking-tight text-[#111827]">72%</span>
            </div>

            <div className={`${cardClass} p-6 flex flex-col justify-center items-center text-center hover:scale-[1.02] transition-transform duration-300`}>
              <span className="text-[#6B7280] text-sm font-semibold uppercase tracking-wider mb-2">Task Completion Rate</span>
              <span className="text-4xl font-semibold tracking-tight text-[#111827]">84%</span>
            </div>

          </div>
        </motion.section>

        {/* SECTION 5 & 6: COLLEGE TARGETS & RECENT ACTIVITY */}
        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* SECTION 5: COLLEGE TARGETS */}
          <motion.section variants={itemVariants} className="space-y-6">
            <h2 className="text-xl font-semibold tracking-tight">College Targets</h2>
            <div className={`${cardClass} p-8 space-y-6 h-[calc(100%-3.5rem)]`}>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#2563EB]"></div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#6B7280]">Dream</span>
                </div>
                <div className="bg-[#2563EB]/5 border border-[#2563EB]/10 rounded-2xl p-5 flex flex-col sm:flex-row gap-4 sm:gap-8">
                  <span className="font-semibold text-lg text-[#111827]">IIM Ahmedabad</span>
                  <span className="font-semibold text-lg text-[#111827]">IIM Bangalore</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#7C3AED]"></div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#6B7280]">Target</span>
                </div>
                <div className="bg-[#7C3AED]/5 border border-[#7C3AED]/10 rounded-2xl p-5 flex flex-col sm:flex-row gap-4 sm:gap-8">
                  <span className="font-semibold text-lg text-[#111827]">SPJIMR</span>
                  <span className="font-semibold text-lg text-[#111827]">MDI Gurgaon</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#22C55E]"></div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#6B7280]">Safe</span>
                </div>
                <div className="bg-[#22C55E]/5 border border-[#22C55E]/10 rounded-2xl p-5 flex flex-col sm:flex-row gap-4 sm:gap-8">
                  <span className="font-semibold text-lg text-[#111827]">IMI Delhi</span>
                  <span className="font-semibold text-lg text-[#111827]">TAPMI</span>
                </div>
              </div>

            </div>
          </motion.section>

          {/* SECTION 6: RECENT ACTIVITY */}
          <motion.section variants={itemVariants} className="space-y-6">
            <h2 className="text-xl font-semibold tracking-tight">Recent Activity</h2>
            <div className={`${cardClass} p-8 h-[calc(100%-3.5rem)] flex flex-col justify-center`}>
              <div className="space-y-8">
                
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center shrink-0">
                    <Activity className="w-6 h-6" />
                  </div>
                  <div className="pt-1.5">
                    <p className="font-semibold text-lg text-[#111827]">Profile Evaluation Updated</p>
                    <p className="text-sm font-medium text-[#6B7280] mt-0.5">Just now</p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-[#7C3AED]/10 text-[#7C3AED] flex items-center justify-center shrink-0">
                    <Target className="w-6 h-6" />
                  </div>
                  <div className="pt-1.5">
                    <p className="font-semibold text-lg text-[#111827]">Roadmap Generated</p>
                    <p className="text-sm font-medium text-[#6B7280] mt-0.5">2h ago</p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-[#A855F7]/10 text-[#A855F7] flex items-center justify-center shrink-0">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div className="pt-1.5">
                    <p className="font-semibold text-lg text-[#111827]">CATGPT Conversation</p>
                    <p className="text-sm font-medium text-[#6B7280] mt-0.5">5h ago</p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-[#22C55E]/10 text-[#22C55E] flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div className="pt-1.5">
                    <p className="font-semibold text-lg text-[#111827]">Task Completed</p>
                    <p className="text-sm font-medium text-[#6B7280] mt-0.5">Yesterday</p>
                  </div>
                </div>

              </div>
            </div>
          </motion.section>

        </div>

      </motion.div>
    </div>
  );
}
