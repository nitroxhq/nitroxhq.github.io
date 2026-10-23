# ASAP TODO — nitrox landing page (deepseek session context dump)

> **STATUS 2026-10-22 21:05 — COMPLETE / SUPERSEDED.** The tasks below were finished in the same
> session: page QA, Astrid rename, `07-einstein-docs.md`, app-workbench section, plan file, proposals
> file, and the WORKLOG entry. Kept for history; see `.dev/WORKLOG.md` (entry “First-pass landing page”)
> for what actually shipped. The remaining open work is the owner’s notes: theme picker, mission/about
> merge, navbar light-grey hover/active, and the narrow-width overflow fix.

> Written 2026-10-22 17:03 by the DeepSeek session, because the user had to leave mid-task.
> Read this first, then continue at **Next actions**. Nothing here is a spec for the docs; it is a
> handoff note.

## Overview

The landing page did not exist: `index.html` had been renamed to `og-index.html` (later
`mission.html`), so `/` was a file listing / 404 while the navbar still linked to `./index.html`.

The task was: use the Craft brainstorm “Nitrox Landing — Modern Indie Studio Direction (2026-10-22)”
as context, make a first-pass landing page, and keep Nitrox’s company identity separate from product
pages. Direction chosen (user-approved): **Blueprint** — blue hero field, warm paper body, product
color only inside product plates, mono labels, Instrument Serif display, lowercase brand voice.

A full first pass is built and rendering. Docs work, proposal docs, plan doc, and the worklog entry
are **not done yet**.

## Current state (what is on disk)

| File | Status | Notes |
|---|---|---|
| `index.html` | **new, untracked** | Full first pass. Sections: hero → selected work → beliefs → workbench → closing → footer. |
| `home.css` | **new, untracked** | Page-scoped design system + layout + reveal styles. |
| `home.js` | **new, untracked** | IntersectionObserver reveal (80ms stagger, unobserves after reveal). |
| `assets/icons/tesseract.svg` | **new, untracked** | Copy of `assets/@ app logos/tesseract/tesseract 55px svg.svg`. |
| `assets/icons/prism.svg` | **new, untracked** | Copy of `assets/@ app logos/prism/prism svg proof.svg`. |
| `.dev/figma-einstein-yap.md` | user-added source | Long Figma AI product-decision dump for Einstein. Do not delete; condense it. |

Untouched on purpose: `mission.html`, `projects.html`, `about.html`, `community.html`, `404.html`,
`bsod*`, `styles.css`, `navbar.html`, `.dev/docs/**`, and all of Craft.

Nothing is committed. `git status` shows only the five new files plus the user’s figma yap.

## Verified

- `python3 -m http.server 8000` is already running in this repo (PID 43418 when checked). `GET /` → 200.
- Desktop top-half screenshot rendered correctly:
  `/tmp/opencode/shots/home-desktop.png` (1440 × 2200, `google-chrome-stable --headless=new`).
- Hero, nav-on-blue, plates, “more work soon” row all render as intended.
- Live URLs checked (all 200): `/`, `/tesseract`, `/prism`, `/projects.html`,
  `https://github.com/nitroxhq`, `https://nitroxhq.github.io/tesseract/tab-manager.html`.
- Real product facts used on the page:
  - Tesseract tagline: “your productivity supertool.” Waitlist is live (Tally).
  - Prism tagline: “your feeds. without the force-feeding.” Its deployed page is a near-empty Jekyll
    README page with only the tagline.
  - Tab manager: “A cross-browser extension for tab OCD…”, status “coming soon”.

## Not verified / still open on the page

- Full-page review below the 2200px fold (beliefs, workbench, closing, footer) — **screenshot again**.
- No real mobile pass. Only `clamp()` + two `@media` fallbacks; user explicitly deferred mobile.
- No contrast audit. Blue/white is ~6.8:1; green `#64fa53` is used only as a plate wash/mark fill.
- The reveal animation has a `prefers-reduced-motion` guard, but no other motion work was requested.
- Navbar currently contains a `mission` link (newer than what was originally read). Left alone.

## Next actions (in order)

### 1. Finish visual QA (15 min)

```sh
google-chrome-stable --headless=new --disable-gpu --hide-scrollbars \
  --window-size=1440,4200 --screenshot=/tmp/opencode/shots/home-full.png \
  http://localhost:8000/index.html
```

Then repeat at `--window-size=430,3000` for a rough narrow-width check. Fix only what breaks, no
mobile redesign. Likely things to eyeball:

- `.plate-tess` has a lot of vertical slack (`min-height: 380px`) before the status row.
- Beliefs grid at 3 columns: heading lengths may wrap awkwardly.
- Workbench rows: `grid-template-columns: 200px 1fr auto` at mid widths.

### 2. Docs work the user explicitly asked for (highest priority after QA)

**a. Rename Photon → Astrid (name only).** Capitalized `Astrid` matches doc table style; site copy
stays lowercase. Exact locations:

- `.dev/docs (edit later)/v0.1b/01-readme.md:38` — portfolio table row.
- `.dev/docs (edit later)/v0.1b/03 STATUS.md:51` — boundaries TODO.
- `.dev/docs (edit later)/v0.1b/05 MERGE-NOTES.md:74` — “mapping to Photon”.
- `.dev/docs (edit later)/v0.1b/05 MERGE-NOTES.md:76` — concept list.
- `.dev/docs (edit later)/v0.1b/06-tesseract-docs.md:179` — “Tesseract Tabs and Photon boundaries”.

**b. Add Einstein doc** — new file in the same style as `06-tesseract-docs.md`:
`.dev/docs (edit later)/v0.1b/07-einstein-docs.md`

Style rules to copy: status blockquote that says concept/planning, not implementation; numbered
sections; capability tables with IDs (`INTENT-01`, `SYNC-01`, …) and a `Phase` column reading
`Phase unassigned`; explicit “proposed/illustrative” language; TODO checklist at the end.

Condense `.dev/figma-einstein-yap.md` into these sections (do not paste it wholesale):

1. Product intent — “explains grade changes, rather than just displaying grades”; three jobs:
   understand, forecast, prioritize. Comparison question: “what did this assignment change, and
   what could my next grade change?”
2. Information architecture — overview → explanation → action; sidebar: Overview, Grade impact,
   Courses, What-if lab, Gradebook, Settings; flagged risk of too many destinations for v1.
3. Grade entry and HAC sync — imported + manual entry are both first-class; show source per row
   (“HAC sync” vs “Manual”); connection status ≠ data freshness; scheduled checks, import counts,
   and “next check in 46 minutes” are illustrative; reconciliation/duplicates/overwrites unresolved.
4. Calculation levels — grading period, semester, cumulative GPA must stay distinct; across-all-courses
   averages must be labeled as such; letter cutoffs are school-specific; weighted GPA is secondary.
5. Grade impact — before → after · change (+1.8 percentage points, not 1.8%); comparison baseline is
   unresolved (update impact vs assignment contribution); table needs all three impact levels.
6. What-if lab — hypotheticals never touch real records; course/category/score/weight inputs; weight
   definition is ambiguous; projections are illustrative; GPA is threshold-based.
7. Courses, assignment table, trajectory, insights — course cards scope the workspace; “Einstein
   reads” insights must be deterministic and traceable, never unsupported advice.
8. Visual and interaction direction — extends Nitrox (cobalt identity, serif for personality, sans
   for controls, compact mono-ish labels); familiar control patterns (not verified shadcn); Phosphor
   icon direction; change encoded with signs/numbers, not color alone.
9. Open decisions / TODOs — school-specific rules, impact definition, metric scope, HAC feasibility
   and privacy, import reconciliation, incomplete-data behavior, empty/loading/error states, mobile,
   sample-data consistency.
10. Source note — “condensed from `.dev/figma-einstein-yap.md`, a Figma AI concept review dated
    2026-10-22; the design is not a validated grading engine or working HAC integration.”

Also add the new doc to the documentation map in `01-readme.md`.

**c. Add an “App workbench” section to `01-readme.md`**, directly after “Current working
portfolio” and before “Tesseract at a glance”. Framing: smaller tools/experiments that are not (yet)
core-suite apps, listed separately so the main portfolio does not overclaim. Content:

| Name | Intended direction | Status |
|---|---|---|
| **Tesseract Tab Manager** | Cross-browser extension for tab overload; companion to Tesseract | Page exists (`/tesseract/tab-manager.html`); “coming soon” |
| **Toolbox** | Drawer of small utilities: file/syntax/time/unit converters, growing into page-level control in the spirit of Zen boosts; the bare bones of the Astrid browser idea | Exploring; no page |
| **Einstein** | Grade assistant: explains grade changes, what-if lab, prioritization; HAC import plus manual entry | Early concept (Figma direction); see `07-einstein-docs.md` |

Keep the status vocabulary honest (`Phase unassigned`, “concept”, “no page”). Do not claim shipped
behavior anywhere.

### 3. `.dev/landing-indexhtml-redesign-deepseek-plan.md`

The plan the user asked to be written down: synthesis of the Craft doc, critique (what is generic vs
distinctive), the Blueprint direction, section-by-section design, system tokens, files, verification,
and the open decisions. Essentially the plan already sent in chat, plus a decision log:

- Hero copy keeps the brand’s best line (“today’s technology is broken. we’re gonna fix it.”).
- “premium SaaS” polish deliberately reduced: lowercase voice, underlines/italics instead of gradient
  glow, editorial rules instead of card chrome, mono for labels, no fake dashboards.
- Palette: `#3232ff` blue field, `#f6f4ef` paper, `#eeece3` workbench tint, `#0b0b10` ink.
- Product accents only inside product plates: Tesseract `#a161ea`, Prism `#64fa53`.
- Type: Instrument Serif display, Inter body, Instrument Sans UI, Geist Mono for labels/status.
- Shapes: rounded-polygon family derived from the real marks (Nitrox hourglass/intersection,
  Tesseract cube, Prism triangle) — this is the answer to the doc’s “recognizable Nitrox motif”.
- Deferred by the user: mobile pass, contrast audit, full motion spec, art direction pass.

### 4. `.dev/deepseek-proposed-nitrox-docs-edits.md`

Proposals only — do not silently rewrite canonical docs. Cover at least:

1. **Public positioning is missing from the canonical docs.** Adopt a company line that states a
   stance (“technology is broken / we’re gonna fix it”) with “better software, more imagination” as
   support, not the reverse. The docs currently have mission themes but no public sentence.
2. **“No functioning product” vs public surfaces.** Tesseract has a live waitlist; Prism and the tab
   manager have public pages. Propose language separating “concept”, “public page”, “waitlist”, and
   “shipped” so honest status stays honest.
3. **Product-name reconciliation.** Astrid rename done; still unresolved: `nexOS` and `cosmetica`
   (projects.html only), `airmail` and `bubble` (projects.html only), `Niko`/`NikoBot`, `Astrox`,
   `AirWave`/`Airwaves`, `Wrotebook`. Decide current vs historical vs retired.
4. **Portfolio drift.** `projects.html` lists ~15 concepts; the canonical portfolio lists 8. Propose
   one canonical list plus a “public index” subset, with a rule for adding/removing names.
5. **App-workbench category needs rules.** What qualifies (smaller tool vs core app), how status is
   labeled, and whether workbench items get pages.
6. **Einstein needs a status entry** in `03 STATUS.md` and a place in the docs map; HAC privacy and
   consent must be resolved before any claim.
7. **Parent-brand visual direction.** `02 DESIGN.md` says the palette is unresolved. Record what the
   landing page now does (blue field + paper + product accents + geometric family + mono labels) and
   mark it owner-approved vs proposal. Resolve the “palette decision needed” row.
8. **Voice guidelines are undocumented.** Propose a short section: lowercase, plain sentences, no
   marketing adjectives, no invented claims, dry humor allowed, never “revolutionary/seamless”.
9. **Broken internal links in the docs set.** `01-readme.md` references `TESSERACT-REQUIREMENTS.md`,
   which does not exist; the actual file is `06-tesseract-docs.md`. `01-readme.md` also references
   `DESIGN.md`, `STATUS.md`, `MERGE-NOTES.md` by bare name while files are numbered. Fix the map.
10. **Filename hygiene.** Folder `docs (edit later)/v0.1b/` and names like `01-readme.md`
    (spaces, parentheses) are brittle. Propose a numbered-slug convention and a `v0.2` cut.
11. **Missing site documentation.** Nothing records the navbar injection (`script.js` fetches
    `navbar.html`), the `NITROX_LINKS` object, the `:3` BSOD page, or `mission.html`’s role.
12. **Deferred accessibility items.** Focus states exist on the homepage, but no skip link, no
    documented contrast targets, no reduced-motion policy beyond the homepage reveal.
13. **Source retention.** `.dev/figma-einstein-yap.md` is now a primary source; note it in
    `05 MERGE-NOTES.md` source inventory as a 2026-10-22 Figma AI concept review.
14. **Homepage/site architecture.** Record that the company site now has a real homepage and how it
    relates to `/tesseract` and `/prism` (shared parent brand, product pages more expressive).

### 5. WORKLOG entry (dev-worklog skill)

Prepend a new entry to `.dev/WORKLOG.md` (newest first, **Overview** first). Cover: missing
`index.html`, the Craft doc, the Blueprint direction, what was built, what was intentionally deferred,
validation (screenshots, 200s), the docs edits made, and follow-ups (mobile, contrast, art direction,
Discord invite still a placeholder, commit/push not done).

## Decisions the user already made (do not re-litigate)

- Keep “today’s technology is broken. we’re gonna fix it.” as hero copy.
- Use the proposed palette (blue field + paper + ink + product accents).
- Statuses: Tesseract `in development · waitlist open`; Prism `early development`.
- Workbench shows tab manager, toolbox, einstein.
- `astrid` is the browser name (rename in docs, name only).
- Less “premium SaaS”, more indie/editorial/personality.
- Mobile, contrast, and full motion work deferred.
- Art direction pass will be done by the user later.
- Do not edit Craft. Do not rewrite nitrox docs beyond: the astrid rename, the Einstein doc, and the
  app-workbench section; everything else goes in the proposals file.

## Gotchas for whoever picks this up

- `styles.css` sets `h1,h2,h3 { color: #fff }` and `a { color: #fff }`. `home.css` overrides with
  `.home h1` / `.home a`, which out-specifies the bare selectors. If you add a new section, remember
  the heading/link colors are not inherited defaults here.
- The navbar is fetched at runtime by `script.js`; opening `index.html` via `file://` will render
  without nav. Always use the local server.
- `.home #nav-placeholder { background: var(--blue) }` + `.home .nitrox-nav { margin-bottom: 0 }` is
  what makes the white pill float on the blue field instead of a paper strip.
- Geist Mono is loaded in `home.css` from `assets/fonts/geist-mono/GeistMono%5Bwght%5D.woff2`
  (the brackets must stay percent-encoded in CSS `url()`).
- `assets/@ app logos/...` has spaces and an `@`; that is why the two SVGs were copied to
  `assets/icons/`.
- The desktop browser MCP is disconnected in this session. Use headless Chrome for screenshots:
  `/usr/bin/google-chrome-stable --headless=new ...`.
- `pkill -f "http.server 8000"` kills the calling shell (documented in the previous WORKLOG). Kill by
  PID instead.
- Screenshot sizes: `--window-size=1440,4200` for the full page; Chrome headless screenshots the
  viewport, so set the height generously.

## Suggested commit when done

```
add first-pass landing page (blueprint direction)

- index.html + home.css + home.js
- blue hero, paper work/plates, workbench index, reveal observer
- docs: astrid rename, einstein doc, app workbench section
- .dev plan + proposed doc edits
```
