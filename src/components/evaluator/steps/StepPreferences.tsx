import { UseFormRegister, FieldErrors, UseFormWatch, UseFormSetValue } from 'react-hook-form';

interface StepPreferencesProps {
  register: UseFormRegister<any>;
  errors: FieldErrors;
  watch: UseFormWatch<any>;
  setValue: UseFormSetValue<any>;
}

export function StepPreferences({ register, errors, watch, setValue }: StepPreferencesProps) {
  const preferredCities = watch('preferredCities') || [];
  const specialisation = watch('specialisation') || [];
  const maxFeesBudget = watch('maxFeesBudget') || 3000000;
  
  const citiesList = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Ahmedabad', 'Pune', 'Any'];
  const specList = ['Finance', 'Marketing', 'Operations', 'HR', 'Strategy', 'General Management'];

  const toggleSelection = (field: 'preferredCities' | 'specialisation', value: string, currentList: string[]) => {
    if (value === 'Any' && field === 'preferredCities') {
      setValue(field, ['Any'], { shouldValidate: true });
      return;
    }
    
    let newList = [...currentList];
    
    // Remove 'Any' if selecting something else
    if (field === 'preferredCities' && newList.includes('Any')) {
      newList = [];
    }

    if (newList.includes(value)) {
      newList = newList.filter(v => v !== value);
    } else {
      newList.push(value);
    }
    setValue(field, newList, { shouldValidate: true });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      
      <div className="space-y-4">
        <label className="text-sm font-bold text-[#111827] dark:text-white block">Preferred Cities *</label>
        <div className="flex flex-wrap gap-3">
          {citiesList.map(city => {
            const isSelected = preferredCities.includes(city);
            return (
              <button
                key={city}
                type="button"
                onClick={() => toggleSelection('preferredCities', city, preferredCities)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all border-2 ${
                  isSelected 
                    ? 'border-[#4F46E5] bg-[#4F46E5]/5 text-[#4F46E5]' 
                    : 'border-black/5 dark:border-white/10 text-[#6B7280] hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                {city}
              </button>
            );
          })}
        </div>
        {/* Hidden input to register validation */}
        <input type="hidden" {...register('preferredCities', { validate: v => (v && v.length > 0) || 'Please select at least one city' })} />
        {errors.preferredCities && <p className="text-red-500 text-xs font-semibold">{errors.preferredCities.message as string}</p>}
      </div>

      <div className="space-y-4">
        <label className="text-sm font-bold text-[#111827] dark:text-white block">Preferred Specialisation *</label>
        <div className="flex flex-wrap gap-3">
          {specList.map(spec => {
            const isSelected = specialisation.includes(spec);
            return (
              <button
                key={spec}
                type="button"
                onClick={() => toggleSelection('specialisation', spec, specialisation)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all border-2 ${
                  isSelected 
                    ? 'border-[#4F46E5] bg-[#4F46E5]/5 text-[#4F46E5]' 
                    : 'border-black/5 dark:border-white/10 text-[#6B7280] hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                {spec}
              </button>
            );
          })}
        </div>
        <input type="hidden" {...register('specialisation', { validate: v => (v && v.length > 0) || 'Please select at least one specialisation' })} />
        {errors.specialisation && <p className="text-red-500 text-xs font-semibold">{errors.specialisation.message as string}</p>}
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <label className="text-sm font-bold text-[#111827] dark:text-white block">Maximum Fees Budget *</label>
          <span className="text-sm font-bold text-[#4F46E5]">₹{(maxFeesBudget / 100000).toFixed(1)} Lakhs</span>
        </div>
        <input
          type="range"
          min="0"
          max="3000000"
          step="50000"
          {...register('maxFeesBudget')}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#4F46E5]"
        />
      </div>

      <div className="space-y-4">
        <label className="text-sm font-bold text-[#111827] dark:text-white block">Programme Type *</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {['Full-time', 'Part-time', 'Executive', 'Any'].map(type => (
            <label key={type} className={`
              cursor-pointer flex items-center justify-center px-4 py-3 rounded-xl border-2 font-semibold text-sm transition-all
              ${watch('programmeType') === type 
                ? 'border-[#4F46E5] bg-[#4F46E5]/5 text-[#4F46E5]' 
                : 'border-black/5 dark:border-white/10 text-[#6B7280] hover:bg-black/5 dark:hover:bg-white/5'}
            `}>
              <input type="radio" value={type} {...register('programmeType', { required: 'Please select a programme type' })} className="hidden" />
              {type}
            </label>
          ))}
        </div>
        {errors.programmeType && <p className="text-red-500 text-xs font-semibold">{errors.programmeType.message as string}</p>}
      </div>
      
    </div>
  );
}
