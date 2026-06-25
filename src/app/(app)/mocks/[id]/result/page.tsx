"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer 
} from "recharts";
import { 
  Trophy, 
  Target, 
  CheckCircle2, 
  Activity, 
  TrendingUp,
  ArrowRight,
  ChevronRight,
  Brain,
  Clock,
  AlertTriangle,
  FileText
} from "lucide-react";
import { cn } from "@/lib/utils";

const radarData = [
  { subject: 'Arithmetic', A: 40, fullMark: 100 },
  { subject: 'Algebra', A: 92, fullMark: 100 },
  { subject: 'Geometry', A: 85, fullMark: 100 },
  { subject: 'Numbers', A: 65, fullMark: 100 },
  { subject: 'Modern Math', A: 70, fullMark: 100 },
];

const SECTION_DATA = [
  { section: "VARC", attempts: 18, correct: 12, incorrect: 6, accuracy: 66.6, time: 40, score: 30, percentile: 92.4 },
  { section: "DILR", attempts: 14, correct: 10, incorrect: 4, accuracy: 71.4, time: 40, score: 26, percentile: 95.1 },
  { section: "QA", attempts: 16, correct: 12, incorrect: 4, accuracy: 75.0, time: 40, score: 32, percentile: 98.2 },
];

export default function ResultReportPage() {
  const params = useParams();
  const id = params.id as string;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full max-w-[1200px] mx-auto flex flex-col gap-8 font-sans pb-32 px-4 md:px-8 lg:px-12">
      
      {/* HEADER & BREADCRUMBS */}
      <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mt-4">
        <div>
          <div className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-2">
            <Link href="/dashboard" className="hover:text-gray-900 transition-colors">Dashboard</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/mocks" className="hover:text-gray-900 transition-colors">Mocks</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-semibold">CAT Mock 03 Report</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Performance Report</h1>
        </div>
        
        <div className="flex items-center gap-3">
          <Link href={`/error-log`}>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
              <FileText className="w-4 h-4" /> Review Errors
            </button>
          </Link>
          <Link href="/practice">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-gray-900 hover:bg-gray-800 transition-colors shadow-sm">
              <Brain className="w-4 h-4" /> Generate Practice
            </button>
          </Link>
        </div>
      </header>

      {/* KPI GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold text-gray-500">Overall Percentile</span>
            <TrendingUp className="w-4 h-4 text-blue-500" />
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold tracking-tight text-gray-900">96.2</span>
              <span className="text-sm text-gray-400 font-medium">%ile</span>
            </div>
            <div className="flex items-center gap-1 mt-2 text-xs font-medium text-emerald-600">
              <TrendingUp className="w-3 h-3" />
              <span>+2.1 from previous mock</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold text-gray-500">Estimated Rank</span>
            <Trophy className="w-4 h-4 text-purple-500" />
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold tracking-tight text-gray-900">8,200</span>
            </div>
            <div className="flex items-center gap-1 mt-2 text-xs font-medium text-gray-500">
              <span>out of 280,000+ test takers</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold text-gray-500">Total Score</span>
            <Target className="w-4 h-4 text-orange-500" />
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold tracking-tight text-gray-900">88</span>
              <span className="text-sm text-gray-400 font-medium">/ 198</span>
            </div>
            <div className="flex items-center gap-1 mt-2 text-xs font-medium text-emerald-600">
              <TrendingUp className="w-3 h-3" />
              <span>+12 pts improvement</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold text-gray-500">Global Accuracy</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold tracking-tight text-gray-900">71%</span>
            </div>
            <div className="flex items-center gap-1 mt-2 text-xs font-medium text-red-500">
              <AlertTriangle className="w-3 h-3" />
              <span>Below target (85%)</span>
            </div>
          </div>
        </div>

      </div>

      {/* SECTIONAL BREAKDOWN TABLE */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-gray-900">Sectional Breakdown</h3>
            <p className="text-xs text-gray-500 mt-0.5">Detailed statistics across all sections</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50/50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-3 font-semibold">Section</th>
                <th className="px-6 py-3 font-semibold text-right">Attempts</th>
                <th className="px-6 py-3 font-semibold text-right text-emerald-600">Correct</th>
                <th className="px-6 py-3 font-semibold text-right text-red-600">Incorrect</th>
                <th className="px-6 py-3 font-semibold text-right">Accuracy</th>
                <th className="px-6 py-3 font-semibold text-right">Time Spent</th>
                <th className="px-6 py-3 font-semibold text-right bg-blue-50/50 text-blue-800">Score</th>
                <th className="px-6 py-3 font-semibold text-right bg-blue-50/50 text-blue-800">%ile</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {SECTION_DATA.map((sec) => (
                <tr key={sec.section} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900">{sec.section}</td>
                  <td className="px-6 py-4 text-right font-medium text-gray-700">{sec.attempts}</td>
                  <td className="px-6 py-4 text-right font-semibold text-emerald-600">{sec.correct}</td>
                  <td className="px-6 py-4 text-right font-semibold text-red-600">{sec.incorrect}</td>
                  <td className="px-6 py-4 text-right font-medium text-gray-700">{sec.accuracy}%</td>
                  <td className="px-6 py-4 text-right font-medium text-gray-700">{sec.time}m</td>
                  <td className="px-6 py-4 text-right font-bold text-gray-900 bg-blue-50/30">{sec.score}</td>
                  <td className="px-6 py-4 text-right font-bold text-blue-600 bg-blue-50/30">{sec.percentile}</td>
                </tr>
              ))}
              {/* OVERALL ROW */}
              <tr className="bg-gray-50/80 border-t-2 border-gray-200">
                <td className="px-6 py-4 font-black text-gray-900 uppercase">Overall</td>
                <td className="px-6 py-4 text-right font-bold text-gray-900">48</td>
                <td className="px-6 py-4 text-right font-bold text-emerald-600">34</td>
                <td className="px-6 py-4 text-right font-bold text-red-600">14</td>
                <td className="px-6 py-4 text-right font-bold text-gray-900">70.8%</td>
                <td className="px-6 py-4 text-right font-bold text-gray-900">120m</td>
                <td className="px-6 py-4 text-right font-black text-gray-900 bg-blue-100/50">88</td>
                <td className="px-6 py-4 text-right font-black text-blue-700 bg-blue-100/50">96.2</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* TOPIC MASTERY & AI INSIGHTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Radar Chart */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col">
          <div className="px-6 py-5 border-b border-gray-100">
            <h3 className="text-base font-semibold text-gray-900">QA Topic Mastery</h3>
            <p className="text-xs text-gray-500 mt-0.5">Strengths vs Weaknesses spread</p>
          </div>
          <div className="flex-1 p-6 h-[350px] w-full relative -ml-4">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                <PolarGrid stroke="#E5E7EB" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#4B5563', fontSize: 13, fontWeight: 600 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  name="Score"
                  dataKey="A"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  fill="#3B82F6"
                  fillOpacity={0.2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Action Plan */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col">
          <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-2">
            <Brain className="w-5 h-5 text-blue-600" />
            <h3 className="text-base font-semibold text-gray-900">AI Action Plan</h3>
          </div>
          
          <div className="flex-1 p-0 divide-y divide-gray-100">
            {/* Weakness */}
            <div className="p-6 bg-red-50/30">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-red-100 shrink-0">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">Critical Weakness: Arithmetic</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Your accuracy in Time & Work and Percentages dropped below 40%. You spent an average of <span className="font-semibold text-gray-900">3.5 minutes</span> per question here, draining time from other topics.
                  </p>
                  <button className="mt-2 text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 group">
                    Generate Drill <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>

            {/* Opportunity */}
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-orange-100 shrink-0">
                  <Clock className="w-5 h-5 text-orange-600" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">Time Opportunity: DILR</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    You chose the toughest DILR set first, costing you 14 minutes for only 1 correct attempt. Review the <span className="font-semibold text-gray-900">Set Selection Strategy</span> module.
                  </p>
                  <button className="mt-2 text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 group">
                    Watch Strategy Video <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>

            {/* Strength */}
            <div className="p-6 bg-emerald-50/30">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-emerald-100 shrink-0">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">Strength Validated: Algebra</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    92% accuracy! You've mastered inequalities and linear equations. You can safely reduce practice time here and focus on arithmetic.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
