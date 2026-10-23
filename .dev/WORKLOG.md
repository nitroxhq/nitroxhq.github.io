# nitrox — WORKLOG

Detailed worklog for this repo. Lives in `.dev/` when the repo has no worklog yet.

This file is the long-form record: what was asked, what was built, how it was checked, and what a human
actually learned along the way. It is owned by the `dev-worklog` skill; longer design notes live in
`.dev/docs/` under the `dev-project-docs` skill.

The glanceable timeline at `~/Documents/(01)-dev-git/@projects/projects-worklog.md` and the per-project
deep dives at `~/Documents/(01)-dev-git/@projects/<project>/README.md` are for maintenance and machine-level
work, and are owned by the `worklog` / `project-docs` skills. Development work in this repo is logged here,
not there.

Newest entries first. One entry per task or session. Every entry starts with an **Overview**.

---

## 10.23.2026 08:33–08:50am CDT — Inner pages: navbar aligned to the homepage precedent

### Overview

The homepage navbar has a three-zone layout (brand left, page links centred, theme picker right) and sits
28px from the top of the window. `about`, `projects`, and `community` rendered the same pill but 68px down
and with the links centred by accident rather than by construction. The nav now uses the homepage geometry
on every page that has it.

### What changed

- **`styles.css`** (`.nitrox-nav`, desktop `min-width: 721px`): the pill is a grid
  (`1fr auto 1fr`) instead of a flex row with auto margins. Brand `justify-self: start`, links
  `justify-self: center`, theme picker `justify-self: end`. Below 721px the existing flex/mobile rules
  still apply untouched.
- **`styles.css`** (`.page`): top padding `40px` → `0`, bottom stays `40px`. With the nav moved out of the
  container, its own `margin: 28px auto 3rem` now controls the top gap on inner pages.
- **`about.html`, `community.html`, `projects.html`**: `#nav-placeholder` moved out of `<main class="page">`
  to a direct body child, the same structure `index.html` already used.

### Decisions

- **Structure over offset hacks.** The 40px discrepancy was `.page`'s padding sitting above the nav. Moving
  the placeholder out of `.page` matches the homepage and removes the cause; a negative margin on the
  placeholder would have worked but hides the real nesting problem.
- **Grid, not auto margins.** `margin-right: auto` + `margin-left: auto` splits free space by *width*, so
  the links were only centred while brand and theme happened to be similar widths (they are 105px and
  92px, so it was off by a few px). A `1fr auto 1fr` grid centres the middle column by definition.
- **Theme picker stays homepage-only.** `script.js` deliberately removes it on non-home pages; left as is
  because this task was geometry, not scope. Noted as an open question.
- Mobile breakpoint rules were not rewritten; they already switch the pill to a brand + toggle row.

### Validation

- Headless Chrome screenshots at 1440px: `index.html` and `about.html` both put the pill's top edge at
  ~28–30px, brand at the left cap, links centred in the pill.
- Headless Chrome at 500px (mobile rules): pill collapses to brand + three-line toggle, panel closed.
  A 390px screenshot first looked clipped — that was Chrome's minimum headless window width cropping the
  capture, not layout overflow; re-shot at 500px clean.
- Not checked: real mobile device, keyboard focus order after the DOM move, light/paper theme on inner pages
  (they have no theme picker, so they stay on the blue field).

### Subtasks

- [x] Move `#nav-placeholder` out of `.page` on the three inner pages
- [x] Zero the `.page` top padding
- [x] Grid-based three-zone navbar on desktop
- [ ] Decide whether the theme picker should be global (currently removed by `script.js` on inner pages)
- [ ] Merge `dev` into `main` — held pending the owner's go-ahead

### Follow-up

- `.dev/DESIGN.md` §6.1 updated in the same pass so the doc and the code agree.

---

## 10.23.2026 08:31–08:45am CDT — `DESIGN.md`: the parent design precedent

### Overview

The owner asked for a design precedent extracted from the current Nitrox homepage, modelled on
Tesseract's old draft `DESIGN.md`, with room for the stack-precedent idea (apps inherit defaults and
override only what they need) and a parked section for future glass/metal/Y2K/Aqua/Aero accents.
`.dev/DESIGN.md` now records the implemented homepage system, the override model, and a material backlog
that is explicitly not precedent.

### What changed

- **`.dev/DESIGN.md`** (new): 13 sections + two appendices. Status/authority rule, inheritance-and-override
  model (Java subclass analogy), colour tokens and theme resolution, type scale, geometry and spacing,
  component specs (nav, theme picker, buttons, hero, plates, chips, index rows, community buttons,
  one-off themes, footer), icons and marks, motion, texture/glow, voice, accessibility and performance,
  the **Aesthetics and material backlog**, file map and debt, plus a Tesseract-draft mapping table.
- **`00-docs-meta.md`**: the "Visual system" precedent row now points at `.dev/DESIGN.md` instead of
  repeating the short description.
- **`02-design-old.md`**: added a "superseded in part" note — visual system moved to `.dev/DESIGN.md`;
  product/architecture principles stay.
- **`.dev/human-learning.md`**: added one map row linking the token tables to §6 (aliased custom
  properties), rather than adding a duplicate concept section.

### Decisions

- **Design precedent lives at `.dev/DESIGN.md`**, sibling to `WORKLOG.md` and `human-learning.md`. It is
  a living standard, not a per-task note, so it does not go in `.dev/docs/`.
- **The homepage is the reference, the inner pages are not.** `about` / `projects` / `community` still use
  the older `styles.css` shell and are recorded as pre-migration, not as evidence of the new system.
- **Parent overrides are explicit.** The doc names what an app may override freely (accent, mark, density),
  what needs a reason (display face, icon set, motion), and what it may not touch (offline, focus,
  reduced motion, honesty).
- **Texture and glow stay interaction-level.** The Tesseract grain + hover glow is recorded as product
  language; the parent stays flat, with only the plate hover glow and nav shadow allowed today.
- **The backlog section is named "Aesthetics and material backlog"** (owner's pick, over "material bench")
  because the workbench already means "in progress" on the site.
- **Status words match the existing docs vocabulary**; unresolved and unaudited items are labelled rather
  than smoothed over.

### Validation

- Read all current site CSS/JS/HTML (`home.css`, `styles.css`, `script.js`, `theme.js`, `navbar.html`,
  `index.html`, `about.html`, `community.html`, `projects.html`, `404.html`, `bsod.html`) and took token,
  size, timing, and breakpoint values from those files rather than from the plan docs.
- Confirmed `assets/noise.png` exists and nothing in the site CSS references it.
- Confirmed Phosphor paths are inlined in `navbar.html`; icon delivery is still unresolved.
- Confirmed `.dev/docs (edit later)/v0.1b/02-design.md` had already been renamed to `02-design-old.md`
  by the owner before this entry.
- Not checked: rendered screenshots after the doc-only pass (no visual changes were made); contrast
  values remain unaudited as stated in §11.

### Subtasks

- [x] Extract tokens, components, motion, and voice from the implemented homepage
- [x] Define the app inheritance/override model and the deviation table
- [x] Add the parked aesthetics/material backlog with promotion rules
- [x] Cross-link `00-docs-meta.md` and `02-design-old.md`
- [x] Add the human-learning map row
- [ ] Decide whether `about` / `projects` / `community` get migrated to the homepage tokens
- [ ] Resolve Phosphor delivery (sprite vs bundled webfont vs inline)
- [ ] Run the first contrast audit and move §11.3 gaps into the TODO set

### Follow-up

- Discuss making `dev-worklog`, `dev-project-docs`, and `dev-human-learning` the default behaviour for
  repo work (the owner raised this during the task; no config changed yet).
- Rename the duplicate `.btn` definitions, move `--mono` into `styles.css`, and de-duplicate the dark
  token block when the homepage CSS gets its next structural pass.

---

## 10.23.2026 08:29am CDT — Learning doc and the Dev Human Learning skill

### Overview

The owner asked to learn the real mechanics behind the work, starting with the margin-collapse
bar. This adds a repo-local teaching doc and the skill that keeps it current, plus the doc-map
section that the meta doc was missing.

### What changed

- **`.dev/human-learning.md`** (new): 21 sections. Box model; margin collapsing (the bar above the
  navbar, in four levels); BFC and `flow-root`; normal flow; cascade and specificity; custom
  properties; `data-*`/`dataset`; FOUC and the pre-paint script; `localStorage`; `color-scheme`
  and scrollbars; responsive units and the `100vw` trap; flexbox; `fetch` + `innerHTML`; media
  queries and `matchMedia`; the critical rendering path; GitHub Pages; images; accessibility;
  DevTools moves; glossary; artifact → concept map.
- **`~/.config/opencode/skills/dev-human-learning/SKILL.md`** (new): the skill that writes and
  maintains the file. Trigger phrases ("ELI5", "teach me", "how does this actually work"), the
  entry template, the quality bar, and the boundary against Worklog and Dev Project Docs.
- **`00-docs-meta.md`**: new §0 document map (product docs, dev notes, worklog, learning notes,
  meta), a note that repo-level notes are not numbered, and new §6 with the learning-doc format
  and rules.

### Decisions

- **The learning doc lives in `.dev/`, not `v0.1b/`.** It is repo-level teaching, not product
  documentation, and `.dev/` is a dot-directory that GitHub Pages ignores.
- **One concept per section, symptom first.** The doc opens from the bug the owner saw, not from a
  definition, so it stays anchored to this repo.
- **The skill writes the format, the worklog stays the timeline.** The learning file explains the
  mechanism; it never claims product status.
- **The meta doc is the doc for the docs.** It now carries the map and the learning format so the
  next doc does not have to be reverse-engineered.

### Human actually learned

- Why the strip above the nav changed with the theme: the nav's 28px top margin collapsed through
  `#nav-placeholder`, so the margin sat outside the blue box and the body background painted it.
- Why `display: flow-root` fixes it without clipping the shadow, and why `padding-top` or
  `overflow: hidden` are worse.
- The difference between the painted border box and the transparent margin box.

### Validation

- The skill is registered by OpenCode as `dev-human-learning` (appears in the available-skills list
  after writing the file).
- Markdown structure checked by reading the rendered headings; all internal references point at
  files that exist.
- The margin-collapse claims were verified earlier with `getBoundingClientRect()` and pixel samples:
  placeholder `top: 0`, height 82; blue `rgb(50,50,255)` at y=0 in both themes.
- Not tested: how the doc reads on GitHub's renderer or on mobile.

### Artifacts

- [`human-learning.md`](human-learning.md)
- [`00-docs-meta.md`](<docs (edit later)/v0.1b/00-docs-meta.md>)
- `~/.config/opencode/skills/dev-human-learning/SKILL.md` (outside the repo)

### Subtasks

- [x] Write `.dev/human-learning.md` with the concepts so far
- [x] Add the Dev Human Learning skill
- [x] Add the document map and learning-doc format to the meta doc
- [ ] Keep adding a section whenever a new mechanism shows up
- [ ] Decide whether the learning doc should be linked from the worklog header

---

## 10.22.2026 11:28pm CDT — Blue field reaches the top of the homepage

### Overview

The strip above the navbar was the body's theme background, not the blue hero. On the
homepage it showed up as a dark rail in dark mode and a paper rail in light mode — the
"bar that reflects the theme" the owner kept seeing.

### Cause

`.nitrox-nav` has `margin: 28px auto …`. `#nav-placeholder` had no padding or border, so
the nav's top margin collapsed through it; the placeholder's blue background started at
the nav's border box, and the 28px above it painted `body.home`'s background.

### What changed

- `.home #nav-placeholder` gets `display: flow-root`, which establishes a BFC and keeps
  the child margin inside the div. The blue now covers the gap and the nav, with the hero
  blue starting exactly at the pill's bottom edge.
- No spacing values changed: nav is still 28px from the top and the hero starts at 82px
  (390px mobile: nav ends at 309px, hero starts at 309px).

### Validation

- Pixel sample at x=50 on `index.html` is `rgb(50,50,255)` from y=0 in both dark and light.
- `placeholder` now spans y=0–82 with `rgb(50,50,255)`; previously y=0–28 was `#0d0d12`.
- Mobile 390px light: blue from the very top; open panel still sits on blue.

---

## 10.22.2026 11:13pm CDT — Theme picker scoped to the homepage

### Overview

The picker is a test surface for the new theme work, so keep it on `index.html` only
for now; the other pages should look finished, not experimental.

### What changed

- `script.js`: after the navbar is injected, `.nav-theme` is removed unless
  `body.home` is present. Nothing else is conditional.
- `theme.js` still runs on every page, so a theme chosen on the homepage carries
  across navigation; other pages just have no control to change it.
- Mobile is covered by the same removal: the non-home panel now ends at `:3`
  instead of reserving space for a picker that is not there.

### Validation

- `index.html`: `.nav-theme` present, 3 buttons, nav pill 690px.
- `about.html`, `community.html`, `projects.html`: `.nav-theme` absent, 0 buttons,
  nav pill 570px, no gap before the right edge.
- 390px `about.html` with the panel open ends at `:3`; no empty row.

---

## 10.22.2026 10:49pm CDT — Community app icons: ICNS to PNG from the misc-icons folder

### Overview

The community page still uses the hand-built liquid-glass Discord/GitHub SVGs from when no official
Apple-style icon was available. The real macOS icon packages now exist as `.icns` files in
`~/Pictures/@MISC ICONS/`, so they were converted to PNG and dropped into the site's assets for a later
swap. This session only produces the PNGs — `community.html`, the glass SVGs, and the source `.icns` folder
are all untouched.

### What changed

- **`assets/community/discord-tahoe-{256,512,1024}.png`** (new): extracted from
  `Discord__Tahoe__8Qjjft7Zk8-42dc0dd06c.icns` — Tahoe existed for Discord, so Tahoe was used.
- **`assets/community/github-golden-gate-{256,512,1024}.png`** (new): extracted from
  `Github__Dark__Golden_Gate__14NwU1PtJ7-…icns`. No Tahoe GitHub icon exists in the folder, so the
  Golden Gate fallback applied.
- **`.dev/docs/community-app-icons.md`** (new): the conversion rationale, file/size table, and follow-ups.

### Decisions

- **`icns2png`, not ImageMagick.** This ImageMagick build has no ICNS decoder (`magick identify -list
  format | grep -i icns` is empty), so `magick` cannot even open the container. `icns2png -x` extracts the
  embedded PNG representations without resampling.
- **Output into the repo, not a `png/` folder next to the sources**, because the originals were to stay
  untouched and the PNGs were wanted in the site.
- **All three embedded sizes kept** (256/512/1024) rather than one master, so the owner can pick per use —
  a 46px button slot does not need a 315 KB file.
- **kebab-case brand + generation + size names**, matching `discord-glass.svg` style instead of the
  `Name__Variant__hash_1024x1024x32.png` names `icns2png` emits.
- **No page wiring.** The user asked for files to come back to; swapping `community.html` over is a
  separate decision (and would need the smaller sizes or `srcset`).

### Human actually learned

- **ImageMagick cannot read `.icns` on this machine.** The Super User thread claiming "ImageMagick will
  work" is about cropping the resulting images, not about decoding ICNS — worth verifying with
  `magick identify -list format` before trusting a format claim.
- **`icns2png` (package `libicns`) is the Arch-native path**; it extracts every embedded size at once.
- **`.icns` is a container, not an image**, so one file legitimately yields several PNGs.

### Validation

- `magick identify` on all six outputs: correct geometry (256/512/1024), 8-bit sRGB, alpha channel present.
- Both 1024s opened and eyeballed: Discord is the silver-blue Tahoe squircle, GitHub the dark Golden Gate
  squircle with the cat mark.
- MD5 of both source `.icns` files identical before and after the conversion, confirming
  `~/Pictures/@MISC ICONS/` was read-only.
- Not checked: rendering at 46×46 inside the community buttons, or light/dark contrast there.

### Subtasks

- [x] Confirm `icns2png` and identify Tahoe vs Golden Gate sources
- [x] Extract Discord Tahoe and GitHub Golden Gate at all embedded sizes
- [x] Copy clean-named PNGs into `assets/community/`
- [x] Verify dimensions, colour type, and that originals are unchanged
- [x] Write `.dev/docs/community-app-icons.md`
- [ ] Decide whether the real icons replace `discord-glass.svg` / `github-glass.svg`
- [ ] If so, use 256/512 (or `srcset`) and check the 46px render in both themes

### Follow-up

- The pair is mixed-generation (Tahoe Discord, Golden Gate GitHub) because no Tahoe GitHub `.icns` was
  present; a matching set would need that source file.
- Names and folder placement are provisional — the owner plans a cleanup/OCD pass.
- `libicns` warnings for `ic07`/`ic11`–`ic14` are expected; those elements are skipped, not corrupted.

---

## 10.22.2026 11:11pm CDT — Theme-aware scrollbar and product tiles

### Overview

Two things still ignored the theme: the browser scrollbar stayed light in dark mode,
and the Tesseract/Prism plates kept their pastel paper colors on the dark page.

### What changed

- **Scrollbar.** `:root` now declares `color-scheme: dark` and
  `scrollbar-color: rgba(255,255,255,.3) transparent`; the light theme (and
  `device` under a light OS) switches to `color-scheme: light` with an ink thumb.
  The transparent track lets the page background show through instead of painting a
  grey rail.
- **Product plates.** New `--plate-*` tokens in `home.css`: two backgrounds, two
  inset lines, text, body text, and the status chip. Dark mode uses deep purple
  (`#1d1529`) and deep green (`#10200e`) with paper text; light keeps the existing
  lilac/mint. Plate headings, taglines, body, footer link, and status chip all read
  from the tokens, so nothing is left on fixed ink.
- **`theme-color`.** On `light` it is now paper for text pages, but stays blue on
  the homepage, whose top strip is always the blue field.

### Decisions

- **Keep the product hues, change their lightness.** The plates should still read as
  Tesseract purple and Prism green in dark mode; a flat dark grey card would lose
  the product identity.
- **Thumb contrasting, track transparent.** A fully themed track would paint a solid
  blue or paper rail; transparent keeps the page edge clean and matches whatever
  section is behind it.
- **No separate hover palette.** The existing purple/green glow works on both
  backgrounds; the inset border uses the same token as the resting state.

### Validation

- Dark: `color-scheme: dark`, thumb `rgba(255,255,255,0.3)`, Tesseract
  `rgb(29,21,41)`, Prism `rgb(16,32,14)`, plate name `rgb(244,242,236)`.
- Light: `color-scheme: light`, thumb `rgba(11,11,16,0.28)`, Tesseract
  `rgb(240,233,251)`, plate name `rgb(11,11,16)`.
- `device` flips both live when emulated `prefers-color-scheme` changes, including
  the plate palette.
- Scrollbar is visibly a light thumb on dark and a dark thumb on light; the old
  full-height grey rail is gone.
- Status chips readable on both: white 65% + ink on light, white 8% + light text on dark.

### Subtasks

- [x] Theme-aware scrollbar (`color-scheme` + `scrollbar-color`)
- [x] Plate background/text/chip tokens for light and dark
- [x] `device` parity for both
- [x] `theme-color` follows paper pages, stays blue on home
- [ ] Revisit plate hover glows if they read too strong on the dark surfaces

---

## 10.22.2026 11:06pm CDT — Community icons swapped to the new artwork

### Overview

Point the community links at the Tahoe Discord and Golden Gate GitHub icons another
thread produced, in place of the glass SVG tiles.

### What changed

- `community.html`: `discord-glass.svg` → `discord-tahoe-256.png`;
  `github-glass.svg` → `github-golden-gate-256.png`. Markup, size (46×46), and
  `alt=""` unchanged.
- 256px sources are used because the slot is 46 CSS px; the 512/1024 files stay
  available if a larger surface ever needs them.

### Validation

- Both images report `naturalWidth: 256` and render at 46×46.
- Checked in light (paper) and dark (blue) themes: the app-icon backgrounds read
  correctly on both; no white tile or halo.
- No other page referenced the glass SVGs (`grep` over HTML/CSS/JS).

### Follow-up

- The two `*-glass.svg` files are now unused but left in `assets/community/` rather
  than deleted, since they are tracked assets and not mine to remove.

---

## 10.22.2026 09:41pm CDT — Theme picker, mission merge, navbar polish

### Overview

Ship the notes that were queued behind the first-pass review: a device/dark/light
picker with offline icons, mission folded into about, light-grey selected nav state,
and the mobile-nav radius flash. Einstein also moves to “coming soon” on the bench.

### What changed

- **Theme system.** `theme.js` sets `data-theme` on `<html>` from
  `localStorage["nitrox-theme"]` before first paint. `styles.css` gains surface
  tokens (`--page-bg`, `--page-text`, `--panel-*`, `--cta-*`) with a light set and a
  `prefers-color-scheme` set for `device`; `home.css` gains `--home-*` equivalents.
  The blue hero, closing, and product plates stay fixed by design.
- **Picker.** Three inline Phosphor SVGs (desktop/moon/sun, MIT) in `navbar.html`,
  far right on desktop and before the hamburger on mobile. `script.js` wires
  clicks, `aria-pressed`, persistence, and `meta[theme-color]`.
- **Mission merge.** `about.html` now opens with the mission h1 and copy, then a rule,
  then the existing “what even is nitrox?” h1 and the letter, p.s., and join-us
  button. `mission.html` redirects to `about.html`; the navbar item is gone.
- **Nav polish.** Active links get the same light-grey pill as hover; the picker is
  flush to the pill’s right padding.
- **Einstein** bench tag: `early concept` → `coming soon`.
- **Radius flash.** Removed `transition: border-radius` from the mobile pill; the
  radius now switches in the same frame as the panel.

### Decisions

- **“dark” means the blue field, not a black page.** Blue is the brand’s dark
  surface; “light” is the warm paper system. This keeps the identity instead of
  inventing a second dark palette.
- **Inline Phosphor SVG over a sprite or webfont.** Three icons; inlining keeps
  `currentColor`, needs no extra request, and cannot misrender offline. ~1.5 KB.
  A sprite is the better answer if the count grows.
- **Keep both h1s.** The owner asked to preserve them; the second one sits after a
  rule as a chapter break rather than competing with the hero.
- **`mission.html` redirects** instead of being deleted, so old links still land.

### Human actually learned

- **A theme token is not a colour name.** `--ink` could not simply flip for dark mode:
  it is also the fixed text colour inside pastel plates and on white buttons. The
  page needed separate `--home-*` tokens, and plates kept the true ink.
- **`.home a` beat `.nav-buttons` on specificity** and turned the nav text cream in
  dark mode. Removing the blanket link override and letting `a { color: inherit }`
  do the work fixed nav, buttons, and links at once.
- **`width: calc(100vw - 24px)` + `min-width: max-content` + a `flex-basis: 100%`
  child** let the open menu push `innerWidth` from 390 to 399. Switching the mobile
  pill to `width: auto` with 12px margins removed the 9px overflow.
- **A radius transition is the white-circle FOUC.** The pill stayed round while the
  panel grew, so the pill itself looked like a white circle behind the rows.
- **A second h1 needs a visual reason.** The rule between mission and letter makes
  the duplicate heading read as a chapter break instead of a mistake.

### Validation

- 390px: closed 56px, open 281px, five rows, `scrollWidth === innerWidth` (390).
  Radius is `22px` in the same tick as the click.
- 430px and 721–1100px: no horizontal overflow; toggle hidden above 720px.
- 1440px: picker right edge 22px from the pill edge (its padding); nav 720px wide.
- Light: body `#f6f4ef`, ink `#0b0b10`, hero still `#3232ff`.
- Dark: body `#0d0d12`, section titles `#f4f2ec`, bench `#15151b`, plates still
  pastel with ink names.
- `device` follows emulated `prefers-color-scheme` live in both directions.
- Persistence: dark survives navigation to `about.html`; picker `aria-pressed` matches.
- `mission.html` lands on `/about.html` with both h1s and the join button.
- Bench tags read: tab manager `coming soon`, toolbox `exploring`, einstein `coming soon`.

### Subtasks

- [x] Remove the radius transition
- [x] Theme tokens for shared pages and the homepage
- [x] Offline Phosphor picker + persistence + `theme-color`
- [x] Merge mission into about; redirect `mission.html`; drop the nav item
- [x] Light-grey active nav state
- [x] Einstein → `coming soon`
- [ ] Decide whether beliefs move above the work section (analysis given, not applied)
- [ ] Theme `404` / `bsod` if they should follow the picker (they have no navbar today)
- [ ] Revisit community icon art on light surfaces when the owner supplies it

### Follow-up

- The section-order proposal was answered, not implemented: keeping work before
  beliefs is the recommendation; the alternative is beliefs-first with a shorter
  three-line beliefs block.
- `00-docs-meta.md` still lists icon delivery as unresolved; the site now uses
  inline Phosphor. Promote that to the precedent table if it should apply to apps.

---

## 10.22.2026 09:14pm CDT — Mobile navbar: three lines closed, list panel open

### Overview

The shared pill navbar had no small-screen mode: at 430px the six links forced the
document wider than the viewport, so every section overflowed right. Give it the
Craft-style pattern the owner supplied in `assets/@ insp/external insp/`: brand plus
three lines when closed, an expanding list panel when opened.

### What changed

- **`navbar.html`**: added a `button.nav-toggle` (three spans) with
  `aria-expanded`/`aria-controls`, and wrapped the links in `.nav-menu#nav-menu`.
  No link text, order, or destination changed.
- **`styles.css`**: `.nav-menu` is `display: contents` on desktop, so the pill's
  desktop layout is byte-for-byte the same flex row. At `<=720px` the pill wraps,
  the toggle appears, and the menu becomes a full-width column with hairline
  separators, 42px rows, and a 22px panel radius when open. Open/close animation is
  a 4px fade-up; reduced motion disables it.
- **`script.js`**: toggle wiring after the navbar is injected — click to open/close,
  close on link click, close on outside click, close on `Escape` (focus returns to
  the button), and auto-close when the viewport crosses back above 720px.

### Decisions

- **The panel grows in flow instead of overlaying the page.** It matches “shrink /
  expand” literally and cannot cover the hero or trap scroll. The inspiration's
  overlay would need a backdrop and focus trapping to be worth it.
- **Three lines become an X when open.** Craft keeps the lines, but the X is
  unambiguous and the state is also conveyed by `aria-expanded`.
- **720px stays the breakpoint.** It is the existing one; between 721px and the
  point where 50vw fits the links, `min-width: max-content` already lets the pill
  grow up to the viewport cap.

### Human actually learned

- **`display: contents` is the cheap way to add a wrapper without touching desktop
  flex behaviour.** The alternative was duplicating media-query rules for the inner row.
- **Headless Chrome can be driven over CDP with stock Node** (global `WebSocket`),
  which is how closed/open/escape states were actually clicked and measured instead
  of guessed from a static screenshot.
- **`scrollWidth` is the honest overflow test**, not eyeballing a screenshot; at
  390 and 430 it now equals `innerWidth` (`scrollWidth` 391 vs `innerWidth` 391 on
  `mission.html` under mobile emulation).
- **The old 430px failure was the navbar's min-content width**, exactly as recorded
  in the first-pass entry; hiding the links removes it without touching page layout.

### Validation

- 390px closed: toggle visible, menu `display: none`, 0 links laid out, pill 56px tall.
- 390px open: 6 rows, panel 323px tall, `aria-expanded="true"`, 42px row height, no
  horizontal overflow.
- 430px closed: `scrollWidth === innerWidth`, toggle visible.
- 1440px: toggle `display: none`, menu `display: contents`, 720px pill, 54px tall,
  all 6 links inline.
- `Escape` closes the menu; link click and outside click close it.
- Checked on `index.html` and `mission.html` (active link still highlighted).

### Subtasks

- [x] Add toggle button and menu wrapper to `navbar.html`
- [x] Desktop-safe CSS (`display: contents`) plus mobile list panel
- [x] Toggle/escape/outside-click/viewport-resize wiring
- [x] Verify 390/430/1440 and a non-home page
- [ ] Give the theme picker a slot before the toggle when that lands
- [ ] Re-check the queue's navbar grey hover/active item against the new panel

---

## 10.22.2026 09:10pm CDT — App doc format, hyphenated doc filenames, Einstein Q&A

### Overview

Unify how app docs are written, make the doc filenames terminal-friendly, and keep the useful parts of
the Figma Einstein review as next steps instead of losing them in a summary.

### What changed

- **`00-docs-meta.md`** (new): file conventions, the five-section app-doc format (0 todos, 1 development
  status + technical notes, 2 intent, 3 feature overview, 4 feature reference), the Nitrox technical
  precedent table, and a rule for recording app-specific deviations.
- **Renamed every doc to `NN-name.md`** (spaces and parentheses removed): `01-readme`, `02-design`,
  `03-status`, `04-internal-development`, `05-merge-notes`, `06-tesseract-docs`, `07-einstein-docs`.
  Tracked files moved with `git mv` so history follows.
- **`06-tesseract-docs.md` restructured** into the new format without dropping a capability: 81 rows
  preserved, including the CAP/NOTE/ORG/TASK/CAN/STUDY/MEDIA/PEOPLE/TAB/UI/DATA IDs. The old
  “proposed technical constraints” and “audit TODOs” became section 1 and section 0.
- **`07-einstein-docs.md` restructured** the same way. The Figma review’s Q&A is preserved in section 0
  as grouped next steps with the current recommendation for each unresolved question (impact baseline,
  metric scope, assignment weight, HAC reconciliation, destination count, accessibility, mobile,
  sample-data validation).
- **`01-readme.md`**: doc map reordered and completed (00–07), plus a note that the set was updated.
- **Proposals file** updated: the rename, docs-meta, format, and link fixes are marked applied; the
  remaining folder-name cleanup is still a proposal.

### Decisions

- **Technical precedent belongs in the meta doc, not in every app doc.** Apps reference it and record
  only deviations, so the shared stack can change in one place.
- **Tesseract stays the reference app doc** for structure and depth. New docs match its granularity
  without copying its scope.
- **“Feature reference”** is the section 4 name — clearer than “all features in depth” and still allows
  rationale and lore inside the detail tables.
- **Numbering stays stable.** New app docs append; renumbering is a link-sweep task.

### Human actually learned

- **Renaming a doc is a link sweep.** Every `STATUS.md` / `TESSERACT-DOCS.md` reference, including ones
  inside prose and code spans, had to move at the same time or the set silently rots.
- **Markdown anchors drop punctuation.** `4.10` becomes `#410-…`, not `#4-10-…`; the overview links in
  both app docs use the generated form.
- **`git mv` on tracked files keeps blame readable**; the two new docs were plain files and needed no
  rename step.
- **The Figma review was structured as decisions with tradeoffs,** not prose. Converting it to a doc
  loses the “why” unless the questions are carried forward explicitly, which is why section 0 keeps
  them.

### Validation

- `grep` over `v0.1b/` returns no stale `STATUS.md`, `DESIGN.md`, `MERGE-NOTES.md`,
  `TESSERACT-DOCS.md`, `EINSTEIN-DOCS.md`, or `TESSERACT-REQUIREMENTS.md` references.
- All relative links in the doc map resolve to files that exist; section links match the generated
  anchors.
- Capability count preserved at 81 for Tesseract; Einstein’s 35 capability rows carried over.
- Not validated: rendering in a Markdown viewer with the `(edit later)` folder path (spaces still
  require quoting in the terminal).

### Subtasks

- [x] Write `00-docs-meta.md`
- [x] Rename all docs to `NN-name.md`
- [x] Restructure Tesseract and Einstein into the 0–4 format
- [x] Preserve the Figma Q&A as Einstein next steps
- [x] Update the doc map and cross-references
- [x] Update the proposals file
- [ ] Rename `v0.1b` / retire “(edit later)”
- [ ] Apply the format to future app docs as they are created

### Follow-up

- Decide whether set-level docs (02/03/05) also need a standard section order.
- Revisit the Einstein Q&A when HAC feasibility is actually investigated; several questions are
  blocked on that, not on design.

---

## 10.22.2026 04:21–09:00pm CDT — First-pass landing page (Blueprint direction), docs pass

### Overview

Build the missing company homepage from the Craft brainstorm “Nitrox Landing — Modern Indie Studio
Direction (2026-10-22)”, then bring the canonical docs in line where the owner approved specific edits.
`index.html` had been renamed away earlier, so `/` was a directory listing while the navbar still
pointed at `./index.html`. The first pass now renders, the docs have Astrid + Einstein + an app
workbench, and the remaining doc changes are proposals rather than silent rewrites.

### What changed

- **`index.html`** (new): hero → selected work → beliefs → workbench → closing → footer.
  - Hero keeps the brand’s strongest line, “today’s technology is broken. we’re gonna fix it.”, on a
    full-bleed `#3232ff` field with an outlined hourglass mark cropped at the right.
  - Selected work is an asymmetric two-plate spread (Tesseract larger, Prism offset down) with honest
    statuses and real taglines from the deployed product pages.
  - A “more work soon” row links to `projects.html`.
  - Beliefs renders the three principles already written in `projects.html`.
  - Workbench lists Tab Manager, Toolbox, and Einstein with `coming soon` / `exploring` /
    `early concept` tags and a plain “no pages yet, no dates promised” note.
- **`home.css`** (new): page-scoped tokens and layout. Blue field, warm paper `#f6f4ef`, workbench tint
  `#eeece3`, ink `#0b0b10`, product accents only inside plates. Instrument Serif / Inter / Instrument
  Sans / Geist Mono (all local). Rounded-polygon geometry, hairline rules, one reveal.
- **`home.js`** (new): one `IntersectionObserver` fade-up with an 80 ms stagger, unobserved after reveal,
  with a `prefers-reduced-motion` guard in CSS.
- **`assets/icons/tesseract.svg`, `assets/icons/prism.svg`** (new): clean copies of the product marks,
  because the source paths contain spaces and an `@`.
- **Docs (approved edits only):**
  - `Photon` → `Astrid` in `01-readme.md`, `03-status.md`, `05-merge-notes.md`, `06-tesseract-docs.md`.
  - **`07-einstein-docs.md`** (new): the Figma AI concept review condensed into the existing docs style
    — concept status, capability tables with phase unassigned, open decisions.
  - **App workbench** section in `01-readme.md`, plus Einstein and Tesseract links in the docs map.
  - Fixed the two broken `TESSERACT-REQUIREMENTS.md` links in `01-readme.md` to point at
    `06-tesseract-docs.md`; the remaining stale references in `02/03/05` are left as a proposal.
- **`.dev/landing-indexhtml-redesign-deepseek-plan.md`** (new): the plan, critique of the brainstorm,
  Blueprint direction, system, and open questions.
- **`.dev/deepseek-proposed-nitrox-docs-edits.md`** (new): 14+ proposals (positioning line, public
  status vocabulary, naming drift, voice guidelines, broken doc links, filename hygiene, site notes,
  accessibility debt, Phosphor/offline strategy, Einstein gates).
- **`.dev/ASAP-TODO.md`** (new): mid-session handoff while the owner stepped away.
- **Owner co-edits during the session** (not part of this pass): hero eyebrow changed to “community
  open now”, hero meta row and section labels commented out, lede reworded, a `p.s.` section added to
  `about.html`. The page is being edited by hand in parallel, so later diffs should not assume this
  entry describes every visible line.

### Decisions

- **Keep the stance line**, not “Better software. More imagination.” The stance is ownable; the softer
  line is support copy. The brainstorm had this inverted.
- **Blue opens and closes the page.** Off-white alone is the 2026 indie-studio uniform; the brand
  already owns electric blue, so the field is the differentiator and paper is the reading surface.
- **No fake product UI.** The products have no shipped interfaces, so the plates use the real marks and
  typography. Screenshots go in when real UI exists.
- **Product colour only inside product plates.** Nitrox stays blue; Tesseract purple and Prism green
  live where the product identity lives.
- **Mono for labels and statuses**, not badge confetti.
- **Lowercase voice preserved.** Capitalising for “premium” would erase the site’s personality.
- **Docs edits stay minimal.** Only the three approved changes were applied; everything else is in the
  proposals file.

### Human actually learned

- **Renaming `index.html` is a route break, not a file move.** The navbar and every host assume it.
  This repo has now renamed it twice (`og-index.html`, then `mission.html`); the homepage only came
  back when a new `index.html` existed.
- **Headless screenshots catch mid-animation frames.** The reveal left half the page faded in the first
  capture. `--force-prefers-reduced-motion` gives a truthful static layout for QA.
- **`min(1120px, 100% - 48px)` is only as narrow as its containing block.** At 430 px the navbar’s
  min-content width stretched the document, so `100%` was wider than the viewport and every section
  ran off-screen. The symptom looked like “text won’t wrap”; the cause was horizontal overflow higher
  up the tree.
- **`styles.css` sets `h1,h2,h3 { color:#fff }` and `a { color:#fff }`.** On a paper page those have to
  be out-specified (`.home h1`, `.home a`) or headings vanish into the background. That is why
  `home.css` looks more specific than it needs to be.
- **A new CSS file beats editing shared CSS** when other pages must not move. `home.css` loads after
  `styles.css` and only touches `.home` scopes.

### Validation

- `python3 -m http.server 8000` in the repo root; `/index.html` → `200`.
- Desktop screenshot at 1440 px: hero, plates, beliefs, workbench, closing all render. `mission`,
  `tesseract`, `prism`, `projects`, `tab-manager`, and GitHub URLs return `200`.
- Narrow screenshot at 430 px: **fails** — the pill navbar’s six links do not fit; the navbar’s
  min-content width stretches the document and every section overflows horizontally. Not fixed here
  because mobile layout is explicitly deferred and the navbar is being changed for a theme picker.
- Not validated: contrast audit, keyboard-only pass, screen-reader labels, real-device layout, and the
  reveal on a slow connection.

### Subtasks

- [x] Read the Craft brainstorm and the v0.1b canonical docs
- [x] Build `index.html` + `home.css` + `home.js`
- [x] Copy product marks to `assets/icons/`
- [x] Desktop visual check
- [x] Rename Photon → Astrid in the docs
- [x] Add `07-einstein-docs.md`
- [x] Add the app workbench section and doc-map entries
- [x] Write the plan file and the proposed-edits file
- [ ] Fix narrow-width horizontal overflow (blocked on the mobile/navbar pass)
- [ ] Commit the new page and docs

### Follow-up

- Merge `mission` and `about` (owner plan), then decide what `mission.html` is for.
- Light/dark/device theme picker in the navbar, with an offline icon strategy — research Phosphor
  delivery before implementing.
- Navbar hover/active state: light grey background, per the owner’s notes.
- Art-direction pass, mobile pass, contrast pass, and real screenshots when products have UI.
- Replace the placeholder Discord invite in `NITROX_LINKS`.

---

## 10.22.2026 04:31pm CDT — Rename `og-index.html` to `mission.html`, link it in the navbar

### Overview

The old homepage archive needed a name that describes what it is, and a place in the navbar. It is now
`mission.html`, linked between `community` and `about`.

### What changed

- **`og-index.html` → `mission.html`** via `git mv`, so rename history is preserved.
- **`navbar.html`**: added `mission` between `community` and `about`. All links still use `.nav-buttons`,
  so active-state detection picks it up with no JS change.
- **No link sweep**: nothing else referenced `og-index.html`, confirmed by grep before the rename.

### Decisions

- Kept the navbar `home` → `./index.html` link untouched; the new homepage is still landing in another
  thread, and pointing `home` at `mission.html` would make the archive the default landing page.

### Validation

- `grep -rn og-index` over html/js/css/md returns only this worklog's history.
- Served `http://localhost:8000/mission.html` returns `200`.
- Not validated: `./index.html` still 404s locally, as expected until the redesign lands.

### Subtasks

- [x] Rename the file with `git mv`
- [x] Add the `mission` navbar link after `community`
- [ ] Point `home` at the real `index.html` once it exists

### Follow-up

- Mission page is reachable but not the default route. `http://localhost:8000/` still lists files.

---

## 10.22.2026 02:11–04:20pm — Community page, pill navbar, join us CTA

### Overview

Build a `community.html` page reachable from the navbar, restyle the navbar globally into a centered white
pill with a brandmark, centralize outbound links in one JS object, and add a "join us" button to the old
homepage (now `og-index.html`). Then merge `dev` into `main`. The site still runs on static HTML + shared
`styles.css`, with the navbar injected by `script.js` from `navbar.html`.

### What changed

- **`community.html`** (new): hero, short intro, two big buttons (Discord, GitHub), p.s. section, footer.
  Uses only `styles.css`, no page-specific stylesheet.
- **`assets/community/discord-glass.svg`**, **`assets/community/github-glass.svg`** (new): squircle
  "liquid glass" app icons. Superellipse (n=5) mask, white glass gradient, specular highlight, rim light,
  soft ambient shadow, brand glyph centered.
- **`assets/blue-logo-svg.svg`** (new): recolored copy of `white-logo-svg.svg` for the white navbar pill.
- **`styles.css`**: added a `/* colors */` block in `:root` (`--white`, `--text-black`,
  `--dark-mode: #151515`, kept `--bg-blue`, and `--text-white` now aliases `--white`); rebuilt
  `.nitrox-nav` as a centered white pill (`50vw`,
  `border-radius: 100vmax`, bottom shadow); added `.nav-buttons` / `.nav-buttons:hover` /
  `.nav-buttons.active` (black text, nitrox blue when active); added `.big-buttons`, `.big-button`,
  `-icon`, `-text`, `-title`, `-sub`, `-arrow`, and `.join-us` / `.join-us-button` (white fill, nitrox
  blue text, lift + shadow on hover); added
  `position: relative` to `.nav-bsod` so its tooltip anchors to the link.
- **`navbar.html`**: brandmark is now blue logo + "nitrox" wordmark in `var(--sans)`; content centered;
  the wordmark shares the logo's hover animation (`opacity` + 1px lift); added the `community` link;
  links use `.nav-buttons`.
- **`script.js`**: added the `NITROX_LINKS` object (discord, github, community, join) and `applyLinks()`,
  which fills `href` on any `[data-link]` element and adds `target="_blank"` / `rel="noopener noreferrer"`
  for external URLs; active-page detection now targets `.nav-buttons`.
- **`index.html` → `og-index.html`**: renamed with `git mv`. Added a `.join-us` section with the
  `join us` CTA above the footer. Navbar links to `./index.html` were left untouched on purpose —
  a redesign is landing in another thread.
- **`dev` branch**: committed and fast-forward merged into `main` (no conflicts, main was 0 commits ahead).

### Decisions

- **Pill radius**: used `border-radius: 100vmax` rather than literal `100%`. `100%` on a wide box
  produces an ellipse, not a pill. Visually it is the fully-rounded pill that was asked for.
- **Icons**: there is no official Apple "liquid glass" Discord/GitHub icon to download, so the bubble was
  built as an SVG (squircle + glass gradients) and the brand glyph paths came from the Simple Icons CDN.
  Swappable later without touching markup — same filenames.
- **Links**: real Discord invite is unknown, so `NITROX_LINKS.discord` is a placeholder
  (`https://discord.gg/nitrox`). GitHub is the real org (`https://github.com/nitroxhq`). Hrefs are also
  written into the HTML so the buttons still work without JS.
- **Active state**: active nav item is blue text only on the white pill (no filled background), per request.
- **CTA button in navbar**: explicitly cancelled by the user mid-task. Only the bottom-of-page
  "join us" button was built.

### Human actually learned

- **Auto-serve / directory listing**: `python -m http.server 8000` serves whatever folder it is started
  in. If that folder has no `index.html`, the server shows a **file listing** at `/`. That listing is not a
  server misconfiguration and not caused by `--bind` — it is just the missing index file. After
  `index.html` became `og-index.html`, `/` listed files until the new index exists. Fix: open the page
  path directly (`/og-index.html`) or serve a folder that contains an index.
- **`pkill -f "http.server 8000"` kills your own shell**: the pattern matches the command line of the
  shell running the `pkill`, so the session dies with it. Kill by PID instead (`pgrep -af "[h]ttp.server"`
  then `kill <pid>`).
- **`--bind 0.0.0.0` is redundant**: `http.server` already listens on all interfaces by default. Plain
  `python -m http.server 8000` is the preferred form.
- **Renaming `index.html` breaks every default route**: static hosts and local servers assume it. Renaming
  it requires either restoring it, adding a redirect, or accepting `/` as a listing/404 in the meantime.

### Validation

- `200` from `http://localhost:8000/community.html` and `http://localhost:8000/og-index.html`.
- Navbar injected correctly on all pages sharing `#nav-placeholder`; active state resolves against
  `window.location.pathname`.
- Not validated: mobile layout on a real device, screen-reader pass on the icon alt text, and whether
  the placeholder Discord invite resolves.
- `git merge --ff-only` reported a clean fast-forward; `main` matches `dev` after the merge.

### Subtasks

- [x] Add `community` to the navbar
- [x] Build `community.html` on shared `styles.css`
- [x] Squircle liquid-glass Discord/GitHub icons in `assets/community/`
- [x] Rebuild the navbar as a centered white pill with brandmark
- [x] Centralize links in `NITROX_LINKS`
- [x] Rename `index.html` → `og-index.html`, add the `join us` CTA
- [x] Merge `dev` into `main`
- [ ] Replace the placeholder Discord invite
- [ ] Point navbar `./index.html` links at the new homepage once the redesign lands
- [ ] Confirm whether `og-index.html` should stay reachable long-term

### Follow-up

- New homepage in another thread; do not update `./index.html` links until it exists.
- Consider whether `NITROX_LINKS` should also own the navbar `community` href.
