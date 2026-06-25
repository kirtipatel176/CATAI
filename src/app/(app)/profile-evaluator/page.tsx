"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bot, ChevronLeft, ChevronRight, FileText, Calendar, ArrowRight, Award, Target, AlertTriangle, Zap, Navigation, CheckCircle2, ShieldCheck, Brain
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { ProfileEngine, UserProfileInput, ProfileReport, EducationStage } from "@/lib/profile-engine";
import { cn } from "@/lib/utils";

// Default Profile Input
const defaultProfile: Partial<UserProfileInput> = {
  educationStage: undefined,
  reservationCategory: undefined,
  gender: undefined,
  percent10th: undefined,
  percent12th: undefined,
  graduationCGPA: undefined,
  graduationStream: undefined,
  targetExam: undefined,
  attemptYear: undefined,
  targetMBAColleges: [],
  mockPercentile: undefined,
  internshipCount: undefined,
  workExperience: undefined,
  leadershipExperience: undefined
};

type FieldConfig = {
  id: keyof UserProfileInput;
  label: string;
  type: "number" | "text" | "options" | "multi-options";
  options?: string[];
  placeholder?: string;
  optional?: boolean;
  dependsOnStage?: EducationStage[]; // If provided, only show if educationStage is in this array
};

interface StoredReport {
  id: string;
  timestamp: number;
  report: ProfileReport;
}

const allSteps: { title: string; subtitle: string; fields: FieldConfig[] }[] = [
  {
    title: "Start with Basics",
    subtitle: "Tell us about your current status and background.",
    fields: [
      { id: "educationStage", label: "Current Status *", type: "options", options: ["12th Student", "Pursuing Bachelor's", "Completed Bachelor's", "Pursuing Master's", "Completed Master's", "Working Professional"] },
      { id: "reservationCategory", label: "Category *", type: "options", options: ["General", "OBC-NCL", "SC", "ST", "EWS", "PwD"] },
      { id: "gender", label: "Gender", type: "options", options: ["Male", "Female", "Other"], optional: true }
    ]
  },
  {
    title: "Academic Record",
    subtitle: "Your past academic performance carries significant weight.",
    fields: [
      { id: "percent10th", label: "10th Percentage *", type: "number", placeholder: "0 - 100" },
      { id: "percent12th", label: "12th / Expected 12th Percentage *", type: "number", placeholder: "0 - 100" },
      { 
        id: "graduationStream", 
        label: "Graduation Stream *", 
        type: "options", 
        options: ["BBA", "B.Com", "BMS", "B.Tech", "BCA", "BA", "B.Sc", "Other"],
        dependsOnStage: ["Pursuing Bachelor's", "Completed Bachelor's", "Pursuing Master's", "Completed Master's", "Working Professional"] 
      },
      { 
        id: "graduationCGPA", 
        label: "Bachelor CGPA (Current or Final) *", 
        type: "number", 
        placeholder: "0 - 10",
        dependsOnStage: ["Pursuing Bachelor's", "Completed Bachelor's", "Pursuing Master's", "Completed Master's", "Working Professional"] 
      }
    ]
  },
  {
    title: "Target Goals",
    subtitle: "What are you aiming for?",
    fields: [
      { id: "targetExam", label: "Target Exam *", type: "options", options: ["CAT", "XAT", "SNAP", "NMAT", "CMAT"] },
      { id: "attemptYear", label: "Attempt Year *", type: "options", options: ["2026", "2027", "2028", "2029"] },
      { id: "targetMBAColleges", label: "Target MBA Colleges (Max 10) *", type: "multi-options", options: ["IIM Ahmedabad", "IIM Bangalore", "IIM Calcutta", "SPJIMR", "MDI Gurgaon", "IIFT", "IMI Delhi", "TAPMI", "FMS Delhi", "XLRI Jamshedpur"] },
      { id: "mockPercentile", label: "Latest Mock Percentile", type: "number", placeholder: "Leave blank if not attempted", optional: true }
    ]
  },
  {
    title: "Experience & Leadership",
    subtitle: "Professional exposure enhances your profile.",
    fields: [
      { 
        id: "internshipCount", 
        label: "Internships Completed", 
        type: "options", 
        options: ["0", "1", "2", "3+"], 
        optional: true,
        dependsOnStage: ["Pursuing Bachelor's", "Completed Bachelor's", "Pursuing Master's", "Completed Master's", "Working Professional"] 
      },
      { 
        id: "workExperience", 
        label: "Full-Time Work Experience", 
        type: "options", 
        options: ["0 Months", "1-6 Months", "6-12 Months", "12-24 Months", "24-36 Months", "36+ Months"], 
        optional: true,
        dependsOnStage: ["Completed Bachelor's", "Pursuing Master's", "Completed Master's", "Working Professional"]
      },
      { id: "leadershipExperience", label: "Leadership Experience", type: "options", options: ["Yes", "No"], optional: true }
    ]
  },
  {
    title: "Generate Intelligence",
    subtitle: "Review your details and let AI analyze your profile.",
    fields: []
  }
];

export default function ProfileIntelligencePage() {
  const router = useRouter();
  
  // UI State
  const [mounted, setMounted] = useState(false);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [profile, setProfile] = useState<Partial<UserProfileInput>>(defaultProfile);
  
  const autoAdvanceTimeout = useRef<NodeJS.Timeout | null>(null);
  
  const [history, setHistory] = useState<StoredReport[]>([]);
  
  useEffect(() => {
    setMounted(true);
    // Load from local storage
    const loaded: StoredReport[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("profile_report_")) {
        const data = localStorage.getItem(key);
        if (data) {
          try {
            const report = JSON.parse(data);
            const idParts = key.split("rep_");
            const timestamp = idParts.length > 1 ? parseInt(idParts[1]) : 0;
            loaded.push({ id: key.replace("profile_report_", ""), timestamp, report });
          } catch(e) {}
        }
      }
    }
    loaded.sort((a, b) => b.timestamp - a.timestamp);
    setHistory(loaded);
  }, []);

  const latestReport = history.length > 0 ? history[0].report : null;
  const latestId = history.length > 0 ? history[0].id : null;

  // Filter fields based on the selected education stage
  const currentStage = profile.educationStage as EducationStage | undefined;
  
  const dynamicSteps = allSteps.map(step => ({
      ...step,
      fields: step.fields.filter(f => !f.dependsOnStage || (currentStage && f.dependsOnStage.includes(currentStage)))
  }));

  const safeStepIndex = Math.min(Math.max(0, currentStepIndex), dynamicSteps.length - 1);
  const currentStep = dynamicSteps[safeStepIndex];
  
  const progressPercent = Math.round(((safeStepIndex + 1) / dynamicSteps.length) * 100);

  const validateCurrentStep = () => {
    if (safeStepIndex === 0) {
      if (!profile.educationStage) return "Current Status is required.";
      if (!profile.reservationCategory) return "Category is required.";
    }
    if (safeStepIndex === 1) {
      if (profile.percent10th === undefined || profile.percent10th === null || profile.percent10th <= 0 || profile.percent10th > 100) return "Valid 10th Percentage is required.";
      if (profile.percent12th === undefined || profile.percent12th === null || profile.percent12th <= 0 || profile.percent12th > 100) return "Valid 12th Percentage is required.";
      
      const gradRequired = ["Pursuing Bachelor's", "Completed Bachelor's", "Pursuing Master's", "Completed Master's", "Working Professional"].includes(profile.educationStage || "");
      if (gradRequired) {
          if (!profile.graduationStream) return "Graduation Stream is required.";
          if (profile.graduationCGPA === undefined || profile.graduationCGPA === null || profile.graduationCGPA <= 0 || profile.graduationCGPA > 10) return "Valid Bachelor CGPA is required (0-10).";
      }
    }
    if (safeStepIndex === 2) {
      if (!profile.targetExam) return "Target Exam is required.";
      if (!profile.attemptYear) return "Attempt Year is required.";
      if (!profile.targetMBAColleges || profile.targetMBAColleges.length === 0) return "Please select at least 1 Target MBA College.";
    }
    // Step 3 (Experience) is all optional fields
    return null;
  };

  const handleNext = () => {
    if (autoAdvanceTimeout.current) {
      clearTimeout(autoAdvanceTimeout.current);
      autoAdvanceTimeout.current = null;
    }

    const error = validateCurrentStep();
    if (error) {
      toast.error(error);
      return;
    }

    if (currentStepIndex < dynamicSteps.length - 1) {
      setDirection(1);
      setCurrentStepIndex(prev => Math.min(prev + 1, dynamicSteps.length - 1));
    } else {
      submitForm();
    }
  };

  const handleBack = () => {
    if (autoAdvanceTimeout.current) {
      clearTimeout(autoAdvanceTimeout.current);
      autoAdvanceTimeout.current = null;
    }

    if (currentStepIndex > 0) {
      setDirection(-1);
      setCurrentStepIndex(prev => Math.max(prev - 1, 0));
    }
  };

  const updateField = (field: keyof UserProfileInput, value: string | number | string[] | undefined) => {
    const currentFieldConfig = currentStep.fields.find(f => f.id === field);
    
    if (currentFieldConfig && currentFieldConfig.type === "multi-options") {
      setProfile(prev => {
        const currentArr = (prev[field] as string[]) || [];
        if (currentArr.includes(value as string)) {
          return { ...prev, [field]: currentArr.filter(v => v !== value) };
        } else {
          // Limit to max 10
          if (currentArr.length >= 10) {
            toast.error("Maximum 10 colleges allowed.");
            return prev;
          }
          return { ...prev, [field]: [...currentArr, value] };
        }
      });
    } else {
      setProfile(prev => ({ ...prev, [field]: value }));
      if (currentFieldConfig && currentFieldConfig.type === "options") {
        if (autoAdvanceTimeout.current) clearTimeout(autoAdvanceTimeout.current);
        
        const allFieldsFilled = currentStep.fields.every(f => {
          if (f.id === field) return true; // currently updated field
          const val = profile[f.id];
          if (f.type === "multi-options") return Array.isArray(val) && val.length > 0;
          return val !== undefined && val !== null && val !== "";
        });

        autoAdvanceTimeout.current = setTimeout(() => {
          // Only auto advance if no validation errors on this step and all visible fields are filled
          if (!validateCurrentStep() && allFieldsFilled) handleNext();
        }, 400); 
      }
    }
  };

  const submitForm = () => {
    const reportId = `rep_${Date.now()}`;
    // Assign default 0s to fields that weren't rendered because of stage filtering (so the engine doesn't break)
    const finalProfile: UserProfileInput = {
        educationStage: profile.educationStage as EducationStage,
        reservationCategory: profile.reservationCategory as string,
        targetExam: profile.targetExam as string,
        attemptYear: profile.attemptYear as string,
        targetMBAColleges: profile.targetMBAColleges as string[],
        percent10th: profile.percent10th || 0,
        percent12th: profile.percent12th || 0,
        graduationCGPA: profile.graduationCGPA || 0,
        graduationStream: profile.graduationStream || "N/A",
        mockPercentile: profile.mockPercentile,
        internshipCount: profile.internshipCount,
        workExperience: profile.workExperience,
        leadershipExperience: profile.leadershipExperience,
        gender: profile.gender
    };
    
    const engine = new ProfileEngine(finalProfile);
    const report = engine.generateReport();
    localStorage.setItem(`profile_report_${reportId}`, JSON.stringify(report));
    setIsWizardOpen(false);
    toast.success("Intelligence Engine analyzing profile...");
    router.push(`/profile-evaluator/report/${reportId}`);
  };

  // Fluid UI animations
  const variants: any = {
    enter: (direction: number) => ({ x: direction > 0 ? 40 : -40, opacity: 0, scale: 0.98 }),
    center: { zIndex: 1, x: 0, opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 30 } },
    exit: (direction: number) => ({ zIndex: 0, x: direction < 0 ? 40 : -40, opacity: 0, scale: 0.98, transition: { type: "spring", stiffness: 300, damping: 30 } })
  };

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen w-full pb-32 bg-[#FAFAFA] text-gray-900 selection:bg-indigo-500/20">
      
      {/* Background ambient glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
        <div className="w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-indigo-200/50 blur-[120px] rounded-full mix-blend-multiply opacity-30"></div>
      </div>

      {!isWizardOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative z-10 pt-16 w-full max-w-[1000px] mx-auto px-4 sm:px-8 space-y-10">
          
          <div className="relative w-full rounded-[32px] overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-8 sm:p-12 md:p-16 text-white shadow-2xl border border-white/20">
            <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-20 mix-blend-overlay z-0"></div>
            
            <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto">
              <div className="h-16 w-16 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center mb-6 shadow-xl border border-white/20">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6">Profile Intelligence</h1>
              <p className="text-white/90 text-lg md:text-xl font-medium mb-10 leading-relaxed">
                Discover your exact college admit probabilities using our proprietary admission intelligence engine. Find your dream, target, and safe schools.
              </p>
              <button 
                onClick={() => setIsWizardOpen(true)} 
                className="bg-white text-indigo-600 hover:scale-105 px-10 py-5 rounded-full font-bold text-lg shadow-2xl transition-all flex items-center gap-3"
              >
                {latestReport ? 'Recalculate Profile' : 'Start Intelligent Assessment'} <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {latestReport && latestId && (
            <section className="space-y-6 pt-10">
               <div className="flex items-center justify-between">
                 <h2 className="text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-3">
                   <Target className="h-6 w-6 text-indigo-500" /> Your Current Standing
                 </h2>
                 <Button variant="ghost" onClick={() => router.push(`/profile-evaluator/report/${latestId}`)} className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 font-bold">
                   Open Full Report <ArrowRight className="ml-2 h-4 w-4" />
                 </Button>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {/* Score Card */}
                 <div className="bg-white rounded-[24px] p-8 border border-gray-200 shadow-sm hover:shadow-md transition-all group cursor-pointer" onClick={() => router.push(`/profile-evaluator/report/${latestId}`)}>
                   <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">Overall Score</p>
                   <p className="text-6xl font-black text-gray-900 mb-2">{latestReport.overallScore}<span className="text-2xl text-gray-400">/100</span></p>
                   <p className="text-indigo-600 font-bold text-lg">{latestReport.profileCategory}</p>
                 </div>

                 {/* Top Weaknesses */}
                 <div className="md:col-span-2 bg-white rounded-[24px] p-8 border border-gray-200 shadow-sm">
                   <div className="flex items-center gap-3 mb-6">
                     <AlertTriangle className="h-5 w-5 text-rose-500" />
                     <h3 className="text-lg font-bold text-gray-900">Critical Weaknesses</h3>
                   </div>
                   {latestReport.weaknesses.length > 0 ? (
                     <div className="grid sm:grid-cols-2 gap-4">
                       {latestReport.weaknesses.slice(0, 2).map((w, i) => (
                         <div key={i} className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                           <div className="flex justify-between items-start mb-2">
                             <span className="font-bold text-gray-900">{w.weakness}</span>
                             <span className="text-xs font-bold text-rose-600 bg-rose-100 px-2 py-1 rounded-full">{w.severity}</span>
                           </div>
                           <p className="text-xs text-gray-500 line-clamp-2">{w.impact}</p>
                         </div>
                       ))}
                     </div>
                   ) : (
                     <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl flex items-center gap-3">
                       <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                       <p className="text-sm text-emerald-700 font-medium">No major weaknesses detected. Solid profile!</p>
                     </div>
                   )}
                 </div>
               </div>
            </section>
          )}
        </motion.div>
      )}

      <AnimatePresence>
        {isWizardOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#FAFAFA]/95 backdrop-blur-xl flex flex-col"
          >
            <div className="w-full max-w-4xl mx-auto pt-8 px-6 shrink-0">
              <div className="flex items-center justify-between mb-8">
                <Button variant="ghost" onClick={() => setIsWizardOpen(false)} className="text-gray-500 hover:text-gray-900 -ml-4 rounded-full font-semibold">
                   Cancel Assessment
                </Button>
                <div className="text-sm font-bold text-gray-400 tracking-widest uppercase">Step {currentStepIndex + 1} of {dynamicSteps.length}</div>
              </div>
              
              <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden relative">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  className="absolute top-0 left-0 h-full bg-indigo-600 shadow-[0_0_10px_rgba(79,70,229,0.5)] rounded-full"
                  transition={{ type: "spring", stiffness: 100, damping: 20 }}
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto flex flex-col max-w-3xl mx-auto w-full px-6 py-12 relative">
              <AnimatePresence custom={direction} mode="wait">
                <motion.div
                  key={currentStepIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="w-full flex-1 flex flex-col justify-center pb-20"
                >
                  <div className="mb-10 text-center">
                    <h2 className="text-4xl font-black text-gray-900 mb-3 tracking-tight">
                      {currentStep.title}
                    </h2>
                    <p className="text-gray-500 text-lg font-medium">{currentStep.subtitle}</p>
                  </div>

                  {safeStepIndex === dynamicSteps.length - 1 ? (
                    <div className="space-y-6 max-w-2xl mx-auto w-full">
                      <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-xl space-y-6">
                        
                        <div className="flex items-center gap-4 border-b border-gray-100 pb-6">
                          <div className="h-12 w-12 rounded-full bg-indigo-50 flex items-center justify-center border border-indigo-100">
                            <ShieldCheck className="h-6 w-6 text-indigo-600" />
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-900 text-xl">Data Verified</h3>
                            <p className="text-sm text-gray-500">Ready for intelligence processing</p>
                          </div>
                        </div>

                        <div className="grid gap-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-500 font-medium">Demographics</span>
                            <span className="font-bold text-gray-900">{profile.reservationCategory} • {profile.gender || "Not specified"}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-500 font-medium">Academics</span>
                            <span className="font-bold text-gray-900">{profile.percent10th}% (10th) • {profile.percent12th}% (12th)</span>
                          </div>
                          {(profile.graduationCGPA || profile.graduationStream) && (
                             <div className="flex justify-between items-center">
                               <span className="text-gray-500 font-medium">Graduation</span>
                               <span className="font-bold text-gray-900">{profile.graduationCGPA} CGPA ({profile.graduationStream})</span>
                             </div>
                          )}
                          <div className="flex justify-between items-center">
                            <span className="text-gray-500 font-medium">Target</span>
                            <span className="font-bold text-gray-900">{profile.targetExam} {profile.attemptYear} • {profile.targetMBAColleges?.length} Colleges</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-500 font-medium">Experience</span>
                            <span className="font-bold text-gray-900 text-right">
                              {profile.workExperience && profile.workExperience !== "0 Months" ? profile.workExperience : "No Work Ex"}
                              <br/>
                              <span className="text-xs text-gray-500">{profile.internshipCount || "0"} Internships</span>
                            </span>
                          </div>
                        </div>

                      </div>
                    </div>
                  ) : (
                    <div className="space-y-10 max-w-2xl mx-auto w-full">
                      {currentStep.fields.map(field => (
                        <div key={field.id} className="space-y-4">
                          <label className="text-base font-bold text-gray-700 flex items-center justify-between">
                            {field.label}
                            {field.optional && <span className="text-xs font-bold uppercase tracking-wider text-gray-400 bg-gray-100 px-2 py-1 rounded">Optional</span>}
                          </label>
                          
                          {(field.type === "options" || field.type === "multi-options") && field.options && (
                            <div className="flex flex-wrap gap-3">
                              {field.options.map(opt => {
                                let isSelected = false;
                                if (field.type === "multi-options") {
                                  const arr = (profile[field.id] as string[]) || [];
                                  isSelected = arr.includes(opt);
                                } else {
                                  isSelected = profile[field.id] === opt;
                                }
                                return (
                                  <button
                                    key={opt}
                                    onClick={() => updateField(field.id, opt)}
                                    className={`px-5 py-3 rounded-xl border-2 transition-all duration-200 font-bold text-sm ${
                                      isSelected 
                                        ? "border-indigo-600 bg-indigo-600 text-white shadow-md scale-[1.02]" 
                                        : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                                    }`}
                                  >
                                    {opt}
                                  </button>
                                );
                              })}
                            </div>
                          )}

                          {(field.type === "text" || field.type === "number") && (
                            <Input 
                              type={field.type}
                              placeholder={field.placeholder}
                              value={profile[field.id] === undefined ? "" : (profile[field.id] as any)}
                              onChange={(e) => {
                                const val = e.target.value;
                                updateField(field.id, field.type === "number" ? (val === "" ? undefined : Number(val)) : val);
                              }}
                              onKeyDown={(e) => { if (e.key === "Enter") handleNext(); }}
                              className="h-16 rounded-xl bg-white border-2 border-gray-200 focus:border-indigo-600 focus:ring-0 text-xl px-6 shadow-sm text-gray-900 placeholder:text-gray-300 font-bold transition-all"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                </motion.div>
              </AnimatePresence>
            </div>

            <div className="w-full max-w-4xl mx-auto p-6 flex items-center justify-between shrink-0 bg-white/80 backdrop-blur-md border-t border-gray-200">
              <Button 
                variant="ghost" 
                onClick={handleBack} 
                disabled={currentStepIndex === 0}
                className={`h-14 px-6 rounded-full text-base font-bold transition-all ${currentStepIndex === 0 ? 'opacity-0 pointer-events-none' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'}`}
              >
                <ChevronLeft className="mr-2 h-5 w-5" /> Back
              </Button>
              
              <Button 
                onClick={handleNext}
                className="h-14 px-8 rounded-full bg-gray-900 text-white text-base font-black hover:bg-black hover:scale-105 transition-all shadow-lg"
              >
                {currentStepIndex === dynamicSteps.length - 1 ? (
                  <>Generate Report <Bot className="ml-2 h-5 w-5" /></>
                ) : (
                  <>Continue <ChevronRight className="ml-2 h-5 w-5" /></>
                )}
              </Button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
