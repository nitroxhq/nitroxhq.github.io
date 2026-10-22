# nitrox — canonical working documentation (v0.1)

> **Status:** Canonical working draft, 2026-10-19. This set consolidates accessible planning sources; it is not exhaustive, and it does not claim that a functioning product exists.

## Overview

**nitrox** is an independent technology initiative with a long-term ambition to make technology better serve people: make tech fun again, fix neglected problems, and help creators and hobbyists create and consume mindfully. The near-term practical focus is the core apps/software ecosystem. Broader ambitions—including consumer hardware, operating systems, games, media, and other brands or divisions—remain part of the organizational vision rather than near-term delivery claims.

The guiding principle **“alignment over assimilation”** means technology should align with people’s goals and lives instead of forcing people into rigid workflows, platform limitations, or growth-driven product decisions.

### Mission themes

Nitrox aims to:
- Make technology more enjoyable, useful, expressive, and humane.
- Help creators and hobbyists create and consume mindfully, not only help professionals optimize work.
- Address neglected problems in UI, UX, platform/version support, interoperability, and meaningful innovation.
- Give people useful tools without unnecessarily restricting their choices or trapping their work in proprietary systems.
- Make room for both productivity and creativity.

Public wording around religious and social values is deliberately **deferred**. Earlier material explicitly mentions Christian values; later planning notes leave the public framing unsettled, including how to express support for LGBTQ+ people. Neither wording is treated here as a settled public position. This decision does not block core product development or this documentation.

## Near-term focus and long-term ambition

| Horizon | Scope | Status |
|---|---|---|
| Near-term focus | Core apps and software ecosystem, starting with feasible software products | Direction confirmed by owner; no functioning products yet |
| Longer-term ambition | Consumer software, hardware, operating systems, games, media, and additional brands/divisions | Preserved from older planning; scope and timing unassigned |

## Current working portfolio

These are **project concepts and intended directions**, not shipped products. No feature described in this document set should be read as implemented.

| Name | Intended direction | Status |
|---|---|---|
| **Tesseract** | A portable, file/offline-first productivity and creativity environment connecting notes, tasks, capture, time, calendar, whiteboards, databases, and related workflows | Core app focus; all functionality planned |
| **Prism** | Intentional RSS, read-later, and social/feed experience | Planning concept; delivery phase unassigned |
| **Niko** | AI coworker / assistant concept | Planning concept; exact scope and relationship to older “NikoBot” name unresolved |
| **Photon** | Browser control and workflows | Planning concept; delivery phase unassigned |
| **Airwaves** | Music experience | Planning concept; relationship to older “AirWave” name unresolved |
| **Orchid** | Local-first design tool | Planning concept |
| **Blueberry** | Digital audio workstation (DAW) concept | Planning concept |
| **Cobalt** | Text editor / IDE concept | Planning concept |

This is a practical near-term software list, not a definitive list of every historic name or long-term ambition. See [MERGE-NOTES.md](MERGE-NOTES.md) for aliases, older concepts, and unresolved mappings.

## Tesseract at a glance

Tesseract is intended to unify creative and productive work without forcing all information into a proprietary database or one rigid organizational method. The documented product intent includes:
- Notes, documents, daily notes, journaling, and jots / quick capture.
- Tasks, subtasks, goals, habits, deadlines, reminders, schedules, and time tracking.
- Calendar and coordination, flashcards, and study workflows.
- Whiteboards, textboarding, graph/map views, spatial canvases, and inline boards.
- Databases and object/tag-based organization alongside folders.
- Reading/watch/listen/play/visit/eat-later lists and media tracking.
- Saving, rediscovering, connecting, and summarizing captured material.
- People/contact context and references between related objects.
- Cross-platform, offline-first, file-first data ownership and optional synchronization.

This is intended scope, not an MVP promise. The full source-documented requirement inventory is in [TESSERACT-REQUIREMENTS.md](TESSERACT-REQUIREMENTS.md). Feature delivery phase is **unassigned** unless explicitly stated.

## Design and architecture direction

### Organizing principle

The current documentation direction separates:
1. **Nitrox parent-brand foundation** — shared values, voice, design principles, and reusable tokens.
2. **Product-specific adaptations** — each app may apply the foundation to its own interface and use cases.

This parent/product distinction is a chosen organizing principle. Exact palette, token values, typography, and styling remain open design decisions.

### Product principles

- **Local/file-first:** user content should remain user-owned, portable, and readable in open formats where practical.
- **Offline-first:** core workflows should not depend on a live network or remote CDN for basic rendering.
- **Human-centered:** reduce unnecessary friction and allow both structured organization and low-effort capture.
- **Portable and adaptable:** avoid forcing a single workflow or proprietary data store.
- **Clear separation:** user capability, implementation choice, and delivery phase are distinct.
- **Honest status:** a plan, scaffold, repository, or deployment artifact is not proof of working product behavior.

The current Tesseract technical proposal suggests Markdown with YAML frontmatter for content, JSON manifests for spatial layouts, a platform abstraction layer, bundled assets, and native/browser storage adapters. These are proposed implementation choices, not verified architecture. See [DESIGN.md](DESIGN.md) and [STATUS.md](STATUS.md).

## Provisional monetization direction

No prices, entitlements, service commitments, or compliance claims are finalized.

| Plan | Provisional direction | Unresolved |
|---|---|---|
| **Free** | Useful core app access; self-hosted SSO should not be gated behind a paid feature | Exact feature allocation, limits, and whether hosted services are included |
| **Paid / Premium** | May include no ads across Nitrox and optional Nitrox-hosted storage or other premium conveniences | Price, storage allowance, feature allocation, and operating costs |
| **Business / Nonprofit** | May add organizational capabilities, compliance-related offerings, and Nitrox-hosted SSO | Eligibility, pricing, administration features, support, standards, validation, and obligations |

Self-hosted SSO should be available without a paid feature gate. This does **not** mean running an identity provider or its supporting infrastructure is cost-free. See [STATUS.md](STATUS.md) and [MERGE-NOTES.md](MERGE-NOTES.md).

## Documentation map

- [STATUS.md](STATUS.md) — current truth, status labels, and actionable TODOs.
- [DESIGN.md](DESIGN.md) — design foundation and proposed architecture.
- [TESSERACT-REQUIREMENTS.md](TESSERACT-REQUIREMENTS.md) — source-documented feature intent and unassigned phases.
- [INTERNAL-DEVELOPMENT.md](INTERNAL-DEVELOPMENT.md) — internal homelab, agent, and AI-assisted development workflow notes.
- [MERGE-NOTES.md](MERGE-NOTES.md) — source inventory, historical names, conflicts, and coverage limitations.

## Source and status rule

This set is the working canonical documentation **for planning**, not proof of implementation. Later Craft material supersedes older Notion wording only where it explicitly changes direction or naming. Notion is generally older; age alone does not make a source worthless, and a later quick AI-generated pass is not automatically authoritative. Where a mapping or decision is not supported, it remains explicitly unresolved.
