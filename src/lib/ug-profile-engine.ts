import { Category } from "./mock-profile-data";

export interface UGCollege {
  id: string;
  name: string;
  tier: 1 | 2 | 3; // 1: Very Competitive (Dream), 2: Realistic (Target), 3: High Probability (Safe)
  acceptedExams: string[];
  baseScoreReq: number; // A general score requirement out of 100 for admission readiness mapping
}

export const mockUGColleges: UGCollege[] = [
  { id: "IIM_INDORE_IPM", name: "IIM Indore IPM", tier: 1, acceptedExams: ["IPMAT"], baseScoreReq: 90 },
  { id: "IIM_ROHTAK_IPM", name: "IIM Rohtak IPM", tier: 1, acceptedExams: ["IPMAT"], baseScoreReq: 88 },
  { id: "NMIMS_MUMBAI", name: "NMIMS Mumbai", tier: 2, acceptedExams: ["NPAT"], baseScoreReq: 80 },
  { id: "SHAHEED_SUKHDEV", name: "Shaheed Sukhdev College", tier: 1, acceptedExams: ["CUET"], baseScoreReq: 92 },
  { id: "CHRIST_UNIVERSITY", name: "Christ University", tier: 2, acceptedExams: ["Christ Entrance Test", "CUET"], baseScoreReq: 75 },
  { id: "SYMBIOSIS_PUNE", name: "Symbiosis Pune", tier: 2, acceptedExams: ["SET"], baseScoreReq: 78 },
  { id: "NIRMA_UNIVERSITY", name: "Nirma University", tier: 3, acceptedExams: ["IPMAT"], baseScoreReq: 65 },
  { id: "GLS_UNIVERSITY", name: "GLS University", tier: 3, acceptedExams: ["UGAT"], baseScoreReq: 55 },
  { id: "ST_XAVIERS", name: "St. Xavier's", tier: 3, acceptedExams: ["CUET", "UGAT"], baseScoreReq: 70 }
];

export interface Student12thProfileInput {
  userType: "12th Student";
  percentile10th: number;
  percentile12th: number;
  stream: "Commerce" | "Science" | "Arts" | string;
  category: Category;
  targetDegree: string;
  examGoals: string[]; // e.g. ["IPMAT", "NPAT"]
  examYear: string;
  mockScores: Record<string, number>; // exam name -> score. e.g. { "IPMAT": 180, "NPAT": 190 }
  targetBachelorColleges: string[];
}

export interface UGCollegeMatch {
  name: string;
  exam: string;
  recommendedScore: string;
  currentReadiness: number | "Pending";
  gap: string;
  tier: 1 | 2 | 3;
}

export interface ExamReadiness {
  exam: string;
  currentReadiness: string;
  recommendedPrep: string;
}

export interface Student12thProfileReport {
  userType: "12th Student";
  academicScore: number;
  academicCategory: string;
  readinessScore: number;
  
  examAnalysis: ExamReadiness[];
  
  collegeIntelligence: {
    dream: UGCollegeMatch[];
    target: UGCollegeMatch[];
    safe: UGCollegeMatch[];
  };
  
  weaknesses: string[];
  
  improvementPlan: {
    shortTerm: string[];
    mediumTerm: string[];
    longTerm: string[];
  };
  
  finalAnswers: {
    degree: string;
    exams: string;
    colleges: string;
    scoreNeed: string;
    weakness: string;
    improve: string;
    mbaPathway: string;
  };
}

export class UGProfileEngine {
  profile: Student12thProfileInput;

  constructor(profile: Student12thProfileInput) {
    this.profile = profile;
  }

  evaluateAcademicScore(): number {
    const p10 = this.profile.percentile10th || 0;
    const p12 = this.profile.percentile12th || 0;
    // 40% 10th, 60% 12th
    return Math.min(100, Math.round((p10 * 0.40) + (p12 * 0.60)));
  }

  getAcademicCategory(score: number): string {
    if (score >= 90) return "Exceptional";
    if (score >= 80) return "Strong";
    if (score >= 70) return "Good";
    if (score >= 60) return "Average";
    return "Needs Improvement";
  }

  calculateReadinessScore(acadScore: number): number {
    // A simplified readiness score combining academics and mock tests if available
    const readiness = acadScore * 0.7; 
    let examBoost = 0;
    
    const mockKeys = Object.keys(this.profile.mockScores || {});
    if (mockKeys.length > 0) {
      // average mock score percentage (assuming scores are out of varying totals, let's treat them abstractly as readiness %. In reality, NPAT is out of 120, IPMAT out of 400. For simplicity in this demo, let's say the mock score provided represents a rough readiness percentage or we scale it)
      // Since it's arbitrary user input, we'll just give a flat boost or map it. Let's cap at 30 points.
      examBoost = 20; // flat boost for taking mocks
    } else {
      examBoost = 10; // baseline if no mocks
    }
    
    return Math.min(100, Math.round(readiness + examBoost));
  }

  getRecommendedScore(exam: string): string {
    const map: Record<string, string> = {
      "IPMAT": "240+",
      "NPAT": "85+", // Usually out of 120, but let's say 85+
      "SET": "45+", // Out of 60
      "CUET": "750+", // Out of 800
      "UGAT": "100+", 
      "Christ Entrance Test": "80+"
    };
    return map[exam] || "Depends on college";
  }

  analyzeExams(): ExamReadiness[] {
    return (this.profile.examGoals || []).map(exam => {
      const mockScore = this.profile.mockScores?.[exam];
      let currentReadiness = "Pending";
      let prep = "High";
      
      if (mockScore) {
        currentReadiness = mockScore.toString();
        // Just generic logic for demo
        prep = "Medium";
      } else {
        currentReadiness = "Pending";
        prep = "High (Start Mocks)";
      }
      
      return {
        exam,
        currentReadiness: currentReadiness === "Pending" ? "Pending" : `${currentReadiness} pts`,
        recommendedPrep: prep
      };
    });
  }

  matchColleges(readinessScore: number) {
    const dream: UGCollegeMatch[] = [];
    const target: UGCollegeMatch[] = [];
    const safe: UGCollegeMatch[] = [];

    const targetCollegeIds = this.profile.targetBachelorColleges || [];
    
    // Evaluate selected colleges
    for (const collegeId of targetCollegeIds) {
      const college = mockUGColleges.find(c => c.id === collegeId) || mockUGColleges.find(c => c.name === collegeId);
      if (!college) continue;

      const primaryExam = college.acceptedExams[0];
      const recScore = this.getRecommendedScore(primaryExam);
      const mockScore = this.profile.mockScores?.[primaryExam];
      
      let gap = "Unknown";
      if (mockScore) {
        const recNumber = parseInt(recScore.replace("+", ""));
        if (!isNaN(recNumber)) {
          const diff = recNumber - mockScore;
          gap = diff > 0 ? `${diff} Marks` : "On Track";
        }
      }

      const match: UGCollegeMatch = {
        name: college.name,
        exam: primaryExam,
        recommendedScore: recScore,
        currentReadiness: mockScore || "Pending",
        gap: gap,
        tier: college.tier
      };

      // Classification logic based on tier and readiness
      if (college.tier === 1) {
        if (readinessScore >= 90) target.push(match);
        else dream.push(match);
      } else if (college.tier === 2) {
        if (readinessScore >= 85) safe.push(match);
        else if (readinessScore >= 75) target.push(match);
        else dream.push(match);
      } else {
        if (readinessScore >= 70) safe.push(match);
        else target.push(match);
      }
    }

    return { dream, target, safe };
  }

  detectWeaknesses(): string[] {
    const w: string[] = [];
    if (this.profile.percentile10th < 75 || this.profile.percentile12th < 75) {
      w.push("Low Expected Percentage - Focus on board exams.");
    }
    if (Object.keys(this.profile.mockScores || {}).length === 0) {
      w.push("No Mock Test History - Hard to gauge actual exam readiness.");
    }
    if (this.profile.stream === "Arts" && this.profile.examGoals.includes("IPMAT")) {
      w.push("Weak Quant Aptitude - Arts students typically need extra effort for IPMAT Quant.");
    }
    return w;
  }

  generateReport(): Student12thProfileReport {
    const acadScore = this.evaluateAcademicScore();
    const readinessScore = this.calculateReadinessScore(acadScore);
    const collegeIntelligence = this.matchColleges(readinessScore);
    const weaknesses = this.detectWeaknesses();

    return {
      userType: "12th Student",
      academicScore: acadScore,
      academicCategory: this.getAcademicCategory(acadScore),
      readinessScore: readinessScore,
      examAnalysis: this.analyzeExams(),
      collegeIntelligence,
      weaknesses,
      improvementPlan: {
        shortTerm: ["Improve core basics for target exams", "Complete 2-3 Mock Tests to set a baseline"],
        mediumTerm: ["Weekly Mock Analysis", "Time Management Practice"],
        longTerm: ["Secure Bachelor Admission", "Plan Internships for year 2", "Long-term MBA Preparation Strategy"]
      },
      finalAnswers: {
        degree: `Pursue ${this.profile.targetDegree} based on your interest.`,
        exams: `Focus on: ${this.profile.examGoals.join(", ")}.`,
        colleges: `Dream: ${collegeIntelligence.dream.length}, Target: ${collegeIntelligence.target.length}, Safe: ${collegeIntelligence.safe.length}`,
        scoreNeed: `Check the required score analysis section for specific targets.`,
        weakness: weaknesses.length > 0 ? weaknesses.join(" | ") : "No major weaknesses.",
        improve: "Follow the 0-6 month improvement plan.",
        mbaPathway: "12th → Bachelor Degree → Maintain CGPA 8+ → Internships → Leadership → CAT Prep → MBA"
      }
    };
  }
}
