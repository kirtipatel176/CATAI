"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, Variants } from "framer-motion";
import {
  ArrowLeft, Download, Award, GraduationCap, Briefcase, TrendingUp, Target,
  AlertTriangle, Bot, CheckCircle2, FileText, Zap, ShieldAlert, Navigation,
  Star, BookOpen, BarChart3, LineChart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import api from "@/lib/api";
type ProfileReport = any;
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

// ─── Severity badge ────────────────────────────────────────────────────────────
function SeverityBadge({ severity }: { severity: "High" | "Medium" | "Low" }) {
  const colors: Record<string, string> = {
    High:   "bg-red-50   text-red-500   dark:bg-red-500/10",
    Medium: "bg-amber-50 text-amber-500 dark:bg-amber-500/10",
    Low:    "bg-blue-50  text-blue-500  dark:bg-blue-500/10",
  };
  return (
    <span className={`px-3 py-1 text-xs font-bold rounded-full whitespace-nowrap ${colors[severity]}`}>
      {severity}
    </span>
  );
}

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

// ═══════════════════════════════════════════════════════════════════════════════
export default function ReportViewPage() {
  const router = useRouter();
  const params = useParams();
  const reportId = params.id as string;
  const reportRef = useRef<HTMLDivElement>(null);

  const [mounted, setMounted] = useState(false);
  const [report, setReport] = useState<ProfileReport | null>(null);

useEffect(() => {
  setMounted(true);

  const loadReport = async () => {
    try {
      const res = await api.get(
        `/profile-evaluator/${reportId}`
      );

      console.log(res.data);

      setReport(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  loadReport();
}, [reportId]);

  const handleDownload = async () => {
    if (!reportRef.current) return;
    toast.loading("Generating PDF…");
    const html2pdf = (await import("html2pdf.js")).default;
    html2pdf()
      .set({
        margin: 0.5,
        filename: `Profile_Report_${reportId}.pdf`,
        image: { type: "jpeg" as const, quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "in" as const, format: "a4" as const, orientation: "portrait" as const },
      })
      .from(reportRef.current)
      .save()
      .then(() => { toast.dismiss(); toast.success("PDF downloaded"); });
  };

  if (!mounted) return null;
  if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] dark:bg-[#0A0A0A]">
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

const allColleges = [
  ...(report.collegesuitability?.dream ?? []),
  ...(report.collegesuitability?.target ?? []),
  ...(report.collegesuitability?.safe ?? []),
];
  return (
    <div className="min-h-screen w-full pb-32 bg-[#F8FAFC] dark:bg-[#0A0A0A]">

      {/* ── Sticky nav ── */}
      <div className="sticky top-0 z-50 w-full bg-[#F8FAFC]/90 dark:bg-[#0A0A0A]/90 backdrop-blur-xl border-b border-black/5 dark:border-white/5">
        <div className="max-w-[920px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Button variant="ghost" onClick={() => router.push("/profile-evaluator")}
            className="text-[#6B7280] hover:text-[#111827] dark:hover:text-white rounded-full font-medium gap-2">
            <ArrowLeft className="h-4 w-4" /> Dashboard
          </Button>
          <div className="flex items-center gap-2">
            <Button onClick={handleDownload}
              className="bg-[#4F46E5] hover:bg-[#4338CA] text-white rounded-full h-9 px-5 text-sm font-semibold gap-2">
              <Download className="h-4 w-4" /> Download PDF
            </Button>
          </div>
        </div>
      </div>

      {/* ── Report Body ── */}
      <div ref={reportRef} className="pt-10 max-w-[920px] mx-auto px-4 sm:px-6 space-y-12">
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-12">

          {/* ══ SECTION 1: PROFILE STRENGTH ══ */}
          <motion.section variants={itemVariants}>
            <div className="relative w-full rounded-[32px] overflow-hidden bg-gradient-to-br from-[#2563EB] via-[#4F46E5] to-[#7C3AED] p-10 md:p-14 text-white shadow-2xl">
              <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(ellipse_at_top_right,_#fff_0%,_transparent_60%)]" />
              <div className="relative z-10">
                <div className="flex flex-col md:flex-row gap-8 justify-between">
                  <div>
                    <p className="text-white/60 text-sm font-semibold uppercase tracking-widest mb-2">
                      Profile Intelligence Report
                    </p>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3">
                      {report.profilesummary}
                    </h1>
                    <p className="text-white/75 text-base max-w-lg">Based on standard MBA admissions scoring criteria.</p>
                  </div>
                  <div className="shrink-0 flex flex-col items-end justify-center gap-1">
                    <p className="text-white/60 text-xs uppercase tracking-widest">Total Score</p>
                    <p className="text-7xl font-black leading-none">{report.overallscore}</p>
                    <p className="text-white/50 text-sm">out of 100</p>
                  </div>
                </div>

                <div className="mt-10 pt-8 border-t border-white/15 grid grid-cols-2 sm:grid-cols-5 gap-6">
                  <div>
                    <p className="text-white/50 text-xs uppercase tracking-widest mb-1">Academics</p>
<p className="font-semibold">
    {report.overallscore} / 100
</p>                  </div>
                  <div>
                    <p className="text-white/50 text-xs uppercase tracking-widest mb-1">Exam</p>
                    <p className="font-semibold">{0} / 25</p>
                  </div>
                  <div>
                    <p className="text-white/50 text-xs uppercase tracking-widest mb-1">Internship</p>
                    <p className="font-semibold">{0} / 10</p>
                  </div>
                  <div>
                    <p className="text-white/50 text-xs uppercase tracking-widest mb-1">Work Ex</p>
                    <p className="font-semibold">{0} / 10</p>
                  </div>
                  <div>
                    <p className="text-white/50 text-xs uppercase tracking-widest mb-1">Leadership</p>
                    <p className="font-semibold">{0} / 5</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* ══ SECTION 2: ACADEMIC ANALYSIS ══ */}
          <motion.section variants={itemVariants}>
            <div className={sectionHeader}>
              <div className="h-10 w-10 rounded-xl bg-[#7C3AED]/10 flex items-center justify-center text-[#7C3AED]">
                <GraduationCap className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold text-[#111827] dark:text-white">Academic Analysis</h2>
            </div>
            <div className={`${card} p-8 grid sm:grid-cols-3 gap-6`}>
              <div className="bg-black/[0.02] dark:bg-white/[0.02] p-5 rounded-2xl border border-black/5 dark:border-white/5">
                <p className="text-sm font-bold text-[#111827] dark:text-white mb-2">Strengths</p>
                <p className="text-sm text-[#4B5563] dark:text-[#9CA3AF]">
{report.academicanalysis}                </p>
              </div>
              <div className="bg-black/[0.02] dark:bg-white/[0.02] p-5 rounded-2xl border border-black/5 dark:border-white/5">
                <p className="text-sm font-bold text-[#111827] dark:text-white mb-2">Weaknesses</p>
                <p className="text-sm text-[#4B5563] dark:text-[#9CA3AF]">
{report.gapanalysis}                </p>
              </div>
              <div className="bg-black/[0.02] dark:bg-white/[0.02] p-5 rounded-2xl border border-black/5 dark:border-white/5">
                <p className="text-sm font-bold text-[#111827] dark:text-white mb-2">Consistency Analysis</p>
                <p className="text-sm text-[#4B5563] dark:text-[#9CA3AF]">
{report.profilesummary}                </p>
              </div>
            </div>
          </motion.section>

          {/* ══ SECTIONS 3, 4, 5: COLLEGE PROBABILITIES ══ */}
          {(["dream", "target", "safe"] as const).map((tier, index) => {
            const colleges = report.collegesuitability[tier];
            if (colleges.length === 0) return null;
            const config = {
              dream:  { label: "Section 3: Dream Colleges",  border: "border-[#2563EB]", color: "text-[#2563EB]",  desc: "Probability < 50%" },
              target: { label: "Section 4: Target Colleges", border: "border-[#7C3AED]", color: "text-[#7C3AED]",  desc: "Probability 50% - 80%" },
              safe:   { label: "Section 5: Safe Colleges",   border: "border-[#22C55E]", color: "text-[#22C55E]",  desc: "Probability > 80%" },
            }[tier];

            return (
              <motion.section variants={itemVariants} key={tier}>
                <div className={sectionHeader}>
                  <div className={`h-10 w-10 rounded-xl bg-opacity-10 flex items-center justify-center ${config.color.replace('text-', 'bg-')}`}>
                    <Target className={`h-5 w-5 ${config.color}`} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#111827] dark:text-white">{config.label}</h2>
                    <p className="text-xs text-[#6B7280] mt-0.5">{config.desc}</p>
                  </div>
                </div>
                <div className={`${card} p-6 border-l-4 ${config.border}`}>
                  <div className="space-y-3">
  {colleges.map((c: string, i: number) => (
  <div
    key={i}
    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-black/[0.025] dark:bg-white/[0.025] rounded-xl border border-black/5 dark:border-white/5 gap-3"
  >
    <div>
      <p className="font-bold text-[#111827] dark:text-white">
        {c}
      </p>

      <p className="text-xs text-[#6B7280] mt-0.5">
        MBA College
      </p>
    </div>

    <div className="flex items-center gap-6 shrink-0">
      <div className="text-right min-w-[60px]">
        <p className="text-xs text-[#6B7280] mb-1">
          Probability
        </p>

        <p className={`font-black text-lg ${config.color}`}>
          {config.label === "Dream"
            ? "25%"
            : config.label === "Target"
            ? "65%"
            : "90%"}
        </p>
      </div>
    </div>
  </div>
))}
                  </div>
                </div>
              </motion.section>
            );
          })}

          {/* ══ SECTION 6: REQUIRED PERCENTILE ══ */}
          {allColleges.length > 0 && (
            <motion.section variants={itemVariants}>
              <div className={sectionHeader}>
                <div className="h-10 w-10 rounded-xl bg-[#0EA5E9]/10 flex items-center justify-center text-[#0EA5E9]">
                  <LineChart className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-bold text-[#111827] dark:text-white">Required Percentile Analysis</h2>
              </div>
              <div className={`${card} p-0 overflow-hidden`}>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-[#6B7280] uppercase bg-black/5 dark:bg-white/5">
                      <tr>
                        <th className="px-6 py-4 font-bold">College</th>
                        <th className="px-6 py-4 font-bold">Required %ile</th>
                        <th className="px-6 py-4 font-bold">Current %ile</th>
                        <th className="px-6 py-4 font-bold text-right">Gap</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black/5 dark:divide-white/5">
                      {allColleges.map((c, i) => (
                        <tr key={i} className="bg-white dark:bg-[#111827]">
                          <td className="px-6 py-4 font-semibold text-[#111827] dark:text-white">{c.name}</td>
                          <td className="px-6 py-4 font-medium">{c.reqPercentile}</td>
                          <td className="px-6 py-4 text-[#6B7280]">{c.currentPotential}</td>
                          <td className={`px-6 py-4 font-bold text-right ${c.gapPercentile > 0 ? "text-red-500" : "text-emerald-500"}`}>
                            {c.gapPercentile > 0 ? `+${c.gapPercentile}` : "Met"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.section>
          )}

          {/* ══ SECTION 7: WEAKNESS ANALYSIS ══ */}
          <motion.section variants={itemVariants}>
            <div className={sectionHeader}>
              <div className="h-10 w-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#111827] dark:text-white">Weakness Analysis</h2>
                <p className="text-xs text-[#6B7280] mt-0.5">Top areas reducing your competitive advantage</p>
              </div>
            </div>
            <div className={`${card} p-8`}>
{report ? (                <div className="flex items-center gap-3 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="h-5 w-5" />
                  <p className="font-semibold">No significant weaknesses detected. Your profile is well-balanced!</p>
                </div>
              ) : (
                <ul className="space-y-4">
{([] as any[]).map((w: any, i: number) => (                    <li key={i} className="rounded-2xl border border-black/5 dark:border-white/5 bg-black/[0.025] dark:bg-white/[0.025] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <ShieldAlert className={`h-5 w-5 shrink-0 ${
                          w.severity === "High" ? "text-red-500" : w.severity === "Medium" ? "text-amber-500" : "text-blue-400"
                        }`} />
                        <div>
                          <span className="font-bold text-[#111827] dark:text-white block mb-1">{w.weakness}</span>
                          <span className="text-xs text-[#6B7280] line-clamp-2">{w.impact}</span>
                        </div>
                      </div>
                      <div className="shrink-0">
                        <SeverityBadge severity={w.severity} />
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.section>

          {/* ══ SECTION 8: IMPROVEMENT SUGGESTIONS ══ */}
          <motion.section variants={itemVariants}>
            <div className={sectionHeader}>
              <div className="h-10 w-10 rounded-xl bg-[#8B5CF6]/10 flex items-center justify-center text-[#8B5CF6]">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#111827] dark:text-white">Improvement Suggestions</h2>
                <p className="text-xs text-[#6B7280] mt-0.5">Highest impact actions to elevate your score</p>
              </div>
            </div>
            <div className={`${card} p-8`}>
               <ul className="space-y-4">
                  {(report.roadmap
  ? report.roadmap.split(". ")
  : []
).map((suggestion: string, i: number) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-[#8B5CF6]/10 text-[#8B5CF6] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                        {i + 1}
                      </div>
                      <p className="text-[#4B5563] dark:text-[#D1D5DB] text-sm leading-relaxed font-medium">
                        {suggestion}
                      </p>
                    </li>
                  ))}
               </ul>
            </div>
          </motion.section>

          {/* ══ SECTION 9: FINAL RECOMMENDATION ══ */}
          <motion.section variants={itemVariants} className="pb-20">
            <div className={sectionHeader}>
              <div className="h-10 w-10 rounded-xl bg-[#4F46E5]/10 flex items-center justify-center text-[#4F46E5]">
                <Bot className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold text-[#111827] dark:text-white">Final Recommendation</h2>
            </div>
            <div className={`${card} p-8 bg-gradient-to-br from-[#4F46E5]/5 to-transparent border-l-4 border-[#4F46E5]`}>
              <p className="text-base text-[#111827] dark:text-[#D1D5DB] leading-relaxed font-medium">
                {report.airecommendations}
              </p>
            </div>
          </motion.section>

        </motion.div>
      </div>
    </div>
  );
}
