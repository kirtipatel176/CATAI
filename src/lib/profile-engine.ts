import { mockColleges, mockCutoffs } from "./mock-profile-data";

export type EducationStage = 
  | "Pursuing Bachelor's"
  | "Completed Bachelor's"
  | "Pursuing Master's"
  | "Completed Master's"
  | "Working Professional";

export interface UserProfileInput {
  // Step 1: Academic
  educationStage: EducationStage;
  percent10th: number;
  percent12th: number;
  graduationCGPA: number;
  graduationStream: string;

  // Step 2: MBA Goal
  targetExam: string;
  attemptYear: string;
  targetMBAColleges: string[];
  mockPercentile?: number;

  // Step 3: Experience
  internshipCount?: string; // "0", "1", "2", "3+"
  workExperience?: string; // "0 Months", "1-6 Months", "6-12 Months", "12-24 Months", "24-36 Months", "36+ Months"
  leadershipExperience?: string; // "Yes", "No"
  
  // New Demographics
  reservationCategory: string; // "General", "OBC-NCL", "SC", "ST", "EWS", "PwD"
  gender?: string; // "Male", "Female", "Other"
}

export interface Weakness {
  weakness: string;
  severity: "High" | "Medium" | "Low";
  severityScore: number;
  impact: string;
}

export interface CollegeMatchResult {
  name: string;
  match: number;
  tier: number;
  reqPercentile: number;
  currentPotential: number | string;
  gapPercentile: number;
}

export interface ProfileReport {
  overallScore: number;
  profileCategory: string;
  
  academicScore: number;
  examScore: number;
  internshipScore: number;
  leadershipScore: number;
  workExScore: number;

  weaknesses: Weakness[];
  
  collegeMatches: {
    dream: CollegeMatchResult[];
    target: CollegeMatchResult[];
    safe: CollegeMatchResult[];
  };

  improvementSuggestions: string[];
  finalRecommendation: string;
}

export class ProfileEngine {
  profile: UserProfileInput;

  constructor(profile: UserProfileInput) {
    this.profile = profile;
  }

  evaluateAcademicScore(): number {
    // 50% max points
    // 10th (10%), 12th (10%), Grad (30%)
    const p10 = this.profile.percent10th || 0;
    const p12 = this.profile.percent12th || 0;
    const grad = (this.profile.graduationCGPA / 10) * 100 || 0;
    
    // out of 50
    return (p10 * 0.10) + (p12 * 0.10) + (grad * 0.30);
  }

  evaluateExamScore(): number {
    // 25% max points
    if (!this.profile.mockPercentile) return 0;
    return (this.profile.mockPercentile / 100) * 25;
  }

  evaluateInternshipScore(): number {
    // 10% max points
    switch(this.profile.internshipCount) {
      case "1": return 3.3;
      case "2": return 6.6;
      case "3+": return 10;
      default: return 0;
    }
  }

  evaluateLeadershipScore(): number {
    // 5% max points
    return this.profile.leadershipExperience === "Yes" ? 5 : 0;
  }

  evaluateWorkExScore(): number {
    // 10% max points
    switch(this.profile.workExperience) {
      case "1-6 Months": return 2;
      case "6-12 Months": return 4;
      case "12-24 Months": return 7;
      case "24-36 Months": return 10;
      case "36+ Months": return 10;
      default: return 0;
    }
  }

  calculateOverallScore(): number {
    const total = 
      this.evaluateAcademicScore() + 
      this.evaluateExamScore() + 
      this.evaluateInternshipScore() + 
      this.evaluateLeadershipScore() + 
      this.evaluateWorkExScore();
      
    return Math.min(100, Math.round(total));
  }

  getProfileCategory(score: number) {
    if (score >= 80) return "Strong Profile";
    if (score >= 60) return "Competitive Profile";
    if (score >= 40) return "Average Profile";
    return "Weak Profile";
  }

  detectWeaknesses(score: number): Weakness[] {
    const w: Weakness[] = [];
    
    if (this.evaluateAcademicScore() < 30) {
      w.push({
        weakness: "Low Academic Consistency",
        severity: "High",
        severityScore: 3,
        impact: "Reduces chances at top IIMs which heavily weigh past academics."
      });
    }

    if (!this.profile.mockPercentile) {
      w.push({
        weakness: "No Mock Test Data",
        severity: "High",
        severityScore: 3,
        impact: "Exam readiness is a major component (25%) and critical for accurate college shortlisting."
      });
    } else if (this.profile.mockPercentile < 80) {
       w.push({
        weakness: "Low Entrance Exam Percentile",
        severity: "High",
        severityScore: 3,
        impact: "Directly affects preliminary shortlisting for all target colleges."
      });
    }

    if (this.profile.internshipCount === "0" && (this.profile.workExperience === "0 Months" || !this.profile.workExperience)) {
      w.push({
        weakness: "No Corporate Experience",
        severity: "Medium",
        severityScore: 2,
        impact: "Limits profile scores for top-tier MBA programs that prefer candidates with some professional exposure."
      });
    }

    if (this.profile.leadershipExperience === "No" || !this.profile.leadershipExperience) {
      w.push({
        weakness: "Lack of Leadership Experience",
        severity: "Low",
        severityScore: 1,
        impact: "Missed opportunity to differentiate profile during the personal interview round."
      });
    }

    return w.sort((a, b) => b.severityScore - a.severityScore);
  }

  getEstimatedPercentileNumber(): number {
    if (this.profile.mockPercentile) return this.profile.mockPercentile;
    const score = this.calculateOverallScore();
    // Assuming 0 mock percentile (missing 25 points). Base score max is 75.
    // Let's project based on the non-exam profile score.
    const nonExamScore = score; 
    if (nonExamScore >= 65) return 95;
    if (nonExamScore >= 55) return 90;
    if (nonExamScore >= 45) return 80;
    return 65;
  }

  matchColleges(estPercentile: number) {
    const dream: CollegeMatchResult[] = [];
    const target: CollegeMatchResult[] = [];
    const safe: CollegeMatchResult[] = [];

      const targetExam = this.profile.targetExam || "CAT";
      const userCategory = this.profile.reservationCategory || "General";

      for (const college of mockColleges) {
        // Step 1: Target colleges filter (only show selected colleges)
        if (!this.profile.targetMBAColleges.includes(college.college_name)) continue;

        if (!college.accepted_exams.includes(targetExam)) continue;

        // Try exact category match first, fallback to General
        let fallbackCutoff = mockCutoffs.find(
          c => c.college_id === college.college_id && c.category === userCategory
        );
        if (!fallbackCutoff) {
            fallbackCutoff = mockCutoffs.find(
                c => c.college_id === college.college_id && c.category === "General"
            );
        }
        
        if (!fallbackCutoff) continue;
        const reqPercentile = fallbackCutoff.cutoff_percentile;

        const gapPercentile = Math.max(0, Number((reqPercentile - estPercentile).toFixed(1)));

        const k = college.tier === 1 ? 14 : college.tier === 2 ? 18 : 20;
        const probAdmit = Math.min(98, Math.max(2, 50 - (gapPercentile * k)));

        const res: CollegeMatchResult = {
          name: college.college_name,
          match: Math.round(probAdmit),
          tier: college.tier,
          reqPercentile,
          currentPotential: this.profile.mockPercentile || estPercentile,
          gapPercentile
        };

        if (probAdmit < 50) dream.push(res);
        else if (probAdmit <= 80) target.push(res);
        else safe.push(res);
      }

    dream.sort((a, b) => b.match - a.match);
    target.sort((a, b) => b.match - a.match);
    safe.sort((a, b) => b.match - a.match);

    return { dream, target, safe };
  }

  generateImprovementSuggestions(weaknesses: Weakness[]): string[] {
    const suggestions: string[] = [];
    const wTexts = weaknesses.map(w => w.weakness);

    if (wTexts.includes("No Mock Test Data")) {
      suggestions.push("Take a full-length mock test immediately to establish a baseline percentile.");
    }
    if (wTexts.includes("Low Entrance Exam Percentile")) {
      suggestions.push("Intensify exam preparation, focusing on your weakest section to boost overall percentile.");
    }
    if (wTexts.includes("No Corporate Experience")) {
      suggestions.push("Secure a short-term internship or live project to build foundational corporate experience.");
    }
    if (wTexts.includes("Lack of Leadership Experience")) {
      suggestions.push("Take up a leadership role in a college club, NGO, or workplace initiative.");
    }
    if (wTexts.includes("Low Academic Consistency")) {
      suggestions.push("Ensure your graduation CGPA remains as high as possible, and compensate with a 99+ percentile in CAT/XAT.");
    }

    if (suggestions.length === 0) {
      suggestions.push("Maintain your current trajectory and focus on maximizing your entrance exam score.");
    }

    return suggestions;
  }

  generateRecommendation(score: number, weaknesses: Weakness[]): string {
    if (score >= 80) {
      return "Your profile is highly competitive. Focus entirely on maximizing your entrance exam percentile and preparing for personal interviews to convert top-tier institutions.";
    } else if (score >= 60) {
      return "You have a solid foundation, but targeted improvements in your exam readiness and profile building (internships/leadership) will be necessary to confidently target Tier-1 colleges.";
    } else {
      return "Your profile requires significant building. Prioritize securing an outstanding entrance exam score to offset past academic or experience gaps, and consider gaining more professional experience before applying to top B-schools.";
    }
  }

  generateReport(): ProfileReport {
    const score = this.calculateOverallScore();
    const category = this.getProfileCategory(score);
    const weaknesses = this.detectWeaknesses(score);
    const estNumber = this.getEstimatedPercentileNumber();
    const matches = this.matchColleges(estNumber);
    const suggestions = this.generateImprovementSuggestions(weaknesses);
    const recommendation = this.generateRecommendation(score, weaknesses);

    return {
      overallScore: score,
      profileCategory: category,
      academicScore: Math.round(this.evaluateAcademicScore()),
      examScore: Math.round(this.evaluateExamScore()),
      internshipScore: Math.round(this.evaluateInternshipScore()),
      leadershipScore: Math.round(this.evaluateLeadershipScore()),
      workExScore: Math.round(this.evaluateWorkExScore()),
      weaknesses: weaknesses.slice(0, 3), // Top 3
      collegeMatches: matches,
      improvementSuggestions: suggestions,
      finalRecommendation: recommendation
    };
  }
}
