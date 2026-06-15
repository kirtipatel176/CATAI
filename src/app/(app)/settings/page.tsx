"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  GraduationCap, 
  BookOpen, 
  Shield, 
  Palette, 
  Settings as SettingsIcon,
  Moon,
  Sun,
  Monitor,
  LogOut,
  Trash2,
  Check
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useTheme } from "next-themes";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

// --- CUSTOM COMPONENTS TO MATCH SPECS ---

const GlassCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white/80 dark:bg-zinc-900/80 backdrop-blur-[20px] rounded-[24px] border border-white/50 dark:border-white/10 shadow-sm ${className}`}>
    {children}
  </div>
);

const GradientButton = ({ children, onClick, type = "button", className = "", variant = "primary", disabled = false }: any) => {
  if (variant === "destructive") {
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`px-6 py-3 rounded-[14px] bg-red-500/10 text-red-600 dark:text-red-400 font-medium hover:bg-red-500/20 transition-colors disabled:opacity-50 ${className}`}
      >
        {children}
      </button>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-3 rounded-[14px] bg-gradient-to-r from-[#2563EB] to-[#4F46E5] text-white font-medium shadow-md hover:opacity-90 transition-opacity disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  );
}

// --- SCHEMAS ---

const profileSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
});

const securitySchema = z.object({
  currentPassword: z.string().min(8, "Password must be at least 8 characters"),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Password must be at least 8 characters"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// --- MAIN PAGE ---

const TABS = [
  { id: "profile", label: "Profile", icon: User },
  { id: "exams", label: "Exam Preferences", icon: GraduationCap },
  { id: "preparation", label: "Preparation Preferences", icon: BookOpen },
  { id: "security", label: "Security", icon: Shield },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "account", label: "Account", icon: SettingsIcon },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Form Hooks
  const profileForm = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: { fullName: "Kirti Patel", email: "kirti@vedanco.com" }
  });

  const securityForm = useForm({
    resolver: zodResolver(securitySchema),
    defaultValues: { currentPassword: "", newPassword: "", confirmPassword: "" }
  });

  // Local State for Preferences
  const [targetExams, setTargetExams] = useState<string[]>(["CAT"]);
  const EXAM_OPTIONS = ["CAT", "XAT", "SNAP", "NMAT", "CMAT", "GMAT"];
  
  const [workStatus, setWorkStatus] = useState("Student");
  const [studyTime, setStudyTime] = useState("Morning");
  const [studyHours, setStudyHours] = useState("4");

  // Handlers
  const onProfileSubmit = (data: any) => {
    toast.success("Profile updated successfully!");
  };

  const onSecuritySubmit = (data: any) => {
    toast.success("Password changed successfully!");
    securityForm.reset();
  };

  const onExamPrefsSubmit = () => {
    toast.success("Exam preferences updated!");
  };

  const onPrepPrefsSubmit = () => {
    toast.success("Preparation preferences saved!");
  };

  const handleExamToggle = (exam: string) => {
    setTargetExams(prev => 
      prev.includes(exam) ? prev.filter(e => e !== exam) : [...prev, exam]
    );
  };

  // Renderers for different sections
  const renderProfile = () => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <GlassCard className="p-8">
        <h2 className="text-[20px] font-semibold mb-6 text-slate-900 dark:text-white">Profile Information</h2>
        <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
          
          <div className="flex items-center gap-6 mb-8">
            <div className="w-24 h-24 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 overflow-hidden border-2 border-white dark:border-slate-700 shadow-sm">
              <User size={40} />
            </div>
            <div>
              <Button type="button" variant="outline" className="rounded-[14px]">Change Picture</Button>
              <p className="text-sm text-slate-500 mt-2">JPG, GIF or PNG. Max size of 800K</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" {...profileForm.register("fullName")} className="rounded-[12px] bg-white/50 dark:bg-black/20" />
              {profileForm.formState.errors.fullName && (
                <p className="text-red-500 text-sm">{profileForm.formState.errors.fullName.message as string}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" {...profileForm.register("email")} className="rounded-[12px] bg-white/50 dark:bg-black/20" />
              {profileForm.formState.errors.email && (
                <p className="text-red-500 text-sm">{profileForm.formState.errors.email.message as string}</p>
              )}
            </div>
          </div>
          <div className="pt-4">
            <GradientButton type="submit">Save Changes</GradientButton>
          </div>
        </form>
      </GlassCard>
    </motion.div>
  );

  const renderExamPreferences = () => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <GlassCard className="p-8">
        <h2 className="text-[20px] font-semibold mb-6 text-slate-900 dark:text-white">Exam Preferences</h2>
        <div className="space-y-8">
          <div className="space-y-4">
            <Label className="text-base">Target Exams</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {EXAM_OPTIONS.map(exam => {
                const isSelected = targetExams.includes(exam);
                return (
                  <div 
                    key={exam}
                    onClick={() => handleExamToggle(exam)}
                    className={`flex items-center gap-3 p-4 rounded-[14px] border cursor-pointer transition-all ${isSelected ? 'border-[#2563EB] bg-blue-50/50 dark:bg-blue-900/20 shadow-sm' : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white/50 dark:bg-black/20'}`}
                  >
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${isSelected ? 'border-[#2563EB] bg-[#2563EB]' : 'border-slate-300 dark:border-slate-600'}`}>
                      {isSelected && <Check size={12} className="text-white" />}
                    </div>
                    <span className={`font-medium ${isSelected ? 'text-[#2563EB] dark:text-blue-400' : 'text-slate-700 dark:text-slate-300'}`}>{exam}</span>
                  </div>
                )
              })}
            </div>
          </div>
          
          <div className="space-y-4">
            <Label className="text-base" htmlFor="targetPercentile">Target Percentile</Label>
            <Input id="targetPercentile" defaultValue="99.5" className="rounded-[12px] bg-white/50 dark:bg-black/20 max-w-[200px]" />
          </div>

          <div className="space-y-4">
            <Label className="text-base">Target Colleges (Multi Select)</Label>
            <div className="flex flex-wrap gap-2">
              {['IIM Ahmedabad', 'IIM Bangalore', 'IIM Calcutta', 'FMS Delhi', 'SPJIMR'].map(college => (
                <span key={college} className="px-4 py-2 rounded-full text-sm font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  {college}
                  <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">&times;</button>
                </span>
              ))}
              <button className="px-4 py-2 rounded-full text-sm font-medium border border-dashed border-slate-300 dark:border-slate-700 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                + Add College
              </button>
            </div>
          </div>

          <div className="pt-4">
            <GradientButton onClick={onExamPrefsSubmit}>Update Preferences</GradientButton>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );

  const renderPreparationPreferences = () => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <GlassCard className="p-8">
        <h2 className="text-[20px] font-semibold mb-6 text-slate-900 dark:text-white">Preparation Preferences</h2>
        <div className="space-y-8">
          
          <div className="space-y-4">
            <Label className="text-base">Daily Study Hours</Label>
            <Input 
              type="number" 
              value={studyHours} 
              onChange={(e) => setStudyHours(e.target.value)}
              className="rounded-[12px] bg-white/50 dark:bg-black/20 max-w-[200px]" 
            />
          </div>

          <div className="space-y-4">
            <Label className="text-base">Work Status</Label>
            <div className="flex gap-4">
              {['Student', 'Working Professional'].map(status => (
                <button
                  key={status}
                  onClick={() => setWorkStatus(status)}
                  className={`px-6 py-3 rounded-[14px] font-medium transition-all ${workStatus === status ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md' : 'bg-white/50 dark:bg-black/20 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900'}`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <Label className="text-base">Preferred Study Time</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Morning', 'Afternoon', 'Evening', 'Night'].map(time => (
                <button
                  key={time}
                  onClick={() => setStudyTime(time)}
                  className={`px-4 py-3 rounded-[14px] font-medium transition-all border ${studyTime === time ? 'border-[#2563EB] bg-blue-50/50 dark:bg-blue-900/20 text-[#2563EB] dark:text-blue-400 shadow-sm' : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 bg-white/50 dark:bg-black/20 hover:border-slate-300 dark:hover:border-slate-700'}`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4">
            <GradientButton onClick={onPrepPrefsSubmit}>Save Preferences</GradientButton>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );

  const renderSecurity = () => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <GlassCard className="p-8">
        <h2 className="text-[20px] font-semibold mb-6 text-slate-900 dark:text-white">Password & Security</h2>
        <form onSubmit={securityForm.handleSubmit(onSecuritySubmit)} className="space-y-6 max-w-md">
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input type="password" id="currentPassword" {...securityForm.register("currentPassword")} className="rounded-[12px] bg-white/50 dark:bg-black/20" />
              {securityForm.formState.errors.currentPassword && (
                <p className="text-red-500 text-sm">{securityForm.formState.errors.currentPassword.message as string}</p>
              )}
            </div>
            
            <div className="space-y-2 pt-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input type="password" id="newPassword" {...securityForm.register("newPassword")} className="rounded-[12px] bg-white/50 dark:bg-black/20" />
              {securityForm.formState.errors.newPassword && (
                <p className="text-red-500 text-sm">{securityForm.formState.errors.newPassword.message as string}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input type="password" id="confirmPassword" {...securityForm.register("confirmPassword")} className="rounded-[12px] bg-white/50 dark:bg-black/20" />
              {securityForm.formState.errors.confirmPassword && (
                <p className="text-red-500 text-sm">{securityForm.formState.errors.confirmPassword.message as string}</p>
              )}
            </div>
          </div>

          <div className="pt-4">
            <GradientButton type="submit">Change Password</GradientButton>
          </div>
        </form>
      </GlassCard>
    </motion.div>
  );

  const renderAppearance = () => {
    if (!mounted) return null;

    const THEMES = [
      { id: "light", label: "Light", icon: Sun, preview: "bg-[#F8FAFC] border-slate-200" },
      { id: "dark", label: "Dark", icon: Moon, preview: "bg-[#09090B] border-slate-800" },
      { id: "system", label: "System", icon: Monitor, preview: "bg-gradient-to-r from-[#F8FAFC] to-[#09090B] border-slate-300 dark:border-slate-700" },
    ];

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
        <GlassCard className="p-8">
          <h2 className="text-[20px] font-semibold mb-6 text-slate-900 dark:text-white">Appearance</h2>
          
          <div className="space-y-8">
            <div className="space-y-4">
              <Label className="text-base">Theme Options</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {THEMES.map((t) => {
                  const Icon = t.icon;
                  const isSelected = theme === t.id;
                  return (
                    <div 
                      key={t.id}
                      onClick={() => setTheme(t.id)}
                      className="flex flex-col gap-3 cursor-pointer group"
                    >
                      <div className={`h-32 rounded-[16px] border-2 transition-all ${t.preview} ${isSelected ? 'border-[#2563EB] ring-2 ring-[#2563EB]/20' : 'border-transparent group-hover:border-slate-300 dark:group-hover:border-slate-600'} relative overflow-hidden flex items-center justify-center shadow-sm`}>
                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/5 to-transparent" />
                        {/* Abstract UI Preview inside the card */}
                        <div className="w-2/3 h-2/3 rounded-lg border border-slate-200/50 dark:border-slate-700/50 shadow-sm flex flex-col gap-2 p-3 overflow-hidden bg-white/50 dark:bg-black/50 backdrop-blur-sm">
                          <div className="w-1/3 h-2 rounded bg-slate-200 dark:bg-slate-700" />
                          <div className="w-full h-8 rounded bg-slate-100 dark:bg-slate-800 mt-auto" />
                        </div>
                      </div>
                      <div className="flex items-center gap-2 px-1">
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? 'border-[#2563EB] bg-[#2563EB]' : 'border-slate-300 dark:border-slate-600'}`}>
                           {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                        <Icon size={16} className={isSelected ? 'text-slate-900 dark:text-white' : 'text-slate-500'} />
                        <span className={`font-medium ${isSelected ? 'text-slate-900 dark:text-white' : 'text-slate-500'}`}>{t.label}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
              <GradientButton onClick={() => toast.success("Theme preferences saved!")}>Save Theme</GradientButton>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    );
  };

  const renderAccount = () => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <GlassCard className="p-8">
        <h2 className="text-[20px] font-semibold mb-6 text-slate-900 dark:text-white">Account Management</h2>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 rounded-[16px] bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="font-medium text-slate-900 dark:text-white flex items-center gap-2">
                <LogOut size={18} className="text-slate-500" />
                Sign Out
              </h3>
              <p className="text-sm text-slate-500 mt-1">Log out of your account on this device.</p>
            </div>
            <Button variant="outline" className="rounded-[12px] bg-white dark:bg-black" onClick={() => toast.success("Logged out successfully.")}>
              Log out
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 rounded-[16px] bg-red-50 dark:bg-red-950/10 border border-red-100 dark:border-red-900/20">
            <div>
              <h3 className="font-medium text-red-600 dark:text-red-400 flex items-center gap-2">
                <Trash2 size={18} />
                Delete Account
              </h3>
              <p className="text-sm text-red-500/80 mt-1">Permanently delete your account and all data. This action cannot be undone.</p>
            </div>
            <Dialog>
              <DialogTrigger render={
                <Button 
                  variant="destructive" 
                  className="rounded-[12px] bg-red-600 hover:bg-red-700 text-white"
                />
              }>
                Delete Account
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] rounded-[24px]">
                <DialogHeader>
                  <DialogTitle className="text-red-600">Delete Account</DialogTitle>
                  <DialogDescription>
                    Are you absolutely sure you want to delete your account? This action cannot be undone and will permanently remove your data from our servers.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mt-6">
                  <Button variant="outline" className="rounded-[12px]">Cancel</Button>
                  <Button variant="destructive" className="rounded-[12px] bg-red-600" onClick={() => toast.success("Account deleted.")}>
                    Yes, delete account
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#F8FAFC] dark:bg-[#020817] font-sans selection:bg-[#2563EB]/20 selection:text-[#2563EB]">
      {/* Dynamic Background Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-gradient-to-br from-[#2563EB] via-[#4F46E5] to-[#7C3AED] rounded-full blur-[220px] opacity-[0.08] pointer-events-none mix-blend-multiply dark:mix-blend-screen" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-gradient-to-tl from-[#7C3AED] via-[#4F46E5] to-[#2563EB] rounded-full blur-[220px] opacity-[0.08] pointer-events-none mix-blend-multiply dark:mix-blend-screen" />

      <div className="container max-w-6xl mx-auto px-6 py-16 relative z-10">
        
        {/* Page Header */}
        <div className="mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[32px] font-bold text-slate-900 dark:text-white tracking-tight"
          >
            Settings
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-slate-500 dark:text-slate-400 mt-2 text-[16px]"
          >
            Manage your account and preparation preferences.
          </motion.p>
        </div>

        {/* Layout */}
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          {/* Left Side: Navigation */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full lg:w-64 shrink-0 flex flex-row lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 hide-scrollbar"
          >
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-[12px] font-medium transition-all duration-200 text-left ${
                    isActive 
                      ? 'bg-white dark:bg-zinc-800 text-[#2563EB] dark:text-blue-400 shadow-sm border border-slate-200 dark:border-slate-700' 
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-zinc-800/50 hover:text-slate-900 dark:hover:text-white border border-transparent'
                  }`}
                >
                  <Icon size={18} className={isActive ? 'text-[#2563EB] dark:text-blue-400' : 'text-slate-400'} />
                  {tab.label}
                </button>
              )
            })}
          </motion.div>

          {/* Right Side: Selected Section Content */}
          <div className="flex-1 w-full min-w-0">
            <AnimatePresence mode="wait">
              {activeTab === "profile" && <div key="profile">{renderProfile()}</div>}
              {activeTab === "exams" && <div key="exams">{renderExamPreferences()}</div>}
              {activeTab === "preparation" && <div key="preparation">{renderPreparationPreferences()}</div>}
              {activeTab === "security" && <div key="security">{renderSecurity()}</div>}
              {activeTab === "appearance" && <div key="appearance">{renderAppearance()}</div>}
              {activeTab === "account" && <div key="account">{renderAccount()}</div>}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
}
