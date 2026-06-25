import { CollegeListingClient } from '@/components/colleges/CollegeListingClient';
import { Suspense } from 'react';

export default function CollegesPage() {
  return (
    <div className="min-h-screen w-full pb-20 pt-4">
      <Suspense fallback={
        <div className="w-full h-32 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#4F46E5]" />
        </div>
      }>
        <CollegeListingClient />
      </Suspense>
    </div>
  );
}
