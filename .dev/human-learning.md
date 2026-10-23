# human learning — how the web actually works, from this repo

> **Status:** living notes, started 10.23.2026. Written for the owner, not for users.
> Every mechanism here is illustrated with something that actually happened in this repo.
> If a note disagrees with the code, the code is right — fix the note.

This file exists because "it works now" is not the same as "I know why it works". Each
section takes one thing we hit, explains it like you are five, then explains what the
browser is really doing, then shows the fix and how to prove it in DevTools.

Read the first four sections in order — they are the foundation. After that, jump by
heading whenever you need it.

---

## 1. The box model (everything is a rectangle)

**ELI5.** Every element is a box. The box has a center (content), some inner padding,
an optional border, and an outer margin. Margin is not part of the box; it is the empty
space the box asks other boxes to leave around it.

```
┌───────────────────────────────┐  ← margin (outside, transparent)
│  ┌─────────────────────────┐  │  ← border
│  │      padding            │  │
│  │   ┌─────────────────┐   │  │
│  │   │     content     │   │  │
│  │   └─────────────────┘   │  │
│  └─────────────────────────┘  │
└───────────────────────────────┘
```

**What actually happens.** `width` and `height` address the content box by default
(`box-sizing: content-box`). Padding and border are added on top, which is why the nav
uses `box-sizing: border-box` — then a declared width includes padding and border, so
the pill stays the size you asked for.

Backgrounds paint the **border box** (content + padding + border). They never paint the
margin. Margins are always transparent. That single sentence explains the bug in
section 3.

**Where you saw it.** `.nitrox-nav` is a pill: `padding: 10px 22px`, `border-radius:
100vmax`, `margin: 28px auto`. The visible white pill is the border box; the 28px above
it is margin.

**Terms to look up.** content box, padding box, border box, margin box, `box-sizing`.

---

## 2. Margin collapsing — the bar above the navbar

This is the one worth slowing down for. It is the highest-value CSS concept in this
repo so far.

### The symptom

On the homepage there was a strip above the floating nav. In dark mode it was `#0d0d12`
(the page background); in light mode it was `#f6f4ef` (paper). It changed with the theme,
which made it look like a theme bug. It was not.

### Level 1 — ELI5

Imagine each block element has a personal-space bubble above and below it. When two
blocks stand in a line, they do not add their bubbles together. The bubbles **merge**
into one bubble the size of the bigger one.

Now add a parent: a wrapper div with a child nav. The wrapper is a box you can paint
blue. The nav's top bubble touches the wrapper's top bubble, so the two merge. The
merged bubble ends up **outside** the wrapper. The wrapper's blue paint starts below the
bubble — so the page background shows through above it.

That is margin collapsing. The nav asked for 28px of space; the wrapper did not claim
that space as its own; the body's background painted it.

### Level 2 — the mechanics

Two vertical margins are **adjoining** when there is nothing between them: no border, no
padding, no inline content, no clearance, no new formatting context. Adjoining margins
collapse into a single margin whose size is the **largest** of them (not the sum).

The four cases you will actually meet:

| Case | What collapses | Example |
|---|---|---|
| Siblings | bottom of one + top of the next | `<p>` under `<h2>` |
| Parent + first child | child's top margin with parent's top margin | `#nav-placeholder` + `.nitrox-nav` |
| Parent + last child | child's bottom margin with parent's bottom margin | a card whose last paragraph has `margin-bottom` |
| Empty block | its own top and bottom margins | `<div style="margin: 20px 0"></div>` |

The consequences:

- A parent with no border or padding does **not** grow to contain its first child's top
  margin. The margin escapes.
- The parent's background cannot paint the escaped margin, because backgrounds only
  paint the border box.
- The escaped margin pushes the **parent** down instead, and the space shows whatever is
  behind the parent — the body/canvas background.

That is exactly what `#nav-placeholder` did. Its only child, `.nitrox-nav`, had
`margin-top: 28px`. The placeholder had no padding and no border, so the margin
collapsed through it. The placeholder's `background-color: var(--blue)` started at the
nav's border box, 28px below the top of the page.

Before:

```
viewport top ─────────────────────────────
             body background (#0d0d12)     ← 28px of escaped margin
nav top ─────┬───────────────────────────
             │ #nav-placeholder (blue)    ← background starts here
             │  ┌──────────────────────┐
             │  │  nav pill            │
             │  └──────────────────────┘
hero ────────┴───────────────────────────
```

After `display: flow-root`:

```
viewport top ─────────────────────────────
             │ #nav-placeholder (blue)    ← background starts at y=0
             │   28px margin (inside)
             │  ┌──────────────────────┐
             │  │  nav pill            │
             │  └──────────────────────┘
hero ────────┴───────────────────────────
```

### Level 3 — what the spec is doing

CSS 2.1 §8.3.1 defines adjoining margins and the collapse rules. The important part for
debugging: collapsing only happens in **normal flow**, between **block-level boxes**,
in the **block direction** (vertical in horizontal writing modes). It does not happen:

- horizontally,
- between flex or grid items,
- for floats or absolutely positioned boxes,
- across a **block formatting context** boundary.

The last rule is the escape hatch. If the parent establishes a new block formatting
context, its child's margins no longer collapse through it.

### Level 4 — the fix

`.home #nav-placeholder { display: flow-root; }`

`display: flow-root` makes the element a block container that establishes a new block
formatting context, **without changing how it looks otherwise**. The nav's 28px margin
is now inside the placeholder, so the placeholder's height includes it and its blue
background paints it.

The other fixes people reach for, and why they are worse here:

| Fix | Works? | Cost |
|---|---|---|
| `padding-top: 28px` on the parent | Yes | Unless the nav's own margin is removed, the gap doubles to 56px; also hard-codes the value |
| `border-top: 1px solid transparent` | Yes | Adds a pixel; still a magic value |
| `overflow: hidden` on the parent | Yes | Clips the nav's shadow and any dropdown |
| `display: flow-root` | Yes | Modern, no clipping, no extra box |
| Make the parent a flex/grid container | Yes | Changes the child layout model; overkill |
| `position: absolute` the child | Yes | Removes it from flow; breaks document height |

`flow-root` is the "I want a normal block, but contained" value. Browser support is
fine (Chrome 58+, Firefox 53+, Safari 13+).

### How to prove it in DevTools

1. Inspect `#nav-placeholder`, open the **Layout** pane, enable **Box model** overlays.
   Margins are orange. A collapsed margin appears outside the parent's blue box.
2. Select the nav, then the placeholder, and watch the overlay jump.
3. In the **Computed** pane, look at `margin-top` on the nav and the placeholder's
   `height`. If the parent height does not include the child margin, it collapsed.
4. Toggle `display: flow-root` in the Styles pane and watch the parent's box grow.
5. `document.getElementById('nav-placeholder').getBoundingClientRect()` in the console
   returns viewport coordinates: `top: 0, height: 82` after the fix. Before, `top` was
   28 and the 28px above it belonged to nobody.

**If you remember one thing.** A parent's background never covers a child's collapsed
margin, because the margin ends up outside the parent's box.

---

## 3. Block formatting contexts (BFC)

**ELI5.** A BFC is a room with walls. Inside the room, boxes stack and their margins
behave. The walls stop certain things from leaking out: floats are contained, and
margins do not collapse through the wall.

**What actually happens.** A block formatting context is a region in which block-level
boxes are laid out according to the normal flow rules, independently of the outside. It
is created by:

- the root element,
- `float` other than `none`,
- `position: absolute/fixed`,
- `display: inline-block`, `table-cell`, `flow-root`,
- flex and grid items,
- `overflow` other than `visible`,
- `contain: layout`, `contain: paint`, `contain: strict`.

Practical uses in this repo:

- `display: flow-root` on `#nav-placeholder` — contain the nav margin (section 2).
- `overflow: hidden` on `.hero-field` — clip the oversized decorative SVG so it does not
  create horizontal scroll. That is a BFC as a side effect, but clipping is the reason.

**Gotcha.** `overflow: hidden` also clips focus rings and shadows, and it can hide
content from keyboard users if it clips something that should scroll. Prefer
`flow-root` when you only want containment.

**Terms to look up.** block formatting context, float containment, `contain`.

---

## 4. Normal flow, block vs inline, and why `html, body { height: 100% }`

**ELI5.** Normal flow is the browser's default stacking: block boxes go top to bottom,
inline boxes go left to right inside a line. Everything else — flex, grid, absolute,
fixed — is a deliberate departure from that default.

**What actually happens.**

- Block boxes take the full available width and start on a new line.
- Inline boxes sit in a line and only take the width of their content.
- `display: flex` on a parent turns its children into flex items: they no longer
  collapse margins, no longer obey normal block flow, and are laid out by the flex
  algorithm instead.
- `height: 100%` only works if the parent has a definite height. That is why the repo
  sets `html, body { height: 100% }` — without it, `height: 100%` on a child resolves
  against an auto-height parent and computes to `auto`.

**Where you saw it.** The nav's `display: flex`, the hero's absolutely positioned
decorative mark, the mobile panel's `display: none` → `display: block`, and the
`html, body` height rule.

**Terms to look up.** normal flow, block-level box, inline-level box, containing block,
out-of-flow, flex formatting context.

---

## 5. The cascade and specificity — why `.work-plate .plate-name`

**ELI5.** When two CSS rules both want to style the same thing, the browser has a
tie-breaker: how specific the selector is, then which file/line came last. More specific
wins even if it is earlier.

**What actually happens.** Specificity is a triple: (IDs, classes/attributes/pseudo-
classes, elements/pseudo-elements). `.home h3` is `(0,1,1)`. `.plate-name` is `(0,1,0)`.
So `.home h3` wins and the plate name stayed dark on a dark plate. The fix was
`.work-plate .plate-name` — `(0,2,0)` — which outranks it without `!important`.

Rules that matter in this repo:

- **Source order breaks ties, not wars.** `home.css` loads after `styles.css`, so equal
  specificity later wins. That is why page CSS can override shared CSS without
  `!important`.
- **Inherited properties lose to any direct rule.** `color` inherits, but a rule that
  targets the element directly always beats the inherited value.
- **`!important` inverts the cascade.** Avoid it; it makes the next fix harder.
- The `.home a` rule was removed because it overrode nav and button colors. A broad
  element selector at the page level is almost always a mistake.
- `.home h3` outranking `.plate-name` is a good example of a page-level heading rule
  accidentally reaching into a component.

**How to check.** DevTools → Styles: rules are listed top to bottom, most specific
first, and struck-through rules lost. The **Computed** pane shows the winning value and
where it came from.

**Terms to look up.** cascade, specificity, inheritance, source order, `!important`,
cascade layers (`@layer` — not used here yet).

---

## 6. CSS custom properties and theming

**ELI5.** A custom property is a named value you can reuse. Change the name's value in
one place and everything that reads it updates. It is a variable, but it lives in CSS
and follows the cascade.

**What actually happens.**

```css
:root { --blue: #3232ff; --page-bg: #f6f4ef; }
html[data-theme="dark"] { --page-bg: #0d0d12; }
body { background: var(--page-bg); }
```

- Custom properties are **inherited**. Set them on `:root`/`html` and every descendant
  can read them.
- They are resolved at computed-value time, so `var()` works in any property value,
  including shorthands and `calc()`.
- They do not work in media query conditions (`@media (--small)` is not a thing).
- A fallback is `var(--name, #000)`.
- They are not typed by default; `@property` can register a type and default (not used
  here yet).

**Where you saw it.** The whole theme system:

- `styles.css` defines `--page-bg`, `--page-text`, `--page-soft`, `--page-line`,
  `--panel-bg`, `--panel-border`, plus `--blue`, `--paper`, `--ink`.
- `html[data-theme="light"]` overrides them for paper.
- `html[data-theme="dark"]` overrides them for the dark page (near-black surface, blue hero
  unchanged).
- `home.css` adds page-scoped tokens: `--home-bg`, `--home-ink`, `--plate-tess-bg`,
  `--plate-chip-bg`, and so on.
- The product plates read `--plate-*` so a single dark block restyles the whole card.

**Why tokens instead of hard-coded colors.** The dark plates originally stayed pastel
because their background and text colors were literals. Once they became tokens, one
`html[data-theme="dark"]` block flipped the entire card — background, heading, body,
chip, and link.

**Terms to look up.** custom property, inheritance, computed value, `var()`, design
tokens, `@property`.

---

## 7. `data-*` attributes and `dataset`

**ELI5.** HTML lets you invent attributes that start with `data-` to store facts about
an element. JavaScript reads them through `element.dataset`.

**What actually happens.**

```html
<html data-theme="dark">
<button data-theme-value="light">
```

```js
document.documentElement.dataset.theme          // "dark"
button.dataset.themeValue                       // "light"
```

- `data-theme-value` becomes `dataset.themeValue` (kebab-case → camelCase).
- Attribute names are case-insensitive; dataset keys are camelCase.
- Values are always strings.
- CSS can select on them: `html[data-theme="dark"] .nitrox-nav { … }`.

**Why it is nice here.** The theme lives on `<html>`, so every element can inherit the
tokens, and CSS can react without JavaScript touching individual elements. The picker
only changes one attribute.

**Terms to look up.** global attributes, `dataset`, attribute selector.

---

## 8. FOUC and the pre-paint script

**ELI5.** If the page paints once in the wrong theme and then corrects itself, you see a
flash. The cure is to set the theme before the first paint.

**What actually happens.** The browser parses `<head>` in order. CSS is
render-blocking: it will not paint until the CSSOM is ready. A **synchronous** script in
the head runs before that first paint. `theme.js` is exactly that:

```html
<script src="./theme.js"></script>
<link rel="stylesheet" href="styles.css">
```

It reads `localStorage` and sets `document.documentElement.dataset.theme`. By the time
the first pixel is painted, the right token block is already active. No flash.

If the script were `defer`red, or placed at the end of `<body>`, the browser could paint
the default theme first and then switch. That is FOUC — flash of unstyled/wrong content.

**Tradeoff.** A synchronous script in the head delays parsing slightly. Keep it tiny and
dependency-free (this one is a dozen lines and has no imports).

**Terms to look up.** FOUC, render-blocking, parser-blocking, `defer` vs `async`,
critical rendering path.

---

## 9. `localStorage`

**ELI5.** A small key/value drawer in the browser that survives reloads and closed tabs.
It only stores strings and it belongs to one site.

**What actually happens.**

- `localStorage.setItem('nitrox-theme', 'dark')`
- `localStorage.getItem('nitrox-theme')` → `'dark'` or `null`
- Synchronous: it blocks the main thread while it reads/writes. Fine for one tiny key,
  bad for loops or large data.
- Per **origin**: `http://localhost:8000` and `https://nitroxhq.github.io` have separate
  storage. So a theme chosen locally does not exist in production until you choose it
  there.
- Shared across tabs of the same origin. No expiry. Clearing site data removes it.
- Private/incognito modes can throw on write or clear on close. That is why every access
  in this repo is wrapped in `try/catch` — the page still works, it just forgets.

**Why not cookies?** Cookies are sent to the server on every request; this is a purely
local UI preference. `localStorage` keeps it on the client.

**Terms to look up.** origin, Web Storage API, sessionStorage, IndexedDB, storage quota.

---

## 10. `color-scheme`, scrollbars, and native widgets

**ELI5.** Some parts of the page are drawn by the browser, not by your CSS: scrollbars,
form controls, the default canvas color. `color-scheme` tells the browser which set of
native colors to use.

**What actually happens.**

```css
:root { color-scheme: dark; }
html[data-theme="light"] { color-scheme: light; }
html[data-theme="device"] { /* light/dark via media query */ }
```

- `color-scheme: dark` makes the browser use dark native widgets and a dark default
  scrollbar.
- `scrollbar-color: <thumb> <track>` styles the scrollbar in Chromium and Firefox
  (Chrome 121+). A `transparent` track lets the page show through.
- `scrollbar-width: thin | auto | none` changes thickness (not used here).
- Safari has historically ignored `scrollbar-color`; do not rely on it for layout.
- `color-scheme` also affects the default background of the canvas and the text color of
  form fields, so set it deliberately.

In this repo the scrollbar thumb is light in the dark theme and ink in the light theme,
with a transparent track. The `meta[name="theme-color"]` is a separate thing: it colors
mobile browser chrome, not the scrollbar.

**Terms to look up.** `color-scheme`, `scrollbar-color`, `scrollbar-width`,
`::scrollbar` (non-standard), `theme-color`.

---

## 11. Responsive units and the `100vw` trap

**ELI5.** Screens come in every width. Instead of fixed pixels, use sizes that adapt.

**What actually happens.**

```css
.wrap { width: min(1120px, 100% - 48px); margin: 0 auto; }
```

- `min(a, b)` picks the smaller value. Here: never wider than 1120px, never closer than
  24px to each edge.
- `clamp(min, preferred, max)` picks the middle value but never outside the bounds.
  `padding: clamp(1.5rem, 2.6vw, 2.25rem)` scales with the viewport, with floors.
- `vw` is 1% of the **viewport width including the scrollbar**. `100vw` on a page with a
  classic scrollbar is wider than the visible content area, which creates horizontal
  overflow. Use `100%` when you mean "the container's width".
- `%` resolves against the containing block, not the viewport.
- `rem` is the root font size (usually 16px); `em` is the current element's font size.

**Where you saw it.** `min(1120px, 100% - 48px)` on `.wrap` and `.hero-inner`;
`clamp()` for section padding; the mobile nav bug where `width: auto` plus 12px side
margins replaced a width that overflowed at 390px.

**Terms to look up.** viewport units (`vw`, `vh`, `dvh`), `min()`, `max()`, `clamp()`,
containing block, scrollbar gutter.

---

## 12. Flexbox, auto margins, and `display: contents`

**ELI5.** Flexbox is a row (or column) of boxes that share the available space. Auto
margins eat the leftover space and push things to one side.

**What actually happens.**

- `display: flex` on the nav makes brand, links, picker, and toggle flex items.
- `gap` sets space **between** items only, not around the edges.
- `margin-left: auto` on an item absorbs all free space to its left, pushing it right.
  That is how the picker and hamburger sit at the right end.
- `flex-wrap: wrap` lets items move to a new line. The mobile nav uses it to put the
  panel below the brand row.
- `order` changes visual order without changing DOM order. The mobile nav uses
  `order: 1/2/3` for picker, toggle, panel.
- `display: contents` removes the element's own box; its children participate in the
  parent's layout. The desktop `.nav-menu` uses it so `.nav-links` is effectively a
  direct child of the pill. Accessibility caution: older browsers dropped
  `display: contents` elements from the accessibility tree; modern engines keep the
  semantics. Do not put critical landmarks on a `display: contents` element.

**Tradeoff.** Visual `order` differing from DOM order can confuse keyboard and screen
reader users. Here the mobile panel is after the toggle in the DOM and appears after it
visually; the theme group is moved before the toggle, which is a minor divergence.

**Terms to look up.** flex container/item, main axis, `flex-basis`, `flex-grow`,
`flex-shrink`, auto margins, `order`, `display: contents`.

---

## 13. Fetch, `innerHTML`, and the injected navbar

**ELI5.** The navbar lives in one file. Every page asks the browser to download that
file and paste it into a placeholder.

**What actually happens.**

```js
fetch('./navbar.html')
  .then(res => res.text())
  .then(html => { placeholder.innerHTML = html; });
```

- `fetch` is asynchronous and returns a Promise.
- Relative URLs resolve against the **document** URL, not the script URL. `./navbar.html`
  works from the site root; it would break in a subfolder unless paths were adjusted.
- `innerHTML` parses the string as HTML and replaces the element's children. Scripts
  inside are not executed.
- The nav is injected on `DOMContentLoaded`, so there is a brief moment with no nav. On a
  fast local server you will not see it; on a slow connection you might.
- If the fetch fails, the page has no navigation. The `.catch` logs the error but cannot
  invent a nav.
- `outerHTML` replaces the element itself (used when the placeholder is a `<nav>`).

**Why do it.** One source of truth for five pages. The cost is a runtime dependency on
JavaScript and a small layout shift. A build step or server-side include would remove
that cost, but this site intentionally has no build step.

**Terms to look up.** Fetch API, Promise, `innerHTML` vs `textContent`, DOM parsing,
`DOMContentLoaded`, progressive enhancement.

---

## 14. Media queries in CSS and `matchMedia` in JS

**ELI5.** CSS can ask "how wide is the screen?" and apply different rules. JavaScript can
ask the same question and react when the answer changes.

**What actually happens.**

```css
@media (max-width: 720px) { … }
```

```js
const wideScreen = window.matchMedia('(min-width: 721px)');
wideScreen.addEventListener('change', (event) => { … });
```

- The CSS breakpoint is `max-width: 720px`; the JS query is `min-width: 721px`. They are
  complementary: exactly one is true at any width. Using `max-width: 720` in both would
  leave both true at 720 and cause double handling.
- `addEventListener('change')` is the modern API; `addListener` is the old one, kept as a
  fallback in `script.js`.
- Media queries are evaluated against the viewport, not the element (container queries
  are the element-scoped version — not used here).
- `prefers-color-scheme` and `prefers-reduced-motion` are media features too.

**Where you saw it.** The 720px mobile nav, the `device` theme following
`prefers-color-scheme`, and closing the panel when the window grows past 720px.

**Terms to look up.** media query, media feature, breakpoint, `matchMedia`,
`prefers-color-scheme`, container queries.

---

## 15. The critical rendering path

**ELI5.** The browser reads HTML, builds a tree, applies CSS, calculates where every box
goes, and then paints pixels. Anything that blocks one of those steps delays the first
paint.

**What actually happens.**

1. Parse HTML → **DOM**.
2. Parse CSS → **CSSOM**. CSS is render-blocking: no paint until it is ready.
3. Combine into a **render tree** (visible nodes only).
4. **Layout**: compute geometry (this is where margin collapsing happens).
5. **Paint** and **composite**.

Consequences you can use:

- Put CSS in `<head>` so the first paint is styled.
- Put non-critical JS at the end of `<body>`, or use `defer`, so it does not block
  parsing.
- The tiny theme script in `<head>` is intentional: it must run before paint.
- Give images `width` and `height` attributes so the browser reserves space and does not
  shift the layout when they load.
- `font-display: swap` lets text render in a fallback font first instead of staying
  invisible while a font downloads.

**Terms to look up.** DOM, CSSOM, render tree, reflow/layout, repaint, compositing,
CLS (cumulative layout shift), render-blocking.

---

## 16. Static hosting and GitHub Pages

**ELI5.** There is no server running your code. The host just hands out files. A URL is a
path to a file.

**What actually happens.**

- `https://nitroxhq.github.io/about.html` serves `about.html` from the branch GitHub
  Pages is configured to publish (`main`, root).
- Pushing to that branch triggers a build; Pages serves the built files from a CDN.
- `404.html` is served for paths that do not exist. That is why `404.html` and
  `bsod.html` are standalone files.
- Pages runs Jekyll by default. Dot-directories like `.dev/` are ignored by Jekyll, so
  the notes are in the repo but not published as pages. Adding a `.nojekyll` file would
  skip Jekyll entirely.
- There is no server-side redirect. `mission.html` uses a meta refresh plus a canonical
  link plus JS, because a static host cannot send a 301 for a file you deleted.
- Caching is the CDN's; a hard refresh or a new build is how you see changes.

**Terms to look up.** static site, GitHub Pages, CDN, Jekyll, `.nojekyll`, meta refresh,
canonical URL.

---

## 17. Images: SVG, PNG, intrinsic size, and 2x

**ELI5.** SVG is a drawing described in math, so it stays sharp at any size. PNG is a grid
of pixels, so it gets blurry when stretched.

**What actually happens.**

- SVG scales without loss; ideal for logos and icons. The product marks are SVG.
- PNG has an intrinsic size in pixels (`naturalWidth` / `naturalHeight`). Displaying a
  256px image in a 46px slot is fine; it gives you sharpness on high-DPI screens.
- `width` and `height` **attributes** in HTML set the layout size and aspect ratio before
  the image loads. CSS `width`/`height` can override them. Keeping both prevents layout
  shift.
- `srcset` + `sizes` let the browser pick a file per device pixel ratio. Not needed for
  a 46px slot where a 256px file is already 5.5x.
- `alt=""` marks an image as decorative so screen readers skip it; use real alt text
  when the image carries meaning.

**Where you saw it.** The community buttons use the 256px Tahoe/Golden Gate PNGs at
46×46 CSS pixels; the Tesseract/Prism marks are SVG.

**Terms to look up.** intrinsic size, device pixel ratio, `srcset`, `sizes`, CLS, SVG
viewport.

---

## 18. Accessibility details that are easy to miss

**ELI5.** Some people use a keyboard, a screen reader, or reduced motion. The page should
still make sense.

**What actually happens.**

- `aria-pressed="true|false"` tells assistive tech that a button is a toggle and whether
  it is on. The theme buttons use it.
- `aria-expanded` + `aria-controls` describe a disclosure (the mobile menu). Update
  `aria-expanded` every time the panel opens or closes.
- Icon-only buttons need `aria-label` (and usually `title` for a tooltip).
- `:focus-visible` shows a focus ring only for keyboard focus. It must not be removed
  without a replacement.
- `Escape` should close transient UI; the mobile nav does.
- `prefers-reduced-motion` should disable or shorten animation. Check it before adding
  large motion.
- Color alone should not carry meaning. The active nav link also gets a background, not
  just a color.
- Contrast is a ratio, not a vibe: 4.5:1 for normal text, 3:1 for large text and UI
  boundaries.

**Terms to look up.** ARIA, accessible name, focus management, reduced motion, contrast
ratio, landmark regions.

---

## 19. DevTools moves worth memorizing

1. **Inspect** (`Ctrl+Shift+C`) then click. The Elements panel selects the node.
2. **Computed** pane: the winning value and its source. Use it when "my CSS is not
   applying".
3. **Styles** pane: struck-through rules lost the cascade. Hover a rule to see
   specificity hints in modern Chrome.
4. **Box model overlay**: margins orange, borders, padding, content. Toggle it in the
   Layout pane.
5. **Layout** pane → Grid/Flex overlays. Useful for the nav.
6. **Console geometry**: `el.getBoundingClientRect()` gives `top/right/bottom/left`,
   `width`, `height` in viewport coordinates. `el.offsetHeight` includes padding and
   border but not margin.
7. **`document.elementFromPoint(x, y)`**: which element is actually at that pixel. Great
   for "what is this bar?".
8. **Disable cache** in the Network tab while iterating; a stale `home.css` can waste ten
   minutes.
9. **Device toolbar**: test 390px and 721px, not just "mobile".
10. **Paint flashing** (Rendering pane): shows what repaints; useful when an animation
    feels heavy.

---

## 20. Glossary

| Term | Meaning in one line |
|---|---|
| **Viewport** | The visible page area inside the browser window. |
| **Containing block** | The rectangle a percentage/positioned value resolves against. |
| **Normal flow** | Default block/inline layout before flex, grid, or positioning. |
| **BFC** | A layout region that contains floats and stops margin collapsing across its boundary. |
| **Margin collapse** | Two adjoining vertical margins merge into the larger one. |
| **Cascade** | The rules that decide which declaration wins. |
| **Specificity** | The selector weight used by the cascade. |
| **Custom property** | A named CSS value (`--foo`) resolved by `var()`. |
| **Token** | A named design value (color, space, radius) exposed as a custom property. |
| **FOUC** | Flash of unstyled/wrong content before CSS or theme is applied. |
| **CLS** | Cumulative layout shift; content jumping as assets load. |
| **DPR** | Device pixel ratio; physical pixels per CSS pixel. |
| **Intrinsic size** | The natural size of an image/font before CSS resizes it. |
| **Render-blocking** | A resource the browser waits for before painting. |
| **Progressive enhancement** | The page works at a basic level, then improves with JS/CSS. |
| **Origin** | Scheme + host + port; the boundary for storage and same-origin policy. |
| **BFF** | Not a web term. Wrong glossary. |

---

## 21. Map of what we built → what it teaches

| Thing in the repo | Concept |
|---|---|
| The strip above the nav | Margin collapsing, BFC, `display: flow-root` (sections 2–3) |
| `.home h3` beating `.plate-name` | Specificity and cascade (section 5) |
| Theme picker and dark plates | Custom properties, `data-*`, cascade (sections 6–7) |
| `.dev/DESIGN.md` token tables | Aliased custom properties and theme overrides (section 6) |
| No flash on reload | Pre-paint script, FOUC, render-blocking (section 8) |
| Theme survives navigation | `localStorage`, origin (section 9) |
| Scrollbar and form colors | `color-scheme`, native widgets (section 10) |
| Nav at 390px vs 1440px | `min()`, `clamp()`, `100vw` trap (section 11) |
| Picker pushed to the right | Flexbox auto margins (section 12) |
| One navbar for five pages | `fetch` + `innerHTML` (section 13) |
| Panel opens under 720px | Media queries + `matchMedia` (section 14) |
| Blue field starts at y=0 | Box model + paint order (sections 1–2) |
| 256px PNG in a 46px slot | Intrinsic size, DPR (section 17) |
| `aria-pressed` on theme buttons | Accessible state (section 18) |

---

## Where this came from

- `.dev/WORKLOG.md` — the timeline, including the navbar, theme, and margin-collapse
  entries.
- `.dev/docs (edit later)/v0.1b/00-docs-meta.md` — doc conventions and technical
  precedent.
- `home.css`, `styles.css`, `script.js`, `theme.js` — the code these notes describe.

When a new concept shows up in a task, add a section here with the same shape: what we
hit, ELI5, mechanics, fix, how to prove it, one thing to remember. Keep the old sections;
correct them rather than deleting them.
