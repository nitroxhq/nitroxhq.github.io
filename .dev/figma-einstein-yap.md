Yes :3 — here’s the product decision record for the
.

Important distinction: I made a UI concept, not a validated grading engine or working HAC integration. Some decisions are deliberate product recommendations; others are illustrative assumptions that need validation. I’m separating those below so the interface doesn’t accidentally become the specification.
Einstein — Product decision record

Concept review · October 22, 2026
1. Product purpose
Decision: Einstein explains grade changes, rather than just displaying grades

The central question is:

    “What did this assignment change, and what could my next grade change?”

HAC already serves as a gradebook. Einstein’s value should be turning those records into understandable consequences and useful planning.

That led to three main jobs:

    Understand: Explain what changed after an assignment was added or updated.
    Forecast: Explore possible future grades without altering real records.
    Prioritize: Identify which courses and assignments deserve attention.

Tradeoff: An explanation-first dashboard is more useful than another grade list, but it requires trustworthy calculations and clearly defined comparison baselines.
2. Information architecture
Decision: Start with an overview, then allow deeper investigation

The dashboard is organized in this order:
Area	Purpose
Greeting and grading period	Establish whose information this is and which time period applies
Summary metrics	Answer “How am I doing?”
HAC connection status	Establish whether the information is current
Grade-impact workspace	Explain what moved
What-if calculator	Explore what could move next
Trajectory chart	Show longer-term direction
Insights	Translate the information into plain language

The intent is a progression from status → explanation → action, rather than making students interpret a large table immediately.
Decision: Separate navigation by student task

The sidebar contains Overview, Grade impact, Courses, What-if lab, Gradebook, and Settings.

The intended distinction is:

    Gradebook: The underlying assignment records.
    Grade impact: The consequences of those records.
    Courses: Course-specific performance and grading rules.
    What-if lab: Hypothetical scenarios.
    Overview: A summary of all of the above.

Still unvalidated: This may be too many destinations for an initial release. An MVP could combine Gradebook and Grade impact, with the simulator embedded in each course. Only the overview surface is designed so far.
3. Grade entry and HAC sync
Decision: Support both imported and manually entered grades

This was a core requirement. I kept both available instead of treating manual entry as a fallback.

Reasons:

    Some students may not have compatible HAC access.
    An assignment may not have appeared in HAC yet.
    A student may want to record information before a teacher posts it.
    Manual entry lets the product remain useful when syncing is unavailable.

Decision: Make “Sync HAC” and “Add grade” immediately available

They are the two primary ways information enters Einstein, so neither should be buried in settings.

The manual-entry form is not yet designed. It would need at least a course, assignment name, category, earned points, possible points, and date, plus any applicable weighting or grading-policy details.
Decision: Show the source of every assignment

The table distinguishes “HAC sync” from “Manual.”

That supports trust and troubleshooting: students should know whether a value came from an official record or their own entry.
Decision: Show connection status separately from data freshness

“HAC connected” answers whether a connection exists. “Last sync” answers when the information was last refreshed. These are different facts.

The concept also includes an imported-grade count and a review action so updates are inspectable rather than invisible.

Assumptions, not established capabilities:

    Scheduled background checks are possible.
    A connection can remain available between visits.
    Import counts can be determined reliably.
    The displayed next-check time can be guaranteed.

The “next automatic check in 46 minutes” text is illustrative, not a technical commitment.

Still needed: Connection setup, consent, expired access, failed sync, partial imports, duplicate detection, and reconciliation when a manual entry later appears in HAC. Imported updates should not silently overwrite conflicting student edits.
4. The three calculation levels
Decision: Keep grading period, semester, and cumulative GPA visible together

This directly reflects your requested scope. It helps students understand that a noticeable assignment impact does not necessarily produce an equally noticeable semester or GPA change.

However, the concept exposes an important ambiguity:

The top cards mix an all-course overview with course-specific calculations.

The trajectory is labeled as an all-course average, while the simulator clearly operates on AP Calculus. The semester figure is less clearly scoped.
Recommended clarification

    Overview averages should explicitly say “Across all courses” and explain their averaging method.
    The simulator should show “AP Calculus · grading-period grade” and “AP Calculus · semester grade.”
    Cumulative GPA should remain a student-level metric.

A cross-course average is useful orientation, but it should not look like an official school-reported grade unless the school actually defines one.
Decision: Show percentages alongside letter grades

Percentages communicate small movements; letters communicate thresholds students recognize.

Unresolved: Letter cutoffs, plus/minus grading, and rounding vary by school. The displayed letters are examples, not a universal grading scale.
Decision: Emphasize unweighted GPA and provide weighted GPA as secondary context

The concept shows 3.72 / 4.0 with weighted GPA below it.

The intent was to make the scale immediately understandable while acknowledging advanced-course weighting.

Unresolved: Whether weighted GPA should be primary depends on the student’s school. It should be a clearly labeled preference, not an assumed universal hierarchy.
5. Defining “net impact”
Decision: Show before, after, and change together

A signed difference alone is hard to interpret. A row such as:

92.4 → 94.2 · +1.8

shows both the consequence and its scale.

For percentage grades, that change should be labeled percentage points, not percent growth.
Important unresolved decision: What is the comparison baseline?

Two different measurements are possible:

    Update impact: Grade after a recorded update minus grade immediately before that update.
    Assignment contribution: Current grade with an assignment included minus the recalculated grade without it.

These are not interchangeable. Multiple updates in one sync, revised scores, and changing category totals can make them diverge.

Recommendation: Use update impact in the activity feed. Offer assignment contribution as a separate, explicitly labeled analysis. Preserve enough history to explain the difference.

The concept currently suggests update impact but does not define it rigorously.
Scope gap in the current concept

The recent-assignment table shows one impact column, not all three requested levels.

To fully satisfy the product requirement, each assignment needs access to:

    Grading-period impact
    Semester impact
    Cumulative GPA impact

A compact implementation could show grading-period impact in the table and expand a row for the other two. The three-level view currently appears only in the simulator.
6. The what-if calculator
Decision: Keep hypothetical grades separate from recorded grades

The simulator says the scenario is not saved.

This is a trust boundary: exploring a score must not silently alter real grades or contaminate imported records.
Decision: Ask for course, category, score, and assignment weight

Each affects the result:

    Course: Determines the applicable records and policies.
    Category: Determines which portion of the course grade changes.
    Score: Supports points-based assignments rather than percentages alone.
    Weight: Attempts to represent assignment importance.

Problem to resolve: “Assignment weight” is ambiguous

The concept shows both Tests · 55% and Assignment weight · 15%.

It does not explain whether 15% means a share of the test category, a share of the entire course grade, or something else. Those interpretations produce different answers.

Recommendation: Adapt inputs to the course’s actual grading model:

    Total-points courses: earned and possible points.
    Category-weighted courses: category plus earned and possible points.
    Explicit assignment weighting: a clearly labeled multiplier or contribution.
    Other policies: specific support rather than a generic percentage field.

Decision: Preview all three downstream effects

Students should see the chain from assignment to grading period to semester to GPA.

Critical qualification: The displayed projections are illustrative. They have not been derived from a complete set of assignment totals, semester weights, credits, and GPA policies.

GPA is often threshold-based, not continuously proportional to percentage changes. A small percentage increase may produce no GPA change until a course crosses a letter-grade boundary.

Projected cumulative GPA also needs to be distinguished from official GPA based on completed coursework.
7. Course summaries and assignment table
Decision: Provide course-level summaries above assignment details

This gives students a quick way to identify where movement happened before reading individual records.

The intended course-card behavior is to scope the workspace to that course. That behavior is a recommendation, not an implemented interaction.
Decision: Include assignment context, not only its name

Category, points possible, and date help explain why two similarly scored assignments can have different impacts.
Decision: Include search and access to the full history

The dashboard should show recent activity without becoming the entire gradebook. Search and “View all” support investigation beyond the initial rows.
Missing low-level clarity

The table currently uses icon-only editing controls. These need accessible labels or tooltips.

Imported records also need a defined editing policy: an edit should be clearly identified as a local override, not presented as a change to HAC.
8. Trajectory and insights
Decision: Use a trend chart to complement individual changes

The table explains discrete events. The chart answers whether performance is improving over time.
Decision: Show a target reference

A goal line makes movement more meaningful than an isolated percentage.

Assumption: The displayed 92% target is sample content. Students should set or confirm their own goal.
Decision: Translate numbers into short explanations

The “Einstein reads” section aims to reduce interpretation effort.

But statements such as “One strong quiz can recover about half the drop” must be backed by an explicit scenario. Without the quiz category, points, and expected score, that is unsupported advice.

Similarly, “largest lift this period” requires a defined measurement and complete comparison data.

Recommendation: Keep insights deterministic and traceable to the relevant assignment or calculation. Don’t imply certainty that the available data cannot support.
9. Visual and interaction decisions
Decision: Extend Nitrox rather than invent a separate identity

I used the explorations’ electric blue, pale blue, expressive serif, modern sans-serif, and small system-like labels.

The division of roles is intentional:

    Serif: Product personality and editorial emphasis.
    Sans-serif: Controls, tables, and everyday readability.
    Compact numerical/system styling: Status and calculation details.

Decision: Use cobalt for identity and primary emphasis

The sidebar and leading metric make the product recognizably Nitrox. Pale surfaces and white cards keep the data workspace calmer.
Decision: Use familiar, shadcn-like control patterns

Buttons, fields, selects, badges, and cards use familiar conventions to reduce learning effort.

These should not be documented as verified shadcn library components. No shadcn library was enabled; the concept follows similar patterns.
Decision: Reuse the existing Phosphor icon direction

Icons reinforce familiar actions and section meanings. Text labels remain important for primary navigation and unfamiliar actions.
Decision: Encode change with more than color

Positive, negative, and neutral impacts use signs, numbers, and before/after values in addition to color.

The concept still needs a formal accessibility review, including text size, contrast, keyboard operation, focus visibility, and nonvisual descriptions of charts and updates.
10. What remains open before this becomes a product specification

The highest-priority decisions are:

    School-specific calculation rules: Categories, rounding, dropped scores, missing work, extra credit, retakes, exams, credits, and GPA conversion.
    Impact definition: Historical update impact versus current assignment contribution.
    Metric scope: Course grades versus cross-course overview averages.
    HAC feasibility and privacy: Supported access, consent, secure handling, retention, disconnecting, and deletion.
    Import reconciliation: Duplicates, revised grades, manual entries, and local overrides.
    Incomplete-data behavior: Show an estimate or unavailable result rather than false precision.
    Additional states: Empty, loading, disconnected, failed sync, validation errors, and successful entry.
    Mobile layout: The current concept is desktop-first.
    Sample-data consistency: Dates, grading-period labels, letter cutoffs, and projections need a coherent, validated dataset.

Bottom line: I designed Einstein around “understand what changed, then safely explore what could change.” The visual hierarchy supports that direction, but the grading policies, impact definitions, and data-trust rules still need explicit decisions before the numbers can be treated as authoritative.