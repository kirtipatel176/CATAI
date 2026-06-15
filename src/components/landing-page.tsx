"use client";

import { motion, Variants } from "framer-motion";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { PlayCircle, BrainCircuit, Target, TrendingUp, BarChart3, ChevronRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Navbar } from "./navbar";
import { Footer } from "./footer";

// --- ANIMATION VARIANTS (Strictly 200ms, 300ms, 500ms) ---
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const fade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3, ease: "easeOut" } }
};

const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-aurora text-white font-sans selection:bg-white/20">
      <Navbar />

      <main className="flex-1 overflow-hidden">
        
        {/* ================= HERO SECTION ================= */}
        <section className="relative pt-40 pb-24 md:pt-56 md:pb-32 px-4 flex flex-col items-center justify-center min-h-[90vh]">
          
          <div className="container mx-auto text-center max-w-5xl relative z-10">
            <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="flex flex-col items-center gap-8">
              
              <motion.div variants={fadeUp}>
                <div className="px-4 py-1.5 text-sm rounded-full border border-white/20 bg-white/5 backdrop-blur-xl shadow-xl font-medium text-white/90">
                  <BrainCircuit className="w-4 h-4 mr-2 inline-block text-white" />
                  AI-Powered MBA Preparation Platform
                </div>
              </motion.div>
              
              <motion.h1 variants={fadeUp} className="text-[56px] md:text-[80px] leading-[1.1] font-bold tracking-tight text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.3)]">
                Prepare Smarter.<br />Not Harder.
              </motion.h1>
              
              <motion.p variants={fadeUp} className="text-[18px] md:text-[22px] text-white/70 max-w-2xl mx-auto leading-relaxed font-medium">
                Personalized study plans, AI profile evaluation, and intelligent CAT guidance to help you achieve your MBA goals.
              </motion.p>
              
              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-6 mt-8 w-full sm:w-auto">
                <Link href="/dashboard" className={cn(buttonVariants({ size: "lg" }), "rounded-full px-10 h-14 text-[18px] w-full sm:w-auto bg-white text-black hover:bg-white/90 shadow-[0_0_40px_rgba(255,255,255,0.4)] transition-all duration-300 hover:scale-105")}>
                  Start Free <ChevronRight className="ml-2 w-5 h-5" />
                </Link>
                <Button size="lg" variant="outline" className="rounded-full px-10 h-14 text-[18px] w-full sm:w-auto group hover:bg-white/10 transition-all duration-300 glass-panel border-white/20 text-white hover:text-white">
                  <PlayCircle className="mr-2 w-5 h-5 text-white/70 group-hover:text-white transition-colors" /> Watch Demo
                </Button>
              </motion.div>
            </motion.div>

            {/* ================= PRODUCT SHOWCASE (FLOATING OVERLAPPING CARDS) ================= */}
            <motion.div 
              initial="hidden" animate="visible" variants={scaleUp} 
              className="mt-32 relative mx-auto max-w-5xl h-[400px] md:h-[600px] w-full perspective-1000 hidden md:block"
            >
              {/* Dashboard Back Card */}
              <motion.div 
                animate={{ y: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[400px] rounded-2xl glass-panel-heavy overflow-hidden z-10 opacity-70 scale-90"
              >
                <div className="h-10 border-b border-white/10 flex items-center px-4 bg-white/5"><div className="w-20 h-3 rounded bg-white/20"></div></div>
                <div className="p-6 grid grid-cols-3 gap-4">
                  <div className="h-24 rounded-xl bg-white/10"></div><div className="h-24 rounded-xl bg-white/10"></div><div className="h-24 rounded-xl bg-white/10"></div>
                </div>
              </motion.div>

              {/* CATGPT Left Card */}
              <motion.div 
                animate={{ y: [0, 15, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-20 left-0 w-[350px] h-[450px] rounded-2xl glass-panel overflow-hidden z-20"
              >
                 <div className="p-6 flex flex-col h-full text-white">
                   <div className="flex items-center gap-3 mb-6"><BrainCircuit className="text-white w-6 h-6"/><span className="font-bold text-lg">CATGPT</span></div>
                   <div className="space-y-4 flex-1">
                     <div className="bg-white/10 p-4 rounded-2xl rounded-tr-sm text-sm ml-auto w-3/4 border border-white/5 shadow-[0_4px_20px_rgba(0,0,0,0.2)]">Explain DILR logic...</div>
                     <div className="bg-gradient-to-br from-blue-600/40 to-indigo-600/40 p-4 rounded-2xl rounded-tl-sm text-sm mr-auto w-5/6 border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.3)] backdrop-blur-md">Here is the step-by-step breakdown...</div>
                   </div>
                 </div>
              </motion.div>

              {/* Study Planner Right Card */}
              <motion.div 
                animate={{ y: [0, -15, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute top-16 right-0 w-[350px] h-[450px] rounded-2xl glass-panel overflow-hidden z-20"
              >
                 <div className="p-6">
                   <div className="flex items-center gap-3 mb-6 text-white"><Target className="w-6 h-6"/><span className="font-bold text-lg">Study Planner</span></div>
                   <div className="space-y-3">
                     {[1,2,3,4].map(i => (
                       <div key={i} className="h-16 rounded-xl bg-white/10 border border-white/5 flex items-center px-4 gap-3 shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
                          <div className="w-6 h-6 rounded-full bg-white/20"></div>
                          <div className="h-2 w-24 bg-white/30 rounded"></div>
                       </div>
                     ))}
                   </div>
                 </div>
              </motion.div>

              {/* Profile Evaluator Center Focus Card */}
              <motion.div 
                animate={{ y: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute top-32 left-1/2 -translate-x-1/2 w-[400px] h-[350px] rounded-2xl glass-panel overflow-hidden z-30 flex flex-col items-center justify-center p-8 border border-white/20 shadow-[0_0_60px_rgba(0,0,0,0.6)]"
              >
                <h3 className="font-bold text-xl mb-6 text-white">Profile Evaluator</h3>
                <div className="relative w-40 h-40 flex items-center justify-center rounded-full border-8 border-white/10">
                  <div className="absolute inset-0 rounded-full border-8 border-white border-r-transparent border-b-transparent rotate-45 shadow-[0_0_20px_rgba(255,255,255,0.5)]"></div>
                  <div className="text-5xl font-bold text-white drop-shadow-md">8.5</div>
                </div>
                <div className="mt-6 bg-white/20 text-white px-4 py-1 rounded-full text-sm font-medium border border-white/10 backdrop-blur-md">Target: IIM A, B, C</div>
              </motion.div>
            </motion.div>
            
            {/* Mobile Fallback */}
            <div className="mt-16 md:hidden">
              <div className="glass-panel rounded-2xl p-6 border-white/20 shadow-[0_0_40px_rgba(0,0,0,0.4)]">
                <h3 className="font-bold text-xl mb-6 text-white text-center">Profile Evaluator</h3>
                <div className="flex justify-center py-4">
                  <div className="relative w-32 h-32 flex items-center justify-center rounded-full border-8 border-white/10">
                    <div className="absolute inset-0 rounded-full border-8 border-white border-r-transparent border-b-transparent rotate-45"></div>
                    <div className="text-4xl font-bold text-white">8.5</div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </section>

        {/* ================= HERO VIDEO (8 Seconds, Looping) ================= */}
        <section className="py-20 relative z-10">
          <div className="container mx-auto px-4 max-w-6xl">
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={scaleUp}
              className="rounded-3xl overflow-hidden glass-panel border border-white/20 shadow-[0_0_80px_rgba(0,0,0,0.5)] bg-black/50 aspect-video relative group p-2 md:p-4"
            >
              <div className="rounded-xl overflow-hidden relative w-full h-full bg-black">
                <video 
                  autoPlay loop muted playsInline 
                  className="w-full h-full object-cover opacity-80 transition-opacity duration-500 group-hover:opacity-100 mix-blend-screen"
                >
                  <source src="https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4" type="video/mp4" />
                </video>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ================= APPLE STYLE PRODUCT EXPERIENCE (BENTO GRID) ================= */}
        <section id="features" className="py-32 relative z-10">
          <div className="container mx-auto px-4 max-w-6xl">
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
              className="mb-20"
            >
              <h2 className="text-[48px] font-bold mb-4 tracking-tight leading-tight text-white">Everything you need<br/>to crack CAT.</h2>
              <p className="text-[22px] text-white/60 font-medium">Powered by AI. Designed for ambitious MBA aspirants.</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              
              {/* Card 1: CATGPT */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="md:col-span-2">
                <div className="glass-panel rounded-3xl overflow-hidden h-[500px] flex flex-col md:flex-row group border-white/10 hover:border-white/30 transition-colors duration-500 hover:shadow-[0_0_60px_rgba(255,255,255,0.1)]">
                  <div className="p-12 md:w-1/2 flex flex-col justify-center">
                    <BrainCircuit className="w-10 h-10 text-white mb-6 drop-shadow-md" />
                    <h3 className="text-[32px] font-bold mb-4 leading-tight text-white">CATGPT</h3>
                    <p className="text-[18px] text-white/60 leading-relaxed">Ask questions.<br/>Get contextual AI guidance.</p>
                  </div>
                  <div className="md:w-1/2 bg-white/5 p-8 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[150%] max-w-[600px] glass-panel-heavy rounded-l-3xl border border-r-0 shadow-[0_0_40px_rgba(0,0,0,0.5)] p-6 group-hover:-translate-x-4 transition-transform duration-500">
                      <div className="flex gap-4 mb-6 opacity-80">
                        <div className="w-8 h-8 rounded-full bg-white/10 shrink-0"></div>
                        <div className="bg-white/10 p-4 rounded-2xl text-sm text-white">How do I solve mixtures and alligations?</div>
                      </div>
                      <div className="flex gap-4 flex-row-reverse">
                        <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center shrink-0"><BrainCircuit className="w-4 h-4"/></div>
                        <div className="bg-gradient-to-br from-indigo-500/30 to-purple-500/30 border border-white/10 p-4 rounded-2xl text-sm text-white shadow-lg">Let's break down the rule of alligation. It helps to find the ratio in which two or more ingredients at the given price must be mixed to produce a mixture of a desired price...</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Card 2: Profile Evaluator */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <div className="glass-panel rounded-3xl overflow-hidden h-[600px] flex flex-col group border-white/10 hover:border-white/30 transition-colors duration-500 hover:shadow-[0_0_60px_rgba(255,255,255,0.1)]">
                  <div className="p-10">
                    <TrendingUp className="w-10 h-10 text-white mb-6 drop-shadow-md" />
                    <h3 className="text-[28px] font-bold mb-2 leading-tight text-white">Profile Evaluator</h3>
                    <p className="text-[18px] text-white/60 leading-relaxed">Analyze strengths.<br/>Identify weaknesses.</p>
                  </div>
                  <div className="flex-1 bg-white/5 relative flex items-center justify-center overflow-hidden">
                     <div className="w-64 h-64 rounded-full border-[16px] border-white/10 relative flex items-center justify-center group-hover:scale-105 transition-transform duration-500 shadow-[inset_0_0_40px_rgba(0,0,0,0.3)]">
                        <div className="absolute inset-0 rounded-full border-[16px] border-white border-l-transparent border-t-transparent rotate-45 shadow-[0_0_20px_rgba(255,255,255,0.5)]"></div>
                        <span className="text-[64px] font-bold text-white drop-shadow-lg">9.2</span>
                     </div>
                  </div>
                </div>
              </motion.div>

              {/* Card 3: AI Study Planner */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <div className="glass-panel rounded-3xl overflow-hidden h-[600px] flex flex-col group border-white/10 hover:border-white/30 transition-colors duration-500 hover:shadow-[0_0_60px_rgba(255,255,255,0.1)]">
                  <div className="p-10">
                    <Target className="w-10 h-10 text-white mb-6 drop-shadow-md" />
                    <h3 className="text-[28px] font-bold mb-2 leading-tight text-white">AI Study Planner</h3>
                    <p className="text-[18px] text-white/60 leading-relaxed">Personalized roadmap.</p>
                  </div>
                  <div className="flex-1 bg-white/5 p-10 relative overflow-hidden">
                     <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[19px] before:w-px before:bg-white/20 h-full group-hover:translate-y-[-10px] transition-transform duration-500">
                       {[
                         {t: "Foundation", a: true}, {t: "Concept Building", a: false}, {t: "Mock Phase", a: false}
                       ].map((item, i) => (
                         <div key={i} className="flex items-center gap-6 relative z-10">
                           <div className={`w-10 h-10 rounded-full flex items-center justify-center border-[2px] border-white/20 ${item.a ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.6)]' : 'bg-black/40 text-white/60 backdrop-blur-md'}`}>{i+1}</div>
                           <div className={`text-lg font-bold ${item.a ? 'text-white drop-shadow-md' : 'text-white/40'}`}>{item.t}</div>
                         </div>
                       ))}
                     </div>
                  </div>
                </div>
              </motion.div>

              {/* Card 4: Dashboard */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="md:col-span-2">
                <div className="glass-panel rounded-3xl overflow-hidden h-[500px] flex flex-col md:flex-row group border-white/10 hover:border-white/30 transition-colors duration-500 hover:shadow-[0_0_60px_rgba(255,255,255,0.1)]">
                  <div className="p-12 md:w-1/3 flex flex-col justify-center">
                    <BarChart3 className="w-10 h-10 text-white mb-6 drop-shadow-md" />
                    <h3 className="text-[32px] font-bold mb-4 leading-tight text-white">Dashboard</h3>
                    <p className="text-[18px] text-white/60 leading-relaxed">Progress.<br/>Tasks.<br/>Goals.</p>
                  </div>
                  <div className="md:w-2/3 bg-white/5 p-8 flex items-center justify-center relative overflow-hidden">
                     <div className="absolute right-[-10%] top-[10%] w-[100%] h-[120%] glass-panel-heavy rounded-tl-3xl border shadow-[0_0_60px_rgba(0,0,0,0.6)] p-8 group-hover:scale-105 transition-transform duration-700 origin-top-left border-white/10">
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="h-24 bg-white/10 rounded-xl shadow-inner border border-white/5"></div>
                          <div className="h-24 bg-white/10 rounded-xl shadow-inner border border-white/5"></div>
                        </div>
                        <div className="h-40 bg-white/10 rounded-xl mb-4 shadow-inner border border-white/5"></div>
                        <div className="h-10 w-1/2 bg-white/10 rounded-xl shadow-inner border border-white/5"></div>
                     </div>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* ================= HOW IT WORKS (TIMELINE) ================= */}
        <section id="how-it-works" className="py-32 relative z-10 bg-black/20 backdrop-blur-3xl border-t border-white/5">
          <div className="container mx-auto px-4 max-w-4xl">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="mb-24">
              <h2 className="text-[48px] font-bold tracking-tight text-white">Your path to 99+ percentile</h2>
            </motion.div>

            <div className="space-y-16 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-px before:bg-white/10">
              {[
                { step: "Step 1", title: "Complete Profile", desc: "Enter your academics, work experience, and target colleges." },
                { step: "Step 2", title: "Evaluate Profile", desc: "Our engine analyzes your profile and computes your baseline readiness." },
                { step: "Step 3", title: "Generate Study Plan", desc: "Receive a personalized roadmap with daily tasks and topics." },
                { step: "Step 4", title: "Use CATGPT Daily", desc: "Log your mocks, practice with CATGPT, and watch your scores rise." },
                { step: "Step 5", title: "Achieve MBA Goals", desc: "Walk into the exam with confidence and secure your dream B-School." }
              ].map((item, index) => (
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full border-[3px] border-white/20 bg-black/60 backdrop-blur-md text-white font-bold shadow-[0_0_20px_rgba(0,0,0,0.5)] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-all duration-300 group-hover:bg-white group-hover:text-black group-hover:border-white">
                    <CheckCircle2 className="w-5 h-5 text-white/50 group-hover:text-black transition-colors" />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-4rem)] p-2">
                    <span className="text-sm font-semibold text-white/60 mb-2 block">{item.step}</span>
                    <h3 className="font-bold text-[22px] mb-2 text-white">{item.title}</h3>
                    <p className="text-[18px] text-white/60 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= COLLEGE SECTION ================= */}
        <section id="colleges" className="py-24 relative z-10 bg-black/40 backdrop-blur-3xl border-t border-white/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-sm font-semibold text-white/40 uppercase tracking-widest mb-16">Targeting the top B-Schools</h2>
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
              className="flex flex-wrap justify-center items-center gap-10 md:gap-20 opacity-50 hover:opacity-100 transition-all duration-700"
            >
              {["IIM Ahmedabad", "IIM Bangalore", "IIM Calcutta", "IIM Kozhikode", "FMS Delhi", "SPJIMR", "MDI Gurgaon"].map((college, i) => (
                <motion.div variants={fade} key={i} className="text-2xl md:text-3xl font-bold font-serif text-white/80 hover:text-white cursor-default transition-all hover:scale-105 hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]">
                  {college}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ================= VIDEO DEMO SECTION ================= */}
        <section className="py-32 relative z-10">
          <div className="container mx-auto px-4 max-w-6xl text-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="mb-16">
              <h2 className="text-[48px] font-bold mb-4 tracking-tight text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">See MBAOS in Action</h2>
              <p className="text-[22px] text-white/60">Discover how AI helps you prepare smarter.</p>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={scaleUp} className="mx-auto rounded-[32px] overflow-hidden border border-white/20 shadow-[0_0_80px_rgba(0,0,0,0.6)] glass-panel p-4 md:p-6 relative">
              <div className="rounded-[20px] overflow-hidden bg-black aspect-video relative border border-white/10 shadow-inner">
                 <video controls playsInline className="w-full h-full object-cover opacity-90 mix-blend-screen">
                    <source src="https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4" type="video/mp4" />
                 </video>
              </div>
            </motion.div>
          </div>
        </section>

      </main>

      <div className="relative z-10 border-t border-white/10 bg-black/40 backdrop-blur-3xl text-white/60 py-8">
         <div className="container mx-auto text-center text-sm">
             &copy; {new Date().getFullYear()} MBAOS. All rights reserved.
         </div>
      </div>
    </div>
  );
}
