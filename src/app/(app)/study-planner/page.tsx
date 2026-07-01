"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { 
  Target, Bot, Map, RefreshCw, PlusCircle, 
  Clock, CheckCircle2, Navigation, TrendingUp, History,
  FileText, ArrowRight, Activity, X, Briefcase, BarChart, GraduationCap,
  Play, Check, FastForward, HeartPulse, ListTodo, Zap, Calendar, MessageSquare, Award,
  ChevronRight, BrainCircuit
} from "lucide-react";
import { toast } from "sonner";
import api from "@/lib/api";
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

const glassCardClass = "bg-white/80 dark:bg-black/40 backdrop-blur-3xl border border-white/60 dark:border-white/10 rounded-[24px] shadow-[0_20px_60px_rgba(15,23,42,0.08)] overflow-hidden transition-all duration-500 hover:shadow-[0_30px_80px_rgba(15,23,42,0.12)] hover:border-white/80 dark:hover:border-white/20";
const glassInputClass = "bg-black/5 dark:bg-white/5 rounded-xl h-12 text-[#111827] dark:text-white border-transparent focus:border-[#7F77DD] focus:ring-[#7F77DD] placeholder:text-[#6B7280]";

const mockHistory: any[] = [];

export default function PreparationRoadmapPage() {
  const router = useRouter();
  const [studyPlan, setStudyPlan] = useState<any>(null);
  const [loadingPlan, setLoadingPlan] = useState(true);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);
  const [progress, setProgress] = useState(72);
  const [showStickyGoal, setShowStickyGoal] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState<any>(null);

  const [wizardData, setWizardData] = useState({
    targetExam: 'CAT',
    attemptYear: '2027',
    targetPercentile: '99+',
    targetColleges: [] as string[],
    quantLevel: 50,
    dilrLevel: 50,
    varcLevel: 50,
    mockPercentile: '',
    dailyHours: '4',
    weeklyDays: '6',
    workStatus: 'Student',
    weakSections: [] as string[],
    weakTopics: [] as string[]
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const generateStudyPlan = async () => {
  try {
    console.log("1. Start");

    setIsProcessing(true);

    console.log("2. Calling API");

    const res = await api.post("/study-plan/generate");

    console.log("3. API Success", res.data);

    setStudyPlan(res.data);

    setLocalHistory((prev) => [
  {
    id: res.data.id,
    name: `Roadmap ${prev.length + 1}`,
    date: new Date(res.data.createdat).toLocaleDateString(),
    status: "Active",
    completion: "0%",
  },
  ...prev.map((item) => ({ ...item, status: "Archived" })),
]);

    console.log("4. Study plan updated");

    toast.success("Study Plan Generated Successfully");

    console.log("5. Toast shown");

    setIsWizardOpen(false);

    console.log("6. Wizard closed");

  } catch (err) {
    console.error("ERROR:", err);
    toast.error("Failed to generate Study Plan");
  } finally {
    console.log("7. Finally");
    setIsProcessing(false);
  }
};
  const [localHistory, setLocalHistory] = useState<any[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowStickyGoal(true);
      } else {
        setShowStickyGoal(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
  const loadStudyPlan = async () => {
    try {
        const [latestRes, historyRes] = await Promise.all([
  api.get("/study-plan/latest"),
  api.get("/study-plan/history"),
]);

setStudyPlan(latestRes.data);

setLocalHistory(
  historyRes.data.map((item: any, index: number) => ({
    id: item.id,
    name: `Roadmap ${historyRes.data.length - index}`,
    date: new Date(item.createdat).toLocaleDateString(),
    status: index === 0 ? "Active" : "Archived",
    completion: index === 0 ? "0%" : "Completed",
  }))
);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingPlan(false);
    }
  };

  loadStudyPlan();
}, []);

useEffect(() => {
  console.log("Wizard Step:", wizardStep);
}, [wizardStep]);

  type TaskStatus = 'Pending' | 'In Progress' | 'Completed' | 'Skipped';
  type TaskPriority = 'High Priority' | 'Secondary';
  const [priorityTasks, setPriorityTasks] = useState<any[]>([]);
const [secondaryTasks, setSecondaryTasks] = useState<any[]>([]);

useEffect(() => {
  if (!studyPlan?.dailytasks) return;

  const tasks = studyPlan.dailytasks
    .split("\n")
    .filter((t: string) => t.trim())
    .map((task: string, index: number) => ({
      id: index + 1,
      title: task,
      category: "AI Recommendation",
      duration: "30 Minutes",
      status: "Pending",
      priority: index < 2 ? "High Priority" : "Secondary",
      color:
        index % 4 === 0
          ? "#2563EB"
          : index % 4 === 1
          ? "#F59E0B"
          : index % 4 === 2
          ? "#10B981"
          : "#A855F7",
    }));

  setPriorityTasks(
  tasks.filter((t: any) => t.priority === "High Priority")
);

setSecondaryTasks(
  tasks.filter((t: any) => t.priority === "Secondary")
);
}, [studyPlan]);

  const handleTaskAction = (taskId: number, action: 'start' | 'complete' | 'skip', isPriority: boolean) => {
    const updateTasks = (tasks: any[]) => tasks.map(t => {
      if (t.id === taskId) {
        if (action === 'start') return { ...t, status: 'In Progress' };
        if (action === 'complete') {
          setProgress(p => Math.min(100, p + 1.2));
          toast.success(`Task Completed: ${t.title}`);
          return { ...t, status: 'Completed' };
        }
        if (action === 'skip') return { ...t, status: 'Skipped' };
      }
      return t;
    });

    if (isPriority) {
      setPriorityTasks(updateTasks);
    } else {
      setSecondaryTasks(updateTasks);
    }
  };

  const renderTask = (task: any, isPriority: boolean) => (
    <div key={task.id} className="relative group transition-all duration-300">
      <div className={`absolute inset-0 rounded-2xl transition-opacity duration-300 ${task.status === 'Completed' ? 'bg-[#1D9E75]/10 opacity-100' : 'bg-black/5 dark:bg-white/5 opacity-0 group-hover:opacity-100'}`}></div>
      <div className={`relative p-4 rounded-2xl border ${task.status === 'Completed' ? 'border-[#1D9E75]/20' : 'border-transparent'} transition-all`}>
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full shrink-0 shadow-sm" style={{ backgroundColor: task.color }}></div>
            <h4 className={`text-sm font-bold ${task.status === 'Completed' ? 'text-[#1D9E75] line-through opacity-70' : 'text-[#111827] dark:text-white'}`}>{task.title}</h4>
          </div>
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-sm ${
            task.status === 'In Progress' ? 'bg-[#F59E0B]/10 text-[#F59E0B]' :
            task.status === 'Completed' ? 'bg-[#1D9E75]/10 text-[#1D9E75]' :
            task.status === 'Skipped' ? 'bg-black/5 dark:bg-white/5 text-[#6B7280]' :
            'bg-black/5 dark:bg-white/5 text-[#6B7280]'
          }`}>
            {task.status}
          </span>
        </div>
        
        <div className="flex items-center gap-4 text-[11px] font-semibold text-[#6B7280] mb-4">
          <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> {task.duration}</span>
          <span className="flex items-center gap-1.5"><Target className="w-3 h-3" style={{ color: task.color }} /> {task.category}</span>
          {isPriority && <span className="flex items-center gap-1.5 text-[#E11D48] bg-[#E11D48]/10 px-2 py-0.5 rounded-md"><Zap className="w-3 h-3" /> High Priority</span>}
        </div>

        <div className="flex items-center gap-2">
          {task.status === 'Pending' && (
            <Button 
              onClick={() => handleTaskAction(task.id, 'start', isPriority)}
              variant="outline" 
              size="sm" 
              className="h-8 text-xs font-bold text-[#2563EB] border-[#2563EB]/20 hover:bg-[#2563EB]/10 flex-1 rounded-xl shadow-sm"
            >
              <Play className="w-3 h-3 mr-1.5" /> Start Task
            </Button>
          )}
          
          {(task.status === 'Pending' || task.status === 'In Progress') && (
            <Button 
              onClick={() => handleTaskAction(task.id, 'complete', isPriority)}
              variant="outline" 
              size="sm" 
              className="h-8 text-xs font-bold text-[#1D9E75] border-[#1D9E75]/20 hover:bg-[#1D9E75]/10 flex-1 rounded-xl shadow-sm"
            >
              <Check className="w-3 h-3 mr-1.5" /> Mark Complete
            </Button>
          )}

          {(task.status === 'Pending' || task.status === 'In Progress') && (
            <Button 
              onClick={() => handleTaskAction(task.id, 'skip', isPriority)}
              variant="ghost" 
              size="sm" 
              className="h-8 text-xs font-bold text-[#6B7280] hover:text-[#111827] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 px-3 shrink-0 rounded-xl"
            >
              <FastForward className="w-3 h-3" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );

  if (loadingPlan) {
  return (
    <div className="flex justify-center items-center h-screen">
      Loading Study Plan...
    </div>
  );
}

return (
    <div className="relative min-h-screen w-full pb-32 bg-[#F6F8FC] dark:bg-[#0A0A0A] selection:bg-[#4F46E5]/30">
      {/* AMBIENT BACKGROUND */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-[#2563EB] opacity-[0.12] dark:opacity-[0.08] blur-[150px]"></div>
        <div className="absolute top-[30%] left-[10%] w-[500px] h-[500px] rounded-full bg-[#4F46E5] opacity-[0.12] dark:opacity-[0.08] blur-[150px]"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[700px] h-[700px] rounded-full bg-[#7C3AED] opacity-[0.12] dark:opacity-[0.08] blur-[150px]"></div>
      </div>

      {/* FLOATING GOAL WIDGET */}
      <AnimatePresence>
        {showStickyGoal && (
          <motion.div 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden md:flex items-center gap-6 bg-white/90 dark:bg-black/90 backdrop-blur-2xl border border-white/40 dark:border-white/10 rounded-full px-8 py-3 shadow-[0_20px_60px_rgba(15,23,42,0.12)]"
          >
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">Target</span>
              <span className="text-sm font-extrabold text-[#111827] dark:text-white">{studyPlan?.targetexam}{" "}
{studyPlan?.examdate
  ? new Date(studyPlan.examdate).getFullYear()
  : ""}</span>
            </div>
            <div className="w-px h-4 bg-black/10 dark:bg-white/10"></div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">Goal</span>
              <span className="text-sm font-extrabold text-[#111827] dark:text-white">
  {studyPlan?.targetpercentile}+
</span>
            </div>
            <div className="w-px h-4 bg-black/10 dark:bg-white/10"></div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">Left</span>
              <span className="text-sm font-extrabold text-[#A78BFA]">248 Days</span>
            </div>
            <div className="w-px h-4 bg-black/10 dark:bg-white/10"></div>
            <div className="flex items-center gap-3">
              <div className="w-16 h-1.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#2563EB] to-[#7C3AED] rounded-full" style={{ width: `${progress}%` }}></div>
              </div>
              <span className="text-sm font-extrabold text-[#2563EB]">{progress.toFixed(1)}%</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        className="relative z-10 pt-6 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* GOAL: ROADMAP HERO */}
        <motion.section variants={itemVariants} className="relative w-full rounded-[32px] overflow-hidden shadow-[0_20px_60px_rgba(37,99,235,0.15)] group">
          <div className="absolute inset-0 bg-gradient-to-br from-[#2563EB] via-[#4F46E5] to-[#7C3AED] z-0 opacity-100 transition-opacity duration-500"></div>
          <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-20 mix-blend-overlay z-0"></div>
          
          <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row gap-8 justify-between items-center">
            <div className="text-white space-y-6 flex-1 w-full">
              <div className="flex flex-wrap items-center gap-4">
                <div className="bg-white/20 backdrop-blur-md border border-white/30 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full shadow-sm">Active Roadmap</div>
                <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
  {studyPlan?.targetexam}{" "}
  {studyPlan?.examdate
    ? new Date(studyPlan.examdate).getFullYear()
    : ""}
</h1>
              </div>
              
              <div className="flex flex-wrap items-center gap-8 md:gap-12">
                <div className="flex flex-col gap-1">
                  <span className="text-white/70 text-[10px] uppercase tracking-widest font-bold">Target Percentile</span>
                  <span className="text-3xl font-black">
  {studyPlan?.targetpercentile}+
</span>
                </div>
                <div className="w-px h-10 bg-white/20 hidden md:block"></div>
                <div className="flex flex-col gap-1">
                  <span className="text-white/70 text-[10px] uppercase tracking-widest font-bold">Target Colleges</span>
                  <span className="text-sm font-bold max-w-[160px] leading-snug">
  {studyPlan?.roadmap?.split("\n")[0] || "No Roadmap Available"}
</span>
                </div>
                <div className="w-px h-10 bg-white/20 hidden md:block"></div>
                <div className="flex flex-col gap-1">
                  <span className="text-white/70 text-[10px] uppercase tracking-widest font-bold">Days Remaining</span>
                  <span className="text-3xl font-black text-[#A78BFA]">
  {studyPlan?.examdate
    ? Math.max(
        0,
        Math.ceil(
          (new Date(studyPlan.examdate).getTime() - Date.now()) /
            (1000 * 60 * 60 * 24)
        )
      )
    : 0}
</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button onClick={() => setIsWizardOpen(true)} className="bg-white text-[#111827] hover:bg-white/90 rounded-xl h-11 px-6 shadow-lg transition-transform active:scale-95 font-bold text-sm">
                  <PlusCircle className="mr-2 h-4 w-4" /> Generate New Roadmap
                </Button>
                <Button onClick={() => { toast.success('Syncing latest mock scores...'); setTimeout(() => toast.success('Roadmap updated successfully!'), 1500); }} variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20 hover:text-white rounded-xl h-11 px-6 font-bold text-sm backdrop-blur-md">
                  <RefreshCw className="mr-2 h-4 w-4" /> Update Roadmap
                </Button>
                <Button onClick={() => document.getElementById('roadmap-breakdown')?.scrollIntoView({ behavior: 'smooth' })} variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20 hover:text-white rounded-xl h-11 px-6 font-bold text-sm backdrop-blur-md">
                  <Map className="mr-2 h-4 w-4" /> View Active Plan
                </Button>
              </div>
            </div>

            {/* Health Score & Progress */}
            <div className="flex flex-col gap-6 shrink-0 bg-black/20 backdrop-blur-xl border border-white/10 rounded-3xl p-6 w-full md:w-[320px]">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-white/70 text-[10px] uppercase tracking-widest font-bold mb-1">Roadmap Health</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-[#10B981]">
  {studyPlan?.targetpercentile || 0}
</span>
                    <span className="text-sm font-bold text-white/50">/ 100</span>
                  </div>
                </div>
                <div className="relative w-16 h-16 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="50%" cy="50%" r="42%" className="fill-none stroke-white/10" strokeWidth="8" />
                    <motion.circle cx="50%" cy="50%" r="42%" className="fill-none stroke-white" strokeWidth="8" strokeLinecap="round"
                      initial={{ strokeDasharray: "0 1000" }} animate={{ strokeDasharray: `${(progress / 100) * 422} 1000` }}
                      transition={{ duration: 1.5, ease: "easeOut" }} />
                  </svg>
                  <span className="absolute text-sm font-bold text-white">{progress.toFixed(0)}%</span>
                </div>
              </div>
              
              <div className="space-y-3 pt-4 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white/80">Task Completion</span>
                  <span className="text-xs font-black text-white"><span className="text-xs font-black text-white">
  {progress.toFixed(0)}%
</span></span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white/80">Consistency</span>
                  <span className="text-xs font-black text-white">{progress >= 84 ? progress.toFixed(0) : 84}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white/80">Mock Participation</span>
                  <span className="text-xs font-black text-white">{progress >= 88 ? progress.toFixed(0) : 88}%</span>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* STRATEGY: CURRENT PREPARATION PHASE */}
        <motion.section variants={itemVariants} className="space-y-4 pt-4">
          <div className="flex items-center gap-2 pl-2">
            <div className="w-6 h-6 rounded-lg bg-[#2563EB]/10 flex items-center justify-center">
              <Navigation className="w-3.5 h-3.5 text-[#2563EB]" />
            </div>
            <h2 className="text-sm font-bold text-[#111827] dark:text-white uppercase tracking-widest">Current Phase</h2>
          </div>
          
          <div className={`${glassCardClass} p-8 flex flex-col gap-8`}>
            {/* Timeline */}
            <div className="relative pt-6 pb-2 max-w-[1000px] mx-auto w-full">
              <div className="absolute top-1/2 left-[10%] right-[10%] h-1 bg-black/5 dark:bg-white/5 rounded-full z-0"></div>
              <div className="absolute top-1/2 left-[10%] w-[30%] h-1 bg-gradient-to-r from-[#2563EB] to-[#7C3AED] rounded-full z-0 shadow-[0_0_10px_rgba(37,99,235,0.5)]"></div>

              <div className="relative z-10 flex justify-between w-full">
                <div className="flex flex-col items-center gap-3 w-1/4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2563EB] to-[#7C3AED] flex items-center justify-center shadow-lg shadow-[#7C3AED]/30 ring-4 ring-white dark:ring-[#0A0A0A] z-10 relative">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                    <div className="absolute -bottom-8 text-[10px] font-bold text-[#2563EB] uppercase tracking-wider whitespace-nowrap bg-[#2563EB]/10 px-2 py-0.5 rounded-md">Active</div>
                  </div>
                  <span className="text-sm font-bold text-[#111827] dark:text-white mt-4">Foundation</span>
                </div>
                <div className="flex flex-col items-center gap-3 w-1/4">
                  <div className="w-8 h-8 rounded-full bg-white dark:bg-[#111827] border-4 border-black/5 dark:border-white/5 flex items-center justify-center z-10 mt-1"></div>
                  <span className="text-sm font-semibold text-[#6B7280] mt-4">Concept Building</span>
                </div>
                <div className="flex flex-col items-center gap-3 w-1/4">
                  <div className="w-8 h-8 rounded-full bg-white dark:bg-[#111827] border-4 border-black/5 dark:border-white/5 flex items-center justify-center z-10 mt-1"></div>
                  <span className="text-sm font-semibold text-[#6B7280] mt-4">Mocks</span>
                </div>
                <div className="flex flex-col items-center gap-3 w-1/4">
                  <div className="w-8 h-8 rounded-full bg-white dark:bg-[#111827] border-4 border-black/5 dark:border-white/5 flex items-center justify-center z-10 mt-1"></div>
                  <span className="text-sm font-semibold text-[#6B7280] mt-4">Revision</span>
                </div>
              </div>
            </div>

            {/* Active Phase Details */}
            <div className="bg-gradient-to-r from-[#2563EB]/5 to-[#7C3AED]/5 border border-[#2563EB]/10 rounded-2xl p-6 mt-4 max-w-[1000px] mx-auto w-full flex flex-col md:flex-row items-center gap-6 md:gap-10">
              <div className="flex-1 space-y-2 text-center md:text-left">
                <h3 className="text-xl font-bold text-[#111827] dark:text-white">
  {studyPlan?.roadmap?.split("\n")[0] || "Study Roadmap"}
</h3>
                <p className="text-sm font-medium text-[#6B7280] max-w-xl whitespace-pre-wrap">
  {studyPlan?.roadmap || "No roadmap available."}
</p>
              </div>
              <div className="flex items-center gap-8 shrink-0">
                <div className="flex flex-col text-center md:text-right">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280] mb-1">Completion</span>
                  <span className="text-2xl font-black text-[#2563EB]">{progress.toFixed(0)}%</span>
                </div>
                <div className="w-px h-10 bg-black/10 dark:bg-white/10 hidden md:block"></div>
                <div className="flex flex-col text-center md:text-right">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280] mb-1">Estimated Completion Date</span>
                  <span className="text-lg font-bold text-[#111827] dark:text-white">{studyPlan?.examdate
  ? new Date(studyPlan.examdate).toLocaleDateString()
  : "Not Available"}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* MAIN GRID */}
        <div className="grid lg:grid-cols-12 gap-6 pt-4">
          
          {/* LEFT COLUMN: EXECUTION & STRATEGY */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* SECTION 4: TODAY'S MISSION */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pl-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-[#10B981]/10 flex items-center justify-center">
                    <Target className="w-3.5 h-3.5 text-[#10B981]" />
                  </div>
                  <h2 className="text-sm font-bold text-[#111827] dark:text-white uppercase tracking-widest">Today's Mission</h2>
                </div>
              </div>

              <div className={glassCardClass}>
                {/* Summary Card inside Mission */}
                <div className="p-6 bg-gradient-to-r from-black/5 to-transparent dark:from-white/5 border-b border-black/5 dark:border-white/5 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-6">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280] mb-1">Total Tasks</span>
                      <span className="text-xl font-black text-[#111827] dark:text-white">
  {studyPlan?.dailytasks
    ? studyPlan.dailytasks
        .split("\n")
        .filter((t: string) => t.trim()).length
    : 0}
</span>
                    </div>
                    <div className="w-px h-8 bg-black/10 dark:bg-white/10"></div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280] mb-1">Total Time</span>
                      <span className="text-xl font-black text-[#111827] dark:text-white">
  {wizardData.dailyHours ?? 3}h
</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-[#10B981]/10 px-4 py-2 rounded-xl border border-[#10B981]/20">
                    <TrendingUp className="w-4 h-4 text-[#10B981]" />
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#10B981]">Expected Gain</span>
                      <span className="text-sm font-black text-[#10B981]">{progress < 100
  ? `+${Math.max(1, Math.round((100 - progress) / 20))}% Progress`
  : "Goal Achieved"}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  {/* Priority Tasks */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#6B7280] flex items-center gap-2">
                      <Zap className="w-3.5 h-3.5 text-[#E11D48]" /> Priority Tasks
                    </h3>
                    <div className="grid gap-3">
                      {priorityTasks.map((task : any) => renderTask(task, true))}
                    </div>
                  </div>

                  {/* Secondary Tasks */}
                  <div className="space-y-3 pt-4 border-t border-black/5 dark:border-white/5">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#6B7280] flex items-center gap-2">
                      <ListTodo className="w-3.5 h-3.5" /> Secondary Tasks
                    </h3>
                    <div className="grid gap-3">
                      {secondaryTasks.map((task : any)=> renderTask(task, false))}
                    </div>
                  </div>
                </div>
              </div>
            </div>


<div className={glassCardClass + " p-6"}>
  <h2 className="text-xl font-bold mb-4">
    AI Generated Study Plan
  </h2>

  <div className="space-y-6">

    <div>
      <h3 className="font-semibold">Roadmap</h3>
      <p>{studyPlan?.roadmap}</p>
    </div>

    <div>
      <h3 className="font-semibold">Monthly Plan</h3>
      <pre className="whitespace-pre-wrap">
        {studyPlan?.monthlyplan}
      </pre>
    </div>

    <div>
      <h3 className="font-semibold">Weekly Plan</h3>
      <pre className="whitespace-pre-wrap">
        {studyPlan?.weeklyplan}
      </pre>
    </div>

    <div>
      <h3 className="font-semibold">Daily Tasks</h3>
      <pre className="whitespace-pre-wrap">
        {studyPlan?.dailytasks}
      </pre>
    </div>

    <div>
      <h3 className="font-semibold">Revision Plan</h3>
      <pre className="whitespace-pre-wrap">
        {studyPlan?.revisionplan}
      </pre>
    </div>

  </div>
</div>
            {/* SECTION 6: ROADMAP BREAKDOWN */}
            <div id="roadmap-breakdown" className="space-y-4 pt-2">
              <div className="flex items-center gap-2 pl-2">
                <div className="w-6 h-6 rounded-lg bg-[#F59E0B]/10 flex items-center justify-center">
                  <Map className="w-3.5 h-3.5 text-[#F59E0B]" />
                </div>
                <h2 className="text-sm font-bold text-[#111827] dark:text-white uppercase tracking-widest">Roadmap Breakdown</h2>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { phase: 'Phase 1', title: 'Foundation', start: 'Jun 2026', end: 'Aug 2026', color: '#2563EB', active: true, items: ['Arithmetic', 'Algebra', 'Reading Comprehension', 'Basic Data Interpretation & Logical Reasoning'] },
                  { phase: 'Phase 2', title: 'Concept Building', start: 'Aug 2026', end: 'Oct 2026', color: '#7C3AED', active: false, items: ['Advanced Quantitative Ability', 'Advanced Data Interpretation & Logical Reasoning', 'Reading Comprehension Strategy'] },
                  { phase: 'Phase 3', title: 'Mock Intensive', start: 'Oct 2026', end: 'Dec 2026', color: '#F59E0B', active: false, items: ['Mocks', 'Analysis', 'Weak Area Improvement'] },
                  { phase: 'Phase 4', title: 'Revision', start: 'Dec 2026', end: 'Jan 2027', color: '#10B981', active: false, items: ['Revision', 'Strategy', 'Exam Readiness'] },
                ].map((item, i) => (
                  <div key={i} className={`${glassCardClass} p-5 flex flex-col relative group hover:-translate-y-1 transition-transform duration-300`}>
                    {item.active && <div className="absolute inset-0 bg-gradient-to-br from-[#2563EB]/5 to-[#7C3AED]/5 opacity-100 z-0 rounded-[24px]"></div>}
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-md" style={{ color: item.color, backgroundColor: `${item.color}15` }}>{item.phase}</span>
                        <div className="text-[10px] font-bold text-[#6B7280] flex flex-col text-right">
                          <span>{item.start} -</span>
                          <span>{item.end}</span>
                        </div>
                      </div>
                      <h3 className="font-bold text-[#111827] dark:text-white mb-2">{item.title}</h3>
                      <ul className="text-xs text-[#6B7280] space-y-1.5 font-semibold">
                        {item.items.map((li, idx) => (
                          <li key={idx} className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-black/20 dark:bg-white/20"></div>{li}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: PROGRESS & RECOMMENDATIONS */}
          <div className="lg:col-span-5 space-y-6">

            {/* SECTION 3: WEEKLY FOCUS */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pl-2">
                <div className="w-6 h-6 rounded-lg bg-[#A855F7]/10 flex items-center justify-center">
                  <Calendar className="w-3.5 h-3.5 text-[#A855F7]" />
                </div>
                <h2 className="text-sm font-bold text-[#111827] dark:text-white uppercase tracking-widest">Weekly Focus</h2>
              </div>
              
              <div className={`${glassCardClass} p-6 space-y-5`}>
                {[
                  { name: 'Quantitative Ability', value: 55, current: '62/100', target: '80/100', color: '#2563EB', reason: 'Current score is below target. High weightage in upcoming phase.' },
                  { name: 'Data Interpretation & Logical Reasoning', value: 30, current: '45/100', target: '65/100', color: '#F59E0B', reason: 'Recent mock performance dropped. Needs arrangement practice.' },
                  { name: 'Verbal Ability & Reading Comprehension', value: 15, current: '75/100', target: '85/100', color: '#10B981', reason: 'On track. Maintain with light reading and occasional RC sets.' },
                ].map((sec, i) => (
                  <div key={i} className="bg-black/5 dark:bg-white/5 rounded-2xl p-4 border border-black/5 dark:border-white/5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${sec.color}15`, color: sec.color }}>
                          <BarChart className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-[#111827] dark:text-white">{sec.name}</h4>
                          <div className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280] flex gap-2">
                            <span>Current Score: {sec.current}</span>
                            <span>Target Score: {sec.target}</span>
                          </div>
                        </div>
                      </div>
                      <span className="text-lg font-black" style={{ color: sec.color }}>{sec.value}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden mb-3">
                      <div className="h-full rounded-full" style={{ width: `${sec.value}%`, backgroundColor: sec.color }}></div>
                    </div>
                    <p className="text-[11px] font-medium text-[#6B7280] leading-relaxed flex gap-2">
                      <Bot className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: sec.color }} />
                      {sec.reason}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 5: AI COACH */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-2 pl-2">
                <div className="w-6 h-6 rounded-lg bg-[#E11D48]/10 flex items-center justify-center">
                  <BrainCircuit className="w-3.5 h-3.5 text-[#E11D48]" />
                </div>
                <h2 className="text-sm font-bold text-[#111827] dark:text-white uppercase tracking-widest">AI Coach</h2>
              </div>
              
              <div className={`${glassCardClass} p-6 relative overflow-hidden group`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#E11D48]/10 blur-[50px] rounded-full group-hover:bg-[#E11D48]/20 transition-colors"></div>
                
                <div className="relative z-10 space-y-5">
                  <div className="flex items-center gap-4 border-b border-black/5 dark:border-white/5 pb-4">
                    <div className="flex-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280] block mb-1">Current Strength</span>
                      <span className="text-sm font-bold text-[#10B981] flex items-start gap-1.5"><TrendingUp className="w-3 h-3 mt-0.5 shrink-0" /> Verbal Ability & Reading Comprehension</span>
                    </div>
                    <div className="w-px min-h-[40px] bg-black/10 dark:bg-white/10"></div>
                    <div className="flex-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280] block mb-1">Current Weakness</span>
                      <span className="text-sm font-bold text-[#E11D48] flex items-start gap-1.5"><Activity className="w-3 h-3 mt-0.5 shrink-0" /> Data Interpretation & Logical Reasoning</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280] block mb-2">Highest Impact Action</span>
                    <p className="text-sm font-bold text-[#111827] dark:text-white leading-snug">Practice arrangement-based DILR sets focusing on multi-variable puzzles.</p>
                  </div>

                  <div className="bg-[#10B981]/10 border border-[#10B981]/20 rounded-xl p-3 flex items-center justify-between">
                    <span className="text-xs font-bold text-[#111827] dark:text-white">Expected Improvement</span>
                    <span className="text-sm font-black text-[#10B981]">+2.3 Percentile</span>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button onClick={() => { toast.success('Generating personalized practice set...'); setTimeout(() => toast.success('Practice set ready in your workspace!'), 2000); }} className="flex-1 bg-[#111827] hover:bg-[#111827]/90 dark:bg-white dark:hover:bg-white/90 dark:text-black text-white rounded-xl text-xs font-bold shadow-md px-2">
                      <FileText className="w-3.5 h-3.5 mr-1.5 shrink-0" /> Generate Practice Set
                    </Button>
                    <Button onClick={() => router.push('/catgpt')} variant="outline" className="flex-1 rounded-xl text-xs font-bold border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5">
                      <MessageSquare className="w-3.5 h-3.5 mr-1.5" /> Ask CATGPT
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 7: ROADMAP VERSIONS */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-2 pl-2">
                <div className="w-6 h-6 rounded-lg bg-[#6B7280]/10 flex items-center justify-center">
                  <History className="w-3.5 h-3.5 text-[#6B7280]" />
                </div>
                <h2 className="text-sm font-bold text-[#111827] dark:text-white uppercase tracking-widest">Roadmap Versions</h2>
              </div>
              
              <div className={`${glassCardClass} p-2`}>
                <div className="space-y-1">
                  {localHistory.map((plan) => (
                    <div key={plan.id} className="flex items-center justify-between hover:bg-black/5 dark:hover:bg-white/5 p-3 rounded-[16px] transition-colors group cursor-pointer">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-sm font-bold text-[#111827] dark:text-white">{plan.name}</h4>
                          <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${
                            plan.status === 'Active' ? 'bg-[#2563EB]/10 text-[#2563EB]' : 'bg-black/5 dark:bg-white/5 text-[#6B7280]'
                          }`}>
                            {plan.status}
                          </span>
                        </div>
                        <p className="text-[11px] font-semibold text-[#6B7280]">Generated {plan.date} • {plan.completion} Completed</p>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => setSelectedVersion(plan)} className="opacity-0 group-hover:opacity-100 text-xs font-bold text-[#2563EB] hover:text-[#2563EB] hover:bg-[#2563EB]/10 rounded-lg transition-opacity h-8 px-3">
                        View
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </motion.div>

      {/* RIGHT SIDE DRAWER FOR VERSION DETAILS */}
      <AnimatePresence>
        {selectedVersion && (
          <Dialog open={!!selectedVersion} onOpenChange={() => setSelectedVersion(null)}>
            <DialogContent className="fixed inset-y-0 right-0 left-auto w-full sm:w-[480px] h-full max-h-screen rounded-none bg-white/95 dark:bg-[#0A0A0A]/95 backdrop-blur-3xl border-l border-white/20 dark:border-white/10 p-0 m-0 shadow-[-20px_0_60px_rgba(0,0,0,0.1)] slide-in-from-right data-[state=closed]:slide-out-to-right duration-300">
              <div className="flex flex-col h-full overflow-hidden">
                <div className="p-6 border-b border-black/5 dark:border-white/5 flex items-center justify-between bg-gradient-to-r from-black/5 to-transparent dark:from-white/5">
                  <div>
                    <h2 className="text-xl font-black text-[#111827] dark:text-white mb-1">{selectedVersion.name}</h2>
                    <p className="text-xs font-semibold text-[#6B7280]">Generated {selectedVersion.date}</p>
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md ${
                    selectedVersion.status === 'Active' ? 'bg-[#2563EB]/10 text-[#2563EB]' : 'bg-black/10 dark:bg-white/10 text-[#6B7280]'
                  }`}>
                    {selectedVersion.status}
                  </span>
                </div>
                
                <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-black/5 dark:bg-white/5 p-4 rounded-2xl">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280] block mb-1">Target Exam</span>
                      <span className="text-sm font-bold text-[#111827] dark:text-white">{studyPlan?.targetexam}{" "}
{studyPlan?.examdate
  ? new Date(studyPlan.examdate).getFullYear()
  : ""}</span>
                    </div>
                    <div className="bg-black/5 dark:bg-white/5 p-4 rounded-2xl">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280] block mb-1">Target Percentile</span>
                      <span className="text-sm font-bold text-[#111827] dark:text-white">
  {studyPlan?.targetpercentile}+
</span>
                    </div>
                    <div className="bg-black/5 dark:bg-white/5 p-4 rounded-2xl col-span-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280] block mb-1">Target Colleges</span>
                      <span className="text-sm font-bold text-[#111827] dark:text-white">{studyPlan?.roadmap?.split("\n")[0] ?? "No Roadmap"}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#6B7280] pl-1 border-l-2 border-[#2563EB]">Weekly Allocation</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm font-bold"><span>Quantitative Ability</span><span className="text-[#2563EB]">55%</span></div>
                      <div className="flex items-center justify-between text-sm font-bold"><span className="truncate pr-2">Data Interpretation & Logical Reasoning</span><span className="text-[#F59E0B]">30%</span></div>
                      <div className="flex items-center justify-between text-sm font-bold"><span className="truncate pr-2">Verbal Ability & Reading Comprehension</span><span className="text-[#10B981]">15%</span></div>
                    </div>
                  </div>

                  <div className="space-y-3">
  <h3 className="text-xs font-bold uppercase tracking-wider text-[#6B7280] pl-1 border-l-2 border-[#7C3AED]">
    Roadmap Phases
  </h3>

  <div className="space-y-3 border-l-2 border-black/5 dark:border-white/5 ml-1 pl-4 py-1">
    {(
  studyPlan?.roadmap
    ?.split("\n")
    .filter((line: string) => line.trim())
    .slice(0, 5) ?? ["Generate your first AI roadmap"]
).map((phase: string, index: number) => (
  <div key={index} className="relative">
    <div
      className={`absolute w-2 h-2 rounded-full -left-[21px] top-1.5 ring-4 ring-white dark:ring-[#0A0A0A] ${
        index === 0 ? "bg-[#2563EB]" : "bg-[#6B7280]"
      }`}
    ></div>

    <h4 className="text-sm font-bold text-[#111827] dark:text-white">
      Phase {index + 1}
    </h4>

    <p className="text-xs font-medium text-[#6B7280]">
      {phase}
    </p>
  </div>
))}
  </div>
</div>

                  <div className="bg-[#2563EB]/5 border border-[#2563EB]/10 rounded-2xl p-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#2563EB] mb-2 flex items-center gap-1.5"><Bot className="w-3.5 h-3.5" /> AI Recommendations</h3>
                    <p className="text-xs font-medium text-[#111827] dark:text-white leading-relaxed">Focus heavily on arithmetic for the first two months. Incorporate 1 DILR set daily to build intuition before entering phase 2.</p>
                  </div>
                </div>

                <div className="p-6 border-t border-black/5 dark:border-white/5 bg-white dark:bg-[#0A0A0A] flex gap-3">
                  <Button variant="outline" onClick={() => setSelectedVersion(null)} className="flex-1 rounded-xl text-xs font-bold">Close</Button>
                  {selectedVersion.status !== 'Active' && (
                    <Button onClick={() => toast.success('Version restored')} className="flex-1 rounded-xl text-xs font-bold bg-[#2563EB] hover:bg-[#2563EB]/90 text-white">Restore Version</Button>
                  )}
                  {selectedVersion.status !== 'Active' && (
                    <Button onClick={() => {
                      toast.success('Version deleted');
                      setSelectedVersion(null);
                    }} variant="ghost" className="rounded-xl text-xs font-bold text-[#E11D48] hover:text-[#E11D48] hover:bg-[#E11D48]/10 px-4">Delete</Button>
                  )}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>

      {/* FULL SCREEN WIZARD MODAL */}
      <Dialog open={isWizardOpen} onOpenChange={(open) => { if(!isProcessing) { setIsWizardOpen(open); if (!open) setTimeout(() => { setWizardStep(1); setWizardData({...wizardData}); }, 300); } }}>
        <DialogContent className="!max-w-full !w-screen sm:!max-w-full sm:!w-screen !h-[100dvh] sm:!h-[100dvh] !m-0 !p-0 !rounded-none sm:!rounded-none bg-[#F6F8FC] dark:bg-[#0A0A0A] border-none overflow-y-auto flex flex-col hide-scrollbar">
          {isProcessing ? (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center h-full relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#2563EB] via-[#4F46E5] to-[#7C3AED] opacity-10"></div>
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                className="w-24 h-24 rounded-full border-[6px] border-[#2563EB]/20 border-t-[#2563EB] mb-8 relative z-10 mx-auto"
              />
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 space-y-3 mx-auto"
              >
                <h2 className="text-3xl font-black text-[#111827] dark:text-white">Generating Your AI Roadmap</h2>
                <p className="text-lg font-medium text-[#6B7280]">Analyzing profile, calculating Readiness Score, and structuring daily tasks...</p>
              </motion.div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col max-w-[800px] w-full mx-auto p-6 md:p-12 h-full">
              {/* Header */}
              <div className="flex items-center justify-between mb-8 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#7C3AED] flex items-center justify-center shadow-lg">
                    <Map className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-[#111827] dark:text-white leading-tight">Roadmap Wizard</h2>
                    <p className="text-sm font-semibold text-[#6B7280]">Step {wizardStep} of 6</p>
                  </div>
                </div>
                <Button variant="ghost" onClick={() => setIsWizardOpen(false)} className="rounded-full w-10 h-10 p-0 text-[#6B7280] hover:bg-black/5 dark:hover:bg-white/5">
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Progress Stepper */}
              <div className="flex gap-2 mb-12 shrink-0">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className={`h-1.5 flex-1 rounded-full ${i <= wizardStep ? 'bg-[#2563EB]' : 'bg-black/10 dark:bg-white/10'}`}></div>
                ))}
              </div>

              {/* Steps Content */}
              <div className="flex-1 overflow-y-auto hide-scrollbar pb-12">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={wizardStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-8"
                  >
                    {wizardStep === 1 && (
                      <div className="space-y-8">
                        <div>
                          <h3 className="text-3xl font-black text-[#111827] dark:text-white mb-3">What exam are you preparing for?</h3>
                          <p className="text-[#6B7280] font-medium text-lg">Select your target management entrance exam.</p>
                        </div>
                        <div className="space-y-4">
                          <Label className="text-sm font-bold text-[#111827] dark:text-white uppercase tracking-wider">Target Exam *</Label>
                          <div className="flex flex-wrap gap-3">
                            {['CAT', 'XAT', 'SNAP', 'NMAT', 'CMAT', 'GMAT'].map(exam => (
                              <button key={exam} onClick={() => setWizardData({...wizardData, targetExam: exam})}
                                className={`px-6 py-4 rounded-2xl border-2 font-bold text-lg transition-all ${wizardData.targetExam === exam ? 'border-[#2563EB] bg-[#2563EB]/10 text-[#2563EB]' : 'border-black/5 dark:border-white/5 bg-white dark:bg-[#111827] text-[#6B7280] hover:border-black/10 dark:hover:border-white/10'}`}>
                                {exam}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-4 pt-4">
                          <Label className="text-sm font-bold text-[#111827] dark:text-white uppercase tracking-wider">Attempt Year *</Label>
                          <div className="flex flex-wrap gap-3">
                            {['2026', '2027', '2028'].map(year => (
                              <button key={year} onClick={() => setWizardData({...wizardData, attemptYear: year})}
                                className={`px-6 py-4 rounded-2xl border-2 font-bold text-lg transition-all ${wizardData.attemptYear === year ? 'border-[#2563EB] bg-[#2563EB]/10 text-[#2563EB]' : 'border-black/5 dark:border-white/5 bg-white dark:bg-[#111827] text-[#6B7280] hover:border-black/10 dark:hover:border-white/10'}`}>
                                {year}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {wizardStep === 2 && (
                      <div className="space-y-8">
                        <div>
                          <h3 className="text-3xl font-black text-[#111827] dark:text-white mb-3">What is your target outcome?</h3>
                          <p className="text-[#6B7280] font-medium text-lg">Define your goal percentile and dream colleges.</p>
                        </div>
                        <div className="space-y-4">
                          <Label className="text-sm font-bold text-[#111827] dark:text-white uppercase tracking-wider">Target Percentile *</Label>
                          <div className="flex flex-wrap gap-3">
                            {['90+', '95+', '98+', '99+', '99.5+'].map(pct => (
                              <button key={pct} onClick={() => setWizardData({...wizardData, targetPercentile: pct})}
                                className={`px-5 py-3 rounded-2xl border-2 font-bold transition-all ${wizardData.targetPercentile === pct ? 'border-[#2563EB] bg-[#2563EB]/10 text-[#2563EB]' : 'border-black/5 dark:border-white/5 bg-white dark:bg-[#111827] text-[#6B7280] hover:border-black/10 dark:hover:border-white/10'}`}>
                                {pct}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-4 pt-4">
                          <Label className="text-sm font-bold text-[#111827] dark:text-white uppercase tracking-wider">Target Colleges (Multi Select) *</Label>
                          <div className="flex flex-wrap gap-2">
                            {['IIM Ahmedabad', 'IIM Bangalore', 'IIM Calcutta', 'SPJIMR', 'FMS', 'MDI', 'IIFT', 'IMT', 'TAPMI', 'IMI'].map(col => {
                              const isSelected = wizardData.targetColleges.includes(col);
                              return (
                                <button key={col} onClick={() => {
                                  const newColleges = isSelected ? wizardData.targetColleges.filter(c => c !== col) : [...wizardData.targetColleges, col];
                                  setWizardData({...wizardData, targetColleges: newColleges});
                                }}
                                  className={`px-4 py-2.5 rounded-xl border-2 font-bold text-sm transition-all flex items-center gap-2 ${isSelected ? 'border-[#7C3AED] bg-[#7C3AED]/10 text-[#7C3AED]' : 'border-black/5 dark:border-white/5 bg-white dark:bg-[#111827] text-[#6B7280] hover:border-black/10 dark:hover:border-white/10'}`}>
                                  {isSelected && <Check className="w-3.5 h-3.5" />} {col}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}

                    {wizardStep === 3 && (
                      <div className="space-y-8">
                        <div>
                          <h3 className="text-3xl font-black text-[#111827] dark:text-white mb-3">Assess your current readiness.</h3>
                          <p className="text-[#6B7280] font-medium text-lg">Be honest. This helps the AI calibrate your starting point.</p>
                        </div>
                        
                        <div className="space-y-8 bg-white dark:bg-[#111827] border border-black/5 dark:border-white/5 rounded-3xl p-6 md:p-8">
                          {[
                            { label: 'Quant Level', key: 'quantLevel' as const, color: '#2563EB' },
                            { label: 'DILR Level', key: 'dilrLevel' as const, color: '#F59E0B' },
                            { label: 'VARC Level', key: 'varcLevel' as const, color: '#10B981' }
                          ].map(item => (
                            <div key={item.key} className="space-y-3">
                              <div className="flex items-center justify-between">
                                <Label className="text-sm font-bold text-[#111827] dark:text-white">{item.label} *</Label>
                                <span className="text-sm font-black" style={{ color: item.color }}>{wizardData[item.key]} / 100</span>
                              </div>
                              <input 
                                type="range" min="0" max="100" 
                                value={wizardData[item.key]} 
                                onChange={(e) => setWizardData({...wizardData, [item.key]: parseInt(e.target.value)})}
                                className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-black/10 dark:bg-white/10"
                                style={{ accentColor: item.color }}
                              />
                            </div>
                          ))}
                          
                          <div className="pt-4 border-t border-black/5 dark:border-white/5 space-y-3">
                            <Label className="text-sm font-bold text-[#111827] dark:text-white">Latest Mock Percentile (Optional)</Label>
                            <Input 
                              type="number" 
                              placeholder="e.g. 75" 
                              value={wizardData.mockPercentile}
                              onChange={(e) => setWizardData({...wizardData, mockPercentile: e.target.value})}
                              className="bg-black/5 dark:bg-white/5 rounded-xl h-12 text-[#111827] dark:text-white border-transparent focus:border-[#7F77DD] focus:ring-[#7F77DD] placeholder:text-[#6B7280] max-w-[200px] text-lg font-bold" 
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {wizardStep === 4 && (
                      <div className="space-y-8">
                        <div>
                          <h3 className="text-3xl font-black text-[#111827] dark:text-white mb-3">How much time can you dedicate?</h3>
                          <p className="text-[#6B7280] font-medium text-lg">Tell us your availability so we can plan your daily workload.</p>
                        </div>
                        
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <Label className="text-sm font-bold text-[#111827] dark:text-white uppercase tracking-wider">Daily Study Hours *</Label>
                            <div className="flex flex-wrap gap-2">
                              {['1', '2', '3', '4', '5', '6+'].map(hr => (
                                <button key={hr} onClick={() => setWizardData({...wizardData, dailyHours: hr})}
                                  className={`w-14 h-14 rounded-2xl border-2 font-bold text-lg transition-all flex items-center justify-center ${wizardData.dailyHours === hr ? 'border-[#2563EB] bg-[#2563EB]/10 text-[#2563EB]' : 'border-black/5 dark:border-white/5 bg-white dark:bg-[#111827] text-[#6B7280] hover:border-black/10 dark:hover:border-white/10'}`}>
                                  {hr}
                                </button>
                              ))}
                            </div>
                          </div>
                          
                          <div className="space-y-4 pt-4">
                            <Label className="text-sm font-bold text-[#111827] dark:text-white uppercase tracking-wider">Weekly Study Days *</Label>
                            <div className="flex gap-2">
                              {['5', '6', '7'].map(day => (
                                <button key={day} onClick={() => setWizardData({...wizardData, weeklyDays: day})}
                                  className={`w-14 h-14 rounded-2xl border-2 font-bold text-lg transition-all flex items-center justify-center ${wizardData.weeklyDays === day ? 'border-[#7C3AED] bg-[#7C3AED]/10 text-[#7C3AED]' : 'border-black/5 dark:border-white/5 bg-white dark:bg-[#111827] text-[#6B7280] hover:border-black/10 dark:hover:border-white/10'}`}>
                                  {day}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-4 pt-4">
                            <Label className="text-sm font-bold text-[#111827] dark:text-white uppercase tracking-wider">Work Status *</Label>
                            <div className="flex flex-wrap gap-3">
                              {['Student', 'Working Professional'].map(status => (
                                <button key={status} onClick={() => setWizardData({...wizardData, workStatus: status})}
                                  className={`px-6 py-4 rounded-2xl border-2 font-bold text-sm transition-all ${wizardData.workStatus === status ? 'border-[#F59E0B] bg-[#F59E0B]/10 text-[#F59E0B]' : 'border-black/5 dark:border-white/5 bg-white dark:bg-[#111827] text-[#6B7280] hover:border-black/10 dark:hover:border-white/10'}`}>
                                  {status}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {wizardStep === 5 && (
                      <div className="space-y-8">
                        <div>
                          <h3 className="text-3xl font-black text-[#111827] dark:text-white mb-3">Identify your biggest challenges.</h3>
                          <p className="text-[#6B7280] font-medium text-lg">We will allocate extra time to these areas.</p>
                        </div>

                        <div className="space-y-4">
                          <Label className="text-sm font-bold text-[#111827] dark:text-white uppercase tracking-wider">Weak Sections (Multi Select) *</Label>
                          <div className="flex flex-wrap gap-3">
                            {['Quantitative Ability', 'Data Interpretation & Logical Reasoning', 'Verbal Ability & Reading Comprehension'].map(sec => {
                              const isSelected = wizardData.weakSections.includes(sec);
                              return (
                                <button key={sec} onClick={() => {
                                  const newSec = isSelected ? wizardData.weakSections.filter(s => s !== sec) : [...wizardData.weakSections, sec];
                                  setWizardData({...wizardData, weakSections: newSec});
                                }}
                                  className={`px-4 py-3 rounded-2xl border-2 font-bold text-sm lg:text-base transition-all flex items-center gap-2 ${isSelected ? 'border-[#E11D48] bg-[#E11D48]/10 text-[#E11D48]' : 'border-black/5 dark:border-white/5 bg-white dark:bg-[#111827] text-[#6B7280] hover:border-black/10 dark:hover:border-white/10'}`}>
                                  {isSelected && <Check className="w-5 h-5" />} {sec}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        <div className="space-y-4 pt-4">
                          <Label className="text-sm font-bold text-[#111827] dark:text-white uppercase tracking-wider">Weak Topics (Multi Select)</Label>
                          <div className="flex flex-wrap gap-2">
                            {['Arithmetic', 'Algebra', 'Geometry', 'Number System', 'Arrangements', 'Puzzles', 'Reading Comprehension', 'Vocabulary'].map(topic => {
                              const isSelected = wizardData.weakTopics.includes(topic);
                              return (
                                <button key={topic} onClick={() => {
                                  const newTopic = isSelected ? wizardData.weakTopics.filter(t => t !== topic) : [...wizardData.weakTopics, topic];
                                  setWizardData({...wizardData, weakTopics: newTopic});
                                }}
                                  className={`px-4 py-2.5 rounded-xl border-2 font-bold text-sm transition-all flex items-center gap-2 ${isSelected ? 'border-[#E11D48] bg-[#E11D48]/10 text-[#E11D48]' : 'border-black/5 dark:border-white/5 bg-white dark:bg-[#111827] text-[#6B7280] hover:border-black/10 dark:hover:border-white/10'}`}>
                                  {isSelected && <Check className="w-3.5 h-3.5" />} {topic}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}

                    {wizardStep === 6 && (
                      <div className="space-y-8">
                        <div>
                          <h3 className="text-3xl font-black text-[#111827] dark:text-white mb-3">Review & Generate</h3>
                          <p className="text-[#6B7280] font-medium text-lg">Verify your choices before we generate your customized strategy.</p>
                        </div>
                        
                        <div className="grid sm:grid-cols-2 gap-4 bg-white dark:bg-[#111827] border border-black/5 dark:border-white/5 rounded-3xl p-6 md:p-8">
                          <div className="space-y-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">Target Exam</span>
                            <p className="text-sm font-bold text-[#111827] dark:text-white">{wizardData.targetExam} {wizardData.attemptYear}</p>
                          </div>
                          <div className="space-y-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">Target Percentile</span>
                            <p className="text-sm font-bold text-[#2563EB]">{wizardData.targetPercentile}</p>
                          </div>
                          <div className="space-y-1 sm:col-span-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">Target Colleges</span>
                            <p className="text-sm font-bold text-[#111827] dark:text-white">{wizardData.targetColleges.length ? wizardData.targetColleges.join(', ') : 'None selected'}</p>
                          </div>
                          <div className="space-y-1 sm:col-span-2 pt-4 border-t border-black/5 dark:border-white/5">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280] mb-2 block">Current Scores</span>
                            <div className="flex flex-col gap-2">
                              <span className="text-xs font-bold bg-[#2563EB]/10 text-[#2563EB] px-3 py-1.5 rounded-lg border border-[#2563EB]/20">Quantitative Ability: {wizardData.quantLevel}</span>
                              <span className="text-xs font-bold bg-[#F59E0B]/10 text-[#F59E0B] px-3 py-1.5 rounded-lg border border-[#F59E0B]/20">Data Interpretation & Logical Reasoning: {wizardData.dilrLevel}</span>
                              <span className="text-xs font-bold bg-[#10B981]/10 text-[#10B981] px-3 py-1.5 rounded-lg border border-[#10B981]/20">Verbal Ability & Reading Comprehension: {wizardData.varcLevel}</span>
                            </div>
                          </div>
                          <div className="space-y-1 pt-4 border-t border-black/5 dark:border-white/5">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">Study Availability</span>
                            <p className="text-sm font-bold text-[#111827] dark:text-white">{wizardData.dailyHours} hours per day, {wizardData.weeklyDays} days per week</p>
                          </div>
                          <div className="space-y-1 pt-4 border-t border-black/5 dark:border-white/5">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">Weak Areas</span>
                            <p className="text-sm font-bold text-[#E11D48]">{wizardData.weakSections.length ? wizardData.weakSections.join(', ') : 'None'}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Footer Actions */}
              <div className="flex gap-4 pt-6 mt-auto bg-[#F6F8FC] dark:bg-[#0A0A0A] border-t border-black/5 dark:border-white/5 relative z-20 shrink-0">
                {wizardStep > 1 && (
                  <Button variant="outline" onClick={() => setWizardStep(wizardStep - 1)} className="rounded-2xl h-14 px-8 font-bold text-lg border-2 border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5">
                    Back
                  </Button>
                )}
                {wizardStep < 6 ? (
  <Button
    onClick={() => setWizardStep((prev) => prev + 1)}
    className="flex-1 rounded-2xl h-14 font-bold text-lg bg-[#2563EB] hover:bg-[#2563EB]/90 text-white shadow-xl shadow-[#2563EB]/20"
  >
    Continue <ArrowRight className="ml-2 w-5 h-5" />
  </Button>
) : (
                  <Button onClick={generateStudyPlan} className="flex-1 rounded-2xl h-14 font-bold text-lg bg-gradient-to-r from-[#2563EB] to-[#7C3AED] hover:opacity-90 text-white shadow-xl shadow-[#7C3AED]/30">
                    Generate Roadmap
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
