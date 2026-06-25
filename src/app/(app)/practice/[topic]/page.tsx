"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Clock, 
  Trophy,
  Target
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

// Mock questions for the topic
const getMockQuestions = (topic: string) => {
  return Array.from({ length: 15 }).map((_, i) => ({
    id: i + 1,
    text: `Sample question ${i + 1} for ${topic.replace(/-/g, ' ')}. This is a placeholder for a real CAT-level question.`,
    options: [
      "Option A is the most likely answer based on the given constraints.",
      "Option B provides an alternative perspective that might be correct.",
      "Option C is statistically the most common answer in such scenarios.",
      "Option D cannot be determined from the provided information."
    ],
    correctAnswer: i % 4, // 0, 1, 2, or 3
    type: i % 5 === 0 ? "TITA" : "MCQ"
  }));
};

export default function TopicPracticeQuiz() {
  const params = useParams();
  const router = useRouter();
  const topicId = params.topic as string;
  const topicName = topicId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  const [mounted, setMounted] = useState(false);
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | number>>({});
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    setQuestions(getMockQuestions(topicId));
    setMounted(true);
  }, [topicId]);

  useEffect(() => {
    if (!isSubmitted && mounted) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsSubmitted(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isSubmitted, mounted]);

  if (!mounted || questions.length === 0) return null;

  const currentQ = questions[currentQIndex];

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleOptionSelect = (optionIndex: number) => {
    if (isSubmitted) return;
    setAnswers(prev => ({ ...prev, [currentQ.id]: optionIndex }));
  };

  const handleTITAChange = (val: string) => {
    if (isSubmitted) return;
    setAnswers(prev => ({ ...prev, [currentQ.id]: val }));
  };

  const handleNext = () => {
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQIndex > 0) {
      setCurrentQIndex(prev => prev - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    let incorrect = 0;
    questions.forEach(q => {
      const ans = answers[q.id];
      if (ans !== undefined && ans !== "") {
        if (q.type === "MCQ") {
          if (ans === q.correctAnswer) correct++;
          else incorrect++;
        } else {
          // TITA dummy check
          if (ans === "100") correct++; // Just a dummy condition
        }
      }
    });
    return { correct, incorrect, unattempted: questions.length - (correct + incorrect), score: (correct * 3) - incorrect };
  };

  if (isSubmitted) {
    const stats = calculateScore();
    return (
      <div className="w-full flex flex-col gap-8 font-sans pb-32 max-w-4xl mx-auto pt-8 px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/80 backdrop-blur-xl border border-white rounded-[32px] p-8 md:p-12 shadow-2xl flex flex-col items-center text-center"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-lg">
            <Trophy className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-2">Practice Complete!</h1>
          <p className="text-xl text-gray-500 font-medium mb-8">Here is how you performed in {topicName}</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mb-8">
            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 flex flex-col items-center">
              <span className="text-3xl font-black text-gray-900">{stats.score}</span>
              <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Total Score</span>
            </div>
            <div className="bg-green-50 rounded-2xl p-4 border border-green-100 flex flex-col items-center">
              <span className="text-3xl font-black text-green-700">{stats.correct}</span>
              <span className="text-sm font-bold text-green-600 uppercase tracking-wider">Correct</span>
            </div>
            <div className="bg-red-50 rounded-2xl p-4 border border-red-100 flex flex-col items-center">
              <span className="text-3xl font-black text-red-700">{stats.incorrect}</span>
              <span className="text-sm font-bold text-red-600 uppercase tracking-wider">Incorrect</span>
            </div>
            <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100 flex flex-col items-center">
              <span className="text-3xl font-black text-blue-700">{Math.round((stats.correct / questions.length) * 100) || 0}%</span>
              <span className="text-sm font-bold text-blue-600 uppercase tracking-wider">Accuracy</span>
            </div>
          </div>

          <Link href="/practice" className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-800 transition-colors shadow-lg">
            Back to Practice Center
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col min-h-[calc(100vh-100px)] font-sans max-w-6xl mx-auto pb-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 px-4 shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/practice" className="w-12 h-12 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors shadow-sm shrink-0">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{topicName}</h1>
            <p className="text-base text-gray-500 font-medium">Topic Practice Test</p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-2xl border border-gray-200 shadow-sm w-fit">
          <Clock className={cn("w-6 h-6", timeLeft < 300 ? "text-red-500" : "text-blue-500")} />
          <span className={cn("font-bold text-xl tracking-widest", timeLeft < 300 ? "text-red-600" : "text-gray-900")}>
            {formatTime(timeLeft)}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-4 mb-8 shrink-0">
        <div className="flex justify-between text-sm font-bold text-gray-500 mb-3">
          <span className="uppercase tracking-widest">Question {currentQIndex + 1} of {questions.length}</span>
          <span>{Math.round(((currentQIndex + 1) / questions.length) * 100)}% Completed</span>
        </div>
        <div className="h-3 w-full bg-white border border-gray-200 rounded-full overflow-hidden shadow-inner">
          <motion.div 
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentQIndex + 1) / questions.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:flex-row gap-6 px-4">
        
        {/* Question Panel */}
        <div className="flex-1 bg-white/80 backdrop-blur-md border border-white rounded-[32px] p-6 md:p-10 shadow-apple-soft flex flex-col relative z-10">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg text-sm font-bold w-fit mb-8 border border-blue-100">
            <Target className="w-4 h-4" />
            {currentQ.type} FORMAT
          </div>
          
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900 leading-relaxed mb-10">
            {currentQ.text}
          </h2>

          <div className="space-y-4 mt-auto">
            {currentQ.type === "MCQ" ? (
              currentQ.options.map((opt: string, idx: number) => {
                const isSelected = answers[currentQ.id] === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handleOptionSelect(idx)}
                    className={cn(
                      "w-full text-left p-5 rounded-2xl border-2 transition-all flex items-start gap-4 group",
                      isSelected 
                        ? "border-blue-600 bg-blue-50/50 shadow-md scale-[1.01]" 
                        : "border-gray-100 bg-white hover:border-gray-300 hover:bg-gray-50 hover:shadow-sm"
                    )}
                  >
                    <div className={cn(
                      "w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors",
                      isSelected ? "border-blue-600 bg-blue-600" : "border-gray-300 group-hover:border-gray-400 bg-white"
                    )}>
                      {isSelected && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
                    </div>
                    <span className={cn("text-lg font-medium leading-relaxed", isSelected ? "text-blue-900" : "text-gray-700")}>
                      {opt}
                    </span>
                  </button>
                );
              })
            ) : (
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-widest">Type your answer</label>
                <input 
                  type="text" 
                  className="w-full max-w-md text-xl p-5 rounded-2xl border-2 border-gray-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition-all outline-none bg-white shadow-sm"
                  placeholder="Enter numerical value..."
                  value={(answers[currentQ.id] as string) || ""}
                  onChange={(e) => handleTITAChange(e.target.value)}
                />
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar - Navigation & Actions */}
        <div className="w-full lg:w-[340px] flex flex-col gap-6 shrink-0 relative z-10">
          
          {/* Question Grid */}
          <div className="bg-white/80 backdrop-blur-md border border-white rounded-[32px] p-6 shadow-apple-soft">
            <h3 className="font-bold text-gray-900 mb-5 tracking-tight text-lg">Question Palette</h3>
            <div className="grid grid-cols-5 gap-2.5">
              {questions.map((q, idx) => {
                const isAttempted = answers[q.id] !== undefined && answers[q.id] !== "";
                const isCurrent = currentQIndex === idx;
                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQIndex(idx)}
                    className={cn(
                      "w-full aspect-square rounded-xl text-sm font-bold flex items-center justify-center transition-all",
                      isCurrent ? "ring-4 ring-blue-200 border-blue-600 scale-110 z-10" : "border",
                      isAttempted 
                        ? "bg-blue-600 text-white border-blue-600 shadow-md" 
                        : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                    )}
                  >
                    {idx + 1}
                  </button>
                )
              })}
            </div>
            
            <div className="flex items-center gap-4 mt-6 pt-6 border-t border-gray-100 text-sm font-medium text-gray-500">
               <div className="flex items-center gap-2">
                 <div className="w-3 h-3 rounded-full bg-blue-600"></div> Attempted
               </div>
               <div className="flex items-center gap-2">
                 <div className="w-3 h-3 rounded-full bg-gray-200 border border-gray-300"></div> Unattempted
               </div>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white/80 backdrop-blur-md border border-white rounded-[32px] p-6 shadow-apple-soft mt-auto flex flex-col gap-3">
            <div className="flex gap-3">
              <button 
                onClick={handlePrev}
                disabled={currentQIndex === 0}
                className="flex-1 py-3.5 px-4 rounded-xl font-bold bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
              >
                Previous
              </button>
              <button 
                onClick={handleNext}
                disabled={currentQIndex === questions.length - 1}
                className="flex-1 py-3.5 px-4 rounded-xl font-bold bg-gray-900 text-white hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md"
              >
                Next
              </button>
            </div>
            
            <button 
              onClick={() => {
                if (window.confirm("Are you sure you want to submit the quiz?")) {
                  setIsSubmitted(true);
                }
              }}
              className="w-full py-4 rounded-xl font-black text-white bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 shadow-lg transition-all active:scale-[0.98] mt-3"
            >
              Submit Quiz
            </button>
          </div>
          
        </div>

      </div>
    </div>
  );
}
