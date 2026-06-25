export interface College {
  id: string;
  name: string;
  description?: string;
  logo: string;
  city: string;
  state: string;
  tier: 'Tier 1' | 'Tier 2' | 'Tier 3';
  examsAccepted: string[];
  cutoffMin: number;
  cutoffMax: number;
  totalFees: number;
  intake: number;
  avgPlacement: number;
  accreditation: string[];
}

export interface CutoffEntry {
  year: number;
  category: string;
  percentile: number;
  gd: boolean;
  pi: boolean;
}

export interface Programme {
  name: string;
  duration: string;
  fees: number;
  intake: number;
  avgSalary: number;
  topRecruiters: string[];
}

export interface ShortlistedCollege {
  college: College;
  matchScore: number;
  gaps: string[];
  callChance: 'High' | 'Medium' | 'Low';
}

export interface EvaluatorResult {
  dream: ShortlistedCollege[];
  target: ShortlistedCollege[];
  safe: ShortlistedCollege[];
}
