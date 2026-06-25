export interface College {
  college_id: string;
  college_name: string;
  city: string;
  tier: 1 | 2 | 3;
  fees: string;
  average_package: string;
  highest_package: string;
  ranking: number;
  accepted_exams: string[];
}

export type Category = "General" | "OBC-NCL" | "SC" | "ST" | "EWS" | "PwD";

export interface Cutoff {
  college_id: string;
  year: number;
  exam: string;
  category: Category;
  cutoff_percentile: number;
  gender_segment?: "Male" | "Female" | "Other";
  academic_background?: "Engineering" | "Non-Engineering";
}

export interface AdmissionCriteria {
  college_id: string;
  criteria_type: "percentile" | "academic_diversity" | "work_experience" | "gender_diversity" | "extracurricular" | "wat_pi";
  weight_percentage: number;
}

export const mockColleges: College[] = [
  // Dream (Tier 1)
  {
    college_id: "IIMA",
    college_name: "IIM Ahmedabad",
    city: "Ahmedabad",
    tier: 1,
    fees: "25 Lakhs",
    average_package: "32.8 Lakhs",
    highest_package: "1.15 Crores",
    ranking: 1,
    accepted_exams: ["CAT", "GMAT"],
  },
  {
    college_id: "IIMB",
    college_name: "IIM Bangalore",
    city: "Bangalore",
    tier: 1,
    fees: "24.5 Lakhs",
    average_package: "35.3 Lakhs",
    highest_package: "1.2 Crores",
    ranking: 2,
    accepted_exams: ["CAT", "GMAT"],
  },
  {
    college_id: "IIMC",
    college_name: "IIM Calcutta",
    city: "Kolkata",
    tier: 1,
    fees: "23 Lakhs",
    average_package: "34.2 Lakhs",
    highest_package: "1.1 Crores",
    ranking: 3,
    accepted_exams: ["CAT", "GMAT"],
  },
  // Target (Tier 1/2)
  {
    college_id: "SPJIMR",
    college_name: "SPJIMR",
    city: "Mumbai",
    tier: 1,
    fees: "22 Lakhs",
    average_package: "32 Lakhs",
    highest_package: "77 Lakhs",
    ranking: 4,
    accepted_exams: ["CAT", "GMAT", "XAT"],
  },
  {
    college_id: "MDI",
    college_name: "MDI Gurgaon",
    city: "Gurgaon",
    tier: 1,
    fees: "23.5 Lakhs",
    average_package: "26.7 Lakhs",
    highest_package: "60 Lakhs",
    ranking: 5,
    accepted_exams: ["CAT", "GMAT"],
  },
  {
    college_id: "IIMK",
    college_name: "IIM Kozhikode",
    city: "Kozhikode",
    tier: 1,
    fees: "20.5 Lakhs",
    average_package: "31 Lakhs",
    highest_package: "67 Lakhs",
    ranking: 6,
    accepted_exams: ["CAT"],
  },
  // Safe (Tier 2/3)
  {
    college_id: "IMI",
    college_name: "IMI Delhi",
    city: "Delhi",
    tier: 2,
    fees: "19.2 Lakhs",
    average_package: "17 Lakhs",
    highest_package: "50 Lakhs",
    ranking: 15,
    accepted_exams: ["CAT", "XAT", "GMAT"],
  },
  {
    college_id: "TAPMI",
    college_name: "TAPMI",
    city: "Manipal",
    tier: 2,
    fees: "16 Lakhs",
    average_package: "14.6 Lakhs",
    highest_package: "32 Lakhs",
    ranking: 20,
    accepted_exams: ["CAT", "XAT", "NMAT"],
  },
  {
    college_id: "IMT",
    college_name: "IMT Ghaziabad",
    city: "Ghaziabad",
    tier: 2,
    fees: "19.5 Lakhs",
    average_package: "17.3 Lakhs",
    highest_package: "65 Lakhs",
    ranking: 18,
    accepted_exams: ["CAT", "XAT", "GMAT"],
  },
];

export const mockCutoffs: Cutoff[] = [
  // IIMA
  { college_id: "IIMA", year: 2026, exam: "CAT", category: "General", cutoff_percentile: 99.5 },
  { college_id: "IIMA", year: 2026, exam: "CAT", category: "OBC-NCL", cutoff_percentile: 95.0 },
  { college_id: "IIMA", year: 2026, exam: "CAT", category: "EWS", cutoff_percentile: 96.0 },
  { college_id: "IIMA", year: 2026, exam: "CAT", category: "SC", cutoff_percentile: 85.0 },
  { college_id: "IIMA", year: 2026, exam: "CAT", category: "ST", cutoff_percentile: 75.0 },
  { college_id: "IIMA", year: 2026, exam: "CAT", category: "PwD", cutoff_percentile: 70.0 },

  // IIMB
  { college_id: "IIMB", year: 2026, exam: "CAT", category: "General", cutoff_percentile: 99.3 },
  { college_id: "IIMB", year: 2026, exam: "CAT", category: "OBC-NCL", cutoff_percentile: 94.0 },
  { college_id: "IIMB", year: 2026, exam: "CAT", category: "EWS", cutoff_percentile: 95.0 },
  { college_id: "IIMB", year: 2026, exam: "CAT", category: "SC", cutoff_percentile: 84.0 },
  { college_id: "IIMB", year: 2026, exam: "CAT", category: "ST", cutoff_percentile: 74.0 },
  { college_id: "IIMB", year: 2026, exam: "CAT", category: "PwD", cutoff_percentile: 69.0 },

  // IIMC
  { college_id: "IIMC", year: 2026, exam: "CAT", category: "General", cutoff_percentile: 99.4 },
  { college_id: "IIMC", year: 2026, exam: "CAT", category: "OBC-NCL", cutoff_percentile: 94.5 },
  { college_id: "IIMC", year: 2026, exam: "CAT", category: "EWS", cutoff_percentile: 95.5 },
  { college_id: "IIMC", year: 2026, exam: "CAT", category: "SC", cutoff_percentile: 84.5 },
  { college_id: "IIMC", year: 2026, exam: "CAT", category: "ST", cutoff_percentile: 74.5 },
  { college_id: "IIMC", year: 2026, exam: "CAT", category: "PwD", cutoff_percentile: 69.5 },

  // SPJIMR
  { college_id: "SPJIMR", year: 2026, exam: "CAT", category: "General", cutoff_percentile: 98.0 },
  { college_id: "SPJIMR", year: 2026, exam: "CAT", category: "OBC-NCL", cutoff_percentile: 93.0 },
  { college_id: "SPJIMR", year: 2026, exam: "CAT", category: "EWS", cutoff_percentile: 94.0 },
  { college_id: "SPJIMR", year: 2026, exam: "CAT", category: "SC", cutoff_percentile: 80.0 },
  { college_id: "SPJIMR", year: 2026, exam: "CAT", category: "ST", cutoff_percentile: 70.0 },
  { college_id: "SPJIMR", year: 2026, exam: "CAT", category: "PwD", cutoff_percentile: 65.0 },

  // MDI
  { college_id: "MDI", year: 2026, exam: "CAT", category: "General", cutoff_percentile: 97.5 },
  { college_id: "MDI", year: 2026, exam: "CAT", category: "OBC-NCL", cutoff_percentile: 92.0 },
  { college_id: "MDI", year: 2026, exam: "CAT", category: "EWS", cutoff_percentile: 93.5 },
  { college_id: "MDI", year: 2026, exam: "CAT", category: "SC", cutoff_percentile: 78.0 },
  { college_id: "MDI", year: 2026, exam: "CAT", category: "ST", cutoff_percentile: 68.0 },
  { college_id: "MDI", year: 2026, exam: "CAT", category: "PwD", cutoff_percentile: 63.0 },

  // IIMK
  { college_id: "IIMK", year: 2026, exam: "CAT", category: "General", cutoff_percentile: 98.5 },
  { college_id: "IIMK", year: 2026, exam: "CAT", category: "OBC-NCL", cutoff_percentile: 93.5 },
  { college_id: "IIMK", year: 2026, exam: "CAT", category: "EWS", cutoff_percentile: 94.5 },
  { college_id: "IIMK", year: 2026, exam: "CAT", category: "SC", cutoff_percentile: 82.0 },
  { college_id: "IIMK", year: 2026, exam: "CAT", category: "ST", cutoff_percentile: 72.0 },
  { college_id: "IIMK", year: 2026, exam: "CAT", category: "PwD", cutoff_percentile: 68.0 },

  // IMI
  { college_id: "IMI", year: 2026, exam: "CAT", category: "General", cutoff_percentile: 88.0 },
  { college_id: "IMI", year: 2026, exam: "CAT", category: "OBC-NCL", cutoff_percentile: 83.0 },
  { college_id: "IMI", year: 2026, exam: "CAT", category: "EWS", cutoff_percentile: 84.0 },
  { college_id: "IMI", year: 2026, exam: "CAT", category: "SC", cutoff_percentile: 75.0 },
  { college_id: "IMI", year: 2026, exam: "CAT", category: "ST", cutoff_percentile: 65.0 },
  { college_id: "IMI", year: 2026, exam: "CAT", category: "PwD", cutoff_percentile: 60.0 },

  // TAPMI
  { college_id: "TAPMI", year: 2026, exam: "CAT", category: "General", cutoff_percentile: 85.0 },
  { college_id: "TAPMI", year: 2026, exam: "CAT", category: "OBC-NCL", cutoff_percentile: 80.0 },
  { college_id: "TAPMI", year: 2026, exam: "CAT", category: "EWS", cutoff_percentile: 81.0 },
  { college_id: "TAPMI", year: 2026, exam: "CAT", category: "SC", cutoff_percentile: 72.0 },
  { college_id: "TAPMI", year: 2026, exam: "CAT", category: "ST", cutoff_percentile: 62.0 },
  { college_id: "TAPMI", year: 2026, exam: "CAT", category: "PwD", cutoff_percentile: 55.0 },

  // IMT
  { college_id: "IMT", year: 2026, exam: "CAT", category: "General", cutoff_percentile: 90.0 },
  { college_id: "IMT", year: 2026, exam: "CAT", category: "OBC-NCL", cutoff_percentile: 85.0 },
  { college_id: "IMT", year: 2026, exam: "CAT", category: "EWS", cutoff_percentile: 86.0 },
  { college_id: "IMT", year: 2026, exam: "CAT", category: "SC", cutoff_percentile: 78.0 },
  { college_id: "IMT", year: 2026, exam: "CAT", category: "ST", cutoff_percentile: 68.0 },
  { college_id: "IMT", year: 2026, exam: "CAT", category: "PwD", cutoff_percentile: 62.0 },
];

export const mockAdmissionCriteria: AdmissionCriteria[] = [
  // Example criteria
  { college_id: "IIMA", criteria_type: "percentile", weight_percentage: 50 },
  { college_id: "IIMB", criteria_type: "percentile", weight_percentage: 40 },
  { college_id: "IIMC", criteria_type: "percentile", weight_percentage: 60 },
];

