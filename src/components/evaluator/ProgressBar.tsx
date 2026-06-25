import { Check } from 'lucide-react';

interface ProgressBarProps {
  currentStep: number;
  steps: string[];
}

export function ProgressBar({ currentStep, steps }: ProgressBarProps) {
  return (
    <div className="relative">
      <div className="absolute top-1/2 left-0 w-full h-1 bg-black/5 dark:bg-white/5 -translate-y-1/2 rounded-full hidden sm:block" />
      
      <div className="absolute top-1/2 left-0 h-1 bg-[#4F46E5] -translate-y-1/2 rounded-full transition-all duration-300 hidden sm:block" 
        style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }} 
      />

      <div className="relative flex justify-between">
        {steps.map((step, idx) => {
          const isCompleted = idx < currentStep;
          const isActive = idx === currentStep;

          return (
            <div key={step} className="flex flex-col items-center gap-2 z-10">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors ${
                isCompleted 
                  ? 'bg-[#4F46E5] border-[#4F46E5] text-white' 
                  : isActive
                  ? 'bg-white dark:bg-[#111827] border-[#4F46E5] text-[#4F46E5]'
                  : 'bg-white dark:bg-[#111827] border-black/10 dark:border-white/10 text-[#6B7280]'
              }`}>
                {isCompleted ? <Check className="h-4 w-4" /> : idx + 1}
              </div>
              <span className={`text-xs text-center hidden sm:block ${
                isActive ? 'font-bold text-[#111827] dark:text-white' : 'font-medium text-[#6B7280]'
              }`}>
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
