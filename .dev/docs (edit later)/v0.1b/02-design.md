# Design and architecture direction

> This document distinguishes owner-confirmed organizing principles from source-proposed implementation details. Nothing here asserts that a functioning interface or architecture exists.

## 1. Design principles

- **People first:** technology should serve users’ goals, not force them into a vendor’s preferred workflow.
- **Alignment over assimilation:** support different ways of thinking and working without turning every use case into the same rigid pattern.
- **Creative and productive:** Tesseract should support both making things and getting things done.
- **Low-friction capture, later rediscovery:** people should be able to save material before they know exactly how to organize it, then find it again through search, metadata, relationships, and relevant resurfacing.
- **Structure without lock-in:** folders, tags, object types, links, databases, and spatial layouts can coexist; no single organization method should own the whole product.
- **Portable data:** prefer readable, user-owned files and documented formats.
- **Offline as a first-class condition:** core UI should not depend on remote CDNs, and core workflows should remain useful without a network where feasible.
- **Honest scope:** visual mockups and proposed architectures describe intent, not implementation.

## 2. Parent brand and product adaptations

The current organizing principle is established: **Nitrox has a shared parent-brand foundation, with app-specific adaptations where useful.** This is not an unresolved question. The exact visual system is unresolved.

The parent foundation should express Nitrox’s mission and voice: useful, humane, expressive, authentic, and willing to fix neglected problems. Individual apps may vary their interface, interaction patterns, and accents to suit their job while remaining recognizably part of the same ecosystem.

### Open visual decision: palette and tokens

The Tesseract `design.md` proposal specifies:
- Obsidian canvas: `#0f0f0f`
- Elevated window/card surface: `#29292d`
- Purple primary: `#A161EA`
- Violet secondary: `#C897FF`
- Nitrox blue accent: `#0B73EE`
- White text with softer white subtitles
- Subtle noise texture and translucent elevated cards

It proposes Inter for primary UI, Instrument Sans for secondary UI, EB Garamond / Instrument Serif for display headings, Geist Mono for code/metadata, and Phosphor Icons in duotone style.

A separate Gemini-generated quick pass proposes a more electric-blue-led palette, including `#3232FF`, `#79ADF2`, dark `#0B0C10`, and light `#F4F6FA`, plus liquid-glass/chrome styling and shared color tokens across the parent brand and flagship apps. That document is explicitly a quick pass, not a final specification; it should contribute ideas but must not silently narrow requirements or override the detailed Tesseract spec.

**Decision needed:** choose the parent palette and decide how product accents adapt it. Keep the parent/product distinction even if the palette remains open.

## 3. Tesseract experience principles

The intended experience combines a connected information system with multiple modes of interaction:
- A quick way to jot or capture without first choosing the perfect folder or schema.
- Later rediscovery through search, automatic properties, tags, links, and related saved items.
- Notes and tasks that reference one another rather than living in separate silos.
- Object types such as notes, tasks, calendar events, time-tracking segments, captures, boards, and images.
- Folders for broad grouping and tags/objects for more detailed or cross-cutting organization.
- Spatial canvas/whiteboard layouts alongside readable content.
- Daily notes and personal journaling, which may be separate or composable.
- A configurable interface rather than a single mandated layout, including exploration of sidebar and overlay behavior.
- Integrated workflows for reading, watching, listening, playing, visiting, and other forms of consumption.

See `06-tesseract-docs.md` for the full feature inventory and delivery-phase status.

## 4. Proposed content and layout model

### User intent

Content should remain portable and human-readable, and spatial arrangement should not corrupt the underlying content. This is the enduring user-facing goal.

### Source-proposed implementation

The October 16 architecture note proposes:
- Content objects stored as Markdown files with YAML frontmatter.
- Metadata for identity, title, type, tags, timestamps, tracked time, and status.
- Spatial positions stored separately in JSON layout/workspace manifests.
- A `.tesseract/` directory for cards and workspace layout data.

An example proposed frontmatter contract:

```yaml
---
id: "tess_<id>"
title: "Document Title"
type: "note"
tags: ["tag1", "tag2"]
created: 2026-10-16T10:00:00Z
updated: 2026-10-16T11:00:00Z
time_tracked: 0
status: "todo"
---
```

An example proposed layout manifest:

```json
{
  "canvas_id": "workspace_example",
  "layout": [
    { "card_id": "tess_example", "x": 0, "y": 0, "w": 4, "h": 3 }
  ]
}
```

These are examples from planning documents, not an approved immutable schema. The sources vary in type names and fields; the schema requires reconciliation and versioning before implementation.

## 5. Proposed technical architecture

The architecture guide proposes a dual-target app:
- Desktop/mobile native windows through Tauri 2 and a Rust core.
- A browser-based web app/PWA.
- React, TypeScript strict mode, Vite, and Tailwind CSS.
- A platform abstraction between UI/domain logic and native/browser persistence.
- Native file access for Markdown/JSON files; browser file APIs/OPFS and IndexedDB/local storage as possible browser paths.
- Bundled fonts/icons/dependencies rather than external CDNs.
- Runtime validation for parsed frontmatter and strict typing.
- No opaque binary blobs as the sole store of user content.

These are **proposed choices**, not confirmed implementation. Browser and native file capabilities differ, and the current sources do not fully resolve how to preserve parity across them.

### Spatial canvas / whiteboard proposal

The architecture notes call the canvas layer “Nitrox Easel Core” and propose separating content from coordinates. They discuss saving a drawing or board state to local JSON and consider libraries such as tldraw, Fabric.js, or PixiJS. This is an implementation exploration, not a selected dependency or working engine.

### Offline requirements

The architecture guide flags remote Google Fonts, CDN-hosted icons, and CDN-loaded JavaScript as problematic for an offline application. It proposes bundling assets and dependencies locally. This is a design requirement; current code has not been verified for it.

## 6. Actionable design trade-offs

These are the decisions supported by the sources and audit. They do not all need to be settled before drafting or planning can continue.

| Trade-off | Options evidenced in sources | Required next step |
|---|---|---|
| Parent/app palette | Shared electric-blue system vs. purple-led Tesseract palette with blue accent | Select parent tokens and app-specific adaptations |
| Native + web persistence | Native filesystem vs. browser File System Access / OPFS / IndexedDB fallback | Define supported behavior and graceful limitations per target |
| Content/layout storage | Markdown + YAML with separate JSON spatial manifest | Reconcile field/type differences; define schema versioning and migrations |
| Canvas engine | Existing library/snapshot APIs vs. custom rendering layer | Compare against required drawing, theme, export, and portability behavior |
| Organization model | Folders, tags, typed objects, databases, AI-assisted tagging | Define how these compose without sacrificing low-friction capture |
| Sync model | User-owned cloud folders, LAN peer-to-peer, lightweight config sync, optional hosted storage | Define conflict behavior, privacy boundaries, selective sync, and operational cost |
| Login/account | No account / minimal local mode vs. email/SSO or cloud requirements | Decide whether account or cloud is ever required for core local use |
| Local/cloud AI | Local models, cloud reasoning, or optional AI | Define product scope and privacy boundaries separately from developer tooling |
| Font/icon strategy | Proposed bundled Inter/Instrument/EB Garamond/Geist Mono and Phosphor | Confirm actual family/token choices and licensing/distribution details |
| Customization | Fixed visual design vs. configurable themes, including a retro/90s-inspired theme idea | Decide what customization is part of product intent and how themes inherit tokens |

## 7. Accessibility and design TODOs

- [ ] Specify contrast requirements and validate the final token palette.
- [ ] Decide motion/reduced-motion, density, keyboard navigation, and focus-state behavior.
- [ ] Preserve a coherent parent-brand foundation while allowing useful app-specific adaptations.
- [ ] Avoid treating glass, blur, glow, noise, or a particular aesthetic as more authoritative than readability and usability.
- [ ] Record which visual decisions are owner-approved versus borrowed inspiration.
