"use client";

import { EvaluatorResult as ResultType, ShortlistedCollege } from '@/types/college';
import { useEvaluatorStore } from '@/store/evaluatorStore';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Target, AlertTriangle, ArrowRight, Save, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

interface EvaluatorResultProps {
  result: ResultType;
}

function CircularProgress({ percent, colorClass }: { percent: number, colorClass: string }) {
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center h-16 w-16">
      <svg className="transform -rotate-90 w-16 h-16">
        <circle cx="32" cy="32" r={radius} stroke="currentColor" strokeWidth="4" fill="transparent" className="text-black/5 dark:text-white/5" />
        <circle 
          cx="32" cy="32" r={radius} stroke="currentColor" strokeWidth="4" fill="transparent" 
          strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
          className={`transition-all duration-1000 ease-out ${colorClass}`}
        />
      </svg>
      <span className="absolute text-xs font-black">{percent}%</span>
    </div>
  );
}

function CollegeResultCard({ data, colorTheme }: { data: ShortlistedCollege, colorTheme: string }) {
  const router = useRouter();
  const themeColors: Record<string, { bg: string, text: string, ring: string, badge: string }> = {
    purple: { bg: 'bg-purple-50 dark:bg-purple-500/5', text: 'text-purple-700 dark:text-purple-400', ring: 'text-purple-500', badge: 'bg-purple-500/10 text-purple-600' },
    teal: { bg: 'bg-teal-50 dark:bg-teal-500/5', text: 'text-teal-700 dark:text-teal-400', ring: 'text-teal-500', badge: 'bg-teal-500/10 text-teal-600' },
    green: { bg: 'bg-emerald-50 dark:bg-emerald-500/5', text: 'text-emerald-700 dark:text-emerald-400', ring: 'text-emerald-500', badge: 'bg-emerald-500/10 text-emerald-600' }
  };

  const theme = themeColors[colorTheme] || themeColors.purple;

  return (
    <div className={`p-5 rounded-2xl border border-black/5 dark:border-white/5 ${theme.bg} mb-4`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="font-bold text-[#111827] dark:text-white">{data.college.name}</h4>
          <p className="text-xs text-[#6B7280] mt-0.5">{data.college.city} · {data.college.examsAccepted.join(', ')}</p>
        </div>
        <div className="shrink-0 ml-2">
          <CircularProgress percent={data.matchScore} colorClass={theme.ring} />
        </div>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <span className="text-xs font-bold text-[#6B7280] uppercase">Call Chance</span>
        <span className={`text-xs font-bold px-2 py-1 rounded-md ${theme.badge}`}>
          {data.callChance}
        </span>
      </div>

      {data.gaps.length > 0 && (
        <div className="mb-4 space-y-2">
          {data.gaps.map((gap, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-[#6B7280]">
              <AlertTriangle className="h-3.5 w-3.5 shrink-0 mt-0.5 text-amber-500" />
              <span>{gap}</span>
            </div>
          ))}
        </div>
      )}

      <button 
        onClick={() => router.push(`/colleges/${data.college.id}`)}
        className={`w-full py-2.5 rounded-xl text-sm font-bold bg-white dark:bg-[#111827] border border-black/5 dark:border-white/5 shadow-sm transition-transform hover:scale-[1.02] flex items-center justify-center gap-2 ${theme.text}`}
      >
        View College <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}

export function EvaluatorResult({ result }: EvaluatorResultProps) {
  const { saveShortlist, resetEvaluator } = useEvaluatorStore();

  const handleSave = async () => {
    const success = await saveShortlist(result);
    if (success) {
      toast.success('Shortlist saved! View on dashboard');
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 animate-in slide-in-from-bottom-8 duration-700 pb-20">
      
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="h-16 w-16 bg-[#4F46E5]/10 text-[#4F46E5] rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Target className="h-8 w-8" />
        </div>
        <h2 className="text-3xl font-black text-[#111827] dark:text-white mb-3">Your Personalized Shortlist</h2>
        <p className="text-[#6B7280]">Based on your profile, we've categorized matching colleges into three tiers to help you plan your applications effectively.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 items-start">
        {/* Dream Column */}
        <div className="bg-white dark:bg-[#111827] rounded-[24px] border border-black/5 dark:border-white/5 shadow-sm p-4">
          <div className="mb-4 pb-4 border-b border-black/5 dark:border-white/5 flex items-center justify-between px-2">
            <div>
              <h3 className="font-black text-purple-600 uppercase tracking-wider text-sm">Dream</h3>
              <p className="text-xs text-[#6B7280]">Stretch targets</p>
            </div>
            <span className="bg-black/5 dark:bg-white/5 text-[#6B7280] font-bold text-xs px-2 py-1 rounded-lg">{result.dream.length}</span>
          </div>
          <div>
            {result.dream.length === 0 ? (
              <p className="text-center text-sm text-[#6B7280] py-8">No dream colleges matched.</p>
            ) : (
              result.dream.map((item, i) => <CollegeResultCard key={i} data={item} colorTheme="purple" />)
            )}
          </div>
        </div>

        {/* Target Column */}
        <div className="bg-white dark:bg-[#111827] rounded-[24px] border border-black/5 dark:border-white/5 shadow-sm p-4">
          <div className="mb-4 pb-4 border-b border-black/5 dark:border-white/5 flex items-center justify-between px-2">
            <div>
              <h3 className="font-black text-teal-600 uppercase tracking-wider text-sm">Target</h3>
              <p className="text-xs text-[#6B7280]">Strong match</p>
            </div>
            <span className="bg-black/5 dark:bg-white/5 text-[#6B7280] font-bold text-xs px-2 py-1 rounded-lg">{result.target.length}</span>
          </div>
          <div>
            {result.target.length === 0 ? (
              <p className="text-center text-sm text-[#6B7280] py-8">No target colleges matched.</p>
            ) : (
              result.target.map((item, i) => <CollegeResultCard key={i} data={item} colorTheme="teal" />)
            )}
          </div>
        </div>

        {/* Safe Column */}
        <div className="bg-white dark:bg-[#111827] rounded-[24px] border border-black/5 dark:border-white/5 shadow-sm p-4">
          <div className="mb-4 pb-4 border-b border-black/5 dark:border-white/5 flex items-center justify-between px-2">
            <div>
              <h3 className="font-black text-emerald-600 uppercase tracking-wider text-sm">Safe</h3>
              <p className="text-xs text-[#6B7280]">High probability</p>
            </div>
            <span className="bg-black/5 dark:bg-white/5 text-[#6B7280] font-bold text-xs px-2 py-1 rounded-lg">{result.safe.length}</span>
          </div>
          <div>
            {result.safe.length === 0 ? (
              <p className="text-center text-sm text-[#6B7280] py-8">No safe colleges matched.</p>
            ) : (
              result.safe.map((item, i) => <CollegeResultCard key={i} data={item} colorTheme="green" />)
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12 pt-8 border-t border-black/5 dark:border-white/5">
        <Button onClick={resetEvaluator} variant="ghost" className="h-12 px-6 rounded-xl font-bold text-[#6B7280]">
          <RotateCcw className="mr-2 h-4 w-4" /> Re-evaluate
        </Button>
        <Button onClick={handleSave} className="h-12 px-8 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white font-bold shadow-lg hover:shadow-xl transition-all">
          <Save className="mr-2 h-4 w-4" /> Save Shortlist
        </Button>
      </div>

    </div>
  );
}
