import re

with open('/Users/kirtipatel/vedanco/CATAI/src/app/(app)/study-planner/page.tsx', 'r') as f:
    content = f.read()

# Replacement 1: State Additions
old_state = "  const [showStickyGoal, setShowStickyGoal] = useState(false);\n  const [selectedVersion, setSelectedVersion] = useState<any>(null);"
new_state = """  const [showStickyGoal, setShowStickyGoal] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState<any>(null);

  const [wizardData, setWizardData] = useState({
    targetExam: 'CAT',
    attemptYear: '2027',
    targetPercentile: '99+',
    targetColleges: [] as string[],
    quantLevel: 50,
    dilrLevel: 50,
    varcLevel: 50,
    mockPercentile: '',
    dailyHours: '4',
    weeklyDays: '6',
    workStatus: 'Student',
    weakSections: [] as string[],
    weakTopics: [] as string[]
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [localHistory, setLocalHistory] = useState(mockHistory);"""

content = content.replace(old_state, new_state)

# Replacement 2: Map localHistory
content = content.replace("mockHistory.map((plan)", "localHistory.map((plan)")

# Replacement 3: Replace Dialog completely
start_marker = "{/* NEW WIZARD MODAL */}"
end_marker = "    </div>\n  );\n}"

start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

new_dialog = """{/* FULL SCREEN WIZARD MODAL */}
      <Dialog open={isWizardOpen} onOpenChange={(open) => { if(!isProcessing) { setIsWizardOpen(open); if (!open) setTimeout(() => { setWizardStep(1); setWizardData({...wizardData}); }, 300); } }}>
        <DialogContent className="max-w-full w-screen h-[100dvh] m-0 p-0 rounded-none bg-[#F6F8FC] dark:bg-[#0A0A0A] border-none overflow-y-auto flex flex-col hide-scrollbar">
          {isProcessing ? (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center h-full relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#2563EB] via-[#4F46E5] to-[#7C3AED] opacity-10"></div>
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                className="w-24 h-24 rounded-full border-[6px] border-[#2563EB]/20 border-t-[#2563EB] mb-8 relative z-10 mx-auto"
              />
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 space-y-3 mx-auto"
              >
                <h2 className="text-3xl font-black text-[#111827] dark:text-white">Generating Your AI Roadmap</h2>
                <p className="text-lg font-medium text-[#6B7280]">Analyzing profile, calculating Readiness Score, and structuring daily tasks...</p>
              </motion.div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col max-w-[800px] w-full mx-auto p-6 md:p-12 h-full">
              {/* Header */}
              <div className="flex items-center justify-between mb-8 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#7C3AED] flex items-center justify-center shadow-lg">
                    <Map className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-[#111827] dark:text-white leading-tight">Roadmap Wizard</h2>
                    <p className="text-sm font-semibold text-[#6B7280]">Step {wizardStep} of 6</p>
                  </div>
                </div>
                <Button variant="ghost" onClick={() => setIsWizardOpen(false)} className="rounded-full w-10 h-10 p-0 text-[#6B7280] hover:bg-black/5 dark:hover:bg-white/5">
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Progress Stepper */}
              <div className="flex gap-2 mb-12 shrink-0">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className={`h-1.5 flex-1 rounded-full ${i <= wizardStep ? 'bg-[#2563EB]' : 'bg-black/10 dark:bg-white/10'}`}></div>
                ))}
              </div>

              {/* Steps Content */}
              <div className="flex-1 overflow-y-auto hide-scrollbar pb-12">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={wizardStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-8"
                  >
                    {wizardStep === 1 && (
                      <div className="space-y-8">
                        <div>
                          <h3 className="text-3xl font-black text-[#111827] dark:text-white mb-3">What exam are you preparing for?</h3>
                          <p className="text-[#6B7280] font-medium text-lg">Select your target management entrance exam.</p>
                        </div>
                        <div className="space-y-4">
                          <Label className="text-sm font-bold text-[#111827] dark:text-white uppercase tracking-wider">Target Exam *</Label>
                          <div className="flex flex-wrap gap-3">
                            {['CAT', 'XAT', 'SNAP', 'NMAT', 'CMAT', 'GMAT'].map(exam => (
                              <button key={exam} onClick={() => setWizardData({...wizardData, targetExam: exam})}
                                className={`px-6 py-4 rounded-2xl border-2 font-bold text-lg transition-all ${wizardData.targetExam === exam ? 'border-[#2563EB] bg-[#2563EB]/10 text-[#2563EB]' : 'border-black/5 dark:border-white/5 bg-white dark:bg-[#111827] text-[#6B7280] hover:border-black/10 dark:hover:border-white/10'}`}>
                                {exam}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-4 pt-4">
                          <Label className="text-sm font-bold text-[#111827] dark:text-white uppercase tracking-wider">Attempt Year *</Label>
                          <div className="flex flex-wrap gap-3">
                            {['2026', '2027', '2028'].map(year => (
                              <button key={year} onClick={() => setWizardData({...wizardData, attemptYear: year})}
                                className={`px-6 py-4 rounded-2xl border-2 font-bold text-lg transition-all ${wizardData.attemptYear === year ? 'border-[#2563EB] bg-[#2563EB]/10 text-[#2563EB]' : 'border-black/5 dark:border-white/5 bg-white dark:bg-[#111827] text-[#6B7280] hover:border-black/10 dark:hover:border-white/10'}`}>
                                {year}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {wizardStep === 2 && (
                      <div className="space-y-8">
                        <div>
                          <h3 className="text-3xl font-black text-[#111827] dark:text-white mb-3">What is your target outcome?</h3>
                          <p className="text-[#6B7280] font-medium text-lg">Define your goal percentile and dream colleges.</p>
                        </div>
                        <div className="space-y-4">
                          <Label className="text-sm font-bold text-[#111827] dark:text-white uppercase tracking-wider">Target Percentile *</Label>
                          <div className="flex flex-wrap gap-3">
                            {['90+', '95+', '98+', '99+', '99.5+'].map(pct => (
                              <button key={pct} onClick={() => setWizardData({...wizardData, targetPercentile: pct})}
                                className={`px-5 py-3 rounded-2xl border-2 font-bold transition-all ${wizardData.targetPercentile === pct ? 'border-[#2563EB] bg-[#2563EB]/10 text-[#2563EB]' : 'border-black/5 dark:border-white/5 bg-white dark:bg-[#111827] text-[#6B7280] hover:border-black/10 dark:hover:border-white/10'}`}>
                                {pct}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-4 pt-4">
                          <Label className="text-sm font-bold text-[#111827] dark:text-white uppercase tracking-wider">Target Colleges (Multi Select) *</Label>
                          <div className="flex flex-wrap gap-2">
                            {['IIM Ahmedabad', 'IIM Bangalore', 'IIM Calcutta', 'SPJIMR', 'FMS', 'MDI', 'IIFT', 'IMT', 'TAPMI', 'IMI'].map(col => {
                              const isSelected = wizardData.targetColleges.includes(col);
                              return (
                                <button key={col} onClick={() => {
                                  const newColleges = isSelected ? wizardData.targetColleges.filter(c => c !== col) : [...wizardData.targetColleges, col];
                                  setWizardData({...wizardData, targetColleges: newColleges});
                                }}
                                  className={`px-4 py-2.5 rounded-xl border-2 font-bold text-sm transition-all flex items-center gap-2 ${isSelected ? 'border-[#7C3AED] bg-[#7C3AED]/10 text-[#7C3AED]' : 'border-black/5 dark:border-white/5 bg-white dark:bg-[#111827] text-[#6B7280] hover:border-black/10 dark:hover:border-white/10'}`}>
                                  {isSelected && <Check className="w-3.5 h-3.5" />} {col}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}

                    {wizardStep === 3 && (
                      <div className="space-y-8">
                        <div>
                          <h3 className="text-3xl font-black text-[#111827] dark:text-white mb-3">Assess your current readiness.</h3>
                          <p className="text-[#6B7280] font-medium text-lg">Be honest. This helps the AI calibrate your starting point.</p>
                        </div>
                        
                        <div className="space-y-8 bg-white dark:bg-[#111827] border border-black/5 dark:border-white/5 rounded-3xl p-6 md:p-8">
                          {[
                            { label: 'Quant Level', key: 'quantLevel' as const, color: '#2563EB' },
                            { label: 'DILR Level', key: 'dilrLevel' as const, color: '#F59E0B' },
                            { label: 'VARC Level', key: 'varcLevel' as const, color: '#10B981' }
                          ].map(item => (
                            <div key={item.key} className="space-y-3">
                              <div className="flex items-center justify-between">
                                <Label className="text-sm font-bold text-[#111827] dark:text-white">{item.label} *</Label>
                                <span className="text-sm font-black" style={{ color: item.color }}>{wizardData[item.key]} / 100</span>
                              </div>
                              <input 
                                type="range" min="0" max="100" 
                                value={wizardData[item.key]} 
                                onChange={(e) => setWizardData({...wizardData, [item.key]: parseInt(e.target.value)})}
                                className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-black/10 dark:bg-white/10"
                                style={{ accentColor: item.color }}
                              />
                            </div>
                          ))}
                          
                          <div className="pt-4 border-t border-black/5 dark:border-white/5 space-y-3">
                            <Label className="text-sm font-bold text-[#111827] dark:text-white">Latest Mock Percentile (Optional)</Label>
                            <Input 
                              type="number" 
                              placeholder="e.g. 75" 
                              value={wizardData.mockPercentile}
                              onChange={(e) => setWizardData({...wizardData, mockPercentile: e.target.value})}
                              className="bg-black/5 dark:bg-white/5 rounded-xl h-12 text-[#111827] dark:text-white border-transparent focus:border-[#7F77DD] focus:ring-[#7F77DD] placeholder:text-[#6B7280] max-w-[200px] text-lg font-bold" 
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {wizardStep === 4 && (
                      <div className="space-y-8">
                        <div>
                          <h3 className="text-3xl font-black text-[#111827] dark:text-white mb-3">How much time can you dedicate?</h3>
                          <p className="text-[#6B7280] font-medium text-lg">Tell us your availability so we can plan your daily workload.</p>
                        </div>
                        
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <Label className="text-sm font-bold text-[#111827] dark:text-white uppercase tracking-wider">Daily Study Hours *</Label>
                            <div className="flex flex-wrap gap-2">
                              {['1', '2', '3', '4', '5', '6+'].map(hr => (
                                <button key={hr} onClick={() => setWizardData({...wizardData, dailyHours: hr})}
                                  className={`w-14 h-14 rounded-2xl border-2 font-bold text-lg transition-all flex items-center justify-center ${wizardData.dailyHours === hr ? 'border-[#2563EB] bg-[#2563EB]/10 text-[#2563EB]' : 'border-black/5 dark:border-white/5 bg-white dark:bg-[#111827] text-[#6B7280] hover:border-black/10 dark:hover:border-white/10'}`}>
                                  {hr}
                                </button>
                              ))}
                            </div>
                          </div>
                          
                          <div className="space-y-4 pt-4">
                            <Label className="text-sm font-bold text-[#111827] dark:text-white uppercase tracking-wider">Weekly Study Days *</Label>
                            <div className="flex gap-2">
                              {['5', '6', '7'].map(day => (
                                <button key={day} onClick={() => setWizardData({...wizardData, weeklyDays: day})}
                                  className={`w-14 h-14 rounded-2xl border-2 font-bold text-lg transition-all flex items-center justify-center ${wizardData.weeklyDays === day ? 'border-[#7C3AED] bg-[#7C3AED]/10 text-[#7C3AED]' : 'border-black/5 dark:border-white/5 bg-white dark:bg-[#111827] text-[#6B7280] hover:border-black/10 dark:hover:border-white/10'}`}>
                                  {day}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-4 pt-4">
                            <Label className="text-sm font-bold text-[#111827] dark:text-white uppercase tracking-wider">Work Status *</Label>
                            <div className="flex flex-wrap gap-3">
                              {['Student', 'Working Professional'].map(status => (
                                <button key={status} onClick={() => setWizardData({...wizardData, workStatus: status})}
                                  className={`px-6 py-4 rounded-2xl border-2 font-bold text-sm transition-all ${wizardData.workStatus === status ? 'border-[#F59E0B] bg-[#F59E0B]/10 text-[#F59E0B]' : 'border-black/5 dark:border-white/5 bg-white dark:bg-[#111827] text-[#6B7280] hover:border-black/10 dark:hover:border-white/10'}`}>
                                  {status}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {wizardStep === 5 && (
                      <div className="space-y-8">
                        <div>
                          <h3 className="text-3xl font-black text-[#111827] dark:text-white mb-3">Identify your biggest challenges.</h3>
                          <p className="text-[#6B7280] font-medium text-lg">We will allocate extra time to these areas.</p>
                        </div>

                        <div className="space-y-4">
                          <Label className="text-sm font-bold text-[#111827] dark:text-white uppercase tracking-wider">Weak Sections (Multi Select) *</Label>
                          <div className="flex flex-wrap gap-3">
                            {['Quant', 'DILR', 'VARC'].map(sec => {
                              const isSelected = wizardData.weakSections.includes(sec);
                              return (
                                <button key={sec} onClick={() => {
                                  const newSec = isSelected ? wizardData.weakSections.filter(s => s !== sec) : [...wizardData.weakSections, sec];
                                  setWizardData({...wizardData, weakSections: newSec});
                                }}
                                  className={`px-6 py-4 rounded-2xl border-2 font-bold text-lg transition-all flex items-center gap-2 ${isSelected ? 'border-[#E11D48] bg-[#E11D48]/10 text-[#E11D48]' : 'border-black/5 dark:border-white/5 bg-white dark:bg-[#111827] text-[#6B7280] hover:border-black/10 dark:hover:border-white/10'}`}>
                                  {isSelected && <Check className="w-5 h-5" />} {sec}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        <div className="space-y-4 pt-4">
                          <Label className="text-sm font-bold text-[#111827] dark:text-white uppercase tracking-wider">Weak Topics (Multi Select)</Label>
                          <div className="flex flex-wrap gap-2">
                            {['Arithmetic', 'Algebra', 'Geometry', 'Number System', 'Arrangements', 'Puzzles', 'Reading Comprehension', 'Vocabulary'].map(topic => {
                              const isSelected = wizardData.weakTopics.includes(topic);
                              return (
                                <button key={topic} onClick={() => {
                                  const newTopic = isSelected ? wizardData.weakTopics.filter(t => t !== topic) : [...wizardData.weakTopics, topic];
                                  setWizardData({...wizardData, weakTopics: newTopic});
                                }}
                                  className={`px-4 py-2.5 rounded-xl border-2 font-bold text-sm transition-all flex items-center gap-2 ${isSelected ? 'border-[#E11D48] bg-[#E11D48]/10 text-[#E11D48]' : 'border-black/5 dark:border-white/5 bg-white dark:bg-[#111827] text-[#6B7280] hover:border-black/10 dark:hover:border-white/10'}`}>
                                  {isSelected && <Check className="w-3.5 h-3.5" />} {topic}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}

                    {wizardStep === 6 && (
                      <div className="space-y-8">
                        <div>
                          <h3 className="text-3xl font-black text-[#111827] dark:text-white mb-3">Review & Generate</h3>
                          <p className="text-[#6B7280] font-medium text-lg">Verify your choices before we generate your customized strategy.</p>
                        </div>
                        
                        <div className="grid sm:grid-cols-2 gap-4 bg-white dark:bg-[#111827] border border-black/5 dark:border-white/5 rounded-3xl p-6 md:p-8">
                          <div className="space-y-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">Target Exam</span>
                            <p className="text-sm font-bold text-[#111827] dark:text-white">{wizardData.targetExam} {wizardData.attemptYear}</p>
                          </div>
                          <div className="space-y-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">Target Percentile</span>
                            <p className="text-sm font-bold text-[#2563EB]">{wizardData.targetPercentile}</p>
                          </div>
                          <div className="space-y-1 sm:col-span-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">Target Colleges</span>
                            <p className="text-sm font-bold text-[#111827] dark:text-white">{wizardData.targetColleges.length ? wizardData.targetColleges.join(', ') : 'None selected'}</p>
                          </div>
                          <div className="space-y-1 sm:col-span-2 pt-4 border-t border-black/5 dark:border-white/5">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">Current Scores</span>
                            <div className="flex gap-4">
                              <span className="text-xs font-bold bg-[#2563EB]/10 text-[#2563EB] px-2 py-1 rounded-md">Q: {wizardData.quantLevel}</span>
                              <span className="text-xs font-bold bg-[#F59E0B]/10 text-[#F59E0B] px-2 py-1 rounded-md">D: {wizardData.dilrLevel}</span>
                              <span className="text-xs font-bold bg-[#10B981]/10 text-[#10B981] px-2 py-1 rounded-md">V: {wizardData.varcLevel}</span>
                            </div>
                          </div>
                          <div className="space-y-1 pt-4 border-t border-black/5 dark:border-white/5">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">Study Availability</span>
                            <p className="text-sm font-bold text-[#111827] dark:text-white">{wizardData.dailyHours} hrs/day, {wizardData.weeklyDays} days/week</p>
                          </div>
                          <div className="space-y-1 pt-4 border-t border-black/5 dark:border-white/5">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">Weak Areas</span>
                            <p className="text-sm font-bold text-[#E11D48]">{wizardData.weakSections.length ? wizardData.weakSections.join(', ') : 'None'}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Footer Actions */}
              <div className="flex gap-4 pt-6 mt-auto bg-[#F6F8FC] dark:bg-[#0A0A0A] border-t border-black/5 dark:border-white/5 relative z-20 shrink-0">
                {wizardStep > 1 && (
                  <Button variant="outline" onClick={() => setWizardStep(wizardStep - 1)} className="rounded-2xl h-14 px-8 font-bold text-lg border-2 border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5">
                    Back
                  </Button>
                )}
                {wizardStep < 6 ? (
                  <Button onClick={() => setWizardStep(wizardStep + 1)} className="flex-1 rounded-2xl h-14 font-bold text-lg bg-[#2563EB] hover:bg-[#2563EB]/90 text-white shadow-xl shadow-[#2563EB]/20">
                    Continue <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                ) : (
                  <Button onClick={() => {
                    setIsProcessing(true);
                    setTimeout(() => {
                      setIsProcessing(false);
                      setIsWizardOpen(false);
                      setWizardStep(1);
                      // Setup new history
                      const newRoadmap = {
                        id: `v${localHistory.length + 2}`,
                        name: `Roadmap V${localHistory.length + 2}`,
                        date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
                        status: 'Active',
                        completion: '0%'
                      };
                      setLocalHistory([newRoadmap, ...localHistory.map(h => ({...h, status: 'Archived'}))]);
                      setProgress(0);
                      toast.success('New Roadmap Generated Successfully!');
                    }, 3000);
                  }} className="flex-1 rounded-2xl h-14 font-bold text-lg bg-gradient-to-r from-[#2563EB] to-[#7C3AED] hover:opacity-90 text-white shadow-xl shadow-[#7C3AED]/30">
                    Generate Roadmap
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
"""

content = content[:start_idx] + new_dialog

with open('/Users/kirtipatel/vedanco/CATAI/src/app/(app)/study-planner/page.tsx', 'w') as f:
    f.write(content)
