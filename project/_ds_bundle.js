/* @ds-bundle: {"format":3,"namespace":"DesignSystem_8aad64","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Eyebrow","sourcePath":"components/core/Eyebrow.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"GlassPanel","sourcePath":"components/surfaces/GlassPanel.jsx"},{"name":"StatTile","sourcePath":"components/surfaces/StatTile.jsx"}],"sourceHashes":{"assets/network.js":"2abb548141a5","catalogue/deck-stage.js":"9436a2deeb46","catalogue/tweaks-panel.jsx":"6591467622ed","components/core/Badge.jsx":"b6e414cd10c4","components/core/Button.jsx":"9bc2ed75e8e9","components/core/Eyebrow.jsx":"89b665b269f2","components/forms/Input.jsx":"ed62685cd4d6","components/surfaces/GlassPanel.jsx":"25c65d044870","components/surfaces/StatTile.jsx":"4313a9f7da52","ui_kits/control-room/App.jsx":"0430f5d993ab","ui_kits/control-room/Views.jsx":"abe320571240","ui_kits/control-room/Views2.jsx":"b59cd8a965e1","ui_kits/website/BookingModal.jsx":"eca8501b52f4","ui_kits/website/BusinessSystems.jsx":"2a86ca3a2c03","ui_kits/website/Landing.jsx":"da3e0b2eca54","ui_kits/website/Shared.jsx":"fa34f88d9564","ui_kits/website/Site.jsx":"0ac9a706a907"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.DesignSystem_8aad64 = window.DesignSystem_8aad64 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// assets/network.js
try { (() => {
/* ============================================================
   LeanHippo — Node Network motif
   The signature "business nervous system": nodes + signal paths
   on a dark canvas. Controlled cobalt edge-light, never neon.

   Usage:
   <canvas class="lh-network" data-density="0.6" data-formed="1"
           data-seed="3"></canvas>
   The canvas sizes to its parent. Options via data-attrs:
     data-density : 0..1  how many links light up
     data-formed  : 0..1  0 = scattered/forming, 1 = connected
     data-seed    : int   layout seed
     data-speed   : signal speed multiplier (default 1)
     data-core    : "1" to draw a bright central AI core
   ============================================================ */
(function () {
  const COBALT = "31,94,255";
  const PALE = "175,199,255";
  function mulberry(a) {
    return function () {
      a |= 0;
      a = a + 0x6D2B79F5 | 0;
      let t = Math.imul(a ^ a >>> 15, 1 | a);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }
  function build(canvas) {
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const density = parseFloat(canvas.dataset.density ?? "0.55");
    const formed = parseFloat(canvas.dataset.formed ?? "1");
    const seed = parseInt(canvas.dataset.seed ?? "1", 10);
    const speed = parseFloat(canvas.dataset.speed ?? "1");
    const hasCore = canvas.dataset.core === "1";
    const rand = mulberry(seed * 2654435761);
    let W = 0,
      H = 0,
      nodes = [],
      edges = [];
    function layout() {
      const r = canvas.getBoundingClientRect();
      W = Math.max(1, r.width);
      H = Math.max(1, r.height);
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(W * H / 24000) + 8;
      nodes = [];
      const cx = W * 0.5,
        cy = H * 0.5;
      for (let i = 0; i < count; i++) {
        // organic scatter; "formed" pulls nodes toward a tidy ring/grid
        const a = rand() * Math.PI * 2;
        const rad = (0.25 + rand() * 0.7) * Math.min(W, H) * 0.6;
        let x = cx + Math.cos(a) * rad * (W / Math.min(W, H));
        let y = cy + Math.sin(a) * rad;
        x = Math.max(16, Math.min(W - 16, x));
        y = Math.max(16, Math.min(H - 16, y));
        nodes.push({
          x,
          y,
          r: 1.4 + rand() * 2.2,
          lit: rand() < 0.32,
          pulse: rand()
        });
      }
      if (hasCore) nodes.push({
        x: cx,
        y: cy,
        r: 6,
        lit: true,
        core: true,
        pulse: 0
      });

      // edges: connect near neighbors
      edges = [];
      for (let i = 0; i < nodes.length; i++) {
        const dists = [];
        for (let j = 0; j < nodes.length; j++) {
          if (i === j) continue;
          const dx = nodes[i].x - nodes[j].x,
            dy = nodes[i].y - nodes[j].y;
          dists.push({
            j,
            d: Math.hypot(dx, dy)
          });
        }
        dists.sort((p, q) => p.d - q.d);
        const k = nodes[i].core ? 6 : 2 + Math.floor(rand() * 2);
        for (let n = 0; n < k && n < dists.length; n++) {
          const j = dists[n].j;
          if (j > i || nodes[i].core || nodes[j].core) {
            const lit = rand() < density;
            edges.push({
              a: i,
              b: j,
              lit,
              phase: rand(),
              len: dists[n].d
            });
          }
        }
      }
    }
    let t0 = performance.now();
    function frame(now) {
      const t = (now - t0) / 1000;
      draw(t);
      raf = requestAnimationFrame(frame);
    }
    function draw(t) {
      ctx.clearRect(0, 0, W, H);

      // edges
      for (const e of edges) {
        const A = nodes[e.a],
          B = nodes[e.b];
        const connected = e.lit ? 1 : formed;
        ctx.beginPath();
        ctx.moveTo(A.x, A.y);
        ctx.lineTo(B.x, B.y);
        ctx.lineWidth = 1;
        ctx.strokeStyle = e.lit ? `rgba(${COBALT},${0.18 + 0.12 * formed})` : `rgba(244,244,242,${0.04 * formed})`;
        ctx.stroke();

        // travelling signal pulse on lit edges
        if (e.lit && formed > 0.4) {
          const p = (t * 0.35 * speed + e.phase) % 1;
          const px = A.x + (B.x - A.x) * p;
          const py = A.y + (B.y - A.y) * p;
          const g = ctx.createRadialGradient(px, py, 0, px, py, 7);
          g.addColorStop(0, `rgba(${PALE},0.9)`);
          g.addColorStop(1, `rgba(${COBALT},0)`);
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(px, py, 7, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // nodes
      for (const nd of nodes) {
        const breathe = 0.5 + 0.5 * Math.sin(t * 1.4 + nd.pulse * 6.28);
        if (nd.core) {
          const R = 9 + breathe * 4;
          const g = ctx.createRadialGradient(nd.x, nd.y, 0, nd.x, nd.y, R * 4);
          g.addColorStop(0, `rgba(${PALE},0.95)`);
          g.addColorStop(0.3, `rgba(${COBALT},0.55)`);
          g.addColorStop(1, `rgba(${COBALT},0)`);
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(nd.x, nd.y, R * 4, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = `rgba(${PALE},1)`;
          ctx.beginPath();
          ctx.arc(nd.x, nd.y, 3.5, 0, Math.PI * 2);
          ctx.fill();
          continue;
        }
        const lit = nd.lit && formed > 0.3;
        if (lit) {
          const R = nd.r + 6 + breathe * 3;
          const g = ctx.createRadialGradient(nd.x, nd.y, 0, nd.x, nd.y, R);
          g.addColorStop(0, `rgba(${COBALT},${0.5 * formed})`);
          g.addColorStop(1, `rgba(${COBALT},0)`);
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(nd.x, nd.y, R, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = lit ? `rgba(${PALE},${0.85})` : `rgba(140,147,158,${0.35 + 0.4 * formed})`;
        ctx.beginPath();
        ctx.arc(nd.x, nd.y, nd.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    let raf;
    function start() {
      cancelAnimationFrame(raf);
      t0 = performance.now();
      raf = requestAnimationFrame(frame);
    }
    layout();
    draw(0);
    start();
    const ro = new ResizeObserver(() => {
      layout();
      draw((performance.now() - t0) / 1000);
    });
    ro.observe(canvas);
    window.addEventListener("beforeprint", () => {/* static frame draws on next rAF */});
  }
  function init() {
    document.querySelectorAll("canvas.lh-network").forEach(c => {
      if (!c.__lhInit) {
        c.__lhInit = true;
        build(c);
      }
    });
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
  window.LHNetwork = {
    init
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "assets/network.js", error: String((e && e.message) || e) }); }

// catalogue/deck-stage.js
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)
/* BEGIN USAGE */
/**
 * <deck-stage> — reusable web component for HTML decks.
 *
 * Handles:
 *  (a) speaker notes — reads <script type="application/json" id="speaker-notes">
 *      and posts {slideIndexChanged: N} to the parent window on nav.
 *  (b) keyboard navigation — ←/→, PgUp/PgDn, Space, Home/End, number keys.
 *      On touch devices, tapping the left/right half of the stage goes
 *      prev/next — taps on links, buttons and other interactive slide
 *      content are left alone.
 *  (c) press R to reset to slide 0 (with a tasteful keyboard hint).
 *  (d) bottom-center overlay showing slide count + hints, fades out on idle.
 *  (e) auto-scaling — inner canvas is a fixed design size (default 1920×1080)
 *      scaled with `transform: scale()` to fit the viewport, letterboxed.
 *      Set the `noscale` attribute to render at authored size (1:1) — the
 *      PPTX exporter sets this so its DOM capture sees unscaled geometry.
 *  (f) print — `@media print` lays every slide out as its own page at the
 *      design size, so the browser's Print → Save as PDF produces a clean
 *      one-page-per-slide PDF with no extra setup.
 *  (g) thumbnail rail — resizable left-hand column of per-slide thumbnails
 *      (static clones). Click to navigate; ↑/↓ with a thumbnail focused to
 *      step between slides; drag to reorder; right-click for
 *      Skip / Move up / Move down / Duplicate / Delete (Delete opens a
 *      Cancel/Delete confirm dialog). Drag the rail's right edge to resize;
 *      width persists to
 *      localStorage. Skipped slides carry `data-deck-skip`, are dimmed in
 *      the rail, omitted from prev/next navigation, and hidden at print.
 *      The rail is suppressed in presenting mode, in the host's Preview
 *      mode (ViewerMode='none'), on `noscale`, on narrow viewports
 *      (≤640px), and via the `no-rail` attribute. Rail mutations dispatch
 *      a `deckchange`
 *      CustomEvent on the element: detail = {action, from, to, slide}.
 *
 * Slides are HIDDEN, not unmounted. Non-active slides stay in the DOM with
 * `visibility: hidden` + `opacity: 0`, so their state (videos, iframes,
 * form inputs, React trees) is preserved across navigation.
 *
 * Lifecycle event — the component dispatches a `slidechange` CustomEvent on
 * itself whenever the active slide changes (including the initial mount).
 * The event bubbles and composes out of shadow DOM, so you can listen on
 * the <deck-stage> element or on document:
 *
 *   document.querySelector('deck-stage').addEventListener('slidechange', (e) => {
 *     e.detail.index         // new 0-based index
 *     e.detail.previousIndex // previous index, or -1 on init
 *     e.detail.total         // total slide count
 *     e.detail.slide         // the new active slide element
 *     e.detail.previousSlide // the prior slide element, or null on init
 *     e.detail.reason        // 'init' | 'keyboard' | 'click' | 'tap' | 'api'
 *   });
 *
 * Persistence: none at the deck level. The host app keeps the current slide
 * in its own URL (?slide=) and re-delivers it via location.hash on load, so a
 * bare load with no hash always starts at slide 1.
 *
 * Usage:
 *   <style>deck-stage:not(:defined){visibility:hidden}</style>
 *   <deck-stage width="1920" height="1080">
 *     <section data-label="Title">...</section>
 *     <section data-label="Agenda">...</section>
 *   </deck-stage>
 *   <script src="deck-stage.js"></script>
 *
 * The :not(:defined) rule prevents a flash of the first slide at its
 * authored styles before this script runs and attaches the shadow root.
 *
 * Slides are the direct element children of <deck-stage>. Each slide is
 * automatically tagged with:
 *   - data-screen-label="NN Label"   (1-indexed, for comment flow)
 *   - data-om-validate="no_overflowing_text,no_overlapping_text,slide_sized_text"
 *
 * Speaker notes stay in sync because the component posts {slideIndexChanged: N}
 * to the parent — just include the #speaker-notes script tag if asked for notes.
 *
 * Authoring guidance:
 *   - Write slide bodies as static HTML inside <deck-stage>, with sizing via
 *     CSS custom properties in a <style> block rather than JS constants.
 *     Static slide markup is what lets the user click a heading in edit mode
 *     and retype it directly; a slide rendered through <script type="text/babel">,
 *     React, or a loop over a JS array has to round-trip every tweak through a
 *     chat message instead. Reach for script-generated slides only when the
 *     content genuinely needs interactive behaviour static HTML can't express.
 *   - Do NOT set position/inset/width/height on the slide <section> elements —
 *     the component absolutely positions every slotted child for you.
 *   - Entrance animations: make the visible end-state the base style and
 *     animate *from* hidden, so print and reduced-motion show content.
 *     Gate the animation on [data-deck-active] and the motion query, e.g.
 *     `@media (prefers-reduced-motion:no-preference){ [data-deck-active] .x{animation:fade-in .5s both} }`.
 *     Avoid infinite decorative loops on slide content.
 */
/* END USAGE */

(() => {
  const DESIGN_W_DEFAULT = 1920;
  const DESIGN_H_DEFAULT = 1080;
  const OVERLAY_HIDE_MS = 1800;
  const VALIDATE_ATTR = 'no_overflowing_text,no_overlapping_text,slide_sized_text';
  const FINE_POINTER_MQ = matchMedia('(hover: hover) and (pointer: fine)');
  const NARROW_MQ = matchMedia('(max-width: 640px)');
  // Slide-authored controls that should keep a tap instead of it navigating.
  const INTERACTIVE_SEL = 'a[href], button, input, select, textarea, summary, label, video[controls], audio[controls], [role="button"], [onclick], [tabindex]:not([tabindex^="-"]), [contenteditable]:not([contenteditable="false" i])';
  const pad2 = n => String(n).padStart(2, '0');

  // Label precedence: data-label → data-screen-label (number stripped) → first heading → "Slide".
  const getSlideLabel = el => {
    const explicit = el.getAttribute('data-label');
    if (explicit) return explicit;
    const existing = el.getAttribute('data-screen-label');
    if (existing) return existing.replace(/^\s*\d+\s*/, '').trim() || existing;
    const h = el.querySelector('h1, h2, h3, [data-title]');
    const t = h && (h.textContent || '').trim().slice(0, 40);
    if (t) return t;
    return 'Slide';
  };
  const stylesheet = `
    :host {
      position: fixed;
      inset: 0;
      display: block;
      background: #000;
      color: #fff;
      font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif;
      overflow: hidden;
      -webkit-tap-highlight-color: transparent;
    }
    /* connectedCallback holds this until document.fonts.ready (capped 2s) so
     * the first visible paint has the deck's real typography + final rail
     * layout. opacity (not visibility) so the active slide can't un-hide
     * itself via the ::slotted([data-deck-active]) visibility:visible rule.
     * Only the stage/rail hide — the black :host background stays, so the
     * iframe doesn't flash the page's default white. */
    :host([data-fonts-pending]) .stage,
    :host([data-fonts-pending]) .rail { opacity: 0; pointer-events: none; }

    .stage {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .canvas {
      position: relative;
      transform-origin: center center;
      flex-shrink: 0;
      background: #fff;
      will-change: transform;
    }

    /* Slides live in light DOM (via <slot>) so authored CSS still applies.
       We absolutely position each slotted child to stack them. */
    ::slotted(*) {
      position: absolute !important;
      inset: 0 !important;
      width: 100% !important;
      height: 100% !important;
      box-sizing: border-box !important;
      overflow: hidden;
      opacity: 0;
      pointer-events: none;
      visibility: hidden;
    }
    ::slotted([data-deck-active]) {
      opacity: 1;
      pointer-events: auto;
      visibility: visible;
    }

    .overlay {
      position: fixed;
      left: 50%;
      bottom: 22px;
      transform: translate(-50%, 6px) scale(0.92);
      filter: blur(6px);
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 4px;
      background: #000;
      color: #fff;
      border-radius: 999px;
      font-size: 12px;
      font-feature-settings: "tnum" 1;
      letter-spacing: 0.01em;
      opacity: 0;
      pointer-events: none;
      transition: opacity 260ms ease, transform 260ms cubic-bezier(.2,.8,.2,1), filter 260ms ease;
      transform-origin: center bottom;
      z-index: 2147483000;
      user-select: none;
    }
    .overlay[data-visible] {
      opacity: 1;
      pointer-events: auto;
      transform: translate(-50%, 0) scale(1);
      filter: blur(0);
    }

    .btn {
      appearance: none;
      -webkit-appearance: none;
      background: transparent;
      border: 0;
      margin: 0;
      padding: 0;
      color: inherit;
      font: inherit;
      cursor: default;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      height: 28px;
      min-width: 28px;
      border-radius: 999px;
      color: rgba(255,255,255,0.72);
      transition: background 140ms ease, color 140ms ease;
      -webkit-tap-highlight-color: transparent;
    }
    .btn:hover { background: rgba(255,255,255,0.12); color: #fff; }
    .btn:active { background: rgba(255,255,255,0.18); }
    .btn:focus { outline: none; }
    .btn:focus-visible { outline: none; }
    .btn::-moz-focus-inner { border: 0; }
    .btn svg { width: 14px; height: 14px; display: block; }
    .btn.reset {
      font-size: 11px;
      font-weight: 500;
      letter-spacing: 0.02em;
      padding: 0 10px 0 12px;
      gap: 6px;
      color: rgba(255,255,255,0.72);
    }
    .btn.reset .kbd {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 16px;
      height: 16px;
      padding: 0 4px;
      font-family: ui-monospace, "SF Mono", Menlo, Consolas, monospace;
      font-size: 10px;
      line-height: 1;
      color: rgba(255,255,255,0.88);
      background: rgba(255,255,255,0.12);
      border-radius: 4px;
    }

    .count {
      font-variant-numeric: tabular-nums;
      color: #fff;
      font-weight: 500;
      padding: 0 8px;
      min-width: 42px;
      text-align: center;
      font-size: 12px;
    }
    .count .sep { color: rgba(255,255,255,0.45); margin: 0 3px; font-weight: 400; }
    .count .total { color: rgba(255,255,255,0.55); }

    .divider {
      width: 1px;
      height: 14px;
      background: rgba(255,255,255,0.18);
      margin: 0 2px;
    }

    /* ── Thumbnail rail ──────────────────────────────────────────────────
       Fixed column on the left; each thumbnail is a static deep-clone of
       the light-DOM slide scaled into a 16:9 (or design-aspect) frame. The
       stage re-fits around it (see _fit); hidden during present / noscale
       / print so capture geometry and fullscreen output are unchanged. */
    .rail {
      position: fixed;
      left: 0;
      top: 0;
      bottom: 0;
      width: var(--deck-rail-w, 188px);
      background: #141414;
      border-right: 1px solid rgba(255,255,255,0.08);
      overflow-y: auto;
      overflow-x: hidden;
      padding: 12px 10px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      gap: 12px;
      z-index: 2147482500;
      scrollbar-width: thin;
      scrollbar-color: rgba(255,255,255,0.18) transparent;
    }
    .rail::-webkit-scrollbar { width: 8px; }
    .rail::-webkit-scrollbar-track { background: transparent; margin: 2px; }
    .rail::-webkit-scrollbar-thumb {
      background: rgba(255,255,255,0.18);
      border-radius: 4px;
      border: 2px solid transparent;
      background-clip: content-box;
    }
    .rail::-webkit-scrollbar-thumb:hover {
      background: rgba(255,255,255,0.28);
      border: 2px solid transparent;
      background-clip: content-box;
    }
    :host([no-rail]) .rail,
    :host([noscale]) .rail { display: none; }
    .rail[data-presenting] { display: none; }
    @media (max-width: 640px) {
      .rail, .rail-resize { display: none; }
    }
    /* User-driven show/hide (the TweaksPanel toggle) slides instead of
       popping. Transitions are gated on :host([data-rail-anim]) — set only
       for the 200ms around the toggle — so window-resize and rail-width
       drag (which also call _fit) don't lag behind the cursor. */
    .rail[data-user-hidden] { transform: translateX(-100%); }
    :host([data-rail-anim]) .rail { transition: transform 200ms cubic-bezier(.3,.7,.4,1); }
    :host([data-rail-anim]) .stage { transition: left 200ms cubic-bezier(.3,.7,.4,1); }
    :host([data-rail-anim]) .canvas { transition: transform 200ms cubic-bezier(.3,.7,.4,1); }
    /* transition shorthand replaces rather than merges — repeat the base
       .overlay opacity/transform/filter transitions so visibility changes
       during the 200ms toggle window still fade instead of popping. */
    :host([data-rail-anim]) .overlay {
      transition: margin-left 200ms cubic-bezier(.3,.7,.4,1),
                  opacity 260ms ease,
                  transform 260ms cubic-bezier(.2,.8,.2,1),
                  filter 260ms ease;
    }

    .thumb {
      position: relative;
      display: flex;
      align-items: flex-start;
      gap: 8px;
      cursor: pointer;
      user-select: none;
    }
    .thumb .num {
      width: 16px;
      flex-shrink: 0;
      font-size: 11px;
      font-weight: 500;
      text-align: right;
      color: rgba(255,255,255,0.55);
      padding-top: 2px;
      font-variant-numeric: tabular-nums;
    }
    .thumb .frame {
      position: relative;
      flex: 1;
      min-width: 0;
      aspect-ratio: var(--deck-aspect);
      background: #fff;
      border-radius: 4px;
      outline: 2px solid transparent;
      outline-offset: 0;
      overflow: hidden;
      transition: outline-color 120ms ease;
    }
    .thumb:hover .frame { outline-color: rgba(255,255,255,0.25); }
    .thumb { outline: none; }
    .thumb:focus-visible .frame { outline-color: rgba(255,255,255,0.5); }
    .thumb[data-current] .num { color: #fff; }
    .thumb[data-current] .frame { outline-color: #D97757; }
    .thumb[data-dragging] { opacity: 0.35; }
    .thumb::before {
      content: '';
      position: absolute;
      left: 24px;
      right: 0;
      height: 3px;
      border-radius: 2px;
      background: #D97757;
      opacity: 0;
      pointer-events: none;
    }
    .thumb[data-drop="before"]::before { top: -8px; opacity: 1; }
    .thumb[data-drop="after"]::before { bottom: -8px; opacity: 1; }
    .thumb[data-skip] .frame { opacity: 0.35; }
    .thumb[data-skip] .frame::after {
      content: 'Skipped';
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0,0,0,0.45);
      color: #fff;
      font-size: 10px;
      font-weight: 500;
      letter-spacing: 0.04em;
    }

    .ctxmenu {
      position: fixed;
      min-width: 150px;
      padding: 4px;
      background: #242424;
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: 7px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.45);
      z-index: 2147483100;
      display: none;
      font-size: 12px;
    }
    .ctxmenu[data-open] { display: block; }
    .ctxmenu button {
      display: block;
      width: 100%;
      appearance: none;
      border: 0;
      background: transparent;
      color: #e8e8e8;
      font: inherit;
      text-align: left;
      padding: 6px 10px;
      border-radius: 4px;
      cursor: pointer;
    }
    .ctxmenu button:hover:not(:disabled) { background: rgba(255,255,255,0.08); }
    .ctxmenu button:disabled { opacity: 0.35; cursor: default; }
    .ctxmenu hr {
      border: 0;
      border-top: 1px solid rgba(255,255,255,0.1);
      margin: 4px 2px;
    }

    .rail-resize {
      position: fixed;
      left: calc(var(--deck-rail-w, 188px) - 3px);
      top: 0;
      bottom: 0;
      width: 6px;
      cursor: col-resize;
      z-index: 2147482600;
      touch-action: none;
    }
    .rail-resize:hover,
    .rail-resize[data-dragging] { background: rgba(255,255,255,0.12); }
    :host([no-rail]) .rail-resize,
    :host([noscale]) .rail-resize,
    .rail[data-presenting] + .rail-resize,
    .rail[data-user-hidden] + .rail-resize { display: none; }

    /* Delete-confirm popup — matches the SPA's ConfirmDialog layout
       (title + message body, depressed footer with Cancel / Delete). */
    .confirm-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.45);
      z-index: 2147483200;
      display: none;
      align-items: center;
      justify-content: center;
    }
    .confirm-backdrop[data-open] { display: flex; }
    .confirm {
      width: 320px;
      max-width: calc(100vw - 32px);
      background: #2a2a2a;
      color: #e8e8e8;
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: 12px;
      box-shadow: 0 12px 32px rgba(0,0,0,0.5);
      overflow: hidden;
      font-family: inherit;
      animation: deck-confirm-in 0.18s ease;
    }
    @keyframes deck-confirm-in {
      from { opacity: 0; transform: scale(0.96); }
      to { opacity: 1; transform: scale(1); }
    }
    .confirm .body { padding: 20px 20px 16px; }
    .confirm .title { font-size: 14px; font-weight: 600; margin-bottom: 4px; }
    .confirm .msg { font-size: 13px; line-height: 1.5; color: rgba(255,255,255,0.65); }
    .confirm .footer {
      padding: 14px 20px;
      background: #1f1f1f;
      border-top: 1px solid rgba(255,255,255,0.08);
      display: flex;
      justify-content: flex-end;
      gap: 8px;
    }
    .confirm button {
      appearance: none;
      font: inherit;
      font-size: 13px;
      font-weight: 500;
      padding: 8px 16px;
      border-radius: 8px;
      cursor: pointer;
    }
    .confirm .cancel {
      background: transparent;
      border: 0;
      color: rgba(255,255,255,0.8);
    }
    .confirm .cancel:hover { background: rgba(255,255,255,0.08); }
    .confirm .danger {
      background: #c96442;
      border: 1px solid rgba(0,0,0,0.15);
      color: #fff;
      box-shadow: 0 1px 3px rgba(166,50,68,0.3), 0 2px 6px rgba(166,50,68,0.18);
    }
    .confirm .danger:hover { background: #b5563a; }

    /* ── Print: one page per slide, no chrome ────────────────────────────
       The screen layout stacks every slide at inset:0 inside a scaled
       canvas; for print we want them in document flow at the authored
       design size so the browser paginates one slide per sheet. The
       @page size is set from the width/height attributes via the inline
       <style id="deck-stage-print-page"> that connectedCallback injects
       into <head> (the @page at-rule has no effect inside shadow DOM). */
    @media print {
      :host {
        position: static;
        inset: auto;
        background: none;
        overflow: visible;
        color: inherit;
      }
      .stage { position: static; display: block; }
      .canvas {
        transform: none !important;
        width: auto !important;
        height: auto !important;
        background: none;
        will-change: auto;
      }
      ::slotted(*) {
        position: relative !important;
        inset: auto !important;
        width: var(--deck-design-w) !important;
        height: var(--deck-design-h) !important;
        box-sizing: border-box !important;
        opacity: 1 !important;
        visibility: visible !important;
        pointer-events: auto;
        break-after: page;
        page-break-after: always;
        break-inside: avoid;
        overflow: hidden;
      }
      /* :last-child alone isn't enough once data-deck-skip hides the
         trailing slide(s) — the last *visible* slide still carries
         break-after:page and prints a blank sheet. _markLastVisible()
         maintains data-deck-last-visible on the last non-skipped slide. */
      ::slotted(*:last-child),
      ::slotted([data-deck-last-visible]) {
        break-after: auto;
        page-break-after: auto;
      }
      ::slotted([data-deck-skip]) { display: none !important; }
      .overlay, .rail, .rail-resize, .ctxmenu, .confirm-backdrop { display: none !important; }
    }
  `;
  class DeckStage extends HTMLElement {
    static get observedAttributes() {
      return ['width', 'height', 'noscale', 'no-rail'];
    }
    constructor() {
      super();
      this._root = this.attachShadow({
        mode: 'open'
      });
      this._index = 0;
      this._slides = [];
      this._notes = [];
      this._hideTimer = null;
      this._mouseIdleTimer = null;
      this._menuIndex = -1;
      this._onKey = this._onKey.bind(this);
      this._onResize = this._onResize.bind(this);
      this._onSlotChange = this._onSlotChange.bind(this);
      this._onMouseMove = this._onMouseMove.bind(this);
      this._onTap = this._onTap.bind(this);
      this._onMessage = this._onMessage.bind(this);
      // Capture-phase close so a click anywhere dismisses the menu, but
      // ignore clicks that land inside the menu itself — otherwise the
      // capture handler runs before the menu's own (bubble) handler and
      // clears _menuIndex out from under it.
      this._onDocClick = e => {
        if (this._menu && e.composedPath && e.composedPath().includes(this._menu)) return;
        this._closeMenu();
      };
    }
    get designWidth() {
      return parseInt(this.getAttribute('width'), 10) || DESIGN_W_DEFAULT;
    }
    get designHeight() {
      return parseInt(this.getAttribute('height'), 10) || DESIGN_H_DEFAULT;
    }
    connectedCallback() {
      // Presenter-view popup loads deckUrl?_snthumb=...#N for its prev/cur/
      // next thumbnails — the rail has no business rendering inside those
      // (wrong scale, and it offsets the stage so the thumb shows a gutter).
      if (/[?&]_snthumb=/.test(location.search)) this.setAttribute('no-rail', '');
      this._render();
      this._loadNotes();
      this._syncPrintPageRule();
      window.addEventListener('keydown', this._onKey);
      window.addEventListener('resize', this._onResize);
      window.addEventListener('mousemove', this._onMouseMove, {
        passive: true
      });
      window.addEventListener('message', this._onMessage);
      window.addEventListener('click', this._onDocClick, true);
      this.addEventListener('click', this._onTap);
      // Print lays every slide out as its own page, so [data-deck-active]-
      // gated entrance styles need the attribute on every slide (not just
      // the current one) or their content prints at the hidden base style.
      // The transient freeze style lands BEFORE the attributes so any
      // attribute-keyed transition fires at 0s (changing transition-
      // duration after a transition has started doesn't affect it).
      this._onBeforePrint = () => {
        if (this._freezeStyle) this._freezeStyle.remove();
        this._freezeStyle = document.createElement('style');
        this._freezeStyle.textContent = '*,*::before,*::after{transition-duration:0s !important}';
        document.head.appendChild(this._freezeStyle);
        this._slides.forEach(s => s.setAttribute('data-deck-active', ''));
      };
      this._onAfterPrint = () => {
        this._applyIndex({
          showOverlay: false,
          broadcast: false
        });
        if (this._freezeStyle) {
          this._freezeStyle.remove();
          this._freezeStyle = null;
        }
      };
      window.addEventListener('beforeprint', this._onBeforePrint);
      window.addEventListener('afterprint', this._onAfterPrint);
      // Initial collection + layout happens via slotchange, which fires on mount.
      this._enableRail();
      // Hold the stage hidden until webfonts are ready so the first visible
      // paint has the deck's real typography — the :not(:defined) guard in
      // the page HTML only covers custom-element upgrade, not font load.
      // Capped so a 404'd font URL can't blank the deck indefinitely.
      this.setAttribute('data-fonts-pending', '');
      const reveal = () => this.removeAttribute('data-fonts-pending');
      // rAF first: fonts.ready is a pre-resolved promise until layout has
      // resolved the slotted text's font-family and pushed a FontFace into
      // 'loading'. Reading it here in connectedCallback (parse-time) would
      // settle the race in a microtask before any font fetch starts.
      requestAnimationFrame(() => {
        Promise.race([document.fonts ? document.fonts.ready : Promise.resolve(), new Promise(r => setTimeout(r, 2000))]).then(reveal, reveal);
      });
    }
    _enableRail() {
      // Idempotent — older host builds still post __omelette_rail_enabled.
      // no-rail guard keeps the observers/stylesheet walk off the cheap path
      // for presenter-popup thumbnail iframes (up to 9 per view).
      if (this._railEnabled || this.hasAttribute('no-rail')) return;
      this._railEnabled = true;
      // Per-viewer preference — restored alongside rail width. Default on;
      // only a stored '0' (from the TweaksPanel toggle) hides it.
      this._railVisible = true;
      try {
        if (localStorage.getItem('deck-stage.railVisible') === '0') this._railVisible = false;
      } catch (e) {}
      // Live thumbnail updates: watch the light-DOM slides for content
      // edits and re-clone just the affected thumb(s), debounced. Ignore
      // the data-deck-* / data-screen-label / data-om-validate attributes
      // this component itself writes so nav and skip don't trigger
      // spurious refreshes.
      const OWN_ATTRS = /^data-(deck-|screen-label$|om-validate$)/;
      this._liveDirty = new Set();
      this._liveObserver = new MutationObserver(records => {
        for (const r of records) {
          if (r.type === 'attributes' && OWN_ATTRS.test(r.attributeName || '')) continue;
          let n = r.target;
          while (n && n.parentElement !== this) n = n.parentElement;
          if (n && this._slideSet && this._slideSet.has(n)) this._liveDirty.add(n);
        }
        if (this._liveDirty.size && !this._liveTimer) {
          this._liveTimer = setTimeout(() => {
            this._liveTimer = null;
            this._liveDirty.forEach(s => this._refreshThumb(s));
            this._liveDirty.clear();
          }, 200);
        }
      });
      this._liveObserver.observe(this, {
        subtree: true,
        childList: true,
        characterData: true,
        attributes: true
      });
      // Lazy thumbnail materialization — clone the slide only when its
      // frame scrolls into (or near) the rail viewport. rootMargin gives
      // ~4 thumbs of pre-load so fast scrolling doesn't flash blanks.
      this._railObserver = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting && e.target.__deckThumb) {
            this._materialize(e.target.__deckThumb);
          }
        });
      }, {
        root: this._rail,
        rootMargin: '400px 0px'
      });
      // Tweaks typically change CSS vars / attrs OUTSIDE <deck-stage>
      // (on <html>, <body>, a wrapper div, or a <style> tag), which
      // _liveObserver can't see. Re-snapshot author CSS (constructable
      // sheet is shared by reference, so one replaceSync updates every
      // thumb shadow root) and re-sync each thumb host's attrs + custom
      // properties. In-slide DOM mutations are _liveObserver's job.
      // Debounced so slider drags don't thrash.
      this._onTweakChange = () => {
        clearTimeout(this._tweakTimer);
        this._tweakTimer = setTimeout(() => {
          this._snapshotAuthorCss();
          // One getComputedStyle for the whole batch — each
          // getPropertyValue read below reuses the same computed style
          // as long as nothing invalidates layout between thumbs.
          const cs = getComputedStyle(this);
          (this._thumbs || []).forEach(t => {
            if (t.host) this._syncThumbHostAttrs(t.host, cs);
          });
        }, 120);
      };
      window.addEventListener('tweakchange', this._onTweakChange);
      this._snapshotAuthorCss();
      // Build the rail now that it's enabled — slotchange already fired,
      // so _renderRail's early-return skipped the initial build.
      this._syncRailHidden();
      this._renderRail();
      this._fit();
    }

    /** Snapshot document stylesheets into a constructable sheet that each
     *  thumbnail's nested shadow root adopts — so author CSS styles the
     *  cloned slide content without touching this component's chrome.
     *  Cross-origin sheets throw on .cssRules — skip them. Re-callable:
     *  the existing constructable sheet is reused via replaceSync so every
     *  already-adopted shadow root picks up the fresh CSS without re-adopt. */
    _snapshotAuthorCss() {
      // :root in an adopted sheet inside a shadow root matches nothing
      // (only the document root qualifies), so author rules like
      // `:root[data-voice="modern"] .serif` never reach the clones.
      // Rewrite :root → :host and mirror <html>'s data-*/class/lang onto
      // each thumb host (see _syncThumbHostAttrs) so the same selectors
      // match inside the thumbnail's shadow tree.
      const authorCss = Array.from(document.styleSheets).map(sh => {
        try {
          return Array.from(sh.cssRules).map(r => r.cssText).join('\n');
        } catch (e) {
          return '';
        }
      }).join('\n')
      // The shadow host is featureless outside the functional :host(...)
      // form, so any compound on :root — [attr], .class, #id, :pseudo —
      // must become :host(<compound>) not :host<compound>. Same for the
      // html type selector (Tailwind class-strategy dark mode emits
      // html.dark; Pico uses html[data-theme]), which has nothing to
      // match inside the thumb's shadow tree.
      .replace(/:root((?:\[[^\]]*\]|[.#][-\w]+|:[-\w]+(?:\([^)]*\))?)+)/g, ':host($1)').replace(/:root\b/g, ':host').replace(/(^|[\s,>~+(}])html((?:\[[^\]]*\]|[.#][-\w]+|:[-\w]+(?:\([^)]*\))?)+)(?![-\w])/g, '$1:host($2)').replace(/(^|[\s,>~+(}])html(?![-\w])/g, '$1:host');
      // Every custom property the author references. _syncThumbHostAttrs
      // mirrors each one's *computed* value at <deck-stage> onto the
      // thumb host so the live value wins over the :host default above
      // regardless of which ancestor the tweak wrote to (<html>, <body>,
      // a wrapper div, or the deck-stage element itself all inherit
      // down to getComputedStyle(this)).
      this._authorVars = new Set(authorCss.match(/--[\w-]+/g) || []);
      try {
        if (!this._adoptedSheet) this._adoptedSheet = new CSSStyleSheet();
        this._adoptedSheet.replaceSync(authorCss);
      } catch (e) {
        this._adoptedSheet = null;
        this._authorCss = authorCss;
      }
    }
    _syncThumbHostAttrs(host, cs) {
      const de = document.documentElement;
      // setAttribute overwrites but can't delete — an attr removed from
      // <html> (toggleAttribute off, classList emptied) would linger on
      // the host and :host([data-*]) / :host(.foo) rules would keep
      // matching. Remove stale mirrored attrs first; iterate backward
      // because removeAttribute mutates the live NamedNodeMap.
      for (let i = host.attributes.length - 1; i >= 0; i--) {
        const n = host.attributes[i].name;
        if ((n.startsWith('data-') || n === 'class' || n === 'lang') && !de.hasAttribute(n)) {
          host.removeAttribute(n);
        }
      }
      for (const a of de.attributes) {
        if (a.name.startsWith('data-') || a.name === 'class' || a.name === 'lang') {
          host.setAttribute(a.name, a.value);
        }
      }
      // The :root→:host rewrite in _snapshotAuthorCss pins each custom
      // property to its stylesheet default on the thumb host, shadowing
      // the live value that would otherwise inherit. Tweaks can write the
      // live value on any ancestor — <html>, <body>, a wrapper div, the
      // deck-stage element — so read it as the *computed* value at
      // <deck-stage> (which sees the whole inheritance chain) rather than
      // trying to guess which element the author wrote to. Inline on the
      // host beats the :host{} rule. remove-stale covers vars dropped
      // from the stylesheet between snapshots.
      const vars = this._authorVars || new Set();
      for (let i = host.style.length - 1; i >= 0; i--) {
        const p = host.style[i];
        if (p.startsWith('--') && !vars.has(p)) host.style.removeProperty(p);
      }
      const live = cs || getComputedStyle(this);
      vars.forEach(p => {
        const v = live.getPropertyValue(p);
        if (v) host.style.setProperty(p, v.trim());else host.style.removeProperty(p);
      });
    }
    disconnectedCallback() {
      window.removeEventListener('keydown', this._onKey);
      window.removeEventListener('resize', this._onResize);
      window.removeEventListener('mousemove', this._onMouseMove);
      window.removeEventListener('message', this._onMessage);
      window.removeEventListener('click', this._onDocClick, true);
      window.removeEventListener('beforeprint', this._onBeforePrint);
      window.removeEventListener('afterprint', this._onAfterPrint);
      if (this._freezeStyle) {
        this._freezeStyle.remove();
        this._freezeStyle = null;
      }
      this.removeEventListener('click', this._onTap);
      if (this._hideTimer) clearTimeout(this._hideTimer);
      if (this._mouseIdleTimer) clearTimeout(this._mouseIdleTimer);
      if (this._liveTimer) clearTimeout(this._liveTimer);
      if (this._tweakTimer) clearTimeout(this._tweakTimer);
      if (this._railAnimTimer) clearTimeout(this._railAnimTimer);
      if (this._scaleRaf) cancelAnimationFrame(this._scaleRaf);
      if (this._liveObserver) this._liveObserver.disconnect();
      if (this._railObserver) this._railObserver.disconnect();
      if (this._onTweakChange) window.removeEventListener('tweakchange', this._onTweakChange);
    }
    attributeChangedCallback() {
      if (this._canvas) {
        this._canvas.style.width = this.designWidth + 'px';
        this._canvas.style.height = this.designHeight + 'px';
        this._canvas.style.setProperty('--deck-design-w', this.designWidth + 'px');
        this._canvas.style.setProperty('--deck-design-h', this.designHeight + 'px');
        if (this._rail) {
          this._rail.style.setProperty('--deck-aspect', this.designWidth + '/' + this.designHeight);
        }
        this._fit();
        this._scaleThumbs();
        this._syncPrintPageRule();
      }
    }
    _render() {
      const style = document.createElement('style');
      style.textContent = stylesheet;
      const stage = document.createElement('div');
      stage.className = 'stage';
      const canvas = document.createElement('div');
      canvas.className = 'canvas';
      canvas.style.width = this.designWidth + 'px';
      canvas.style.height = this.designHeight + 'px';
      canvas.style.setProperty('--deck-design-w', this.designWidth + 'px');
      canvas.style.setProperty('--deck-design-h', this.designHeight + 'px');
      const slot = document.createElement('slot');
      slot.addEventListener('slotchange', this._onSlotChange);
      canvas.appendChild(slot);
      stage.appendChild(canvas);

      // Overlay: compact, solid black, with clickable controls.
      const overlay = document.createElement('div');
      overlay.className = 'overlay export-hidden';
      overlay.setAttribute('role', 'toolbar');
      overlay.setAttribute('aria-label', 'Deck controls');
      overlay.setAttribute('data-omelette-chrome', '');
      overlay.innerHTML = `
        <button class="btn prev" type="button" aria-label="Previous slide" title="Previous (←)">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 3L5 8l5 5"/></svg>
        </button>
        <span class="count" aria-live="polite"><span class="current">1</span><span class="sep">/</span><span class="total">1</span></span>
        <button class="btn next" type="button" aria-label="Next slide" title="Next (→)">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 3l5 5-5 5"/></svg>
        </button>
        <span class="divider"></span>
        <button class="btn reset" type="button" aria-label="Reset to first slide" title="Reset (R)">Reset<span class="kbd">R</span></button>
      `;
      overlay.querySelector('.prev').addEventListener('click', () => this._advance(-1, 'click'));
      overlay.querySelector('.next').addEventListener('click', () => this._advance(1, 'click'));
      overlay.querySelector('.reset').addEventListener('click', () => this._go(0, 'click'));

      // Thumbnail rail + context menu. Thumbnails are populated in
      // _renderRail() after _collectSlides().
      const rail = document.createElement('div');
      rail.className = 'rail export-hidden';
      rail.setAttribute('data-omelette-chrome', '');
      rail.style.setProperty('--deck-aspect', this.designWidth + '/' + this.designHeight);
      // Edge auto-scroll while dragging a thumb near the rail's top/bottom
      // so off-screen drop targets are reachable. Native dragover fires
      // continuously while the pointer is stationary, so a per-event nudge
      // (ramped by edge proximity) is enough — no rAF loop needed.
      rail.addEventListener('dragover', e => {
        if (this._dragFrom == null) return;
        const r = rail.getBoundingClientRect();
        const EDGE = 40;
        const dt = e.clientY - r.top;
        const db = r.bottom - e.clientY;
        if (dt < EDGE) rail.scrollTop -= Math.ceil((EDGE - dt) / 3);else if (db < EDGE) rail.scrollTop += Math.ceil((EDGE - db) / 3);
      });
      const menu = document.createElement('div');
      menu.className = 'ctxmenu export-hidden';
      menu.setAttribute('data-omelette-chrome', '');
      menu.innerHTML = `
        <button type="button" data-act="skip">Skip slide</button>
        <button type="button" data-act="up">Move up</button>
        <button type="button" data-act="down">Move down</button>
        <button type="button" data-act="duplicate">Duplicate slide</button>
        <hr>
        <button type="button" data-act="delete">Delete slide</button>
      `;
      menu.addEventListener('click', e => {
        const act = e.target && e.target.getAttribute && e.target.getAttribute('data-act');
        if (!act) return;
        const i = this._menuIndex;
        this._closeMenu();
        if (act === 'skip') this._toggleSkip(i);else if (act === 'up') this._moveSlide(i, i - 1);else if (act === 'down') this._moveSlide(i, i + 1);else if (act === 'duplicate') this._duplicateSlide(i);else if (act === 'delete') this._openConfirm(i);
      });
      menu.addEventListener('contextmenu', e => e.preventDefault());

      // Rail resize handle — drag to set --deck-rail-w, persisted to
      // localStorage so the width survives reloads.
      const resize = document.createElement('div');
      resize.className = 'rail-resize export-hidden';
      resize.setAttribute('data-omelette-chrome', '');
      resize.addEventListener('pointerdown', e => {
        e.preventDefault();
        resize.setPointerCapture(e.pointerId);
        resize.setAttribute('data-dragging', '');
        const move = ev => this._setRailWidth(ev.clientX);
        const up = () => {
          resize.removeEventListener('pointermove', move);
          resize.removeEventListener('pointerup', up);
          resize.removeEventListener('pointercancel', up);
          resize.removeAttribute('data-dragging');
          try {
            localStorage.setItem('deck-stage.railWidth', String(this._railPx));
          } catch (err) {}
        };
        resize.addEventListener('pointermove', move);
        resize.addEventListener('pointerup', up);
        resize.addEventListener('pointercancel', up);
      });

      // Delete-confirm dialog — mirrors the SPA's ConfirmDialog layout.
      const confirm = document.createElement('div');
      confirm.className = 'confirm-backdrop export-hidden';
      confirm.setAttribute('data-omelette-chrome', '');
      confirm.innerHTML = `
        <div class="confirm" role="dialog" aria-modal="true">
          <div class="body">
            <div class="title">Delete slide?</div>
            <div class="msg">This slide will be removed from the deck.</div>
          </div>
          <div class="footer">
            <button type="button" class="cancel">Cancel</button>
            <button type="button" class="danger">Delete</button>
          </div>
        </div>
      `;
      confirm.addEventListener('click', e => {
        if (e.target === confirm) this._closeConfirm();
      });
      confirm.querySelector('.cancel').addEventListener('click', () => this._closeConfirm());
      confirm.querySelector('.danger').addEventListener('click', () => {
        const i = this._confirmIndex;
        this._closeConfirm();
        this._deleteSlide(i);
      });
      this._root.append(style, rail, resize, stage, overlay, menu, confirm);
      this._canvas = canvas;
      this._stage = stage;
      this._slot = slot;
      this._overlay = overlay;
      this._rail = rail;
      this._resize = resize;
      this._menu = menu;
      this._confirm = confirm;
      this._countEl = overlay.querySelector('.current');
      this._totalEl = overlay.querySelector('.total');

      // Restore persisted rail width.
      let rw = 188;
      try {
        const s = localStorage.getItem('deck-stage.railWidth');
        if (s) rw = parseInt(s, 10) || rw;
      } catch (err) {}
      this._setRailWidth(rw);
      this._syncRailHidden();
    }
    _setRailWidth(px) {
      const w = Math.max(120, Math.min(360, Math.round(px)));
      this._railPx = w;
      this.style.setProperty('--deck-rail-w', w + 'px');
      this._fit();
      // _scaleThumbs forces a sync layout (frame.offsetWidth) then writes
      // N transforms. During a resize drag this runs per-pointermove;
      // coalesce to one per frame.
      if (!this._scaleRaf) {
        this._scaleRaf = requestAnimationFrame(() => {
          this._scaleRaf = null;
          this._scaleThumbs();
        });
      }
    }

    /** @page must live in the document stylesheet — it's a no-op inside
     *  shadow DOM. Inject/update a single <head> style tag so the print
     *  sheet matches the design size and Save-as-PDF yields one slide per
     *  page with no margins. */
    _syncPrintPageRule() {
      const id = 'deck-stage-print-page';
      let tag = document.getElementById(id);
      if (!tag) {
        tag = document.createElement('style');
        tag.id = id;
        document.head.appendChild(tag);
      }
      tag.textContent = '@page { size: ' + this.designWidth + 'px ' + this.designHeight + 'px; margin: 0; } ' + '@media print { html, body { margin: 0 !important; padding: 0 !important; background: none !important; overflow: visible !important; height: auto !important; } ' + '* { -webkit-print-color-adjust: exact; print-color-adjust: exact; } ' +
      // Jump authored animations/transitions to their end state so print
      // never captures mid-entrance — pairs with the beforeprint handler
      // in connectedCallback that sets data-deck-active on every slide.
      '*, *::before, *::after { animation-delay: -99s !important; animation-duration: .001s !important; ' + 'animation-iteration-count: 1 !important; animation-fill-mode: both !important; ' + 'animation-play-state: running !important; transition-duration: 0s !important; } }';
    }
    _onSlotChange() {
      // Rail mutations (delete/move/duplicate) already reconcile synchronously and
      // emit slidechange with reason 'api'; skip the async slotchange that
      // would otherwise re-broadcast with reason 'init'.
      if (this._squelchSlotChange) {
        this._squelchSlotChange = false;
        return;
      }
      this._collectSlides();
      this._restoreIndex();
      this._applyIndex({
        showOverlay: false,
        broadcast: true,
        reason: 'init'
      });
      this._fit();
    }
    _collectSlides() {
      const assigned = this._slot.assignedElements({
        flatten: true
      });
      this._slides = assigned.filter(el => {
        // Skip template/style/script nodes even if someone slots them.
        const tag = el.tagName;
        return tag !== 'TEMPLATE' && tag !== 'SCRIPT' && tag !== 'STYLE';
      });
      this._slideSet = new Set(this._slides);
      this._slides.forEach((slide, i) => {
        const n = i + 1;
        slide.setAttribute('data-screen-label', `${pad2(n)} ${getSlideLabel(slide)}`);

        // Validation attribute for comment flow / auto-checks.
        if (!slide.hasAttribute('data-om-validate')) {
          slide.setAttribute('data-om-validate', VALIDATE_ATTR);
        }
        slide.setAttribute('data-deck-slide', String(i));
      });
      if (this._totalEl) this._totalEl.textContent = String(this._slides.length || 1);
      if (this._index >= this._slides.length) this._index = Math.max(0, this._slides.length - 1);
      this._markLastVisible();
      this._renderRail();
    }

    /** Tag the last non-skipped slide so print CSS can drop its
     *  break-after (see the @media print comment above — :last-child
     *  alone matches a hidden skipped slide). */
    _markLastVisible() {
      let last = null;
      this._slides.forEach(s => {
        s.removeAttribute('data-deck-last-visible');
        if (!s.hasAttribute('data-deck-skip')) last = s;
      });
      if (last) last.setAttribute('data-deck-last-visible', '');
    }
    _loadNotes() {
      const tag = document.getElementById('speaker-notes');
      if (!tag) {
        this._notes = [];
        return;
      }
      try {
        const parsed = JSON.parse(tag.textContent || '[]');
        if (Array.isArray(parsed)) this._notes = parsed;
      } catch (e) {
        console.warn('[deck-stage] Failed to parse #speaker-notes JSON:', e);
        this._notes = [];
      }
    }
    _restoreIndex() {
      // The host's ?slide= param is delivered as a #<int> hash (1-indexed) on
      // the iframe src. No hash → slide 1; the deck itself keeps no position
      // state across loads.
      const h = (location.hash || '').match(/^#(\d+)$/);
      if (h) {
        const n = parseInt(h[1], 10) - 1;
        if (n >= 0 && n < this._slides.length) this._index = n;
      }
    }
    _applyIndex({
      showOverlay = true,
      broadcast = true,
      reason = 'init'
    } = {}) {
      if (!this._slides.length) return;
      const prev = this._prevIndex == null ? -1 : this._prevIndex;
      const curr = this._index;
      // Keep the iframe's own hash in sync so an in-iframe location.reload()
      // (reload banner path in viewer-handle.ts) lands on the current slide,
      // not the stale deep-link hash from initial load.
      try {
        history.replaceState(null, '', '#' + (curr + 1));
      } catch (e) {}
      this._slides.forEach((s, i) => {
        if (i === curr) s.setAttribute('data-deck-active', '');else s.removeAttribute('data-deck-active');
      });
      if (this._countEl) this._countEl.textContent = String(curr + 1);
      // Follow-scroll on every navigation (init deep-link, keyboard, click,
      // tap, external goTo) — the only time we *don't* want the rail to
      // track current is after a rail-internal mutation, where _renderRail
      // has already restored the user's scroll position and yanking back to
      // current would undo it.
      this._syncRail(reason !== 'mutation');
      if (broadcast) {
        // (1) Legacy: host-window postMessage for speaker-notes renderers.
        try {
          window.postMessage({
            slideIndexChanged: curr,
            deckTotal: this._slides.length,
            deckSkipped: this._skippedIndices()
          }, '*');
        } catch (e) {}

        // (2) In-page CustomEvent on the <deck-stage> element itself.
        //     Bubbles and composes out of shadow DOM so slide code can listen:
        //       document.querySelector('deck-stage').addEventListener('slidechange', e => {
        //         e.detail.index, e.detail.previousIndex, e.detail.total, e.detail.slide, e.detail.reason
        //       });
        const detail = {
          index: curr,
          previousIndex: prev,
          total: this._slides.length,
          slide: this._slides[curr] || null,
          previousSlide: prev >= 0 ? this._slides[prev] || null : null,
          reason: reason // 'init' | 'keyboard' | 'click' | 'tap' | 'api'
        };
        this.dispatchEvent(new CustomEvent('slidechange', {
          detail,
          bubbles: true,
          composed: true
        }));
      }
      this._prevIndex = curr;
      if (showOverlay) this._flashOverlay();
    }
    _flashOverlay() {
      // Host posts __omelette_presenting while in fullscreen/tab presentation
      // mode — suppress the nav footer entirely (both hover and slide-change
      // flash) so the audience sees clean slides.
      if (!this._overlay || this._presenting) return;
      this._overlay.setAttribute('data-visible', '');
      if (this._hideTimer) clearTimeout(this._hideTimer);
      this._hideTimer = setTimeout(() => {
        this._overlay.removeAttribute('data-visible');
      }, OVERLAY_HIDE_MS);
    }
    _railWidth() {
      // State-based, no offsetWidth: the first _fit() can run before the
      // rail has had layout on some load paths, and a 0 there paints the
      // slide full-width for one frame before the post-slotchange _fit()
      // corrects it.
      if (!this._railEnabled || !this._railVisible || this.hasAttribute('no-rail') || this.hasAttribute('noscale') || this._presenting || this._previewMode || NARROW_MQ.matches) return 0;
      return this._railPx || 0;
    }
    _fit() {
      if (!this._canvas) return;
      const stage = this._canvas.parentElement;
      // PPTX export sets noscale so the DOM capture sees authored-size
      // geometry — the scaled canvas is in shadow DOM, so the exporter's
      // resetTransformSelector can't reach .canvas.style.transform directly.
      if (this.hasAttribute('noscale')) {
        this._canvas.style.transform = 'none';
        if (stage) stage.style.left = '0';
        if (this._overlay) this._overlay.style.marginLeft = '0';
        return;
      }
      const rw = this._railWidth();
      if (stage) stage.style.left = rw + 'px';
      // Overlay is centred on the viewport via left:50% + translate(-50%);
      // marginLeft shifts the centre by rw/2 so it lands in the middle of
      // the [rw, innerWidth] stage region.
      if (this._overlay) this._overlay.style.marginLeft = rw / 2 + 'px';
      const vw = window.innerWidth - rw;
      const vh = window.innerHeight;
      const s = Math.min(vw / this.designWidth, vh / this.designHeight);
      this._canvas.style.transform = `scale(${s})`;
    }
    _onResize() {
      this._fit();
      // Crossing the narrow-viewport breakpoint reveals the rail — rerun the
      // thumbnail scale the same way _setRailWidth does.
      if (!this._scaleRaf) {
        this._scaleRaf = requestAnimationFrame(() => {
          this._scaleRaf = null;
          this._scaleThumbs();
        });
      }
    }
    _onMouseMove() {
      // Keep overlay visible while mouse moves; hide after idle.
      this._flashOverlay();
    }
    _onMessage(e) {
      const d = e.data;
      if (d && typeof d.__omelette_presenting === 'boolean') {
        this._presenting = d.__omelette_presenting;
        if (this._presenting && this._overlay) {
          this._overlay.removeAttribute('data-visible');
          if (this._hideTimer) clearTimeout(this._hideTimer);
        }
        this._syncRailHidden();
        this._closeMenu();
        this._closeConfirm();
        this._fit();
        this._scaleThumbs();
      }
      // Host's Preview segment (ViewerMode='none'): the rail's drag-reorder /
      // right-click skip-delete affordances are editing chrome, so hide it
      // while the user is just looking at the deck. Same hard-hide path as
      // presenting; independent of the user's _railVisible preference so
      // returning to Edit restores whatever they had.
      if (d && typeof d.__omelette_preview_mode === 'boolean') {
        if (d.__omelette_preview_mode === this._previewMode) return;
        this._previewMode = d.__omelette_preview_mode;
        this._syncRailHidden();
        this._closeMenu();
        this._closeConfirm();
        this._fit();
        this._scaleThumbs();
      }
      // Per-viewer show/hide, driven by the TweaksPanel's auto-injected
      // "Thumbnail rail" toggle (or any author script). Independent of
      // whether the Tweaks panel itself is open — closing the panel
      // doesn't change rail visibility. Persists alongside rail width.
      if (d && d.type === '__deck_rail_visible' && typeof d.on === 'boolean') {
        if (d.on === this._railVisible) return;
        this._railVisible = d.on;
        try {
          localStorage.setItem('deck-stage.railVisible', d.on ? '1' : '0');
        } catch (e) {}
        // Arm the transition, commit it, then flip state — otherwise the
        // browser coalesces both writes and nothing animates on show.
        this.setAttribute('data-rail-anim', '');
        void (this._rail && this._rail.offsetHeight);
        this._syncRailHidden();
        this._fit();
        this._scaleThumbs();
        clearTimeout(this._railAnimTimer);
        this._railAnimTimer = setTimeout(() => this.removeAttribute('data-rail-anim'), 220);
      }
      if (d && d.type === '__omelette_rail_enabled') this._enableRail();
    }
    _syncRailHidden() {
      if (!this._rail) return;
      // data-presenting is the hard hide (display:none) for flag-off,
      // presentation mode, and the host's Preview segment — instant, no
      // transition. data-user-hidden is the soft hide (translateX(-100%))
      // for the viewer's rail toggle, so show/hide slides under
      // :host([data-rail-anim]).
      const hard = !this._railEnabled || this._presenting || this._previewMode;
      if (hard) this._rail.setAttribute('data-presenting', '');else this._rail.removeAttribute('data-presenting');
      if (!this._railVisible) this._rail.setAttribute('data-user-hidden', '');else this._rail.removeAttribute('data-user-hidden');
      // translateX hide leaves thumbs (tabIndex=0) in the tab order —
      // inert keeps them unfocusable while the rail is off-screen.
      this._rail.inert = hard || !this._railVisible;
    }
    _onTap(e) {
      // Touch-only — keyboard + the overlay toolbar cover nav on desktop.
      if (FINE_POINTER_MQ.matches) return;
      // Only taps that land on the stage (slide content or letterbox); the
      // overlay / rail / menus are siblings with their own click handlers.
      const path = e.composedPath();
      if (!this._stage || !path.includes(this._stage)) return;
      // Let interactive slide content keep the tap. composedPath (not
      // e.target.closest) so we see through open shadow roots — a <button>
      // inside a slide-authored custom element retargets e.target to the
      // host but still appears in the composed path.
      if (e.defaultPrevented) return;
      for (const n of path) {
        if (n === this._stage) break;
        if (n.matches && n.matches(INTERACTIVE_SEL)) return;
      }
      e.preventDefault();
      const rw = this._railWidth();
      const mid = rw + (window.innerWidth - rw) / 2;
      this._advance(e.clientX < mid ? -1 : 1, 'tap');
    }
    _onKey(e) {
      // Ignore when the user is typing.
      const t = e.target;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
      // Confirm dialog swallows nav keys while open; Escape cancels. Enter
      // is left to the focused button's native activation so Tab→Cancel
      // →Enter activates Cancel, not the window-level confirm path.
      if (this._confirm && this._confirm.hasAttribute('data-open')) {
        if (e.key === 'Escape') {
          this._closeConfirm();
          e.preventDefault();
        }
        return;
      }
      if (e.key === 'Escape' && this._menu && this._menu.hasAttribute('data-open')) {
        this._closeMenu();
        e.preventDefault();
        return;
      }
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const key = e.key;
      let handled = true;
      if (key === 'ArrowRight' || key === 'PageDown' || key === ' ' || key === 'Spacebar') {
        this._advance(1, 'keyboard');
      } else if (key === 'ArrowLeft' || key === 'PageUp') {
        this._advance(-1, 'keyboard');
      } else if (key === 'Home') {
        this._go(0, 'keyboard');
      } else if (key === 'End') {
        this._go(this._slides.length - 1, 'keyboard');
      } else if (key === 'r' || key === 'R') {
        this._go(0, 'keyboard');
      } else if (/^[0-9]$/.test(key)) {
        // 1..9 jump to that slide; 0 jumps to 10.
        const n = key === '0' ? 9 : parseInt(key, 10) - 1;
        if (n < this._slides.length) this._go(n, 'keyboard');
      } else {
        handled = false;
      }
      if (handled) {
        e.preventDefault();
        this._flashOverlay();
      }
    }
    _go(i, reason = 'api') {
      if (!this._slides.length) return;
      const clamped = Math.max(0, Math.min(this._slides.length - 1, i));
      if (clamped === this._index) {
        this._flashOverlay();
        return;
      }
      this._index = clamped;
      this._applyIndex({
        showOverlay: true,
        broadcast: true,
        reason
      });
    }

    /** Step forward/back skipping any slide marked data-deck-skip. Falls
     *  back to _go's clamp-at-ends behaviour (flash overlay) when there's
     *  nothing further in that direction. */
    _advance(dir, reason) {
      if (!this._slides.length) return;
      let i = this._index + dir;
      while (i >= 0 && i < this._slides.length && this._slides[i].hasAttribute('data-deck-skip')) {
        i += dir;
      }
      if (i < 0 || i >= this._slides.length) {
        this._flashOverlay();
        return;
      }
      this._go(i, reason);
    }

    // ── Thumbnail rail ────────────────────────────────────────────────────
    //
    // Thumbs are keyed by slide element and reused across _renderRail()
    // calls, so a reorder/delete is an O(changed) DOM shuffle instead of an
    // O(N) teardown-and-re-clone. Each thumb starts as a lightweight shell
    // (num + empty frame); the clone is materialized lazily by an
    // IntersectionObserver when the frame scrolls into (or near) view, so
    // only visible-ish slides pay the clone + image-decode cost.

    _renderRail() {
      if (!this._rail || !this._railEnabled) {
        this._thumbs = [];
        return;
      }
      // FLIP: record each *materialized* thumb's top before the reconcile.
      // Off-screen (non-materialized) thumbs don't need the animation and
      // skipping their getBoundingClientRect saves a forced layout per
      // off-screen thumb on large decks.
      const prevTops = new Map();
      (this._thumbs || []).forEach(({
        thumb,
        slide,
        host
      }) => {
        if (host) prevTops.set(slide, thumb.getBoundingClientRect().top);
      });
      const st = this._rail.scrollTop;

      // Reconcile: reuse thumbs that already exist for a slide, create
      // shells for new slides, drop thumbs for removed slides.
      const bySlide = new Map();
      (this._thumbs || []).forEach(t => bySlide.set(t.slide, t));
      const next = [];
      this._slides.forEach(slide => {
        let t = bySlide.get(slide);
        if (t) bySlide.delete(slide);else t = this._makeThumb(slide);
        next.push(t);
      });
      // Orphans — slides removed since last render.
      bySlide.forEach(t => {
        if (this._railObserver) this._railObserver.unobserve(t.frame);
        t.thumb.remove();
      });
      // Put thumbs into document order to match _slides. insertBefore on
      // an already-correctly-placed node is a no-op, so this is cheap
      // when nothing moved.
      next.forEach((t, i) => {
        const want = t.thumb;
        const at = this._rail.children[i];
        if (at !== want) this._rail.insertBefore(want, at || null);
        t.i = i;
        t.num.textContent = String(i + 1);
        if (t.slide.hasAttribute('data-deck-skip')) t.thumb.setAttribute('data-skip', '');else t.thumb.removeAttribute('data-skip');
      });
      this._thumbs = next;
      this._rail.scrollTop = st;
      if (prevTops.size) {
        const moved = [];
        this._thumbs.forEach(({
          thumb,
          slide
        }) => {
          const old = prevTops.get(slide);
          if (old == null) return;
          const dy = old - thumb.getBoundingClientRect().top;
          if (Math.abs(dy) < 1) return;
          thumb.style.transition = 'none';
          thumb.style.transform = `translateY(${dy}px)`;
          moved.push(thumb);
        });
        if (moved.length) {
          // Commit the inverted positions before flipping the transition
          // on — otherwise the browser coalesces both style writes and
          // nothing animates.
          void this._rail.offsetHeight;
          moved.forEach(t => {
            t.style.transition = 'transform 180ms cubic-bezier(.2,.7,.3,1)';
            t.style.transform = '';
          });
          setTimeout(() => moved.forEach(t => {
            t.style.transition = '';
          }), 220);
        }
      }
      requestAnimationFrame(() => this._scaleThumbs());
      this._syncRail(false);
    }

    /** Create a lightweight thumb shell for one slide. The clone is
     *  materialized later by the IntersectionObserver. Event handlers
     *  look up the thumb's *current* index (via _thumbs.indexOf) so the
     *  same element can be reused across reorders. */
    _makeThumb(slide) {
      const thumb = document.createElement('div');
      thumb.className = 'thumb';
      thumb.tabIndex = 0;
      const num = document.createElement('div');
      num.className = 'num';
      const frame = document.createElement('div');
      frame.className = 'frame';
      thumb.append(num, frame);
      const entry = {
        thumb,
        num,
        frame,
        slide,
        clone: null,
        host: null,
        i: -1
      };
      // entry.i is refreshed on every _renderRail reconcile pass, so
      // handlers read the thumb's current position without an O(N) scan.
      const idx = () => entry.i;
      thumb.addEventListener('click', () => this._go(idx(), 'click'));
      // ↑/↓ step through the rail when a thumb has focus. _go clamps at the
      // ends and _applyIndex→_syncRail scrolls the new current thumb into
      // view; we move focus to it (preventScroll — _syncRail already
      // scrolled) so a held key walks the whole list. stopPropagation keeps
      // this out of the window-level _onKey nav handler.
      thumb.addEventListener('keydown', e => {
        if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return;
        if (e.metaKey || e.ctrlKey || e.altKey) return;
        e.preventDefault();
        e.stopPropagation();
        this._go(idx() + (e.key === 'ArrowDown' ? 1 : -1), 'keyboard');
        const cur = this._thumbs && this._thumbs[this._index];
        if (cur) cur.thumb.focus({
          preventScroll: true
        });
      });
      thumb.addEventListener('contextmenu', e => {
        e.preventDefault();
        this._openMenu(idx(), e.clientX, e.clientY);
      });
      thumb.draggable = true;
      thumb.addEventListener('dragstart', e => {
        this._dragFrom = idx();
        thumb.setAttribute('data-dragging', '');
        e.dataTransfer.effectAllowed = 'move';
        try {
          e.dataTransfer.setData('text/plain', String(this._dragFrom));
        } catch (err) {}
      });
      thumb.addEventListener('dragend', () => {
        thumb.removeAttribute('data-dragging');
        this._clearDrop();
        this._dragFrom = null;
      });
      thumb.addEventListener('dragover', e => {
        if (this._dragFrom == null) return;
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        const r = thumb.getBoundingClientRect();
        this._setDrop(idx(), e.clientY < r.top + r.height / 2 ? 'before' : 'after');
      });
      thumb.addEventListener('drop', e => {
        if (this._dragFrom == null) return;
        e.preventDefault();
        const i = idx();
        const r = thumb.getBoundingClientRect();
        let to = e.clientY >= r.top + r.height / 2 ? i + 1 : i;
        if (this._dragFrom < to) to--;
        const from = this._dragFrom;
        this._clearDrop();
        this._dragFrom = null;
        if (to !== from) this._moveSlide(from, to);
      });
      if (this._railObserver) this._railObserver.observe(frame);
      frame.__deckThumb = entry;
      return entry;
    }

    /** Lazily build the clone for a thumb that has scrolled into view. */
    _materialize(entry) {
      if (entry.host) return;
      const dw = this.designWidth,
        dh = this.designHeight;
      let clone = entry.slide.cloneNode(true);
      clone.removeAttribute('id');
      clone.removeAttribute('data-deck-active');
      clone.querySelectorAll('[id]').forEach(el => el.removeAttribute('id'));
      // Neuter heavy media; replace <video> with its poster so the box
      // keeps a visual. <iframe>/<audio> become empty placeholders.
      clone.querySelectorAll('iframe, audio, object, embed').forEach(el => {
        el.removeAttribute('src');
        el.removeAttribute('srcdoc');
        el.removeAttribute('data');
        el.innerHTML = '';
      });
      clone.querySelectorAll('video').forEach(el => {
        if (!el.poster) {
          el.removeAttribute('src');
          el.innerHTML = '';
          return;
        }
        const img = document.createElement('img');
        img.src = el.poster;
        img.alt = '';
        img.style.cssText = el.style.cssText + ';object-fit:cover;width:100%;height:100%;';
        img.className = el.className;
        el.replaceWith(img);
      });
      // Images: defer decode and let the browser pick the smallest
      // srcset candidate for the ~140px thumb. Same-URL clones reuse the
      // slide's decoded bitmap (URL-keyed cache), so the remaining cost
      // is paint/composite — lazy+async keeps that off the main thread.
      clone.querySelectorAll('img').forEach(el => {
        el.loading = 'lazy';
        el.decoding = 'async';
        if (el.srcset) el.sizes = (this._railPx || 188) + 'px';
      });
      // Custom elements inside the slide would have their
      // connectedCallback fire when the clone is appended. Replace them
      // with inert boxes so a component-heavy deck doesn't run N copies
      // of each component's mount logic in the rail. Children are
      // preserved so layout-wrapper elements (<my-column><h2>…</h2>)
      // still show their authored content; the querySelectorAll NodeList
      // is static, so nested custom elements in the moved subtree are
      // still visited on later iterations.
      const neuter = el => {
        const box = document.createElement('div');
        box.style.cssText = (el.getAttribute('style') || '') + ';background:rgba(0,0,0,0.06);border:1px dashed rgba(0,0,0,0.15);';
        box.className = el.className;
        // Preserve theming/i18n hooks so [data-*] / :lang() / [dir]
        // descendant selectors still match the neutered root.
        for (const a of el.attributes) {
          const n = a.name;
          if (n.startsWith('data-') || n.startsWith('aria-') || n === 'lang' || n === 'dir' || n === 'role' || n === 'title') {
            box.setAttribute(n, a.value);
          }
        }
        while (el.firstChild) box.appendChild(el.firstChild);
        return box;
      };
      // querySelectorAll('*') returns descendants only — a custom-element
      // slide root (<my-slide>…</my-slide>) would slip through and upgrade
      // on append. Swap the root first.
      if (clone.tagName.includes('-')) clone = neuter(clone);
      clone.querySelectorAll('*').forEach(el => {
        if (el.tagName.includes('-')) el.replaceWith(neuter(el));
      });
      clone.style.cssText += ';position:absolute;top:0;left:0;transform-origin:0 0;' + 'pointer-events:none;width:' + dw + 'px;height:' + dh + 'px;' + 'box-sizing:border-box;overflow:hidden;visibility:visible;opacity:1;';
      const host = document.createElement('div');
      host.style.cssText = 'position:absolute;inset:0;';
      this._syncThumbHostAttrs(host);
      const sr = host.attachShadow({
        mode: 'open'
      });
      if (this._adoptedSheet) sr.adoptedStyleSheets = [this._adoptedSheet];else {
        const st = document.createElement('style');
        st.textContent = this._authorCss || '';
        sr.appendChild(st);
      }
      sr.appendChild(clone);
      entry.frame.appendChild(host);
      entry.host = host;
      entry.clone = clone;
      if (this._thumbScale) clone.style.transform = 'scale(' + this._thumbScale + ')';
      // Once materialized the IO callback is a no-op early-return —
      // unobserve so scroll doesn't keep firing it.
      if (this._railObserver) this._railObserver.unobserve(entry.frame);
    }

    /** Re-clone a single thumb (live-update path). No-op if the thumb
     *  hasn't been materialized yet — it'll pick up current content when
     *  it scrolls into view. */
    _refreshThumb(slide) {
      const entry = (this._thumbs || []).find(t => t.slide === slide);
      if (!entry || !entry.host) return;
      entry.host.remove();
      entry.host = entry.clone = null;
      this._materialize(entry);
    }
    _scaleThumbs() {
      if (!this._thumbs || !this._thumbs.length) return;
      // Every frame is the same width; if it reads 0 the rail is
      // display:none (noscale / no-rail / presenting / print) — leave the
      // clones as-is and re-run when the rail is revealed.
      const fw = this._thumbs[0].frame.offsetWidth;
      if (!fw) return;
      this._thumbScale = fw / this.designWidth;
      this._thumbs.forEach(({
        clone
      }) => {
        if (clone) clone.style.transform = 'scale(' + this._thumbScale + ')';
      });
    }
    _setDrop(i, where) {
      // dragover fires at pointer-event rate; touch only the previous
      // and new target rather than sweeping all N thumbs.
      const t = this._thumbs && this._thumbs[i];
      if (this._dropOn && this._dropOn !== t) {
        this._dropOn.thumb.removeAttribute('data-drop');
      }
      if (t) t.thumb.setAttribute('data-drop', where);
      this._dropOn = t || null;
    }
    _clearDrop() {
      if (this._dropOn) this._dropOn.thumb.removeAttribute('data-drop');
      this._dropOn = null;
    }
    _syncRail(follow) {
      if (!this._thumbs) return;
      this._thumbs.forEach(({
        thumb
      }, i) => {
        if (i === this._index) {
          thumb.setAttribute('data-current', '');
          if (follow && typeof thumb.scrollIntoView === 'function') {
            thumb.scrollIntoView({
              block: 'nearest'
            });
          }
        } else {
          thumb.removeAttribute('data-current');
        }
      });
    }
    _openMenu(i, x, y) {
      if (!this._menu) return;
      this._menuIndex = i;
      const slide = this._slides[i];
      const skip = slide && slide.hasAttribute('data-deck-skip');
      this._menu.querySelector('[data-act="skip"]').textContent = skip ? 'Unskip slide' : 'Skip slide';
      this._menu.querySelector('[data-act="up"]').disabled = i <= 0;
      this._menu.querySelector('[data-act="down"]').disabled = i >= this._slides.length - 1;
      this._menu.querySelector('[data-act="delete"]').disabled = this._slides.length <= 1;
      // Place, then clamp to viewport after it's measurable.
      this._menu.style.left = x + 'px';
      this._menu.style.top = y + 'px';
      this._menu.setAttribute('data-open', '');
      const r = this._menu.getBoundingClientRect();
      const nx = Math.min(x, window.innerWidth - r.width - 4);
      const ny = Math.min(y, window.innerHeight - r.height - 4);
      this._menu.style.left = Math.max(4, nx) + 'px';
      this._menu.style.top = Math.max(4, ny) + 'px';
    }
    _closeMenu() {
      if (this._menu) this._menu.removeAttribute('data-open');
      this._menuIndex = -1;
    }
    _openConfirm(i) {
      if (!this._confirm) return;
      this._confirmIndex = i;
      this._confirm.querySelector('.title').textContent = 'Delete slide ' + (i + 1) + '?';
      this._confirm.setAttribute('data-open', '');
      const btn = this._confirm.querySelector('.danger');
      if (btn && btn.focus) btn.focus();
    }
    _closeConfirm() {
      if (this._confirm) this._confirm.removeAttribute('data-open');
      this._confirmIndex = -1;
    }
    _emitDeckChange(detail) {
      this.dispatchEvent(new CustomEvent('deckchange', {
        detail,
        bubbles: true,
        composed: true
      }));
    }
    _deleteSlide(i) {
      const slide = this._slides[i];
      if (!slide || this._slides.length <= 1) return;
      const wasCurrent = i === this._index;
      if (i < this._index || wasCurrent && i === this._slides.length - 1) this._index--;
      this._squelchSlotChange = true;
      slide.remove();
      this._emitDeckChange({
        action: 'delete',
        from: i,
        slide
      });
      this._collectSlides();
      this._applyIndex({
        showOverlay: true,
        broadcast: true,
        reason: 'mutation'
      });
    }
    _duplicateSlide(i) {
      const slide = this._slides[i];
      if (!slide) return;
      const copy = slide.cloneNode(true);
      // Strip ids so the document stays valid (no duplicate-id collisions
      // with the original). Same treatment _materialize gives rail clones.
      copy.removeAttribute('id');
      copy.querySelectorAll('[id]').forEach(el => el.removeAttribute('id'));
      // Insert after the original and make the copy active so it's the one
      // on screen. _collectSlides re-derives data-screen-label / data-deck-*
      // attrs, so the cloned values are overwritten.
      this._index = i + 1;
      this._squelchSlotChange = true;
      this.insertBefore(copy, slide.nextSibling);
      this._emitDeckChange({
        action: 'duplicate',
        from: i,
        to: i + 1,
        slide: copy
      });
      this._collectSlides();
      this._applyIndex({
        showOverlay: true,
        broadcast: true,
        reason: 'mutation'
      });
    }
    _toggleSkip(i) {
      const slide = this._slides[i];
      if (!slide) return;
      const on = !slide.hasAttribute('data-deck-skip');
      if (on) slide.setAttribute('data-deck-skip', '');else slide.removeAttribute('data-deck-skip');
      if (this._thumbs && this._thumbs[i]) {
        if (on) this._thumbs[i].thumb.setAttribute('data-skip', '');else this._thumbs[i].thumb.removeAttribute('data-skip');
      }
      this._markLastVisible();
      this._emitDeckChange({
        action: on ? 'skip' : 'unskip',
        from: i,
        slide
      });
      // Re-broadcast so the presenter popup's prev/next thumbnails re-pick
      // the nearest non-skipped slide without waiting for a nav event.
      try {
        window.postMessage({
          slideIndexChanged: this._index,
          deckTotal: this._slides.length,
          deckSkipped: this._skippedIndices()
        }, '*');
      } catch (e) {}
    }
    _skippedIndices() {
      const out = [];
      for (let i = 0; i < this._slides.length; i++) {
        if (this._slides[i].hasAttribute('data-deck-skip')) out.push(i);
      }
      return out;
    }
    _moveSlide(i, j) {
      if (j < 0 || j >= this._slides.length || j === i) return;
      const slide = this._slides[i];
      const ref = j < i ? this._slides[j] : this._slides[j].nextSibling;
      // Track the active slide across the reorder so the same content
      // stays on screen.
      const cur = this._index;
      if (cur === i) this._index = j;else if (i < cur && j >= cur) this._index = cur - 1;else if (i > cur && j <= cur) this._index = cur + 1;
      this._squelchSlotChange = true;
      this.insertBefore(slide, ref);
      this._emitDeckChange({
        action: 'move',
        from: i,
        to: j,
        slide
      });
      this._collectSlides();
      this._applyIndex({
        showOverlay: false,
        broadcast: true,
        reason: 'mutation'
      });
    }

    // Public API ------------------------------------------------------------

    /** Current slide index (0-based). */
    get index() {
      return this._index;
    }
    /** Total slide count. */
    get length() {
      return this._slides.length;
    }
    /** Programmatically navigate. */
    goTo(i) {
      this._go(i, 'api');
    }
    next() {
      this._advance(1, 'api');
    }
    prev() {
      this._advance(-1, 'api');
    }
    reset() {
      this._go(0, 'api');
    }
  }
  if (!customElements.get('deck-stage')) {
    customElements.define('deck-stage', DeckStage);
  }
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "catalogue/deck-stage.js", error: String((e && e.message) || e) }); }

// catalogue/tweaks-panel.jsx
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)

/* BEGIN USAGE */
// tweaks-panel.jsx
// Reusable Tweaks shell + form-control helpers.
// Exports (to window): useTweaks, TweaksPanel, TweakSection, TweakRow, TweakSlider,
//   TweakToggle, TweakRadio, TweakSelect, TweakText, TweakNumber, TweakColor, TweakButton.
//
// Owns the host protocol (listens for __activate_edit_mode / __deactivate_edit_mode,
// posts __edit_mode_available / __edit_mode_set_keys / __edit_mode_dismissed) so
// individual prototypes don't re-roll it. Ships a consistent set of controls so you
// don't hand-draw <input type="range">, segmented radios, steppers, etc.
//
// Usage (in an HTML file that loads React + Babel):
//
//   const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
//     "primaryColor": "#D97757",
//     "palette": ["#D97757", "#29261b", "#f6f4ef"],
//     "fontSize": 16,
//     "density": "regular",
//     "dark": false
//   }/*EDITMODE-END*/;
//
//   function App() {
//     const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
//     return (
//       <div style={{ fontSize: t.fontSize, color: t.primaryColor }}>
//         Hello
//         <TweaksPanel>
//           <TweakSection label="Typography" />
//           <TweakSlider label="Font size" value={t.fontSize} min={10} max={32} unit="px"
//                        onChange={(v) => setTweak('fontSize', v)} />
//           <TweakRadio  label="Density" value={t.density}
//                        options={['compact', 'regular', 'comfy']}
//                        onChange={(v) => setTweak('density', v)} />
//           <TweakSection label="Theme" />
//           <TweakColor  label="Primary" value={t.primaryColor}
//                        options={['#D97757', '#2A6FDB', '#1F8A5B', '#7A5AE0']}
//                        onChange={(v) => setTweak('primaryColor', v)} />
//           <TweakColor  label="Palette" value={t.palette}
//                        options={[['#D97757', '#29261b', '#f6f4ef'],
//                                  ['#475569', '#0f172a', '#f1f5f9']]}
//                        onChange={(v) => setTweak('palette', v)} />
//           <TweakToggle label="Dark mode" value={t.dark}
//                        onChange={(v) => setTweak('dark', v)} />
//         </TweaksPanel>
//       </div>
//     );
//   }
//
// TweakRadio is the segmented control for 2–3 short options (auto-falls-back to
// TweakSelect past ~16/~10 chars per label); reach for TweakSelect directly when
// options are many or long. For color tweaks always curate 3-4 options rather than
// a free picker; an option can also be a whole 2–5 color palette (the stored value
// is the array). The Tweak* controls are a floor, not a ceiling — build custom
// controls inside the panel if a tweak calls for UI they don't cover.
/* END USAGE */
// ─────────────────────────────────────────────────────────────────────────────

const __TWEAKS_STYLE = `
  .twk-panel{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:280px;
    max-height:calc(100vh - 32px);display:flex;flex-direction:column;
    transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom right;
    background:rgba(250,249,247,.78);color:#29261b;
    -webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);
    border:.5px solid rgba(255,255,255,.6);border-radius:14px;
    box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 12px 40px rgba(0,0,0,.18);
    font:11.5px/1.4 ui-sans-serif,system-ui,-apple-system,sans-serif;overflow:hidden}
  .twk-hd{display:flex;align-items:center;justify-content:space-between;
    padding:10px 8px 10px 14px;cursor:move;user-select:none}
  .twk-hd b{font-size:12px;font-weight:600;letter-spacing:.01em}
  .twk-x{appearance:none;border:0;background:transparent;color:rgba(41,38,27,.55);
    width:22px;height:22px;border-radius:6px;cursor:default;font-size:13px;line-height:1}
  .twk-x:hover{background:rgba(0,0,0,.06);color:#29261b}
  .twk-body{padding:2px 14px 14px;display:flex;flex-direction:column;gap:10px;
    overflow-y:auto;overflow-x:hidden;min-height:0;
    scrollbar-width:thin;scrollbar-color:rgba(0,0,0,.15) transparent}
  .twk-body::-webkit-scrollbar{width:8px}
  .twk-body::-webkit-scrollbar-track{background:transparent;margin:2px}
  .twk-body::-webkit-scrollbar-thumb{background:rgba(0,0,0,.15);border-radius:4px;
    border:2px solid transparent;background-clip:content-box}
  .twk-body::-webkit-scrollbar-thumb:hover{background:rgba(0,0,0,.25);
    border:2px solid transparent;background-clip:content-box}
  .twk-row{display:flex;flex-direction:column;gap:5px}
  .twk-row-h{flex-direction:row;align-items:center;justify-content:space-between;gap:10px}
  .twk-lbl{display:flex;justify-content:space-between;align-items:baseline;
    color:rgba(41,38,27,.72)}
  .twk-lbl>span:first-child{font-weight:500}
  .twk-val{color:rgba(41,38,27,.5);font-variant-numeric:tabular-nums}

  .twk-sect{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
    color:rgba(41,38,27,.45);padding:10px 0 0}
  .twk-sect:first-child{padding-top:0}

  .twk-field{appearance:none;box-sizing:border-box;width:100%;min-width:0;height:26px;padding:0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;
    background:rgba(255,255,255,.6);color:inherit;font:inherit;outline:none}
  .twk-field:focus{border-color:rgba(0,0,0,.25);background:rgba(255,255,255,.85)}
  select.twk-field{padding-right:22px;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='rgba(0,0,0,.5)' d='M0 0h10L5 6z'/></svg>");
    background-repeat:no-repeat;background-position:right 8px center}

  .twk-slider{appearance:none;-webkit-appearance:none;width:100%;height:4px;margin:6px 0;
    border-radius:999px;background:rgba(0,0,0,.12);outline:none}
  .twk-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;
    width:14px;height:14px;border-radius:50%;background:#fff;
    border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}
  .twk-slider::-moz-range-thumb{width:14px;height:14px;border-radius:50%;
    background:#fff;border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}

  .twk-seg{position:relative;display:flex;padding:2px;border-radius:8px;
    background:rgba(0,0,0,.06);user-select:none}
  .twk-seg-thumb{position:absolute;top:2px;bottom:2px;border-radius:6px;
    background:rgba(255,255,255,.9);box-shadow:0 1px 2px rgba(0,0,0,.12);
    transition:left .15s cubic-bezier(.3,.7,.4,1),width .15s}
  .twk-seg.dragging .twk-seg-thumb{transition:none}
  .twk-seg button{appearance:none;position:relative;z-index:1;flex:1;border:0;
    background:transparent;color:inherit;font:inherit;font-weight:500;min-height:22px;
    border-radius:6px;cursor:default;padding:4px 6px;line-height:1.2;
    overflow-wrap:anywhere}

  .twk-toggle{position:relative;width:32px;height:18px;border:0;border-radius:999px;
    background:rgba(0,0,0,.15);transition:background .15s;cursor:default;padding:0}
  .twk-toggle[data-on="1"]{background:#34c759}
  .twk-toggle i{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;
    background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:transform .15s}
  .twk-toggle[data-on="1"] i{transform:translateX(14px)}

  .twk-num{display:flex;align-items:center;box-sizing:border-box;min-width:0;height:26px;padding:0 0 0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;background:rgba(255,255,255,.6)}
  .twk-num-lbl{font-weight:500;color:rgba(41,38,27,.6);cursor:ew-resize;
    user-select:none;padding-right:8px}
  .twk-num input{flex:1;min-width:0;height:100%;border:0;background:transparent;
    font:inherit;font-variant-numeric:tabular-nums;text-align:right;padding:0 8px 0 0;
    outline:none;color:inherit;-moz-appearance:textfield}
  .twk-num input::-webkit-inner-spin-button,.twk-num input::-webkit-outer-spin-button{
    -webkit-appearance:none;margin:0}
  .twk-num-unit{padding-right:8px;color:rgba(41,38,27,.45)}

  .twk-btn{appearance:none;height:26px;padding:0 12px;border:0;border-radius:7px;
    background:rgba(0,0,0,.78);color:#fff;font:inherit;font-weight:500;cursor:default}
  .twk-btn:hover{background:rgba(0,0,0,.88)}
  .twk-btn.secondary{background:rgba(0,0,0,.06);color:inherit}
  .twk-btn.secondary:hover{background:rgba(0,0,0,.1)}

  .twk-swatch{appearance:none;-webkit-appearance:none;width:56px;height:22px;
    border:.5px solid rgba(0,0,0,.1);border-radius:6px;padding:0;cursor:default;
    background:transparent;flex-shrink:0}
  .twk-swatch::-webkit-color-swatch-wrapper{padding:0}
  .twk-swatch::-webkit-color-swatch{border:0;border-radius:5.5px}
  .twk-swatch::-moz-color-swatch{border:0;border-radius:5.5px}

  .twk-chips{display:flex;gap:6px}
  .twk-chip{position:relative;appearance:none;flex:1;min-width:0;height:46px;
    padding:0;border:0;border-radius:6px;overflow:hidden;cursor:default;
    box-shadow:0 0 0 .5px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.06);
    transition:transform .12s cubic-bezier(.3,.7,.4,1),box-shadow .12s}
  .twk-chip:hover{transform:translateY(-1px);
    box-shadow:0 0 0 .5px rgba(0,0,0,.18),0 4px 10px rgba(0,0,0,.12)}
  .twk-chip[data-on="1"]{box-shadow:0 0 0 1.5px rgba(0,0,0,.85),
    0 2px 6px rgba(0,0,0,.15)}
  .twk-chip>span{position:absolute;top:0;bottom:0;right:0;width:34%;
    display:flex;flex-direction:column;box-shadow:-1px 0 0 rgba(0,0,0,.1)}
  .twk-chip>span>i{flex:1;box-shadow:0 -1px 0 rgba(0,0,0,.1)}
  .twk-chip>span>i:first-child{box-shadow:none}
  .twk-chip svg{position:absolute;top:6px;left:6px;width:13px;height:13px;
    filter:drop-shadow(0 1px 1px rgba(0,0,0,.3))}
`;

// ── useTweaks ───────────────────────────────────────────────────────────────
// Single source of truth for tweak values. setTweak persists via the host
// (__edit_mode_set_keys → host rewrites the EDITMODE block on disk).
function useTweaks(defaults) {
  const [values, setValues] = React.useState(defaults);
  // Accepts either setTweak('key', value) or setTweak({ key: value, ... }) so a
  // useState-style call doesn't write a "[object Object]" key into the persisted
  // JSON block.
  const setTweak = React.useCallback((keyOrEdits, val) => {
    const edits = typeof keyOrEdits === 'object' && keyOrEdits !== null ? keyOrEdits : {
      [keyOrEdits]: val
    };
    setValues(prev => ({
      ...prev,
      ...edits
    }));
    window.parent.postMessage({
      type: '__edit_mode_set_keys',
      edits
    }, '*');
    // Same-window signal so in-page listeners (deck-stage rail thumbnails)
    // can react — the parent message only reaches the host, not peers.
    window.dispatchEvent(new CustomEvent('tweakchange', {
      detail: edits
    }));
  }, []);
  return [values, setTweak];
}

// ── TweaksPanel ─────────────────────────────────────────────────────────────
// Floating shell. Registers the protocol listener BEFORE announcing
// availability — if the announce ran first, the host's activate could land
// before our handler exists and the toolbar toggle would silently no-op.
// The close button posts __edit_mode_dismissed so the host's toolbar toggle
// flips off in lockstep; the host echoes __deactivate_edit_mode back which
// is what actually hides the panel.
function TweaksPanel({
  title = 'Tweaks',
  children
}) {
  const [open, setOpen] = React.useState(false);
  const dragRef = React.useRef(null);
  const offsetRef = React.useRef({
    x: 16,
    y: 16
  });
  const PAD = 16;
  const clampToViewport = React.useCallback(() => {
    const panel = dragRef.current;
    if (!panel) return;
    const w = panel.offsetWidth,
      h = panel.offsetHeight;
    const maxRight = Math.max(PAD, window.innerWidth - w - PAD);
    const maxBottom = Math.max(PAD, window.innerHeight - h - PAD);
    offsetRef.current = {
      x: Math.min(maxRight, Math.max(PAD, offsetRef.current.x)),
      y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y))
    };
    panel.style.right = offsetRef.current.x + 'px';
    panel.style.bottom = offsetRef.current.y + 'px';
  }, []);
  React.useEffect(() => {
    if (!open) return;
    clampToViewport();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', clampToViewport);
      return () => window.removeEventListener('resize', clampToViewport);
    }
    const ro = new ResizeObserver(clampToViewport);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [open, clampToViewport]);
  React.useEffect(() => {
    const onMsg = e => {
      const t = e?.data?.type;
      if (t === '__activate_edit_mode') setOpen(true);else if (t === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({
      type: '__edit_mode_available'
    }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);
  const dismiss = () => {
    setOpen(false);
    window.parent.postMessage({
      type: '__edit_mode_dismissed'
    }, '*');
  };
  const onDragStart = e => {
    const panel = dragRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    const sx = e.clientX,
      sy = e.clientY;
    const startRight = window.innerWidth - r.right;
    const startBottom = window.innerHeight - r.bottom;
    const move = ev => {
      offsetRef.current = {
        x: startRight - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy)
      };
      clampToViewport();
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };
  if (!open) return null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, __TWEAKS_STYLE), /*#__PURE__*/React.createElement("div", {
    ref: dragRef,
    className: "twk-panel",
    "data-omelette-chrome": "",
    style: {
      right: offsetRef.current.x,
      bottom: offsetRef.current.y
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-hd",
    onMouseDown: onDragStart
  }, /*#__PURE__*/React.createElement("b", null, title), /*#__PURE__*/React.createElement("button", {
    className: "twk-x",
    "aria-label": "Close tweaks",
    onMouseDown: e => e.stopPropagation(),
    onClick: dismiss
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "twk-body"
  }, children)));
}

// ── Layout helpers ──────────────────────────────────────────────────────────

function TweakSection({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "twk-sect"
  }, label), children);
}
function TweakRow({
  label,
  value,
  children,
  inline = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: inline ? 'twk-row twk-row-h' : 'twk-row'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label), value != null && /*#__PURE__*/React.createElement("span", {
    className: "twk-val"
  }, value)), children);
}

// ── Controls ────────────────────────────────────────────────────────────────

function TweakSlider({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label,
    value: `${value}${unit}`
  }, /*#__PURE__*/React.createElement("input", {
    type: "range",
    className: "twk-slider",
    min: min,
    max: max,
    step: step,
    value: value,
    onChange: e => onChange(Number(e.target.value))
  }));
}
function TweakToggle({
  label,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-row twk-row-h"
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "twk-toggle",
    "data-on": value ? '1' : '0',
    role: "switch",
    "aria-checked": !!value,
    onClick: () => onChange(!value)
  }, /*#__PURE__*/React.createElement("i", null)));
}
function TweakRadio({
  label,
  value,
  options,
  onChange
}) {
  const trackRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  // The active value is read by pointer-move handlers attached for the lifetime
  // of a drag — ref it so a stale closure doesn't fire onChange for every move.
  const valueRef = React.useRef(value);
  valueRef.current = value;

  // Segments wrap mid-word once per-segment width runs out. The track is
  // ~248px (280 panel − 28 body pad − 4 seg pad), each button loses 12px
  // to its own padding, and 11.5px system-ui averages ~6.3px/char — so 2
  // options fit ~16 chars each, 3 fit ~10. Past that (or >3 options), fall
  // back to a dropdown rather than wrap.
  const labelLen = o => String(typeof o === 'object' ? o.label : o).length;
  const maxLen = options.reduce((m, o) => Math.max(m, labelLen(o)), 0);
  const fitsAsSegments = maxLen <= ({
    2: 16,
    3: 10
  }[options.length] ?? 0);
  if (!fitsAsSegments) {
    // <select> emits strings — map back to the original option value so the
    // fallback stays type-preserving (numbers, booleans) like the segment path.
    const resolve = s => {
      const m = options.find(o => String(typeof o === 'object' ? o.value : o) === s);
      return m === undefined ? s : typeof m === 'object' ? m.value : m;
    };
    return /*#__PURE__*/React.createElement(TweakSelect, {
      label: label,
      value: value,
      options: options,
      onChange: s => onChange(resolve(s))
    });
  }
  const opts = options.map(o => typeof o === 'object' ? o : {
    value: o,
    label: o
  });
  const idx = Math.max(0, opts.findIndex(o => o.value === value));
  const n = opts.length;
  const segAt = clientX => {
    const r = trackRef.current.getBoundingClientRect();
    const inner = r.width - 4;
    const i = Math.floor((clientX - r.left - 2) / inner * n);
    return opts[Math.max(0, Math.min(n - 1, i))].value;
  };
  const onPointerDown = e => {
    setDragging(true);
    const v0 = segAt(e.clientX);
    if (v0 !== valueRef.current) onChange(v0);
    const move = ev => {
      if (!trackRef.current) return;
      const v = segAt(ev.clientX);
      if (v !== valueRef.current) onChange(v);
    };
    const up = () => {
      setDragging(false);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    ref: trackRef,
    role: "radiogroup",
    onPointerDown: onPointerDown,
    className: dragging ? 'twk-seg dragging' : 'twk-seg'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-seg-thumb",
    style: {
      left: `calc(2px + ${idx} * (100% - 4px) / ${n})`,
      width: `calc((100% - 4px) / ${n})`
    }
  }), opts.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.value,
    type: "button",
    role: "radio",
    "aria-checked": o.value === value
  }, o.label))));
}
function TweakSelect({
  label,
  value,
  options,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("select", {
    className: "twk-field",
    value: value,
    onChange: e => onChange(e.target.value)
  }, options.map(o => {
    const v = typeof o === 'object' ? o.value : o;
    const l = typeof o === 'object' ? o.label : o;
    return /*#__PURE__*/React.createElement("option", {
      key: v,
      value: v
    }, l);
  })));
}
function TweakText({
  label,
  value,
  placeholder,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("input", {
    className: "twk-field",
    type: "text",
    value: value,
    placeholder: placeholder,
    onChange: e => onChange(e.target.value)
  }));
}
function TweakNumber({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  onChange
}) {
  const clamp = n => {
    if (min != null && n < min) return min;
    if (max != null && n > max) return max;
    return n;
  };
  const startRef = React.useRef({
    x: 0,
    val: 0
  });
  const onScrubStart = e => {
    e.preventDefault();
    startRef.current = {
      x: e.clientX,
      val: value
    };
    const decimals = (String(step).split('.')[1] || '').length;
    const move = ev => {
      const dx = ev.clientX - startRef.current.x;
      const raw = startRef.current.val + dx * step;
      const snapped = Math.round(raw / step) * step;
      onChange(clamp(Number(snapped.toFixed(decimals))));
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-num"
  }, /*#__PURE__*/React.createElement("span", {
    className: "twk-num-lbl",
    onPointerDown: onScrubStart
  }, label), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: value,
    min: min,
    max: max,
    step: step,
    onChange: e => onChange(clamp(Number(e.target.value)))
  }), unit && /*#__PURE__*/React.createElement("span", {
    className: "twk-num-unit"
  }, unit));
}

// Relative-luminance contrast pick — checkmarks drawn over a swatch need to
// read on both #111 and #fafafa without per-option configuration. Hex input
// only (#rgb / #rrggbb); named or rgb()/hsl() colors fall through to "light".
function __twkIsLight(hex) {
  const h = String(hex).replace('#', '');
  const x = h.length === 3 ? h.replace(/./g, c => c + c) : h.padEnd(6, '0');
  const n = parseInt(x.slice(0, 6), 16);
  if (Number.isNaN(n)) return true;
  const r = n >> 16 & 255,
    g = n >> 8 & 255,
    b = n & 255;
  return r * 299 + g * 587 + b * 114 > 148000;
}
const __TwkCheck = ({
  light
}) => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 14 14",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M3 7.2 5.8 10 11 4.2",
  fill: "none",
  strokeWidth: "2.2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  stroke: light ? 'rgba(0,0,0,.78)' : '#fff'
}));

// TweakColor — curated color/palette picker. Each option is either a single
// hex string or an array of 1-5 hex strings; the card adapts — a lone color
// renders solid, a palette renders colors[0] as the hero (left ~2/3) with the
// rest stacked in a sharp column on the right. onChange emits the
// option in the shape it was passed (string stays string, array stays array).
// Without options it falls back to the native color input for back-compat.
function TweakColor({
  label,
  value,
  options,
  onChange
}) {
  if (!options || !options.length) {
    return /*#__PURE__*/React.createElement("div", {
      className: "twk-row twk-row-h"
    }, /*#__PURE__*/React.createElement("div", {
      className: "twk-lbl"
    }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("input", {
      type: "color",
      className: "twk-swatch",
      value: value,
      onChange: e => onChange(e.target.value)
    }));
  }
  // Native <input type=color> emits lowercase hex per the HTML spec, so
  // compare case-insensitively. String() guards JSON.stringify(undefined),
  // which returns the primitive undefined (no .toLowerCase).
  const key = o => String(JSON.stringify(o)).toLowerCase();
  const cur = key(value);
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-chips",
    role: "radiogroup"
  }, options.map((o, i) => {
    const colors = Array.isArray(o) ? o : [o];
    const [hero, ...rest] = colors;
    const sup = rest.slice(0, 4);
    const on = key(o) === cur;
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      type: "button",
      className: "twk-chip",
      role: "radio",
      "aria-checked": on,
      "data-on": on ? '1' : '0',
      "aria-label": colors.join(', '),
      title: colors.join(' · '),
      style: {
        background: hero
      },
      onClick: () => onChange(o)
    }, sup.length > 0 && /*#__PURE__*/React.createElement("span", null, sup.map((c, j) => /*#__PURE__*/React.createElement("i", {
      key: j,
      style: {
        background: c
      }
    }))), on && /*#__PURE__*/React.createElement(__TwkCheck, {
      light: __twkIsLight(hero)
    }));
  })));
}
function TweakButton({
  label,
  onClick,
  secondary = false
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: secondary ? 'twk-btn secondary' : 'twk-btn',
    onClick: onClick
  }, label);
}
Object.assign(window, {
  useTweaks,
  TweaksPanel,
  TweakSection,
  TweakRow,
  TweakSlider,
  TweakToggle,
  TweakRadio,
  TweakSelect,
  TweakText,
  TweakNumber,
  TweakColor,
  TweakButton
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "catalogue/tweaks-panel.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function Badge({
  children,
  tone = "neutral",
  // neutral | cobalt | ok | pending | alert
  variant = "soft",
  // soft | outline | dot
  size = "md",
  // sm | md
  style = {}
}) {
  const tones = {
    neutral: {
      fg: "var(--text-secondary)",
      bg: "var(--surface-raised)",
      bd: "var(--border-strong)",
      dot: "var(--lh-grey-400)"
    },
    cobalt: {
      fg: "var(--lh-cobalt-100)",
      bg: "var(--lh-glass-fill-cobalt)",
      bd: "var(--border-lit)",
      dot: "var(--accent)"
    },
    ok: {
      fg: "#7FD3A6",
      bg: "var(--lh-positive-dim)",
      bd: "rgba(47,169,104,0.35)",
      dot: "var(--status-ok)"
    },
    pending: {
      fg: "#E0BE76",
      bg: "var(--lh-warning-dim)",
      bd: "rgba(201,150,46,0.35)",
      dot: "var(--status-pending)"
    },
    alert: {
      fg: "#E78D88",
      bg: "var(--lh-critical-dim)",
      bd: "rgba(214,80,74,0.4)",
      dot: "var(--status-alert)"
    }
  };
  const t = tones[tone];
  const sz = size === "sm" ? {
    fontSize: 10.5,
    padding: "3px 8px",
    gap: 5
  } : {
    fontSize: 11.5,
    padding: "5px 11px",
    gap: 6
  };
  const base = {
    display: "inline-flex",
    alignItems: "center",
    gap: sz.gap,
    fontFamily: "var(--font-mono)",
    fontWeight: 500,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    lineHeight: 1,
    borderRadius: "var(--radius-sm)",
    padding: sz.padding,
    fontSize: sz.fontSize,
    color: t.fg,
    background: variant === "outline" ? "transparent" : t.bg,
    border: `1px solid ${variant === "soft" ? "transparent" : t.bd}`,
    ...style
  };
  return /*#__PURE__*/React.createElement("span", {
    style: base
  }, (variant === "dot" || tone !== "neutral") && variant !== "outline" ? /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: "var(--radius-pill)",
      background: t.dot,
      boxShadow: tone !== "neutral" ? `0 0 8px ${t.dot}` : "none",
      flex: "0 0 auto"
    }
  }) : null, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Button({
  children,
  variant = "primary",
  // primary | secondary | ghost | danger
  size = "md",
  // sm | md | lg
  iconLeft = null,
  iconRight = null,
  disabled = false,
  full = false,
  onClick,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: {
      padding: "7px 13px",
      fontSize: 13,
      height: 32
    },
    md: {
      padding: "10px 18px",
      fontSize: 14,
      height: 40
    },
    lg: {
      padding: "13px 24px",
      fontSize: 15,
      height: 48
    }
  };
  const variants = {
    primary: {
      background: "var(--accent)",
      color: "var(--text-on-cobalt)",
      border: "1px solid var(--accent)",
      boxShadow: "var(--glow-md), var(--shadow-edge-cobalt)"
    },
    secondary: {
      background: "var(--surface-raised)",
      color: "var(--text-primary)",
      border: "1px solid var(--border-strong)",
      boxShadow: "var(--shadow-edge)"
    },
    ghost: {
      background: "transparent",
      color: "var(--text-secondary)",
      border: "1px solid transparent",
      boxShadow: "none"
    },
    danger: {
      background: "transparent",
      color: "var(--status-alert)",
      border: "1px solid var(--lh-critical-dim)",
      boxShadow: "none"
    }
  };
  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "var(--gap-inline)",
    fontFamily: "var(--font-body)",
    fontWeight: 500,
    letterSpacing: "0.01em",
    lineHeight: 1,
    borderRadius: "var(--radius-sm)",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.45 : 1,
    width: full ? "100%" : "auto",
    transition: "background var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)",
    WebkitTapHighlightColor: "transparent",
    ...sizes[size],
    ...variants[variant],
    ...style
  };
  const hoverFx = {
    primary: (e, on) => {
      e.currentTarget.style.background = on ? "var(--accent-hover)" : "var(--accent)";
    },
    secondary: (e, on) => {
      e.currentTarget.style.background = on ? "var(--surface-card)" : "var(--surface-raised)";
      e.currentTarget.style.borderColor = on ? "var(--border-lit)" : "var(--border-strong)";
    },
    ghost: (e, on) => {
      e.currentTarget.style.color = on ? "var(--text-primary)" : "var(--text-secondary)";
      e.currentTarget.style.background = on ? "var(--surface-raised)" : "transparent";
    },
    danger: (e, on) => {
      e.currentTarget.style.background = on ? "var(--lh-critical-dim)" : "transparent";
    }
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    disabled: disabled,
    onClick: onClick,
    style: base,
    onMouseEnter: e => !disabled && hoverFx[variant](e, true),
    onMouseLeave: e => !disabled && hoverFx[variant](e, false),
    onMouseDown: e => !disabled && (e.currentTarget.style.transform = "translateY(1px)"),
    onMouseUp: e => !disabled && (e.currentTarget.style.transform = "translateY(0)")
  }, rest), iconLeft, children, iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Eyebrow.jsx
try { (() => {
function Eyebrow({
  children,
  number = null,
  // optional oversized section number like "04"
  tone = "cobalt",
  // cobalt | muted | white
  style = {}
}) {
  const colors = {
    cobalt: "var(--lh-cobalt-100)",
    muted: "var(--text-muted)",
    white: "var(--text-primary)"
  };
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 12,
      ...style
    }
  }, number != null && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontWeight: 500,
      fontSize: 12,
      color: "var(--text-faint)",
      letterSpacing: "0.04em"
    }
  }, number), number != null && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 24,
      height: 1,
      background: "var(--border-strong)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-body)",
      fontWeight: 400,
      fontSize: "var(--fs-micro)",
      letterSpacing: "var(--ls-label)",
      textTransform: "uppercase",
      color: colors[tone]
    }
  }, children));
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function Input({
  label = null,
  placeholder = "",
  value,
  defaultValue,
  onChange,
  type = "text",
  iconLeft = null,
  hint = null,
  error = null,
  disabled = false,
  mono = false,
  full = true,
  style = {}
}) {
  const [focused, setFocused] = React.useState(false);
  const borderColor = error ? "var(--status-alert)" : focused ? "var(--border-lit)" : "var(--border-strong)";
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: full ? "block" : "inline-block",
      width: full ? "100%" : "auto",
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      marginBottom: 8,
      fontFamily: "var(--font-mono)",
      fontSize: 10.5,
      fontWeight: 500,
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      color: "var(--text-muted)"
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      background: "var(--surface-inset)",
      border: `1px solid ${borderColor}`,
      borderRadius: "var(--radius-sm)",
      padding: "0 14px",
      height: 44,
      boxShadow: focused && !error ? "var(--glow-focus)" : "none",
      transition: "border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)",
      opacity: disabled ? 0.5 : 1
    }
  }, iconLeft && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-muted)",
      display: "inline-flex",
      flex: "0 0 auto"
    }
  }, iconLeft), /*#__PURE__*/React.createElement("input", {
    type: type,
    placeholder: placeholder,
    value: value,
    defaultValue: defaultValue,
    onChange: onChange,
    disabled: disabled,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    style: {
      flex: 1,
      minWidth: 0,
      background: "transparent",
      border: "none",
      outline: "none",
      color: "var(--text-primary)",
      fontFamily: mono ? "var(--font-mono)" : "var(--font-body)",
      fontSize: 14,
      fontWeight: 400,
      letterSpacing: mono ? "0.02em" : "0"
    }
  })), (hint || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      marginTop: 7,
      fontSize: 12,
      color: error ? "var(--status-alert)" : "var(--text-muted)",
      fontFamily: "var(--font-body)"
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/GlassPanel.jsx
try { (() => {
function GlassPanel({
  children,
  title = null,
  eyebrow = null,
  actions = null,
  lit = false,
  // lit cobalt edge
  strong = false,
  // graphite vs charcoal glass
  padding = "var(--pad-panel)",
  style = {},
  bodyStyle = {}
}) {
  const wrap = {
    position: "relative",
    background: strong ? "var(--surface-glass-strong)" : "var(--surface-glass)",
    backdropFilter: "var(--blur-md)",
    WebkitBackdropFilter: "var(--blur-md)",
    border: `1px solid ${lit ? "var(--border-lit)" : "var(--border-glass)"}`,
    borderRadius: "var(--radius-lg)",
    boxShadow: lit ? "var(--glow-md), var(--shadow-lg), var(--shadow-edge)" : "var(--shadow-lg), var(--shadow-edge)",
    overflow: "hidden",
    ...style
  };
  const head = {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 16,
    padding: padding,
    paddingBottom: title || eyebrow ? "var(--space-4)" : padding
  };
  return /*#__PURE__*/React.createElement("section", {
    style: wrap
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: 1,
      background: lit ? "linear-gradient(90deg, transparent, var(--accent), transparent)" : "var(--grad-edge)",
      opacity: lit ? 0.8 : 1,
      pointerEvents: "none"
    }
  }), (eyebrow || title || actions) && /*#__PURE__*/React.createElement("header", {
    style: head
  }, /*#__PURE__*/React.createElement("div", null, eyebrow && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: 11,
      fontWeight: 400,
      letterSpacing: "var(--ls-label)",
      textTransform: "uppercase",
      color: "var(--lh-cobalt-100)",
      marginBottom: 8
    }
  }, eyebrow), title && /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontFamily: "var(--font-display)",
      fontWeight: 400,
      fontSize: "var(--fs-title-md)",
      letterSpacing: "-0.012em",
      color: "var(--text-primary)"
    }
  }, title)), actions && /*#__PURE__*/React.createElement("div", {
    style: {
      flex: "0 0 auto"
    }
  }, actions)), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: eyebrow || title || actions ? `0 ${typeof padding === "string" ? padding : padding + "px"} ${typeof padding === "string" ? padding : padding + "px"}` : padding,
      ...bodyStyle
    }
  }, children));
}
Object.assign(__ds_scope, { GlassPanel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/GlassPanel.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/StatTile.jsx
try { (() => {
function StatTile({
  label,
  value,
  unit = null,
  delta = null,
  // e.g. "+12%" or "-3"
  trend = "flat",
  // up | down | flat
  tone = "default",
  // default | cobalt
  sparkline = null,
  // optional array of numbers 0..1
  style = {}
}) {
  const trendColor = trend === "up" ? "var(--status-ok)" : trend === "down" ? "var(--status-alert)" : "var(--text-muted)";
  const arrow = trend === "up" ? "▲" : trend === "down" ? "▼" : "—";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      background: tone === "cobalt" ? "var(--lh-glass-fill-cobalt)" : "var(--surface-card)",
      border: `1px solid ${tone === "cobalt" ? "var(--border-lit)" : "var(--border-default)"}`,
      borderRadius: "var(--radius-md)",
      padding: "var(--space-5)",
      boxShadow: "var(--shadow-edge)",
      overflow: "hidden",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 10.5,
      fontWeight: 500,
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      color: "var(--text-muted)"
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: 6,
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 300,
      fontSize: 34,
      lineHeight: 1,
      letterSpacing: "-0.02em",
      color: tone === "cobalt" ? "var(--lh-cobalt-100)" : "var(--text-primary)"
    }
  }, value), unit && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      color: "var(--text-muted)",
      fontWeight: 400
    }
  }, unit)), (delta != null || sparkline) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: 12,
      gap: 10
    }
  }, delta != null && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      fontWeight: 500,
      color: trendColor,
      display: "inline-flex",
      alignItems: "center",
      gap: 5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 8
    }
  }, arrow), delta), sparkline && /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 100 28",
    preserveAspectRatio: "none",
    style: {
      width: 88,
      height: 24,
      flex: "0 0 auto"
    }
  }, /*#__PURE__*/React.createElement("polyline", {
    points: sparkline.map((v, i) => `${i / (sparkline.length - 1) * 100},${28 - v * 24 - 2}`).join(" "),
    fill: "none",
    stroke: "var(--accent)",
    strokeWidth: "1.5",
    vectorEffect: "non-scaling-stroke",
    strokeLinejoin: "round",
    strokeLinecap: "round"
  }))));
}
Object.assign(__ds_scope, { StatTile });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/StatTile.jsx", error: String((e && e.message) || e) }); }

// ui_kits/control-room/App.jsx
try { (() => {
/* LeanHippo Control Room — app shell: login → connected dashboard. */
const {
  Icon,
  Row,
  lbl,
  ControlRoomView
} = window.LHViews;
const {
  VaultView,
  MindView,
  OrganView
} = window.LHViews2;
const ADS = window.DesignSystem_8aad64;
const NAV = [{
  key: "control",
  icon: "gauge",
  label: "The Control Room",
  fn: "Visibility"
}, {
  key: "vault",
  icon: "vault",
  label: "The Vault",
  fn: "Money"
}, {
  key: "switchboard",
  icon: "switchboard",
  label: "The Switchboard",
  fn: "Customers"
}, {
  key: "playbook",
  icon: "book",
  label: "The Playbook",
  fn: "Knowledge"
}, {
  key: "supply",
  icon: "truck",
  label: "The Supply Line",
  fn: "Procurement"
}, {
  key: "mind",
  icon: "brain",
  label: "The Mind",
  fn: "Decisions"
}];

/* ---------------- Login ---------------- */
function Login({
  onEnter
}) {
  const [org, setOrg] = React.useState("Riverside Trading Co");
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "radial-gradient(120% 100% at 50% -10%, #0E1424 0%, #050505 60%)"
    }
  }, /*#__PURE__*/React.createElement("canvas", {
    className: "lh-network",
    "data-density": "0.4",
    "data-formed": "0.6",
    "data-seed": "5",
    "data-speed": "0.6",
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      opacity: .5
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "linear-gradient(180deg, rgba(5,5,5,.4), rgba(5,5,5,.85))"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 420,
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logos/leanhippo-white.png",
    alt: "LeanHippo",
    style: {
      height: 92,
      marginBottom: 30
    }
  }), /*#__PURE__*/React.createElement(ADS.GlassPanel, {
    lit: true,
    strong: true,
    style: {
      textAlign: "left"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement(ADS.Eyebrow, null, "Connected systems")), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: "8px 0 22px",
      fontFamily: "var(--font-display)",
      fontWeight: 300,
      fontSize: 26,
      color: "var(--text-primary)",
      letterSpacing: "-.01em"
    }
  }, "Sign in to your control room"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(ADS.Input, {
    label: "Organisation",
    value: org,
    onChange: e => setOrg(e.target.value),
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "search",
      size: 16
    })
  }), /*#__PURE__*/React.createElement(ADS.Input, {
    label: "Access code",
    defaultValue: "LH-0042",
    mono: true
  }), /*#__PURE__*/React.createElement(ADS.Button, {
    variant: "primary",
    full: true,
    onClick: () => onEnter(org),
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow",
      size: 16,
      color: "#fff"
    })
  }, "Enter the system"))), /*#__PURE__*/React.createElement("div", {
    style: {
      ...lbl,
      marginTop: 18,
      textAlign: "center"
    }
  }, "LeanHippo Systems \xB7 We build the systems businesses run on")));
}

/* ---------------- Sidebar ---------------- */
function Sidebar({
  active,
  setActive
}) {
  return /*#__PURE__*/React.createElement("aside", {
    style: {
      width: 264,
      flex: "0 0 264px",
      background: "var(--lh-graphite)",
      borderRight: "1px solid var(--border-default)",
      display: "flex",
      flexDirection: "column",
      padding: "22px 16px"
    }
  }, /*#__PURE__*/React.createElement(Row, {
    style: {
      gap: 12,
      padding: "6px 10px 22px"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logos/leanhippo-mark-white.png",
    alt: "",
    style: {
      height: 30
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 400,
      fontSize: 15,
      color: "var(--text-primary)",
      lineHeight: 1
    }
  }, "LeanHippo"), /*#__PURE__*/React.createElement("div", {
    style: {
      ...lbl,
      fontSize: 9,
      marginTop: 3
    }
  }, "Control Room"))), /*#__PURE__*/React.createElement("div", {
    style: {
      ...lbl,
      padding: "0 12px 10px",
      fontSize: 9.5
    }
  }, "Six organs"), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "grid",
      gap: 4
    }
  }, NAV.map(n => {
    const on = active === n.key;
    return /*#__PURE__*/React.createElement("button", {
      key: n.key,
      onClick: () => setActive(n.key),
      style: {
        display: "flex",
        alignItems: "center",
        gap: 13,
        padding: "11px 12px",
        borderRadius: "var(--radius-sm)",
        cursor: "pointer",
        textAlign: "left",
        width: "100%",
        fontFamily: "var(--font-body)",
        background: on ? "var(--lh-glass-fill-cobalt)" : "transparent",
        border: `1px solid ${on ? "var(--border-lit)" : "transparent"}`,
        boxShadow: on ? "var(--glow-sm)" : "none",
        transition: "background .15s, border-color .15s"
      },
      onMouseEnter: e => {
        if (!on) e.currentTarget.style.background = "var(--surface-raised)";
      },
      onMouseLeave: e => {
        if (!on) e.currentTarget.style.background = "transparent";
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: n.icon,
      size: 18,
      color: on ? "var(--lh-cobalt-100)" : "var(--text-muted)"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        color: on ? "var(--text-primary)" : "var(--text-secondary)"
      }
    }, n.label), /*#__PURE__*/React.createElement("div", {
      style: {
        ...lbl,
        fontSize: 9,
        marginTop: 2
      }
    }, n.fn)));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("button", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 13,
      padding: "11px 12px",
      borderRadius: "var(--radius-sm)",
      cursor: "pointer",
      background: "transparent",
      border: "1px solid transparent",
      width: "100%",
      color: "var(--text-muted)",
      fontFamily: "var(--font-body)",
      fontSize: 14
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "settings",
    size: 18,
    color: "var(--text-muted)"
  }), " Settings & approvals"));
}

/* ---------------- Topbar ---------------- */
function Topbar({
  org,
  title,
  fn
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "20px 32px",
      borderBottom: "1px solid var(--border-default)",
      flex: "0 0 auto"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 7
    }
  }, /*#__PURE__*/React.createElement(ADS.Eyebrow, {
    tone: "muted"
  }, fn)), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: "var(--font-display)",
      fontWeight: 300,
      fontSize: 26,
      color: "var(--text-primary)",
      letterSpacing: "-.015em"
    }
  }, title)), /*#__PURE__*/React.createElement(Row, {
    style: {
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Row, {
    style: {
      gap: 9,
      padding: "9px 14px",
      background: "var(--surface-inset)",
      border: "1px solid var(--border-strong)",
      borderRadius: "var(--radius-sm)",
      minWidth: 220
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 15,
    color: "var(--text-muted)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-faint)",
      fontSize: 13
    }
  }, "Search the system\u2026")), /*#__PURE__*/React.createElement("button", {
    style: {
      position: "relative",
      width: 40,
      height: 40,
      borderRadius: "var(--radius-sm)",
      background: "var(--surface-card)",
      border: "1px solid var(--border-strong)",
      cursor: "pointer",
      display: "grid",
      placeItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "bell",
    size: 17,
    color: "var(--text-secondary)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 8,
      right: 9,
      width: 7,
      height: 7,
      borderRadius: "50%",
      background: "var(--status-alert)",
      boxShadow: "0 0 7px var(--status-alert)"
    }
  })), /*#__PURE__*/React.createElement(Row, {
    style: {
      gap: 10,
      padding: "5px 14px 5px 6px",
      background: "var(--surface-card)",
      border: "1px solid var(--border-strong)",
      borderRadius: "var(--radius-pill)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 30,
      height: 30,
      borderRadius: "50%",
      background: "var(--grad-cobalt)",
      display: "grid",
      placeItems: "center",
      color: "#fff",
      fontSize: 12,
      fontWeight: 500
    }
  }, "R"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "var(--text-primary)"
    }
  }, org))));
}

/* ---------------- Content router ---------------- */
function Content({
  active
}) {
  switch (active) {
    case "control":
      return /*#__PURE__*/React.createElement(ControlRoomView, null);
    case "vault":
      return /*#__PURE__*/React.createElement(VaultView, null);
    case "mind":
      return /*#__PURE__*/React.createElement(MindView, null);
    case "switchboard":
      return /*#__PURE__*/React.createElement(OrganView, {
        eyebrow: "Customer response",
        title: "Every enquiry, one system",
        body: "Customer messages from Instagram, Facebook, website, forms, and calls are routed into one response system so enquiries stop disappearing between channels. AI classifies, suggests replies, and flags urgency \u2014 humans approve sensitive replies before they are sent.",
        includes: ["Multi-channel capture", "Auto-response where suitable", "Human handoff", "Lead assignment", "Missed enquiry alerts", "CRM entry", "Follow-up reminders", "Conversation history", "Response templates", "Escalation rules"]
      });
    case "playbook":
      return /*#__PURE__*/React.createElement(OrganView, {
        eyebrow: "Knowledge & process",
        title: "Institutional memory",
        body: "Processes, standards, role instructions, recurring tasks, escalation rules, and operating knowledge are captured into a system staff can actually follow. AI turns rough notes and policies into structured SOPs, checklists, and searchable knowledge.",
        includes: ["SOP library", "Staff checklists", "Onboarding flows", "Role instructions", "Recurring task templates", "Escalation rules", "Approval logic", "Training references", "Quality standards", "Internal knowledge base"]
      });
    case "supply":
      return /*#__PURE__*/React.createElement(OrganView, {
        eyebrow: "Procurement",
        title: "One controlled supply line",
        body: "Supplier prices, purchase requests, stock needs, approvals, delivery records, and reorder logic move through one controlled flow. The system shows what is being bought, from whom, why, and at what price.",
        includes: ["Supplier database", "Price comparison", "Purchase request flow", "Approval workflow", "Reorder prompts", "Delivery tracking", "Procurement history", "Preferred supplier logic", "Variance alerts", "Stock-linked suggestions"]
      });
    default:
      return /*#__PURE__*/React.createElement(ControlRoomView, null);
  }
}

/* ---------------- App ---------------- */
function App() {
  const [org, setOrg] = React.useState(null);
  const [active, setActive] = React.useState("control");
  React.useEffect(() => {
    if (window.LHNetwork) window.LHNetwork.init();
  }, [org]);
  if (!org) return /*#__PURE__*/React.createElement(Login, {
    onEnter: setOrg
  });
  const cur = NAV.find(n => n.key === active);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      height: "100%",
      background: "var(--lh-black)"
    }
  }, /*#__PURE__*/React.createElement(Sidebar, {
    active: active,
    setActive: setActive
  }), /*#__PURE__*/React.createElement("main", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      minWidth: 0,
      background: "radial-gradient(120% 90% at 80% 0%, #0B0F16 0%, #050505 55%)"
    }
  }, /*#__PURE__*/React.createElement(Topbar, {
    org: org,
    title: cur.label,
    fn: `Function · ${cur.fn}`
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: "auto",
      padding: 32,
      minHeight: 0
    }
  }, /*#__PURE__*/React.createElement(Content, {
    active: active
  }))));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/control-room/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/control-room/Views.jsx
try { (() => {
/* LeanHippo Control Room — shared views & icon set.
   Icons: Lucide path data (stroke 1.5) — substitute icon system, flagged in readme. */
const {
  useState
} = React;
const DS = window.DesignSystem_8aad64;
const {
  Button,
  Badge,
  Eyebrow,
  Input,
  GlassPanel,
  StatTile
} = DS;

/* ---------------- Icon ---------------- */
const ICONS = {
  gauge: ["M12 14l4-4", "M3.34 19a10 10 0 1 1 17.32 0"],
  vault: ["M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z", "M7.35 7.35 16.65 16.65", "M16.65 7.35 7.35 16.65", "M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0"],
  switchboard: ["M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"],
  book: ["M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"],
  truck: ["M14 18V6a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h2", "M14 9h4l4 4v4a1 1 0 0 1-1 1h-1", "M7.5 18m-2.5 0a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0-5 0", "M17.5 18m-2.5 0a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0-5 0"],
  brain: ["M12 5a3 3 0 1 0-5.997.142 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z", "M12 5a3 3 0 1 1 5.997.142 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"],
  search: ["M11 11m-8 0a8 8 0 1 0 16 0a8 8 0 1 0-16 0", "M21 21l-4.3-4.3"],
  bell: ["M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9", "M10.3 21a1.94 1.94 0 0 0 3.4 0"],
  check: ["M20 6 9 17l-5-5"],
  x: ["M18 6 6 18", "M6 6l12 12"],
  settings: ["M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z", "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"],
  arrow: ["M5 12h14", "M12 5l7 7-7 7"],
  send: ["M22 2 11 13", "M22 2 15 22l-4-9-9-4z"],
  alert: ["M12 9v4", "M12 17h.01", "M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"],
  dot: ["M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0"]
};
function Icon({
  name,
  size = 18,
  color = "currentColor",
  stroke = 1.6,
  style = {}
}) {
  const paths = ICONS[name] || [];
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: stroke,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: style
  }, paths.map((d, i) => /*#__PURE__*/React.createElement("path", {
    key: i,
    d: d
  })));
}

/* ---------------- Sparkline svg ---------------- */
function Spark({
  points,
  w = 320,
  h = 90,
  fill = true
}) {
  const pts = points.map((v, i) => `${i / (points.length - 1) * w},${h - v * (h - 8) - 4}`).join(" ");
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: `0 0 ${w} ${h}`,
    preserveAspectRatio: "none",
    style: {
      width: "100%",
      height: h
    }
  }, fill && /*#__PURE__*/React.createElement("polyline", {
    points: `0,${h} ${pts} ${w},${h}`,
    fill: "url(#sg)",
    stroke: "none",
    opacity: "0.22"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: pts,
    fill: "none",
    stroke: "var(--accent)",
    strokeWidth: "2",
    vectorEffect: "non-scaling-stroke",
    strokeLinejoin: "round"
  }), /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: "sg",
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0",
    stopColor: "#1F5EFF"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "1",
    stopColor: "#1F5EFF",
    stopOpacity: "0"
  }))));
}

/* ---------------- helpers ---------------- */
const lbl = {
  fontFamily: "var(--font-mono)",
  fontSize: 10.5,
  letterSpacing: ".12em",
  textTransform: "uppercase",
  color: "var(--text-muted)"
};
const cardBox = {
  background: "var(--surface-card)",
  border: "1px solid var(--border-default)",
  borderRadius: "var(--radius-md)"
};
function Row({
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      ...style
    }
  }, children);
}

/* ====================================================================
   VIEW: Control Room (visibility)
   ==================================================================== */
function ControlRoomView() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(StatTile, {
    label: "Cash today",
    value: "48.2",
    unit: "k",
    delta: "+12%",
    trend: "up",
    sparkline: [.2, .5, .3, .6, .5, .85, 1]
  }), /*#__PURE__*/React.createElement(StatTile, {
    label: "Sales \xB7 week",
    value: "312",
    unit: "k",
    delta: "+8%",
    trend: "up",
    tone: "cobalt",
    sparkline: [.3, .4, .5, .45, .7, .8, .95]
  }), /*#__PURE__*/React.createElement(StatTile, {
    label: "Open enquiries",
    value: "14",
    delta: "+3",
    trend: "up"
  }), /*#__PURE__*/React.createElement(StatTile, {
    label: "Missed enquiries",
    value: "3",
    delta: "-2",
    trend: "down",
    sparkline: [.9, .7, .8, .5, .4, .3, .2]
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1.6fr 1fr",
      gap: 18
    }
  }, /*#__PURE__*/React.createElement(GlassPanel, {
    eyebrow: "Performance",
    title: "Sales & cash \xB7 this week",
    actions: /*#__PURE__*/React.createElement(Badge, {
      tone: "ok"
    }, "Live")
  }, /*#__PURE__*/React.createElement(Spark, {
    points: [.35, .42, .38, .55, .5, .62, .58, .74, .7, .88, .95],
    h: 150
  }), /*#__PURE__*/React.createElement(Row, {
    style: {
      justifyContent: "space-between",
      marginTop: 14,
      gap: 10
    }
  }, ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(d => /*#__PURE__*/React.createElement("span", {
    key: d,
    style: {
      ...lbl,
      fontSize: 10
    }
  }, d)))), /*#__PURE__*/React.createElement(GlassPanel, {
    eyebrow: "Exceptions",
    title: "Needs attention",
    actions: /*#__PURE__*/React.createElement(Badge, {
      tone: "alert",
      variant: "dot"
    }, "3"),
    bodyStyle: {
      display: "grid",
      gap: 10
    }
  }, [{
    t: "Petty cash variance · R2,400",
    tone: "alert",
    ic: "alert"
  }, {
    t: "Supplier price up 9% · Davis Co",
    tone: "pending",
    ic: "truck"
  }, {
    t: "5 enquiries unassigned",
    tone: "pending",
    ic: "switchboard"
  }, {
    t: "Closing checklist skipped",
    tone: "neutral",
    ic: "book"
  }].map((e, i) => /*#__PURE__*/React.createElement(Row, {
    key: i,
    style: {
      ...cardBox,
      padding: "12px 14px",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: e.ic,
    size: 16,
    color: "var(--text-muted)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13.5,
      color: "var(--text-secondary)",
      flex: 1
    }
  }, e.t), /*#__PURE__*/React.createElement(Badge, {
    tone: e.tone,
    size: "sm"
  }, e.tone === "alert" ? "Leak" : e.tone === "pending" ? "Review" : "Log"))))));
}
window.LHViews = {
  Icon,
  Spark,
  Row,
  lbl,
  cardBox,
  ControlRoomView
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/control-room/Views.jsx", error: String((e && e.message) || e) }); }

// ui_kits/control-room/Views2.jsx
try { (() => {
/* LeanHippo Control Room — interactive views: The Vault, The Mind, organ placeholders. */
const {
  Icon,
  Row,
  lbl,
  cardBox
} = window.LHViews;
const V2DS = window.DesignSystem_8aad64;

/* ====================================================================
   VIEW: The Vault — approval queue (interactive approve / decline)
   ==================================================================== */
function VaultView() {
  const [items, setItems] = React.useState([{
    id: "REQ-1042",
    who: "Naledi M.",
    what: "Stock purchase · Davis Co",
    amt: "R 12,400",
    status: "pending"
  }, {
    id: "REQ-1041",
    who: "Sipho K.",
    what: "Petty cash · cleaning",
    amt: "R 850",
    status: "pending"
  }, {
    id: "REQ-1039",
    who: "Thabo D.",
    what: "Expense · fuel reimbursement",
    amt: "R 1,260",
    status: "pending"
  }, {
    id: "REQ-1037",
    who: "Lerato N.",
    what: "Supplier deposit · packaging",
    amt: "R 6,000",
    status: "pending"
  }]);
  const decide = (id, status) => setItems(xs => xs.map(x => x.id === id ? {
    ...x,
    status
  } : x));
  const pending = items.filter(i => i.status === "pending").length;
  return /*#__PURE__*/React.createElement(V2DS.GlassPanel, {
    eyebrow: "Money control",
    title: "Approval queue",
    actions: /*#__PURE__*/React.createElement(V2DS.Badge, {
      tone: pending ? "pending" : "ok"
    }, pending ? `${pending} awaiting` : "All cleared"),
    bodyStyle: {
      display: "grid",
      gap: 11
    }
  }, items.map(it => /*#__PURE__*/React.createElement(Row, {
    key: it.id,
    style: {
      ...cardBox,
      padding: "16px 18px",
      gap: 16,
      borderColor: it.status === "approved" ? "rgba(47,169,104,.4)" : it.status === "declined" ? "rgba(214,80,74,.4)" : "var(--border-default)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(Row, {
    style: {
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      color: "var(--text-primary)",
      fontWeight: 500
    }
  }, it.what), /*#__PURE__*/React.createElement("span", {
    style: {
      ...lbl
    }
  }, it.id)), /*#__PURE__*/React.createElement("div", {
    style: {
      ...lbl,
      marginTop: 6,
      textTransform: "none",
      letterSpacing: 0
    }
  }, "Requested by ", it.who)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 16,
      color: "var(--text-primary)",
      minWidth: 90,
      textAlign: "right"
    }
  }, it.amt), it.status === "pending" ? /*#__PURE__*/React.createElement(Row, {
    style: {
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(V2DS.Button, {
    size: "sm",
    variant: "primary",
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      size: 14,
      color: "#fff"
    }),
    onClick: () => decide(it.id, "approved")
  }, "Approve"), /*#__PURE__*/React.createElement(V2DS.Button, {
    size: "sm",
    variant: "ghost",
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "x",
      size: 14
    }),
    onClick: () => decide(it.id, "declined")
  }, "Decline")) : /*#__PURE__*/React.createElement(V2DS.Badge, {
    tone: it.status === "approved" ? "ok" : "alert"
  }, it.status))), /*#__PURE__*/React.createElement(Row, {
    style: {
      justifyContent: "space-between",
      marginTop: 6,
      ...lbl,
      textTransform: "none",
      letterSpacing: 0
    }
  }, /*#__PURE__*/React.createElement("span", null, "Every action logged \xB7 who requested, approved, spent, reviewed."), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--lh-cobalt-100)"
    }
  }, "Audit history \u2192")));
}

/* ====================================================================
   VIEW: The Mind — ask the business (canned, contextual answers)
   ==================================================================== */
const MIND_ANSWERS = {
  "What needs attention today?": "3 items need attention: a petty-cash variance of R2,400 in The Vault, a 9% supplier price rise from Davis Co, and 5 unassigned enquiries in The Switchboard.",
  "Where are we leaking money?": "Cash is tracking 4% above expected spend this week. The largest driver is packaging procurement — Davis Co pricing rose 9% while volume held flat. Recommend a price comparison before the next order.",
  "Which enquiries were missed?": "3 enquiries went unanswered past 24h yesterday — 2 from Instagram, 1 from the website form. All 3 are now flagged in The Switchboard and assigned for follow-up.",
  "What changed since last week?": "Sales are up 8% and cash up 12%. Missed enquiries fell from 9 to 3. One new exception: a skipped closing checklist on Saturday.",
  "What should be fixed first?": "Fix the procurement leak first — it is the highest-value, most repeatable loss. Connect The Supply Line price comparison and require approval above R10,000."
};
const MIND_QS = Object.keys(MIND_ANSWERS);
function MindView() {
  const [log, setLog] = React.useState([{
    role: "mind",
    text: "Ask the business what is happening. I answer from your connected dashboards, records, SOPs, and reports."
  }]);
  const [draft, setDraft] = React.useState("");
  const endRef = React.useRef(null);
  const ask = q => {
    const question = (q || draft).trim();
    if (!question) return;
    const a = MIND_ANSWERS[question] || "I would answer from your company data — dashboards, workflows, supplier and customer records, SOPs and reports. Connect a data source to enable this query.";
    setLog(l => [...l, {
      role: "user",
      text: question
    }, {
      role: "mind",
      text: a
    }]);
    setDraft("");
    setTimeout(() => endRef.current && endRef.current.scrollIntoView({
      block: "end"
    }), 20);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 300px",
      gap: 18,
      height: "100%"
    }
  }, /*#__PURE__*/React.createElement(V2DS.GlassPanel, {
    lit: true,
    eyebrow: "AI management intelligence",
    title: "The Mind",
    actions: /*#__PURE__*/React.createElement(V2DS.Badge, {
      tone: "cobalt",
      variant: "dot"
    }, "Context loaded"),
    style: {
      display: "flex",
      flexDirection: "column"
    },
    bodyStyle: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      minHeight: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: "auto",
      display: "grid",
      gap: 14,
      paddingRight: 6,
      alignContent: "start"
    }
  }, log.map((m, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      justifyContent: m.role === "user" ? "flex-end" : "flex-start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "78%",
      padding: "13px 16px",
      borderRadius: "var(--radius-md)",
      fontSize: 14.5,
      lineHeight: 1.5,
      background: m.role === "user" ? "var(--accent)" : "var(--surface-raised)",
      color: m.role === "user" ? "#fff" : "var(--text-secondary)",
      border: m.role === "user" ? "none" : "1px solid var(--border-default)"
    }
  }, m.role === "mind" && /*#__PURE__*/React.createElement("div", {
    style: {
      ...lbl,
      color: "var(--lh-cobalt-100)",
      marginBottom: 6
    }
  }, "The Mind"), m.text))), /*#__PURE__*/React.createElement("div", {
    ref: endRef
  })), /*#__PURE__*/React.createElement(Row, {
    style: {
      gap: 10,
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(V2DS.Input, {
    placeholder: "Ask the business\u2026",
    value: draft,
    onChange: e => setDraft(e.target.value)
  })), /*#__PURE__*/React.createElement(V2DS.Button, {
    variant: "primary",
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "send",
      size: 15,
      color: "#fff"
    }),
    onClick: () => ask()
  }, "Ask"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: 10,
      alignContent: "start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...lbl,
      marginBottom: 2
    }
  }, "Suggested questions"), MIND_QS.map(q => /*#__PURE__*/React.createElement("button", {
    key: q,
    onClick: () => ask(q),
    style: {
      ...cardBox,
      textAlign: "left",
      padding: "13px 15px",
      cursor: "pointer",
      color: "var(--text-secondary)",
      fontSize: 13.5,
      fontFamily: "var(--font-body)",
      lineHeight: 1.4,
      transition: "border-color .15s, color .15s"
    },
    onMouseEnter: e => {
      e.currentTarget.style.borderColor = "var(--border-lit)";
      e.currentTarget.style.color = "var(--text-primary)";
    },
    onMouseLeave: e => {
      e.currentTarget.style.borderColor = "var(--border-default)";
      e.currentTarget.style.color = "var(--text-secondary)";
    }
  }, q))));
}

/* ====================================================================
   VIEW: generic organ placeholder
   ==================================================================== */
function OrganView({
  icon,
  eyebrow,
  title,
  body,
  includes,
  signal
}) {
  return /*#__PURE__*/React.createElement(V2DS.GlassPanel, {
    eyebrow: eyebrow,
    title: title
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 15.5,
      lineHeight: 1.6,
      color: "var(--text-secondary)",
      maxWidth: "62ch"
    }
  }, body), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "11px 28px",
      marginTop: 22
    }
  }, includes.map(i => /*#__PURE__*/React.createElement(Row, {
    key: i,
    style: {
      gap: 11,
      fontSize: 14,
      color: "var(--text-secondary)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      background: "var(--accent)",
      boxShadow: "0 0 8px rgba(31,94,255,.6)",
      transform: "rotate(45deg)",
      flex: "0 0 auto"
    }
  }), i))));
}
window.LHViews2 = {
  VaultView,
  MindView,
  OrganView
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/control-room/Views2.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/BookingModal.jsx
try { (() => {
/* Lean Hippo website — BookingModal: glassy multi-step Discovery Session request. */

const BOOK_SERVICES = [{
  key: "bottleneck",
  icon: "funnel",
  title: "Bottleneck Discovery Session",
  desc: "Identify where your business is losing time, money, control, or execution speed, and uncover the operational friction holding growth back."
}, {
  key: "systems",
  icon: "systems",
  title: "Business Systems Discovery Session",
  desc: "Review your workflows, approvals, SOPs, dashboards, tools, and data flow to identify what systems need to be built, connected, or improved."
}, {
  key: "growth",
  icon: "megaphone",
  title: "Growth & Marketing Discovery Session",
  desc: "Examine your positioning, lead generation, content systems, campaign structure, customer acquisition, and growth engine to find stronger routes to revenue."
}, {
  key: "financial",
  icon: "calc",
  title: "Accounting & Finance Discovery Session",
  desc: "Assess your financial visibility, reporting structure, reconciliations, payment tracking, cost control, and owner-level financial clarity."
}, {
  key: "ai",
  icon: "brain",
  title: "AI Readiness Discovery Session",
  desc: "Explore where AI can realistically improve your business, from automation and decision support to customer response, reporting, and internal intelligence."
}];
const BOOK_WINDOWS = [{
  key: "first",
  label: "First half",
  range: "9:00 AM – 12:00 PM"
}, {
  key: "second",
  label: "Second half",
  range: "2:30 PM – 5:30 PM"
}];
function nextBusinessDays(n) {
  const out = [],
    d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 1);
  while (out.length < n) {
    const day = d.getDay();
    if (day !== 0 && day !== 6) out.push(new Date(d));
    d.setDate(d.getDate() + 1);
  }
  return out;
}
const DOW = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function BookingModal({
  open,
  onClose,
  initialService
}) {
  const [step, setStep] = React.useState(0);
  const [service, setService] = React.useState("bottleneck");
  const [date, setDate] = React.useState(null);
  const [window_, setWindow] = React.useState(null);
  const [form, setForm] = React.useState({
    name: "",
    business: "",
    email: "",
    phone: "",
    notes: ""
  });
  const days = React.useMemo(() => nextBusinessDays(12), [open]);
  React.useEffect(() => {
    if (open) {
      setStep(0);
      setService(initialService || "bottleneck");
      setDate(null);
      setWindow(null);
      setForm({
        name: "",
        business: "",
        email: "",
        phone: "",
        notes: ""
      });
    }
  }, [open, initialService]);
  const svc = BOOK_SERVICES.find(s => s.key === service) || BOOK_SERVICES[0];
  const win = BOOK_WINDOWS.find(w => w.key === window_);
  const set = (k, v) => setForm(f => ({
    ...f,
    [k]: v
  }));
  const canNext = step === 0 ? !!service : step === 1 ? date != null && window_ != null : step === 2 ? form.name && form.email : true;
  const stepLabels = ["Session", "Preferred date", "Details", "Submitted"];
  const dateStr = date ? `${DOW[date.getDay()]} ${date.getDate()} ${MON[date.getMonth()]}` : "—";
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "book-overlay" + (open ? " open" : ""),
    onClick: onClose
  }), /*#__PURE__*/React.createElement("div", {
    className: "book-modal" + (open ? " open" : ""),
    role: "dialog",
    "aria-modal": "true",
    "aria-hidden": !open
  }, /*#__PURE__*/React.createElement("div", {
    className: "book-glow"
  }), /*#__PURE__*/React.createElement("button", {
    className: "book-close",
    onClick: onClose,
    "aria-label": "Close"
  }, /*#__PURE__*/React.createElement(WIcon, {
    name: "x",
    size: 18
  })), /*#__PURE__*/React.createElement("div", {
    className: "book-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "Book a Discovery Session"), /*#__PURE__*/React.createElement("div", {
    className: "book-steps"
  }, stepLabels.map((l, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "book-pip" + (i === step ? " on" : "") + (i < step ? " done" : "")
  }, /*#__PURE__*/React.createElement("span", {
    className: "bp-dot"
  }, i < step ? /*#__PURE__*/React.createElement(WIcon, {
    name: "check",
    size: 11,
    color: "#fff"
  }) : i + 1), /*#__PURE__*/React.createElement("span", {
    className: "bp-l"
  }, l))))), /*#__PURE__*/React.createElement("div", {
    className: "book-body"
  }, step === 0 && /*#__PURE__*/React.createElement("div", {
    className: "book-pane"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "book-h"
  }, "Choose your Discovery Session"), /*#__PURE__*/React.createElement("div", {
    className: "book-svcs"
  }, BOOK_SERVICES.map(s => /*#__PURE__*/React.createElement("button", {
    key: s.key,
    className: "book-svc" + (service === s.key ? " sel" : ""),
    onClick: () => setService(s.key)
  }, /*#__PURE__*/React.createElement("div", {
    className: "bs-ic"
  }, /*#__PURE__*/React.createElement(WIcon, {
    name: s.icon,
    size: 20,
    color: "var(--lh-cobalt-100)"
  })), /*#__PURE__*/React.createElement("div", {
    className: "bs-main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bs-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "bs-t"
  }, s.title)), /*#__PURE__*/React.createElement("div", {
    className: "bs-d"
  }, s.desc)), /*#__PURE__*/React.createElement("span", {
    className: "bs-check"
  }, service === s.key ? /*#__PURE__*/React.createElement(WIcon, {
    name: "check",
    size: 15,
    color: "#fff"
  }) : null))))), step === 1 && /*#__PURE__*/React.createElement("div", {
    className: "book-pane"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "book-h"
  }, "Pick a preferred date"), /*#__PURE__*/React.createElement("div", {
    className: "book-cal"
  }, days.map((d, i) => {
    const sel = date && d.toDateString() === date.toDateString();
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      className: "book-day" + (sel ? " sel" : ""),
      onClick: () => setDate(d)
    }, /*#__PURE__*/React.createElement("span", {
      className: "bd-dow"
    }, DOW[d.getDay()]), /*#__PURE__*/React.createElement("span", {
      className: "bd-num"
    }, d.getDate()), /*#__PURE__*/React.createElement("span", {
      className: "bd-mon"
    }, MON[d.getMonth()]));
  })), /*#__PURE__*/React.createElement("div", {
    className: "book-winlabel"
  }, "Preferred availability"), /*#__PURE__*/React.createElement("div", {
    className: "book-windows" + (date ? "" : " disabled")
  }, BOOK_WINDOWS.map(w => /*#__PURE__*/React.createElement("button", {
    key: w.key,
    className: "book-window" + (window_ === w.key ? " sel" : ""),
    disabled: !date,
    onClick: () => setWindow(w.key)
  }, /*#__PURE__*/React.createElement("span", {
    className: "bw-l"
  }, w.label), /*#__PURE__*/React.createElement("span", {
    className: "bw-r"
  }, w.range)))), !date && /*#__PURE__*/React.createElement("div", {
    className: "book-hint"
  }, "Select a preferred date to choose your availability window.")), step === 2 && /*#__PURE__*/React.createElement("div", {
    className: "book-pane"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "book-h"
  }, "Your details"), /*#__PURE__*/React.createElement("div", {
    className: "book-form"
  }, /*#__PURE__*/React.createElement("label", {
    className: "bf"
  }, /*#__PURE__*/React.createElement("span", null, "Full name"), /*#__PURE__*/React.createElement("input", {
    value: form.name,
    onChange: e => set("name", e.target.value),
    placeholder: "Naledi Mokoena"
  })), /*#__PURE__*/React.createElement("label", {
    className: "bf"
  }, /*#__PURE__*/React.createElement("span", null, "Business"), /*#__PURE__*/React.createElement("input", {
    value: form.business,
    onChange: e => set("business", e.target.value),
    placeholder: "Riverside Trading Co"
  })), /*#__PURE__*/React.createElement("label", {
    className: "bf"
  }, /*#__PURE__*/React.createElement("span", null, "Work email"), /*#__PURE__*/React.createElement("input", {
    value: form.email,
    onChange: e => set("email", e.target.value),
    placeholder: "you@business.co.za"
  })), /*#__PURE__*/React.createElement("label", {
    className: "bf"
  }, /*#__PURE__*/React.createElement("span", null, "Phone"), /*#__PURE__*/React.createElement("input", {
    value: form.phone,
    onChange: e => set("phone", e.target.value),
    placeholder: "+27 ..."
  })), /*#__PURE__*/React.createElement("label", {
    className: "bf full"
  }, /*#__PURE__*/React.createElement("span", null, "What should we look at first? ", /*#__PURE__*/React.createElement("em", null, "(optional)")), /*#__PURE__*/React.createElement("textarea", {
    value: form.notes,
    onChange: e => set("notes", e.target.value),
    rows: 3,
    placeholder: "Cash control, missed enquiries, supplier pricing\u2026"
  })))), step === 3 && /*#__PURE__*/React.createElement("div", {
    className: "book-pane book-confirm"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bc-orb"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mind-orb",
    style: {
      width: 72,
      height: 72,
      animation: "none",
      cursor: "default"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "glyph"
  }, /*#__PURE__*/React.createElement(WIcon, {
    name: "check",
    size: 30,
    color: "#fff"
  })))), /*#__PURE__*/React.createElement("h3", {
    className: "book-h",
    style: {
      textAlign: "center"
    }
  }, "Request Received"), /*#__PURE__*/React.createElement("p", {
    className: "book-sub"
  }, "Thank you for requesting a Lean Hippo Discovery Session. Our team will review your request and get in touch shortly to confirm the next step."), /*#__PURE__*/React.createElement("div", {
    className: "book-summary"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bsum-row"
  }, /*#__PURE__*/React.createElement("span", null, "Session"), /*#__PURE__*/React.createElement("b", null, svc.title)), /*#__PURE__*/React.createElement("div", {
    className: "bsum-row"
  }, /*#__PURE__*/React.createElement("span", null, "Preferred date"), /*#__PURE__*/React.createElement("b", null, dateStr)), /*#__PURE__*/React.createElement("div", {
    className: "bsum-row"
  }, /*#__PURE__*/React.createElement("span", null, "Availability"), /*#__PURE__*/React.createElement("b", null, win ? `${win.label} · ${win.range}` : "—")), /*#__PURE__*/React.createElement("div", {
    className: "bsum-row"
  }, /*#__PURE__*/React.createElement("span", null, "For"), /*#__PURE__*/React.createElement("b", null, form.business || form.name || "—"))))), /*#__PURE__*/React.createElement("div", {
    className: "book-foot"
  }, step < 3 ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "book-foot-info"
  }, svc.title, date ? ` · ${dateStr}` : "", win ? ` · ${win.label}` : ""), /*#__PURE__*/React.createElement("div", {
    className: "book-foot-btns"
  }, step > 0 && /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost",
    onClick: () => setStep(step - 1)
  }, "Back"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    disabled: !canNext,
    onClick: () => setStep(step + 1)
  }, step === 2 ? "Submit request" : "Continue", " ", /*#__PURE__*/React.createElement(WIcon, {
    name: "arrow",
    size: 16,
    color: "#fff"
  })))) : /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-lg",
    style: {
      marginLeft: "auto"
    },
    onClick: onClose
  }, "Done"))));
}
window.BookingModal = BookingModal;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/BookingModal.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/BusinessSystems.jsx
try { (() => {
/* LeanHippo website — Business Systems wing page. */

const ORGANS = [{
  fn: "01 · Visibility",
  icon: "gauge",
  title: "The Control Room",
  desc: "Your whole business — cash, sales, stock, tasks, approvals — live on one screen.",
  inc: ["Live business dashboard", "Cash & sales visibility", "Stock & task visibility", "Exception alerts", "Branch / department views", "Daily & weekly snapshots"]
}, {
  fn: "02 · Money",
  icon: "vault",
  title: "The Vault",
  desc: "Full financial control — cash movement, approvals, monthly P&L, cash flow, and reporting. Nothing of value moves unseen.",
  inc: ["Monthly P&L reports", "Cash flow tracking", "Bank reconciliation", "Expense & purchase approval", "Debtors & creditors", "Petty cash & till tracking", "Financial dashboards", "Audit history"]
}, {
  fn: "03 · Customers",
  icon: "switchboard",
  title: "The Switchboard",
  desc: "Every enquiry caught, answered, assigned, and tracked — across social, web, email, and calls.",
  inc: ["Multi-channel capture", "Auto-response where suitable", "Lead assignment", "Missed-enquiry alerts", "CRM entry & history", "Follow-up reminders"]
}, {
  fn: "04 · Knowledge",
  icon: "book",
  title: "The Playbook",
  desc: "SOPs, checklists, and operating knowledge captured into a system your staff can actually follow.",
  inc: ["SOP library", "Staff checklists", "Onboarding flows", "Role instructions", "Escalation rules", "Searchable knowledge base"]
}, {
  fn: "05 · Procurement",
  icon: "truck",
  title: "The Supply Line",
  desc: "Supplier prices, requests, approvals, and reorders move through one controlled pipeline.",
  inc: ["Supplier database", "Price comparison", "Purchase request flow", "Approval workflow", "Reorder prompts", "Delivery & variance tracking"]
}, {
  fn: "06 · Decisions",
  icon: "brain",
  title: "The Mind",
  desc: "The AI intelligence layer that answers from your business's own operating memory.",
  inc: ["Ask the business", "Activity summaries", "Issue & anomaly detection", "Drafted responses", "Suggested next actions", "Weekly decision briefs"]
}];
const VAULT_FINANCIALS = [{
  icon: "calc",
  h: "Monthly P&L reports",
  d: "Profit & loss compiled every month — revenue, costs, and margin, ready to read, not reconstruct."
}, {
  icon: "gauge",
  h: "Cash flow tracking",
  d: "Money in, money out, and what's coming — so cash is never a surprise at month-end."
}, {
  icon: "refresh",
  h: "Bank reconciliation",
  d: "Statements matched against records, with exceptions flagged for review."
}, {
  icon: "layers",
  h: "Debtors & creditors",
  d: "Who owes you, who you owe, and when — tracked and chased on schedule."
}, {
  icon: "eye",
  h: "Financial dashboards",
  d: "Live financial health — margin, burn, and runway — beside the rest of the business."
}, {
  icon: "shield",
  h: "Tax-ready exports",
  d: "Clean, structured records your accountant or SARS submission can use directly."
}];
const WORKSWITH = ["Instagram", "Facebook", "POS", "Spreadsheets", "Accounting tools", "Forms", "Inventory records", "Supplier records", "Google Drive", "PDFs", "Email records"];
const SAFEGUARDS = [{
  ic: "shield",
  h: "Human approval",
  d: "Critical actions — payments, supplier commitments, customer-sensitive replies — wait for a person to approve."
}, {
  ic: "eye",
  h: "Full auditability",
  d: "Every action is logged: who requested, who approved, what happened, and when. Nothing moves blindly."
}, {
  ic: "layers",
  h: "Permission levels",
  d: "Review queues, permission tiers, and manual override keep authority where it belongs — with you."
}];
const CHANGES = [["Decisions wait on people", "Decisions are routed and tracked"], ["Enquiries get missed", "Every enquiry is captured"], ["Cash is checked late", "Cash is traceable in real time"], ["Knowledge lives in people's heads", "Knowledge lives in the system"], ["Reports are delayed", "Reports are live"], ["AI has no company context", "AI answers from your business data"]];
const LAYERS = [{
  k: "Layer 1",
  n: "Data Layer",
  d: "Where the business stores what is happening — customers, sales, stock, suppliers, approvals, tasks, SOPs, and reports."
}, {
  k: "Layer 2",
  n: "Workflow Layer",
  d: "Where routine work moves through defined steps — requests, approvals, assignments, reminders, and escalations."
}, {
  k: "Layer 3",
  n: "Visibility Layer",
  d: "Where management sees what is happening — dashboards, alerts, summaries, and exception reports."
}, {
  k: "Layer 4",
  n: "AI Intelligence Layer",
  d: "Where the system answers questions, detects issues, drafts responses, and helps management decide.",
  lit: true
}];
const STEPS = [{
  n: "01",
  h: "Bottleneck Report",
  d: "We diagnose where control is weakest, where money or customers leak, and what to build first."
}, {
  n: "02",
  h: "System Map",
  d: "We decide which organs connect first and design the architecture around how you operate."
}, {
  n: "03",
  h: "Build & Connect",
  d: "We install the highest-impact system, connect your existing tools, and train your team."
}];
function BusinessSystems({
  go,
  onMind,
  onBook
}) {
  return /*#__PURE__*/React.createElement("main", {
    "data-screen-label": "Business Systems"
  }, /*#__PURE__*/React.createElement("section", {
    "data-label": "BS Hero",
    className: "section grid-bg",
    style: {
      paddingTop: 180,
      paddingBottom: 90,
      position: "relative",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("canvas", {
    className: "lh-network",
    "data-density": "0.5",
    "data-formed": "0.9",
    "data-seed": "4",
    "data-core": "1",
    "data-speed": "0.7",
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      opacity: .45,
      zIndex: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      zIndex: 1,
      background: "linear-gradient(90deg, var(--lh-black) 32%, rgba(5,5,5,.4) 100%), linear-gradient(180deg, transparent 60%, var(--lh-black))"
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "wrap",
    style: {
      position: "relative",
      zIndex: 2
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, /*#__PURE__*/React.createElement("span", {
    className: "tick"
  }), "Wing 01 \xB7 Available now"), /*#__PURE__*/React.createElement("h1", {
    className: "display h-xl",
    style: {
      marginTop: 22,
      maxWidth: "17ch"
    }
  }, "Business Systems. ", /*#__PURE__*/React.createElement("b", null, "One connected operating system.")), /*#__PURE__*/React.createElement("p", {
    className: "lead",
    style: {
      marginTop: 26,
      maxWidth: "54ch"
    }
  }, "Not more scattered tools. Lean Hippo installs the control layer between your people, money, customers, stock, suppliers, approvals, and decisions."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 14,
      marginTop: 38,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-lg",
    onClick: () => onBook("bottleneck")
  }, "Book a Discovery Session ", /*#__PURE__*/React.createElement(WIcon, {
    name: "arrow",
    size: 17,
    color: "#fff"
  })), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary btn-lg",
    onClick: () => go("systems", "organs"),
    style: {
      background: "var(--lh-slate-700)",
      borderColor: "var(--lh-slate-600)",
      color: "var(--lh-white)"
    }
  }, "The Six Organs")))), /*#__PURE__*/React.createElement("section", {
    "data-label": "The Problem",
    className: "section tight",
    style: {
      paddingTop: 70,
      paddingBottom: 70
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap",
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 56,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, /*#__PURE__*/React.createElement("span", {
    className: "tick"
  }), "The problem"), /*#__PURE__*/React.createElement("h2", {
    className: "display h-md",
    style: {
      marginTop: 18,
      fontSize: 38,
      maxWidth: "18ch"
    }
  }, "Most businesses don't have systems. They have ", /*#__PURE__*/React.createElement("b", null, "people compensating"), " for the lack of them.")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "body"
  }, "Information sits across spreadsheets, POS reports, people's heads, supplier chats, and scattered files. The business works \u2014 but only because people hold it together every day."), /*#__PURE__*/React.createElement("p", {
    className: "body",
    style: {
      marginTop: 18,
      color: "var(--text-primary)"
    }
  }, "That is not control. ", /*#__PURE__*/React.createElement("span", {
    className: "accent"
  }, "That is dependence."))))), /*#__PURE__*/React.createElement("section", {
    "data-label": "Six Organs",
    className: "section tight",
    id: "organs"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, /*#__PURE__*/React.createElement("span", {
    className: "tick"
  }), "The system map"), /*#__PURE__*/React.createElement("h2", {
    className: "display h-lg",
    style: {
      marginTop: 18,
      marginBottom: 44,
      maxWidth: "20ch"
    }
  }, "One business nervous system. ", /*#__PURE__*/React.createElement("b", null, "Six organs.")), /*#__PURE__*/React.createElement("div", {
    className: "organs"
  }, ORGANS.map((o, i) => /*#__PURE__*/React.createElement("div", {
    className: "organ",
    key: i
  }, /*#__PURE__*/React.createElement("div", {
    className: "oicon"
  }, /*#__PURE__*/React.createElement(WIcon, {
    name: o.icon,
    size: 20,
    color: "var(--lh-cobalt-100)"
  })), /*#__PURE__*/React.createElement("div", {
    className: "ofn"
  }, o.fn), /*#__PURE__*/React.createElement("div", {
    className: "otitle"
  }, o.title), /*#__PURE__*/React.createElement("div", {
    className: "odesc"
  }, o.desc), /*#__PURE__*/React.createElement("ul", {
    className: "inc-list"
  }, o.inc.map((x, k) => /*#__PURE__*/React.createElement("li", {
    key: k
  }, x)))))))), /*#__PURE__*/React.createElement("section", {
    "data-label": "Vault Financials",
    className: "section tight",
    id: "financials",
    style: {
      background: "radial-gradient(120% 100% at 15% 0%, #0B0F16, var(--lh-black))"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: 24,
      marginBottom: 44
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, /*#__PURE__*/React.createElement("span", {
    className: "tick"
  }), "The Vault \xB7 Financial control"), /*#__PURE__*/React.createElement("h2", {
    className: "display h-lg",
    style: {
      marginTop: 18,
      maxWidth: "18ch"
    }
  }, "The Vault has ", /*#__PURE__*/React.createElement("b", null, "everything financial.")), /*#__PURE__*/React.createElement("p", {
    className: "body",
    style: {
      marginTop: 18,
      maxWidth: "46ch"
    }
  }, "Beyond approvals and cash control, the Vault runs your reporting \u2014 monthly P&L, cash flow, reconciliation, and the numbers you need to make decisions.")), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-lg",
    onClick: () => onBook("financial")
  }, "Book a financial / P&L review ", /*#__PURE__*/React.createElement(WIcon, {
    name: "arrow",
    size: 16,
    color: "#fff"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "organs"
  }, VAULT_FINANCIALS.map((f, i) => /*#__PURE__*/React.createElement("div", {
    className: "organ",
    key: i
  }, /*#__PURE__*/React.createElement("div", {
    className: "oicon"
  }, /*#__PURE__*/React.createElement(WIcon, {
    name: f.icon,
    size: 20,
    color: "var(--lh-cobalt-100)"
  })), /*#__PURE__*/React.createElement("div", {
    className: "otitle",
    style: {
      fontSize: 19
    }
  }, f.h), /*#__PURE__*/React.createElement("div", {
    className: "odesc"
  }, f.d)))))), /*#__PURE__*/React.createElement("section", {
    "data-label": "Architecture",
    className: "section tight",
    id: "architecture",
    style: {
      background: "radial-gradient(120% 100% at 80% 0%, #0B0F16, var(--lh-black))"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap",
    style: {
      display: "grid",
      gridTemplateColumns: "0.8fr 1.2fr",
      gap: 56,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, /*#__PURE__*/React.createElement("span", {
    className: "tick"
  }), "The architecture"), /*#__PURE__*/React.createElement("h2", {
    className: "display h-lg",
    style: {
      marginTop: 18,
      maxWidth: "14ch"
    }
  }, "Every system has ", /*#__PURE__*/React.createElement("b", null, "four layers.")), /*#__PURE__*/React.createElement("p", {
    className: "body",
    style: {
      marginTop: 20,
      maxWidth: "40ch"
    }
  }, "Four stacked layers, connected by signal lines. Not just automations \u2014 architecture that turns scattered work into one operating system."), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    style: {
      marginTop: 26
    },
    onClick: onMind
  }, /*#__PURE__*/React.createElement("span", {
    className: "mind-orb",
    style: {
      width: 22,
      height: 22,
      animation: "none",
      flex: "0 0 auto"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "glyph"
  }, /*#__PURE__*/React.createElement("span", {
    className: "m",
    style: {
      fontSize: 11
    }
  }, "M"), /*#__PURE__*/React.createElement("span", {
    className: "p",
    style: {
      fontSize: 9
    }
  }, "+"))), "Add MIND+ to your stack")), /*#__PURE__*/React.createElement("div", {
    className: "layers"
  }, LAYERS.map((l, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, /*#__PURE__*/React.createElement("div", {
    className: "layer" + (l.lit ? " lit" : "")
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "lk"
  }, l.k), /*#__PURE__*/React.createElement("div", {
    className: "lname"
  }, l.n)), /*#__PURE__*/React.createElement("div", {
    className: "ldesc"
  }, l.d)), i < LAYERS.length - 1 && /*#__PURE__*/React.createElement("div", {
    className: "lconn"
  })))))), /*#__PURE__*/React.createElement("section", {
    "data-label": "How It Works",
    className: "section tight"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, /*#__PURE__*/React.createElement("span", {
    className: "tick"
  }), "How engagement works"), /*#__PURE__*/React.createElement("h2", {
    className: "display h-lg",
    style: {
      marginTop: 18,
      marginBottom: 44,
      maxWidth: "18ch"
    }
  }, "The system grows in ", /*#__PURE__*/React.createElement("b", null, "controlled stages.")), /*#__PURE__*/React.createElement("div", {
    className: "steps"
  }, STEPS.map((s, i) => /*#__PURE__*/React.createElement("div", {
    className: "step" + (i === 2 ? " lit" : ""),
    key: i
  }, /*#__PURE__*/React.createElement("div", {
    className: "sn"
  }, s.n), /*#__PURE__*/React.createElement("div", {
    className: "sh"
  }, s.h), /*#__PURE__*/React.createElement("div", {
    className: "sd"
  }, s.d)))))), /*#__PURE__*/React.createElement("section", {
    "data-label": "Works With",
    className: "section tight",
    style: {
      background: "radial-gradient(120% 100% at 20% 0%, #0B0F16, var(--lh-black))"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: 20,
      marginBottom: 40
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, /*#__PURE__*/React.createElement("span", {
    className: "tick"
  }), "Works with what you already use"), /*#__PURE__*/React.createElement("h2", {
    className: "display h-lg",
    style: {
      marginTop: 18,
      maxWidth: "18ch"
    }
  }, "We connect the business ", /*#__PURE__*/React.createElement("b", null, "you already have."))), /*#__PURE__*/React.createElement("p", {
    className: "body",
    style: {
      maxWidth: "40ch"
    }
  }, "The system adapts to the business before the business is asked to adapt to the system \u2014 through integrations, structured imports, forms, and lightweight tools.")), /*#__PURE__*/React.createElement("div", {
    className: "chipgrid"
  }, WORKSWITH.map((w, i) => /*#__PURE__*/React.createElement("span", {
    className: "chip2",
    key: i
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }), w))))), /*#__PURE__*/React.createElement("section", {
    "data-label": "Human Approval",
    className: "section tight"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, /*#__PURE__*/React.createElement("span", {
    className: "tick"
  }), "Human approval & auditability"), /*#__PURE__*/React.createElement("h2", {
    className: "display h-lg",
    style: {
      marginTop: 18,
      marginBottom: 12,
      maxWidth: "20ch"
    }
  }, "The business gets capacity. ", /*#__PURE__*/React.createElement("b", null, "You keep control.")), /*#__PURE__*/React.createElement("p", {
    className: "body",
    style: {
      marginBottom: 44,
      maxWidth: "60ch"
    }
  }, "Automation removes drudgery, not authority. The system can remind, draft, route, detect, and summarise \u2014 critical actions stay gated behind people."), /*#__PURE__*/React.createElement("div", {
    className: "steps"
  }, SAFEGUARDS.map((s, i) => /*#__PURE__*/React.createElement("div", {
    className: "step",
    key: i
  }, /*#__PURE__*/React.createElement("div", {
    className: "oicon",
    style: {
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement(WIcon, {
    name: s.ic,
    size: 20,
    color: "var(--lh-cobalt-100)"
  })), /*#__PURE__*/React.createElement("div", {
    className: "sh"
  }, s.h), /*#__PURE__*/React.createElement("div", {
    className: "sd"
  }, s.d)))))), /*#__PURE__*/React.createElement("section", {
    "data-label": "What Changes",
    className: "section tight",
    style: {
      background: "radial-gradient(120% 100% at 80% 0%, #0B0F16, var(--lh-black))"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, /*#__PURE__*/React.createElement("span", {
    className: "tick"
  }), "What changes"), /*#__PURE__*/React.createElement("h2", {
    className: "display h-lg",
    style: {
      marginTop: 18,
      marginBottom: 44,
      maxWidth: "20ch"
    }
  }, "The business begins to ", /*#__PURE__*/React.createElement("b", null, "operate differently.")), /*#__PURE__*/React.createElement("div", {
    className: "changes"
  }, CHANGES.map((c, i) => /*#__PURE__*/React.createElement("div", {
    className: "change",
    key: i
  }, /*#__PURE__*/React.createElement("div", {
    className: "before"
  }, /*#__PURE__*/React.createElement("span", {
    className: "clabel"
  }, "Before"), c[0]), /*#__PURE__*/React.createElement(WIcon, {
    name: "arrow",
    size: 18,
    color: "var(--lh-cobalt-100)"
  }), /*#__PURE__*/React.createElement("div", {
    className: "after"
  }, /*#__PURE__*/React.createElement("span", {
    className: "clabel"
  }, "After"), c[1])))))), /*#__PURE__*/React.createElement("section", {
    className: "section",
    id: "bottleneck"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "glass lit grid-bg",
    style: {
      padding: "60px 56px",
      borderRadius: "var(--radius-xl)",
      position: "relative",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "edge"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      zIndex: 2,
      maxWidth: 680
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "The entry point"), /*#__PURE__*/React.createElement("h2", {
    className: "display h-xl",
    style: {
      marginTop: 18,
      fontSize: 52
    }
  }, "See what is really ", /*#__PURE__*/React.createElement("b", null, "running your business.")), /*#__PURE__*/React.createElement("p", {
    className: "lead",
    style: {
      marginTop: 22,
      maxWidth: "50ch"
    }
  }, "Start with a Bottleneck Discovery Session \u2014 a business scan that maps where control is leaking, where information is scattered, and which system to build first. MIND+ is included free to evaluate."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 14,
      marginTop: 34,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-lg",
    onClick: () => onBook("bottleneck")
  }, "Book a Discovery Session ", /*#__PURE__*/React.createElement(WIcon, {
    name: "arrow",
    size: 17,
    color: "#fff"
  })), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost btn-lg",
    id: "mindplus",
    onClick: onMind
  }, "What is MIND+")))))));
}
window.BusinessSystems = BusinessSystems;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/BusinessSystems.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Landing.jsx
try { (() => {
/* LeanHippo website — Landing: hero + three wings. */

const WINGS = [{
  key: "systems",
  num: "Wing 01",
  icon: "systems",
  title: "Business Systems",
  desc: "Connected dashboards, workflows, databases, and AI intelligence. The control layer between your people, money, customers, and decisions.",
  status: "live"
}, {
  key: "marketing",
  num: "Wing 02",
  icon: "megaphone",
  title: "Marketing",
  desc: "Demand, brand, and growth systems that feed the same connected operating company. Built on the same control layer.",
  status: "soon"
}, {
  key: "accounting",
  num: "Wing 03",
  icon: "calc",
  title: "Accounting Services",
  desc: "Books, compliance, and financial visibility wired directly into your systems — so the numbers are never a surprise.",
  status: "soon"
}];
function Landing({
  go,
  onMind,
  onBook
}) {
  return /*#__PURE__*/React.createElement("main", {
    "data-screen-label": "Landing"
  }, /*#__PURE__*/React.createElement("section", {
    "data-label": "Hero",
    className: "section grid-bg",
    style: {
      paddingTop: 200,
      paddingBottom: 120,
      position: "relative",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("canvas", {
    className: "lh-network",
    "data-density": "0.7",
    "data-formed": "0.8",
    "data-seed": "11",
    "data-speed": "0.7",
    "data-core": "1",
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      opacity: 1,
      zIndex: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      zIndex: 1,
      background: "radial-gradient(95% 75% at 50% 2%, rgba(5,5,5,.05), rgba(5,5,5,.45) 62%, rgba(5,5,5,.78) 100%), linear-gradient(180deg, transparent 58%, var(--lh-black))"
    }
  }), /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logos/leanhippo-white.png",
    alt: "",
    "aria-hidden": "true",
    className: "hero-watermark",
    style: {
      position: "absolute",
      left: "50%",
      top: "54%",
      transform: "translate(-50%,-50%)",
      width: "min(680px, 78%)",
      opacity: 0.05,
      zIndex: 1,
      pointerEvents: "none"
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "wrap",
    style: {
      position: "relative",
      zIndex: 2,
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow",
    style: {
      justifyContent: "center"
    }
  }, "Connected business systems"), /*#__PURE__*/React.createElement("h1", {
    className: "display h-xxl",
    style: {
      margin: "26px auto 0",
      maxWidth: "16ch"
    }
  }, "We build the systems ", /*#__PURE__*/React.createElement("b", null, "businesses run on.")), /*#__PURE__*/React.createElement("p", {
    className: "lead",
    style: {
      margin: "30px auto 0",
      maxWidth: "56ch"
    }
  }, "Lean Hippo gives businesses control, visibility, and intelligence \u2014 so they stop running on memory and start running on systems."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 14,
      justifyContent: "center",
      marginTop: 40
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary btn-lg",
    onClick: () => go("home", "wings")
  }, "Core Capabilities"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-lg",
    onClick: () => onBook("bottleneck")
  }, "Book a Discovery Session ", /*#__PURE__*/React.createElement(WIcon, {
    name: "arrow",
    size: 17,
    color: "#fff"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      justifyContent: "center",
      marginTop: 30,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "pill"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot",
    style: {
      background: "var(--accent)",
      boxShadow: "0 0 8px var(--accent)"
    }
  }), "Operational infrastructure"), /*#__PURE__*/React.createElement("span", {
    className: "pill"
  }, "Not an AI wrapper"), /*#__PURE__*/React.createElement("span", {
    className: "pill"
  }, "Human approval, always")))), /*#__PURE__*/React.createElement("section", {
    "data-label": "Three Wings",
    className: "section",
    id: "wings",
    style: {
      paddingTop: 40
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: 20,
      marginBottom: 46
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, /*#__PURE__*/React.createElement("span", {
    className: "tick"
  }), "Three wings \xB7 one operating company"), /*#__PURE__*/React.createElement("h2", {
    className: "display h-lg",
    style: {
      marginTop: 18,
      maxWidth: "18ch"
    }
  }, "Choose where you want ", /*#__PURE__*/React.createElement("b", null, "control first."))), /*#__PURE__*/React.createElement("p", {
    className: "body",
    style: {
      maxWidth: "38ch"
    }
  }, "Each wing runs on the same connected control layer \u2014 so the systems you build never sit on islands.")), /*#__PURE__*/React.createElement("div", {
    className: "wings"
  }, WINGS.map(w => {
    const live = w.status === "live";
    return /*#__PURE__*/React.createElement("div", {
      key: w.key,
      className: "wing " + (live ? "available" : "soon"),
      onClick: live ? () => go("systems") : () => onBook("bottleneck")
    }, /*#__PURE__*/React.createElement("div", {
      className: "edge"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "wnum"
    }, w.num), /*#__PURE__*/React.createElement("span", {
      className: "pill " + (live ? "live" : "soon")
    }, /*#__PURE__*/React.createElement("span", {
      className: "dot"
    }), live ? "Available now" : "Coming soon")), /*#__PURE__*/React.createElement("div", {
      className: "wicon"
    }, /*#__PURE__*/React.createElement(WIcon, {
      name: w.icon,
      size: 26,
      color: "var(--lh-cobalt-100)"
    })), /*#__PURE__*/React.createElement("div", {
      className: "wtitle"
    }, w.title), /*#__PURE__*/React.createElement("div", {
      className: "wdesc"
    }, w.desc), /*#__PURE__*/React.createElement("div", {
      className: "wfoot"
    }, live ? /*#__PURE__*/React.createElement("span", {
      className: "btn btn-primary",
      style: {
        pointerEvents: "none"
      }
    }, "Enter Business Systems ", /*#__PURE__*/React.createElement(WIcon, {
      name: "arrowUR",
      size: 16,
      color: "#fff"
    })) : /*#__PURE__*/React.createElement("span", {
      className: "btn btn-secondary",
      style: {
        pointerEvents: "none"
      }
    }, "Join the waitlist ", /*#__PURE__*/React.createElement(WIcon, {
      name: "arrow",
      size: 15
    }))));
  })), /*#__PURE__*/React.createElement("div", {
    className: "glass lit",
    style: {
      marginTop: 26,
      padding: "28px 34px",
      borderRadius: "var(--radius-lg)",
      display: "flex",
      alignItems: "center",
      gap: 28,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "edge"
  }), /*#__PURE__*/React.createElement("div", {
    className: "mind-orb",
    style: {
      width: 64,
      height: 64,
      animation: "none",
      flex: "0 0 auto",
      cursor: "default"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "glyph"
  }, /*#__PURE__*/React.createElement("span", {
    className: "m"
  }, "M"), /*#__PURE__*/React.createElement("span", {
    className: "p"
  }, "+"))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 240
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "Comes with everything"), /*#__PURE__*/React.createElement("h3", {
    className: "display h-md",
    style: {
      marginTop: 10,
      fontSize: 28
    }
  }, "MIND", /*#__PURE__*/React.createElement("span", {
    className: "cobalt"
  }, "+"), " \u2014 the intelligence layer on every product."), /*#__PURE__*/React.createElement("p", {
    className: "body",
    style: {
      marginTop: 10,
      maxWidth: "62ch"
    }
  }, "An add-on to every service so your system grows with you and learns from your everyday decisions \u2014 or a standalone product on its own.")), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary btn-lg",
    style: {
      flex: "0 0 auto"
    },
    onClick: onMind
  }, "What is MIND+ ", /*#__PURE__*/React.createElement(WIcon, {
    name: "arrow",
    size: 16
  }))))));
}
window.Landing = Landing;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Landing.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Shared.jsx
try { (() => {
/* LeanHippo website — shared bits: Icon, Nav, Footer, MindPlus floater. */
const {
  useState,
  useEffect
} = React;

/* Lucide path data (stroke 1.6) — substitute icon set, see readme. */
const WICONS = {
  gauge: ["M12 14l4-4", "M3.34 19a10 10 0 1 1 17.32 0"],
  funnel: ["M22 3H2l8 9.46V19l4 2v-8.54L22 3z"],
  vault: ["M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z", "M7.35 7.35 16.65 16.65", "M16.65 7.35 7.35 16.65", "M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0"],
  switchboard: ["M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"],
  book: ["M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"],
  truck: ["M14 18V6a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h2", "M14 9h4l4 4v4a1 1 0 0 1-1 1h-1", "M7.5 18m-2.5 0a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0-5 0", "M17.5 18m-2.5 0a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0-5 0"],
  brain: ["M12 5a3 3 0 1 0-5.997.142 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z", "M12 5a3 3 0 1 1 5.997.142 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"],
  systems: ["M3 3h7v7H3z", "M14 3h7v7h-7z", "M14 14h7v7h-7z", "M3 14h7v7H3z"],
  megaphone: ["M3 11l18-5v12L3 14v-3z", "M11.6 16.8a3 3 0 1 1-5.8-1.6"],
  calc: ["M4 2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z", "M8 6h8", "M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"],
  arrow: ["M5 12h14", "M12 5l7 7-7 7"],
  arrowUR: ["M7 17 17 7", "M7 7h10v10"],
  check: ["M20 6 9 17l-5-5"],
  x: ["M18 6 6 18", "M6 6l12 12"],
  spark: ["M12 3l1.9 5.8a2 2 0 0 0 1.3 1.3L21 12l-5.8 1.9a2 2 0 0 0-1.3 1.3L12 21l-1.9-5.8a2 2 0 0 0-1.3-1.3L3 12l5.8-1.9a2 2 0 0 0 1.3-1.3z"],
  layers: ["M12 2 2 7l10 5 10-5-10-5z", "M2 17l10 5 10-5", "M2 12l10 5 10-5"],
  shield: ["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", "M9 12l2 2 4-4"],
  plug: ["M12 22v-5", "M9 8V2M15 8V2", "M7 8h10v3a5 5 0 0 1-10 0V8z"],
  eye: ["M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z", "M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0"],
  refresh: ["M3 12a9 9 0 0 1 15-6.7L21 8", "M21 3v5h-5", "M21 12a9 9 0 0 1-15 6.7L3 16", "M3 21v-5h5"],
  link: ["M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1", "M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"]
};
function WIcon({
  name,
  size = 20,
  color = "currentColor",
  stroke = 1.6,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: stroke,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: style
  }, (WICONS[name] || []).map((d, i) => /*#__PURE__*/React.createElement("path", {
    key: i,
    d: d
  })));
}

/* ---------------- Nav ---------------- */
function Nav({
  route,
  go,
  onMind,
  onBook,
  mobile
}) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const sc = document.querySelector("#site-scroll");
    if (!sc) return;
    const onScroll = () => setScrolled(sc.scrollTop > 24);
    sc.addEventListener("scroll", onScroll);
    onScroll();
    return () => sc.removeEventListener("scroll", onScroll);
  }, [route]);
  useEffect(() => {
    setMenuOpen(false);
  }, [route, mobile]);
  const nav = fn => {
    setMenuOpen(false);
    fn();
  };
  return /*#__PURE__*/React.createElement("header", {
    className: "nav" + (scrolled || menuOpen ? " scrolled" : "")
  }, /*#__PURE__*/React.createElement("div", {
    className: "brand",
    onClick: () => nav(() => go("home"))
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logos/leanhippo-white.png",
    alt: "Lean Hippo"
  })), !mobile && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("nav", {
    className: "links"
  }, /*#__PURE__*/React.createElement("span", {
    className: "link" + (route === "home" ? " on" : ""),
    onClick: () => go("home")
  }, "Home"), /*#__PURE__*/React.createElement("span", {
    className: "link" + (route === "systems" ? " on" : ""),
    onClick: () => go("systems")
  }, "Business Systems"), /*#__PURE__*/React.createElement("span", {
    className: "link",
    onClick: () => go("home", "wings")
  }, "Marketing"), /*#__PURE__*/React.createElement("span", {
    className: "link",
    onClick: () => go("home", "wings")
  }, "Accounting"), /*#__PURE__*/React.createElement("span", {
    className: "link",
    onClick: onMind
  }, "MIND+")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: () => onBook("bottleneck")
  }, "Book a Discovery Session ", /*#__PURE__*/React.createElement(WIcon, {
    name: "arrow",
    size: 16,
    color: "#fff"
  })))), mobile && /*#__PURE__*/React.createElement("button", {
    className: "nav-burger" + (menuOpen ? " open" : ""),
    "aria-label": "Menu",
    "aria-expanded": menuOpen,
    onClick: () => setMenuOpen(v => !v)
  }, /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null)), mobile && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "nav-scrim" + (menuOpen ? " open" : ""),
    onClick: () => setMenuOpen(false)
  }), /*#__PURE__*/React.createElement("nav", {
    className: "nav-menu" + (menuOpen ? " open" : "")
  }, /*#__PURE__*/React.createElement("span", {
    className: "nav-mlink" + (route === "home" ? " on" : ""),
    onClick: () => nav(() => go("home"))
  }, "Home"), /*#__PURE__*/React.createElement("span", {
    className: "nav-mlink" + (route === "systems" ? " on" : ""),
    onClick: () => nav(() => go("systems"))
  }, "Business Systems"), /*#__PURE__*/React.createElement("span", {
    className: "nav-mlink",
    onClick: () => nav(() => go("home", "wings"))
  }, "Marketing"), /*#__PURE__*/React.createElement("span", {
    className: "nav-mlink",
    onClick: () => nav(() => go("home", "wings"))
  }, "Accounting"), /*#__PURE__*/React.createElement("span", {
    className: "nav-mlink",
    onClick: () => nav(onMind)
  }, "MIND+"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-lg",
    style: {
      width: "100%",
      marginTop: 14
    },
    onClick: () => nav(() => onBook("bottleneck"))
  }, "Book a Discovery Session ", /*#__PURE__*/React.createElement(WIcon, {
    name: "arrow",
    size: 16,
    color: "#fff"
  })))));
}

/* ---------------- Footer ---------------- */
function Footer({
  go,
  onBook
}) {
  return /*#__PURE__*/React.createElement("footer", {
    className: "footer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cols"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logos/leanhippo-white.png",
    alt: "Lean Hippo",
    style: {
      height: 64,
      marginBottom: 30
    }
  }), /*#__PURE__*/React.createElement("p", {
    className: "small",
    style: {
      maxWidth: "34ch"
    }
  }, "We build the systems businesses run on. Connected control across people, money, customers, and decisions.")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "ftitle"
  }, "Wings"), /*#__PURE__*/React.createElement("span", {
    className: "flink",
    onClick: () => go("systems")
  }, "Business Systems"), /*#__PURE__*/React.createElement("span", {
    className: "flink",
    onClick: () => go("home", "wings")
  }, "Marketing"), /*#__PURE__*/React.createElement("span", {
    className: "flink",
    onClick: () => go("home", "wings")
  }, "Accounting Services")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "ftitle"
  }, "Business Systems"), /*#__PURE__*/React.createElement("span", {
    className: "flink",
    onClick: () => go("systems", "organs")
  }, "The six organs"), /*#__PURE__*/React.createElement("span", {
    className: "flink",
    onClick: () => go("systems", "architecture")
  }, "Architecture"), /*#__PURE__*/React.createElement("span", {
    className: "flink",
    onClick: () => onBook("bottleneck")
  }, "Bottleneck Report"), /*#__PURE__*/React.createElement("span", {
    className: "flink",
    onClick: () => go("systems", "mindplus")
  }, "MIND+")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "ftitle"
  }, "Company"), /*#__PURE__*/React.createElement("span", {
    className: "flink",
    onClick: () => go("systems", "organs")
  }, "About"), /*#__PURE__*/React.createElement("span", {
    className: "flink",
    onClick: () => onBook("bottleneck")
  }, "Contact"), /*#__PURE__*/React.createElement("span", {
    className: "flink",
    onClick: () => onBook("bottleneck")
  }, "Book a session"))), /*#__PURE__*/React.createElement("div", {
    className: "legal"
  }, /*#__PURE__*/React.createElement("span", {
    className: "fn",
    style: {
      fontSize: 11
    }
  }, "\xA9 2026 Lean Hippo Systems & Tech"), /*#__PURE__*/React.createElement("span", {
    className: "fn",
    style: {
      fontSize: 11
    }
  }, "Not an AI wrapper \xB7 Operational infrastructure"))));
}

/* ---------------- MIND+ floater + panel ---------------- */
const MIND_FEATURES = [{
  ic: "eye",
  h: "Sees across every system",
  d: "MIND+ reads from your dashboards, workflows, records, SOPs, and reports — the whole connected business, not one tool."
}, {
  ic: "refresh",
  h: "Grows as you grow",
  d: "Every approval, decision, and exception teaches it. The system gets sharper the longer it runs alongside you."
}, {
  ic: "spark",
  h: "Answers in your context",
  d: "Ask what needs attention, where money is leaking, what changed. It answers from your operating memory — not the open internet."
}, {
  ic: "shield",
  h: "You stay in authority",
  d: "MIND+ drafts, summarizes, and flags. Humans approve every sensitive action. Intelligence assists; it never overrides."
}];
function MindPanel({
  open,
  onClose,
  go,
  onBook
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "mind-overlay" + (open ? " open" : ""),
    onClick: onClose
  }), /*#__PURE__*/React.createElement("aside", {
    className: "mind-panel" + (open ? " open" : ""),
    "aria-hidden": !open
  }, /*#__PURE__*/React.createElement("div", {
    className: "mp-pad"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "Add-on \xB7 Standalone"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost",
    style: {
      padding: 8
    },
    onClick: onClose
  }, /*#__PURE__*/React.createElement(WIcon, {
    name: "x",
    size: 18
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 16,
      margin: "22px 0 6px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "mind-orb",
    style: {
      width: 64,
      height: 64,
      animation: "none",
      cursor: "default"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "glyph"
  }, /*#__PURE__*/React.createElement("span", {
    className: "m"
  }, "M"), /*#__PURE__*/React.createElement("span", {
    className: "p"
  }, "+"))), /*#__PURE__*/React.createElement("h2", {
    className: "display h-md",
    style: {
      fontSize: 38
    }
  }, "MIND", /*#__PURE__*/React.createElement("span", {
    className: "cobalt"
  }, "+"))), /*#__PURE__*/React.createElement("p", {
    className: "body",
    style: {
      marginTop: 14
    }
  }, "The intelligence layer that comes with ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: "var(--text-primary)",
      fontWeight: 500
    }
  }, "every product we sell"), " \u2014 and can be bought on its own. MIND+ sits above your systems so the business keeps thinking, learning, and improving from its own everyday decisions."), /*#__PURE__*/React.createElement("div", {
    style: {
      margin: "26px 0 8px"
    }
  }, MIND_FEATURES.map((f, i) => /*#__PURE__*/React.createElement("div", {
    className: "mind-feat",
    key: i
  }, /*#__PURE__*/React.createElement("div", {
    className: "mf-ic"
  }, /*#__PURE__*/React.createElement(WIcon, {
    name: f.ic,
    size: 18,
    color: "var(--lh-cobalt-100)"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "mf-h"
  }, f.h), /*#__PURE__*/React.createElement("div", {
    className: "mf-d"
  }, f.d))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 12,
      margin: "16px 0 10px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "glass",
    style: {
      padding: "16px 18px",
      borderRadius: "var(--radius-md)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "fn",
    style: {
      fontSize: 11
    }
  }, "As an add-on"), /*#__PURE__*/React.createElement("div", {
    className: "body",
    style: {
      fontSize: 14.5,
      marginTop: 8
    }
  }, "Layers onto any Lean Hippo product. Inherits its data automatically.")), /*#__PURE__*/React.createElement("div", {
    className: "glass lit",
    style: {
      padding: "16px 18px",
      borderRadius: "var(--radius-md)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "edge"
  }), /*#__PURE__*/React.createElement("div", {
    className: "fn",
    style: {
      fontSize: 11,
      color: "var(--lh-cobalt-100)"
    }
  }, "Standalone"), /*#__PURE__*/React.createElement("div", {
    className: "body",
    style: {
      fontSize: 14.5,
      marginTop: 8
    }
  }, "Connect your existing tools and run MIND+ on its own."))), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-lg",
    style: {
      width: "100%",
      marginTop: 14
    },
    onClick: () => {
      onClose();
      onBook("mind");
    }
  }, "Add MIND+ to a system ", /*#__PURE__*/React.createElement(WIcon, {
    name: "arrow",
    size: 17,
    color: "#fff"
  })), /*#__PURE__*/React.createElement("p", {
    className: "small",
    style: {
      textAlign: "center",
      marginTop: 14
    }
  }, "Included free to evaluate with the Bottleneck Report."))));
}
function MindFab({
  onClick
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "mindfab"
  }, /*#__PURE__*/React.createElement("button", {
    className: "mind-orb pulse",
    onClick: onClick,
    "aria-label": "Open MIND+"
  }, /*#__PURE__*/React.createElement("span", {
    className: "glyph"
  }, /*#__PURE__*/React.createElement("span", {
    className: "m"
  }, "M"), /*#__PURE__*/React.createElement("span", {
    className: "p"
  }, "+"))), /*#__PURE__*/React.createElement("span", {
    className: "mind-cap"
  }, "MIND+"));
}
Object.assign(window, {
  WIcon,
  Nav,
  Footer,
  MindPanel,
  MindFab
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Shared.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Site.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Lean Hippo website — app shell + routing. */
function useIsMobile() {
  const get = () => typeof window !== "undefined" && (window.LH_FORCE_MOBILE === true || window.matchMedia("(max-width: 1080px)").matches);
  const [mobile, setMobile] = React.useState(get);
  React.useEffect(() => {
    const on = () => setMobile(get());
    window.addEventListener("resize", on);
    const mq = window.matchMedia("(max-width: 1080px)");
    mq.addEventListener ? mq.addEventListener("change", on) : mq.addListener(on);
    return () => {
      window.removeEventListener("resize", on);
      mq.removeEventListener ? mq.removeEventListener("change", on) : mq.removeListener(on);
    };
  }, []);
  React.useEffect(() => {
    document.body.classList.toggle("mobile", mobile);
    if (window.LH_FORCE_MOBILE) document.body.classList.add("force-mobile");
  }, [mobile]);
  return mobile;
}
function SiteApp() {
  const [route, setRoute] = React.useState("home");
  const [mindOpen, setMindOpen] = React.useState(false);
  const [booking, setBooking] = React.useState({
    open: false,
    service: "bottleneck"
  });
  const mobile = useIsMobile();
  const openBooking = service => setBooking({
    open: true,
    service: service || "bottleneck"
  });
  const closeBooking = () => setBooking(b => ({
    ...b,
    open: false
  }));
  const go = (r, anchor) => {
    setRoute(r);
    const scroller = document.querySelector("#site-scroll");
    requestAnimationFrame(() => {
      if (anchor) {
        const el = document.getElementById(anchor);
        if (el && scroller) {
          const top = el.getBoundingClientRect().top - scroller.getBoundingClientRect().top + scroller.scrollTop - (mobile ? 76 : 90);
          scroller.scrollTo({
            top,
            behavior: "smooth"
          });
          return;
        }
      }
      if (scroller) scroller.scrollTo({
        top: 0,
        behavior: anchor ? "smooth" : "auto"
      });
    });
  };
  React.useEffect(() => {
    if (window.LHNetwork) window.LHNetwork.init();
  }, [route, mobile]);
  const shared = {
    go,
    onMind: () => setMindOpen(true),
    onBook: openBooking
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Nav, _extends({
    route: route,
    mobile: mobile
  }, shared)), /*#__PURE__*/React.createElement("div", {
    id: "site-scroll",
    style: {
      height: "100vh",
      overflowY: "auto",
      overflowX: "hidden"
    }
  }, route === "home" ? /*#__PURE__*/React.createElement(Landing, _extends({}, shared, {
    mobile: mobile
  })) : /*#__PURE__*/React.createElement(BusinessSystems, _extends({}, shared, {
    mobile: mobile
  })), /*#__PURE__*/React.createElement(Footer, shared)), /*#__PURE__*/React.createElement(MindFab, {
    onClick: () => setMindOpen(true)
  }), /*#__PURE__*/React.createElement(MindPanel, {
    open: mindOpen,
    onClose: () => setMindOpen(false),
    go: go,
    onBook: openBooking
  }), /*#__PURE__*/React.createElement(BookingModal, {
    open: booking.open,
    onClose: closeBooking,
    initialService: booking.service
  }));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(SiteApp, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Site.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.GlassPanel = __ds_scope.GlassPanel;

__ds_ns.StatTile = __ds_scope.StatTile;

})();
