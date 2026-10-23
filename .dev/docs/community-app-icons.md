# Community app icons: ICNS → PNG

- **Summary:** Real macOS Tahoe (Discord) and Golden Gate (GitHub) app icons were extracted from `.icns`
  files and dropped into `assets/community/` as 256/512/1024 PNGs. `community.html` now uses the 256px versions (wired 10.22.2026).
- **Date:** 10.22.2026, delivered / not wired up.
- **Related:** `.dev/WORKLOG.md` entry *Community app icons: ICNS to PNG from the misc-icons folder* ·
  `assets/community/` · `community.html`.

## Problem

`community.html` uses two hand-built "liquid glass" squircle SVGs (`discord-glass.svg`,
`github-glass.svg`) because, at the time of that page, there was no official Apple-style Discord or GitHub
icon to download. The real macOS icon packages are now available locally as `.icns` files, so the page can
eventually use the genuine artwork instead of the imitation.

The catch: ImageMagick on this machine has no ICNS decoder. `magick identify -list format | grep -i icns`
returns nothing, which is why the Super User advice to "use ImageMagick" does not actually apply to the
container itself — ImageMagick is fine for processing the PNGs afterwards, not for reading `.icns`.

## Considered

| Option | Result |
| --- | --- |
| `magick` / `convert` directly on `.icns` | Rejected: ICNS is not in this build's format list, so the file cannot be opened at all. |
| `icns2png` from `libicns` | Chosen: purpose-built, already installed at `/usr/bin/icns2png`, extracts every embedded size. |
| `iconutil` (macOS only) | Not available on Arch. |
| Keep only the glass SVGs | Rejected: the point of the exercise is to have the real Apple icons available. |

## Decision

- Use **`icns2png -x`**, which extracts the embedded PNG representations as-is (no resampling, no quality
  loss). It emits warnings for ICNS element types libicns cannot parse (`icp4`, `icp5`, `icp6`, `ic07`,
  `ic11`–`ic14`) but still extracts the useful `ic08`/`ic09`/`ic10` sizes.
- **Discord:** `Discord__Tahoe__8Qjjft7Zk8-42dc0dd06c.icns` — Tahoe existed, so Tahoe was used.
- **GitHub:** no Tahoe `.icns` exists in the folder, so `Github__Dark__Golden_Gate__14NwU1PtJ7-…icns`
  was used per the fallback rule.
- Leave `~/Pictures/@MISC ICONS/` **completely untouched** — the `.icns` files stay the source of truth and
  were only read from. Output went into the repo instead of a `png/` folder next to the originals.
- Name files by brand + generation + size, kebab-case, to match the repo's existing asset style:
  `discord-tahoe-{256,512,1024}.png`, `github-golden-gate-{256,512,1024}.png`.

## What changed

Added to `assets/community/` (six new files, no existing file modified):

| File | Size | Bytes |
| --- | --- | --- |
| `discord-tahoe-256.png` | 256×256 | 31 KB |
| `discord-tahoe-512.png` | 512×512 | 94 KB |
| `discord-tahoe-1024.png` | 1024×1024 | 315 KB |
| `github-golden-gate-256.png` | 256×256 | 27 KB |
| `github-golden-gate-512.png` | 512×512 | 82 KB |
| `github-golden-gate-1024.png` | 1024×1024 | 416 KB |

All are 8-bit sRGB PNG with a full alpha channel.

## Validation

- `magick identify` confirms geometry, bit depth, and colour type for all six files.
- Both 1024s were opened and visually checked: Discord is the silver/blue Tahoe squircle, GitHub is the
  dark Golden Gate squircle with the cat mark.
- MD5 of both source `.icns` files unchanged before and after (`e306fc31…`, `ef821184…`), so the misc-icons
  folder was not modified.
- Not checked: how they look at 46px on the live page, and dark/light contrast in the community button rows.

## Rollback or recovery

Nothing references the new PNGs. Delete the six files to roll back; the glass SVGs and `community.html`
are untouched.

## Caveats and follow-ups

- **Not wired into the page.** `community.html` still points at `discord-glass.svg` / `github-glass.svg`.
  The 1024 PNGs are 300–400 KB each — use the 256 (or `srcset` with 256/512) if these become the live
  icons, not the 1024.
- **No Tahoe GitHub icon existed**, so the pair is mixed-generation: Tahoe Discord next to Golden Gate
  GitHub. They read as siblings at small sizes but are not the same design family.
- Names and folder placement are provisional; the owner plans to tidy them (and maybe drop unused sizes)
  in a follow-up pass.
- `libicns` warnings about `ic07`/`ic11`–`ic14` are expected and not fatal; those elements are simply not
  extracted.
