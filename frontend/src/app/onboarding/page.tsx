"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

const steps = [
  "Academic Info",
  "Work Experience",
  "MBA Goals",
  "Preparation",
  "Finish",
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      router.push("/dashboard");
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Academic Information</h2>
            <p className="text-muted-foreground text-sm mb-6">Let's start with your past academic performance.</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="10th">10th Percentage</Label>
                <Input id="10th" placeholder="e.g. 85" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="12th">12th Percentage</Label>
                <Input id="12th" placeholder="e.g. 90" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="grad-score">Graduation Score</Label>
                <Input id="grad-score" placeholder="e.g. 8.5 CGPA" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="grad-stream">Graduation Stream</Label>
                <Input id="grad-stream" placeholder="e.g. Engineering" />
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Work Experience</h2>
            <p className="text-muted-foreground text-sm mb-6">Tell us about your professional background.</p>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Status</Label>
                <div className="flex gap-4">
                  <Button variant="outline" className="w-full justify-start text-left font-normal bg-white">Fresher</Button>
                  <Button variant="outline" className="w-full justify-start text-left font-normal bg-white border-primary text-primary">Experienced</Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="exp-months">Experience (Months)</Label>
                <Input id="exp-months" placeholder="e.g. 24" type="number" />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">MBA Goals</h2>
            <p className="text-muted-foreground text-sm mb-6">What are you aiming for?</p>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="target-percentile">Target Percentile</Label>
                <Input id="target-percentile" placeholder="e.g. 99.5" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="target-colleges">Target Colleges</Label>
                <Input id="target-colleges" placeholder="e.g. IIM A, B, C" />
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Preparation</h2>
            <p className="text-muted-foreground text-sm mb-6">How are you planning to study?</p>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="weak-areas">Weak Areas</Label>
                <Input id="weak-areas" placeholder="e.g. Quantitative Ability, DILR" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="study-hours">Daily Study Hours</Label>
                <Input id="study-hours" placeholder="e.g. 4" type="number" />
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4 text-center py-8">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">✨</span>
            </div>
            <h2 className="text-2xl font-semibold">You're all set!</h2>
            <p className="text-muted-foreground text-sm max-w-xs mx-auto">
              We have analyzed your profile. Click below to generate your personalized study plan and access your dashboard.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="mb-8">
          <div className="flex justify-between text-xs text-muted-foreground mb-2">
            <span>Step {currentStep + 1} of {steps.length}</span>
            <span className="font-medium text-primary">{steps[currentStep]}</span>
          </div>
          <Progress value={((currentStep + 1) / steps.length) * 100} className="h-2" />
        </div>

        <div className="bg-card border border-border shadow-apple-soft rounded-2xl p-6 sm:p-8 overflow-hidden min-h-[400px] flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex-1"
            >
              {renderStepContent()}
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-between pt-4 border-t border-border">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={currentStep === 0}
              className={currentStep === 0 ? "opacity-0" : ""}
            >
              Back
            </Button>
            <Button onClick={handleNext} className="bg-primary hover:bg-primary/90 text-white min-w-[120px]">
              {currentStep === steps.length - 1 ? "Generate Profile" : "Continue"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
