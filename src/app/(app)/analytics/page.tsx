"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  BarChart as RechartsBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area
} from "recharts";
import { 
  BarChart3, 
  TrendingUp, 
  Target, 
  Clock, 
  Zap,
  Activity,
  Flame,
  ArrowUpRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const accuracyData = [
  { name: "W1", accuracy: 65, percentile: 72 },
  { name: "W2", accuracy: 68, percentile: 75 },
  { name: "W3", accuracy: 72, percentile: 82 },
  { name: "W4", accuracy: 78, percentile: 88 },
  { name: "W5", accuracy: 84, percentile: 96.2 },
];

const timeData = [
  { name: "Mock 1", varc: 40, dilr: 40, qa: 40 },
  { name: "Mock 2", varc: 42, dilr: 38, qa: 40 },
  { name: "Mock 3", varc: 38, dilr: 42, qa: 40 },
];

export default function AnalyticsDashboardPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full flex flex-col gap-12 font-sans pb-32">
      
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-2 px-2 flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100 mb-2">
            <BarChart3 className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-bold uppercase tracking-widest text-blue-700">Analytics</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">Performance Trends</h1>
          <p className="text-xl text-gray-500 font-medium">Tracking your journey to the 99th percentile.</p>
        </div>
        
        <div className="flex items-center gap-4 bg-white/60 backdrop-blur-2xl border border-white/80 px-6 py-4 rounded-3xl shadow-apple-soft">
          <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-2xl">
            <Flame className="w-6 h-6 text-orange-500" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Current Streak</p>
            <p className="text-2xl font-black text-gray-900">14 Days</p>
          </div>
        </div>
      </motion.div>

      {/* KPI GRID */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {/* Current %ile */}
        <div className="bg-white/60 backdrop-blur-3xl rounded-[32px] p-8 border border-white/80 shadow-apple-soft flex flex-col justify-between group hover:bg-white/80 transition-colors">
          <div className="flex items-center gap-2 text-blue-600 mb-6">
            <TrendingUp className="w-5 h-5" />
            <span className="font-bold uppercase tracking-widest text-sm">Current %ile</span>
          </div>
          <div>
            <h2 className="text-[3.5rem] leading-none font-black text-gray-900 tracking-tighter mb-2">96.2</h2>
            <div className="flex items-center gap-2 text-sm font-bold text-green-600 bg-green-50 w-fit px-3 py-1 rounded-lg">
              <ArrowUpRight className="w-4 h-4" /> +4.2 this week
            </div>
          </div>
        </div>

        {/* Target %ile */}
        <div className="bg-white/60 backdrop-blur-3xl rounded-[32px] p-8 border border-white/80 shadow-apple-soft flex flex-col justify-between group hover:bg-white/80 transition-colors">
          <div className="flex items-center gap-2 text-purple-600 mb-6">
            <Target className="w-5 h-5" />
            <span className="font-bold uppercase tracking-widest text-sm">Target %ile</span>
          </div>
          <div>
            <h2 className="text-[3.5rem] leading-none font-black text-gray-900 tracking-tighter mb-2">99.0</h2>
            <div className="flex items-center gap-2 text-sm font-bold text-gray-500 bg-gray-100 w-fit px-3 py-1 rounded-lg">
              IIM A, B, C Cutoff
            </div>
          </div>
        </div>

        {/* Expected Score */}
        <div className="bg-white/60 backdrop-blur-3xl rounded-[32px] p-8 border border-white/80 shadow-apple-soft flex flex-col justify-between group hover:bg-white/80 transition-colors">
          <div className="flex items-center gap-2 text-green-600 mb-6">
            <Activity className="w-5 h-5" />
            <span className="font-bold uppercase tracking-widest text-sm">Expected Score</span>
          </div>
          <div>
            <h2 className="text-[3.5rem] leading-none font-black text-gray-900 tracking-tighter mb-2">88</h2>
            <div className="flex items-center gap-2 text-sm font-bold text-green-600 bg-green-50 w-fit px-3 py-1 rounded-lg">
              <ArrowUpRight className="w-4 h-4" /> +12 since Mock 1
            </div>
          </div>
        </div>

        {/* Gap */}
        <div className="bg-white/60 backdrop-blur-3xl rounded-[32px] p-8 border border-white/80 shadow-apple-soft flex flex-col justify-between group hover:bg-white/80 transition-colors relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-10">
            <Zap className="w-24 h-24 text-orange-500" />
          </div>
          <div className="flex items-center gap-2 text-orange-600 mb-6 relative z-10">
            <Zap className="w-5 h-5" />
            <span className="font-bold uppercase tracking-widest text-sm">Percentile Gap</span>
          </div>
          <div className="relative z-10">
            <h2 className="text-[3.5rem] leading-none font-black text-orange-500 tracking-tighter mb-2">2.8</h2>
            <div className="flex items-center gap-2 text-sm font-bold text-orange-700 bg-orange-50 w-fit px-3 py-1 rounded-lg">
              Points to cover
            </div>
          </div>
        </div>
      </motion.div>

      {/* CHARTS */}
      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        {/* Growth Curve */}
        <div className="bg-white/60 backdrop-blur-3xl rounded-[32px] p-8 border border-white/80 shadow-apple-soft flex flex-col col-span-1 lg:col-span-2 min-h-[400px]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Growth Trajectory</h2>
              <p className="text-gray-500 font-medium mt-1">Percentile progression across recent mocks</p>
            </div>
          </div>
          <div className="flex-1 w-full relative -ml-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={accuracyData} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPercentile" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: "#6B7280", fontWeight: 600 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: "#6B7280", fontWeight: 600 }} domain={['dataMin - 5', 100]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 10px 40px rgba(0,0,0,0.1)', padding: '12px 16px', fontWeight: 600 }}
                  itemStyle={{ color: '#111827', fontWeight: 700 }}
                />
                <Area type="monotone" dataKey="percentile" stroke="#3B82F6" strokeWidth={4} fillOpacity={1} fill="url(#colorPercentile)" activeDot={{ r: 8, strokeWidth: 0, fill: "#3B82F6" }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Accuracy Trend */}
        <div className="bg-white/60 backdrop-blur-3xl rounded-[32px] p-8 border border-white/80 shadow-apple-soft flex flex-col min-h-[350px]">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Accuracy Trend</h2>
            <p className="text-gray-500 font-medium mt-1">Weekly accuracy %</p>
          </div>
          <div className="flex-1 w-full relative -ml-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={accuracyData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: "#6B7280", fontWeight: 600 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: "#6B7280", fontWeight: 600 }} domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 10px 40px rgba(0,0,0,0.1)', fontWeight: 600 }}
                />
                <Line type="monotone" dataKey="accuracy" stroke="#10B981" strokeWidth={4} dot={{ r: 6, fill: "#fff", strokeWidth: 3, stroke: "#10B981" }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Time Management Trend */}
        <div className="bg-white/60 backdrop-blur-3xl rounded-[32px] p-8 border border-white/80 shadow-apple-soft flex flex-col min-h-[350px]">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
              Time Utilization
            </h2>
            <p className="text-gray-500 font-medium mt-1">Minutes spent per section</p>
          </div>
          <div className="flex-1 w-full relative -ml-4 mt-auto">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart data={timeData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: "#6B7280", fontWeight: 600 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: "#6B7280", fontWeight: 600 }} domain={[0, 45]} />
                <Tooltip 
                  cursor={{ fill: 'rgba(0,0,0,0.02)' }}
                  contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 10px 40px rgba(0,0,0,0.1)', fontWeight: 600 }}
                />
                <Bar dataKey="varc" stackId="a" fill="#3B82F6" radius={[0, 0, 8, 8]} maxBarSize={40} />
                <Bar dataKey="dilr" stackId="a" fill="#8B5CF6" maxBarSize={40} />
                <Bar dataKey="qa" stackId="a" fill="#10B981" radius={[8, 8, 0, 0]} maxBarSize={40} />
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500"><span className="w-3 h-3 rounded bg-blue-500"/> VARC</div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500"><span className="w-3 h-3 rounded bg-purple-500"/> DILR</div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500"><span className="w-3 h-3 rounded bg-green-500"/> QA</div>
          </div>
        </div>

      </motion.div>
    </div>
  );
}
