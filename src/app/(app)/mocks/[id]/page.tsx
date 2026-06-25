"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  AlertTriangle, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  MinusCircle, 
  Calculator,
  Play
} from "lucide-react";
import { cn } from "@/lib/utils";

const colors = [
  { name: "Not Visited", color: "bg-gray-200 border-gray-300 text-gray-600" },
  { name: "Not Answered", color: "bg-red-100 border-red-500 text-red-700" },
  { name: "Answered", color: "bg-green-100 border-green-500 text-green-700" },
  { name: "Marked for Review", color: "bg-purple-100 border-purple-500 text-purple-700" },
  { name: "Answered + Review", color: "bg-purple-100 border-blue-500 border-2 text-purple-700" },
];

export default function ExamRulesPage() {
  const params = useParams();
  const id = params.id as string;

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8 pb-24">
      <div>
        <h1 className="text-3xl font-bold mb-2">CAT Exam Rules & Pattern</h1>
        <p className="text-muted-foreground text-lg">Please read these instructions carefully before starting the mock test.</p>
      </div>

      <div className="glass-panel p-8 rounded-3xl space-y-8">
        
        {/* CAT Pattern */}
        <section>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" /> CAT 2026 Pattern
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="glass-metric-card p-4">
              <div className="text-sm text-muted-foreground">Total Duration</div>
              <div className="text-xl font-bold">120 Min</div>
            </div>
            <div className="glass-metric-card p-4">
              <div className="text-sm text-muted-foreground">Total Questions</div>
              <div className="text-xl font-bold">66</div>
            </div>
            <div className="glass-metric-card p-4 md:col-span-2">
              <div className="text-sm text-muted-foreground">Section Locking</div>
              <div className="text-sm font-semibold mt-1 text-danger flex items-start gap-1">
                <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
                You cannot move to another section before time ends.
              </div>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-border/50">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/50 text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium">Section</th>
                  <th className="px-4 py-3 font-medium">Questions</th>
                  <th className="px-4 py-3 font-medium">Time Limit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                <tr className="hover:bg-muted/30">
                  <td className="px-4 py-3 font-medium">VARC</td>
                  <td className="px-4 py-3">24</td>
                  <td className="px-4 py-3 text-primary font-medium">40 Min</td>
                </tr>
                <tr className="hover:bg-muted/30">
                  <td className="px-4 py-3 font-medium">DILR</td>
                  <td className="px-4 py-3">20</td>
                  <td className="px-4 py-3 text-primary font-medium">40 Min</td>
                </tr>
                <tr className="hover:bg-muted/30">
                  <td className="px-4 py-3 font-medium">QA</td>
                  <td className="px-4 py-3">22</td>
                  <td className="px-4 py-3 text-primary font-medium">40 Min</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <div className="h-px bg-border/50 w-full" />

        {/* Marking Scheme */}
        <section className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-bold mb-4">Marking Scheme (MCQ)</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3 bg-success/10 text-success px-4 py-3 rounded-xl border border-success/20">
                <CheckCircle2 className="w-5 h-5" />
                <div>
                  <span className="font-bold">+3</span> for Correct Answer
                </div>
              </div>
              <div className="flex items-center gap-3 bg-danger/10 text-danger px-4 py-3 rounded-xl border border-danger/20">
                <XCircle className="w-5 h-5" />
                <div>
                  <span className="font-bold">-1</span> for Wrong Answer
                </div>
              </div>
              <div className="flex items-center gap-3 bg-muted px-4 py-3 rounded-xl border border-border/50">
                <MinusCircle className="w-5 h-5 text-muted-foreground" />
                <div className="text-muted-foreground">
                  <span className="font-bold">0</span> for Unattempted
                </div>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-4">TITA Questions</h2>
            <p className="text-sm text-muted-foreground mb-4">Type In The Answer questions have no negative marking.</p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 bg-success/10 text-success px-4 py-3 rounded-xl border border-success/20">
                <CheckCircle2 className="w-5 h-5" />
                <div>
                  <span className="font-bold">+3</span> for Correct Answer
                </div>
              </div>
              <div className="flex items-center gap-3 bg-muted px-4 py-3 rounded-xl border border-border/50">
                <MinusCircle className="w-5 h-5 text-muted-foreground" />
                <div className="text-muted-foreground">
                  <span className="font-bold">0</span> for Wrong/Unattempted
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="h-px bg-border/50 w-full" />

        {/* Tools & Colors */}
        <section className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-secondary" /> Calculator
            </h2>
            <div className="glass-metric-card p-4 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
              <p className="text-sm">CAT On-Screen Calculator will be available throughout the exam in the header area.</p>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-4">Navigation Legend</h2>
            <div className="grid grid-cols-2 gap-3">
              {colors.map((c) => (
                <div key={c.name} className="flex items-center gap-2 text-sm">
                  <div className={cn("w-6 h-6 rounded-md border flex items-center justify-center font-bold text-xs", c.color)}>
                    1
                  </div>
                  <span className="text-muted-foreground">{c.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <div className="fixed bottom-0 left-0 right-0 md:left-64 p-4 bg-background/80 backdrop-blur-xl border-t border-border/50 flex justify-center z-40">
        <Link 
          href={`/mocks/${id}/exam`}
          className="btn-primary-gradient w-full max-w-md py-4 text-lg flex items-center justify-center gap-2 shadow-lg"
        >
          <Play className="w-5 h-5 fill-current" />
          I have read the rules. Start Mock.
        </Link>
      </div>
    </div>
  );
}
