# **MBAOS – Profile Intelligence**

## **Complete Technical & Functional Specification (Build-Ready)**

**Version:** V2.0 — Accurate / Implementation-Ready **Supersedes:** V1.0 Final (descriptive-only spec) **Module:** Profile Intelligence

This version replaces every example-only output in V1.0 with an actual formula, weight table, data schema, or rule set, so the module can be built and will produce consistent, defensible results rather than placeholder numbers.

---

## **1\. System Objective**

Profile Intelligence converts a student's raw academic, experience, and exam data into:

1. A defensible numeric Profile Score (0–100)  
2. An estimated competitive percentile  
3. A college-by-college admission probability, computed against a real cutoff database  
4. A weakness list and improvement roadmap derived from the same scoring engine (not hardcoded)

Every number shown to the user must be traceable to a formula or a database lookup. Nothing in the final report is a free-floating example.

---

## **2\. User Types & Input Schema**

Each stage collects only the fields its formula actually uses. Two fields are added to every stage versus V1.0 because the scoring and matching logic cannot run accurately without them:

* **Reservation Category** (General / OBC-NCL / SC / ST / EWS / PwD) — required. Indian MBA cutoffs differ by 5–20 percentile points by category; omitting this makes every percentile-gap and probability number wrong for non-General candidates.  
* **Gender** (optional, used only for diversity-adjustment lookup at colleges that publish a gender-diversity policy) — optional, used only if the student wants the adjustment applied.

| Stage | Fields | Type / Validation |
| ----- | ----- | ----- |
| 12th Student | 10th %, Expected 12th %, Stream, Target Exam, Category | % fields: 0–100 float |
| Pursuing Bachelor's | 10th %, 12th %, Current CGPA, Graduation Stream, Target Exam, Category | CGPA: 0–10 float |
| Bachelor's Graduate | 10th %, 12th %, Graduation CGPA, Graduation Stream, Internship Count, Work Exp Months (optional), Target Exam, Category | Internship Count: integer ≥0 |
| Pursuing Master's | 10th %, 12th %, Bachelor CGPA, Master CGPA (in-progress), Target Exam, Category | — |
| Master's Graduate | 10th %, 12th %, Bachelor CGPA, Master CGPA, Target Exam, Category | — |
| Working Professional | 10th %, 12th %, Bachelor CGPA, Master CGPA (optional), Work Exp Months, Current Role, Target Exam, Category | Work Exp Months: integer ≥0 |
| All stages, optional | Most recent Mock Test Percentile \+ Exam \+ Date | If absent, Exam Readiness falls back to the "unrated" path in Section 3.3 |

**Validation rules:** percentages and CGPA are rejected outside their natural range; Graduation Stream is restricted to a controlled list (Engineering / Commerce / Science / Arts / Other) because it feeds the academic-diversity adjustment in Section 8; Target Exam is restricted to the five listed exams because it drives the exam-eligibility filter in Section 8\.

---

## **3\. Profile Evaluation Engine — Scoring Formulas**

### **3.1 Academic Strength Score (0–100)**

CGPA inputs are first normalized to a percentage equivalent: normalized \= (CGPA / 10\) × 100.

Weighted by stage, because the academic record that actually predicts MBA readiness changes as a student progresses (a working professional's 10th-grade marks matter far less than their Bachelor's/Master's record):

| Stage | 10th % | 12th % | Bachelor | Master |
| ----- | ----- | ----- | ----- | ----- |
| 12th Student | 40% | 60% | — | — |
| Pursuing Bachelor's | 20% | 30% | 50% (current CGPA) | — |
| Bachelor's Graduate | 15% | 20% | 65% | — |
| Pursuing Master's | 10% | 15% | 35% | 40% (in-progress) |
| Master's Graduate | 10% | 10% | 35% | 45% |
| Working Professional | 10% | 10% | 40% / 80%\* | 40% / 0%\* |

\*Working Professional: if Master CGPA is not supplied, its 40% weight is redistributed to Bachelor CGPA (so Bachelor weight becomes 80%), not silently dropped — this is the explicit null-handling rule the V1.0 spec was missing.

Academic Strength Score \= Σ (component % or normalized CGPA × stage weight)

### **3.2 Experience Strength Score (0–100)**

Internship Score      \= min(Internship Count × 25, 100\)

Work Experience Score \= min(Work Experience Months / 60 × 100, 100\)

Experience Strength    \= (Internship Score × 0.3) \+ (Work Experience Score × 0.7)

Work experience is capped at 60 months (5 years) because most MBA programs treat 0–5 years as the relevant evaluation band; beyond that, additional months stop adding score (a real-world plateau the V1.0 examples never modeled).

Stages with no experience fields (12th Student, Pursuing Bachelor's, Pursuing Master's) have Experience Strength weight \= 0 in Section 4, not a fabricated default value.

### **3.3 Exam Readiness Score (0–100)**

* **If a Mock Test Percentile is supplied:** Exam Readiness Score \= Mock Percentile (most recent attempt; if multiple, average the latest two, weighted 60/40 toward the most recent).  
* **If no mock data exists:** the component is marked **"Pending — Unrated,"** its weight is set to 0, and the freed weight is redistributed proportionally across Academic and Experience (see Section 4 reweighting rule). The report explicitly states *"Exam Readiness not yet calculated — take a mock test to unlock a more accurate percentile estimate,"* rather than silently guessing a number, which is what V1.0's "if available" language allowed to happen invisibly.

---

## **4\. Profile Score Aggregation**

Master stage weights (applied only when all three components have data; see reweighting rule below for missing-data cases):

| Stage | Academic | Experience | Exam Readiness |
| ----- | ----- | ----- | ----- |
| 12th Student | 70% | 0% | 30% |
| Pursuing Bachelor's | 60% | 0% | 40% |
| Bachelor's Graduate | 35% | 25% | 40% |
| Pursuing Master's | 50% | 0% | 50% |
| Master's Graduate | 30% | 20% | 50% |
| Working Professional | 20% | 35% | 45% |

**Reweighting rule (missing Exam Readiness):** if Exam Readiness is "Pending," its weight is redistributed to Academic and Experience in their existing ratio. Example: a Bachelor's Graduate with no mock data has Academic:Experience \= 35:25 \= 7:5; the freed 40% splits as \+23.3% to Academic and \+16.7% to Experience, giving an effective 58.3% / 41.7% / 0% split.

Profile Score \= (Academic × W\_a) \+ (Experience × W\_e) \+ (Exam Readiness × W\_x)

**Worked example — Bachelor's Graduate** 10th \= 88, 12th \= 85, CGPA \= 8.2 (→82), Internships \= 1, Work Exp \= 0 months, Mock Percentile \= 92\.

* Academic \= 88×0.15 \+ 85×0.20 \+ 82×0.65 \= 83.5  
* Experience \= (min(25,100)×0.3) \+ (0×0.7) \= 7.5  
* Exam Readiness \= 92  
* Profile Score \= 83.5×0.35 \+ 7.5×0.25 \+ 92×0.40 \= 29.2 \+ 1.9 \+ 36.8 \= **67.9 → 68**

This single example shows exactly why weak experience drags down an otherwise strong academic+exam profile — the same numbers later drive the Weakness Analysis output in Section 11, instead of weakness text being written independently of the score.

---

## **5\. Profile Strength Classification**

Unchanged bands from V1.0, now backed by the formula above instead of a free-floating number:

| Band | Score | Description |
| ----- | ----- | ----- |
| Elite Profile | 90–100 | Highly competitive for top-tier MBA institutions |
| Strong Profile | 80–89 | Competitive, good admission potential |
| Competitive Profile | 70–79 | Good profile, needs targeted improvement |
| Average Profile | 60–69 | Needs improvement in academics or profile building |
| Weak Profile | Below 60 | Significant improvement required |

---

## **6\. Percentile Estimation Model**

This was the single biggest gap in V1.0 — a "Current Potential" percentile was shown with no source.

* **High Confidence (mock-based):** if a recent mock percentile exists, Estimated Percentile \= Exam Readiness Score directly (Section 3.3), labeled **"Calculated — based on your mock test."**  
* **Low Confidence (profile-based fallback):** if no mock data exists, the system uses a calibration lookup table that maps Profile Score bands to a historical percentile range *for that specific exam*, built from aggregated past-cohort data (see Section 7.4). This is shown as a **range**, not a false-precision single number — e.g., "Estimated Percentile: 88–93 (Low Confidence — take a mock test for a precise number)."

This calibration table must be rebuilt periodically (Section 18\) as exam difficulty and applicant pools shift year to year; it is not a one-time hardcoded mapping.

---

## **7\. College & Cutoff Intelligence Database**

V1.0 referenced "College Database / Cutoff Database / Admission Criteria Database" with no schema. Minimum viable schema:

### **7.1 colleges**

| Field | Type | Notes |
| ----- | ----- | ----- |
| college\_id | PK |  |
| name | text |  |
| tier | enum | Tier-1 / Tier-2 / Tier-3 (drives default Dream/Target/Safe banding) |
| accepted\_exams | array | e.g. \[CAT\], \[CAT, XAT\] — used for the eligibility filter in Section 8 |
| location, type | text |  |

### **7.2 cutoff\_history**

| Field | Type | Notes |
| ----- | ----- | ----- |
| college\_id | FK |  |
| exam, admission\_year | text, int | Cutoffs must be versioned per year — never overwritten |
| category | enum | General / OBC-NCL / SC / ST / EWS / PwD |
| gender\_segment | enum, nullable | only populated for colleges with a declared diversity policy |
| academic\_background | enum, nullable | Engineering / Non-Engineering, only where the college publishes a diversity adjustment |
| required\_percentile | float |  |
| sectional\_cutoffs\_json | json | for exams with sectional cutoffs (CAT/XAT) |

### **7.3 selection\_criteria\_weights**

| Field | Type | Notes |
| ----- | ----- | ----- |
| college\_id | FK |  |
| criteria\_type | enum | percentile / academic\_diversity / work\_experience / gender\_diversity / extracurricular / wat\_pi |
| weight\_percentage | float | published or estimated weight of this criterion in final selection |

### **7.4 admission\_outcomes (anonymized, for calibration)**

| Field | Type | Notes |
| ----- | ----- | ----- |
| college\_id, admission\_year | FK, int |  |
| applicant\_profile\_score, applicant\_percentile, category | float, float, enum |  |
| admitted | boolean | Used to calibrate the probability formula in Section 9 and the fallback table in Section 6 |

### **7.5 reports**

| Field | Type | Notes |
| ----- | ----- | ----- |
| report\_id, user\_id, version | PK, FK, int | enables Section 16 versioning/comparison |
| profile\_score, breakdown\_json, colleges\_json | float, json, json | full snapshot, so historical reports never change retroactively even if cutoffs update later |

**Data sourcing note:** cutoff and criteria-weight values must come from each college's officially published admission policy for that year, entered through an admin workflow (Section 18\) — they cannot be guessed or copied from a single illustrative example, since even a 1–2 percentile point error changes a college's entire classification.

---

## **8\. College Matching & Classification Logic**

For each college, run in order:

1. **Eligibility filter** — discard colleges whose accepted\_exams doesn't include the student's Target Exam. (Fixes the V1.0 gap where IIM Ahmedabad could appear for a CMAT-only student.)  
2. **Effective required percentile** — start from required\_percentile for the student's category in cutoff\_history, then apply any applicable gender or academic-background adjustment from the same table, only where the college has published one for that segment. Adjustments are never invented globally — a college with no declared diversity policy gets no adjustment.  
3. **Gap** \= Effective Required Percentile − Estimated Percentile (Section 6).  
4. **Probability** — see Section 9\.  
5. **Classification** — Dream (probability \<50%), Target (50–80%), Safe (\>80%) — same bands as V1.0, but now probability is computed, not assumed.

---

## **9\. Admission Probability Engine**

P(admit) \= clamp( 50 − (Gap × k), 2, 98 )

Where k is a steepness constant per college tier, expressing how fast probability swings per percentile point of gap — Tier-1 colleges have narrow, sharp cutoff bands (k≈12–15); Tier-3 "safe" colleges have wider tolerance (k≈18–20).

**This constant must be calibrated, not assumed.** Once admission\_outcomes data exists, fit k per college via logistic regression against actual admit/reject outcomes (admitted vs. gap), and refresh the fit yearly (Section 18). The formula above is the correct starting structure for launch; the constant is what gets more accurate over time as real outcome data accumulates.

**Worked example continuing Section 4's student** (Profile Score 68, Estimated Percentile 92, non-engineering background, General category, targeting SPJIMR which has no published academic-diversity adjustment for General category):

* Effective Required Percentile \= 98 (SPJIMR, General, no adjustment applies)  
* Gap \= 98 − 92 \= 6  
* k \= 14 (Tier-1/near-Tier-1 college)  
* P \= clamp(50 − 6×14, 2, 98\) \= clamp(50−84) \= **2%** → classified Dream, correctly reflecting that a 6-point percentile gap at this tier is a steep climb.

---

## **10\. Required Percentile Gap Analysis (per college, report-facing)**

For every matched college, the report displays: College Name, Effective Required Percentile (with category/adjustment noted), Estimated Percentile, Gap, and the resulting Probability — all four numbers pulled directly from Sections 6–9, with no manually-entered example values.

---

## **11\. Weakness Analysis Engine (rule-driven, not example-driven)**

Generated by scanning the Section 3 sub-scores against thresholds, so the weakness list always matches the score that produced it:

| Trigger Condition | Weakness | Severity | Suggestion |
| ----- | ----- | ----- | ----- |
| Internship Score \< 25 (i.e. 0 internships) | No Internship Experience | Medium | Complete at least one internship before applying |
| Work Experience Score \< 33 (Bachelor's Graduate / Master's stages) | Low Work Experience | Medium–High (stage-dependent) | Target 12+ months relevant experience |
| Academic Strength \< 60 | Low Academic Consistency | High | Address weakest academic component (whichever sub-score is lowest) |
| Exam Readiness \= "Pending" | Exam Readiness Not Yet Established | High | Take a mock test to unlock an accurate percentile and probability estimate |
| Gap \> 5 for all colleges in a target tier | Target Exam Readiness Gap | High | Increase mock percentile by \[Gap\] points before application cycle |

Severity and suggestion text are generated from the same numeric thresholds used elsewhere, so a user can never see a weakness that contradicts their displayed score.

---

## **12\. Improvement Simulator**

V1.0 showed hardcoded deltas (76→81→84→88). These must instead be **re-runs of the Section 4 formula** with one hypothetical input changed, keeping everything else fixed:

Simulated Score \= ProfileScoreFormula(current\_inputs\_with\_one\_change)

Example using the Section 4 student (baseline 68):

* \+1 Internship → Internship Score 25→50 → Experience 7.5→22.5 → new Profile Score \= 83.5×0.35+22.5×0.25+92×0.40 \= 29.2+5.6+36.8 \= **71.7**  
* \+12 months work experience → Work Exp Score 0→20 → Experience 22.5→34.5 → new Profile Score ≈ **74.6**

Each simulated lever is ranked by score-impact-per-effort so the report can honestly say "this action moves you the most," instead of presenting an arbitrary fixed sequence.

---

## **13\. Roadmap Generation**

Each unresolved weakness from Section 11 is mapped to a horizon based on how long it realistically takes to fix:

* **0–3 months:** anything fixable with no calendar dependency (mock test attempts, certifications, profile documentation)  
* **3–6 months:** internship, leadership exposure, sustained mock-score improvement  
* **6–12 months:** target exam percentile achievement, interview/WAT-PI preparation

The roadmap is therefore a direct function of the weakness list, not a separately authored generic checklist.

---

## **14\. End-to-End System Working Flow**

1\.  User selects Education Stage

2\.  Dynamic form renders stage-specific required fields (Section 2\)

3\.  Client \+ server-side validation (range checks, controlled-list checks)

4\.  Academic Strength Engine  → Section 3.1

5\.  Experience Strength Engine → Section 3.2  (skipped if stage has no experience fields)

6\.  Exam Readiness Engine → Section 3.3  (flags "Pending" if no mock data)

7\.  Profile Score Aggregator → Section 4 (applies reweighting rule if any component is missing)

8\.  Profile Strength Classifier → Section 5

9\.  Percentile Estimator → Section 6 (mock-based or calibrated fallback range)

10\. College Matching Engine queries \`colleges\` \+ \`cutoff\_history\`, applies eligibility filter → Section 8 step 1

11\. Effective Required Percentile calculated per college → Section 8 step 2

12\. Gap Calculator → Section 8 step 3

13\. Probability Engine → Section 9

14\. Classification Engine buckets each college into Dream / Target / Safe

15\. Weakness Analysis Engine scans sub-scores → Section 11

16\. Improvement Simulator re-runs steps 4–13 with hypothetical changes → Section 12

17\. Roadmap Generator maps weaknesses to time horizons → Section 13

18\. Report Compiler assembles all 14 report sections (Section 15\)

19\. Report stored as an immutable versioned snapshot in \`reports\` table (Section 7.5)

20\. Dashboard reads the latest snapshot for display (Section 17\)

---

## **15\. Final Report Structure**

Same 14 sections as V1.0, each now sourced from a specific engine above rather than free text:

| \# | Section | Source |
| ----- | ----- | ----- |
| 1 | Executive Summary | Profile Score \+ Strength Band |
| 2 | Academic Analysis | Section 3.1 |
| 3 | Experience Analysis | Section 3.2 |
| 4 | Profile Strength | Section 5 |
| 5 | College Intelligence | Section 8 |
| 6–8 | Dream / Target / Safe Colleges | Section 8 classification |
| 9 | Required Percentile Analysis | Section 10 |
| 10 | Admission Probability | Section 9 |
| 11 | Weakness Analysis | Section 11 |
| 12 | Improvement Simulator | Section 12 |
| 13 | Personalized Roadmap | Section 13 |
| 14 | Final Recommendation | Synthesis of 1–13 |

---

## **16\. Report Versioning & Comparison**

Each report is an immutable snapshot (Section 7.5), so re-running cutoffs next year doesn't retroactively change a past report. "Compare Reports" diffs two snapshots field-by-field: Profile Score delta, sub-score deltas, and college-list changes (colleges that moved category or entered/left the matched list).

---

## **17\. Dashboard Data Contract**

Pulls directly from the latest reports row: Profile Strength, Category, top 3 weaknesses (by severity), Dream/Target/Safe lists, Required Percentile per target college, Admission Probability, Roadmap progress (% of roadmap items marked complete by the user), and a link to the latest full report.

---

## **18\. Data Maintenance & Cutoff Update Workflow**

Cutoffs and criteria weights change every admission cycle. Required process:

1. After each year's admission cycle closes, an admin enters that year's official cutoffs/criteria into cutoff\_history / selection\_criteria\_weights as **new rows**, never overwriting prior years.  
2. The Probability Engine's k constants (Section 9\) are refit against the newly available admission\_outcomes data.  
3. The percentile-calibration fallback table (Section 6\) is rebuilt from the same refreshed outcome data.  
4. All of this is versioned and audit-logged so a report generated in March can be explained even after the database updates in July.

Skipping this step is the most common way a system like this silently becomes inaccurate — the cutoffs feel "done" after launch but actually expire every year.

---

## **19\. Recommended Tech Stack (SaaS-scale)**

* **Scoring/Matching service:** Python (FastAPI) or Node.js, with all weight tables (Sections 3–4) stored as versioned JSON config — not hardcoded constants — so weights can be tuned without a redeploy.  
* **Database:** PostgreSQL for colleges, cutoff\_history, selection\_criteria\_weights, admission\_outcomes, reports — relational integrity matters here because cutoffs join across college/year/category.  
* **Probability calibration:** scikit-learn logistic regression (or a simple rules engine at launch, upgraded once enough admission\_outcomes rows exist), retrained on the yearly cycle in Section 18\.  
* **Caching:** Redis for already-computed report snapshots, since college matching against the full cutoff table is the heaviest query.  
* **Report rendering:** server-side HTML→PDF (e.g., Puppeteer/WeasyPrint) from the same report JSON used by the dashboard, so the on-screen and downloaded versions never diverge.  
* **Admin panel:** a separate authenticated interface for Section 18's yearly cutoff entry, with an audit trail — this is a first-class part of the build, not an afterthought.

---

## **20\. Success Criteria Traceability**

| Original Question | Answered By |
| ----- | ----- |
| How strong is my profile? | Sections 4–5 |
| Which colleges should I target / are safe / are dream? | Section 8 |
| What percentile do I need? | Sections 6, 10 |
| What are my weaknesses? | Section 11 |
| How can I improve? | Sections 12–13 |
| What are my admission chances? | Section 9 |
| What should I do next? | Section 13 |

Every answer above now traces to a formula or a database lookup defined in this document — there are no remaining placeholder numbers.

# **MBAOS – Profile Intelligence**

## **Complete Technical & Functional Specification (Build-Ready)**

**Version:** V2.0 — Accurate / Implementation-Ready **Supersedes:** V1.0 Final (descriptive-only spec) **Module:** Profile Intelligence

This version replaces every example-only output in V1.0 with an actual formula, weight table, data schema, or rule set, so the module can be built and will produce consistent, defensible results rather than placeholder numbers.

---

## **1\. System Objective**

Profile Intelligence converts a student's raw academic, experience, and exam data into:

1. A defensible numeric Profile Score (0–100)  
2. An estimated competitive percentile  
3. A college-by-college admission probability, computed against a real cutoff database  
4. A weakness list and improvement roadmap derived from the same scoring engine (not hardcoded)

Every number shown to the user must be traceable to a formula or a database lookup. Nothing in the final report is a free-floating example.

---

## **2\. User Types & Input Schema**

Each stage collects only the fields its formula actually uses. Two fields are added to every stage versus V1.0 because the scoring and matching logic cannot run accurately without them:

* **Reservation Category** (General / OBC-NCL / SC / ST / EWS / PwD) — required. Indian MBA cutoffs differ by 5–20 percentile points by category; omitting this makes every percentile-gap and probability number wrong for non-General candidates.  
* **Gender** (optional, used only for diversity-adjustment lookup at colleges that publish a gender-diversity policy) — optional, used only if the student wants the adjustment applied.

| Stage | Fields | Type / Validation |
| ----- | ----- | ----- |
| 12th Student | 10th %, Expected 12th %, Stream, Target Exam, Category | % fields: 0–100 float |
| Pursuing Bachelor's | 10th %, 12th %, Current CGPA, Graduation Stream, Target Exam, Category | CGPA: 0–10 float |
| Bachelor's Graduate | 10th %, 12th %, Graduation CGPA, Graduation Stream, Internship Count, Work Exp Months (optional), Target Exam, Category | Internship Count: integer ≥0 |
| Pursuing Master's | 10th %, 12th %, Bachelor CGPA, Master CGPA (in-progress), Target Exam, Category | — |
| Master's Graduate | 10th %, 12th %, Bachelor CGPA, Master CGPA, Target Exam, Category | — |
| Working Professional | 10th %, 12th %, Bachelor CGPA, Master CGPA (optional), Work Exp Months, Current Role, Target Exam, Category | Work Exp Months: integer ≥0 |
| All stages, optional | Most recent Mock Test Percentile \+ Exam \+ Date | If absent, Exam Readiness falls back to the "unrated" path in Section 3.3 |

**Validation rules:** percentages and CGPA are rejected outside their natural range; Graduation Stream is restricted to a controlled list (Engineering / Commerce / Science / Arts / Other) because it feeds the academic-diversity adjustment in Section 8; Target Exam is restricted to the five listed exams because it drives the exam-eligibility filter in Section 8\.

---

## **3\. Profile Evaluation Engine — Scoring Formulas**

### **3.1 Academic Strength Score (0–100)**

CGPA inputs are first normalized to a percentage equivalent: normalized \= (CGPA / 10\) × 100.

Weighted by stage, because the academic record that actually predicts MBA readiness changes as a student progresses (a working professional's 10th-grade marks matter far less than their Bachelor's/Master's record):

| Stage | 10th % | 12th % | Bachelor | Master |
| ----- | ----- | ----- | ----- | ----- |
| 12th Student | 40% | 60% | — | — |
| Pursuing Bachelor's | 20% | 30% | 50% (current CGPA) | — |
| Bachelor's Graduate | 15% | 20% | 65% | — |
| Pursuing Master's | 10% | 15% | 35% | 40% (in-progress) |
| Master's Graduate | 10% | 10% | 35% | 45% |
| Working Professional | 10% | 10% | 40% / 80%\* | 40% / 0%\* |

\*Working Professional: if Master CGPA is not supplied, its 40% weight is redistributed to Bachelor CGPA (so Bachelor weight becomes 80%), not silently dropped — this is the explicit null-handling rule the V1.0 spec was missing.

Academic Strength Score \= Σ (component % or normalized CGPA × stage weight)

### **3.2 Experience Strength Score (0–100)**

Internship Score      \= min(Internship Count × 25, 100\)

Work Experience Score \= min(Work Experience Months / 60 × 100, 100\)

Experience Strength    \= (Internship Score × 0.3) \+ (Work Experience Score × 0.7)

Work experience is capped at 60 months (5 years) because most MBA programs treat 0–5 years as the relevant evaluation band; beyond that, additional months stop adding score (a real-world plateau the V1.0 examples never modeled).

Stages with no experience fields (12th Student, Pursuing Bachelor's, Pursuing Master's) have Experience Strength weight \= 0 in Section 4, not a fabricated default value.

### **3.3 Exam Readiness Score (0–100)**

* **If a Mock Test Percentile is supplied:** Exam Readiness Score \= Mock Percentile (most recent attempt; if multiple, average the latest two, weighted 60/40 toward the most recent).  
* **If no mock data exists:** the component is marked **"Pending — Unrated,"** its weight is set to 0, and the freed weight is redistributed proportionally across Academic and Experience (see Section 4 reweighting rule). The report explicitly states *"Exam Readiness not yet calculated — take a mock test to unlock a more accurate percentile estimate,"* rather than silently guessing a number, which is what V1.0's "if available" language allowed to happen invisibly.

---

## **4\. Profile Score Aggregation**

Master stage weights (applied only when all three components have data; see reweighting rule below for missing-data cases):

| Stage | Academic | Experience | Exam Readiness |
| ----- | ----- | ----- | ----- |
| 12th Student | 70% | 0% | 30% |
| Pursuing Bachelor's | 60% | 0% | 40% |
| Bachelor's Graduate | 35% | 25% | 40% |
| Pursuing Master's | 50% | 0% | 50% |
| Master's Graduate | 30% | 20% | 50% |
| Working Professional | 20% | 35% | 45% |

**Reweighting rule (missing Exam Readiness):** if Exam Readiness is "Pending," its weight is redistributed to Academic and Experience in their existing ratio. Example: a Bachelor's Graduate with no mock data has Academic:Experience \= 35:25 \= 7:5; the freed 40% splits as \+23.3% to Academic and \+16.7% to Experience, giving an effective 58.3% / 41.7% / 0% split.

Profile Score \= (Academic × W\_a) \+ (Experience × W\_e) \+ (Exam Readiness × W\_x)

**Worked example — Bachelor's Graduate** 10th \= 88, 12th \= 85, CGPA \= 8.2 (→82), Internships \= 1, Work Exp \= 0 months, Mock Percentile \= 92\.

* Academic \= 88×0.15 \+ 85×0.20 \+ 82×0.65 \= 83.5  
* Experience \= (min(25,100)×0.3) \+ (0×0.7) \= 7.5  
* Exam Readiness \= 92  
* Profile Score \= 83.5×0.35 \+ 7.5×0.25 \+ 92×0.40 \= 29.2 \+ 1.9 \+ 36.8 \= **67.9 → 68**

This single example shows exactly why weak experience drags down an otherwise strong academic+exam profile — the same numbers later drive the Weakness Analysis output in Section 11, instead of weakness text being written independently of the score.

---

## **5\. Profile Strength Classification**

Unchanged bands from V1.0, now backed by the formula above instead of a free-floating number:

| Band | Score | Description |
| ----- | ----- | ----- |
| Elite Profile | 90–100 | Highly competitive for top-tier MBA institutions |
| Strong Profile | 80–89 | Competitive, good admission potential |
| Competitive Profile | 70–79 | Good profile, needs targeted improvement |
| Average Profile | 60–69 | Needs improvement in academics or profile building |
| Weak Profile | Below 60 | Significant improvement required |

---

## **6\. Percentile Estimation Model**

This was the single biggest gap in V1.0 — a "Current Potential" percentile was shown with no source.

* **High Confidence (mock-based):** if a recent mock percentile exists, Estimated Percentile \= Exam Readiness Score directly (Section 3.3), labeled **"Calculated — based on your mock test."**  
* **Low Confidence (profile-based fallback):** if no mock data exists, the system uses a calibration lookup table that maps Profile Score bands to a historical percentile range *for that specific exam*, built from aggregated past-cohort data (see Section 7.4). This is shown as a **range**, not a false-precision single number — e.g., "Estimated Percentile: 88–93 (Low Confidence — take a mock test for a precise number)."

This calibration table must be rebuilt periodically (Section 18\) as exam difficulty and applicant pools shift year to year; it is not a one-time hardcoded mapping.

---

## **7\. College & Cutoff Intelligence Database**

V1.0 referenced "College Database / Cutoff Database / Admission Criteria Database" with no schema. Minimum viable schema:

### **7.1 colleges**

| Field | Type | Notes |
| ----- | ----- | ----- |
| college\_id | PK |  |
| name | text |  |
| tier | enum | Tier-1 / Tier-2 / Tier-3 (drives default Dream/Target/Safe banding) |
| accepted\_exams | array | e.g. \[CAT\], \[CAT, XAT\] — used for the eligibility filter in Section 8 |
| location, type | text |  |

### **7.2 cutoff\_history**

| Field | Type | Notes |
| ----- | ----- | ----- |
| college\_id | FK |  |
| exam, admission\_year | text, int | Cutoffs must be versioned per year — never overwritten |
| category | enum | General / OBC-NCL / SC / ST / EWS / PwD |
| gender\_segment | enum, nullable | only populated for colleges with a declared diversity policy |
| academic\_background | enum, nullable | Engineering / Non-Engineering, only where the college publishes a diversity adjustment |
| required\_percentile | float |  |
| sectional\_cutoffs\_json | json | for exams with sectional cutoffs (CAT/XAT) |

### **7.3 selection\_criteria\_weights**

| Field | Type | Notes |
| ----- | ----- | ----- |
| college\_id | FK |  |
| criteria\_type | enum | percentile / academic\_diversity / work\_experience / gender\_diversity / extracurricular / wat\_pi |
| weight\_percentage | float | published or estimated weight of this criterion in final selection |

### **7.4 admission\_outcomes (anonymized, for calibration)**

| Field | Type | Notes |
| ----- | ----- | ----- |
| college\_id, admission\_year | FK, int |  |
| applicant\_profile\_score, applicant\_percentile, category | float, float, enum |  |
| admitted | boolean | Used to calibrate the probability formula in Section 9 and the fallback table in Section 6 |

### **7.5 reports**

| Field | Type | Notes |
| ----- | ----- | ----- |
| report\_id, user\_id, version | PK, FK, int | enables Section 16 versioning/comparison |
| profile\_score, breakdown\_json, colleges\_json | float, json, json | full snapshot, so historical reports never change retroactively even if cutoffs update later |

**Data sourcing note:** cutoff and criteria-weight values must come from each college's officially published admission policy for that year, entered through an admin workflow (Section 18\) — they cannot be guessed or copied from a single illustrative example, since even a 1–2 percentile point error changes a college's entire classification.

---

## **8\. College Matching & Classification Logic**

For each college, run in order:

1. **Eligibility filter** — discard colleges whose accepted\_exams doesn't include the student's Target Exam. (Fixes the V1.0 gap where IIM Ahmedabad could appear for a CMAT-only student.)  
2. **Effective required percentile** — start from required\_percentile for the student's category in cutoff\_history, then apply any applicable gender or academic-background adjustment from the same table, only where the college has published one for that segment. Adjustments are never invented globally — a college with no declared diversity policy gets no adjustment.  
3. **Gap** \= Effective Required Percentile − Estimated Percentile (Section 6).  
4. **Probability** — see Section 9\.  
5. **Classification** — Dream (probability \<50%), Target (50–80%), Safe (\>80%) — same bands as V1.0, but now probability is computed, not assumed.

---

## **9\. Admission Probability Engine**

P(admit) \= clamp( 50 − (Gap × k), 2, 98 )

Where k is a steepness constant per college tier, expressing how fast probability swings per percentile point of gap — Tier-1 colleges have narrow, sharp cutoff bands (k≈12–15); Tier-3 "safe" colleges have wider tolerance (k≈18–20).

**This constant must be calibrated, not assumed.** Once admission\_outcomes data exists, fit k per college via logistic regression against actual admit/reject outcomes (admitted vs. gap), and refresh the fit yearly (Section 18). The formula above is the correct starting structure for launch; the constant is what gets more accurate over time as real outcome data accumulates.

**Worked example continuing Section 4's student** (Profile Score 68, Estimated Percentile 92, non-engineering background, General category, targeting SPJIMR which has no published academic-diversity adjustment for General category):

* Effective Required Percentile \= 98 (SPJIMR, General, no adjustment applies)  
* Gap \= 98 − 92 \= 6  
* k \= 14 (Tier-1/near-Tier-1 college)  
* P \= clamp(50 − 6×14, 2, 98\) \= clamp(50−84) \= **2%** → classified Dream, correctly reflecting that a 6-point percentile gap at this tier is a steep climb.

---

## **10\. Required Percentile Gap Analysis (per college, report-facing)**

For every matched college, the report displays: College Name, Effective Required Percentile (with category/adjustment noted), Estimated Percentile, Gap, and the resulting Probability — all four numbers pulled directly from Sections 6–9, with no manually-entered example values.

---

## **11\. Weakness Analysis Engine (rule-driven, not example-driven)**

Generated by scanning the Section 3 sub-scores against thresholds, so the weakness list always matches the score that produced it:

| Trigger Condition | Weakness | Severity | Suggestion |
| ----- | ----- | ----- | ----- |
| Internship Score \< 25 (i.e. 0 internships) | No Internship Experience | Medium | Complete at least one internship before applying |
| Work Experience Score \< 33 (Bachelor's Graduate / Master's stages) | Low Work Experience | Medium–High (stage-dependent) | Target 12+ months relevant experience |
| Academic Strength \< 60 | Low Academic Consistency | High | Address weakest academic component (whichever sub-score is lowest) |
| Exam Readiness \= "Pending" | Exam Readiness Not Yet Established | High | Take a mock test to unlock an accurate percentile and probability estimate |
| Gap \> 5 for all colleges in a target tier | Target Exam Readiness Gap | High | Increase mock percentile by \[Gap\] points before application cycle |

Severity and suggestion text are generated from the same numeric thresholds used elsewhere, so a user can never see a weakness that contradicts their displayed score.

---

## **12\. Improvement Simulator**

V1.0 showed hardcoded deltas (76→81→84→88). These must instead be **re-runs of the Section 4 formula** with one hypothetical input changed, keeping everything else fixed:

Simulated Score \= ProfileScoreFormula(current\_inputs\_with\_one\_change)

Example using the Section 4 student (baseline 68):

* \+1 Internship → Internship Score 25→50 → Experience 7.5→22.5 → new Profile Score \= 83.5×0.35+22.5×0.25+92×0.40 \= 29.2+5.6+36.8 \= **71.7**  
* \+12 months work experience → Work Exp Score 0→20 → Experience 22.5→34.5 → new Profile Score ≈ **74.6**

Each simulated lever is ranked by score-impact-per-effort so the report can honestly say "this action moves you the most," instead of presenting an arbitrary fixed sequence.

---

## **13\. Roadmap Generation**

Each unresolved weakness from Section 11 is mapped to a horizon based on how long it realistically takes to fix:

* **0–3 months:** anything fixable with no calendar dependency (mock test attempts, certifications, profile documentation)  
* **3–6 months:** internship, leadership exposure, sustained mock-score improvement  
* **6–12 months:** target exam percentile achievement, interview/WAT-PI preparation

The roadmap is therefore a direct function of the weakness list, not a separately authored generic checklist.

---

## **14\. End-to-End System Working Flow**

1\.  User selects Education Stage

2\.  Dynamic form renders stage-specific required fields (Section 2\)

3\.  Client \+ server-side validation (range checks, controlled-list checks)

4\.  Academic Strength Engine  → Section 3.1

5\.  Experience Strength Engine → Section 3.2  (skipped if stage has no experience fields)

6\.  Exam Readiness Engine → Section 3.3  (flags "Pending" if no mock data)

7\.  Profile Score Aggregator → Section 4 (applies reweighting rule if any component is missing)

8\.  Profile Strength Classifier → Section 5

9\.  Percentile Estimator → Section 6 (mock-based or calibrated fallback range)

10\. College Matching Engine queries \`colleges\` \+ \`cutoff\_history\`, applies eligibility filter → Section 8 step 1

11\. Effective Required Percentile calculated per college → Section 8 step 2

12\. Gap Calculator → Section 8 step 3

13\. Probability Engine → Section 9

14\. Classification Engine buckets each college into Dream / Target / Safe

15\. Weakness Analysis Engine scans sub-scores → Section 11

16\. Improvement Simulator re-runs steps 4–13 with hypothetical changes → Section 12

17\. Roadmap Generator maps weaknesses to time horizons → Section 13

18\. Report Compiler assembles all 14 report sections (Section 15\)

19\. Report stored as an immutable versioned snapshot in \`reports\` table (Section 7.5)

20\. Dashboard reads the latest snapshot for display (Section 17\)

---

## **15\. Final Report Structure**

Same 14 sections as V1.0, each now sourced from a specific engine above rather than free text:

| \# | Section | Source |
| ----- | ----- | ----- |
| 1 | Executive Summary | Profile Score \+ Strength Band |
| 2 | Academic Analysis | Section 3.1 |
| 3 | Experience Analysis | Section 3.2 |
| 4 | Profile Strength | Section 5 |
| 5 | College Intelligence | Section 8 |
| 6–8 | Dream / Target / Safe Colleges | Section 8 classification |
| 9 | Required Percentile Analysis | Section 10 |
| 10 | Admission Probability | Section 9 |
| 11 | Weakness Analysis | Section 11 |
| 12 | Improvement Simulator | Section 12 |
| 13 | Personalized Roadmap | Section 13 |
| 14 | Final Recommendation | Synthesis of 1–13 |

---

## **16\. Report Versioning & Comparison**

Each report is an immutable snapshot (Section 7.5), so re-running cutoffs next year doesn't retroactively change a past report. "Compare Reports" diffs two snapshots field-by-field: Profile Score delta, sub-score deltas, and college-list changes (colleges that moved category or entered/left the matched list).

---

## **17\. Dashboard Data Contract**

Pulls directly from the latest reports row: Profile Strength, Category, top 3 weaknesses (by severity), Dream/Target/Safe lists, Required Percentile per target college, Admission Probability, Roadmap progress (% of roadmap items marked complete by the user), and a link to the latest full report.

---

## **18\. Data Maintenance & Cutoff Update Workflow**

Cutoffs and criteria weights change every admission cycle. Required process:

1. After each year's admission cycle closes, an admin enters that year's official cutoffs/criteria into cutoff\_history / selection\_criteria\_weights as **new rows**, never overwriting prior years.  
2. The Probability Engine's k constants (Section 9\) are refit against the newly available admission\_outcomes data.  
3. The percentile-calibration fallback table (Section 6\) is rebuilt from the same refreshed outcome data.  
4. All of this is versioned and audit-logged so a report generated in March can be explained even after the database updates in July.

Skipping this step is the most common way a system like this silently becomes inaccurate — the cutoffs feel "done" after launch but actually expire every year.

---

## **19\. Recommended Tech Stack (SaaS-scale)**

* **Scoring/Matching service:** Python (FastAPI) or Node.js, with all weight tables (Sections 3–4) stored as versioned JSON config — not hardcoded constants — so weights can be tuned without a redeploy.  
* **Database:** PostgreSQL for colleges, cutoff\_history, selection\_criteria\_weights, admission\_outcomes, reports — relational integrity matters here because cutoffs join across college/year/category.  
* **Probability calibration:** scikit-learn logistic regression (or a simple rules engine at launch, upgraded once enough admission\_outcomes rows exist), retrained on the yearly cycle in Section 18\.  
* **Caching:** Redis for already-computed report snapshots, since college matching against the full cutoff table is the heaviest query.  
* **Report rendering:** server-side HTML→PDF (e.g., Puppeteer/WeasyPrint) from the same report JSON used by the dashboard, so the on-screen and downloaded versions never diverge.  
* **Admin panel:** a separate authenticated interface for Section 18's yearly cutoff entry, with an audit trail — this is a first-class part of the build, not an afterthought.

---

## **20\. Success Criteria Traceability**

| Original Question | Answered By |
| ----- | ----- |
| How strong is my profile? | Sections 4–5 |
| Which colleges should I target / are safe / are dream? | Section 8 |
| What percentile do I need? | Sections 6, 10 |
| What are my weaknesses? | Section 11 |
| How can I improve? | Sections 12–13 |
| What are my admission chances? | Section 9 |
| What should I do next? | Section 13 |

Every answer above now traces to a formula or a database lookup defined in this document — there are no remaining placeholder numbers.

