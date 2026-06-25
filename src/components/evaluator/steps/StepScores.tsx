"use client";

import { UseFormRegister, FieldErrors, UseFormWatch } from 'react-hook-form';

interface StepScoresProps {
  register: UseFormRegister<any>;
  errors: FieldErrors;
  watch: UseFormWatch<any>;
}

export function StepScores({ register, errors, watch }: StepScoresProps) {
  const exams = ['CAT', 'XAT', 'GMAT', 'CMAT', 'MAT'];
  const examType = watch('examType');

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="space-y-4">
        <label className="text-sm font-bold text-[#111827] dark:text-white block">Target Exam *</label>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {exams.map(exam => (
            <label key={exam} className={`
              cursor-pointer flex items-center justify-center px-4 py-3 rounded-xl border-2 font-semibold text-sm transition-all
              ${examType === exam 
                ? 'border-[#4F46E5] bg-[#4F46E5]/5 text-[#4F46E5]' 
                : 'border-black/5 dark:border-white/10 text-[#6B7280] hover:bg-black/5 dark:hover:bg-white/5'}
            `}>
              <input type="radio" value={exam} {...register('examType', { required: 'Please select an exam' })} className="hidden" />
              {exam}
            </label>
          ))}
        </div>
        {errors.examType && <p className="text-red-500 text-xs font-semibold">{errors.examType.message as string}</p>}
      </div>

      <div className="space-y-4">
        <label className="text-sm font-bold text-[#111827] dark:text-white block">Target/Expected Percentile *</label>
        <input 
          type="number" 
          step="0.01"
          placeholder="e.g. 95.50"
          {...register('percentile', { 
            required: 'Percentile is required',
            min: { value: 0, message: 'Minimum 0' },
            max: { value: 100, message: 'Maximum 100' }
          })}
          className="w-full px-4 py-3 rounded-xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 focus:ring-2 focus:ring-[#4F46E5] focus:outline-none"
        />
        {errors.percentile && <p className="text-red-500 text-xs font-semibold">{errors.percentile.message as string}</p>}
      </div>

      <div className="space-y-4">
        <label className="text-sm font-bold text-[#111827] dark:text-white block">Latest Mock Percentile <span className="text-[#6B7280] font-normal">(Optional)</span></label>
        <input 
          type="number" 
          step="0.01"
          placeholder="e.g. 88.00"
          {...register('mockPercentile', {
            min: { value: 0, message: 'Minimum 0' },
            max: { value: 100, message: 'Maximum 100' }
          })}
          className="w-full px-4 py-3 rounded-xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 focus:ring-2 focus:ring-[#4F46E5] focus:outline-none"
        />
        {errors.mockPercentile && <p className="text-red-500 text-xs font-semibold">{errors.mockPercentile.message as string}</p>}
      </div>

      {examType === 'XAT' && (
        <div className="space-y-4 animate-in slide-in-from-top-2">
          <label className="text-sm font-bold text-[#111827] dark:text-white block">VAT Score <span className="text-[#6B7280] font-normal">(Optional, for XLRI)</span></label>
          <input 
            type="number" 
            step="0.01"
            placeholder="0-100"
            {...register('vatScore', {
              min: { value: 0, message: 'Minimum 0' },
              max: { value: 100, message: 'Maximum 100' }
            })}
            className="w-full px-4 py-3 rounded-xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 focus:ring-2 focus:ring-[#4F46E5] focus:outline-none"
          />
          {errors.vatScore && <p className="text-red-500 text-xs font-semibold">{errors.vatScore.message as string}</p>}
        </div>
      )}
    </div>
  );
}
