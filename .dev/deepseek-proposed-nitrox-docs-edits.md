# Proposed edits — Nitrox docs (from DeepSeek)

> Proposals only. Nothing in this file has been applied to the canonical docs unless listed under
> “Already applied”. The goal is to make the docs match what the site and the work now are, without
> quietly rewriting the owner’s direction.
>
> Context: the landing-page pass triggered these observations. Canonical set is
> `.dev/docs (edit later)/v0.1b/`. Craft was not edited.

## Already applied

1. **Photon → Astrid** (name only) in `01-readme.md`, `03-status.md`, `05-merge-notes.md`, `06-tesseract-docs.md`.
2. **New `07-einstein-docs.md`** — condensed from `.dev/figma-einstein-yap.md`, with the review’s main
   Q&A preserved as section 0 next steps.
3. **New “App workbench” section** in `01-readme.md`, with Tab Manager, Toolbox, and Einstein.
4. **Einstein + Tesseract docs added to the documentation map** in `01-readme.md`.
5. **File convention applied (was C2):** `NN-name.md` with hyphens for every doc in `v0.1b/`.
6. **New `00-docs-meta.md`:** file conventions, the 0–4 app-doc format, the Nitrox technical precedent,
   and the deviation-recording rule.
7. **App docs restructured to the new format:** `06-tesseract-docs.md` and `07-einstein-docs.md` now
   use 0) todos, 1) status/technical, 2) intent, 3) feature overview, 4) feature reference.
8. **Broken `TESSERACT-REQUIREMENTS.md` references** in `01-readme.md` now point at
   `06-tesseract-docs.md`.

Everything below is still open.

---

## A. Positioning and public language

### A1. The canonical docs have no public sentence

`01-readme.md` describes mission themes and principles, but there is no line the website can actually use.
The landing page now uses **“today’s technology is broken. we’re gonna fix it.”** as the stance and a
softer studio description underneath.

**Proposal:** add a short “Public positioning” subsection with:

- **Stance:** “today’s technology is broken. we’re gonna fix it.”
- **What Nitrox is:** an independent software studio making tools that give your time and data back.
- **What it is not:** not a claim that products are finished, not a feature list, not a values laundry
  list.

Keep “better software. more imagination.” as support, not the headline. It is pleasant but has no
stance, and the stance line is the more ownable asset.

### A2. “No functioning product” vs public surfaces

`03-status.md` says no functioning product exists. That is still true, but the public web now has: a
Tesseract waitlist, a Prism page with a tagline, and a Tab Manager page marked “coming soon”. A reader
can reasonably read “no product” and “join the waitlist” as a contradiction.

**Proposal:** define four public states explicitly:

| State | Means | Allowed public wording |
|---|---|---|
| Concept | Internal direction only | No public page |
| Public page | A page exists; behaviour is not claimed | “early”, “in development”, “concept” |
| Waitlist | Interest capture exists; no delivery promise | “waitlist open”, never “available” |
| Shipped | Observable, working, verifiable | Feature claims allowed |

Add a line to `03-status.md`: “A public page or waitlist is not evidence of shipped behaviour.”

### A3. Voice guidelines are undocumented

The site’s voice (lowercase, short sentences, dry humour, self-aware “we’re building as you’re reading
this”) is one of its few genuinely non-generic assets, but no doc records it.

**Proposal:** add a short “Voice” section to `02-design.md`:

- Lowercase by default; capitals only for product names in docs.
- Plain sentences. No marketing adjectives (“seamless”, “revolutionary”, “empower”).
- Say what is true, including what is unfinished.
- Humour is allowed; hype is not.
- Never imply a shipped feature, integration, or date that does not exist.

---

## B. Product names and portfolio

### B1. Remaining naming conflicts

`projects.html` publicly lists names that the canonical docs do not track:

- `nexOS` and `cosmetica` (systems/utilities)
- `airmail` and `bubble` (communication)
- `photon`/`astrid` (renamed in docs, but `projects.html` still says `astrid`, so they now agree)
- `Astrox` (historical, possibly related to Astrid; unresolved)
- `Niko` / `NikoBot` (relationship unresolved)
- `AirWave` / `Airwaves` (relationship unresolved)
- `Wrotebook` (older Tesseract-adjacent name)

**Proposal:** for each, record one of: **current name**, **historical alias**, **retired concept**,
**unresolved**. Then make `projects.html` and the docs agree. Do not infer mappings from similarity.

### B2. Portfolio size drift

The docs list 8 core-suite concepts. `projects.html` presents roughly 15 across core, creative, and
systems sections. Both can be honest, but only if the relationship is defined.

**Proposal:** keep one canonical portfolio in the docs, and define a separate **public index** subset
with the rule: “public names must appear in the canonical portfolio or the app workbench”. That
prevents the site from drifting ahead of the documentation again.

### B3. Workbench category rules

The workbench section added today has no rules yet.

**Proposal:** add three rules to `01-readme.md`:

- A workbench item is smaller than a core-suite app, or a companion to one.
- It can be listed without a page; “no page” must be stated.
- Promotion to the main portfolio is an explicit owner decision, not a side effect of building a page.

---

## C. Site and repository documentation

### C1. Broken internal links in the docs map

`01-readme.md` links `TESSERACT-REQUIREMENTS.md`, which does not exist; the file is `06-tesseract-docs.md`.
It also links `STATUS.md`, `DESIGN.md`, and `MERGE-NOTES.md` by bare name while the files are numbered
(`03 STATUS.md`, `02 DESIGN.md`, `05 MERGE-NOTES.md`). The new Einstein and Tesseract entries were added
with working links, which makes the inconsistency more visible.

**Proposal:** update the whole map to the numbered filenames, or drop the numbering. One convention.

### C2. Filename and folder hygiene — partly applied

Filenames now follow `NN-name.md` (hyphens, lowercase). Still open: the folder is
`docs (edit later)/v0.1b/`, and the “(edit later)” marker should be retired once the set is actually
canonical. Consider a `v0.2/` cut when the rename is settled.

### C3. The website itself is undocumented

Nothing records:

- the navbar injection (`script.js` fetches `navbar.html` at runtime),
- the centralized `NITROX_LINKS` object,
- the `:3` BSOD page and its win.css/bsod-styles.css split,
- the role of `mission.html` (the old homepage) after `index.html` returned,
- the local font strategy and the no-CDN rule that the site already follows.

**Proposal:** add a `SITE-NOTES.md` (or a section in `README`) covering these, including the “always
serve over HTTP, never `file://`” constraint.

### C4. `mission.html` needs a decision

It is the previous homepage, renamed and now linked from the navbar. Keep it as a deliberate archive
with a clear banner, redirect it to `/`, or delete it. Right now it is a public page that overlaps with
the current positioning and can be read as a second, older homepage.

### C5. Social/OG and 404 behaviour

The homepage has title/description/OG basic tags, but there is no OG image. The 404 page links to `/`,
which is now valid again. **Proposal:** decide whether Nitrox wants a simple OG card (wordmark on blue)
and document the 404/redirect expectations.

---

## D. Design and accessibility debt

### D1. Record the visual direction as partly decided

`02-design.md` still says the parent palette is unresolved. The landing page now uses a concrete system
(blue field, paper, ink, product accents, rounded-polygon geometry, mono labels).

**Proposal:** record it, but label the status precisely:

- **Owner-approved:** blue field / paper / product accents as the homepage direction.
- **Proposal:** exact hex values, type pairing, mono-label usage, motion.
- **Still open:** product-page tokens, dark mode, and whether this becomes the parent brand system.

Also resolve or re-scope the “Parent/app palette” trade-off row rather than leaving it as if nothing
was decided.

### D2. Accessibility TODOs are missing from `03-status.md`

The homepage has focus-visible styles and a reduced-motion guard, but there is still no documented
policy for:

- contrast targets (green `#64fa53` cannot be body text on paper),
- skip links,
- keyboard order on nav and plates,
- nonvisual descriptions of any future charts,
- motion beyond the reveal.

**Proposal:** add these to the design TODOs with explicit pass/fail criteria instead of “consider”.

### D3. Icon delivery is unresolved

The Einstein concept references Phosphor icons. Phosphor’s common delivery is a CDN/webfont, which
conflicts with the site’s offline/no-CDN direction.

**Proposal:** decide the offline strategy (bundled SVG sprite vs self-hosted webfont vs inline paths)
before using Phosphor anywhere public. This also affects the navbar theme picker idea.

---

## E. Einstein-specific docs gaps

### E1. Einstein needs a status entry

`03-status.md` does not mention Einstein. Add a row: concept, Figma direction only, no grading engine, no
HAC integration verified.

### E2. HAC needs a privacy/feasibility gate

Before any public copy implies school integration: consent, credential handling, retention, deletion,
disconnect, and whether HAC access is even permissible. This is a product-ethics question, not just an
engineering one.

### E3. Einstein's home is unresolved

Standalone app, Tesseract surface, or something else? Record it as unresolved rather than implying a
relationship.

---

## F. Source and process

### F1. Record the new source file

`.dev/figma-einstein-yap.md` is now a primary source. Add it to the source inventory in
`05-merge-notes.md` with its date (2026-10-22), its nature (Figma AI concept review), and the fact that it
is a design direction, not a validated engine.

### F2. Keep the “quick AI pass” rule visible

`05-merge-notes.md` already says a later AI-generated pass is not automatically authoritative. The
Einstein doc and this landing pass are both AI-assisted; keeping that rule prominent protects the docs
from becoming a summary of summaries.

**Proposal:** add one sentence to the source rule: “AI-assisted work is recorded as a source with a
date and an author, and enters the canonical set only through an explicit owner decision.”
