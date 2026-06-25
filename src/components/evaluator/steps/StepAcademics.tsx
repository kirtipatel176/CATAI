"use client";

import { UseFormRegister, FieldErrors } from 'react-hook-form';

interface StepAcademicsProps {
  register: UseFormRegister<any>;
  errors: FieldErrors;
}

export function StepAcademics({ register, errors }: StepAcademicsProps) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="grid sm:grid-cols-2 gap-6">
        <div className="space-y-3">
          <label className="text-sm font-bold text-[#111827] dark:text-white block">10th Percentage *</label>
          <input 
            type="number" 
            step="0.01"
            placeholder="e.g. 85.50"
            {...register('tenth', { 
              required: '10th percentage is required',
              min: { value: 35, message: 'Must be between 35 and 100' },
              max: { value: 100, message: 'Must be between 35 and 100' }
            })}
            className="w-full px-4 py-3 rounded-xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 focus:ring-2 focus:ring-[#4F46E5] focus:outline-none"
          />
          {errors.tenth && <p className="text-red-500 text-xs font-semibold">{errors.tenth.message as string}</p>}
        </div>

        <div className="space-y-3">
          <label className="text-sm font-bold text-[#111827] dark:text-white block">12th Percentage *</label>
          <input 
            type="number" 
            step="0.01"
            placeholder="e.g. 88.00"
            {...register('twelfth', { 
              required: '12th percentage is required',
              min: { value: 35, message: 'Must be between 35 and 100' },
              max: { value: 100, message: 'Must be between 35 and 100' }
            })}
            className="w-full px-4 py-3 rounded-xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 focus:ring-2 focus:ring-[#4F46E5] focus:outline-none"
          />
          {errors.twelfth && <p className="text-red-500 text-xs font-semibold">{errors.twelfth.message as string}</p>}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div className="space-y-3">
          <label className="text-sm font-bold text-[#111827] dark:text-white block">Graduation Percentage *</label>
          <input 
            type="number" 
            step="0.01"
            placeholder="e.g. 75.00"
            {...register('graduationPercent', { 
              required: 'Graduation percentage is required',
              min: { value: 35, message: 'Must be between 35 and 100' },
              max: { value: 100, message: 'Must be between 35 and 100' }
            })}
            className="w-full px-4 py-3 rounded-xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 focus:ring-2 focus:ring-[#4F46E5] focus:outline-none"
          />
          {errors.graduationPercent && <p className="text-red-500 text-xs font-semibold">{errors.graduationPercent.message as string}</p>}
        </div>

        <div className="space-y-3">
          <label className="text-sm font-bold text-[#111827] dark:text-white block">Graduation Stream *</label>
          <select 
            {...register('graduationStream', { required: 'Please select a stream' })}
            className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#111827] border border-black/5 dark:border-white/10 focus:ring-2 focus:ring-[#4F46E5] focus:outline-none appearance-none"
          >
            <option value="">Select Stream</option>
            {['Engineering', 'Commerce', 'Arts', 'Science', 'Other'].map(stream => (
              <option key={stream} value={stream}>{stream}</option>
            ))}
          </select>
          {errors.graduationStream && <p className="text-red-500 text-xs font-semibold">{errors.graduationStream.message as string}</p>}
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-sm font-bold text-[#111827] dark:text-white block">Graduation College <span className="text-[#6B7280] font-normal">(Optional)</span></label>
        <input 
          type="text" 
          placeholder="e.g. IIT Bombay, SRCC..."
          {...register('graduationCollege')}
          className="w-full px-4 py-3 rounded-xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 focus:ring-2 focus:ring-[#4F46E5] focus:outline-none"
        />
      </div>
    </div>
  );
}
