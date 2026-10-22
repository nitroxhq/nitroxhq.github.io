# Internal development workflow: AI, agents, and homelab

> This file is for internal development planning only. It does not describe a Nitrox or Tesseract user-facing feature, and it does not verify the performance or availability of any model or workstation.

## Purpose

Planning notes explore using a local workstation/homelab called **Nebulon** to host some development assistance, reducing dependence on a laptop’s resources. This is an internal workflow idea, separate from the product architecture and user-facing AI scope.

## Source-proposed model-routing sketch

| Tier | Intended developer task | Example model in source | Source-stated target | Status |
|---|---|---|---|---|
| 1 | Inline fill-in-the-middle code autocomplete | Qwen 2.5 Coder 0.6B | About 20 tokens/sec | Proposal; not verified |
| 2 | Manual code review/refactoring/lint help | Gemma 3 4B or Qwen 2.5 Coder 7B | About 8–12 or 3–8 tokens/sec, respectively, in one note | Proposal; not verified |
| 3 | Architecture planning and schema design | Cloud tools / Antigravity / Claude 3.5 named in source | No benchmark given | Proposal; no fixed routing policy verified |

The model names and speed estimates are copied as planning assumptions, not performance claims. Hardware allocation and actual model fit require testing.

## Proposed development workflow

- Use small local models for narrow, repetitive tasks only if actual latency and quality are acceptable.
- Invoke larger code review/refactoring assistance deliberately rather than interrupting active work.
- Keep architecture decisions human-reviewed and separate from generated suggestions.
- Keep developer AI configuration out of user-facing product documentation unless a corresponding product feature is separately defined.
- Do not assume that local models, cloud providers, editor extensions, or API endpoints are configured or operational.

## Open internal TODOs

- [ ] Verify workstation resources and current model availability before using any performance estimates.
- [ ] Benchmark latency, quality, RAM/VRAM use, and failure behavior on actual hardware.
- [ ] Define which development data may be sent to cloud models, if any.
- [ ] Document agent instructions and repository boundaries separately from product requirements.
- [ ] Keep secrets, personal data, and sensitive source material out of logs and prompts where possible.
- [ ] Avoid making the Tesseract architecture dependent on the developer’s personal homelab.
