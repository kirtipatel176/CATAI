"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer 
} from "recharts";
import { 
  Brain, 
  Target, 
  TrendingUp, 
  TrendingDown, 
  BookOpen, 
  Calculator, 
  BrainCircuit,
  Sparkles
} from "lucide-react";

const radarData = [
  { subject: 'Arithmetic', A: 40, fullMark: 100 },
  { subject: 'Algebra', A: 92, fullMark: 100 },
  { subject: 'Geometry', A: 85, fullMark: 100 },
  { subject: 'Numbers', A: 65, fullMark: 100 },
  { subject: 'Modern Math', A: 70, fullMark: 100 },
];

export default function AnalysisPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full flex flex-col gap-12 font-sans overflow-hidden">
      
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-2 px-2"
      >
        <div className="inline-flex items-center gap-2 bg-purple-50 px-4 py-1.5 rounded-full border border-purple-100 mb-2">
          <Brain className="w-4 h-4 text-purple-600" />
          <span className="text-sm font-bold uppercase tracking-widest text-purple-700">Mock Analysis</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">CAT Mock 03</h1>
        <p className="text-xl text-gray-500 font-medium">Deep dive into your performance metrics.</p>
      </motion.div>

      {/* AI SUMMARY COMPONENT */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <div className="relative overflow-hidden bg-white/60 backdrop-blur-3xl rounded-[32px] border border-white/80 p-10 shadow-apple-soft group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5" />
          <div className="absolute top-0 right-0 p-10 opacity-20 group-hover:scale-110 transition-transform duration-700 pointer-events-none">
            <Sparkles className="w-32 h-32 text-blue-600" />
          </div>

          <div className="relative z-10 flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center">
                <Brain className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">AI Analysis Summary</h2>
            </div>
            
            <p className="text-2xl text-gray-700 leading-snug font-medium max-w-4xl">
              You showed exceptional mastery in <span className="text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded-lg">Algebra</span> and <span className="text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded-lg">Geometry</span>, securing a 92% accuracy rate. However, your time management in <span className="text-orange-500 font-bold bg-orange-50 px-2 py-0.5 rounded-lg">Arithmetic</span> needs improvement, as you spent an average of 3.5 minutes per question.
            </p>
          </div>
        </div>
      </motion.section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* RADAR CHART */}
        <motion.section 
          className="lg:col-span-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="bg-white/60 backdrop-blur-3xl rounded-[32px] border border-white/80 p-8 shadow-apple-soft h-full flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                <Target className="w-5 h-5 text-purple-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 tracking-tight">Topic Mastery</h2>
            </div>
            
            <div className="flex-1 min-h-[300px] w-full relative -ml-4">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                  <PolarGrid stroke="#E5E7EB" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#6B7280', fontSize: 12, fontWeight: 600 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar
                    name="Student"
                    dataKey="A"
                    stroke="#8B5CF6"
                    strokeWidth={3}
                    fill="#8B5CF6"
                    fillOpacity={0.2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.section>

        {/* SECTION ANALYSIS & STRENGTHS/WEAKNESSES */}
        <motion.section 
          className="lg:col-span-2 space-y-8"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {/* Section Breakdown */}
          <div className="bg-white/60 backdrop-blur-3xl rounded-[32px] border border-white/80 p-8 shadow-apple-soft">
            <h2 className="text-xl font-bold text-gray-900 tracking-tight mb-8">Section Analysis</h2>
            
            <div className="space-y-8">
              {/* VARC */}
              <div>
                <div className="flex justify-between items-end mb-3">
                  <div className="flex items-center gap-3 font-bold text-lg text-gray-900">
                    <div className="p-2 rounded-lg bg-blue-100 text-blue-600"><BookOpen className="w-5 h-5" /></div>
                    VARC
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-2xl text-gray-900">32<span className="text-gray-400 text-lg"> / 72</span></div>
                  </div>
                </div>
                <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden border border-gray-200">
                  <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: '44%' }} 
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                    className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full" 
                  />
                </div>
              </div>

              {/* DILR */}
              <div>
                <div className="flex justify-between items-end mb-3">
                  <div className="flex items-center gap-3 font-bold text-lg text-gray-900">
                    <div className="p-2 rounded-lg bg-purple-100 text-purple-600"><BrainCircuit className="w-5 h-5" /></div>
                    DILR
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-2xl text-gray-900">28<span className="text-gray-400 text-lg"> / 60</span></div>
                  </div>
                </div>
                <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden border border-gray-200">
                  <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: '46%' }} 
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.6 }}
                    className="h-full bg-gradient-to-r from-purple-400 to-purple-600 rounded-full" 
                  />
                </div>
              </div>

              {/* QA */}
              <div>
                <div className="flex justify-between items-end mb-3">
                  <div className="flex items-center gap-3 font-bold text-lg text-gray-900">
                    <div className="p-2 rounded-lg bg-emerald-100 text-emerald-600"><Calculator className="w-5 h-5" /></div>
                    QA
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-2xl text-gray-900">12<span className="text-gray-400 text-lg"> / 66</span></div>
                  </div>
                </div>
                <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden border border-gray-200">
                  <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: '18%' }} 
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.7 }}
                    className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full" 
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Strong Areas */}
            <div className="bg-white/60 backdrop-blur-3xl rounded-[32px] border border-white/80 p-8 shadow-apple-soft">
              <h3 className="font-bold text-xl text-gray-900 tracking-tight mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                Strong Areas
              </h3>
              <div className="flex flex-wrap gap-3">
                <div className="px-5 py-2.5 rounded-2xl bg-white border border-green-200 text-green-700 font-semibold shadow-sm flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  Algebra (92%)
                </div>
                <div className="px-5 py-2.5 rounded-2xl bg-white border border-green-200 text-green-700 font-semibold shadow-sm flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  Geometry (85%)
                </div>
                <div className="px-5 py-2.5 rounded-2xl bg-white border border-green-200 text-green-700 font-semibold shadow-sm flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  DILR Puzzles (80%)
                </div>
              </div>
            </div>

            {/* Weak Areas */}
            <div className="bg-white/60 backdrop-blur-3xl rounded-[32px] border border-white/80 p-8 shadow-apple-soft">
              <h3 className="font-bold text-xl text-gray-900 tracking-tight mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                  <TrendingDown className="w-5 h-5 text-red-600" />
                </div>
                Weak Areas
              </h3>
              <div className="flex flex-wrap gap-3">
                <div className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 text-red-700 font-semibold shadow-sm flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  Arithmetic (40%)
                </div>
                <div className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 text-red-700 font-semibold shadow-sm flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  Time & Work (20%)
                </div>
              </div>
            </div>
          </div>

        </motion.section>
      </div>

    </div>
  );
}
