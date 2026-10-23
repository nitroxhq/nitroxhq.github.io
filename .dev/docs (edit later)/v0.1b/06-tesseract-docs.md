> **Status:** Intended product scope and source-documented intent — not implementation evidence. No item below is a first-release promise, and no feature is confirmed as implemented. Unless explicitly prioritized later, delivery phase is **phase unassigned**.
>
> Previously `tesseract-requirements.md`. Format follows [00-docs-meta.md](00-docs-meta.md).

# Tesseract — intent and feature reference

## 0. Todos

The quick Gemini pass and architecture material do not cover every requirement. Preserve these TODOs rather than silently narrowing scope.

### Product model

- [ ] Reconcile all requirements against the current product definition, preserving capability intent even where an older technical approach conflicts with the file/offline-first direction.
- [ ] Add a phase assignment only when deliberately prioritized; do not infer MVP scope from the order in this document.
- [ ] Decide the relationship between daily notes, jots, captures, documents, journaling, and tasks.
- [ ] Define how folders, tags, object types, databases, automatic metadata, and AI-assisted tagging compose.
- [ ] Define rediscovery, search, and “related saved content” behavior.
- [ ] Decide which media integrations are realistic and what must remain manual.
- [ ] Define calendar, time tracking, goals/habits, reminders, flashcards, and task scheduling behavior.
- [ ] Decide whether contact/network features belong in Tesseract scope and what data sources would be supported.
- [ ] Reconcile Tesseract Tabs and Astrid boundaries; do not invent a product mapping.

### Technical

- [ ] Decide whether Tauri 2 + React/TypeScript/Vite/Tailwind is the chosen target stack or still a proposal.
- [ ] Define browser behavior and persistence fallback when native filesystem access is unavailable.
- [ ] Specify the portable file format contract, schema versioning, migration strategy, and recovery behavior.
- [ ] Reconcile whiteboard/canvas needs with portable content and layout files; select a rendering approach only after constraints are clear.
- [ ] Confirm which fonts, icons, and dependencies must be bundled for offline rendering.
- [ ] Decide login/account requirements and whether basic local notes can work without cloud or SSO.
- [ ] Choose sync, selective-sync, conflict recovery, and privacy/security behavior.
- [ ] Define what AI, if any, belongs in the user-facing product; keep internal development agents separate.
- [ ] Validate every implementation claim with code, tests, and observable behavior before changing its status from planned to implemented.

## 1. Development status and technical notes

### Current state

No functioning Tesseract product is verified. Repositories, generated scaffolding, planning files, and any deployed artifacts do not establish working behavior. Tesseract is the near-term core-app focus, but “core focus” describes attention, not delivery.

### Proposed stack and data model

These are **proposed implementation choices**, not confirmed architecture:

- **Targets:** desktop/mobile native windows, plus a browser app/PWA.
- **Stack:** Tauri 2 and a Rust core, React, TypeScript strict mode, Vite, Tailwind CSS.
- **Boundary:** a platform abstraction between UI/domain logic and native/browser persistence. Native APIs stay behind adapters instead of being called directly from components.
- **Content:** Markdown files with YAML frontmatter as the portable content store.
- **Layout:** separate JSON workspace/layout manifests (for example a `.tesseract/` directory), so arrangement does not corrupt content.
- **Browser fallback:** File System Access API/OPFS, with IndexedDB or local storage as possible fallback.
- **Validation:** runtime validation of parsed frontmatter and strict typing at the boundaries.
- **Assets:** bundled fonts, icons, and dependencies; no external CDN requirement for core rendering.
- **Storage rule:** no opaque binary blobs as the sole store of user content.

Example proposed frontmatter (not an approved schema):

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

Example proposed layout manifest (not an approved schema):

```json
{
  "canvas_id": "workspace_example",
  "layout": [
    { "card_id": "tess_example", "x": 0, "y": 0, "w": 4, "h": 3 }
  ]
}
```

The sources vary in type names and fields. The schema needs reconciliation and versioning before implementation.

### Deviations from the Nitrox precedent

| Area | Nitrox default | This app | Why | Status |
|---|---|---|---|---|
| App stack | No decided standard yet | Tauri 2 + React + TS + Vite + Tailwind proposed | Desktop plus web from one codebase | Proposed |
| Content storage | Readable, portable formats | Markdown + YAML, JSON layout manifests | Portability and offline use | Proposed |

Tesseract is currently the reference app doc and the source of much of the technical precedent. Its proposed stack is not yet a Nitrox standard; see [00-docs-meta.md](00-docs-meta.md#3-nitrox-technical-precedent).

### Open technical questions

Schema contracts, folder layout, sync protocol, browser/native parity, canvas implementation, and the account model all remain open. See section 0.

## 2. Intent

Tesseract is intended as a connected productivity **and creativity** environment: notes, tasks, capture, time, calendars, whiteboards, flashcards, databases, and related information in one flexible experience. It should reduce the burden of managing separate category-specific apps while keeping users in control of their content and workflow.

The source material uses “Wrotebook” in some older feature notes when describing this same cluster of note/productivity concepts. The mapping between Wrotebook and Tesseract is unresolved; requirements are preserved here as user-capability intent, not as evidence that Wrotebook is a separate current product.

## 3. Feature overview

| Area | What it covers | Capabilities | Detail |
|---|---|---|---|
| Core information and capture | Quick capture, jots, daily notes, journaling, references | 8 | [4.1](#41-core-information-and-capture) |
| Notes, documents, and knowledge | Documents, block editing, views, links, Markdown | 9 | [4.2](#42-notes-documents-and-knowledge) |
| Organization, metadata, and rediscovery | Folders, tags, typed objects, properties, search | 8 | [4.3](#43-organization-metadata-and-rediscovery) |
| Tasks, goals, schedules, and time | Tasks, habits, scheduling, calendar, time tracking | 10 | [4.4](#44-tasks-goals-schedules-and-time) |
| Whiteboards, spatial work, and layout | Boards, canvas, layout files, sidebar, workspace | 9 | [4.5](#45-whiteboards-spatial-work-and-layout) |
| Flashcards, study, and learning | Flashcards, generated study material, review | 4 | [4.6](#46-flashcards-study-and-learning) |
| Media and “later” lists | Read/watch/listen/play later, media tracking | 8 | [4.7](#47-media-and-later-lists) |
| People and contact context | People as objects, context, reminders | 6 | [4.8](#48-people-and-contact-context) |
| Tabs and browser-adjacent workflows | Saved tabs, freeze/backup, note integration | 4 | [4.9](#49-tabs-and-browser-adjacent-workflows) |
| UI, customization, and interaction | Panels, spaces, themes, keyboard, cross-device | 5 | [4.10](#410-ui-customization-and-everyday-interaction) |
| Sync, storage, privacy, and AI | Local-first, offline, sync models, conflict, AI boundary | 10 | [4.11](#411-sync-storage-privacy-and-ai-boundaries) |

All 81 capabilities are **phase unassigned**. The overview is a map, not a priority order.

## 4. Feature reference

### 4.1 Core information and capture

| ID | Intended capability | Source-documented detail | Phase |
|---|---|---|---|
| CAP-01 | Quick capture of anything | Capture should handle more than text and more than todos: save notes, links, media, images, and other information quickly | Phase unassigned |
| CAP-02 | Capture before organizing | Users should be able to save things without first organizing them; later rediscovery should be possible through automatic properties, search, and relationships | Phase unassigned |
| CAP-03 | Jots / quick notes | A new jot should be a core element; jots and longer notes should coexist | Phase unassigned |
| CAP-04 | Daily notes | Daily notes are part of the note workflow; jots may feed into daily notes | Phase unassigned |
| CAP-05 | Journaling | Personal journaling should be supported; it may be separate from daily notes or represented as tagged sections within them | Phase unassigned |
| CAP-06 | Import/scrape saved information | Make it easier to gather information from tabs, websites, articles, transcripts, and other saved content rather than manually copying everything into a document | Phase unassigned |
| CAP-07 | Content references | Inline references should connect tasks with other objects and AI threads or related material | Phase unassigned |
| CAP-08 | Content portability | User content should remain readable and portable in open, non-proprietary formats where feasible | Phase unassigned |

### 4.2 Notes, documents, and knowledge

| ID | Intended capability | Source-documented detail | Phase |
|---|---|---|---|
| NOTE-01 | Notes and documents | General notes and longer-form documents should coexist with tasks and capture | Phase unassigned |
| NOTE-02 | Block-based editing | Block-based editing is included in the inspiration/requirements material | Phase unassigned |
| NOTE-03 | Daily notes and task integration | Tasks should integrate with notes rather than remain in a separate task-only workflow | Phase unassigned |
| NOTE-04 | Inline whiteboards/textboarding | Whiteboards and textboarding should be available alongside notes, including inline use | Phase unassigned |
| NOTE-05 | Outline and graph/map views | Outline, graph, and map-style views are recorded in the UI planning notes | Phase unassigned |
| NOTE-06 | Links and references | Notes, tasks, people, saved content, and other objects should be referencable from one another | Phase unassigned |
| NOTE-07 | Customizable reading/writing interface | Inspiration notes explore both a right sidebar overlaying the current note and a layout that compresses the note window; support for both is an idea, not a decided implementation | Phase unassigned |
| NOTE-08 | Per-document customization | Older brand/design notes request document-level customization beyond the baseline editing experience | Phase unassigned |
| NOTE-09 | Markdown-oriented workflow | Markdown files and open formats are the preferred portable direction; exact editing model remains to be designed | Phase unassigned |

### 4.3 Organization, metadata, and rediscovery

| ID | Intended capability | Source-documented detail | Phase |
|---|---|---|---|
| ORG-01 | Folders and tags together | Folders provide macro-level grouping; tags provide more detailed and cross-cutting organization | Phase unassigned |
| ORG-02 | Typed objects | Object types discussed include calendar events, time-tracking segments, notes/docs, tasks, captures, boards, and images | Phase unassigned |
| ORG-03 | Object properties | Objects may have properties similar to Notion/Obsidian metadata; examples include people or books and app/media-specific attributes | Phase unassigned |
| ORG-04 | Auto-tagging/properties | AI-assisted tags or metadata assignment is explored as a way to reduce manual organization | Phase unassigned |
| ORG-05 | Tag pages / supertags | Tags may have their own overview pages showing how a tag is used across the workspace | Phase unassigned |
| ORG-06 | Rediscovery | Resurface related ideas and content the user has already saved, inspired by visual discovery tools and “serendipity” in saved libraries | Phase unassigned |
| ORG-07 | Search and relationships | Find information through its content, metadata, relationships, and contextual associations | Phase unassigned |
| ORG-08 | Flexible organization | Support both folder-based and object-based approaches; do not force users to choose only one | Phase unassigned |

### 4.4 Tasks, goals, schedules, and time

| ID | Intended capability | Source-documented detail | Phase |
|---|---|---|---|
| TASK-01 | Integrated tasks | Tasks should live alongside notes and related information | Phase unassigned |
| TASK-02 | Subtasks and breakdowns | Complex tasks should be breakable into smaller parts more naturally than rigid todo-app subtasks | Phase unassigned |
| TASK-03 | Deadlines and status | Task metadata examples include status, deadlines, and checkboxes | Phase unassigned |
| TASK-04 | Goals and habits | Goals should be turned into systems and tasks into schedules where helpful; goal/habit systems are within the broader intended scope | Phase unassigned |
| TASK-05 | Scheduling | Calendar and scheduling should work together with tasks and goals | Phase unassigned |
| TASK-06 | Reminders/rescheduling | An older concept describes persistent reminders until a task is rescheduled or marked done; exact reminder behavior remains unassigned | Phase unassigned |
| TASK-07 | Time tracking | Track time as a first-class object/segment and associate time with work | Phase unassigned |
| TASK-08 | Calendar | A calendar “done right” is a named feature area; sources mention a calendar widget and calendar events | Phase unassigned |
| TASK-09 | Coordination | Calendar inspiration includes finding times that work for groups; this is a use case, not a committed team-calendar priority | Phase unassigned |
| TASK-10 | Feature panels/widgets | UI planning mentions a feature/panel area for calendar, todo, flashcards, time tracking, and a mini whiteboard | Phase unassigned |

### 4.5 Whiteboards, spatial work, and layout

| ID | Intended capability | Source-documented detail | Phase |
|---|---|---|---|
| CAN-01 | Whiteboards / textboarding | Freeform boards and textboarding are part of intended scope | Phase unassigned |
| CAN-02 | Inline boards | A board should be usable inline with notes | Phase unassigned |
| CAN-03 | Spatial canvas | Cards/objects may be arranged on a canvas/grid, inspired by spatial workspace tools | Phase unassigned |
| CAN-04 | Separate content and coordinates | User intent is to keep content separate from visual layout; JSON layout manifests are one proposed implementation | Phase unassigned |
| CAN-05 | Canvas persistence/export | Planning explores saving board state locally in JSON; exact format and engine remain undecided | Phase unassigned |
| CAN-06 | Dark-mode fidelity | A technical note rejects simplistic CSS inversion as a substitute for accurate rendering; final rendering approach remains open | Phase unassigned |
| CAN-07 | Workspace organization | UI notes include current space, categorized tab/card groups, uncategorized items, and actions for selecting, grouping, copying, exporting, and closing items in a Tesseract Tabs concept | Phase unassigned |
| CAN-08 | Configurable sidebar | Sidebar is an important planned UI component; behavior/layout not finalized | Phase unassigned |
| CAN-09 | Board/canvas libraries | Sources mention tldraw, Fabric.js, PixiJS, Excalidraw, and other tools as references/options, not selected dependencies | Phase unassigned |

### 4.6 Flashcards, study, and learning

| ID | Intended capability | Source-documented detail | Phase |
|---|---|---|---|
| STUDY-01 | Flashcards | Flashcards are named in feature and panel plans | Phase unassigned |
| STUDY-02 | Generate study material from saved content | AI summaries, asking questions about saved content, quizzes, and flashcards generated from saved material are explored in capture/knowledge notes | Phase unassigned |
| STUDY-03 | Interactive review | Swipe-left/right flashcard review is an inspiration, not a committed interaction design | Phase unassigned |
| STUDY-04 | Audio/podcast-style summaries | Podcast-style summaries of information are mentioned as a possible use case | Phase unassigned |

### 4.7 Media and “later” lists

| ID | Intended capability | Source-documented detail | Phase |
|---|---|---|---|
| MEDIA-01 | Read/watch/listen/play later | Users should be able to tag or capture content for later consumption, including read-later and watch-later workflows | Phase unassigned |
| MEDIA-02 | Broader consumption lists | Source notes expand this to watch, read, game, listen to, visit, and eat later | Phase unassigned |
| MEDIA-03 | Capture from external search | Example: save a searched item and automatically apply relevant read/watch-later tags | Phase unassigned |
| MEDIA-04 | Media tracking | Track watched, played, listened-to, or visited items via integrations where available; other tracking may be manual | Phase unassigned |
| MEDIA-05 | Progress from photos | An exploratory example is photographing a book page and estimating reading progress; feasibility and privacy are unresolved | Phase unassigned |
| MEDIA-06 | Automatic metadata | Assign useful properties to saved items, such as ratings, file sizes, estimated playthrough/reading time, page count, or other type-specific attributes | Phase unassigned |
| MEDIA-07 | Summaries and questions | AI summaries and asking questions about captured content are explored | Phase unassigned |
| MEDIA-08 | Related saved content | Help users rediscover related material already in their own library, not just recommend new material from the wider internet | Phase unassigned |

### 4.8 People and contact context

| ID | Intended capability | Source-documented detail | Phase |
|---|---|---|---|
| PEOPLE-01 | People as objects | Contacts/people are explored as objects that can be referenced in notes and research | Phase unassigned |
| PEOPLE-02 | Context and references | Pull together information, old messages, notes, or jokes related to a person where sources/integrations permit | Phase unassigned |
| PEOPLE-03 | Cross-platform links | Explore associating social accounts, profiles, homepages, and usernames with a person | Phase unassigned |
| PEOPLE-04 | Skills/network tags | Tag people by skills or useful context (for example, potential collaborator or hire); examples are illustrative, not a settled schema | Phase unassigned |
| PEOPLE-05 | Relationship reminders | Reminders to catch up with people are explored | Phase unassigned |
| PEOPLE-06 | Online creators/people | Allow saved profiles of people followed online, not only real-life contacts, and help find potential collaborators | Phase unassigned |

### 4.9 Tabs and browser-adjacent workflows

| ID | Intended capability | Source-documented detail | Phase |
|---|---|---|---|
| TAB-01 | Save tab lists | Save browser tabs or tab groups into a Tesseract list rather than manually copying them into a document | Phase unassigned |
| TAB-02 | Tab freeze/backup | An older idea proposes freezing/backing up a tab set to pause a rabbit hole and return later | Phase unassigned |
| TAB-03 | Connected tab and note workflow | Tabs, notes, tasks, and captures should be able to reference one another | Phase unassigned |
| TAB-04 | Tesseract Tabs concept | UI planning includes spaces, categorized groups, an uncategorized grid, multi-select, copy, add-to-group, export, and close actions | Phase unassigned |

### 4.10 UI, customization, and everyday interaction

| ID | Intended capability | Source-documented detail | Phase |
|---|---|---|---|
| UI-01 | Multiple feature panels | Calendar, todo, flashcards, time tracking, mini-whiteboard, sidebar, outline, graph/map, and sync appear in panel/UI plans | Phase unassigned |
| UI-02 | Space/workspace concept | A current-space control and grouped/uncategorized cards appear in Tesseract Tabs UI notes | Phase unassigned |
| UI-03 | Theme customization | A 90s-inspired theme is explored as an optional customization theme | Phase unassigned |
| UI-04 | Keyboard and efficient actions | UI should make organization and capture easier; exact shortcut system is not specified | Phase unassigned |
| UI-05 | Cross-device access | Product intent spans desktop/mobile and browser targets in architecture notes; actual target support is not verified | Phase unassigned |

### 4.11 Sync, storage, privacy, and AI boundaries

| ID | Intended capability | Source-documented detail | Phase |
|---|---|---|---|
| DATA-01 | Local-first content | Keep user data on the local machine and in open, non-proprietary formats where feasible | Phase unassigned |
| DATA-02 | Offline operation | Core app should not depend on a live internet connection or external CDN for basic rendering | Phase unassigned |
| DATA-03 | Optional synchronization | Sync is discussed as a feature, but exact model is unresolved | Phase unassigned |
| DATA-04 | User-owned storage | Bring-your-own-cloud folders such as Google Drive, OneDrive, or MEGA are proposed as one approach | Phase unassigned |
| DATA-05 | LAN peer-to-peer | Local-network sync is proposed as an option; protocol and conflict strategy unresolved | Phase unassigned |
| DATA-06 | Conflict recovery | Planning suggests automatic merge attempts or a separate `.conflict.md` fallback; this is not a confirmed algorithm | Phase unassigned |
| DATA-07 | Selective sync | Large/old images and files should not necessarily sync unless the user explicitly selects them | Phase unassigned |
| DATA-08 | Configuration sync | Lightweight settings/plugin/workspace metadata sync is proposed separately from content storage | Phase unassigned |
| DATA-09 | Minimal local mode | A note asks whether basic notes should remain available with very little local storage or whether email/SSO and cloud drive should be required; this remains unresolved | Phase unassigned |
| DATA-10 | Local/cloud AI | Sources explore local models and cloud reasoning, but this mainly appears in developer workflow notes; it is not established as a user-facing feature | Phase unassigned |
