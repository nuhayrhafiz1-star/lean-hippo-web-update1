---
name: leanhippo-design
description: Use this skill to generate well-branded interfaces and assets for LeanHippo Systems & Tech, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the `readme.md` file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick orientation

- **Brand:** LeanHippo Systems & Tech — connected business systems (automation, databases, dashboards, workflows, AI). Serious systems company, not an AI agency. Voice is plain, declarative, operational; sells *control*, not technology. See readme §2 for copy rules.
- **Look:** premium black / graphite / charcoal / soft-white with **cobalt blue (`#1F5EFF`)** as the single technology accent. Dark-glass panels, thin technical lines, the node-network motif, controlled cobalt edge-light (never neon). See readme §3.
- **Type:** **Klik** (light geometric sans, display in ExtraLight) + **JetBrains Mono** (data/labels). ⚠️ The supplied Klik is a watermarked DEMO build — `tokens/fonts.css` restricts its `unicode-range` so digits/symbols fall back to Helvetica. See readme §5.
- **Foundations:** link `styles.css` for all tokens + fonts. Build on the dark canvas.

## Key files
- `styles.css` — link this; it `@import`s every token + font file.
- `tokens/` — colors, typography, spacing, effects (CSS custom properties).
- `assets/logos/` — `leanhippo-{white,cobalt,charcoal}.png` + `-mark-*` (transparent PNGs).
- `assets/network.js` — `<canvas class="lh-network" data-density data-formed data-core data-seed>` node-network background.
- `components/` — React primitives: Button, Badge, Eyebrow, GlassPanel, StatTile, Input. Read each `.prompt.md` for usage. In standalone HTML, load the compiled bundle and read `const { Button } = window.DesignSystem_8aad64`.
- `ui_kits/control-room/` — interactive product dashboard to copy patterns from.
- `catalogue/` — the 22-page Systems Catalogue (reference for layout system, voice, and the node-network bookend).

## Rules of thumb
- One primary (cobalt) action and at most one lit/glowing panel per view.
- Eyebrows & metric labels: tracked UPPERCASE in mono. Headlines: Klik ExtraLight, tight tracking, sentence case.
- Use diagrams (signal paths, layer stacks, node maps, database grids) and the network motif — **not** stock photography, robots, or hand-drawn SVG illustrations.
- Muted enterprise status colors only. No emoji. No neon glow.
- For real numerals/punctuation, supply a licensed Klik (see readme §5).
