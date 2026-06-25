"use client";

import { College, CutoffEntry, Programme } from '@/types/college';
import { CollegeHero } from './CollegeHero';
import { CutoffTable } from './CutoffTable';
import { FeesAndSeats } from './FeesAndSeats';
import { EligibilityCTABar } from './EligibilityCTABar';
import { CollegeCompare } from './CollegeCompare';

interface CollegeDetailClientProps {
  college: College;
  cutoffs: CutoffEntry[];
  programmes: Programme[];
}

export function CollegeDetailClient({ college, cutoffs, programmes }: CollegeDetailClientProps) {
  return (
    <div className="w-full relative pb-24">
      <div className="space-y-8">
        
        {/* Hero Section */}
        <CollegeHero
          id={college.id}
          name={college.name}
          logo={college.logo}
          city={college.city}
          state={college.state}
          accreditation={college.accreditation}
          examsAccepted={college.examsAccepted}
        />

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Main Content Area (Left 2 columns) */}
          <div className="lg:col-span-2 space-y-8">
            <CutoffTable cutoffs={cutoffs} />
            <FeesAndSeats programmes={programmes} />
          </div>
          
          {/* Sidebar Area (Right 1 column) */}
          <div className="lg:col-span-1 space-y-8">
            {/* Future sidebar widgets can go here */}
          </div>
          
        </div>

      </div>

      <EligibilityCTABar collegeId={college.id} />
      <CollegeCompare currentCollege={college} />
    </div>
  );
}
