export function Input({
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
  style = {},
}) {
  const [focused, setFocused] = React.useState(false);
  const borderColor = error
    ? "var(--status-alert)"
    : focused
    ? "var(--border-lit)"
    : "var(--border-strong)";
  return (
    <label style={{ display: full ? "block" : "inline-block", width: full ? "100%" : "auto", ...style }}>
      {label && (
        <span style={{
          display: "block", marginBottom: 8,
          fontFamily: "var(--font-mono)", fontSize: 10.5, fontWeight: 500,
          letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-muted)",
        }}>{label}</span>
      )}
      <div style={{
        display: "flex", alignItems: "center", gap: 10,
        background: "var(--surface-inset)",
        border: `1px solid ${borderColor}`,
        borderRadius: "var(--radius-sm)",
        padding: "0 14px", height: 44,
        boxShadow: focused && !error ? "var(--glow-focus)" : "none",
        transition: "border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)",
        opacity: disabled ? 0.5 : 1,
      }}>
        {iconLeft && <span style={{ color: "var(--text-muted)", display: "inline-flex", flex: "0 0 auto" }}>{iconLeft}</span>}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          disabled={disabled}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            flex: 1, minWidth: 0, background: "transparent", border: "none", outline: "none",
            color: "var(--text-primary)",
            fontFamily: mono ? "var(--font-mono)" : "var(--font-body)",
            fontSize: 14, fontWeight: 400, letterSpacing: mono ? "0.02em" : "0",
          }}
        />
      </div>
      {(hint || error) && (
        <span style={{
          display: "block", marginTop: 7, fontSize: 12,
          color: error ? "var(--status-alert)" : "var(--text-muted)",
          fontFamily: "var(--font-body)",
        }}>{error || hint}</span>
      )}
    </label>
  );
}
