"use client";

import { UseFormRegister, FieldErrors, UseFormWatch } from 'react-hook-form';

interface StepExperienceProps {
  register: UseFormRegister<any>;
  errors: FieldErrors;
  watch: UseFormWatch<any>;
}

export function StepExperience({ register, errors, watch }: StepExperienceProps) {
  const domain = watch('domain');

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="grid sm:grid-cols-2 gap-6">
        <div className="space-y-3">
          <label className="text-sm font-bold text-[#111827] dark:text-white block">Work experience in months *</label>
          <input 
            type="number" 
            placeholder="0"
            {...register('workExMonths', { 
              required: 'Work experience is required',
              min: { value: 0, message: 'Minimum 0' },
              max: { value: 240, message: 'Maximum 240 months' }
            })}
            className="w-full px-4 py-3 rounded-xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 focus:ring-2 focus:ring-[#4F46E5] focus:outline-none"
          />
          {errors.workExMonths && <p className="text-red-500 text-xs font-semibold">{errors.workExMonths.message as string}</p>}
        </div>

        <div className="space-y-3">
          <label className="text-sm font-bold text-[#111827] dark:text-white block">Industry Domain *</label>
          <select 
            {...register('domain', { required: 'Please select a domain' })}
            className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#111827] border border-black/5 dark:border-white/10 focus:ring-2 focus:ring-[#4F46E5] focus:outline-none appearance-none"
          >
            <option value="">Select Domain</option>
            {['IT', 'Finance', 'Consulting', 'Marketing', 'Operations', 'Healthcare', 'Fresher', 'Other'].map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
          {errors.domain && <p className="text-red-500 text-xs font-semibold">{errors.domain.message as string}</p>}
        </div>
      </div>

      {domain !== 'Fresher' && (
        <div className="space-y-3 animate-in slide-in-from-top-2">
          <label className="text-sm font-bold text-[#111827] dark:text-white block">Role Level *</label>
          <select 
            {...register('roleLevel', { 
              required: domain !== 'Fresher' ? 'Please select a role level' : false 
            })}
            className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#111827] border border-black/5 dark:border-white/10 focus:ring-2 focus:ring-[#4F46E5] focus:outline-none appearance-none"
          >
            <option value="">Select Level</option>
            {['Intern', 'Executive', 'Senior Executive', 'Manager', 'Senior Manager'].map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
          {errors.roleLevel && <p className="text-red-500 text-xs font-semibold">{errors.roleLevel.message as string}</p>}
        </div>
      )}

      <div className="space-y-3">
        <label className="text-sm font-bold text-[#111827] dark:text-white block">Companies Worked At <span className="text-[#6B7280] font-normal">(Optional)</span></label>
        <input 
          type="text" 
          placeholder="e.g. TCS, Infosys, Deloitte (Comma separated)"
          {...register('companiesWorked')}
          className="w-full px-4 py-3 rounded-xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 focus:ring-2 focus:ring-[#4F46E5] focus:outline-none"
        />
      </div>
    </div>
  );
}
