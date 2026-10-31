# Nitrox docs — meta, format, and technical precedent

> **Status:** Working conventions, 2026-10-23. This file describes how the doc set is organized and how app docs are written. It does not describe product behavior or make implementation claims.

## 0. Document map

Four kinds of writing live in this repo. They answer different questions; do not merge them.

| Layer | Path | Question it answers | Maintained by |
|---|---|---|---|
| Product docs | `.dev/docs (edit later)/v0.1b/` | What is the app, where is it, what is planned? | ad hoc, format below |
| Dev notes | `.dev/docs/` | Why was this built or decided this way? | Dev Project Docs |
| Worklog | `.dev/WORKLOG.md` | What changed, when, and how was it checked? | Dev Worklog |
| Learning notes | `.dev/human-learning.md` | How does the browser actually do that? | Dev Human Learning |

The meta doc you are reading describes its own row. `.dev/` is a dot-directory, so GitHub Pages
ignores it: these notes are in the repo, not on the site.

## 1. File conventions

- **`NN-name.md`** — two-digit ordinal, a hyphen, lowercase words. No spaces, no parentheses, no mixed case. This keeps terminal commands, grep, and Markdown links predictable.
- **`00-05`** are set-level docs (meta, readme, design, status, internal workflow, merge notes).
- **`06+`** are app docs, one file per app.
- **Numbers are stable.** Add new docs at the end; do not renumber to make a semantic order. Renaming is a link-sweep task, not a casual edit.
- **Links are relative and URL-safe** — `[06-tesseract-docs.md](06-tesseract-docs.md)`.
- **Every doc opens with a status blockquote** that states what the doc is and what it is not.
- **Repo-level notes are not numbered.** `WORKLOG.md` and `human-learning.md` sit directly in `.dev/`
  and use their own formats. They are not part of the `v0.1b` product set and do not follow `NN-name.md`.

## 2. App doc format

Every app doc uses the same five sections, in this order.

```markdown
> **Status:** [what this is] — not implementation evidence.
> [One line on the evidence boundary.]

# App name — [descriptor]

## 0. Todos
Open decisions and next steps, as checkboxes, grouped by kind.

## 1. Development status and technical notes
Evidence boundary, current state, stack, app-specific technical detail,
deviations from the Nitrox precedent, and open technical questions.

## 2. Intent
What it is, who it is for, what problem it solves, non-goals, name history.

## 3. Feature overview
A compact map of the feature areas: what exists as intent, how many capabilities,
and where the detail lives. This is the table of contents, not the inventory.

## 4. Feature reference
The detailed inventory. Grouped tables of intended capability with stable
IDs and a phase column. Rationale, constraints, and source notes belong here.
```

### What goes in each section

**0. Todos.** The working surface. Prefer questions over vague intentions (“decide X”, not “explore X”). Group them (product, technical, design, accessibility) when there are more than a handful. If a decision belongs to the owner, say so.

**1. Development status and technical notes.** Start with the honest boundary: is there code, a page, a waitlist, or nothing? Then the technical shape: stack, storage, data format, platform targets. Only include app-specific technical detail; repeat the shared defaults by reference instead of copying them. Record deviations in a small table:

| Area | Nitrox default | This app | Why | Status |
|---|---|---|---|---|

**2. Intent.** One or two paragraphs. What it is, who it is for, what it replaces or improves, and what it deliberately is not. Put older names here as history, marked unresolved unless the owner confirmed the mapping.

**3. Feature overview.** A compact table (area, intent, count, reference). It should let a reader find the right section in ten seconds.

**4. Feature reference.** The long-form inventory. Keep IDs stable (`CAP-01`, `SYNC-03`). Every row says “Phase unassigned” unless a phase was deliberately assigned. Include the awkward bits: dependencies, privacy, failure states, accessibility. This is where “yap lore” is allowed, as long as it is labelled as rationale or intent.

### Style rules

- Lowercase product names on the public site; capitalized names in docs tables for readability. Be consistent within a doc.
- Prefer “intended”, “proposed”, “explored”, “unresolved” over confident verbs.
- No dates or promises unless the owner made them.
- Do not describe a page, repo, scaffold, or waitlist as a shipped product.

## 3. Nitrox technical precedent

These are the defaults an app inherits unless it records a deviation. The list is deliberately narrow: it covers things that are already true of this repo or are the current documented direction, not every idea in the docs.

| Area | Precedent | Status |
|---|---|---|
| Company site | Static HTML/CSS/JS, no build step, GitHub Pages. Shared `styles.css` plus page-scoped CSS (`home.css`). Navbar injected from `navbar.html` by `script.js`; outbound links centralized in `NITROX_LINKS`. | Implemented |
| Fonts and assets | Self-hosted font files, no Google Fonts/CDN at runtime. Pages must render offline. | Implemented |
| Runtime dependencies | No framework or CDN requirement for basic rendering. Progressive enhancement; the page works without JS where practical. | Implemented |
| Data ownership | User content stays in readable, portable formats; no opaque database as the only store. | Proposed direction |
| Offline behavior | Core workflows should not require a network for basic use. | Proposed direction |
| App stack | Tauri 2 + React + TypeScript + Vite + Tailwind, with a browser/PWA target, is the current **proposal**. Not a decided standard. | Proposed |
| Platform boundary | Native APIs behind platform/storage adapters; UI/domain logic does not call Tauri directly. Browser uses File System Access/OPFS with IndexedDB or local storage as fallback. | Proposed |
| Type safety | Strict TypeScript and runtime validation at data boundaries (for example frontmatter). | Proposed |
| Visual system | Parent brand foundation plus app-specific adaptation. Parent surface: blue field, warm paper, ink; Instrument Serif display, Inter body, Instrument Sans UI, Geist Mono labels. Product accents live inside product surfaces. Token values, components, motion, voice, and the override rules live in [`.dev/DESIGN.md`](../../DESIGN.md). | Homepage implemented; parent system not finalized |
| Icons | Phosphor is the current direction. Delivery must work offline (bundled). | Unresolved |
| Accessibility | Contrast checked, visible focus states, reduced-motion respected, keyboard reachable. | Required, not yet audited |
| Honesty | A page, repo, scaffold, or waitlist is not proof of working behavior. Phases stay unassigned until deliberately set. | Applied |

### Recording a deviation

An app may differ from the precedent for a real reason. Record it in section 1 of that app's doc with the reason and the status (proposed, decided, or unresolved). Do not silently fork a default.

A deviation becomes precedent only when the owner decides it should apply to other apps; update this table when that happens.

## 4. Status vocabulary

Use the vocabulary in [03-status.md](03-status.md): owner-confirmed direction, source-documented intent, proposed implementation, historical, unresolved, unverified, phase unassigned. Do not invent a parallel vocabulary in an app doc.

## 5. Reference app doc

[06-tesseract-docs.md](06-tesseract-docs.md) is the reference for structure and depth: intent first, compact overview, then a stable-ID inventory with honest phase labels. New app docs should match that granularity without inheriting its scope.

[07-einstein-docs.md](07-einstein-docs.md) is the first doc written in this format from the start.

## 6. Learning notes (`human-learning.md`)

Repo-level, not an app doc. Lives at `.dev/human-learning.md` next to the worklog and is maintained by the
**Dev Human Learning** skill. Its audience is the owner, not users or contributors.

**Purpose.** Explain the mechanism behind a real change in this repo: first ELI5, then the browser's actual
behavior, then the fix and how to prove it. It is a teaching artifact, not product evidence and not a
substitute for the worklog.

**Format.** One `##` section per concept, with these parts in order:

```markdown
## N. Concept — the symptom that exposed it

**What we hit.** The real file and the real behavior.
**ELI5.** One concrete analogy that still maps to the mechanism.
**What actually happens.** The rule, the terms, the edge cases; a table or diagram when useful.
**The fix.** The change quoted from the repo, and why this fix over the alternatives.
**How to prove it.** DevTools steps and the values to expect.
**If you remember one thing.** One sentence.
**Terms to look up.** Three to six terms.
```

**Rules.**

- Start from something that happened in this repo; no textbook chapters.
- ELI5 first, mechanics second. The analogy may simplify but must not lie.
- One concept per section; cross-reference instead of repeating.
- Show before/after geometry with a small diagram when the bug was spatial.
- Name the tradeoff and the failure mode of the wrong fix.
- Verify behavior before writing it down; mark anything unchecked as unverified.
- Correct wrong notes in place and say what changed; do not silently rewrite history.
- Keep a final "what we built → what it teaches" map so the doc stays browsable.
- Link the doc from the worklog entry that produced the concept.

This file is not part of the `v0.1b` numbering, is never linked from the public site, and does not carry
product claims.
