# LeanHippo Systems — Design System

> **LeanHippo Systems & Tech** builds connected business systems using automation, databases, dashboards, workflows, and AI intelligence — helping businesses gain control, capture knowledge, improve visibility, and operate with less dependence on people's memory.

This project is the design system that powers LeanHippo's catalogues, product interfaces, decks, and brand assets. It ships tokens, fonts, brand assets, reusable React components, a product UI kit, and a flagship 22-page Systems Catalogue.

---

## 1. Company & product context

LeanHippo positions itself as a **serious systems company** — not an AI agency, software template vendor, or generic automation shop. It installs *operational infrastructure*: the control layer between a business's people, money, customers, stock, suppliers, approvals, documents, and decisions.

The product family is **"one business nervous system, six organs":**

| Organ | Function | What it controls |
|---|---|---|
| **The Control Room** | Visibility | Live dashboard — cash, sales, stock, tasks, approvals |
| **The Vault** | Money | Controlled financial movement, approvals, audit history |
| **The Switchboard** | Customers | Multi-channel enquiry capture, routing, follow-up |
| **The Playbook** | Knowledge | SOPs, checklists, institutional memory |
| **The Supply Line** | Procurement | Supplier database, purchase flow, reorder logic |
| **The Mind** | Decisions | AI intelligence layer trained on company data |

Everything is sold through one entry point — **The Bottleneck Report** (a diagnostic scan) — and built in controlled stages. Human approval and auditability are always retained: *automation removes drudgery, not authority.*

### Sources provided
- `uploads/LEAN HIPPO Logo Variations.png` — five logo lockups (the hippo-in-circle mark + "LEAN HIPPO CONSULTING" wordmark).
- `uploads/fonnts.com-klik-*.otf` — the **Klik** typeface, weights Thin → Medium (+ Thin/ExtraLight italics).
- A 22-page catalogue brief (exact copy, reproduced verbatim in `catalogue/`).

No codebase or Figma was attached — the product UI (`ui_kits/control-room/`) is an original recreation that expresses LeanHippo's described product surfaces in the brand's visual language.

> ⚠️ **Art-direction note.** The catalogue brief's original art direction (electric-cyan glow, neon futurism, glassmorphism) was **superseded** by the newer brief: *"Move away from heavy cyan glow and neon futurism… darker, sharper, cleaner, more mature. Cobalt blue as the primary technology accent."* This system implements the **cobalt / charcoal / graphite** direction throughout.

---

## 2. Content fundamentals — how LeanHippo writes

The voice is **declarative, plain, and operational.** It sells control, not technology. Read like a premium technical product catalogue for business owners — not a manifesto, not philosophy, not "AI agency" hype.

- **Casing:** Sentence case for headlines and body. Tracked **UPPERCASE** for eyebrows, system labels, and metric captions (set in mono). Title Case for product/organ names ("The Control Room").
- **Person:** Speaks as **"we"** (LeanHippo) to **"you"/"the business"** (the owner). "*We* connect the business *you* already have."
- **Sentence shape:** Short. Often a hard statement followed by a sharper one. *"That is not control. That is dependence."* / *"Not more scattered tools. A connected operating system."*
- **Structure of a feature:** Headline → body → "What it includes" (bulleted) → "How it works / How AI is used" → **Buyer Outcome** (one accented line). *"Leakage becomes visible before it becomes normal."*
- **Numbers & specifics** build credibility: name the layers (four), the organs (six), the steps (six). List real inputs (POS, spreadsheets, forms).
- **No emoji. No exclamation hype. No robots. No buzzword stacking.** Restraint is the brand.
- **AI is framed as a layer, not the product** — *"The Mind"* sits above connected systems and answers from the business's own operating memory.

**Tone examples (verbatim from the catalogue):**
> "We build the systems businesses run on."
> "Most businesses do not have systems. They have people compensating for the lack of them."
> "The business gets capacity. You keep control."
> "You are not buying software. You are gaining a systems team."

---

## 3. Visual foundations

A **premium black / graphite / charcoal / soft-white** system with **cobalt blue** as the single technology accent. Technical, controlled, architectural, enterprise-grade. Think operating-system, not poster.

### Color
- Canvas is near-black (`#050505`); surfaces step up through graphite (`#111317`) and charcoal (`#1C1F24`). See `tokens/colors.css`.
- **Cobalt** (`#1F5EFF`) is the *only* chromatic accent — used for active state, signal paths, lit edges, and one primary action per view. Pale system blue (`#AFC7FF`) carries highlights and links on dark. Deep cobalt (`#123B9F`) adds depth in gradients.
- Status colors are **muted and enterprise** — green `#2FA968` (OK), amber `#C9962E` (pending), a controlled red `#D6504A` (leak/alert). Never loud.
- Secondary copy is technical grey (`#6F7782`); primary text is soft white (`#F4F4F2`), never pure `#FFFFFF` except as edge-light.

### Type
- One typeface: **Klik** — a light, geometric, technical sans. Display tiers run **ExtraLight (200)** with tight tracking (`-0.025em`); titles run Light/Regular; UI and body run Regular/Medium. Klik tops out at Medium (500) — there is no bold; weight contrast comes from pairing ExtraLight display with Regular emphasis.
- **JetBrains Mono** is the companion for data, IDs, metrics, page numbers, and tracked system labels (uppercase, `0.12–0.28em`). See `tokens/typography.css`.
- See "Klik DEMO caveat" below — the supplied files are a watermarked trial build.

### Surfaces, light & depth
- **Dark-glass panels** for dashboards, system cards, data layers, AI interfaces: translucent charcoal/graphite fills + `backdrop-filter: blur(16px)` + a 1px **top edge-light** (`--shadow-edge`).
- **Glow is a controlled edge-light, never neon.** Active/lit panels get a cobalt border (`--border-lit`) and a soft `--glow-md` (24px, 18% alpha). Reserve glow for the *one* active element.
- **Shadows are deep, soft, neutral** (black-based, not blue): `--shadow-md/lg/xl`. Elevation comes from shadow + a faint top highlight, not from heavy borders.
- **Corners are tight & architectural:** controls/chips `4px`, cards/panels `8px`, large glass `12px`, hero `16px`. Pills (`999px`) only for status dots and the occasional avatar.
- **Borders are hairlines.** Default `#2D323A`; subtle work uses low-alpha white lines (`--border-subtle`). Cobalt-tinted lines (`--line-cobalt`) draw signal paths and node links.

### Backgrounds & motifs
- Page canvases use a subtle top radial (graphite → black) — never flat unless intended.
- **Technical grid overlay** (`--grid-fine`, 32–40px) masked to fade out — used sparingly behind hero content.
- **The node network** (`assets/network.js`) is the signature motif: a "business nervous system" of cobalt nodes, hairline links, travelling signal pulses, and an optional bright AI **core**. The catalogue **cover shows it forming** (`data-formed="0.45"`) and the **close shows it complete** (`data-formed="1"` + core) — the two pages bookend.
- **Diagrams over decoration:** signal paths (`Request → Approve → Spend → Record → Review`), layered architecture, node maps, structured database grids. Never stock photography, never generic robots, never SVG illustrations of people.

### Motion
- **Precise and mechanical, never bouncy.** Eases are custom cubic-beziers (`--ease-out`, `--ease-signal`); durations 120–360ms. Slide entrances rise + fade (`translateY(14px)` → 0) gated on `[data-deck-active]` with `forwards` fill so print/paused timelines show content. Signal pulses travel along network edges. No infinite decorative loops on content.

### States
- **Hover:** lighten fill one step and/or shift border to the lit cobalt edge; ghost buttons gain a raised surface. No scale on hover.
- **Press:** `translateY(1px)` on buttons — a small mechanical depress, no color flip.
- **Focus:** cobalt ring (`--glow-focus`, 3px @ 32%) + lit border on inputs.
- **Disabled:** ~45% opacity, `not-allowed`.

### Imagery vibe
Cool, dark, technical. If photography is ever used it should be desaturated, cool-toned, architectural (server rooms, structured space) — but the system **prefers generated diagrams and the node network** over imagery. Logos sit on black, charcoal, cobalt, or (inverted) soft white.

---

## 4. Iconography

LeanHippo has **no proprietary icon set**. This system uses **Lucide** (outline, ~1.6px stroke, rounded caps/joins) as the icon language — it matches the thin, technical line-work of the brand. In `ui_kits/control-room/Views.jsx`, a small `Icon` component renders Lucide path data inline (gauge, vault, message-square, book, truck, brain, search, bell, check, settings, arrow, send, alert). For larger surfaces, link Lucide from CDN.

- **Stroke, not fill.** Keep weight ~1.5–1.6px at 18–20px. Color: `--text-muted` at rest, `--lh-cobalt-100` when active.
- **No emoji. No unicode pictographs as icons.** The only unicode "marks" used decoratively are the middot `·` (label separators), the rotated square diamond (bullet/node), and arrows (`→ ›`).
- The **hippo mark** (`assets/logos/leanhippo-mark-*.png`) is the brand glyph — used in sidebars and compact lockups.

> 🔁 **Substitution flagged:** Lucide stands in for a bespoke icon set. If LeanHippo adopts an official icon family, replace the `ICONS` map and document it here.

---

## 5. The Klik DEMO caveat ⚠️ (please read)

The supplied `klik-*.otf` files are a **watermarked DEMO/trial build.** Several glyphs are replaced with a "DEMO" flower mark, specifically: the **hyphen `-`**, **apostrophe `'`**, **quotes `" '`**, the **digit `4`**, and most ASCII symbols (`! # $ % & ( ) * + / < = > @ [ ] _ { | }` …). Only **letters, digits 0–3 & 5–9, and `, . : ; ?`** are clean.

**How this system handles it:** `tokens/fonts.css` restricts Klik's `unicode-range` to an allowlist of clean glyphs (letters + safe punctuation + space). Everything else — **including all digits** — falls back to the next font in the stack (**Helvetica Neue → Arial**), which is visually compatible. This keeps every page rendering correctly today.

**To finish the brand properly:** obtain a **licensed full version of Klik**, drop the `.otf`s into `assets/fonts/`, and remove the `unicode-range` lines from `tokens/fonts.css` so Klik renders its full glyph set (true numerals, punctuation, symbols).

---

## 6. Project index / manifest

```
styles.css                 ← root entry point (consumers link THIS). @import list only.
tokens/
  fonts.css                ← @font-face for Klik (with DEMO unicode-range allowlist) + JetBrains Mono via styles.css
  colors.css               ← neutral ramp, cobalt ramp, status, glass, lines + semantic aliases
  typography.css           ← families, weights, type scale, line-heights, tracking
  spacing.css              ← 4px spacing scale, layout, z-index
  effects.css              ← radii, borders, shadows, glow, blur, gradients, grid, motion
assets/
  logos/                   ← leanhippo-{white,cobalt,charcoal}.png + matching -mark-* (transparent)
  fonts/                   ← klik-*.otf (DEMO build)
  network.js               ← the node-network motif (<canvas class="lh-network" data-*>)
guidelines/                ← foundation specimen cards (Design System tab)
components/
  core/                    ← Button, Badge, Eyebrow
  surfaces/                ← GlassPanel, StatTile
  forms/                   ← Input
ui_kits/
  control-room/            ← interactive product UI: login → connected dashboard (App + Views + Views2)
catalogue/
  LeanHippo Systems Catalogue.html  ← the flagship 22-page catalogue (deck) + deck-stage.js
SKILL.md                   ← Agent Skill entry point
```

### Components (`window.DesignSystem_8aad64`)
`Button` · `Badge` · `Eyebrow` · `GlassPanel` · `StatTile` · `Input`
Each has a sibling `.d.ts` (props), `.prompt.md` (usage), and a directory card. Reference styling via the CSS custom properties; import React only.

### UI kit
**Control Room** (`ui_kits/control-room/index.html`) — an interactive recreation of LeanHippo's product: a network login → a six-organ dashboard with a live Control Room (KPIs, chart, exceptions), an interactive **Vault** approval queue, and **The Mind** ask-the-business interface with contextual answers.

### Catalogue
**22-Page Systems Catalogue** (`catalogue/`) — the exact catalogue copy, designed as a 1280×720 deck (deck-stage.js: nav, thumbnails, print-to-PDF). Cover and close bookend via the node network forming → fully formed.

---

## 7. Using this system

- **Consumers link one file:** `styles.css`. It reaches every token and font-face.
- **Build on the dark canvas.** Cobalt is precious — one accent action, one lit panel per view.
- **Lean on diagrams and the network motif**, not imagery, for visual weight.
- **Compose components**, don't re-implement them. Match the catalogue's copy voice for any new content.
- Run `check_design_system` after edits.
