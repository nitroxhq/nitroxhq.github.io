# nitrox — DESIGN.md

> **Status:** Working design precedent, started 10.23.2026. Extracted from the implemented homepage
> (`index.html` + `home.css`) and the implemented site shell (`styles.css`, `navbar.html`, `theme.js`).
> It is a description of what exists plus the rules that follow from it — not a proposal for a new look.
> Product-app surfaces, icon delivery on the company site, and contrast are not fully settled; those are
> marked **unresolved** or **not audited** rather than described as done.

This document is the visual counterpart to the technical precedent in
[`00-docs-meta.md` §3](<docs (edit later)/v0.1b/00-docs-meta.md>). It supersedes the visual-system sections of
[`02-design-old.md`](<docs (edit later)/v0.1b/02-design-old.md>); that file remains the source for product and
architecture principles.

---

## 0. Status, authority, and how to read this

### What this doc is

- The **parent-brand visual precedent** for Nitrox.
- A record of decisions already visible in code, so the next page or app can inherit instead of guessing.
- A place to park ideas that are *not* precedent yet, without letting them leak into shipped pages.

### What it is not

- Not a claim that every page follows it. The homepage is the reference; `about`, `projects`, `community`,
  `404`, and the `:3` page still use the older `styles.css` shell. Migrating them has not started.
- Not a product UI spec. Tesseract, Prism, and the rest get their own app docs.
- Not a technical architecture doc. The app stack lives in `00-docs-meta.md` §3.
- Not a brand-guidelines PDF. It is allowed to be specific and a little opinionated.

### Status words

Use the same vocabulary as the rest of the docs set:

| Word | Means here |
|---|---|
| **Implemented** | It is in the repo and renders on the site today. |
| **Owner-approved** | The owner chose it as the direction, but it may not be applied everywhere yet. |
| **Proposed** | A direction worth trying; not a rule. |
| **Unresolved** | A real decision that has not been made. Do not treat either option as settled. |
| **Not audited** | Believed to work, not measured. Do not claim compliance. |
| **Parked** | Deliberately waiting in §12. Not a rule, not a promise. |

### The conflict rule

When this document and the code disagree, **the code is the current truth** and the document is stale.
The fix is a decision, not a silent edit:

1. Decide which one should change.
2. Change it.
3. Update this doc in the same pass, and say what changed.

A design doc that quietly drifts is worse than no design doc, because people trust it.

---

## 1. The precedent model

Nitrox is a studio with one parent identity and several products. The design system follows the same
shape as the technical stack: **defaults are inherited, deviations are explicit, and an override is local.**

The useful mental model is Java inheritance, not a brand police force:

```java
class NitroxSite {            // parent: tokens, type roles, motion, voice, a11y rules
  Color accent = BLUE;
  void renderPlate() { ... }
}

class Tesseract extends NitroxSite {
  Color accent = PURPLE;      // override one field
  // everything else is inherited; no re-declaration
}
```

An app is a subclass of the parent brand. It inherits everything it does not explicitly override. It does
**not** fork the design system, and it does not get to break the invariants just because it has its own
color.

### 1.1 The layers

| Layer | Lives in | Owns |
|---|---|---|
| **Parent brand** | This doc + `styles.css` / `home.css` tokens | Palette, type roles, geometry, motion, voice, a11y floor |
| **Product accent** | App doc + app surface | One accent, one product mark, product-specific surface tints |
| **Page-scoped design** | `home.css`, future page CSS | Layout that only makes sense on one page |
| **One-off theme** | `win.css` + `bsod-styles.css`, `404-styles.css` | Deliberate exceptions, registered in §6.9 |

### 1.2 What an app may override

| Area | Override freely? | Notes |
|---|---|---|
| Accent color | **Yes** | One accent per product. It lives inside the product's own surfaces, not in the parent chrome. |
| Product mark + icon | **Yes** | Use the real mark; do not redraw the Nitrox logo. |
| Surface tint | **Yes, with a reason** | A tint must remain readable in both themes. |
| Density and layout | **Yes** | A code editor and a notes app do not share a grid. |
| Display typeface | **With a reason** | Parent display is Instrument Serif; a product may choose otherwise if it is recorded. |
| Icon set | **With a reason** | Phosphor is the default direction; a different set must be an explicit deviation. |
| Motion character | **With a reason** | A product may be springier or quieter. Reduced-motion support is not optional. |

### 1.3 What an app may **not** override

- **Offline and no-CDN runtime.** Fonts, icons, and scripts ship locally. A parent page that needs the
  network to render is a bug, not a style choice.
- **Readable contrast and visible focus.** A focus ring is never removed without a replacement.
- **Reduced-motion support.**
- **Voice honesty.** No invented features, dates, integrations, or screenshots.
- **Lowercase product names on the public site.** Docs may capitalise; the site does not.
- **The three-surface rule at the parent level.** Parent pages do not become theme salad.

### 1.4 Recording a deviation

Every override goes in section 1 of that app's doc, using the table the meta doc already defines:

| Area | Nitrox default | This app | Why | Status |
|---|---|---|---|---|
| Accent | `#3232ff` blue | `#a161ea` purple | Product identity | Decided |
| Canvas | Paper / blue field | `#0f0f0f` obsidian | Focus-heavy workspace | Proposed |

An override becomes **precedent** only when the owner decides it should apply to other apps. At that point
it moves into this doc (and, for technical defaults, into `00-docs-meta.md` §3). Until then it is one app's
local decision, not the house style.

### 1.5 Stack defaults that shape design

The technical source of truth is `00-docs-meta.md` §3. The design-facing consequences:

| Area | Default | Status |
|---|---|---|
| Company site | Static HTML/CSS/JS, GitHub Pages, no build step | Implemented |
| Fonts | Self-hosted `.woff2` under `assets/fonts/`; no Google Fonts at runtime | Implemented |
| Icons | Phosphor, duotone weight, bundled offline | Direction; delivery unresolved |
| Runtime deps | The page renders without a framework or CDN; JS enhances | Implemented |
| App stack | Tauri 2 + React + TypeScript + Vite + Tailwind, with a browser/PWA target | Proposed, not a standard |
| Type safety | Strict TypeScript + runtime validation at data boundaries | Proposed |
| Data ownership | Readable, portable files; no opaque database as the only store | Proposed direction |

Design implication: **tokens must be portable.** Today they are CSS custom properties; if the app stack
lands, the same token names should be expressible in a Tailwind theme without re-deciding values. That
mapping does not exist yet and is a **proposal**, not a current fact.

---

## 2. Character and principles

### 2.1 The stance

Nitrox looks like a small studio that is visibly mid-build, not a company pretending to be finished.

- **Editorial before corporate.** Serif display type, hairline rules, and generous reading widths. Not a
  wall of identical SaaS cards.
- **One identity, not three costumes.** Blue field + paper + ink is the composition. Products get accents;
  they do not get a separate website language.
- **Honest surfaces.** No fake dashboards, no invented screenshots, no decorative 3D standing in for a
  product. Product marks and type carry the page until real UI exists.
- **Lowercase and human.** The copy sounds like people. Capitalisation for "premium" would erase the most
  distinctive part of the voice.
- **Quiet motion.** One reveal, small hover lifts, no scroll hijacking.

### 2.2 The Blueprint composition

The homepage runs a four-band structure:

```
blue field (thesis)  ->  paper (work + beliefs)  ->  workbench tint  ->  blue field (invitation)
```

| Band | Token | Role |
|---|---|---|
| Blue field | `--blue` `#3232ff` | Hero and closing only. The recognisable brand surface. |
| Paper | `--paper` `#f6f4ef` | Reading surface for work and beliefs. |
| Workbench tint | `--paper-2` `#eeece3` | One step darker; marks experiments as a different surface. |
| Ink | `--ink` `#0b0b10` | Text. Near-black, never pure black. |

Anything that adds a fifth surface to a parent page needs a reason and a place in this doc.

### 2.3 What Nitrox design is not

- Not "premium SaaS": no gradient hero text, no glass cards by default, no badge confetti.
- Not a template: no stock illustration, no generic 3D blob, no lorem-adjacent marketing adjectives.
- Not maximalism: if a section needs three accent colors to be interesting, the layout is the problem.
- Not a museum of trends. Trends go to §12 first.

---

## 3. Color

### 3.1 Parent tokens (paper / light)

Source: `home.css` `:root`.

| Token | Value | Role |
|---|---|---|
| `--ink` | `#0b0b10` | Primary text, icons on paper |
| `--ink-soft` | `#4b4b55` | Secondary copy, descriptions |
| `--ink-faint` | `rgba(11, 11, 16, 0.55)` | Labels, mono metadata |
| `--paper` | `#f6f4ef` | Default reading surface |
| `--paper-2` | `#eeece3` | Workbench band, secondary surface |
| `--blue` | `#3232ff` | Brand field, links, active states |
| `--line` | `rgba(11, 11, 16, 0.14)` | Hairline rules and borders |
| `--tess` | `#a161ea` | Tesseract accent (product only) |
| `--prism` | `#64fa53` | Prism accent (product only) |

The homepage reads these through a theme-aware alias set (`--home-bg`, `--home-ink`, `--home-line`,
`--home-accent`, …). Components should consume the aliases, not the raw palette, so a surface can change
its theme without touching every rule.

### 3.2 Parent tokens (dark)

Source: `home.css` `html[data-theme="dark"]` and the duplicate block under
`@media (prefers-color-scheme: dark)`.

| Token | Value |
|---|---|
| `--home-bg` | `#0d0d12` |
| `--home-bg-2` | `#15151b` |
| `--home-ink` | `#f4f2ec` |
| `--home-ink-soft` | `#b9b7c4` |
| `--home-faint` | `rgba(244, 242, 236, 0.55)` |
| `--home-line` | `rgba(244, 242, 236, 0.16)` |
| `--home-line-strong` | `rgba(244, 242, 236, 0.32)` |
| `--home-hover` | `rgba(255, 255, 255, 0.05)` |
| `--home-accent` | `#9b9bff` |

The hero and closing **stay blue in both themes.** They are brand surfaces, not theme surfaces.

### 3.3 Product accents

Accents live inside product surfaces. The parent chrome stays blue.

| Product | Accent | Light plate | Dark plate | Line (light / dark) |
|---|---|---|---|---|
| Tesseract | `#a161ea` | `#f0e9fb` | `#1d1529` | `0.20` / `0.35` alpha |
| Prism | `#64fa53` | `#eaf7e4` | `#10200e` | `0.45` / `0.30` alpha |

Rules:

- **One accent per product.** Do not gradient two product colors together for decoration.
- **Accent text is not body text.** `#64fa53` on paper fails as a reading color; it is a surface/trim
  color. Default to ink for copy.
- **Tint, do not flood.** A plate is an accent-tinted paper surface, not a saturated color block.

### 3.4 The theme model

`theme.js` runs in `<head>` before CSS paints:

1. Reads `localStorage["nitrox-theme"]`.
2. Accepts only `device`, `dark`, `light`.
3. Sets `document.documentElement.dataset.theme`.

CSS then resolves:

| `data-theme` | Result |
|---|---|
| `light` | Paper surfaces |
| `dark` | Near-black surfaces |
| `device` | Follows `prefers-color-scheme` |

Implementation details worth keeping:

- The stored value is a **preference**, not a resolved color. `device` stays `device`.
- `color-scheme` is set so native scrollbars and form controls follow the theme.
- The theme picker is currently **homepage-only** (`script.js` removes `.nav-theme` elsewhere), while the
  saved theme still applies on every page. That is a deliberate first step, not a finished global control.

### 3.5 Color rules

**Do**

- Use tokens. Hex values in a component are a smell unless the value is genuinely local.
- Keep the blue field free of extra gradients and glows.
- Let product accents appear in product plates and product pages only.
- Verify text contrast after any tint change.

**Don't**

- Add a fourth parent surface because a section felt flat.
- Use pure black `#000` for body text on paper.
- Put accent-colored body copy on a tinted plate.
- Reuse the Tesseract purple or Prism green as generic UI states. The blue is the parent action color.

---

## 4. Typography

### 4.1 Families

All fonts are self-hosted under `assets/fonts/`. Tesseract's draft listed EB Garamond as a display option;
Nitrox does not ship it. Do not reference it here.

| Role | Family | Files | Usage |
|---|---|---|---|
| Display serif | **Instrument Serif** | `instrument-serif/InstrumentSerif-Regular.woff2`, `-Italic.woff2` | Hero, section titles, plate names, pull quotes, footer |
| Body sans | **Inter** | `inter/InterVariable.woff2` (+ static weights, `inter.css`) | Paragraphs, descriptions, reading copy |
| UI sans | **Instrument Sans** | `instrument-sans/InstrumentSans-VariableFont_wdth,wght.woff2` | Buttons, nav, UI labels |
| Mono | **Geist Mono** | `geist-mono/GeistMono[wght].woff2` | Eyebrows, statuses, section labels, metadata |

Registration:

- `styles.css` registers Instrument Serif (regular + italic), a single Inter regular face, and Instrument
  Sans.
- `assets/fonts/inter/inter.css` registers the full Inter family and `InterVariable`.
- `home.css` registers Geist Mono as a variable face (`100 900`).

**Rule:** every face used on the site must be a local file. No `fonts.googleapis.com`, no icon webfont CDN.

### 4.2 Scale

Values are the implemented homepage values; the shell pages use a smaller fixed scale.

| Role | Size | Line height | Tracking | Family |
|---|---|---|---|---|
| Hero title | `clamp(2.9rem, 7.2vw, 6.1rem)` | `0.99` | `-0.015em` | Instrument Serif |
| Section title | `clamp(2.2rem, 4.4vw, 3.6rem)` | `1.02` | `-0.015em` | Instrument Serif |
| Closing title | `clamp(2.3rem, 5.2vw, 4.2rem)` | `1.02` | `-0.015em` | Instrument Serif |
| Plate name | `2.1rem` | `1` | `-0.01em` | Instrument Serif |
| Plate tagline | `1.2rem` italic | `1.35` | — | Instrument Serif |
| Ledger / inner-page hero | `1.85rem` | `1.35` | — | Instrument Serif |
| Lede | `clamp(1.02rem, 1.3vw, 1.16rem)` | `1.6` | — | Inter |
| Body | `0.94–1.02rem` | `1.6–1.7` | — | Inter |
| UI / buttons | `0.98–1.15rem` | — | — | Instrument Sans |
| Mono label | `0.62–0.7rem` | — | `0.08–0.12em` | Geist Mono |

Weights are restrained: display 400, UI 600, body 400. There is no 800-weight headline in the parent brand.

### 4.3 Typesetting rules

- **Sentence case, lowercase brand voice.** Headlines are lowercase because the voice is lowercase, not
  because a CSS transform lowercase-ten them. Copy is authored that way.
- **Emphasis with type, not color.** Underline (`.u`), italic (`em`, `.italic`), and weight. No gradient
  text, no highlight marker, no glow text.
- **Measure.** Hero lede `46ch`; section lede `56ch`; plate body `34ch`; inner-page copy `560px`. Long
  lines are the most common way a tasteful page starts to feel cheap.
- **Display tracking stays slightly negative** at large sizes; body tracking stays default.
- **One italic idea per view.** Italic is a voice, not a decoration. Do not italicise a whole paragraph
  unless it is a letter or a sign-off.

### 4.4 Mono usage

Mono is the "system voice": small, wide-tracked, lowercase, and sparse.

Used for: eyebrow (`community open now`), section labels, status chips (`in development · waitlist open`),
bench tags (`coming soon`), footer-ish metadata, `.plate-go` / `.more-work-go` actions.

Not used for: body copy, long descriptions, navigation labels (nav uses Instrument Sans), or anything the
reader has to parse for more than a line.

---

## 5. Geometry, spacing, layout

### 5.1 Shape language

The marks already form a family: the Nitrox hourglass/intersection, the Tesseract cube, the Prism
triangle. Geometry follows from them: **soft radii and rounded polygons, not sharp cards.**

| Element | Radius |
|---|---|
| Buttons, chips, nav pill | `100vmax` |
| Product plates | `26px` |
| Big community buttons | `28px` |
| Legacy product cards | `20px` |
| Mobile open nav panel | `22px` |

No `border-radius: 4px` tech-card look. No mixing a sharp card and a 28px pill in the same row.

### 5.2 Width and rhythm

| Context | Value |
|---|---|
| Homepage content width | `min(1120px, 100% - 48px)` |
| Inner-page column | `max-width: 900px`, padding `40px 24px` |
| Nav pill | `width: 50vw`, `min-width: max-content`, `max-width: calc(100vw - 32px)` |
| Section vertical padding | `clamp(4rem, 8vw, 7rem)` |
| Hero padding | `3.5rem 0 2.75rem` |
| Closing padding | `clamp(4.5rem, 9vw, 7.5rem)` |
| Plate padding | `clamp(1.5rem, 2.6vw, 2.25rem)` |

Spacing values in use: `0.25`, `0.4`, `0.6`, `0.65`, `0.75`, `0.9`, `1.1`, `1.25`, `1.4`, `1.5`, `1.6`,
`1.75`, `2`, `2.25`, `2.75`, `3`, `3.25`, `4`. That is effectively a 4px-based scale with editorial
exceptions. New work should prefer the nearest existing step over inventing `1.37rem`.

### 5.3 Editorial asymmetry

The homepage deliberately avoids a symmetric card grid:

- Work spread is `1.32fr 0.92fr`, not 1:1.
- Tesseract plate sits at the top; Prism plate is pushed down `3.25rem`.
- Plates have different heights in effect; the row is not force-equalised.
- "More work soon" is a full-width rule-bounded row, not a third card.

On narrow screens the asymmetry collapses: single column at `860px`, plate offset removed.

### 5.4 Breakpoints

| Breakpoint | What changes |
|---|---|
| `860px` | Work spread becomes one column; Prism offset removed |
| `760px` | Bench rows stack name → description → tag |
| `720px` | Nav pill collapses to brand + theme + toggle; menu becomes a panel |
| `prefers-reduced-motion` | Reveals and transitions disabled |

Breakpoints are content-driven. Do not add a new one to fix one awkward string; fix the type or the
measure first.

### 5.5 Hairlines and surface boundaries

Rules are `1px` using `--home-line` / `--line`. They are the main way sections separate; shadows are not.

- Section boundaries in the workbench use top **and** bottom hairlines.
- The "more work" row uses top and bottom hairlines and no background.
- Cards use `inset 0 0 0 1px` instead of `border` so the radius is not double-drawn.

---

## 6. Components

These are the pieces that already exist. Each spec lists the source so a future page copies behaviour
instead of re-deriving it.

### 6.1 Pill navbar

Source: `navbar.html`, `styles.css`.

- Floating white pill, centered, `width: 50vw`, `margin: 28px auto 3rem`.
- Desktop layout is a `1fr auto 1fr` grid: brand pinned left, page links centred in the pill, theme picker
  pinned right. Below `721px` it becomes a flex row that collapses to brand + toggle.
- Contents: brand logo + wordmark, links (home, projects, community, about, `:3`), theme picker.
- Link style: Instrument Sans, `1.05rem`, 600, pill hover `rgba(0,0,0,.06)`, active blue text.
- Shadow: `0 8px 20px rgba(0,0,0,.18)`; lighter on paper pages.
- The nav is injected by `script.js` via `fetch('./navbar.html')`. It requires HTTP; `file://` will fail.
- Active state is computed from the current filename, not authored per page.
- `#nav-placeholder` is a direct child of `<body>` on every page that has the nav — never inside `.page`.
  That is what puts the pill 28px from the top everywhere; `.page` therefore has no top padding.
- On the homepage the pill sits on the blue field; `#nav-placeholder` uses `display: flow-root` so the
  nav's top margin stays inside the blue box (margin collapsing would expose the body background).

**Do not** restyle the nav per page. It is shared chrome by design.

### 6.2 Theme picker

- Three icon buttons: device, dark, light.
- Icons are **inline Phosphor paths** so they render offline.
- `aria-pressed` reflects the active value; the group has `aria-label="Color theme"`.
- Homepage-only for now. If it becomes global, remove the removal branch in `script.js` instead of
  duplicating markup.

### 6.3 Buttons

Two parent variants, both pill-shaped:

| Variant | Spec | Use |
|---|---|---|
| Solid | White fill, ink text; hover `translateY(-2px)` + `0 10px 24px rgba(0,0,0,.22)` | Primary action on blue |
| Ghost | `1px` white border at `0.45` alpha, white text; hover white `0.12` fill + lift | Secondary action on blue |

On paper, use the blue CTA (`.join-us-button`) rather than inventing a third button. Button labels are
lowercase and verbs: "see the work", "join us", "all projects".

The legacy `styles.css` also defines a `.btn` for cards with different padding and radius. This is a real
name collision; see §13.3.

### 6.4 Hero field

- Blue `--blue`, white text, `overflow: hidden`.
- Hourglass outline watermark at `right: -6%`, vertically `46%`, width `min(46vw, 520px)`, opacity `0.18`,
  stroke `white` at `0.6`.
- Eyebrow: mono, `0.7rem`, `0.12em` tracking, `0.75` opacity, with a 6px dot before it.
- Title max `15ch`; lede max `46ch` at `0.9` white.
- The watermark is decorative: `aria-hidden="true"`, `pointer-events: none`.
- The hero carries no product cards. The stance comes first; work comes after.

### 6.5 Product plates

Source: `home.css` `.work-plate`.

```
radius        26px
min-height    380px
padding       clamp(1.5rem, 2.6vw, 2.25rem)
background    product tint
border        1px inset via box-shadow
hover         translateY(-5px), accent-tinted shadow
```

Contents, in order: 58px product mark, product name (serif), italic tagline, short body (`34ch`), footer
row with a mono status chip and a "visit" link. The footer is pinned with `margin-top: auto`; plates can
grow without the footer floating.

Hover glow (current, restrained):

- Tesseract: `0 16px 40px rgba(161, 97, 234, 0.18)`
- Prism: `0 16px 40px rgba(90, 190, 80, 0.18)`

This is the only place a colored glow is currently allowed. It is a hover state, not a resting style.

### 6.6 Status chips

- Mono, `0.62rem`, `0.09em` tracking, lowercase.
- Pill, `0.4rem 0.65rem` padding.
- Plate chips use `--plate-chip-bg` / `--plate-chip-line`; bench chips use `--home-line`.
- Text is always a plain-language state: `in development · waitlist open`, `early development`,
  `coming soon`, `exploring`. Never a date, never a percentage, never a fake progress bar.

### 6.7 Index rows (the workbench)

- Full-width rows separated by hairlines, no card chrome.
- Grid: `200px minmax(0, 1fr) auto` — name, description, tag.
- Padding `1.4rem 0.25rem`; hover paints `--home-hover` across the row.
- The whole row is a link when the item has a page; otherwise it is a `<div>` with no fake affordance.
- The section sits on `--paper-2` with top and bottom hairlines, which is what makes it read as a
  different surface without adding a new color.

### 6.8 Community big buttons

Source: `community.html`, `styles.css` `.big-button`.

- 46px real app icon (Discord Tahoe, GitHub Golden Gate), title + subtitle, trailing arrow.
- `28px` radius, panel fill, hairline border, `translateY(-2px)` on hover, arrow shifts `3px`.
- This is the pattern for "one destination per row" links outside the homepage.

### 6.9 One-off themes (registered exceptions)

Some pages are deliberately not the parent system. They must be listed here so they do not get mistaken
for precedent:

| Page | Theme | Why it is allowed |
|---|---|---|
| `bsod.html` (`:3`) | Authentic Windows BSOD blue via `win.css`, overridden by `bsod-styles.css` | A joke page. Fidelity to the reference is the point. |
| `404.html` | Minimal centered message via `404-styles.css` | A dead end should be quiet, not branded. |
| `mission.html` | Redirect to `about.html` | Historical route, kept alive. |

Everything else inherits the parent system.

### 6.10 Footer

- Parent pages: serif italic line, e.g. "nitrox is *fixing* technology. ■ © 2026 nitrox."
- The square `■` is part of the wordmark rhythm; keep it as a text glyph, not an image.
- No link farm, no newsletter form, no social icon row. The closing section already carries the actions.

### 6.11 Inner pages (current shell)

`about`, `projects`, and `community` use `.page` (900px) with `.hero` / `.yap` / `.ps-section` blocks.

- This is the **older** system, not the homepage precedent.
- It is coherent and readable, but it does not have the blue field, the plate system, or the mono labels.
- New inner pages should use the homepage tokens. Migrating the existing three is a follow-up, not a
  prerequisite for writing this doc.

---

## 7. Icons, marks, and imagery

### 7.1 Phosphor

Direction: **Phosphor Icons, duotone weight**, bundled locally.

- Duotone gives the system a little depth without turning icons into illustrations.
- Secondary layer opacity roughly `0.2–0.3`.
- Sizes: 16px inline, 20px nav/actions, 32px feature cards.
- Delivery is **unresolved**. The navbar currently inlines raw Phosphor SVG paths. A bundled SVG sprite or
  a self-hosted webfont are the realistic options; a CDN import is not.

Do not use an icon as the only label for a destructive or irreversible action.

### 7.2 Brand marks

| Mark | File | Use |
|---|---|---|
| Nitrox wordmark / glyph | `assets/white-logo-svg.svg`, `assets/blue-logo-svg.svg` | Favicon and nav. The hero watermark is an inline hourglass path in `index.html`, not this file. |
| Tesseract | `assets/icons/tesseract.svg` | Tesseract plate |
| Prism | `assets/icons/prism.svg` | Prism plate |

Rules:

- Product marks are used at their intended proportions; do not squash them into a square.
- On a product-tinted plate, use the real mark. Do not recolor it to the accent unless the mark was
  designed for it.
- The Nitrox mark is not a decorative sticker. It appears once per view at most, plus favicon.

### 7.3 Imagery

- **No fake UI.** A mock dashboard is a product claim. Use the mark, the name, and honest copy until real
  screenshots exist.
- **No stock photography** in the parent brand. If a real photo is used later, it needs an art direction
  note here first.
- **Real app icons are allowed** (community page) because they are real artifacts, not invented UI.
- Images must have intrinsic `width`/`height` or an aspect-ratio box to avoid layout shift. The community
  PNGs are 46px slots using 256px sources; that is the intended pattern.

---

## 8. Motion and interaction

### 8.1 The one reveal

Source: `home.js`, `home.css` `[data-reveal]`.

- `IntersectionObserver`, threshold `0.12`, `rootMargin: 0px 0px -6% 0px`.
- On intersect: add `.is-in`, then `unobserve`.
- CSS: opacity `0 → 1`, `translateY(14px) → 0`, `0.7s cubic-bezier(0.2, 0.7, 0.2, 1)`.
- Stagger: `transition-delay: calc(var(--i, 0) * 80ms)`; authors set `style="--i:1"` per block.
- Without `IntersectionObserver`, every block is revealed immediately.
- `prefers-reduced-motion: reduce` disables the transform, fade, and component transitions.

Rules:

- One reveal per block. Do not chain a second animation onto the same element.
- Do not animate content that must be readable immediately (nav, body copy above the fold, error pages).
- No scroll hijacking, parallax, pinned sections, or cursor followers in the parent brand.

### 8.2 Hover vocabulary

| Element | Motion |
|---|---|
| Button | `translateY(-2px)` + shadow |
| Plate | `translateY(-5px)` + accent shadow |
| Plate arrow | `translateX(4px)` |
| Big button | `translateY(-2px)`, arrow `translateX(3px)` |
| Nav link | `translateY(-1px)` + tint |

Duration `0.2–0.35s`, standard `ease`. No bounce, no spring, no scale above `1.02` on the parent site.

### 8.3 Focus

- `:focus-visible` outline `2px solid currentColor`, offset `3px` on the homepage.
- Nav and theme buttons use a blue outline with a smaller offset.
- Focus must remain visible on both blue and paper surfaces.
- Do not remove an outline without a same-or-better replacement.

### 8.4 Timing table

| Token-ish value | Use |
|---|---|
| `160–200ms` | Small state changes (theme button, link tint) |
| `250–300ms` | Hover lifts, arrow shifts |
| `700ms` | Reveal |
| `80ms` | Stagger step |

If a new animation needs a fifth duration, it probably needs a reason, not a token.

---

## 9. Texture, depth, and glow

### 9.1 Current parent position

The parent brand is **flat by default**:

- No page-wide grain.
- No glass panels.
- No gradient mesh.
- No resting glow.
- Depth comes from hairlines, one shadow on the nav, and hover lifts.

This is deliberate. Tesseract's draft leans into a dark, grainy, glowing canvas; that is a product
language, not the parent language.

### 9.2 What is allowed today

| Effect | Where | Value |
|---|---|---|
| Nav shadow | Pill navbar | `0 8px 20px rgba(0,0,0,.18)` |
| Plate hover glow | Product plates | Accent-tinted `0 16px 40px` |
| Blue-field watermark | Hero | White outline at `0.18` opacity |
| Watermark on paper | Section backgrounds (future) | Same idea, ink at low alpha; not implemented |

### 9.3 Borrowed from Tesseract (reference only)

Tesseract's homepage uses a **grainy background**: `assets/noise.png`, repeated at `200px`, fixed
attachment, over `#0f0f0f`; it also has an SVG `feTurbulence` grain filter and purple hover glows
(`box-shadow: 0 0 15px #A161EA`, `drop-shadow` on icons).

Nitrox already has `assets/noise.png` but **no CSS references it**. If grain is adopted, it goes through
§12 first, and the rules are:

- Opacity stays low (roughly `0.03–0.1`); it must disappear at a glance.
- It never sits above text as a tiled overlay without `pointer-events: none`.
- It must not cause banding on gradients, because there are no gradients to hide.
- It must be a local file and must not add a repaint on scroll (`background-attachment: fixed` is a
  performance question, not a free effect).
- It is a surface treatment, not a personality. The page still has to work in a screenshot with the grain
  removed.

### 9.4 Glow rules

- Glow is an **interaction** state, not a resting decoration.
- A glow uses the element's own accent, not a random color.
- Never glow text. Never glow a hairline. Never stack two glows on one element.
- On paper, a glow needs a darker shadow component or it reads as blur.

---

## 10. Voice and content design

The voice is part of the design system. A page that looks right and sounds like a different company is
off-brand.

### 10.1 Rules

- **Lowercase by default.** Product names are lowercase on the public site (`tesseract`, `prism`, `nitrox`).
- **Plain sentences.** No "seamless", "revolutionary", "empower", "unlock", "supercharge".
- **Say what is true, including what is unfinished.** "no pages yet, no dates promised" is on-brand.
- **Humour is allowed; hype is not.** Dry, self-aware, never smug.
- **No invented claims.** A page, repo, scaffold, or waitlist is not a shipped product.
- **Verbs for actions.** "see the work", "join us", "all projects" — not "explore our ecosystem".

### 10.2 Public state wording

| State | Allowed wording | Never |
|---|---|---|
| Concept | "exploring", "on the bench" | "coming soon" with a date |
| Public page | "early", "in development" | feature claims |
| Waitlist | "waitlist open" | "available", "launching" |
| Shipped | real feature claims | — |

### 10.3 Page copy pattern

The homepage follows: stance → explanation → proof of work → beliefs → bench → invitation.

- Headline carries the stance, not the company description.
- The lede explains the studio in one sentence.
- Sections are titled as statements ("software should get out of the way."), not labels
  ("Our Values").
- Section labels are optional and were deliberately commented out on the homepage; the mono label system
  exists for when a page needs numbering.

### 10.4 Microcopy

- Status chips: state, not deadline.
- Buttons: lowercase verb phrases.
- Footer: one line, italic serif, square glyph, year.
- Links: describe the destination ("visit tesseract →"), not "click here".

---

## 11. Accessibility, performance, and the quality bar

### 11.1 Non-negotiables

- Visible focus on every interactive element, in every theme.
- `prefers-reduced-motion` respected for reveals and component transitions.
- Keyboard order follows visual order; the mobile menu supports `Escape`, outside click, and returns focus
  to the toggle.
- `aria-pressed` on toggle-style controls; `aria-expanded` / `aria-controls` on the menu.
- Decorative art is `aria-hidden="true"` and `pointer-events: none`.
- Real text, not text baked into images.

### 11.2 Contrast

- Body copy targets WCAG AA (`4.5:1`), large display text `3:1`.
- `--ink-soft` on paper and `--home-ink-soft` on dark are the first things to check after a change.
- Accent greens and purples are surface/trim colors, not body colors.
- **Not audited.** No contrast pass has been recorded for the plate tints, the mono faint labels, or the
  dark-mode hover states. Treat "looks fine" as unverified.

### 11.3 Known gaps

- No skip link.
- The homepage reveal is the only motion policy; no reduced-motion test has been recorded on inner pages.
- The theme picker is homepage-only, so a user cannot change theme from `about` / `projects` / `community`
  even though the stored preference applies there.
- Focus order on the work plates has not been keyboard-tested.
- The 404 page has no navbar and no skip target.

These are tracked as follow-ups, not silently accepted.

### 11.4 Performance

- No CDN fonts or scripts at runtime.
- Fonts are variable where possible; do not add a weight that is not already shipped.
- `backdrop-filter` is expensive; the parent brand uses it only on the legacy product cards in
  `styles.css`, not on the homepage. Do not introduce glass panels casually.
- Images need explicit dimensions.
- JS is progressive: the navbar injection and reveal are enhancements; the page content is in the HTML.

### 11.5 Review checklist

Before calling a page done:

- [ ] Tokens used; no stray hex except a documented one-off.
- [ ] Works on blue, paper, and dark surfaces.
- [ ] Keyboard reachable; focus visible.
- [ ] Reduced motion respected.
- [ ] No horizontal scroll at 320px.
- [ ] Copy is lowercase, honest, and free of marketing adjectives.
- [ ] No fake screenshot, no invented date, no fake integration.
- [ ] Fonts and icons load offline.
- [ ] If it adds a new pattern, this doc (or §12) says so.

---

## 12. Aesthetics and material backlog

> **Status: parked.** Nothing in this section is precedent. It is the parking lot for surface languages
> that might become accents later. Do not ship from this section without promoting the item first.

The parent brand is currently flat, editorial, and restrained. That is the baseline. The backlog exists
because the owner wants the system to grow more of its own character over time — glassy, metallic, Y2K,
retro, Aqua, Frutiger Aero energy — without the site becoming a mood board.

### 12.1 How an idea leaves the backlog

1. **Parked** — listed here, no code.
2. **Experiment** — tried on one surface, in one branch, with before/after screenshots.
3. **Owner-approved** — the owner chooses it for a named surface.
4. **Precedent** — written into §3 / §6 / §9 as a rule, and the backlog entry is marked adopted.

A visual experiment never silently becomes the house style because it looked good in one screenshot.

### 12.2 Candidate materials

| Candidate | What it means | Where it could plausibly live | Main risk |
|---|---|---|---|
| **Liquid glass / Aqua** | Translucency, blur, specular rim, soft inner highlight | Nav pill hover, product-page panels, community buttons | Readability; blur cost; instantly dates the page if overused |
| **Chrome / liquid metal** | Polished gradients, specular edges, metallic type | Wordmark treatment, hero watermark, product marks | Reads Y2K-fast; gradients fight the flat editorial base |
| **Frutiger Aero** | Glossy tech optimism: sky, water, glass, soft green | Product pages (Prism especially), illustration, icon shading | Can look like a 2007 stock wallpaper; needs a modern restraint pass |
| **Y2K** | Chrome, bevels, translucent plastic, techno type | `:3` page, launch teasers, merch | Novelty; clashes with serif editorial voice |
| **Retro OS** | Win95/98 bevels, pixel type, title bars | `:3` page only, maybe a hidden route | Kitsch; not a parent-brand surface |
| **Grain / noise** | Fixed noise texture, paper or film grain | Paper sections, dark product canvas | Performance; dirty text if misapplied |
| **Glow** | Accent-colored bloom on hover/active | Plates (already), product CTAs | Becomes neon soup; hides weak layout |
| **Skeuomorphic paper** | Deckled edges, print marks, letterpress feel | Editorial pages, about/letter, print PDFs | Can read "wedding invitation" if literal |

### 12.3 Material rules (apply to any adopted candidate)

- **One material per surface.** Glass next to chrome next to grain is a collage, not a system.
- **Material is a layer, not a layout.** It cannot be the reason a hierarchy works.
- **Both themes or no theme.** If a material only works on dark, it is a product surface, not a parent
  surface.
- **Text stays flat.** No metallic or glass text in body copy; display type may get one treatment, once.
- **Every material needs a fallback.** Blur, gradients, and filters degrade; the page must still read.
- **No asset invention.** A chrome effect does not justify a fake product screenshot.

### 12.4 Open questions for this section

- [ ] Does the parent brand ever get a texture, or does texture stay a product-page behaviour?
- [ ] Is grain part of the paper metaphor (print) or the screen metaphor (film)?
- [ ] Does the nav pill become glass on scroll, or stay opaque?
- [ ] Is there a second brand surface beyond blue field / paper / workbench tint?
- [ ] Does the `:3` page become the official home for retro/Y2K experiments?
- [ ] Which candidate, if any, ships first — and on which named surface?

---

## 13. File map and maintenance

### 13.1 Where design lives

| File | Scope |
|---|---|
| `styles.css` | Shared shell: tokens, body/page, navbar, inner-page blocks, community buttons, legacy cards |
| `home.css` | Homepage only: hero, plates, beliefs, bench, closing, reveal |
| `404-styles.css` | 404 only |
| `win.css` + `bsod-styles.css` | `:3` page only |
| `navbar.html` | Shared nav markup |
| `theme.js` | Pre-paint theme resolution |
| `script.js` | Nav injection, links, menu, theme picker |

`home.css` loads **after** `styles.css` on the homepage, which is why `.home`-scoped overrides win. Keep
page CSS after shared CSS; do not raise specificity to fix order.

### 13.2 Changing a token

1. Change it in the token block, not at the call site.
2. Check every surface that consumes it: blue field, paper, workbench tint, dark.
3. Check contrast for text tokens.
4. Update this doc's table in the same commit.
5. If a product accent changes, update the product doc too.

### 13.3 Known structural debt

- **Duplicate dark token blocks.** The dark palette is declared twice: once under
  `html[data-theme="dark"]` and once under `@media (prefers-color-scheme: dark)` for
  `html[data-theme="device"]`. They must stay in sync by hand. A shared block or a build-time include
  would remove the hazard; no build step exists, so this is currently a discipline problem.
- **`.btn` is defined twice.** `styles.css` defines a small card button; `home.css` defines the large pill
  button. Same class, different intents. Rename on the next homepage pass.
- **`--mono` lives in `home.css`.** Inner pages that reuse `.eyebrow`-style classes would fall back to a
  generic monospace. Move the mono token to `styles.css` when the shell is migrated.
- **Two blue histories.** `#3232ff` is the implemented brand blue. The older `#0B73EE` appears in the
  Tesseract draft as "Nitrox blue" and is not used on this site. Treat `#3232ff` as the parent blue;
  `#0B73EE` is a historical/product reference.
- **Inner pages are pre-homepage.** `about`, `projects`, `community` still use the older shell. They are
  not evidence that the new system is complete.

### 13.4 When to update this doc

Update it in the same change when you:

- add or change a token,
- add a component pattern that another page could reuse,
- allow a new hover/glow/texture,
- promote something out of §12,
- change the voice rules,
- resolve an accessibility gap (move it out of §11.3).

Do not update it to describe a page that only exists in a branch. Precedent is what is merged and
rendered.

---

## Appendix A — Tesseract's old draft, mapped

`.dev/docs/old-draft-DESIGN.md` in the Tesseract repo was a product design system. This table records what
carried over, what changed, and what stayed with Tesseract.

| Old draft item | Nitrox parent | Tesseract / product |
|---|---|---|
| Canvas `#0f0f0f` obsidian | Not parent; parent paper is `#f6f4ef` | Stays a product canvas option |
| Window surface `#29292d`, blur 12px | Not parent; glass parked in §12 | Product panel language |
| Purple `#A161EA` primary | Product accent only | Tesseract's own accent |
| Violet `#C897FF` secondary | Not adopted | Optional product secondary |
| "Nitrox blue" `#0B73EE` | Superseded by `#3232ff` | Historical reference |
| White text, 70% subtitles | Parent uses ink on paper; blue field uses white at 90% | — |
| Noise texture `noise.png` 200px | Parked (§12); asset exists, unused | Grainy dark canvas |
| EB Garamond / Instrument Serif display | Instrument Serif | EB Garamond remains a product option |
| Inter body, Instrument Sans UI | Adopted | Adopted |
| Geist Mono code/labels | Adopted as the "system voice" | Adopted |
| Phosphor duotone icons | Direction, delivery unresolved | Adopted |
| Bento grid + 12px blur cards | Not parent; homepage uses editorial plates | Product layout pattern |
| Spatial canvas / Easel coordinates | Out of scope for design | Architecture, see `06-tesseract-docs.md` |
| macOS stoplights | Not parent | Product window chrome |

The short version: **the parent brand kept the typography, the mono voice, the offline icon direction,
and the honesty. It rejected the dark canvas, the glass cards, and the purple as parent defaults. Those
became product language.**

## Appendix B — Related docs

| Doc | Relationship |
|---|---|
| [`00-docs-meta.md`](<docs (edit later)/v0.1b/00-docs-meta.md>) | Technical precedent, doc format, deviation rules |
| [`02-design-old.md`](<docs (edit later)/v0.1b/02-design-old.md>) | Product/architecture principles; visual sections superseded by this file |
| [`01-readme.md`](<docs (edit later)/v0.1b/01-readme.md>) | Portfolio, positioning, web vs product |
| [`03-status.md`](<docs (edit later)/v0.1b/03-status.md>) | What actually exists |
| [`06-tesseract-docs.md`](<docs (edit later)/v0.1b/06-tesseract-docs.md>) | Reference app doc |
| [`.dev/docs/community-app-icons.md`](docs/community-app-icons.md) | Real app-icon sourcing |
| [`.dev/landing-indexhtml-redesign-deepseek-plan.md`](landing-indexhtml-redesign-deepseek-plan.md) | The pass that produced the homepage system |
| [`.dev/human-learning.md`](human-learning.md) | Why the browser behaves the way it does (tokens, cascade, flow-root) |
