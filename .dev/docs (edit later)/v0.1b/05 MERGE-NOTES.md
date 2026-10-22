# Merge notes, aliases, and source coverage

## 1. Purpose and status

This set is the **canonical working documentation** for current planning. It is intentionally not called exhaustive or final. No source documents in Craft, Notion, or GitHub were modified during this consolidation.

The owner’s clarifications dated 2026-10-19 take precedence over earlier editorial assumptions:
- No functioning Nitrox/Tesseract product currently exists.
- Near-term focus is the feasible core apps/software ecosystem; broader ambitions remain.
- All Tesseract features remain documented intended scope, not shipped functionality or first-release promises.
- Parent-brand foundation and app-specific adaptations are the chosen organizing principle.
- Public religious/social values wording remains deferred.
- Feature phases remain unassigned unless explicitly decided.
- Internal homelab/AI development material is not a user-facing product feature.

## 2. Source inventory reviewed

### Craft folder `nitrox md`

Folder ID: `025a7684-9e38-4c65-865c-7a9a84d745b0`

- `design.md — Design System & Spatial UI Specification`
- `10.01.2026 12:24PM from gemini for now lol:`
- `2. agents.md — AI & Homelab Workstation Architecture`
- `Ran command: Workspace inspection (Get-ChildItem -Recurse -Depth 2)`
- `Suggested Next Steps for Your Repo`
- `10.16.2026 - 10:11a`
- `📐 Tesseract: Architecture & Repo Setup Guide`

Other Craft documents read or searched:
- `tesseract megadoc` (root block `54f69598-61f9-4fb4-98ca-fc4469dc9f3a`)
- `nitrox megadoc.` (root block `bc08d026-9614-4efd-b1cc-678943e6ae0a`)
- `nitrox brand design!!` (root block `2d482861-f745-4cc3-b12e-b3dce4f2fcef`)

### Notion pages retrieved

- `Nitrox` — https://app.notion.com/p/f71e595eeba345d5979da7c63c0dd9d2 (snapshot dated 2026-08-07)
- `Tesseract` — https://app.notion.com/p/2012fb404cb48040903cde1ff81fc382 (snapshot dated 2026-04-28)
- `nitrox quantum (paid plan, monetization)` — https://app.notion.com/p/2012fb404cb4807caa65ce6bf99ea4a8 (snapshot dated 2026-01-18)
- `roadmap(s)` — https://app.notion.com/p/2e52fb404cb4802fa540e761b0e63366 (snapshot dated 2026-01-18)
- The `nitrox docs` index and related pages were accessible in the earlier audit, but not all linked child pages have been fully reconciled here.

### Sources not verified

- GitHub repositories `nitroxhq/Tesseract` and `nitroxhq/nitroxhq.github.io`
- Markdown export inside the Tesseract repository
- Deployed sites `https://nitroxhq.vercel.app/` and `https://tesseract-nitrox.vercel.app/`

Access failure does not establish that a repository or site is empty, broken, or unavailable to ordinary users. It only means their contents/behavior were not verified in this pass.

## 3. Source precedence and editorial method

1. Owner’s latest explicit clarifications take precedence over the draft and audit.
2. Notion is generally older. Later Craft material supersedes it where the newer material explicitly changes naming or direction.
3. Age alone does not make older material irrelevant; preserve older requirements unless superseded.
4. Gemini-generated content is a quick pass, not a final specification. Reuse useful suggestions but do not treat omissions as decisions.
5. Separate user capability, proposed implementation, and delivery phase.
6. Do not invent mappings between names or claim implementation from plans, generated scaffolding, repositories, or deployment artifacts alone.
7. Keep the detailed feature inventory in `TESSERACT-REQUIREMENTS.md`, not the public overview.

## 4. Historical names and unresolved mappings

The older Notion `Nitrox` page lists or links to these names and concepts:
- **NitroxOS** — OS concept; longer-term ambition.
- **NikoBot** and **Niko** — relationship unresolved; current working portfolio uses Niko, but no mapping is asserted.
- **GeoBook** — older product name; relationship to current apps unresolved.
- **Geo Series** — broader consumer-tech brand spanning software and hardware in the older source.
- **Nova** — affordable electric transportation concept; source itself notes name may change.
- **PARADIGM** — game-philosophy concept.
- **media** — indie content concept with values language that remains subject to the deferred public wording decision.
- **Tomfoolery** — “making what should be” concept.
- **Wrotebook** — appears in older Tesseract feature planning for notes, capture, object-based organization, media lists, and productivity. Relationship to Tesseract is unresolved; its feature intent is preserved in `TESSERACT-REQUIREMENTS.md`, not listed as a separate current product.
- **Platter** — appears in older material around escaping information overload and may relate to saved content/feed workflows; mapping unresolved.
- **Astrox** — older software concept; mapping to Photon or any other current name unresolved.
- **AirWave** — older music-player name; relationship to current working name Airwaves unresolved.
- **Orchid**, **Blueberry**, **Cobalt**, **Prism**, and **Photon** — current working-list concepts from later planning/recent conversation; all planned, not functioning products.
- **Cosmetica** and **Library** — older app names/concepts; current mappings and status unresolved.

These are retained as historical evidence and possible aliases/concepts, not asserted as distinct active products. Do not merge two names unless the owner or reliable source material confirms the mapping.

## 5. Conflicts and decisions recorded

### Brand mission and values
Sources combine “fixing technology for the good of humanity,” making tech fun again, solving neglected UI/UX/platform problems, and helping creators/hobbyists create and consume mindfully. The documentation synthesizes these complementary themes. Public wording about Christian values and LGBTQ+ support remains deferred; this is not a blocker for development.

### Organizational scope
Older Notion material describes software, hardware, operating systems, games, media, and broader brands/divisions. The near-term focus is the core apps/software ecosystem because it is the most feasible starting point. Both horizons are retained.

### Tesseract scope
The source describes notes, tasks, captures, calendar, whiteboards, time tracking, databases, flashcards, jots, daily notes, journaling, goals/habits, time tracking, media-later lists, rediscovery, people/contact context, tab workflows, object/tag-based organization, and more. These remain planned feature intent. No phase is inferred from the order in the requirements file.

### Architecture
The October 16 Craft notes propose Tauri 2, React/TypeScript/Vite/Tailwind, local Markdown/YAML, JSON spatial manifests, and sync strategies. The older workspace inspection references a static HTML/CSS/JS layout and generated configuration. Neither source establishes a functioning app or completed migration. The file/offline-first direction is retained; implementation specifics remain proposals.

### Design
The Tesseract design spec is purple-led with blue accents. The Gemini quick pass is electric-blue-led and suggests unifying the parent brand with Tesseract and Prism. The current documentation adopts the parent-brand/product-adaptation organizing principle, while exact tokens and styling remain open. The quick pass does not override detailed requirements.

### Sync and login
Sources discuss user-owned cloud folders, LAN peer-to-peer sync, configuration sync, conflict files, selective sync, and possible cloud storage. They also raise whether email/SSO or cloud storage should be required. No sync protocol or login policy is selected. Self-hosted SSO must not be behind a paid feature gate; the cost of operating infrastructure remains real.

### Monetization
Older Notion material lists no ads, business features, and possibly cloud storage as paid features, while also saying some of these might be viable without funding. The working documentation uses provisional Free, Paid/Premium, and Business/Nonprofit categories, with organizational capabilities, compliance-related offerings, and Nitrox-hosted SSO as possible Business/Nonprofit additions. Prices, entitlements, hosted-storage terms, and compliance obligations remain TBD.

## 6. Coverage limitations

This is a source-bounded working consolidation, not a complete audit of every Nitrox artifact. Some Craft documents include more content than the excerpts retrieved in this pass. The Notion pages are snapshots from differing dates; some linked pages and their attachments have not been exhaustively reviewed. GitHub repositories, the Markdown export, and deployed Vercel sites were not verified.

Accordingly:
- No functioning product capability is claimed.
- No implementation, build, test, deployment, performance, or compliance claim is confirmed.
- Requirements may still be missing from older daily notes, attachments, linked pages, or repository documentation.
- The feature inventory should be expanded when additional source material is reviewed, not silently treated as exhaustive.

## 7. Next consolidation steps

- [ ] Verify GitHub access and inspect the actual repositories.
- [ ] Read the Markdown export and compare it against this working set.
- [ ] Inspect deployed pages as observable artifacts, without inferring functionality from deployment alone.
- [ ] Review remaining Notion child pages and relevant Craft sections for unique requirements.
- [ ] Confirm historical name mappings only where the owner or reliable source establishes them.
- [ ] Keep product requirements complete while separately assigning phase/priorities.
- [ ] Record evidence for any future transition from “planned” to “implemented.”
- [ ] Resolve visual tokens, storage/login/sync, canvas implementation, and monetization entitlements through explicit decisions.

> **Operating rule:** Planning documents establish intent. Repository evidence establishes what is present in code. Tests and observable behavior establish what a user can actually do.
