/* LeanHippo Control Room — interactive views: The Vault, The Mind, organ placeholders. */
const { Icon, Row, lbl, cardBox } = window.LHViews;
const V2DS = window.DesignSystem_8aad64;

/* ====================================================================
   VIEW: The Vault — approval queue (interactive approve / decline)
   ==================================================================== */
function VaultView() {
  const [items, setItems] = React.useState([
    { id: "REQ-1042", who: "Naledi M.", what: "Stock purchase · Davis Co", amt: "R 12,400", status: "pending" },
    { id: "REQ-1041", who: "Sipho K.", what: "Petty cash · cleaning", amt: "R 850", status: "pending" },
    { id: "REQ-1039", who: "Thabo D.", what: "Expense · fuel reimbursement", amt: "R 1,260", status: "pending" },
    { id: "REQ-1037", who: "Lerato N.", what: "Supplier deposit · packaging", amt: "R 6,000", status: "pending" },
  ]);
  const decide = (id, status) => setItems(xs => xs.map(x => x.id === id ? { ...x, status } : x));
  const pending = items.filter(i => i.status === "pending").length;

  return (
    <V2DS.GlassPanel eyebrow="Money control" title="Approval queue"
      actions={<V2DS.Badge tone={pending ? "pending" : "ok"}>{pending ? `${pending} awaiting` : "All cleared"}</V2DS.Badge>}
      bodyStyle={{ display: "grid", gap: 11 }}>
      {items.map(it => (
        <Row key={it.id} style={{ ...cardBox, padding: "16px 18px", gap: 16,
          borderColor: it.status === "approved" ? "rgba(47,169,104,.4)" : it.status === "declined" ? "rgba(214,80,74,.4)" : "var(--border-default)" }}>
          <div style={{ flex: 1 }}>
            <Row style={{ gap: 10 }}>
              <span style={{ fontSize: 15, color: "var(--text-primary)", fontWeight: 500 }}>{it.what}</span>
              <span style={{ ...lbl }}>{it.id}</span>
            </Row>
            <div style={{ ...lbl, marginTop: 6, textTransform: "none", letterSpacing: 0 }}>Requested by {it.who}</div>
          </div>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 16, color: "var(--text-primary)", minWidth: 90, textAlign: "right" }}>{it.amt}</span>
          {it.status === "pending" ? (
            <Row style={{ gap: 8 }}>
              <V2DS.Button size="sm" variant="primary" iconLeft={<Icon name="check" size={14} color="#fff" />} onClick={() => decide(it.id, "approved")}>Approve</V2DS.Button>
              <V2DS.Button size="sm" variant="ghost" iconLeft={<Icon name="x" size={14} />} onClick={() => decide(it.id, "declined")}>Decline</V2DS.Button>
            </Row>
          ) : (
            <V2DS.Badge tone={it.status === "approved" ? "ok" : "alert"}>{it.status}</V2DS.Badge>
          )}
        </Row>
      ))}
      <Row style={{ justifyContent: "space-between", marginTop: 6, ...lbl, textTransform: "none", letterSpacing: 0 }}>
        <span>Every action logged · who requested, approved, spent, reviewed.</span>
        <span style={{ color: "var(--lh-cobalt-100)" }}>Audit history →</span>
      </Row>
    </V2DS.GlassPanel>
  );
}

/* ====================================================================
   VIEW: The Mind — ask the business (canned, contextual answers)
   ==================================================================== */
const MIND_ANSWERS = {
  "What needs attention today?": "3 items need attention: a petty-cash variance of R2,400 in The Vault, a 9% supplier price rise from Davis Co, and 5 unassigned enquiries in The Switchboard.",
  "Where are we leaking money?": "Cash is tracking 4% above expected spend this week. The largest driver is packaging procurement — Davis Co pricing rose 9% while volume held flat. Recommend a price comparison before the next order.",
  "Which enquiries were missed?": "3 enquiries went unanswered past 24h yesterday — 2 from Instagram, 1 from the website form. All 3 are now flagged in The Switchboard and assigned for follow-up.",
  "What changed since last week?": "Sales are up 8% and cash up 12%. Missed enquiries fell from 9 to 3. One new exception: a skipped closing checklist on Saturday.",
  "What should be fixed first?": "Fix the procurement leak first — it is the highest-value, most repeatable loss. Connect The Supply Line price comparison and require approval above R10,000.",
};
const MIND_QS = Object.keys(MIND_ANSWERS);

function MindView() {
  const [log, setLog] = React.useState([{ role: "mind", text: "Ask the business what is happening. I answer from your connected dashboards, records, SOPs, and reports." }]);
  const [draft, setDraft] = React.useState("");
  const endRef = React.useRef(null);
  const ask = (q) => {
    const question = (q || draft).trim();
    if (!question) return;
    const a = MIND_ANSWERS[question] || "I would answer from your company data — dashboards, workflows, supplier and customer records, SOPs and reports. Connect a data source to enable this query.";
    setLog(l => [...l, { role: "user", text: question }, { role: "mind", text: a }]);
    setDraft("");
    setTimeout(() => endRef.current && endRef.current.scrollIntoView({ block: "end" }), 20);
  };
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 18, height: "100%" }}>
      <V2DS.GlassPanel lit eyebrow="AI management intelligence" title="The Mind"
        actions={<V2DS.Badge tone="cobalt" variant="dot">Context loaded</V2DS.Badge>}
        style={{ display: "flex", flexDirection: "column" }}
        bodyStyle={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
        <div style={{ flex: 1, overflowY: "auto", display: "grid", gap: 14, paddingRight: 6, alignContent: "start" }}>
          {log.map((m, i) => (
            <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
              <div style={{ maxWidth: "78%", padding: "13px 16px", borderRadius: "var(--radius-md)", fontSize: 14.5, lineHeight: 1.5,
                background: m.role === "user" ? "var(--accent)" : "var(--surface-raised)",
                color: m.role === "user" ? "#fff" : "var(--text-secondary)",
                border: m.role === "user" ? "none" : "1px solid var(--border-default)" }}>
                {m.role === "mind" && <div style={{ ...lbl, color: "var(--lh-cobalt-100)", marginBottom: 6 }}>The Mind</div>}
                {m.text}
              </div>
            </div>
          ))}
          <div ref={endRef} />
        </div>
        <Row style={{ gap: 10, marginTop: 14 }}>
          <div style={{ flex: 1 }}>
            <V2DS.Input placeholder="Ask the business…" value={draft}
              onChange={e => setDraft(e.target.value)} />
          </div>
          <V2DS.Button variant="primary" iconLeft={<Icon name="send" size={15} color="#fff" />} onClick={() => ask()}>Ask</V2DS.Button>
        </Row>
      </V2DS.GlassPanel>

      <div style={{ display: "grid", gap: 10, alignContent: "start" }}>
        <div style={{ ...lbl, marginBottom: 2 }}>Suggested questions</div>
        {MIND_QS.map(q => (
          <button key={q} onClick={() => ask(q)} style={{ ...cardBox, textAlign: "left", padding: "13px 15px", cursor: "pointer",
            color: "var(--text-secondary)", fontSize: 13.5, fontFamily: "var(--font-body)", lineHeight: 1.4,
            transition: "border-color .15s, color .15s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--border-lit)"; e.currentTarget.style.color = "var(--text-primary)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border-default)"; e.currentTarget.style.color = "var(--text-secondary)"; }}>
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ====================================================================
   VIEW: generic organ placeholder
   ==================================================================== */
function OrganView({ icon, eyebrow, title, body, includes, signal }) {
  return (
    <V2DS.GlassPanel eyebrow={eyebrow} title={title}>
      <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.6, color: "var(--text-secondary)", maxWidth: "62ch" }}>{body}</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "11px 28px", marginTop: 22 }}>
        {includes.map(i => (
          <Row key={i} style={{ gap: 11, fontSize: 14, color: "var(--text-secondary)" }}>
            <span style={{ width: 6, height: 6, background: "var(--accent)", boxShadow: "0 0 8px rgba(31,94,255,.6)", transform: "rotate(45deg)", flex: "0 0 auto" }} />
            {i}
          </Row>
        ))}
      </div>
    </V2DS.GlassPanel>
  );
}

window.LHViews2 = { VaultView, MindView, OrganView };
