import { Category, mockColleges, mockCutoffs } from "./mock-profile-data";

export interface BachProfileInput {
  userType: "Pursuing Bachelor's";
  category: Category;
  percentile10th: number;
  percentile12th: number;
  currentCGPA: number;
  currentSemester: number;
  graduationStream: string;
  targetExam: string;
  examAttemptYear: string;
  targetMBAColleges: string[];
  internshipCount?: number;
  leadershipExperience?: "Yes" | "No";
  mockPercentile?: number;
}

export interface CollegeMatch {
  name: string;
  required: number;
  currentReadiness: number | string;
  gap: number | string;
  admissionProbability: number | string;
}

export interface SimulatorResult {
  label: string;
  score: number;
}

export interface BachProfileReport {
  userType: "Pursuing Bachelor's";
  academicStrength: {
    details: string; // e.g., "10th = 85 | 12th = 88 | CGPA = 8.2"
    result: string;  // e.g., "Strong Academic Profile"
    score: number;
  };
  mbaReadiness: {
    score: number;
    category: string;
  };
  collegeIntelligence: {
    dream: CollegeMatch[];
    target: CollegeMatch[];
    safe: CollegeMatch[];
  };
  weaknesses: string[];
  improvementSimulator: {
    current: number;
    afterInternship?: number;
    afterLeadership?: number;
    afterMockImprovement?: number;
  };
  roadmap: {
    shortTerm: string[];
    mediumTerm: string[];
    longTerm: string[];
  };
  finalAnswers: {
    q1: string; // How strong is my academic profile?
    q2: string; // Which MBA colleges fit me?
    q3: string; // Which colleges are Dream, Target, and Safe?
    q4: string; // What percentile do I need?
    q5: string; // What weaknesses are hurting my chances?
    q6: string; // What should I improve first?
    q7: string; // What happens if I improve my profile?
    q8: string; // What is my MBA preparation roadmap?
  };
}

export class BachProfileEngine {
  profile: BachProfileInput;

  constructor(profile: BachProfileInput) {
    this.profile = profile;
  }

  evaluateAcademicScore(): number {
    const p10 = this.profile.percentile10th || 0;
    const p12 = this.profile.percentile12th || 0;
    const cgpa = (this.profile.currentCGPA / 10) * 100 || 0;
    // 20% 10th, 30% 12th, 50% CGPA
    return Math.min(100, Math.round((p10 * 0.20) + (p12 * 0.30) + (cgpa * 0.50)));
  }

  getAcademicCategory(score: number): string {
    if (score >= 85) return "Strong Academic Profile";
    if (score >= 75) return "Competitive Academic Profile";
    if (score >= 65) return "Average Academic Profile";
    return "Needs Academic Improvement";
  }

  evaluateReadinessScore(override?: Partial<BachProfileInput>): number {
    const p = override ? { ...this.profile, ...override } : this.profile;
    const acadScore = this.evaluateAcademicScore();
    
    // Evaluate extra factors
    let extraPoints = 0;
    const internships = p.internshipCount || 0;
    const leadership = p.leadershipExperience === "Yes";
    const mock = p.mockPercentile;

    extraPoints += Math.min(internships * 5, 15); // up to 15 points
    if (leadership) extraPoints += 10;
    
    if (mock) {
      if (mock >= 95) extraPoints += 20;
      else if (mock >= 85) extraPoints += 10;
      else if (mock >= 70) extraPoints += 5;
    }

    // Readiness is heavily based on Academics for undergrads + extra
    // E.g. base = acad * 0.6 + extraPoints
    const score = Math.min(100, Math.round((acadScore * 0.65) + extraPoints));
    return score;
  }

  getReadinessCategory(score: number): string {
    if (score >= 85) return "Highly Competitive Candidate";
    if (score >= 75) return "Competitive Candidate";
    if (score >= 60) return "Average Candidate";
    return "Needs Improvement";
  }

  getEstimatedPercentile(readinessScore: number): number {
    if (this.profile.mockPercentile) return this.profile.mockPercentile;
    // Estimated based on readiness
    if (readinessScore >= 85) return 96;
    if (readinessScore >= 75) return 88;
    if (readinessScore >= 65) return 78;
    return 65;
  }

  matchColleges(estPercentile: number) {
    const dream: CollegeMatch[] = [];
    const target: CollegeMatch[] = [];
    const safe: CollegeMatch[] = [];

    const targetColleges = this.profile.targetMBAColleges || [];

    for (const collegeName of targetColleges) {
      const college = mockColleges.find(c => c.college_name === collegeName);
      if (!college) continue;

      let reqPercentile = 90; // Default fallback
      const cutoffData = mockCutoffs.find(
        c => c.college_id === college.college_id && c.category === this.profile.category
      );
      const fallbackCutoff = mockCutoffs.find(
        c => c.college_id === college.college_id && c.category === "General"
      );
      if (cutoffData) reqPercentile = cutoffData.cutoff_percentile;
      else if (fallbackCutoff) reqPercentile = fallbackCutoff.cutoff_percentile;

      const gap = Math.max(0, Number((reqPercentile - estPercentile).toFixed(1)));
      
      const k = college.tier === 1 ? 14 : college.tier === 2 ? 18 : 20;
      const probAdmit = Math.min(98, Math.max(2, 50 - (gap * k)));

      const match: CollegeMatch = {
        name: college.college_name,
        required: reqPercentile,
        currentReadiness: this.profile.mockPercentile ? estPercentile : `${estPercentile} (Est)`,
        gap: gap,
        admissionProbability: Math.round(probAdmit)
      };

      if (probAdmit < 40) dream.push(match);
      else if (probAdmit <= 75) target.push(match);
      else safe.push(match);
    }

    dream.sort((a, b) => (b.admissionProbability as number) - (a.admissionProbability as number));
    target.sort((a, b) => (b.admissionProbability as number) - (a.admissionProbability as number));
    safe.sort((a, b) => (b.admissionProbability as number) - (a.admissionProbability as number));

    return { dream, target, safe };
  }

  detectWeaknesses(): string[] {
    const w: string[] = [];
    if (this.profile.currentCGPA < 8.0) w.push(`CGPA Below 8.0 (Current: ${this.profile.currentCGPA})`);
    if (!this.profile.internshipCount || this.profile.internshipCount === 0) w.push("No Internship Experience");
    if (this.profile.leadershipExperience !== "Yes") w.push("No Leadership Exposure");
    if (!this.profile.mockPercentile) w.push("Mock Percentile Not Established");
    else if (this.profile.mockPercentile < 85) w.push(`Mock Percentile Below Target (${this.profile.mockPercentile})`);
    return w;
  }

  generateReport(): BachProfileReport {
    const acadScore = this.evaluateAcademicScore();
    const acadCategory = this.getAcademicCategory(acadScore);
    const readinessScore = this.evaluateReadinessScore();
    const readinessCategory = this.getReadinessCategory(readinessScore);
    
    const estPercentile = this.getEstimatedPercentile(readinessScore);
    const colleges = this.matchColleges(estPercentile);
    const weaknesses = this.detectWeaknesses();

    // Simulators
    const afterInternship = (!this.profile.internshipCount || this.profile.internshipCount < 3) 
      ? this.evaluateReadinessScore({ internshipCount: (this.profile.internshipCount || 0) + 1 }) 
      : undefined;
    const afterLeadership = this.profile.leadershipExperience !== "Yes" 
      ? this.evaluateReadinessScore({ leadershipExperience: "Yes" }) 
      : undefined;
    const afterMockImprovement = (!this.profile.mockPercentile || this.profile.mockPercentile < 95)
      ? this.evaluateReadinessScore({ mockPercentile: Math.min(99, (this.profile.mockPercentile || 80) + 10) })
      : undefined;

    // Roadmap
    const shortTerm = [];
    const mediumTerm = [];
    const longTerm = [];
    
    if (this.profile.currentCGPA < 8.0) shortTerm.push("Focus on increasing CGPA in current semester");
    if (!this.profile.internshipCount || this.profile.internshipCount === 0) shortTerm.push("Apply for a foundational internship");
    else shortTerm.push("Complete advanced internship in target domain");

    if (this.profile.leadershipExperience !== "Yes") mediumTerm.push("Participate in Leadership Activities (Clubs/Societies)");
    if (!this.profile.mockPercentile) mediumTerm.push("Take a baseline Mock Test");
    else mediumTerm.push("Improve Mock Scores by 5-10 percentile");

    longTerm.push(`Target ${this.profile.targetExam} 99+ Percentile`);
    longTerm.push("Prepare for WAT-PI Interviews");

    return {
      userType: "Pursuing Bachelor's",
      academicStrength: {
        details: `10th = ${this.profile.percentile10th} | 12th = ${this.profile.percentile12th} | CGPA = ${this.profile.currentCGPA}`,
        result: acadCategory,
        score: acadScore
      },
      mbaReadiness: {
        score: readinessScore,
        category: readinessCategory
      },
      collegeIntelligence: colleges,
      weaknesses,
      improvementSimulator: {
        current: readinessScore,
        afterInternship,
        afterLeadership,
        afterMockImprovement
      },
      roadmap: { shortTerm, mediumTerm, longTerm },
      finalAnswers: {
        q1: acadCategory,
        q2: colleges.target.length > 0 ? `${colleges.target.map(c => c.name).join(", ")} fit well.` : "Requires improvement to unlock target colleges.",
        q3: `Dream: ${colleges.dream.length}, Target: ${colleges.target.length}, Safe: ${colleges.safe.length}`,
        q4: `Generally ${Math.max(...[...colleges.dream, ...colleges.target, ...colleges.safe].map(c => c.required), 90)}+ for your targets.`,
        q5: weaknesses.length > 0 ? weaknesses.join(", ") : "No major weaknesses.",
        q6: weaknesses.length > 0 ? weaknesses[0] : "Maintain current trajectory.",
        q7: `Your readiness score can jump from ${readinessScore} up to ${Math.max(readinessScore, afterInternship || 0, afterLeadership || 0, afterMockImprovement || 0)}.`,
        q8: "Focus on CGPA -> Internships -> Leadership -> Mocks."
      }
    };
  }
}
