export function Eyebrow({
  children,
  number = null,       // optional oversized section number like "04"
  tone = "cobalt",     // cobalt | muted | white
  style = {},
}) {
  const colors = {
    cobalt: "var(--lh-cobalt-100)",
    muted: "var(--text-muted)",
    white: "var(--text-primary)",
  };
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 12, ...style }}>
      {number != null && (
        <span style={{
          fontFamily: "var(--font-mono)",
          fontWeight: 500,
          fontSize: 12,
          color: "var(--text-faint)",
          letterSpacing: "0.04em",
        }}>{number}</span>
      )}
      {number != null && (
        <span style={{ width: 24, height: 1, background: "var(--border-strong)" }} />
      )}
      <span style={{
        fontFamily: "var(--font-body)",
        fontWeight: 400,
        fontSize: "var(--fs-micro)",
        letterSpacing: "var(--ls-label)",
        textTransform: "uppercase",
        color: colors[tone],
      }}>{children}</span>
    </span>
  );
}
