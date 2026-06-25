"use client";

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useEvaluatorStore } from '@/store/evaluatorStore';
import { ProgressBar } from './ProgressBar';
import { StepScores } from './steps/StepScores';
import { StepAcademics } from './steps/StepAcademics';
import { StepExperience } from './steps/StepExperience';
import { StepPreferences } from './steps/StepPreferences';
import { EvaluatorResult } from './EvaluatorResult';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft, Loader2, Sparkles } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

export function EvaluatorWizard() {
  const searchParams = useSearchParams();
  const preSelectedCollegeId = searchParams.get('college_id');
  
  const { formData, result, isLoading, error, setFormData, submitEvaluation } = useEvaluatorStore();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = ['Scores', 'Academics', 'Experience', 'Preferences'];

  const { register, handleSubmit, trigger, watch, setValue, formState: { errors } } = useForm({
    defaultValues: {
      ...formData,
      // If a college ID was passed via query, we might use it behind the scenes
      _targetCollegeId: preSelectedCollegeId || null,
      maxFeesBudget: 3000000,
      preferredCities: ['Any'],
      examType: 'CAT'
    },
    mode: 'onTouched'
  });

  const getStepFields = (step: number) => {
    switch (step) {
      case 0: return ['examType', 'percentile', 'mockPercentile', 'vatScore'];
      case 1: return ['tenth', 'twelfth', 'graduationPercent', 'graduationStream', 'graduationCollege'];
      case 2: return ['workExMonths', 'domain', 'roleLevel', 'companiesWorked'];
      case 3: return ['preferredCities', 'specialisation', 'maxFeesBudget', 'programmeType'];
      default: return [];
    }
  };

  const handleNext = async () => {
    const fieldsToValidate = getStepFields(currentStep);
    const isStepValid = await trigger(fieldsToValidate as any);
    
    if (isStepValid) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(prev => prev + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const onSubmit = async (data: any) => {
    setFormData(data);
    await submitEvaluation(data);
    
    // Smooth scroll to result
    setTimeout(() => {
      document.getElementById('evaluator-result')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // If result exists, show the wizard at the top but collapsed, and result below
  // Actually the prompt says: "Navigate to result section (scroll into view or show below wizard)"
  // So we show both or just hide the wizard. We'll show the result if it exists.

  if (result) {
    return (
      <div id="evaluator-result" className="pt-8">
        <EvaluatorResult result={result} />
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto pt-8 pb-32">
      
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center p-3 bg-[#4F46E5]/10 text-[#4F46E5] rounded-2xl mb-4">
          <Sparkles className="h-6 w-6" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[#111827] dark:text-white mb-2">Evaluate Your Profile</h1>
        <p className="text-[#6B7280]">Enter your details to see your admission chances and get a personalized shortlist.</p>
      </div>

      <div className="bg-white dark:bg-[#111827] rounded-[32px] border border-black/5 dark:border-white/5 shadow-sm p-6 md:p-10">
        
        <div className="mb-10">
          <ProgressBar currentStep={currentStep} steps={steps} />
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 text-red-500 font-medium text-sm border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          
          <div className="min-h-[350px]">
            {currentStep === 0 && <StepScores register={register} errors={errors} watch={watch} />}
            {currentStep === 1 && <StepAcademics register={register} errors={errors} />}
            {currentStep === 2 && <StepExperience register={register} errors={errors} watch={watch} />}
            {currentStep === 3 && <StepPreferences register={register} errors={errors} watch={watch} setValue={setValue} />}
          </div>

          <div className="mt-10 pt-6 border-t border-black/5 dark:border-white/5 flex items-center justify-between">
            <Button 
              type="button"
              onClick={handleBack} 
              variant="ghost" 
              className={`h-12 px-6 rounded-xl font-bold text-[#6B7280] ${currentStep === 0 ? 'invisible' : ''}`}
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            
            {currentStep < steps.length - 1 ? (
              <Button 
                type="button" 
                onClick={handleNext}
                className="h-12 px-8 rounded-xl bg-[#111827] dark:bg-white text-white dark:text-[#111827] font-bold"
              >
                Continue <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button 
                type="submit" 
                disabled={isLoading}
                className="h-12 px-8 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white font-bold shadow-lg"
              >
                {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                {isLoading ? 'Evaluating...' : 'Get My Shortlist'}
              </Button>
            )}
          </div>

        </form>
      </div>
    </div>
  );
}
