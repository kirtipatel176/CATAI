"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, Variants } from "framer-motion";
import { 
  ArrowLeft,
  Download,
  Award,
  GraduationCap,
  Briefcase,
  TrendingUp,
  Target,
  AlertTriangle,
  Map,
  Bot,
  CheckCircle2,
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
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

const glassCardClass = "bg-white/80 dark:bg-[#111827]/80 backdrop-blur-2xl rounded-[24px] border border-black/5 dark:border-white/5 shadow-[0_8px_30px_rgba(0,0,0,0.04)]";

export default function ReportViewPage() {
  const router = useRouter();
  const params = useParams();
  const reportId = params.id as string;

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDownload = () => {
    toast.success("Downloading Professional PDF Report...");
  };

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen w-full pb-32 bg-[#F6F8FC] dark:bg-[#0A0A0A] selection:bg-[#4F46E5]/30">
      {/* AMBIENT LAYERED GRADIENT BACKGROUND */}
      <div className="fixed inset-0 z-[-1] liquid-bg overflow-hidden pointer-events-none"></div>

      {/* Sticky Header Actions */}
      <div className="sticky top-0 z-50 w-full bg-[#F6F8FC]/80 dark:bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-black/5 dark:border-white/5 shadow-sm">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Button variant="ghost" onClick={() => router.push('/profile-evaluator')} className="text-[#6B7280] hover:text-[#111827] dark:hover:text-white rounded-full font-medium">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Reports
          </Button>
          <Button onClick={handleDownload} className="bg-[#4F46E5] hover:bg-[#4338CA] text-white rounded-full h-9 px-5 text-sm font-semibold shadow-md shadow-[#4F46E5]/20">
            <Download className="h-4 w-4 mr-2" /> Download PDF
          </Button>
        </div>
      </div>

      <motion.div 
        className="pt-10 max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* PAGE 1: COVER PAGE */}
        <motion.section variants={itemVariants} className="relative w-full rounded-[32px] overflow-hidden shadow-2xl border border-black/5 dark:border-white/5 bg-gradient-to-br from-[#2563EB] via-[#4F46E5] to-[#7C3AED] min-h-[500px] flex items-center justify-center p-12 text-center text-white">
          <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-20 mix-blend-overlay z-0"></div>
          <div className="relative z-10 flex flex-col items-center max-w-2xl mx-auto">
            <div className="h-20 w-20 rounded-3xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-8 border border-white/20 shadow-xl">
              <FileText className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">Profile Intelligence Report</h1>
            <p className="text-xl md:text-2xl text-white/80 font-medium mb-12">Evaluation {reportId.toUpperCase()}</p>
            
            <div className="w-full h-px bg-white/20 mb-12"></div>
            
            <div className="grid grid-cols-3 gap-8 w-full text-left">
              <div>
                <p className="text-xs text-white/60 uppercase tracking-widest font-semibold mb-1">Student</p>
                <p className="font-semibold text-lg">Kirti Patel</p>
              </div>
              <div>
                <p className="text-xs text-white/60 uppercase tracking-widest font-semibold mb-1">Generated</p>
                <p className="font-semibold text-lg">15 June 2026</p>
              </div>
              <div>
                <p className="text-xs text-white/60 uppercase tracking-widest font-semibold mb-1">Overall Score</p>
                <p className="font-bold text-2xl text-[#4ADE80]">82 / 100</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* PAGE 2: PROFILE SUMMARY */}
        <motion.section variants={itemVariants} className="space-y-6">
          <div className="flex items-center gap-3 border-b border-black/5 dark:border-white/5 pb-4">
            <div className="h-10 w-10 rounded-xl bg-[#2563EB]/10 flex items-center justify-center text-[#2563EB]">
              <Bot className="h-5 w-5" />
            </div>
            <h2 className="text-2xl font-bold text-[#111827] dark:text-white tracking-tight">Profile Summary</h2>
          </div>
          <div className={`${glassCardClass} p-8`}>
            <p className="text-base text-[#4B5563] dark:text-[#9CA3AF] leading-relaxed">
              Your profile is highly competitive for top-tier Indian B-schools. You possess a strong academic foundation and the optimal amount of work experience (24 months). To convert a 99+ percentile into an admission offer at IIM Ahmedabad, Bangalore, or Calcutta, you will need to build distinct "spikes" through certifications or leadership initiatives to offset the lack of academic diversity.
            </p>
          </div>
        </motion.section>

        {/* PAGE 3: ACADEMIC ANALYSIS */}
        <motion.section variants={itemVariants} className="space-y-6">
          <div className="flex items-center gap-3 border-b border-black/5 dark:border-white/5 pb-4">
            <div className="h-10 w-10 rounded-xl bg-[#7C3AED]/10 flex items-center justify-center text-[#7C3AED]">
              <GraduationCap className="h-5 w-5" />
            </div>
            <h2 className="text-2xl font-bold text-[#111827] dark:text-white tracking-tight">Academic Analysis</h2>
          </div>
          <div className={`${glassCardClass} p-8 space-y-6`}>
            <div className="grid grid-cols-3 gap-6">
              <div className="glass-metric-card flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-[10px] bg-gradient-to-br from-rose-500/20 to-amber-500/14 flex items-center justify-center">
                    <GraduationCap className="h-4 w-4 text-rose-600" />
                  </div>
                  <span className="trend-badge-neutral">Top 15%</span>
                </div>
                <div>
                  <p className="text-xs text-[#6B7280] font-semibold uppercase tracking-wider mb-1 mt-2">10th Score</p>
                  <p className="text-[22px] font-medium text-gradient-rose-amber">92.5%</p>
                </div>
              </div>
              
              <div className="glass-metric-card flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-[10px] bg-gradient-to-br from-violet-600/20 to-rose-500/14 flex items-center justify-center">
                    <Award className="h-4 w-4 text-violet-600" />
                  </div>
                  <span className="trend-badge-down">Slight Drop</span>
                </div>
                <div>
                  <p className="text-xs text-[#6B7280] font-semibold uppercase tracking-wider mb-1 mt-2">12th Score</p>
                  <p className="text-[22px] font-medium text-gradient-violet-rose">90.0%</p>
                </div>
              </div>

              <div className="glass-metric-card flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-[10px] bg-gradient-to-br from-emerald-600/20 to-teal-500/14 flex items-center justify-center">
                    <GraduationCap className="h-4 w-4 text-emerald-600" />
                  </div>
                  <span className="trend-badge-up">Strong</span>
                </div>
                <div>
                  <p className="text-xs text-[#6B7280] font-semibold uppercase tracking-wider mb-1 mt-2">Graduation</p>
                  <p className="text-[22px] font-medium text-gradient-emerald-teal">8.5 CGPA</p>
                </div>
              </div>
            </div>
            <p className="text-base text-[#4B5563] dark:text-[#9CA3AF] leading-relaxed">
              Scoring 92% in 10th and 90% in 12th places you in the top bracket for composite score calculations. Your graduation score is solid. As an engineering graduate, you miss out on academic diversity points, meaning your CAT percentile needs to be incrementally higher than non-engineers to secure the same interview calls.
            </p>
          </div>
        </motion.section>

        {/* PAGE 4: WORK EXPERIENCE ANALYSIS */}
        <motion.section variants={itemVariants} className="space-y-6">
          <div className="flex items-center gap-3 border-b border-black/5 dark:border-white/5 pb-4">
            <div className="h-10 w-10 rounded-xl bg-[#22C55E]/10 flex items-center justify-center text-[#22C55E]">
              <Briefcase className="h-5 w-5" />
            </div>
            <h2 className="text-2xl font-bold text-[#111827] dark:text-white tracking-tight">Work Experience Analysis</h2>
          </div>
          <div className={`${glassCardClass} p-8 space-y-6`}>
            <div className="flex items-center gap-4 mb-2">
              <div className="px-4 py-2 bg-[#22C55E]/10 text-[#22C55E] rounded-xl font-bold text-sm uppercase tracking-wider">Optimal Duration</div>
              <span className="font-semibold text-[#111827] dark:text-white">24 Months</span>
            </div>
            <p className="text-base text-[#4B5563] dark:text-[#9CA3AF] leading-relaxed">
              Sitting at exactly 24 months of experience in a Data Analytics role is optimal. This secures maximum points for work experience at almost all top-tier colleges. Your current role also indicates strong quantitative and analytical skills, which interview panels heavily favor.
            </p>
          </div>
        </motion.section>

        {/* PAGE 5: ACHIEVEMENTS ANALYSIS */}
        <motion.section variants={itemVariants} className="space-y-6">
          <div className="flex items-center gap-3 border-b border-black/5 dark:border-white/5 pb-4">
            <div className="h-10 w-10 rounded-xl bg-[#F59E0B]/10 flex items-center justify-center text-[#F59E0B]">
              <Award className="h-5 w-5" />
            </div>
            <h2 className="text-2xl font-bold text-[#111827] dark:text-white tracking-tight">Achievements Analysis</h2>
          </div>
          <div className={`${glassCardClass} p-8 space-y-4`}>
             <p className="text-base text-[#4B5563] dark:text-[#9CA3AF] leading-relaxed">
              Your profile currently lacks significant national-level recognition or tier-1 certifications. While your academic and professional foundations are strong, high-end achievements are often the deciding factor in tie-breaker scenarios during the final admission rounds.
            </p>
            <div className="flex items-center gap-3 text-[#F59E0B] font-semibold text-sm mt-4 p-4 bg-[#F59E0B]/10 rounded-xl">
              <AlertTriangle className="h-5 w-5" /> Area requiring immediate development
            </div>
          </div>
        </motion.section>

        {/* EXAM READINESS */}
        <motion.section variants={itemVariants} className="space-y-6">
          <div className="flex items-center gap-3 border-b border-black/5 dark:border-white/5 pb-4">
            <div className="h-10 w-10 rounded-xl bg-[#EC4899]/10 flex items-center justify-center text-[#EC4899]">
              <TrendingUp className="h-5 w-5" />
            </div>
            <h2 className="text-2xl font-bold text-[#111827] dark:text-white tracking-tight">Exam Readiness</h2>
          </div>
          <div className="glass-chart-card p-8 flex flex-col gap-8">
            <div className="flex items-center justify-between">
              <div className="space-y-2 z-10 relative">
                 <h3 className="text-lg font-semibold text-[#111827] dark:text-white">Current Trajectory</h3>
                 <p className="text-sm text-[#6B7280]">Based on recent mock evaluations</p>
              </div>
              <div className="text-right z-10 relative">
                <div className="text-[32px] font-medium text-gradient-violet-rose tracking-tight">97.5<span className="text-xl text-[#6B7280] font-medium ml-1">%ile</span></div>
                <div className="trend-badge-up inline-block mt-1">On Track</div>
              </div>
            </div>
            
            <div className="space-y-5 z-10 relative">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-[#6B7280]">
                  <span>Quantitative Ability (QA)</span>
                  <span className="text-[#111827] dark:text-white">99.1%</span>
                </div>
                <div className="h-[5px] w-full bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full rounded-full progress-bar-qa" style={{ width: '99.1%' }}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-[#6B7280]">
                  <span>Verbal Ability (VA)</span>
                  <span className="text-[#111827] dark:text-white">94.2%</span>
                </div>
                <div className="h-[5px] w-full bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full rounded-full progress-bar-va" style={{ width: '94.2%' }}></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-[#6B7280]">
                  <span>Data Interpretation (DI)</span>
                  <span className="text-[#111827] dark:text-white">96.8%</span>
                </div>
                <div className="h-[5px] w-full bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full rounded-full progress-bar-di" style={{ width: '96.8%' }}></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-[#6B7280]">
                  <span>Logical Reasoning (LR)</span>
                  <span className="text-[#111827] dark:text-white">98.5%</span>
                </div>
                <div className="h-[5px] w-full bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full rounded-full progress-bar-lr" style={{ width: '98.5%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* PAGE 6: COLLEGE SUITABILITY */}
        <motion.section variants={itemVariants} className="space-y-6">
          <div className="flex items-center gap-3 border-b border-black/5 dark:border-white/5 pb-4">
            <div className="h-10 w-10 rounded-xl bg-[#4F46E5]/10 flex items-center justify-center text-[#4F46E5]">
              <Target className="h-5 w-5" />
            </div>
            <h2 className="text-2xl font-bold text-[#111827] dark:text-white tracking-tight">College Suitability</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className={`${glassCardClass} p-6 border-t-4 border-[#2563EB]`}>
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#2563EB] mb-4">Dream</h3>
              <ul className="space-y-3">
                <li className="font-semibold text-[#111827] dark:text-white">IIM Ahmedabad</li>
                <li className="font-semibold text-[#111827] dark:text-white">IIM Bangalore</li>
                <li className="font-semibold text-[#111827] dark:text-white">IIM Calcutta</li>
              </ul>
            </div>
            <div className={`${glassCardClass} p-6 border-t-4 border-[#7C3AED]`}>
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#7C3AED] mb-4">Target</h3>
              <ul className="space-y-3">
                <li className="font-semibold text-[#111827] dark:text-white">SPJIMR</li>
                <li className="font-semibold text-[#111827] dark:text-white">MDI Gurgaon</li>
                <li className="font-semibold text-[#111827] dark:text-white">IIM Kozhikode</li>
              </ul>
            </div>
            <div className={`${glassCardClass} p-6 border-t-4 border-[#1D9E75]`}>
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#1D9E75] mb-4">Safe</h3>
              <ul className="space-y-3">
                <li className="font-semibold text-[#111827] dark:text-white">IMI Delhi</li>
                <li className="font-semibold text-[#111827] dark:text-white">TAPMI</li>
                <li className="font-semibold text-[#111827] dark:text-white">FORE</li>
              </ul>
            </div>
          </div>
        </motion.section>

        {/* GAP ANALYSIS & IMPROVEMENT ROADMAP (COMBINED FOR FLOW) */}
        <motion.section variants={itemVariants} className="space-y-6">
          <div className="flex items-center gap-3 border-b border-black/5 dark:border-white/5 pb-4">
            <div className="h-10 w-10 rounded-xl bg-[#EF4444]/10 flex items-center justify-center text-[#EF4444]">
              <Map className="h-5 w-5" />
            </div>
            <h2 className="text-2xl font-bold text-[#111827] dark:text-white tracking-tight">Gap Analysis & Roadmap</h2>
          </div>
          <div className={`${glassCardClass} p-8 space-y-8`}>
            <div>
              <h3 className="text-lg font-bold text-[#111827] dark:text-white mb-3">Identified Gaps</h3>
              <p className="text-base text-[#4B5563] dark:text-[#9CA3AF] leading-relaxed">
                The primary gap in your profile is "spikes"—standout achievements outside of regular academics and work. Without state/national level sports, debate, or major extracurricular leadership, your interview will heavily depend on your technical knowledge and CAT percentile.
              </p>
            </div>
            <div className="w-full h-px bg-black/5 dark:bg-white/5"></div>
            <div>
              <h3 className="text-lg font-bold text-[#111827] dark:text-white mb-4">Improvement Roadmap</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-[#2563EB]/10 flex items-center justify-center shrink-0 mt-0.5"><span className="text-[#2563EB] text-xs font-bold">1</span></div>
                  <div>
                    <h4 className="font-semibold text-[#111827] dark:text-white">Acquire Professional Certifications</h4>
                    <p className="text-sm text-[#6B7280] mt-1">Target CFA L1 or Advanced Data Science certifications by September.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-[#2563EB]/10 flex items-center justify-center shrink-0 mt-0.5"><span className="text-[#2563EB] text-xs font-bold">2</span></div>
                  <div>
                    <h4 className="font-semibold text-[#111827] dark:text-white">Seek Leadership Opportunities</h4>
                    <p className="text-sm text-[#6B7280] mt-1">Take up a cross-functional leadership initiative at your current job.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-[#2563EB]/10 flex items-center justify-center shrink-0 mt-0.5"><span className="text-[#2563EB] text-xs font-bold">3</span></div>
                  <div>
                    <h4 className="font-semibold text-[#111827] dark:text-white">Boost Mock Percentile</h4>
                    <p className="text-sm text-[#6B7280] mt-1">Focus intensely on VARC to push overall trajectory past 99.5%.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </motion.section>

        {/* PAGE 8: AI RECOMMENDATIONS */}
        <motion.section variants={itemVariants} className="space-y-6">
          <div className="flex items-center gap-3 border-b border-black/5 dark:border-white/5 pb-4">
            <div className="h-10 w-10 rounded-xl bg-[#0EA5E9]/10 flex items-center justify-center text-[#0EA5E9]">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <h2 className="text-2xl font-bold text-[#111827] dark:text-white tracking-tight">AI Recommendations</h2>
          </div>
          <div className={`${glassCardClass} p-8 bg-gradient-to-br from-white to-[#F0F9FF] dark:from-[#111827] dark:to-[#082F49]/20`}>
             <ul className="space-y-4 text-base text-[#4B5563] dark:text-[#9CA3AF] leading-relaxed list-disc pl-5 font-medium">
                <li>Aim for a <strong className="text-[#111827] dark:text-white">99.5+ percentile</strong> to completely offset the lack of academic diversity and secure calls from all BLACKI IIMs.</li>
                <li>Your Work Experience (24 months) is currently at its absolute peak value. Do not resign from your job until admissions are finalized.</li>
                <li>Begin documenting high-impact projects at work utilizing the STAR method (Situation, Task, Action, Result) in preparation for PI rounds.</li>
              </ul>
          </div>
        </motion.section>

      </motion.div>
    </div>
  );
}
