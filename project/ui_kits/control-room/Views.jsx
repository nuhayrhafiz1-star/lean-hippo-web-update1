/* LeanHippo Control Room — shared views & icon set.
   Icons: Lucide path data (stroke 1.5) — substitute icon system, flagged in readme. */
const { useState } = React;
const DS = window.DesignSystem_8aad64;
const { Button, Badge, Eyebrow, Input, GlassPanel, StatTile } = DS;

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
  dot: ["M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0"],
};
function Icon({ name, size = 18, color = "currentColor", stroke = 1.6, style = {} }) {
  const paths = ICONS[name] || [];
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" style={style}>
      {paths.map((d, i) => <path key={i} d={d} />)}
    </svg>
  );
}

/* ---------------- Sparkline svg ---------------- */
function Spark({ points, w = 320, h = 90, fill = true }) {
  const pts = points.map((v, i) => `${(i / (points.length - 1)) * w},${h - v * (h - 8) - 4}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ width: "100%", height: h }}>
      {fill && <polyline points={`0,${h} ${pts} ${w},${h}`} fill="url(#sg)" stroke="none" opacity="0.22" />}
      <polyline points={pts} fill="none" stroke="var(--accent)" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
      <defs><linearGradient id="sg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1F5EFF" /><stop offset="1" stopColor="#1F5EFF" stopOpacity="0" /></linearGradient></defs>
    </svg>
  );
}

/* ---------------- helpers ---------------- */
const lbl = { fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--text-muted)" };
const cardBox = { background: "var(--surface-card)", border: "1px solid var(--border-default)", borderRadius: "var(--radius-md)" };

function Row({ children, style }) { return <div style={{ display: "flex", alignItems: "center", ...style }}>{children}</div>; }

/* ====================================================================
   VIEW: Control Room (visibility)
   ==================================================================== */
function ControlRoomView() {
  return (
    <div style={{ display: "grid", gap: 18 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14 }}>
        <StatTile label="Cash today" value="48.2" unit="k" delta="+12%" trend="up" sparkline={[.2,.5,.3,.6,.5,.85,1]} />
        <StatTile label="Sales · week" value="312" unit="k" delta="+8%" trend="up" tone="cobalt" sparkline={[.3,.4,.5,.45,.7,.8,.95]} />
        <StatTile label="Open enquiries" value="14" delta="+3" trend="up" />
        <StatTile label="Missed enquiries" value="3" delta="-2" trend="down" sparkline={[.9,.7,.8,.5,.4,.3,.2]} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 18 }}>
        <GlassPanel eyebrow="Performance" title="Sales & cash · this week"
          actions={<Badge tone="ok">Live</Badge>}>
          <Spark points={[.35,.42,.38,.55,.5,.62,.58,.74,.7,.88,.95]} h={150} />
          <Row style={{ justifyContent: "space-between", marginTop: 14, gap: 10 }}>
            {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(d =>
              <span key={d} style={{ ...lbl, fontSize: 10 }}>{d}</span>)}
          </Row>
        </GlassPanel>

        <GlassPanel eyebrow="Exceptions" title="Needs attention"
          actions={<Badge tone="alert" variant="dot">3</Badge>} bodyStyle={{ display: "grid", gap: 10 }}>
          {[
            { t: "Petty cash variance · R2,400", tone: "alert", ic: "alert" },
            { t: "Supplier price up 9% · Davis Co", tone: "pending", ic: "truck" },
            { t: "5 enquiries unassigned", tone: "pending", ic: "switchboard" },
            { t: "Closing checklist skipped", tone: "neutral", ic: "book" },
          ].map((e, i) =>
            <Row key={i} style={{ ...cardBox, padding: "12px 14px", gap: 12 }}>
              <Icon name={e.ic} size={16} color="var(--text-muted)" />
              <span style={{ fontSize: 13.5, color: "var(--text-secondary)", flex: 1 }}>{e.t}</span>
              <Badge tone={e.tone} size="sm">{e.tone === "alert" ? "Leak" : e.tone === "pending" ? "Review" : "Log"}</Badge>
            </Row>
          )}
        </GlassPanel>
      </div>
    </div>
  );
}

window.LHViews = { Icon, Spark, Row, lbl, cardBox, ControlRoomView };
