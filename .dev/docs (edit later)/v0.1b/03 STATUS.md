# Status, evidence, and TODOs

> **As of 2026-10-19.** No Nitrox or Tesseract product is currently implemented as a functioning product. This status overrides any implication that repositories, generated scaffolding, planning files, or deployment artifacts establish working capabilities.

## Status vocabulary

- **Owner-confirmed direction:** an editorial/product direction explicitly confirmed by the project owner.
- **Source-documented intent:** a capability or principle described in planning material; not implementation evidence.
- **Proposed implementation:** a suggested technical approach that remains unverified.
- **Historical:** an older name, proposal, or record retained for context.
- **Unresolved:** sources conflict or do not establish a decision.
- **Unverified:** repository, build, test, or observable product evidence has not confirmed the claim.
- **Phase unassigned:** feature is in intended scope but has no committed delivery phase.

## Overall status

| Area | Current status | Evidence boundary |
|---|---|---|
| Nitrox identity and broad mission | Working direction documented | Public wording around religious/social values deferred |
| Near-term priority | Core apps/software ecosystem | Owner-confirmed direction; no functioning products |
| Tesseract scope | Broad source-documented requirements | All features planned; none should be described as shipped |
| Tesseract architecture | File/offline-first direction; implementation choices proposed | No architecture implementation verified |
| Brand/product design relationship | Parent foundation + app-specific adaptations is the current documentation direction | Exact palette and visual rules unresolved |
| Monetization | Provisional Free / Paid-Premium / Business-Nonprofit model | No prices or finalized entitlements |
| Internal AI/homelab workflow | Internal development notes | Not a user-facing product feature or verified performance claim |
| GitHub repositories | Not verified in this consolidation | Integration/access still needed |
| Vercel deployments | Not verified in this consolidation | No claim about availability or functioning behavior |

## Tesseract: intended scope vs. implementation

The intended product spans notes, tasks, captures, calendar, whiteboards, time tracking, databases, flashcards, goal/habit systems, media-later workflows, and connected object-based information. Details are in `TESSERACT-REQUIREMENTS.md`.

The file-first/offline-first direction is current. A particular stack or schema is not yet an established implementation. Planning sources propose React, TypeScript, Vite, Tailwind, Tauri 2, Markdown/YAML content, JSON layout manifests, and browser/native storage adapters. Treat these as proposals until repository evidence and tests confirm them.

Older workspace-inspection material mentions `index.html`, `styles.css`, `script.js`, `package.json`, and `tauri.conf.json`. This is a historical inspection of files, not proof that those files produce a functioning product, nor proof that a migration to the proposed stack has occurred.

## Actionable TODOs

### P0 — establish implementation truth
- [ ] Connect/review GitHub access for `nitroxhq/Tesseract` and `nitroxhq/nitroxhq.github.io`.
- [ ] Inspect repository tree, current branch, commit history, package manifests, generated files, tests, build logs, and platform configuration.
- [ ] Separate source files, generated scaffolding, design mockups, and functioning behavior in status reporting.
- [ ] Recheck the deployed sites only as observable artifacts; do not infer features from their existence.
- [ ] Record reproducible build/test results, target platforms, and known failures when available.

### P1 — reconcile product requirements
- [ ] Preserve the full requirements inventory in `TESSERACT-REQUIREMENTS.md`; compare each item with implementation only after repositories are accessible.
- [ ] Assign feature phases only when deliberately prioritized. Leave the rest **phase unassigned**.
- [ ] Reconcile older object-based/tag-based organization, folders, and auto-tagging with the current file/offline-first direction without dropping the user capability.
- [ ] Determine how jots, daily notes, journaling, captures, tasks, and general notes relate in the product model.
- [ ] Resolve the intended boundaries between Tesseract, Prism, Photon, Airwaves/AirWave, and older app names only where evidence supports a mapping.

### P1 — decide architecture trade-offs
- [ ] Decide whether Tauri 2 + React/TypeScript/Vite/Tailwind is the chosen target stack or still a proposal.
- [ ] Define browser behavior and persistence fallback when native filesystem access is unavailable.
- [ ] Specify the portable file format contract, schema versioning, migration strategy, and recovery behavior without assuming JSON layout manifests are the only viable implementation.
- [ ] Decide account/login requirements, cloud-storage requirements, and the minimal local mode.
- [ ] Choose an initial sync model, if any; define conflict recovery, privacy/security expectations, and selective handling of large/old media.
- [ ] Confirm which fonts, icons, and dependencies must be bundled for offline rendering.
- [ ] Decide whether an AI feature is in Tesseract's product scope and, if so, define privacy and local/cloud boundaries separately from the internal development workflow.

### P1 — design and brand
- [ ] Maintain the parent-brand/product-adaptation distinction as the organizing principle.
- [ ] Decide which proposed parent-brand palette and product-specific tokens to adopt; do not treat the Gemini quick pass as final.
- [ ] Define accessible contrast, motion, density, theme, and customization expectations.
- [ ] Confirm whether spatial-canvas rendering should use an existing library or a custom rendering approach after requirements and constraints are evaluated.

### P2 — monetization and organization
- [ ] Define Free, Paid/Premium, and Business/Nonprofit entitlements without inventing prices.
- [ ] Clarify whether no ads applies to every plan or is a paid-plan entitlement; source material contains both “paid features” and “currently viable without funding” notes.
- [ ] Define hosted-storage limits, costs, data retention, and operational ownership before promising a hosted service.
- [ ] Decide business/nonprofit eligibility, organizational controls, support expectations, and whether compliance-related offerings are feasible.
- [ ] Identify specific standards, validation, audits, and obligations only after research and legal/technical review; all are TBD. Do not claim certification or “X compliant” status.
- [ ] Keep self-hosted SSO outside paid feature gates; separately document that the customer remains responsible for operating the identity provider and infrastructure.

### P2 — finish source reconciliation
- [ ] Compare the accessible Craft documents with the latest owner decisions and preserve useful non-superseded older material.
- [ ] Review remaining linked Notion pages where they may contain unique source material.
- [ ] Add source paths/dates to requirements where helpful; distinguish direct owner direction from quick AI-generated proposals.
- [ ] Update `MERGE-NOTES.md` as source access improves.

## Non-goals of this status file

This file does not declare an MVP, release date, supported platform, current feature implementation, performance benchmark, compliance certification, price, or hosted-service commitment.
