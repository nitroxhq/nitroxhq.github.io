# nitrox — WORKLOG

Detailed worklog for this repo. Lives in `.dev/` when the repo has no worklog yet.

This file is the long-form record: what was asked, what was built, how it was checked, and what a human
actually learned along the way. The glanceable timeline stays in
`~/Documents/(01)-dev-git/@projects/projects-worklog.md`, and per-project deep dives stay in
`~/Documents/(01)-dev-git/@projects/<project>/README.md`. Those two are the source of truth for the
`project-docs` / `worklog` skills; this file is the in-repo detail for the same task.

Newest entries first. One entry per task or session. Every entry starts with an **Overview**.

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
- **`styles.css`**: added a `/* colors */` block in `:root` (`--text-black`, `--dark-mode: #151515`,
  kept `--bg-blue`, `--text-white`); rebuilt `.nitrox-nav` as a centered white pill (`50vw`,
  `border-radius: 100vmax`, bottom shadow); added `.nav-buttons` / `.nav-buttons:hover` /
  `.nav-buttons.active` (black text, nitrox blue when active); added `.big-buttons`, `.big-button`,
  `-icon`, `-text`, `-title`, `-sub`, `-arrow`, and `.join-us` / `.join-us-button`; added
  `position: relative` to `.nav-bsod` so its tooltip anchors to the link.
- **`navbar.html`**: brandmark is now blue logo + "nitrox" wordmark in `var(--sans)`; content centered;
  added the `community` link; links use `.nav-buttons`.
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
