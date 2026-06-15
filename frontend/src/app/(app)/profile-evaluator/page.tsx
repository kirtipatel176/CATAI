"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, Variants } from "framer-motion";
import { 
  PlusCircle, 
  Download,
  FileText,
  Calendar,
  Award,
  ChevronRight,
  ChevronLeft,
  Bot,
  GraduationCap,
  Briefcase,
  Target,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { toast } from "sonner";

// Animations
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

const glassCardClass = "glass-liquid-elevated rounded-[24px]";
const glassInputClass = "glass-liquid-sunken rounded-xl h-12 text-[#111827] dark:text-white border-transparent focus:border-[#7F77DD] focus:ring-[#7F77DD] placeholder:text-[color:var(--color-text-glass-tertiary)]";

// Mock Data
const mockHistoryData = Array.from({ length: 25 }, (_, i) => {
  const versionNum = 25 - i;
  return {
    id: `v${versionNum}`,
    name: `Profile Evaluation V${versionNum}`,
    date: versionNum === 4 ? "15 June 2026" : versionNum === 3 ? "May 2026" : versionNum === 2 ? "Apr 2026" : `March 2026`,
    score: versionNum === 4 ? 82 : versionNum === 3 ? 78 : versionNum === 2 ? 74 : 70 + (versionNum % 15)
  };
});
// Re-arrange top 3 based on user request
mockHistoryData[0] = { id: "v4", name: "Profile Evaluation V4", date: "15 June 2026", score: 82 };
mockHistoryData[1] = { id: "v3", name: "Profile Evaluation V3", date: "May 2026", score: 78 };
mockHistoryData[2] = { id: "v2", name: "Profile Evaluation V2", date: "Apr 2026", score: 74 };

export default function ProfileIntelligencePage() {
  const router = useRouter();
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.ceil(mockHistoryData.length / ITEMS_PER_PAGE);

  const currentHistory = mockHistoryData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const latestReport = mockHistoryData[0];

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast.success("Downloading Professional PDF...");
  };

  const handleViewReport = (id: string) => {
    router.push(`/profile-evaluator/report/${id}`);
  };

  return (
    <div className="relative min-h-screen w-full pb-32 bg-[#F6F8FC] dark:bg-[#0A0A0A]">
      {/* AMBIENT LAYERED GRADIENT BACKGROUND */}
      <div className="fixed inset-0 z-[-1] liquid-bg overflow-hidden pointer-events-none"></div>

      <motion.div 
        className="pt-8 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* SECTION 1: PROFILE INTELLIGENCE HEADER */}
        <motion.section variants={itemVariants} className="relative w-full rounded-[32px] overflow-hidden shadow-sm border border-black/5 dark:border-white/5 group">
          <div className="absolute inset-0 bg-gradient-to-br from-[#2563EB] via-[#4F46E5] to-[#7C3AED] z-0 opacity-95 transition-opacity group-hover:opacity-100 duration-500"></div>
          <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-20 mix-blend-overlay z-0"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row h-full items-center justify-between p-8 md:p-12 gap-8">
            <div className="flex flex-col justify-between w-full max-w-2xl space-y-6">
              <div className="text-white">
                <h1 className="text-3xl md:text-5xl font-semibold tracking-tight leading-tight mb-3">Profile Intelligence</h1>
                <p className="text-white/80 text-base md:text-lg leading-relaxed max-w-xl">
                  Generate and manage AI-powered MBA profile evaluations.
                </p>
              </div>

              {/* Bottom Actions */}
              <div className="flex flex-wrap items-center gap-3">
                <button onClick={() => setIsWizardOpen(true)} className="btn-primary-gradient flex items-center shadow-sm">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Generate New Report
                </button>
                <button onClick={handleDownload} className="btn-secondary-tinted flex items-center">
                  <Download className="mr-2 h-4 w-4" /> Download Latest Report
                </button>
              </div>
            </div>

            {/* Right Side: Latest Score Display */}
            <div className="relative flex items-center justify-center shrink-0">
              <div className="flex flex-col items-center justify-center text-white bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl shadow-2xl">
                <p className="text-xs text-white/70 uppercase tracking-widest font-semibold mb-2">Latest Score</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-6xl font-bold tracking-tighter">{latestReport.score}</span>
                  <span className="text-lg text-white/60 font-medium">/ 100</span>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* SECTION 2: LATEST REPORT CARD */}
        <motion.section variants={itemVariants} className="space-y-5">
          <div className="flex items-center gap-3 pl-2">
            <Award className="h-5 w-5 text-[#4F46E5]" />
            <h2 className="text-lg font-semibold text-[#111827] dark:text-white tracking-tight">Latest Report</h2>
          </div>
          
          <div className={`${glassCardClass} p-8 lg:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:shadow-lg transition-shadow`}>
            <div className="space-y-4 flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-2xl font-bold text-[#111827] dark:text-white">{latestReport.name}</h3>
                <span className="px-3 py-1 bg-[#22C55E]/10 text-[#22C55E] text-xs font-bold uppercase tracking-wider rounded-full">Strong Profile</span>
              </div>
              <div className="flex items-center gap-6 text-[#6B7280] text-sm font-medium">
                <div className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> Generated {latestReport.date}</div>
                <div className="flex items-center gap-1.5"><Target className="h-4 w-4" /> Score: {latestReport.score} / 100</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 w-full md:w-auto">
              <button onClick={() => handleViewReport(latestReport.id)} className="btn-primary-gradient flex-1 md:flex-none shadow-md">
                View Report
              </button>
              <button onClick={handleDownload} className="btn-secondary-tinted flex-1 md:flex-none flex items-center justify-center">
                <Download className="h-4 w-4 mr-2" /> Download PDF
              </button>
            </div>
          </div>
        </motion.section>

        {/* SECTION 3: REPORT HISTORY */}
        <motion.section variants={itemVariants} className="space-y-5">
          <div className="flex items-center gap-3 pl-2">
            <FileText className="h-5 w-5 text-[#6B7280]" />
            <h2 className="text-lg font-semibold text-[#111827] dark:text-white tracking-tight">Report History</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {currentHistory.map((report) => (
              <div 
                key={report.id} 
                className={`${glassCardClass} p-6 flex flex-col gap-5 hover:border-[#4F46E5]/30 transition-colors group cursor-pointer`}
                onClick={() => handleViewReport(report.id)}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-base font-bold text-[#111827] dark:text-white mb-1">{report.name}</h4>
                    <p className="text-xs font-medium text-[#6B7280] flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> Generated {report.date}
                    </p>
                  </div>
                  <div className="bg-black/5 dark:bg-white/5 px-3 py-1.5 rounded-xl">
                    <span className="text-lg font-bold text-[#111827] dark:text-white">{report.score}</span>
                    <span className="text-[10px] text-[#6B7280] ml-1">/100</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-auto pt-2 border-t border-black/5 dark:border-white/5">
                  <Button variant="ghost" onClick={(e) => { e.stopPropagation(); handleViewReport(report.id); }} className="flex-1 h-10 rounded-xl text-sm font-semibold text-[#4F46E5] hover:bg-[#4F46E5]/10 bg-[#4F46E5]/5">
                     View Report
                  </Button>
                  <Button variant="ghost" onClick={handleDownload} className="flex-1 h-10 rounded-xl text-sm font-semibold text-[#1D9E75] hover:bg-[#1D9E75]/10 bg-[#1D9E75]/5">
                    <Download className="h-4 w-4 mr-1.5" /> PDF
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Premium Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 pt-8">
              <Button 
                variant="outline" 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="h-10 px-4 rounded-full bg-white dark:bg-[#111827] border-black/5 dark:border-white/10 shadow-sm font-medium"
              >
                <ChevronLeft className="h-4 w-4 mr-1" /> Previous
              </Button>
              
              <div className="flex items-center gap-1 bg-white dark:bg-[#111827] p-1.5 rounded-full border border-black/5 dark:border-white/10 shadow-sm">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`h-8 w-8 rounded-full text-sm font-bold transition-all ${
                      currentPage === page 
                        ? "bg-[#4F46E5] text-white shadow-md" 
                        : "text-[#6B7280] hover:bg-black/5 dark:hover:bg-white/5 hover:text-[#111827] dark:hover:text-white"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <Button 
                variant="outline" 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="h-10 px-4 rounded-full bg-white dark:bg-[#111827] border-black/5 dark:border-white/10 shadow-sm font-medium"
              >
                Next <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          )}
        </motion.section>

        {/* SECTION 4: GENERATE NEW REPORT (FLOATING PREMIUM CARD) */}
        <motion.section variants={itemVariants} className="pt-8">
          <div className="relative w-full rounded-[32px] overflow-hidden shadow-2xl shadow-[#4F46E5]/10 border border-[#4F46E5]/20 bg-gradient-to-r from-white to-[#F6F8FC] dark:from-[#111827] dark:to-[#0A0A0A]">
            <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-[#4F46E5]/10 to-transparent pointer-events-none"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-8 md:p-12 gap-8">
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-[#111827] dark:text-white flex items-center gap-2">
                  <Bot className="h-6 w-6 text-[#4F46E5]" /> Create New Evaluation
                </h3>
                <p className="text-[#6B7280] text-base max-w-xl">
                  Generate a fresh MBA profile analysis using your latest academic, professional, and mock test information.
                </p>
              </div>
              <button onClick={() => setIsWizardOpen(true)} className="btn-primary-gradient w-full md:w-auto text-lg px-10 py-4 h-auto shadow-lg shadow-[#4F46E5]/30 shrink-0 flex items-center justify-center">
                Create Report <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </motion.section>

      </motion.div>

      {/* CREATE REPORT WIZARD (FULL SCREEN) */}
      <Dialog open={isWizardOpen} onOpenChange={setIsWizardOpen}>
        <DialogContent className="max-w-[96vw] sm:max-w-[96vw] lg:max-w-[1280px] w-full h-[90vh] bg-white/90 dark:bg-[#0A0A0A]/90 backdrop-blur-3xl shadow-2xl rounded-[32px] p-0 overflow-hidden flex flex-col lg:flex-row border border-white/20 dark:border-white/10 gap-0">
          
          {/* Left Panel */}
          <div className="hidden lg:flex lg:w-[380px] xl:w-[420px] shrink-0 bg-gradient-to-br from-[#2563EB] via-[#4F46E5] to-[#7C3AED] p-10 flex-col justify-between text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-20 mix-blend-overlay z-0"></div>
            <div className="relative z-10">
              <div className="h-12 w-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-8 border border-white/30">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight mb-4">Profile Evaluation</h2>
              <p className="text-white/80 text-sm leading-relaxed">
                Provide your academic and professional details to get a highly accurate, AI-driven analysis of your MBA admission chances.
              </p>
            </div>

            <div className="relative z-10 space-y-8 mt-12 flex-1">
              {[
                { step: 1, label: "Academics", icon: GraduationCap },
                { step: 2, label: "Work Experience", icon: Briefcase },
                { step: 3, label: "Achievements", icon: Award },
                { step: 4, label: "MBA Goals", icon: Target },
              ].map((s) => (
                <div key={s.step} className={`flex items-center gap-4 ${wizardStep >= s.step ? 'opacity-100' : 'opacity-50'}`}>
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm border-2 ${wizardStep >= s.step ? 'bg-white text-[#4F46E5] border-white' : 'border-white/30 text-white'}`}>
                    <s.icon className="h-4 w-4" />
                  </div>
                  <span className="font-medium text-lg">{s.label}</span>
                </div>
              ))}
            </div>

            <div className="relative z-10 mt-auto pt-8">
              <div className="bg-white/10 rounded-xl p-4 border border-white/20 backdrop-blur-md">
                <p className="text-xs text-white/80 font-medium leading-relaxed">Your data is secured and only used for your personal admission analysis.</p>
              </div>
            </div>
          </div>

          {/* Right Panel - Form Content */}
          <div className="flex-1 flex flex-col h-full bg-transparent overflow-hidden relative">
            <div className="flex-1 overflow-y-auto p-6 md:p-10 lg:p-14 custom-scrollbar">
              
              <div className="lg:hidden text-center space-y-2 mb-8 mt-4">
                <h2 className="text-2xl font-semibold tracking-tight text-[#111827] dark:text-white">Profile Evaluation</h2>
                <p className="text-[#6B7280] text-sm">Update your details to generate an accurate analysis.</p>
              </div>

              <div className="w-full space-y-12">
                
                {/* STEP 1: ACADEMICS */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 border-b border-black/5 dark:border-white/5 pb-3">
                    <div className="lg:hidden h-8 w-8 rounded-full bg-[#2563EB] text-white flex items-center justify-center font-bold text-xs">1</div>
                    <h3 className="text-xl font-semibold text-[#111827] dark:text-white flex items-center gap-2"><GraduationCap className="h-6 w-6 text-[#2563EB] lg:hidden" /> Academics</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
                    <div className="space-y-2">
                      <Label className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">10th Percentage</Label>
                      <Input placeholder="e.g. 92.5" className={glassInputClass} />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">12th Percentage</Label>
                      <Input placeholder="e.g. 90.0" className={glassInputClass} />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">Graduation Score</Label>
                      <Input placeholder="e.g. 8.5 CGPA" className={glassInputClass} />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">Graduation Stream</Label>
                      <Input placeholder="e.g. Engineering" className={glassInputClass} />
                    </div>
                  </div>
                </div>

                {/* STEP 2: WORK EXPERIENCE */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 border-b border-black/5 dark:border-white/5 pb-3">
                    <div className="lg:hidden h-8 w-8 rounded-full bg-[#2563EB] text-white flex items-center justify-center font-bold text-xs">2</div>
                    <h3 className="text-xl font-semibold text-[#111827] dark:text-white flex items-center gap-2"><Briefcase className="h-6 w-6 text-[#2563EB] lg:hidden" /> Work Experience</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-5">
                    <div className="space-y-2">
                      <Label className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">Status</Label>
                      <select className={`w-full px-3 py-2 ${glassInputClass}`}>
                        <option>Experienced</option>
                        <option>Fresher</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">Experience Months</Label>
                      <Input placeholder="e.g. 24" className={glassInputClass} />
                    </div>
                    <div className="space-y-2 md:col-span-1 xl:col-span-2">
                      <Label className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">Current Role</Label>
                      <Input placeholder="e.g. Data Analyst" className={glassInputClass} />
                    </div>
                  </div>
                </div>

                {/* STEP 3: ACHIEVEMENTS */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 border-b border-black/5 dark:border-white/5 pb-3">
                    <div className="lg:hidden h-8 w-8 rounded-full bg-[#2563EB] text-white flex items-center justify-center font-bold text-xs">3</div>
                    <h3 className="text-xl font-semibold text-[#111827] dark:text-white flex items-center gap-2"><Award className="h-6 w-6 text-[#2563EB] lg:hidden" /> Achievements</h3>
                  </div>
                  <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
                    <div className="space-y-2">
                      <Label className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">Certifications</Label>
                      <Input placeholder="e.g. CFA L1, AWS Solutions" className={glassInputClass} />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">Leadership Activities</Label>
                      <Input placeholder="e.g. College Fest Head" className={glassInputClass} />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">Competitions</Label>
                      <Input placeholder="e.g. Hackathon Winner" className={glassInputClass} />
                    </div>
                  </div>
                </div>

                {/* STEP 4: GOALS */}
                <div className="space-y-6 pb-4">
                  <div className="flex items-center gap-3 border-b border-black/5 dark:border-white/5 pb-3">
                    <div className="lg:hidden h-8 w-8 rounded-full bg-[#2563EB] text-white flex items-center justify-center font-bold text-xs">4</div>
                    <h3 className="text-xl font-semibold text-[#111827] dark:text-white flex items-center gap-2"><Target className="h-6 w-6 text-[#2563EB] lg:hidden" /> MBA Goals</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-5">
                    <div className="space-y-2">
                      <Label className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">Target Exam</Label>
                      <select className={`w-full px-3 py-2 ${glassInputClass}`}>
                        <option>CAT</option>
                        <option>XAT</option>
                        <option>SNAP</option>
                        <option>NMAT</option>
                        <option>CMAT</option>
                        <option>GMAT</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">Target Percentile</Label>
                      <Input placeholder="e.g. 99.5" className={glassInputClass} />
                    </div>
                    <div className="space-y-2 md:col-span-1 xl:col-span-2">
                      <Label className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">Target Colleges</Label>
                      <Input placeholder="e.g. IIM Ahmedabad" className={glassInputClass} />
                    </div>
                  </div>
                </div>

              </div>
              
            </div>

            {/* Sticky Footer Actions */}
            <div className="shrink-0 p-6 md:px-10 lg:px-14 bg-white/80 dark:bg-[#0A0A0A]/80 backdrop-blur-xl border-t border-black/5 dark:border-white/5 flex justify-end gap-4 z-10 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
              <Button 
                variant="ghost"
                onClick={() => setIsWizardOpen(false)}
                className="text-[#6B7280] hover:text-[#111827] dark:hover:text-white h-12 px-6 rounded-xl font-medium"
              >
                Cancel
              </Button>
              <Button 
                onClick={() => {
                  setIsWizardOpen(false);
                  router.push(`/profile-evaluator/report/v5`);
                }}
                className="bg-gradient-to-r from-[#2563EB] to-[#4F46E5] hover:opacity-90 text-white rounded-xl h-12 px-8 font-medium shadow-lg shadow-[#2563EB]/20 transition-all active:scale-95"
              >
                <Bot className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
