export function GlassPanel({
  children,
  title = null,
  eyebrow = null,
  actions = null,
  lit = false,          // lit cobalt edge
  strong = false,       // graphite vs charcoal glass
  padding = "var(--pad-panel)",
  style = {},
  bodyStyle = {},
}) {
  const wrap = {
    position: "relative",
    background: strong ? "var(--surface-glass-strong)" : "var(--surface-glass)",
    backdropFilter: "var(--blur-md)",
    WebkitBackdropFilter: "var(--blur-md)",
    border: `1px solid ${lit ? "var(--border-lit)" : "var(--border-glass)"}`,
    borderRadius: "var(--radius-lg)",
    boxShadow: lit
      ? "var(--glow-md), var(--shadow-lg), var(--shadow-edge)"
      : "var(--shadow-lg), var(--shadow-edge)",
    overflow: "hidden",
    ...style,
  };
  const head = {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 16,
    padding: padding,
    paddingBottom: title || eyebrow ? "var(--space-4)" : padding,
  };
  return (
    <section style={wrap}>
      {/* top edge-light */}
      <span style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: lit
          ? "linear-gradient(90deg, transparent, var(--accent), transparent)"
          : "var(--grad-edge)",
        opacity: lit ? 0.8 : 1, pointerEvents: "none",
      }} />
      {(eyebrow || title || actions) && (
        <header style={head}>
          <div>
            {eyebrow && (
              <div style={{
                fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 400,
                letterSpacing: "var(--ls-label)", textTransform: "uppercase",
                color: "var(--lh-cobalt-100)", marginBottom: 8,
              }}>{eyebrow}</div>
            )}
            {title && (
              <h3 style={{
                margin: 0, fontFamily: "var(--font-display)", fontWeight: 400,
                fontSize: "var(--fs-title-md)", letterSpacing: "-0.012em",
                color: "var(--text-primary)",
              }}>{title}</h3>
            )}
          </div>
          {actions && <div style={{ flex: "0 0 auto" }}>{actions}</div>}
        </header>
      )}
      <div style={{
        padding: (eyebrow || title || actions) ? `0 ${typeof padding === "string" ? padding : padding + "px"} ${typeof padding === "string" ? padding : padding + "px"}` : padding,
        ...bodyStyle,
      }}>
        {children}
      </div>
    </section>
  );
}
