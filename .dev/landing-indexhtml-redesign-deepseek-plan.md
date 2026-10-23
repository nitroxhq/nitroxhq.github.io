# Landing page redesign — DeepSeek plan (2026-10-22)

> Source context: Craft document “Nitrox Landing Page — Modern Indie Studio Direction (2026-10-22)”
> (root block `4ddb4e2e-5d6c-afdc-2683-9319f0cc1adc`), treated as a brainstorm, not a spec.
> Companion docs: `.dev/ASAP-TODO.md` (execution state), `.dev/deepseek-proposed-nitrox-docs-edits.md`
> (proposals for the canonical docs), `.dev/docs (edit later)/v0.1b/` (current canonical set).

## 1. Situation

`index.html` did not exist. It had been renamed to `og-index.html` (later renamed again to
`mission.html`) while a redesign was “landing in another thread”, and the navbar still pointed at
`./index.html`. The deployed root still served the old page, so the break was only visible locally.

That made this task two things at once: a first-pass design and a repair of the site’s primary route.

## 2. What the Craft brainstorm gets right

- **Company site ≠ product site.** Nitrox tells the company story; Tesseract and Prism sell themselves.
  Shared typography and spacing, but product pages are allowed to be more expressive.
- **Honest status.** No invented products, features, or accomplishments. That is both an ethics rule and
  a brand asset for an early studio.
- **Real product imagery over decorative 3D.** Correct, with one caveat below.
- **The workbench.** Room for experiments before they become products.
- **One visual identity.** No three-styles-in-a-trench-coat.

## 3. Where it is generic, and what this plan changes

| Brainstorm suggestion | Problem | Direction taken |
|---|---|---|
| Warm off-white + Instrument Serif + Inter | This is the 2026 indie-studio uniform. Tasteful, but interchangeable | Keep paper for editorial sections, but open on the **brand’s electric blue field** so the page is recognisable before it is read |
| “Better software. More imagination.” | Any studio could say it; it has no stance | Keep the existing line **“today’s technology is broken. we’re gonna fix it.”** and use the softer line as support |
| Abstract geometric motif | Vague, because the author did not know the marks | The marks already form a family: Nitrox hourglass/intersection, Tesseract cube, Prism triangle. Use rounded-polygon geometry, not chemistry iconography |
| Two project cards | The default SaaS card pattern | Two **asymmetric editorial plates**, each in its own product colour, with status and a single honest line |
| “Real screenshots” | There are no shipped UIs to screenshot; using mock UI would imply product claims | Use the real product marks and typography now; swap in real UI when it exists. No fake dashboards |
| Premium app-site craft | Can slide into generic premium-SaaS polish | Lowercase voice, underlines and italics instead of gradients, hairline rules instead of card chrome, mono labels instead of badge confetti |
| Status pills | Every studio has them | Keep them, but pair them with plain-language honesty (“no pages yet, no dates promised”) |

## 4. Direction: Blueprint

A print/blueprint metaphor for a studio that is visibly mid-build.

```
blue field (thesis)  ->  paper (work + beliefs)  ->  workbench tint  ->  blue field (invitation)
```

- **Blue field** — `#3232ff`, the brand’s existing equity. Hero and closing only.
- **Paper** — `#f6f4ef`, warm neutral for reading. Selected work and beliefs.
- **Workbench tint** — `#eeece3`, one step darker, so the experiments read as a different surface.
- **Ink** — `#0b0b10`. Near-black, never pure black.
- **Product accents only inside plates** — Tesseract `#a161ea`, Prism `#64fa53`. The company stays
  blue; products get their own colour where their identity lives.

Surfaces are deliberately limited to three. The brainstorm warns against “every section a different
theme”, and two blue bands framing a paper body is a controlled composition, not theme salad.

## 5. Page structure

| # | Section | Content | Why |
|---|---|---|---|
| 0 | Navbar | Existing pill navbar, reused unchanged | Continuity; no redesign scope creep |
| 1 | Hero | Eyebrow, the broken/fix line, one-sentence studio description, two CTAs, hourglass outline watermark | Stance first, explanation second, one route into the work |
| 2 | Selected work | Tesseract plate (larger, offset up) + Prism plate (offset down) + “more work soon → all projects” | Proves the studio is real without pretending there is a portfolio |
| 3 | What we believe | Oversized serif statement + the three principles already written in `projects.html`, numbered `01–03` | Makes it a company site, not a product directory |
| 4 | Workbench | Row-based index: Tab Manager, Toolbox, Einstein, with honest tags | Gives small work a home, prevents vaporware cards |
| 5 | Closing | “We’re building as you’re reading this.” + join us / GitHub | One honest invitation, real channels only |
| 6 | Footer | Existing footer voice | Consistency |

Notes on specific choices:

- **Copy stays lowercase.** The site already speaks this way; it reads like people, not a marketing
  department. Capitalising it for “premium” would erase the most distinctive part of the voice.
- **“More work soon” row** sits inside selected work and links to `projects.html`, so the full concept
  list has a destination without turning the homepage into a directory of unfinished ideas.
- **Workbench tags** are `coming soon`, `exploring`, `early concept` — deliberately not dates.
- **No careers, investors, testimonials, timelines, or newsletter capture.** None exist.

## 6. System

| Token | Value | Use |
|---|---|---|
| `--blue` | `#3232ff` | Hero, closing, brand mark |
| `--paper` | `#f6f4ef` | Body |
| `--paper-2` | `#eeece3` | Workbench band |
| `--ink` | `#0b0b10` | Text |
| `--ink-soft` | `#4b4b55` | Secondary copy |
| `--line` | `rgba(11,11,16,.14)` | Hairlines |
| `--tess` | `#a161ea` | Tesseract plate |
| `--prism` | `#64fa53` | Prism plate |

- **Type:** Instrument Serif for display, Inter for body, Instrument Sans for UI, Geist Mono for labels
  and statuses. All local — no CDN, consistent with the offline-first principle.
- **Geometry:** rounded polygons and soft radii (26px plates, pill buttons) derived from the marks.
  Hairline rules anchor sections; no glass, no glow, no gradient mesh.
- **Status type:** mono, uppercase, wide tracking, small — and sparingly.
- **Motion:** one `IntersectionObserver` fade-up with an 80ms stagger, unobserved after reveal, with a
  `prefers-reduced-motion` guard. No scroll hijacking, no parallax.
- **Reveal is progressive enhancement:** without JS every block is visible.

## 7. Files and verification

New:

- `index.html` — the page.
- `home.css` — page-scoped, loaded after `styles.css`, so other pages keep their current styling.
- `home.js` — the reveal.
- `assets/icons/tesseract.svg`, `assets/icons/prism.svg` — clean copies, because the source paths
  contain spaces and an `@`.

Untouched: `mission.html`, `projects.html`, `about.html`, `community.html`, `404.html`, `bsod*`,
`navbar.html`, `styles.css`, Craft, and the canonical docs beyond the three approved edits.

Verification so far:

- `python3 -m http.server 8000` in the repo root; `/index.html` → 200.
- Headless Chrome screenshots at 1440px and 430px.
- Live product URLs and the tab-manager page return 200; product taglines were taken from the deployed
  pages rather than invented.

Not done on purpose: a real mobile pass, a contrast audit, a full motion spec, and the art-direction
pass. The user is also editing the page directly, so visual QA is a shared loop.

## 8. Decisions and open questions

Decided with the user:

- Keep the “broken / fix” line as the hero.
- Use the Blueprint palette.
- Tesseract `in development · waitlist open`; Prism `early development`.
- Workbench shows Tab Manager, Toolbox, and Einstein.
- `astrid` is the browser name; docs renamed name-only.
- Reduce “premium SaaS” polish; favour the indie/editorial direction.
- Defer mobile, contrast, and full motion work.
- Propose docs edits in a separate file rather than rewriting the canonical docs.

Still open:

- Whether the homepage should show more of the concept list, or always route through `projects.html`.
- Whether the workbench items ever get pages, or stay as index entries.
- What `mission.html` is for now that `index.html` is back, and whether it stays reachable.
- The Discord invite remains a placeholder (`NITROX_LINKS` in `script.js`).
- Voice guidelines are not documented anywhere canonical; see the proposals file.
- Einstein is a concept with a Figma direction, not a validated grading engine; its public wording and
  HAC feasibility are unresolved.
