"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, Variants } from "framer-motion";
import {
  ArrowLeft, Download, Award, GraduationCap, Target,
  AlertTriangle, Bot, CheckCircle2, FileText, Zap, ShieldAlert, Navigation,
  Info, Star, Users, BarChart3, TrendingUp, BookOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { BachProfileReport } from "@/lib/bach-profile-engine";

// ─── Motion Variants ──────────────────────────────────────────────────────────
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } }
};

const card = "bg-white dark:bg-[#111827] rounded-[24px] border border-black/5 dark:border-white/5 shadow-sm";
const sectionHeader = "flex items-center gap-3 border-b border-black/5 dark:border-white/5 pb-4 mb-6";

// ─── Score pill ────────────────────────────────────────────────────────────────
function ScorePill({ score, max = 100 }: { score: number; max?: number }) {
  const pct = Math.round((score / max) * 100);
  const color = pct >= 80 ? "bg-emerald-500" : pct >= 60 ? "bg-amber-500" : "bg-red-400";
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-2 bg-black/5 dark:bg-white/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className={`h-full rounded-full ${color}`}
        />
      </div>
      <span className="text-sm font-bold text-[#111827] dark:text-white w-10 text-right">{score}</span>
    </div>
  );
}

export default function BachReportViewPage() {
  const router = useRouter();
  const params = useParams();
  const reportId = params.id as string;
  const reportRef = useRef<HTMLDivElement>(null);

  const [mounted, setMounted] = useState(false);
  const [report, setReport] = useState<BachProfileReport | null>(null);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem(`bach_profile_report_${reportId}`);
    if (saved) {
      try { setReport(JSON.parse(saved)); } catch { /* ignore */ }
    }
  }, [reportId]);

  const handleDownload = async () => {
    if (!reportRef.current) return;
    toast.loading("Generating PDF…");
    const html2pdf = (await import("html2pdf.js")).default;
    html2pdf()
      .set({
        margin: 0.5,
        filename: `Bachelor_Profile_Report_${reportId}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
      })
      .from(reportRef.current)
      .save()
      .then(() => { toast.dismiss(); toast.success("PDF downloaded"); });
  };

  if (!mounted) return null;
  if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F6F8FC] dark:bg-[#0A0A0A]">
        <div className="text-center space-y-4">
          <FileText className="h-16 w-16 text-[#6B7280] mx-auto" />
          <h2 className="text-xl font-bold text-[#111827] dark:text-white">Report not found</h2>
          <p className="text-[#6B7280]">This report may have been cleared from local storage.</p>
          <Button onClick={() => router.push("/profile-evaluator")} className="rounded-full bg-[#4F46E5] text-white">
            Start New Assessment
          </Button>
        </div>
      </div>
    );
  }

  const showColleges = report.collegeIntelligence.dream.length > 0 || 
                       report.collegeIntelligence.target.length > 0 || 
                       report.collegeIntelligence.safe.length > 0;

  return (
    <div className="min-h-screen w-full pb-32 bg-[#F6F8FC] dark:bg-[#0A0A0A]">
      {/* ── Sticky nav ── */}
      <div className="sticky top-0 z-50 w-full bg-[#F6F8FC]/90 dark:bg-[#0A0A0A]/90 backdrop-blur-xl border-b border-black/5 dark:border-white/5">
        <div className="max-w-[920px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Button variant="ghost" onClick={() => router.push("/profile-evaluator")}
            className="text-[#6B7280] hover:text-[#111827] dark:hover:text-white rounded-full font-medium gap-2">
            <ArrowLeft className="h-4 w-4" /> Dashboard
          </Button>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 text-[#6B7280]">
              Pursuing Bachelor's Flow
            </span>
            <Button onClick={handleDownload}
              className="bg-[#4F46E5] hover:bg-[#4338CA] text-white rounded-full h-9 px-5 text-sm font-semibold gap-2">
              <Download className="h-4 w-4" /> PDF
            </Button>
          </div>
        </div>
      </div>

      {/* ── Report Body ── */}
      <div ref={reportRef} className="pt-10 max-w-[920px] mx-auto px-4 sm:px-6 space-y-12">
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-12">

          {/* ══ SECTION 1: COVER BANNER ══ */}
          <motion.section variants={itemVariants}>
            <div className="relative w-full rounded-[32px] overflow-hidden bg-gradient-to-br from-[#2563EB] via-[#4F46E5] to-[#7C3AED] p-10 md:p-14 text-white shadow-2xl">
              <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(ellipse_at_top_right,_#fff_0%,_transparent_60%)]" />
              <div className="relative z-10">
                <div className="flex flex-col md:flex-row gap-8 justify-between">
                  <div>
                    <p className="text-white/60 text-sm font-semibold uppercase tracking-widest mb-2">
                      MBA Profile Intelligence
                    </p>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3">
                      {report.mbaReadiness.category}
                    </h1>
                    <p className="text-white/75 text-base max-w-lg">Bachelor's Readiness & MBA Pathway Assessment</p>
                  </div>
                  <div className="shrink-0 flex flex-col items-end justify-center gap-1">
                    <p className="text-white/60 text-xs uppercase tracking-widest">MBA Readiness Score</p>
                    <p className="text-7xl font-black leading-none">{report.mbaReadiness.score}</p>
                    <p className="text-white/50 text-sm">out of 100</p>
                  </div>
                </div>

                <div className="mt-10 pt-8 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-6">
                  <div>
                    <p className="text-white/50 text-xs uppercase tracking-widest mb-1">Target MBA Exam</p>
                    <p className="font-semibold">{report.finalAnswers.q8.split(" ")[0] === "Target" ? "CAT / XAT" : "CAT"}</p>
                  </div>
                  <div>
                    <p className="text-white/50 text-xs uppercase tracking-widest mb-1">Academics</p>
                    <p className="font-semibold">{report.academicStrength.score} / 100</p>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <p className="text-white/50 text-xs uppercase tracking-widest mb-1">Academic Category</p>
                    <p className="font-semibold truncate" title={report.academicStrength.result}>{report.academicStrength.result}</p>
                  </div>
                  <div>
                    <p className="text-white/50 text-xs uppercase tracking-widest mb-1">Generated</p>
                    <p className="font-semibold">{new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* ══ SECTION 2: ACADEMIC & READINESS SCORE ══ */}
          <motion.section variants={itemVariants}>
            <div className={sectionHeader}>
              <div className="h-10 w-10 rounded-xl bg-[#7C3AED]/10 flex items-center justify-center text-[#7C3AED]">
                <BarChart3 className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold text-[#111827] dark:text-white">Academic Strength & Readiness</h2>
            </div>
            <div className={`${card} p-8 space-y-6`}>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-[#7C3AED]" />
                    <span className="font-semibold text-[#111827] dark:text-white text-sm">Academic Strength</span>
                  </div>
                  <span className="text-xs text-[#6B7280]">{report.academicStrength.details}</span>
                </div>
                <ScorePill score={report.academicStrength.score} />
                <p className="text-sm font-semibold text-[#4B5563] mt-2">Result: {report.academicStrength.result}</p>
              </div>

              <div className="pt-4 border-t border-black/5 dark:border-white/5">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-[#111827] dark:text-white">Overall MBA Readiness</span>
                  <span className="text-2xl font-black text-[#4F46E5]">{report.mbaReadiness.score}</span>
                </div>
                <ScorePill score={report.mbaReadiness.score} />
              </div>
            </div>
          </motion.section>

          {/* ══ SECTION 3: COLLEGE INTELLIGENCE & PERCENTILE ANALYSIS ══ */}
          {showColleges && (
            <motion.section variants={itemVariants}>
              <div className={sectionHeader}>
                <div className="h-10 w-10 rounded-xl bg-[#4F46E5]/10 flex items-center justify-center text-[#4F46E5]">
                  <Target className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#111827] dark:text-white">College Intelligence</h2>
                  <p className="text-xs text-[#6B7280] mt-0.5">Required Percentile Analysis</p>
                </div>
              </div>

              <div className="space-y-6">
                {(["dream", "target", "safe"] as const).map((tier) => {
                  const colleges = report.collegeIntelligence[tier];
                  if (colleges.length === 0) return null;
                  const config = {
                    dream:  { label: "Dream Colleges",  border: "border-[#2563EB]", color: "text-[#2563EB]",  desc: "Highly competitive, stretch goals" },
                    target: { label: "Target Colleges", border: "border-[#7C3AED]", color: "text-[#7C3AED]",  desc: "Realistic with strong preparation" },
                    safe:   { label: "Safe Colleges",   border: "border-[#22C55E]", color: "text-[#22C55E]",  desc: "High probability match colleges" },
                  }[tier];
                  return (
                    <div key={tier} className={`${card} p-6 border-l-4 ${config.border}`}>
                      <div className="mb-4">
                        <h3 className={`text-base font-bold uppercase tracking-wider ${config.color}`}>{config.label}</h3>
                        <p className="text-xs text-[#6B7280] mt-0.5">{config.desc}</p>
                      </div>
                      <div className="space-y-3">
                        {colleges.map((c, i) => (
                          <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-black/[0.025] dark:bg-white/[0.025] rounded-xl border border-black/5 dark:border-white/5 gap-3">
                            <div className="flex-1">
                              <p className="font-bold text-[#111827] dark:text-white">{c.name}</p>
                              <p className="text-xs text-[#6B7280] mt-0.5">Required: {c.required}+ %ile</p>
                            </div>
                            <div className="flex items-center gap-6 shrink-0">
                              <div className="text-right hidden sm:block">
                                <p className="text-xs text-[#6B7280]">Current Readiness</p>
                                <p className="font-semibold text-sm text-[#111827] dark:text-white">{c.currentReadiness}</p>
                              </div>
                              <div className="text-right min-w-[70px]">
                                <p className="text-xs text-[#6B7280]">Gap</p>
                                <p className={`font-bold text-sm ${c.gap === 0 ? "text-emerald-500" : "text-red-500"}`}>
                                  {c.gap === 0 ? "On Track" : `${c.gap} pts`}
                                </p>
                              </div>
                              <div className="text-right min-w-[70px]">
                                <p className="text-xs text-[#6B7280]">Probability</p>
                                <p className={`font-black text-lg ${config.color}`}>{c.admissionProbability}%</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.section>
          )}

          {/* ══ SECTION 4: WEAKNESS ANALYSIS ══ */}
          <motion.section variants={itemVariants}>
            <div className={sectionHeader}>
              <div className="h-10 w-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold text-[#111827] dark:text-white">Weakness Analysis</h2>
            </div>
            <div className={`${card} p-8`}>
              {report.weaknesses.length === 0 ? (
                <div className="flex items-center gap-3 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="h-5 w-5" />
                  <p className="font-semibold">No significant weaknesses detected based on provided data.</p>
                </div>
              ) : (
                <ul className="space-y-4">
                  {report.weaknesses.map((w, i) => (
                    <li key={i} className="flex items-start gap-3 rounded-2xl border border-black/5 dark:border-white/5 bg-black/[0.025] dark:bg-white/[0.025] p-5">
                      <ShieldAlert className="h-5 w-5 shrink-0 text-red-500 mt-0.5" />
                      <p className="font-bold text-[#111827] dark:text-white leading-relaxed">{w}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.section>

          {/* ══ SECTION 5: IMPROVEMENT SIMULATOR ══ */}
          <motion.section variants={itemVariants}>
            <div className={sectionHeader}>
              <div className="h-10 w-10 rounded-xl bg-[#8B5CF6]/10 flex items-center justify-center text-[#8B5CF6]">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#111827] dark:text-white">Improvement Simulator</h2>
                <p className="text-xs text-[#6B7280] mt-0.5">See how profile building actions impact your readiness</p>
              </div>
            </div>
            <div className={`${card} p-8 space-y-4`}>
              <div className="flex justify-between items-center pb-4 border-b border-black/5 dark:border-white/10">
                <span className="font-semibold text-[#111827] dark:text-white">Current Readiness</span>
                <span className="text-2xl font-black text-[#6B7280]">{report.improvementSimulator.current}</span>
              </div>
              {report.improvementSimulator.afterInternship !== undefined && (
                <div className="flex items-center justify-between p-4 rounded-xl bg-black/[0.025] border border-black/5">
                  <p className="font-semibold text-sm">After completing an Internship</p>
                  <p className="text-lg font-black text-[#4F46E5]">{report.improvementSimulator.afterInternship}</p>
                </div>
              )}
              {report.improvementSimulator.afterLeadership !== undefined && (
                <div className="flex items-center justify-between p-4 rounded-xl bg-black/[0.025] border border-black/5">
                  <p className="font-semibold text-sm">After gaining Leadership Experience</p>
                  <p className="text-lg font-black text-[#4F46E5]">{report.improvementSimulator.afterLeadership}</p>
                </div>
              )}
              {report.improvementSimulator.afterMockImprovement !== undefined && (
                <div className="flex items-center justify-between p-4 rounded-xl bg-black/[0.025] border border-black/5">
                  <p className="font-semibold text-sm">After Mock Percentile Improvement</p>
                  <p className="text-lg font-black text-[#4F46E5]">{report.improvementSimulator.afterMockImprovement}</p>
                </div>
              )}
            </div>
          </motion.section>

          {/* ══ SECTION 6: PERSONALIZED ROADMAP ══ */}
          <motion.section variants={itemVariants}>
            <div className={sectionHeader}>
              <div className="h-10 w-10 rounded-xl bg-[#14B8A6]/10 flex items-center justify-center text-[#14B8A6]">
                <Navigation className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold text-[#111827] dark:text-white">Personalized Roadmap</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {[
                { key: "shortTerm"  as const, label: "Short-Term",  period: "0–3 Months",  border: "border-t-[#F59E0B]", color: "text-[#F59E0B]", dotColor: "bg-[#F59E0B]" },
                { key: "mediumTerm" as const, label: "Medium-Term", period: "3–6 Months",  border: "border-t-[#3B82F6]", color: "text-[#3B82F6]", dotColor: "bg-[#3B82F6]" },
                { key: "longTerm"   as const, label: "Long-Term",   period: "6–12+ Months", border: "border-t-[#10B981]", color: "text-[#10B981]", dotColor: "bg-[#10B981]" },
              ].map(({ key, label, period, border, color, dotColor }) => (
                <div key={key} className={`${card} p-6 border-t-4 ${border}`}>
                  <h3 className={`text-base font-bold ${color} mb-0.5`}>{label}</h3>
                  <p className="text-xs text-[#6B7280] mb-4">{period}</p>
                  <ul className="space-y-3">
                    {report.roadmap[key].map((item, i) => (
                      <li key={i} className="text-sm text-[#4B5563] dark:text-[#D1D5DB] flex items-start gap-2 leading-snug">
                        <div className={`h-1.5 w-1.5 rounded-full ${dotColor} mt-1.5 shrink-0`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.section>

          {/* ══ SECTION 7: FINAL ANSWERS ══ */}
          <motion.section variants={itemVariants} className="pb-20">
            <div className={sectionHeader}>
              <div className="h-10 w-10 rounded-xl bg-[#4F46E5]/10 flex items-center justify-center text-[#4F46E5]">
                <Bot className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold text-[#111827] dark:text-white">Final Questions Answered</h2>
            </div>
            <div className={`${card} p-8 bg-gradient-to-br from-[#4F46E5]/5 to-transparent`}>
              <div className="space-y-6">
                {[
                  { q: "1. How strong is my academic profile?", a: report.finalAnswers.q1 },
                  { q: "2. Which MBA colleges fit me?", a: report.finalAnswers.q2 },
                  { q: "3. Which colleges are Dream, Target, and Safe?", a: report.finalAnswers.q3 },
                  { q: "4. What percentile do I need?", a: report.finalAnswers.q4 },
                  { q: "5. What weaknesses are hurting my chances?", a: report.finalAnswers.q5 },
                  { q: "6. What should I improve first?", a: report.finalAnswers.q6 },
                  { q: "7. What happens if I improve my profile?", a: report.finalAnswers.q7 },
                  { q: "8. What is my MBA preparation roadmap?", a: report.finalAnswers.q8 }
                ].map((qa, i) => (
                  <div key={i} className="border-l-2 border-[#4F46E5] pl-4">
                    <p className="text-sm font-semibold text-[#111827] dark:text-white">{qa.q}</p>
                    <p className="text-sm text-[#4B5563] dark:text-[#9CA3AF] mt-1">{qa.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

        </motion.div>
      </div>
    </div>
  );
}
