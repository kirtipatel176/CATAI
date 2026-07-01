"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Play, 
  BookOpen, 
  Clock, 
  Lock,
  ChevronRight,
  ChevronLeft
} from "lucide-react";
import { cn } from "@/lib/utils";
import { mockApi } from "@/lib/mock-api";

const FULL_MOCKS = [
  { id: 1, name: "CAT Mock 01", questions: 66, duration: 120, difficulty: "Medium", attemptCount: 1, status: "Completed", score: "91.4" },
  { id: 2, name: "CAT Mock 02", questions: 66, duration: 120, difficulty: "Hard", attemptCount: 0, status: "Resume" },
  { id: 3, name: "CAT Mock 03", questions: 66, duration: 120, difficulty: "Medium", attemptCount: 0, status: "Start" },
  { id: 4, name: "CAT Mock 04", questions: 66, duration: 120, difficulty: "Easy", attemptCount: 0, status: "Locked" },
  { id: 5, name: "CAT Mock 05", questions: 66, duration: 120, difficulty: "Hard", attemptCount: 0, status: "Locked" },
  { id: 6, name: "CAT Mock 06", questions: 66, duration: 120, difficulty: "Medium", attemptCount: 0, status: "Locked" },
];

const SECTIONALS = [
  { id: "varc-1", name: "VARC Foundation", questions: 24, duration: 40, difficulty: "Easy" },
  { id: "varc-2", name: "VARC Advanced", questions: 24, duration: 40, difficulty: "Hard" },
  { id: "dilr-1", name: "DILR Arrangement", questions: 20, duration: 40, difficulty: "Medium" },
  { id: "dilr-2", name: "DILR Puzzles", questions: 20, duration: 40, difficulty: "Hard" },
  { id: "qa-1", name: "QA Arithmetic", questions: 22, duration: 40, difficulty: "Easy" },
  { id: "qa-2", name: "QA Geometry", questions: 22, duration: 40, difficulty: "Medium" },
];

const TOPICS = [
  { id: "arithmetic-1", name: "Percentages", questions: 15, duration: 25, difficulty: "Easy" },
  { id: "arithmetic-2", name: "Time & Work", questions: 15, duration: 25, difficulty: "Medium" },
  { id: "algebra-1", name: "Linear Equations", questions: 15, duration: 25, difficulty: "Easy" },
  { id: "algebra-2", name: "Quadratic Equations", questions: 15, duration: 25, difficulty: "Hard" },
  { id: "geometry-1", name: "Triangles", questions: 15, duration: 25, difficulty: "Medium" },
  { id: "modern-1", name: "P&C", questions: 15, duration: 25, difficulty: "Hard" },
];

const HorizontalSection = ({ title, items, renderItem }: { title: string, items: any[], renderItem: (item: any) => React.ReactNode }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === "left" ? -400 : 400, behavior: "smooth" });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-2">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">{title}</h2>
        <div className="flex items-center gap-2">
          <button onClick={() => scroll("left")} className="p-2 rounded-full bg-white/50 hover:bg-white text-gray-800 transition-colors shadow-sm">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={() => scroll("right")} className="p-2 rounded-full bg-white/50 hover:bg-white text-gray-800 transition-colors shadow-sm">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto gap-6 pb-8 pt-4 px-2 snap-x snap-mandatory hide-scrollbar"
      >
        {items.map((item, i) => (
          <div key={item.id} className="snap-start shrink-0">
            {renderItem(item)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default function MocksLibraryPage() {
  const [mounted, setMounted] = useState(false);
  const [fullMocks, setFullMocks] = useState(FULL_MOCKS);

useEffect(() => {
  setMounted(true);

  const loadMocks = async () => {
    try {
      const history = await mockApi.history();

      if (history.length > 0) {
        const mapped = history.map((mock: any) => ({
  id: mock.id,
  name: mock.testName,
  questions: 66,
  duration: 120,
  difficulty:
    mock.overallPercentile >= 95
      ? "Hard"
      : mock.overallPercentile >= 80
      ? "Medium"
      : "Easy",
  attemptCount: 1,
  status:
    mock.overallPercentile
      ? "Completed"
      : "Start",
  score: mock.overallPercentile ?? "",
}));

        setFullMocks(mapped);
      }
    } catch (err) {
      console.error(err);
    }
  };

  loadMocks();
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
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">Mock Library</h1>
        <p className="text-xl text-gray-500 font-medium">Your premium assessment environment.</p>
      </motion.div>

      {/* FULL CAT MOCKS */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <HorizontalSection
          title="Full CAT Mocks"
          items={fullMocks}
          renderItem={(mock) => (
            <Link href={`/mocks/${mock.id}${mock.status === "Completed" ? "/result" : "/exam"}`} className="block group">
              <div className="w-[320px] md:w-[400px] h-[260px] relative rounded-[28px] overflow-hidden bg-white/40 backdrop-blur-2xl border border-white/60 shadow-apple-soft transition-all duration-500 group-hover:scale-[1.03] group-hover:shadow-2xl">
                
                {/* Background Gradient Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-colors duration-500" />
                
                {mock.status === "Locked" && (
                  <div className="absolute inset-0 bg-white/60 backdrop-blur-md z-20 flex flex-col items-center justify-center">
                    <Lock className="w-10 h-10 text-gray-400 mb-2" />
                    <span className="text-gray-500 font-semibold uppercase tracking-widest text-sm">Locked</span>
                  </div>
                )}

                <div className="p-8 h-full flex flex-col relative z-10">
                  <div className="flex justify-between items-start mb-auto">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 tracking-tight">{mock.name}</h3>
                      <p className="text-sm font-semibold uppercase tracking-widest text-gray-400 mt-1">{mock.difficulty}</p>
                    </div>
                    {mock.status === "Completed" && (
                      <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                        {mock.score} %ile
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5 text-gray-600 font-medium bg-white/50 px-3 py-1.5 rounded-xl border border-white/80 shadow-sm">
                        <BookOpen className="w-4 h-4" />
                        {mock.questions} Qs
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-600 font-medium bg-white/50 px-3 py-1.5 rounded-xl border border-white/80 shadow-sm">
                        <Clock className="w-4 h-4" />
                        {mock.duration}m
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 font-medium text-sm">Attempts: {mock.attemptCount}</span>
                      <button className={cn(
                        "flex items-center gap-2 px-5 py-2.5 rounded-2xl font-semibold transition-transform active:scale-95",
                        mock.status === "Resume" ? "bg-orange-100 text-orange-700" :
                        mock.status === "Completed" ? "bg-gray-100 text-gray-700" :
                        "bg-gray-900 text-white"
                      )}>
                        {mock.status !== "Completed" && <Play className="w-4 h-4" fill="currentColor" />}
                        {mock.status}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          )}
        />
      </motion.div>

      {/* SECTIONAL TESTS */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <HorizontalSection
          title="Sectional Tests"
          items={SECTIONALS}
          renderItem={(test) => (
            <Link href={`/practice`} className="block group">
              <div className="w-[280px] md:w-[340px] h-[200px] relative rounded-[24px] overflow-hidden bg-white/40 backdrop-blur-2xl border border-white/60 shadow-apple-soft transition-all duration-500 group-hover:scale-[1.03] group-hover:shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 to-cyan-500/0 group-hover:from-indigo-500/10 group-hover:to-cyan-500/10 transition-colors duration-500" />
                <div className="p-6 h-full flex flex-col relative z-10">
                  <h3 className="text-xl font-bold text-gray-900 tracking-tight mb-1">{test.name}</h3>
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-auto">{test.difficulty}</p>
                  
                  <div className="flex items-center gap-3 text-sm text-gray-600 font-medium mt-auto">
                    <span className="bg-white/60 px-3 py-1.5 rounded-lg border border-white shadow-sm">{test.questions} Qs</span>
                    <span className="bg-white/60 px-3 py-1.5 rounded-lg border border-white shadow-sm">{test.duration}m</span>
                  </div>
                </div>
              </div>
            </Link>
          )}
        />
      </motion.div>

      {/* TOPIC TESTS */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <HorizontalSection
          title="Topic Tests"
          items={TOPICS}
          renderItem={(test) => (
            <Link href={`/practice`} className="block group">
              <div className="w-[240px] md:w-[280px] h-[160px] relative rounded-[20px] overflow-hidden bg-white/40 backdrop-blur-2xl border border-white/60 shadow-apple-soft transition-all duration-500 group-hover:scale-[1.05] group-hover:shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-rose-500/0 group-hover:from-orange-500/10 group-hover:to-rose-500/10 transition-colors duration-500" />
                <div className="p-5 h-full flex flex-col justify-between relative z-10">
                  <h3 className="text-lg font-bold text-gray-900 tracking-tight leading-tight">{test.name}</h3>
                  
                  <div className="flex items-center justify-between w-full">
                    <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">{test.difficulty}</span>
                    <span className="bg-white/80 px-2 py-1 rounded text-xs font-bold text-gray-700 shadow-sm">{test.questions} Qs</span>
                  </div>
                </div>
              </div>
            </Link>
          )}
        />
      </motion.div>

    </div>
  );
}
