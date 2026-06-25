import { Suspense } from 'react';
import { EvaluatorWizard } from '@/components/evaluator/EvaluatorWizard';

export default function EvaluatePage() {
  return (
    <div className="min-h-screen w-full bg-[#F8FAFC] dark:bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Suspense fallback={
          <div className="w-full h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#4F46E5]" />
          </div>
        }>
          <EvaluatorWizard />
        </Suspense>
      </div>
    </div>
  );
}
