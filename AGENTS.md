# Nitrox repo instructions

This repo has a written precedent. The point is not to freeze the design — it is to make sure a new page
starts from the same place as the last one, so any deviation is a decision instead of an accident. Read
before you build; be creative after.

## 1. Read precedent before touching the site

For any task that changes files, read in this order and stop when you have what you need:

| # | File | Why |
|---|---|---|
| 1 | [`.dev/DESIGN.md`](.dev/DESIGN.md) §0–§1 | Authority, conflict rule, and the app override model |
| 2 | [`.dev/DESIGN.md`](.dev/DESIGN.md) sections for the surface you touch | Tokens, type, geometry, components, motion, voice, a11y |
| 3 | [`00-docs-meta.md`](<.dev/docs (edit later)/v0.1b/00-docs-meta.md>) §3 | Technical precedent: site build, fonts, icons, app stack |
| 4 | [`03-status.md`](<.dev/docs (edit later)/v0.1b/03-status.md>) | What actually exists vs what is planned |
| 5 | [`01-readme.md`](<.dev/docs (edit later)/v0.1b/01-readme.md>) | Portfolio, positioning, public vocabulary |
| 6 | The app doc (`06-tesseract-docs.md`, `07-einstein-docs.md`) | Only when the task is product-specific |
| 7 | Recent [`.dev/WORKLOG.md`](.dev/WORKLOG.md) entries | What was already tried or deliberately deferred |
| 8 | [`.dev/human-learning.md`](.dev/human-learning.md) | Only when the task is layout/CSS behavior |

`DESIGN.md` is a map, not a novel. Read §0–§1 always; then jump to color, type, components, or motion as
the task requires. Do not read all 900 lines to change a button.

## 2. The rule

**Precedent is the default. Deviation is allowed, but it is explicit.**

- Reuse the token, component, or pattern that already exists. Do not invent a second one because it is
  faster in the moment.
- If the code and `DESIGN.md` disagree, **the code is the current truth**. Fix the doc in the same pass, or
  change the code deliberately — never leave the two describing different sites.
- If you must deviate, record it:
  - a parent-level visual change → update `DESIGN.md` (and §12 if it came from the backlog),
  - an app-level change → the deviation table in that app's doc, per `00-docs-meta.md` §2,
  - any change → say why in `.dev/WORKLOG.md`.
- A deviation becomes precedent only when the owner says it applies elsewhere. Until then it is local.

Do not "improve" shared chrome (navbar, footer, tokens, motion) as a side effect of a page task. That is a
separate decision with a separate entry.

## 3. Where you can be creative

Precedent sets the floor, not the ceiling:

| Area | Expectation |
|---|---|
| Section layout and composition | Free. Editorial asymmetry, new section rhythm, a better order — try it. |
| Copy and framing | Free within the voice rules (`DESIGN.md` §10). New metaphors are welcome; hype is not. |
| Illustration, marks, imagery | Free if it is real, honest, and not fake product UI. |
| Product surfaces | Free to take their own accent, density, and material within `DESIGN.md` §1.2. |
| New components | Allowed. If another page could reuse it, document it in `DESIGN.md` §6. |
| New aesthetic (glass, chrome, Y2K, Aero, grain) | Only through the `DESIGN.md` §12 ladder: parked → experiment → owner-approved → precedent. |

The base has to be right before the flourish: a page that is readable, responsive, keyboard-usable, and
honest can afford to be strange. A strange page that skips the base is just broken.

## 4. Hard limits

These are not style preferences:

- **Offline first.** Fonts, icons, scripts ship locally. No Google Fonts, no CDN at runtime.
- **No fake product UI, screenshots, dates, integrations, or feature claims.** A page, repo, scaffold, or
  waitlist is not a shipped product.
- **Lowercase on the public site.** Product names included.
- **Visible focus, keyboard reachability, reduced-motion support.** In both themes.
- **Tokens, not stray hex.** A one-off value needs a comment and a reason.
- **The nav and footer are shared.** Restyle them globally or not at all.
- **Never write secrets** — including placeholder tokens, credential URLs, or real invite links that are
  not meant to be public.

## 5. File map

| Path | Role |
|---|---|
| `index.html`, `home.css`, `home.js` | Homepage — the current design reference |
| `styles.css` | Shared shell, tokens, navbar, legacy inner-page blocks |
| `navbar.html`, `script.js`, `theme.js` | Shared nav, link injection, pre-paint theme |
| `about.html`, `projects.html`, `community.html` | Older inner-page shell; migrate to the homepage system when touched for design work |
| `404.html`, `bsod.html`, `win.css` | Deliberate one-off themes, registered in `DESIGN.md` §6.9 |
| `assets/fonts/` | Self-hosted fonts; no webfont CDNs |
| `assets/icons/` | Product marks |
| `.dev/` | Docs, worklog, learning notes — not published by GitHub Pages |

Always serve over HTTP (`python3 -m http.server`) when testing. The navbar is fetched from
`navbar.html`, so `file://` will not render it.

## 6. Definition of done

- [ ] Something rendered or ran, and the result was checked — not just "saved".
- [ ] Both themes checked on surfaces that have them; mobile checked at 390–430px.
- [ ] Focus, reduced motion, and contrast considered (contrast itself is still unaudited repo-wide).
- [ ] `.dev/WORKLOG.md` entry written, with **Overview** and what could not be checked.
- [ ] `DESIGN.md` updated if a token, component, pattern, or limit changed.
- [ ] Longer rationale in `.dev/docs/`; browser mechanics in `.dev/human-learning.md` if a real rule was
      exposed.
- [ ] No secrets, no invented claims, no unrecorded deviation.

If a task is too small for all of that, it is small enough to say so in one worklog line. Silence is the
only wrong outcome.
