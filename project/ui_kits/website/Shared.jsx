/* LeanHippo website — shared bits: Icon, Nav, Footer, MindPlus floater. */
const { useState, useEffect } = React;

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
  link: ["M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1", "M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"],
};
function WIcon({ name, size = 20, color = "currentColor", stroke = 1.6, style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
      strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" style={style}>
      {(WICONS[name] || []).map((d, i) => <path key={i} d={d} />)}
    </svg>
  );
}

/* ---------------- Nav ---------------- */
function Nav({ route, go, onMind, onBook, mobile }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const sc = document.querySelector("#site-scroll");
    if (!sc) return;
    const onScroll = () => setScrolled(sc.scrollTop > 24);
    sc.addEventListener("scroll", onScroll); onScroll();
    return () => sc.removeEventListener("scroll", onScroll);
  }, [route]);
  useEffect(() => { setMenuOpen(false); }, [route, mobile]);
  const nav = (fn) => { setMenuOpen(false); fn(); };
  return (
    <header className={"nav" + (scrolled || menuOpen ? " scrolled" : "")}>
      <div className="brand" onClick={() => nav(() => go("home"))}>
        <img src="../../assets/logos/leanhippo-white.png" alt="Lean Hippo" />
      </div>

      {!mobile && (
        <React.Fragment>
          <nav className="links">
            <span className={"link" + (route === "home" ? " on" : "")} onClick={() => go("home")}>Home</span>
            <span className={"link" + (route === "systems" ? " on" : "")} onClick={() => go("systems")}>Business Systems</span>
            <span className="link" onClick={() => go("home", "wings")}>Marketing</span>
            <span className="link" onClick={() => go("home", "wings")}>Accounting</span>
            <span className="link" onClick={onMind}>MIND+</span>
          </nav>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <button className="btn btn-primary" onClick={() => onBook("bottleneck")}>
              Book a Discovery Session <WIcon name="arrow" size={16} color="#fff" />
            </button>
          </div>
        </React.Fragment>
      )}

      {mobile && (
        <button className={"nav-burger" + (menuOpen ? " open" : "")} aria-label="Menu" aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}>
          <span></span><span></span><span></span>
        </button>
      )}

      {mobile && (
        <React.Fragment>
          <div className={"nav-scrim" + (menuOpen ? " open" : "")} onClick={() => setMenuOpen(false)} />
          <nav className={"nav-menu" + (menuOpen ? " open" : "")}>
            <span className={"nav-mlink" + (route === "home" ? " on" : "")} onClick={() => nav(() => go("home"))}>Home</span>
            <span className={"nav-mlink" + (route === "systems" ? " on" : "")} onClick={() => nav(() => go("systems"))}>Business Systems</span>
            <span className="nav-mlink" onClick={() => nav(() => go("home", "wings"))}>Marketing</span>
            <span className="nav-mlink" onClick={() => nav(() => go("home", "wings"))}>Accounting</span>
            <span className="nav-mlink" onClick={() => nav(onMind)}>MIND+</span>
            <button className="btn btn-primary btn-lg" style={{ width: "100%", marginTop: 14 }} onClick={() => nav(() => onBook("bottleneck"))}>
              Book a Discovery Session <WIcon name="arrow" size={16} color="#fff" />
            </button>
          </nav>
        </React.Fragment>
      )}
    </header>
  );
}

/* ---------------- Footer ---------------- */
function Footer({ go, onBook }) {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="cols">
          <div>
            <img src="../../assets/logos/leanhippo-white.png" alt="Lean Hippo" style={{ height: 64, marginBottom: 30 }} />
            <p className="small" style={{ maxWidth: "34ch" }}>We build the systems businesses run on. Connected control across people, money, customers, and decisions.</p>
          </div>
          <div>
            <div className="ftitle">Wings</div>
            <span className="flink" onClick={() => go("systems")}>Business Systems</span>
            <span className="flink" onClick={() => go("home", "wings")}>Marketing</span>
            <span className="flink" onClick={() => go("home", "wings")}>Accounting Services</span>
          </div>
          <div>
            <div className="ftitle">Business Systems</div>
            <span className="flink" onClick={() => go("systems", "organs")}>The six organs</span>
            <span className="flink" onClick={() => go("systems", "architecture")}>Architecture</span>
            <span className="flink" onClick={() => onBook("bottleneck")}>Bottleneck Report</span>
            <span className="flink" onClick={() => go("systems", "mindplus")}>MIND+</span>
          </div>
          <div>
            <div className="ftitle">Company</div>
            <span className="flink" onClick={() => go("systems", "organs")}>About</span>
            <span className="flink" onClick={() => onBook("bottleneck")}>Contact</span>
            <span className="flink" onClick={() => onBook("bottleneck")}>Book a session</span>
          </div>
        </div>
        <div className="legal">
          <span className="fn" style={{ fontSize: 11 }}>© 2026 Lean Hippo Systems &amp; Tech</span>
          <span className="fn" style={{ fontSize: 11 }}>Not an AI wrapper · Operational infrastructure</span>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- MIND+ floater + panel ---------------- */
const MIND_FEATURES = [
  { ic: "eye", h: "Sees across every system", d: "MIND+ reads from your dashboards, workflows, records, SOPs, and reports — the whole connected business, not one tool." },
  { ic: "refresh", h: "Grows as you grow", d: "Every approval, decision, and exception teaches it. The system gets sharper the longer it runs alongside you." },
  { ic: "spark", h: "Answers in your context", d: "Ask what needs attention, where money is leaking, what changed. It answers from your operating memory — not the open internet." },
  { ic: "shield", h: "You stay in authority", d: "MIND+ drafts, summarizes, and flags. Humans approve every sensitive action. Intelligence assists; it never overrides." },
];
function MindPanel({ open, onClose, go, onBook }) {
  return (
    <React.Fragment>
      <div className={"mind-overlay" + (open ? " open" : "")} onClick={onClose} />
      <aside className={"mind-panel" + (open ? " open" : "")} aria-hidden={!open}>
        <div className="mp-pad">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div className="eyebrow">Add-on · Standalone</div>
            <button className="btn btn-ghost" style={{ padding: 8 }} onClick={onClose}><WIcon name="x" size={18} /></button>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16, margin: "22px 0 6px" }}>
            <div className="mind-orb" style={{ width: 64, height: 64, animation: "none", cursor: "default" }}>
              <span className="glyph"><span className="m">M</span><span className="p">+</span></span>
            </div>
            <h2 className="display h-md" style={{ fontSize: 38 }}>MIND<span className="cobalt">+</span></h2>
          </div>
          <p className="body" style={{ marginTop: 14 }}>
            The intelligence layer that comes with <b style={{ color: "var(--text-primary)", fontWeight: 500 }}>every product we sell</b> — and can be bought on its own. MIND+ sits above your systems so the business keeps thinking, learning, and improving from its own everyday decisions.
          </p>
          <div style={{ margin: "26px 0 8px" }}>
            {MIND_FEATURES.map((f, i) => (
              <div className="mind-feat" key={i}>
                <div className="mf-ic"><WIcon name={f.ic} size={18} color="var(--lh-cobalt-100)" /></div>
                <div>
                  <div className="mf-h">{f.h}</div>
                  <div className="mf-d">{f.d}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, margin: "16px 0 10px" }}>
            <div className="glass" style={{ padding: "16px 18px", borderRadius: "var(--radius-md)" }}>
              <div className="fn" style={{ fontSize: 11 }}>As an add-on</div>
              <div className="body" style={{ fontSize: 14.5, marginTop: 8 }}>Layers onto any Lean Hippo product. Inherits its data automatically.</div>
            </div>
            <div className="glass lit" style={{ padding: "16px 18px", borderRadius: "var(--radius-md)" }}>
              <div className="edge" />
              <div className="fn" style={{ fontSize: 11, color: "var(--lh-cobalt-100)" }}>Standalone</div>
              <div className="body" style={{ fontSize: 14.5, marginTop: 8 }}>Connect your existing tools and run MIND+ on its own.</div>
            </div>
          </div>
          <button className="btn btn-primary btn-lg" style={{ width: "100%", marginTop: 14 }}
            onClick={() => { onClose(); onBook("mind"); }}>
            Add MIND+ to a system <WIcon name="arrow" size={17} color="#fff" />
          </button>
          <p className="small" style={{ textAlign: "center", marginTop: 14 }}>Included free to evaluate with the Bottleneck Report.</p>
        </div>
      </aside>
    </React.Fragment>
  );
}
function MindFab({ onClick }) {
  return (
    <div className="mindfab">
      <button className="mind-orb pulse" onClick={onClick} aria-label="Open MIND+">
        <span className="glyph"><span className="m">M</span><span className="p">+</span></span>
      </button>
      <span className="mind-cap">MIND+</span>
    </div>
  );
}

Object.assign(window, { WIcon, Nav, Footer, MindPanel, MindFab });
