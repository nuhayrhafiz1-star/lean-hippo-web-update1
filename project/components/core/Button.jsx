export function Button({
  children,
  variant = "primary",   // primary | secondary | ghost | danger
  size = "md",           // sm | md | lg
  iconLeft = null,
  iconRight = null,
  disabled = false,
  full = false,
  onClick,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: { padding: "7px 13px", fontSize: 13, height: 32 },
    md: { padding: "10px 18px", fontSize: 14, height: 40 },
    lg: { padding: "13px 24px", fontSize: 15, height: 48 },
  };
  const variants = {
    primary: {
      background: "var(--accent)",
      color: "var(--text-on-cobalt)",
      border: "1px solid var(--accent)",
      boxShadow: "var(--glow-md), var(--shadow-edge-cobalt)",
    },
    secondary: {
      background: "var(--surface-raised)",
      color: "var(--text-primary)",
      border: "1px solid var(--border-strong)",
      boxShadow: "var(--shadow-edge)",
    },
    ghost: {
      background: "transparent",
      color: "var(--text-secondary)",
      border: "1px solid transparent",
      boxShadow: "none",
    },
    danger: {
      background: "transparent",
      color: "var(--status-alert)",
      border: "1px solid var(--lh-critical-dim)",
      boxShadow: "none",
    },
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
    ...style,
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
    },
  };
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      style={base}
      onMouseEnter={(e) => !disabled && hoverFx[variant](e, true)}
      onMouseLeave={(e) => !disabled && hoverFx[variant](e, false)}
      onMouseDown={(e) => !disabled && (e.currentTarget.style.transform = "translateY(1px)")}
      onMouseUp={(e) => !disabled && (e.currentTarget.style.transform = "translateY(0)")}
      {...rest}
    >
      {iconLeft}
      {children}
      {iconRight}
    </button>
  );
}
