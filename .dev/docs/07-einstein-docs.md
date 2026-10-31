> **Status:** Concept direction condensed from a Figma AI design review dated 2026-10-22. This document records intent and open decisions, not implementation evidence. No grading engine, calculation model, or HAC integration exists or is verified. Every capability is **phase unassigned**.
>
> “Einstein” is a working name. It does not assert a final product name, a release, or a relationship to another Nitrox project. Format follows [00-docs-meta.md](00-docs-meta.md).

# Einstein — intent and feature reference

## 0. Todos

The Figma review was a Q&A: each decision came with a rationale and an unresolved edge. The main questions are preserved here as next steps, with the current recommendation.

### Numbers and trust

- [ ] **What is the comparison baseline for “impact”?** Two measurements are possible: *update impact* (grade after an update minus the grade immediately before) and *assignment contribution* (current grade with the assignment minus the grade without it). They diverge when one sync contains multiple updates or revised scores. **Recommendation:** update impact in the activity feed; assignment contribution as a separate, explicitly labeled analysis.
- [ ] **What does the top summary average?** The concept mixes an all-course overview with course-specific figures. **Recommendation:** label overview averages “across all courses” with the method; keep cumulative GPA student-level; label the simulator with its course and level.
- [ ] **What does “assignment weight · 15%” mean?** It could be a share of the category, a share of the course grade, or something else — each produces a different answer. **Recommendation:** adapt inputs to the course’s actual grading model (total points, category weighting, explicit weighting).
- [ ] **Are letter grades universal?** No. Cutoffs, plus/minus, and rounding vary by school. Show percentages alongside letters, and present letters as examples until a school’s scale is known.
- [ ] **Should weighted GPA be primary?** School-dependent. Make it a labeled preference rather than an assumed hierarchy.
- [ ] **Are projections authoritative?** No. GPA is often threshold-based, so a small percentage change may produce no GPA change until a letter boundary is crossed. Mark projections illustrative and distinguish them from official GPA.
- [ ] **Are “Einstein reads” insights supported?** Only when traceable to a specific assignment or calculation. Statements like “one strong quiz can recover about half the drop” need the category, points, and expected score; otherwise they must be removed.
- [ ] **What does each assignment show?** The concept has one impact column. Add grading-period, semester, and GPA impact, expanding a row for the other two.

### Data and sync

- [ ] **Is manual entry a fallback?** No — it is first-class, for students without HAC access, unposted assignments, or early recording. The manual-entry form is undesigned; it needs course, name, category, earned/possible points, date, and any weighting or policy detail.
- [ ] **How do we show where a grade came from?** Label every row “HAC sync” or “Manual”.
- [ ] **Is “connected” the same as “current”?** No. Show connection status and last-sync time separately; the “next check in 46 minutes” text is illustrative.
- [ ] **What happens when a manual entry later appears in HAC?** Unresolved. Define duplicate detection, reconciliation, and a rule that imported updates never silently overwrite student edits.
- [ ] **What if sync is partially available?** Define failed sync, expired access, partial imports, and disconnect behavior before any copy implies reliability.
- [ ] **Is HAC access permissible?** Unresolved. Needs consent, credential handling, retention, deletion, and disconnect rules. This is a product-ethics gate, not only engineering.

### Product shape

- [ ] **Are six sidebar destinations too many for v1?** Possibly. A smaller version could combine Gradebook and Grade impact, with the simulator embedded inside each course. Only the overview surface is designed.
- [ ] **Standalone app, Tesseract surface, or something else?** Unresolved; do not assume a mapping.
- [ ] **Is there a public page or waitlist?** Decide before linking Einstein anywhere.

### Interface and accessibility

- [ ] Add accessible labels or tooltips to icon-only edit controls.
- [ ] Define the editing policy for imported records: an edit is a local override, not a change to HAC.
- [ ] Design empty, loading, disconnected, failed-sync, validation-error, and success states.
- [ ] Design a mobile layout; the concept is desktop-first.
- [ ] Validate sample data so dates, grading-period labels, cutoffs, and projections are coherent.
- [ ] Run an accessibility review: text size, contrast, keyboard operation, focus visibility, and nonvisual descriptions of charts and updates.

## 1. Development status and technical notes

### Current state

A UI concept and product-decision record only. There is no grading engine, no calculation model, no HAC connection, and no code. The Figma design is a direction, not a specification.

### Technical shape

None of the following is decided:

- **Data source:** HAC import plus manual entry, with a reconciliation model between them.
- **Calculation model:** category weights, dropped scores, extra credit, retakes, credits, and GPA conversion are school-specific and undefined.
- **History:** update impact needs enough stored history to explain a change; assignment contribution needs a complete current state. Neither model is designed.
- **Stack:** no app stack has been chosen. Nitrox precedent is proposed, not adopted.
- **Privacy:** credential handling and retention for a school portal are unresolved.

### Deviations from the Nitrox precedent

| Area | Nitrox default | This app | Why | Status |
|---|---|---|---|---|
| Data source | User-owned local content | External school gradebook plus manual entry | The data originates in a school system, not the user’s files | Unresolved |
| Visual identity | Parent brand foundation | Extends the parent brand with cobalt emphasis and a denser data workspace | Product surfaces may adapt | Concept |

## 2. Intent

Einstein is intended to **explain grade changes**, not just display grades. A gradebook already shows the numbers; Einstein turns records into understandable consequences and useful planning.

The central question:

> “What did this assignment change, and what could my next grade change?”

That leads to three jobs:

1. **Understand** — explain what changed after an assignment was added or updated.
2. **Forecast** — explore possible future grades without altering real records.
3. **Prioritize** — identify which courses and assignments deserve attention.

An explanation-first dashboard is a deliberate tradeoff: more useful than another grade list, but dependent on trustworthy calculations and a clearly defined comparison baseline.

## 3. Feature overview

| Area | What it covers | Capabilities | Detail |
|---|---|---|---|
| Overview and navigation | Status, summary metrics, connection state, insight flow | 7 | [4.1](#41-overview-and-navigation) |
| Grade entry and HAC sync | Imported and manual grades, source labels, freshness | 5 | [4.2](#42-grade-entry-and-hac-sync) |
| Calculation levels and metrics | Grading period, semester, GPA, scope, letters | 4 | [4.3](#43-calculation-levels-and-metrics) |
| Grade impact | Before/after/change, three impact levels, history | 3 | [4.4](#44-grade-impact) |
| What-if lab | Non-persistent scenarios, course-aware inputs, preview | 4 | [4.5](#45-what-if-lab) |
| Courses, records, and insights | Course cards, assignment context, trajectory, plain-language reads | 7 | [4.6](#46-courses-records-and-insights) |
| Visual and interaction direction | Brand extension, control patterns, icons, accessible change encoding | 5 | [4.7](#47-visual-and-interaction-direction) |

All capabilities are **phase unassigned**. The concept only covers the overview surface; the rest is intended structure.

## 4. Feature reference

### 4.1 Overview and navigation

The intended progression is **status → explanation → action**, rather than asking a student to interpret a large table immediately.

| ID | Intended area | Purpose | Phase |
|---|---|---|---|
| IA-01 | Greeting and grading period | Establish whose information this is and which period applies | Phase unassigned |
| IA-02 | Summary metrics | Answer “how am I doing?” | Phase unassigned |
| IA-03 | HAC connection status | Establish whether the information is current | Phase unassigned |
| IA-04 | Grade-impact workspace | Explain what moved | Phase unassigned |
| IA-05 | What-if calculator | Explore what could move next | Phase unassigned |
| IA-06 | Trajectory chart | Show longer-term direction | Phase unassigned |
| IA-07 | Insights | Translate numbers into plain language | Phase unassigned |

Sidebar: Overview, Grade impact, Courses, What-if lab, Gradebook, Settings.

- **Gradebook** — the underlying assignment records.
- **Grade impact** — the consequences of those records.
- **Courses** — course-specific performance and grading rules.
- **What-if lab** — hypothetical scenarios.
- **Overview** — a summary of all of the above.

The separation is intentional but unvalidated as a v1 shape; see section 0.

### 4.2 Grade entry and HAC sync

| ID | Intended capability | Detail | Phase |
|---|---|---|---|
| SYNC-01 | Manual grade entry | First-class, not a fallback. Works without HAC access or before an assignment is posted | Phase unassigned |
| SYNC-02 | HAC import | Bring in grades from a school gradebook portal | Phase unassigned |
| SYNC-03 | Source labels | Every row shows “HAC sync” or “Manual” | Phase unassigned |
| SYNC-04 | Connection status vs freshness | “Connected” and “last sync” are different facts and are shown separately | Phase unassigned |
| SYNC-05 | Review before importing | Imported changes are inspectable rather than invisible | Phase unassigned |

Manual entry needs at least course, assignment name, category, earned points, possible points, date, and applicable weighting or policy details. The form is not designed.

**Illustrative, not committed:** scheduled background checks, a connection that persists between visits, reliable import counts, and a guaranteed “next automatic check” time.

**Unresolved:** connection setup, consent, expired access, failed sync, partial imports, duplicate detection, and reconciliation when a manual entry later appears in HAC. Imported updates must not silently overwrite student edits.

### 4.3 Calculation levels and metrics

| ID | Intended capability | Detail | Phase |
|---|---|---|---|
| CALC-01 | Three visible levels | Grading period, semester, and cumulative GPA together | Phase unassigned |
| CALC-02 | Explicit metric scope | Say when a number is “across all courses” versus course-specific, and how averages are computed | Phase unassigned |
| CALC-03 | Percentages and letters | Percentages show small movements; letters show thresholds | Phase unassigned |
| CALC-04 | Weighted GPA as context | Unweighted is primary in the concept; weighted is secondary | Phase unassigned |

A cross-course average is useful orientation but must not look like an official school-reported grade unless the school defines one. Letter cutoffs, plus/minus, and rounding are school-specific; displayed letters are examples. Whether weighted GPA leads is a labeled preference.

### 4.4 Grade impact

| ID | Intended capability | Detail | Phase |
|---|---|---|---|
| IMPACT-01 | Before / after / change | All three in one row: `92.4 → 94.2 · +1.8` | Phase unassigned |
| IMPACT-02 | Three-level impact | Each assignment has grading-period, semester, and GPA impact | Phase unassigned |
| IMPACT-03 | Inspectable history | Enough history to explain how a number was produced | Phase unassigned |

A signed difference alone is hard to interpret; the before/after pair gives the change scale. Percentage changes are **percentage points**, not percent growth.

The comparison baseline is the key unresolved definition; see section 0. The recent-assignment table currently shows one impact column, not all three levels — a compact version could show grading-period impact inline and expand for the other two.

### 4.5 What-if lab

| ID | Intended capability | Detail | Phase |
|---|---|---|---|
| SIM-01 | Non-persistent scenarios | State clearly that a scenario is not saved | Phase unassigned |
| SIM-02 | Course, category, score, weight | Each input changes the result | Phase unassigned |
| SIM-03 | Course-aware inputs | Adapt to total points, category weighting, or explicit weighting instead of a generic percentage | Phase unassigned |
| SIM-04 | Downstream preview | Assignment → grading period → semester → GPA | Phase unassigned |

Hypothetical grades must never alter real grades or contaminate imported records; that separation is a trust boundary, not a UI detail.

Projections are illustrative. They are not derived from complete assignment totals, semester weights, credits, or GPA policies, and GPA is often threshold-based rather than continuously proportional. Projected cumulative GPA must be distinguished from official GPA based on completed coursework.

### 4.6 Courses, records, and insights

| ID | Intended capability | Detail | Phase |
|---|---|---|---|
| COURSE-01 | Course summaries above records | Show where movement happened before individual rows | Phase unassigned |
| COURSE-02 | Course-scoped workspace | Selecting a course scopes the workspace; recommended behavior, not implemented | Phase unassigned |
| COURSE-03 | Assignment context | Category, points possible, and date explain why similar scores differ in impact | Phase unassigned |
| COURSE-04 | Search and full history | Recent activity without turning the dashboard into the whole gradebook | Phase unassigned |
| CHART-01 | Trajectory chart | Complements discrete rows by showing direction over time | Phase unassigned |
| CHART-02 | Student-set target | A goal line makes movement meaningful; the displayed 92% target is sample content | Phase unassigned |
| INSIGHT-01 | Plain-language insights | Explain numbers, but only when traceable to an assignment or calculation | Phase unassigned |

The table uses icon-only edit controls that need accessible labels or tooltips. Imported records need an editing policy: an edit is a local override, not a change to HAC.

Insight statements must be deterministic. “Largest lift this period” needs a defined measurement and complete comparison data; otherwise it should not be shown.

### 4.7 Visual and interaction direction

| ID | Intended direction | Status |
|---|---|---|
| VIS-01 | Extend the Nitrox parent brand; cobalt sidebar and leading metric | Concept |
| VIS-02 | Familiar control patterns (buttons, fields, selects, badges, cards) to reduce learning effort | Concept; no component library verified |
| VIS-03 | Reuse the Phosphor icon direction | Concept; offline delivery unresolved — see [00-docs-meta.md](00-docs-meta.md#3-nitrox-technical-precedent) |
| VIS-04 | Encode change with signs, numbers, and before/after values in addition to colour | Concept |
| VIS-05 | Keep text labels for primary navigation and unfamiliar actions | Concept |

Serif carries product personality and editorial emphasis; sans-serif carries controls and tables; compact system-like styling carries status and calculation detail. Pale surfaces and white cards keep the data workspace calm.

The concept is desktop-first and has not had an accessibility review. Sample data (dates, grading-period labels, cutoffs, projections) needs to be coherent and validated before it is shown publicly.
