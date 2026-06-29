"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "@/lib/api";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";
import { 
  Play, 
  FileWarning, 
  Brain, 
  Activity, 
  TrendingUp, 
  Target,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const PERFORMANCE_DATA = [
  { date: "May 1", percentile: 85, score: 62 },
  { date: "May 8", percentile: 89, score: 70 },
  { date: "May 15", percentile: 88, score: 68 },
  { date: "May 22", percentile: 92, score: 78 },
  { date: "May 29", percentile: 94, score: 82 },
  { date: "Jun 5", percentile: 93, score: 79 },
  { date: "Jun 12", percentile: 96.4, score: 90 },
];

const RECENT_ACTIVITY = [
  { id: 1, name: "CAT Full Mock 03", type: "Full Mock", status: "Completed", score: "96.4 %ile", date: "Today", icon: Play, iconColor: "text-blue-500", bg: "bg-blue-50" },
  { id: 2, name: "Algebra Mastery", type: "Topic Test", status: "Completed", score: "88% Acc", date: "Yesterday", icon: Target, iconColor: "text-purple-500", bg: "bg-purple-50" },
  { id: 3, name: "Reading Comp 04", type: "Sectional", status: "Paused", score: "--", date: "Jun 10", icon: Clock, iconColor: "text-orange-500", bg: "bg-orange-50" },
  { id: 4, name: "Number System", type: "Topic Test", status: "Completed", score: "62% Acc", date: "Jun 08", icon: Brain, iconColor: "text-gray-500", bg: "bg-gray-100" },
];

export default function DashboardPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [dateRange, setDateRange] = useState("Last 30 Days");

  const [analytics, setAnalytics] = useState<any>(null);

const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
  setMounted(true);

  loadDashboard();
}, []);

console.log("Dashboard page loaded");
const loadDashboard = async () => {
  console.log("loadDashboard called");
  try {
const [analyticsRes, taskRes] = await Promise.all([
  api.get("/analytics/dashboard"),
  api.get("/tasks/today"),
]);

console.log("ANALYTICS RESPONSE =>", analyticsRes.data);

console.log("TASKS RESPONSE =>", taskRes.data);

setAnalytics(analyticsRes.data);
setTasks(taskRes.data);
  } catch (error) {
    console.error("Dashboard Error:", error);
  }
};

  if (!mounted) return null;

  return (
    <div className="w-full flex flex-col gap-8 font-sans pb-32 px-4 md:px-8 lg:px-12">
      
      {/* HEADER */}
      <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mt-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Overview</h1>
<p className="text-sm text-gray-500 mt-1 font-medium">
  Welcome back{analytics ? ", Student" : ""}. Here's what's happening today.
</p>        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex bg-gray-100/80 p-1 rounded-lg border border-gray-200/50">
            {["Last 7 Days", "Last 30 Days", "All Time"].map((range) => (
              <button 
                key={range}
                onClick={() => setDateRange(range)}
                className={cn(
                  "px-3 py-1.5 text-xs font-semibold rounded-md transition-all",
                  dateRange === range 
                    ? "bg-white text-gray-900 shadow-sm border border-gray-200/50" 
                    : "text-gray-500 hover:text-gray-900"
                )}
              >
                {range}
              </button>
            ))}
          </div>
          <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-500 transition-colors">
            <Calendar className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* KPI GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1 */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold text-gray-500">Current %ile</span>
            <TrendingUp className="w-4 h-4 text-gray-400" />
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold tracking-tight text-gray-900">{analytics?.profileScore ?? "--"}</span>
            </div>
            <div className="flex items-center gap-1 mt-2 text-xs font-medium text-emerald-600">
              <ArrowUpRight className="w-3 h-3" />
              <span>+2.4 from last month</span>
            </div>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold text-gray-500">Expected Score</span>
            <Activity className="w-4 h-4 text-gray-400" />
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold tracking-tight text-gray-900">88</span>
              <span className="text-sm text-gray-400 font-medium">/ 198</span>
            </div>
            <div className="flex items-center gap-1 mt-2 text-xs font-medium text-emerald-600">
              <ArrowUpRight className="w-3 h-3" />
              <span>+12 pts</span>
            </div>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold text-gray-500">Target %ile</span>
            <Target className="w-4 h-4 text-gray-400" />
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold tracking-tight text-gray-900">{analytics?.targetPercentile ?? "--"}</span>
            </div>
            <div className="flex items-center gap-1 mt-2 text-xs font-medium text-orange-600">
              <ArrowDownRight className="w-3 h-3" />
              <span>2.6 pts gap</span>
            </div>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.08)] flex flex-col justify-between text-white relative overflow-hidden">
          <div className="absolute -right-4 -top-4 opacity-10">
            <Sparkles className="w-24 h-24 text-white" />
          </div>
          <div className="flex items-center justify-between mb-4 relative z-10">
            <span className="text-sm font-semibold text-gray-400">Total Practice</span>
            <Brain className="w-4 h-4 text-gray-400" />
          </div>
          <div className="relative z-10">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold tracking-tight text-white">420</span>
              <span className="text-sm text-gray-400 font-medium">Qs</span>
            </div>
            <div className="flex items-center gap-1 mt-2 text-xs font-medium text-gray-400">
              <span>This week</span>
            </div>
          </div>
        </div>

      </div>

      {/* MAIN CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Chart Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-gray-200 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-gray-900">Performance Trajectory</h3>
                <p className="text-xs text-gray-500 mt-0.5">Percentile progression over time</p>
              </div>
              <button className="text-gray-400 hover:text-gray-900">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={PERFORMANCE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#111827" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#111827" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis 
                    dataKey="date" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: "#6B7280", fontWeight: 500 }} 
                    dy={10} 
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: "#6B7280", fontWeight: 500 }} 
                    domain={['dataMin - 5', 100]} 
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                    itemStyle={{ color: '#111827', fontSize: '14px', fontWeight: 600 }}
                    labelStyle={{ color: '#6B7280', fontSize: '12px', marginBottom: '4px' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="percentile" 
                    stroke="#111827" 
                    strokeWidth={2} 
                    fillOpacity={1} 
                    fill="url(#colorValue)" 
                    activeDot={{ r: 5, strokeWidth: 0, fill: "#111827" }} 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Data Table */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-base font-semibold text-gray-900">Recent Activity</h3>
              <Link href="/analytics" className="text-xs font-semibold text-blue-600 hover:text-blue-700">View All</Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-500 uppercase bg-gray-50/50 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-3 font-semibold">Assessment</th>
                    <th className="px-6 py-3 font-semibold">Type</th>
                    <th className="px-6 py-3 font-semibold">Status</th>
                    <th className="px-6 py-3 font-semibold text-right">Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {RECENT_ACTIVITY.map((activity) => (
                    <tr 
                      key={activity.id} 
                      onClick={() => router.push(activity.type === "Full Mock" ? "/mocks/1/result" : "/practice")}
                      className="hover:bg-gray-50/50 transition-colors group cursor-pointer"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center shrink-0", activity.bg)}>
                            <activity.icon className={cn("w-4 h-4", activity.iconColor)} />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{activity.name}</div>
                            <div className="text-xs text-gray-500">{activity.date}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600 font-medium">
                        {activity.type}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5">
                          {activity.status === "Completed" ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          ) : (
                            <Clock className="w-4 h-4 text-orange-500" />
                          )}
                          <span className={cn(
                            "text-xs font-semibold",
                            activity.status === "Completed" ? "text-emerald-700" : "text-orange-700"
                          )}>
                            {activity.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="font-semibold text-gray-900">{activity.score}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Action Panel Column */}
        <div className="space-y-6">
          
          {/* Insights Panel */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <h3 className="text-base font-semibold text-gray-900">AI Insights</h3>
            </div>
            <div className="p-6 space-y-5">
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                  <FileWarning className="w-4 h-4 text-red-500" /> Weakness Detected
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
  {analytics?.gapAnalysis ?? "No gap analysis available."}
</p>
              </div>
              <div className="h-px bg-gray-100 w-full" />
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-green-500" /> Opportunity
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
  {analytics?.roadmap ?? "No roadmap available."}
</p>
              </div>
            </div>
            <div className="p-4 bg-gray-50 border-t border-gray-100">
              <Link href="/practice">
                <button className="w-full bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-900 text-sm font-semibold py-2 px-4 rounded-lg shadow-sm transition-all">
                  Generate Remedial Practice
                </button>
              </Link>
            </div>
          </div>

          {/* Upcoming Tasks */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-base font-semibold text-gray-900">Priority Tasks</h3>
            </div>
            <div className="p-0">
             {tasks.map((task: any) => (
  <Link
    key={task.id}
    href="/tasks"
    className="flex items-start justify-between p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors group"
  >
    <div>
      <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
        {task.title}
      </p>

      <p className="text-xs text-gray-500 mt-0.5">
        {task.description}
      </p>
    </div>

    <span
      className={cn(
        "px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider",
        task.priority === "high"
          ? "bg-red-50 text-red-600"
          : task.priority === "medium"
          ? "bg-yellow-50 text-yellow-600"
          : "bg-green-50 text-green-600"
      )}
    >
      {task.priority}
    </span>
  </Link>
))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
