export function Badge({
  children,
  tone = "neutral",   // neutral | cobalt | ok | pending | alert
  variant = "soft",   // soft | outline | dot
  size = "md",        // sm | md
  style = {},
}) {
  const tones = {
    neutral: { fg: "var(--text-secondary)", bg: "var(--surface-raised)", bd: "var(--border-strong)", dot: "var(--lh-grey-400)" },
    cobalt:  { fg: "var(--lh-cobalt-100)", bg: "var(--lh-glass-fill-cobalt)", bd: "var(--border-lit)", dot: "var(--accent)" },
    ok:      { fg: "#7FD3A6", bg: "var(--lh-positive-dim)", bd: "rgba(47,169,104,0.35)", dot: "var(--status-ok)" },
    pending: { fg: "#E0BE76", bg: "var(--lh-warning-dim)", bd: "rgba(201,150,46,0.35)", dot: "var(--status-pending)" },
    alert:   { fg: "#E78D88", bg: "var(--lh-critical-dim)", bd: "rgba(214,80,74,0.4)", dot: "var(--status-alert)" },
  };
  const t = tones[tone];
  const sz = size === "sm"
    ? { fontSize: 10.5, padding: "3px 8px", gap: 5 }
    : { fontSize: 11.5, padding: "5px 11px", gap: 6 };

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
    ...style,
  };
  return (
    <span style={base}>
      {(variant === "dot" || tone !== "neutral") && variant !== "outline" ? (
        <span style={{
          width: 6, height: 6, borderRadius: "var(--radius-pill)",
          background: t.dot,
          boxShadow: tone !== "neutral" ? `0 0 8px ${t.dot}` : "none",
          flex: "0 0 auto",
        }} />
      ) : null}
      {children}
    </span>
  );
}
