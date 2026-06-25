"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Calculator } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock question data
const mockQuestions = Array.from({ length: 66 }).map((_, i) => ({
  id: i + 1,
  section: i < 24 ? "VARC" : i < 44 ? "DILR" : "QA",
  text: `This is a sample question ${i + 1} for the ${i < 24 ? "VARC" : i < 44 ? "DILR" : "QA"} section. The actual CAT exam questions will be displayed here with proper formatting, images, and complex mathematical equations if necessary.`,
  options: [
    "The primary purpose is to outline the historical evolution of the concept.",
    "The author intends to criticize the modern interpretation of the theory.",
    "It serves as a counter-argument to the previously established thesis.",
    "It provides a completely unrelated tangent to distract the reader."
  ],
  type: i % 5 === 0 ? "TITA" : "MCQ" // Every 5th question is TITA
}));

type QuestionStatus = "not_visited" | "not_answered" | "answered" | "marked_review" | "answered_review";

export default function ExamInterface() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120 * 60); // 120 minutes
  const [qStates, setQStates] = useState<Record<number, { status: QuestionStatus, answer: string }>>({});

  const currentQ = mockQuestions[currentQIndex];

  useEffect(() => {
    setMounted(true);
    // Add Arial font enforcement to body for this page only
    document.body.style.fontFamily = "Arial, sans-serif";
    return () => {
      document.body.style.fontFamily = "";
    };
  }, []);

  useEffect(() => {
    if (!qStates[currentQ.id]) {
      setQStates(prev => ({ ...prev, [currentQ.id]: { status: "not_answered", answer: "" } }));
    }
  }, [currentQ.id, qStates]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0) {
       return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleOptionSelect = (option: string) => {
    setQStates(prev => {
      const current = prev[currentQ.id] || { status: "not_answered" };
      return {
        ...prev,
        [currentQ.id]: { ...current, answer: option }
      };
    });
  };

  const handleTITAChange = (val: string) => {
    setQStates(prev => {
      const current = prev[currentQ.id] || { status: "not_answered" };
      return {
        ...prev,
        [currentQ.id]: { ...current, answer: val }
      };
    });
  }

  const saveAndNext = () => {
    setQStates(prev => {
      const current = prev[currentQ.id] || { status: "not_answered", answer: "" };
      let newStatus: QuestionStatus = "not_answered";
      if (current.answer) {
        newStatus = "answered";
      }
      return {
        ...prev,
        [currentQ.id]: { ...current, status: newStatus }
      };
    });
    
    if (currentQIndex < mockQuestions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
    }
  };

  const markForReviewAndNext = () => {
    setQStates(prev => {
      const current = prev[currentQ.id] || { status: "not_answered", answer: "" };
      let newStatus: QuestionStatus = "marked_review";
      if (current.answer) {
        newStatus = "answered_review";
      }
      return {
        ...prev,
        [currentQ.id]: { ...current, status: newStatus }
      };
    });
    
    if (currentQIndex < mockQuestions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
    }
  };

  const clearResponse = () => {
    setQStates(prev => ({
      ...prev,
      [currentQ.id]: { ...prev[currentQ.id], answer: "" } // Do not change status back to not visited immediately, usually stays not answered or marked.
    }));
  };

  const handleSubmit = () => {
    if(confirm("Are you sure you want to submit the exam?")) {
      router.push(`/mocks/1/result`);
    }
  };

  if (!mounted) return null;

  const currentSectionQuestions = mockQuestions.filter(q => q.section === currentQ.section);

  const stats = {
    answered: currentSectionQuestions.filter(q => qStates[q.id]?.status === "answered").length,
    not_answered: currentSectionQuestions.filter(q => qStates[q.id]?.status === "not_answered").length,
    not_visited: currentSectionQuestions.filter(q => !qStates[q.id] || qStates[q.id]?.status === "not_visited").length,
    marked_review: currentSectionQuestions.filter(q => qStates[q.id]?.status === "marked_review").length,
    answered_review: currentSectionQuestions.filter(q => qStates[q.id]?.status === "answered_review").length,
  };

  // Custom SVG shapes for TCS iON buttons
  const StatusIcon = ({ status, className, num }: { status: string, className?: string, num?: number | string }) => {
    if (status === "answered") {
      return (
        <div className={cn("relative w-9 h-8 flex items-center justify-center text-white font-bold text-sm", className)}>
          <svg className="absolute inset-0 w-full h-full text-[#24A148]" viewBox="0 0 36 32" fill="currentColor">
             <path d="M0,0 L36,0 L36,16 C36,24.8 28.8,32 20,32 L16,32 C7.2,32 0,24.8 0,16 L0,0 Z" />
          </svg>
          <span className="relative z-10">{num}</span>
        </div>
      )
    }
    if (status === "not_answered") {
      return (
        <div className={cn("relative w-9 h-8 flex items-center justify-center text-white font-bold text-sm", className)}>
          <svg className="absolute inset-0 w-full h-full text-[#DA1E28]" viewBox="0 0 36 32" fill="currentColor">
             <path d="M0,0 L36,0 L36,16 C36,24.8 28.8,32 20,32 L16,32 C7.2,32 0,24.8 0,16 L0,0 Z" />
          </svg>
          <span className="relative z-10">{num}</span>
        </div>
      )
    }
    if (status === "marked_review") {
      return (
        <div className={cn("relative w-9 h-9 rounded-full bg-[#6929C4] flex items-center justify-center text-white font-bold text-sm", className)}>
          {num}
        </div>
      )
    }
    if (status === "answered_review") {
      return (
        <div className={cn("relative w-9 h-9 rounded-full bg-[#6929C4] flex items-center justify-center text-white font-bold text-sm", className)}>
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#24A148] rounded-full border border-white z-20"></span>
          {num}
        </div>
      )
    }
    // not_visited
    return (
      <div className={cn("relative w-9 h-8 bg-[#E0E0E0] border border-[#C6C6C6] rounded-md flex items-center justify-center text-black font-bold text-sm", className)}>
        {num}
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col" style={{ fontFamily: "Arial, sans-serif" }}>
      
      {/* Top Black/Blue Header */}
      <header className="h-12 bg-[#2D2D2D] text-white flex items-center justify-between px-4 shrink-0 shadow-sm border-b-2 border-yellow-500">
        <div className="text-xl font-bold">CAT 2026</div>
      </header>

      {/* Secondary Header with Exam Info */}
      <div className="flex border-b border-[#C6C6C6] bg-white shrink-0">
        <div className="flex-1 flex items-end">
           <div className="flex w-full">
              {["VARC", "DILR", "QA"].map((sec) => (
                <div 
                  key={sec}
                  onClick={() => {
                    const firstIndex = mockQuestions.findIndex(q => q.section === sec);
                    if (firstIndex !== -1) setCurrentQIndex(firstIndex);
                  }}
                  className={cn(
                    "px-4 py-2 text-sm border-r border-[#C6C6C6] cursor-pointer font-bold",
                    currentQ.section === sec 
                      ? "text-white bg-[#1C4C81]" 
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  )}
                >
                  {sec}
                </div>
              ))}
           </div>
        </div>
        
        {/* Right Info Area */}
        <div className="w-[280px] shrink-0 flex items-center px-2 py-1 gap-2 border-l border-[#C6C6C6] bg-[#EAF1FB]">
           <div className="w-16 h-16 bg-gray-300 shrink-0 border border-gray-400">
             {/* Photo Placeholder */}
           </div>
           <div className="flex flex-col text-xs leading-tight">
             <span className="font-bold text-[#1C4C81]">Time Left: {formatTime(timeLeft)}</span>
             <span>Name: Kirti Patel</span>
           </div>
        </div>
      </div>

      {/* Third Header - Utility */}
      <div className="flex justify-between items-center px-2 py-1 border-b border-[#C6C6C6] bg-white shrink-0">
         <div className="flex items-center gap-4 text-xs font-bold text-[#1C4C81]">
           <span className="cursor-pointer hover:underline">Question Paper</span>
           <span className="cursor-pointer hover:underline">Instructions</span>
         </div>
         <div className="pr-[280px]">
           <button className="flex items-center gap-1 text-xs border border-gray-300 bg-gray-100 px-2 py-1 rounded">
             <Calculator className="w-4 h-4" /> Calculator
           </button>
         </div>
      </div>

      {/* Main Body */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Left: Question Area */}
        <div className="flex-1 flex flex-col overflow-hidden border-r border-[#C6C6C6]">
          
          <div className="bg-[#1C4C81] text-white px-2 py-1 font-bold text-sm flex justify-between">
            <span>Question No. {currentQ.id}</span>
            <span>Marks for correct answer 3 | Negative marks 1</span>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 text-sm leading-relaxed text-black">
            <p className="mb-4">{currentQ.text}</p>
            
            <div className="space-y-3 mt-8">
              {currentQ.type === "MCQ" ? (
                currentQ.options.map((opt, idx) => {
                  const isSelected = qStates[currentQ.id]?.answer === opt;
                  return (
                    <label key={idx} className="flex items-start gap-2 cursor-pointer group">
                      <input 
                        type="radio" 
                        name={`q-${currentQ.id}`} 
                        checked={isSelected}
                        onChange={() => handleOptionSelect(opt)}
                        className="mt-1 accent-[#1C4C81] cursor-pointer"
                      />
                      <span className="group-hover:text-blue-800">{opt}</span>
                    </label>
                  )
                })
              ) : (
                <div>
                   <input 
                     type="text" 
                     className="border border-[#C6C6C6] p-1 w-64 shadow-inner"
                     value={qStates[currentQ.id]?.answer || ""}
                     onChange={(e) => handleTITAChange(e.target.value)}
                   />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Question Palette Area */}
        <div className="w-[280px] flex flex-col shrink-0 bg-[#EAF1FB]">
          
          <div className="p-2 border-b border-[#C6C6C6]">
            <div className="grid grid-cols-2 gap-2 text-xs mb-2">
               <div className="flex items-center gap-1"><StatusIcon status="answered" num={stats.answered} className="w-6 h-6 text-xs scale-75 origin-left" /> Answered</div>
               <div className="flex items-center gap-1"><StatusIcon status="not_answered" num={stats.not_answered} className="w-6 h-6 text-xs scale-75 origin-left" /> Not Answered</div>
               <div className="flex items-center gap-1"><StatusIcon status="not_visited" num={stats.not_visited} className="w-6 h-6 text-xs scale-75 origin-left" /> Not Visited</div>
               <div className="flex items-center gap-1"><StatusIcon status="marked_review" num={stats.marked_review} className="w-6 h-6 text-xs scale-75 origin-left" /> Marked for Review</div>
            </div>
            <div className="flex items-start gap-1 text-xs">
               <StatusIcon status="answered_review" num={stats.answered_review} className="w-6 h-6 text-xs scale-75 origin-left shrink-0" /> 
               <span>Answered & Marked for Review (will be considered for evaluation)</span>
            </div>
          </div>

          <div className="bg-[#1C4C81] text-white px-2 py-1 font-bold text-sm">
            {currentQ.section}
          </div>

          <div className="flex-1 overflow-y-auto p-2 bg-[#EAF1FB]">
            <div className="grid grid-cols-4 gap-2">
              {currentSectionQuestions.map((q) => {
                const state = qStates[q.id]?.status || "not_visited";
                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      setCurrentQIndex(mockQuestions.findIndex(mq => mq.id === q.id));
                    }}
                    className="flex justify-center items-center p-1"
                  >
                     <StatusIcon status={state} num={q.id} className={currentQ.id === q.id ? "ring-2 ring-offset-1 ring-blue-500" : ""} />
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <footer className="h-12 border-t border-[#C6C6C6] flex items-center justify-between px-2 bg-white shrink-0 text-sm">
        <div className="flex gap-2">
          <button 
            onClick={markForReviewAndNext}
            className="border border-[#767676] bg-white hover:bg-gray-100 text-black px-3 py-1 font-bold rounded-sm shadow-sm"
          >
            Mark for Review & Next
          </button>
          <button 
            onClick={clearResponse}
            className="border border-[#767676] bg-white hover:bg-gray-100 text-black px-3 py-1 font-bold rounded-sm shadow-sm"
          >
            Clear Response
          </button>
        </div>
        
        <div className="flex gap-2">
          <button 
             onClick={handleSubmit}
             className="border border-[#767676] bg-[#E0E0E0] hover:bg-gray-300 text-black px-3 py-1 font-bold rounded-sm shadow-sm mr-4"
          >
            Submit
          </button>
          <button 
            onClick={saveAndNext}
            className="border border-[#1C4C81] bg-[#1C4C81] hover:bg-blue-800 text-white px-6 py-1 font-bold rounded-sm shadow-sm"
          >
            Save & Next
          </button>
        </div>
      </footer>

    </div>
  );
}
