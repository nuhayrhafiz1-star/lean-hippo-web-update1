export function StatTile({
  label,
  value,
  unit = null,
  delta = null,          // e.g. "+12%" or "-3"
  trend = "flat",        // up | down | flat
  tone = "default",      // default | cobalt
  sparkline = null,      // optional array of numbers 0..1
  style = {},
}) {
  const trendColor = trend === "up" ? "var(--status-ok)"
    : trend === "down" ? "var(--status-alert)"
    : "var(--text-muted)";
  const arrow = trend === "up" ? "▲" : trend === "down" ? "▼" : "—";

  return (
    <div style={{
      position: "relative",
      background: tone === "cobalt" ? "var(--lh-glass-fill-cobalt)" : "var(--surface-card)",
      border: `1px solid ${tone === "cobalt" ? "var(--border-lit)" : "var(--border-default)"}`,
      borderRadius: "var(--radius-md)",
      padding: "var(--space-5)",
      boxShadow: "var(--shadow-edge)",
      overflow: "hidden",
      ...style,
    }}>
      <div style={{
        fontFamily: "var(--font-mono)", fontSize: 10.5, fontWeight: 500,
        letterSpacing: "0.12em", textTransform: "uppercase",
        color: "var(--text-muted)",
      }}>{label}</div>

      <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginTop: 12 }}>
        <span style={{
          fontFamily: "var(--font-display)", fontWeight: 300,
          fontSize: 34, lineHeight: 1, letterSpacing: "-0.02em",
          color: tone === "cobalt" ? "var(--lh-cobalt-100)" : "var(--text-primary)",
        }}>{value}</span>
        {unit && (
          <span style={{ fontSize: 15, color: "var(--text-muted)", fontWeight: 400 }}>{unit}</span>
        )}
      </div>

      {(delta != null || sparkline) && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 12, gap: 10 }}>
          {delta != null && (
            <span style={{
              fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 500,
              color: trendColor, display: "inline-flex", alignItems: "center", gap: 5,
            }}>
              <span style={{ fontSize: 8 }}>{arrow}</span>{delta}
            </span>
          )}
          {sparkline && (
            <svg viewBox="0 0 100 28" preserveAspectRatio="none" style={{ width: 88, height: 24, flex: "0 0 auto" }}>
              <polyline
                points={sparkline.map((v, i) => `${(i / (sparkline.length - 1)) * 100},${28 - v * 24 - 2}`).join(" ")}
                fill="none" stroke="var(--accent)" strokeWidth="1.5"
                vectorEffect="non-scaling-stroke" strokeLinejoin="round" strokeLinecap="round"
              />
            </svg>
          )}
        </div>
      )}
    </div>
  );
}
