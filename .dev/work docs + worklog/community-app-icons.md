# Community app icons: ICNS → PNG

- **Summary:** Real macOS Tahoe (Discord) and Golden Gate (GitHub) app icons were extracted from `.icns`
  files and dropped into `assets/community/` as 256/512/1024 PNGs. `community.html` uses the 256px versions
  (wired 10.22.2026). On 10.23.2026 every remaining `.icns` in the misc-icons folder was converted too, and
  all PNGs were mirrored back into the source folders so the archive holds the full set.
- **Date:** 10.22.2026, delivered and wired; archive completed 10.23.2026.
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
- Leave the `.icns` files **untouched** — they were only read from and stay the source of truth. Output went
  into the repo instead of a `png/` folder next to the originals. (The folder did later receive clean-named
  PNG copies at the owner's request; see *Archive sync* below. The `.icns` files themselves were never
  modified.)
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
- MD5 of both source `.icns` files unchanged before and after (`e306fc31…`, `ef821184…`), so the `.icns`
  files themselves were never rewritten. (PNG copies were added to the folder later, by request.)
- Not checked: how they look at 46px on the live page, and dark/light contrast in the community button rows.

## Rollback or recovery

`community.html` now loads `discord-tahoe-256.png` and `github-golden-gate-256.png`, so deleting those two
breaks the community page; the 512/1024 siblings are still unused. Either way the PNGs are reproducible:
re-run `icns2png -x` on the source `.icns` files in `~/Pictures/@MISC ICONS/`. Nothing else references them.

## Archive sync (10.23.2026)

The owner asked for the remaining `.icns` files to be converted **in place** in
`~/Pictures/@MISC ICONS/`, and for the six repo PNGs to be copied back there, so the archive holds every
conversion. All six `.icns` files in the folder are now converted; the `.icns` themselves were read-only.

| Source `.icns` | PNG prefix | Sizes |
| --- | --- | --- |
| `discord/Discord__Tahoe__8Qjjft7Zk8-…icns` | `discord-tahoe-` | 256, 512, 1024 |
| `discord/Discord__Golden_Gate__qUOgzDgMRD-…icns` | `discord-golden-gate-` | 256, 512, 1024 |
| `discord/Discord__Sunrise_-8ef2a49665.icns` | `discord-sunrise-` | 256, 512, 1024 |
| `discord/Discord_TlgTSw5Dyi-b251516aac.icns` | `discord-cat-` | 256, 512, 1024 |
| `github/Github__Dark__Golden_Gate__14NwU1PtJ7-…icns` | `github-golden-gate-` | 256, 512, 1024 |
| `github/GitHub_Icon__macOS27_-9912645966.icns` | `github-macos27-` | 16, 32, 256, 512, 1024 |

Notes:

- The `discord-cat` name is descriptive, not official. `Discord_TlgTSw5Dyi-b251516aac.icns` is the odd one
  out: its artwork is a **cat face** on a periwinkle squircle, not a Discord logo. The name is provisional
  and only records what the image is.
- `GitHub_Icon__macOS27_` is the only file carrying 16 and 32 px elements, so it produces five PNGs instead
  of three. It is the glossy black squircle, visually distinct from `Github__Dark__Golden_Gate__`.
- Discord `/discord/` now holds four icon families × three sizes = 12 PNGs; GitHub `/github/` holds
  3 + 5 = 8. The pre-existing iOS-sourced PNGs are untouched.
- An earlier pass in the same session had written `discord-clyde-*.png` from the same source before the tool
  server restarted; those three files were byte-identical duplicates and were removed, keeping `discord-cat-*`.
- The six repo PNGs were **copied**, not moved: `assets/community/` keeps what `community.html` loads, and
  the archive has the same bytes.

## Caveats and follow-ups

- **Wired at 256px.** `community.html` points at `discord-tahoe-256.png` and
  `github-golden-gate-256.png` for a 46px slot. The 1024s are 300–400 KB each, so do not swap them in
  without a reason; `srcset` with 256/512 is the upgrade path if a larger surface appears.
- **No Tahoe GitHub icon existed**, so the pair is mixed-generation: Tahoe Discord next to Golden Gate
  GitHub. They read as siblings at small sizes but are not the same design family. The archive now also
  holds `github-macos27-*`, which is visually closer to the Tahoe treatment if a matching pair matters.
- Names and folder placement are provisional; the owner plans to tidy them (and maybe drop unused sizes)
  in a follow-up pass.
- `libicns` warnings about `ic07`/`ic11`–`ic14` are expected and not fatal; those elements are simply not
  extracted.
