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
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
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

    let W = 0, H = 0, nodes = [], edges = [];

    function layout() {
      const r = canvas.getBoundingClientRect();
      W = Math.max(1, r.width); H = Math.max(1, r.height);
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.round((W * H) / 24000) + 8;
      nodes = [];
      const cx = W * 0.5, cy = H * 0.5;
      for (let i = 0; i < count; i++) {
        // organic scatter; "formed" pulls nodes toward a tidy ring/grid
        const a = rand() * Math.PI * 2;
        const rad = (0.25 + rand() * 0.7) * Math.min(W, H) * 0.6;
        let x = cx + Math.cos(a) * rad * (W / Math.min(W, H));
        let y = cy + Math.sin(a) * rad;
        x = Math.max(16, Math.min(W - 16, x));
        y = Math.max(16, Math.min(H - 16, y));
        nodes.push({ x, y, r: 1.4 + rand() * 2.2, lit: rand() < 0.32, pulse: rand() });
      }
      if (hasCore) nodes.push({ x: cx, y: cy, r: 6, lit: true, core: true, pulse: 0 });

      // edges: connect near neighbors
      edges = [];
      for (let i = 0; i < nodes.length; i++) {
        const dists = [];
        for (let j = 0; j < nodes.length; j++) {
          if (i === j) continue;
          const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
          dists.push({ j, d: Math.hypot(dx, dy) });
        }
        dists.sort((p, q) => p.d - q.d);
        const k = nodes[i].core ? 6 : 2 + Math.floor(rand() * 2);
        for (let n = 0; n < k && n < dists.length; n++) {
          const j = dists[n].j;
          if (j > i || nodes[i].core || nodes[j].core) {
            const lit = rand() < density;
            edges.push({ a: i, b: j, lit, phase: rand(), len: dists[n].d });
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
        const A = nodes[e.a], B = nodes[e.b];
        const connected = e.lit ? 1 : formed;
        ctx.beginPath();
        ctx.moveTo(A.x, A.y); ctx.lineTo(B.x, B.y);
        ctx.lineWidth = 1;
        ctx.strokeStyle = e.lit
          ? `rgba(${COBALT},${0.18 + 0.12 * formed})`
          : `rgba(244,244,242,${0.04 * formed})`;
        ctx.stroke();

        // travelling signal pulse on lit edges
        if (e.lit && formed > 0.4) {
          const p = ((t * 0.35 * speed + e.phase) % 1);
          const px = A.x + (B.x - A.x) * p;
          const py = A.y + (B.y - A.y) * p;
          const g = ctx.createRadialGradient(px, py, 0, px, py, 7);
          g.addColorStop(0, `rgba(${PALE},0.9)`);
          g.addColorStop(1, `rgba(${COBALT},0)`);
          ctx.fillStyle = g;
          ctx.beginPath(); ctx.arc(px, py, 7, 0, Math.PI * 2); ctx.fill();
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
          ctx.beginPath(); ctx.arc(nd.x, nd.y, R * 4, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = `rgba(${PALE},1)`;
          ctx.beginPath(); ctx.arc(nd.x, nd.y, 3.5, 0, Math.PI * 2); ctx.fill();
          continue;
        }
        const lit = nd.lit && formed > 0.3;
        if (lit) {
          const R = nd.r + 6 + breathe * 3;
          const g = ctx.createRadialGradient(nd.x, nd.y, 0, nd.x, nd.y, R);
          g.addColorStop(0, `rgba(${COBALT},${0.5 * formed})`);
          g.addColorStop(1, `rgba(${COBALT},0)`);
          ctx.fillStyle = g;
          ctx.beginPath(); ctx.arc(nd.x, nd.y, R, 0, Math.PI * 2); ctx.fill();
        }
        ctx.fillStyle = lit
          ? `rgba(${PALE},${0.85})`
          : `rgba(140,147,158,${0.35 + 0.4 * formed})`;
        ctx.beginPath(); ctx.arc(nd.x, nd.y, nd.r, 0, Math.PI * 2); ctx.fill();
      }
    }

    let raf;
    function start() { cancelAnimationFrame(raf); t0 = performance.now(); raf = requestAnimationFrame(frame); }
    layout(); draw(0); start();

    const ro = new ResizeObserver(() => { layout(); draw((performance.now() - t0) / 1000); });
    ro.observe(canvas);
    window.addEventListener("beforeprint", () => { /* static frame draws on next rAF */ });
  }

  function init() {
    document.querySelectorAll("canvas.lh-network").forEach((c) => {
      if (!c.__lhInit) { c.__lhInit = true; build(c); }
    });
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else { init(); }
  window.LHNetwork = { init };
})();
