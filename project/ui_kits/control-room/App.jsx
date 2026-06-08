/* LeanHippo Control Room — app shell: login → connected dashboard. */
const { Icon, Row, lbl, ControlRoomView } = window.LHViews;
const { VaultView, MindView, OrganView } = window.LHViews2;
const ADS = window.DesignSystem_8aad64;

const NAV = [
  { key: "control", icon: "gauge", label: "The Control Room", fn: "Visibility" },
  { key: "vault", icon: "vault", label: "The Vault", fn: "Money" },
  { key: "switchboard", icon: "switchboard", label: "The Switchboard", fn: "Customers" },
  { key: "playbook", icon: "book", label: "The Playbook", fn: "Knowledge" },
  { key: "supply", icon: "truck", label: "The Supply Line", fn: "Procurement" },
  { key: "mind", icon: "brain", label: "The Mind", fn: "Decisions" },
];

/* ---------------- Login ---------------- */
function Login({ onEnter }) {
  const [org, setOrg] = React.useState("Riverside Trading Co");
  return (
    <div style={{ position: "relative", height: "100%", display: "flex", alignItems: "center", justifyContent: "center",
      background: "radial-gradient(120% 100% at 50% -10%, #0E1424 0%, #050505 60%)" }}>
      <canvas className="lh-network" data-density="0.4" data-formed="0.6" data-seed="5" data-speed="0.6"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: .5 }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(5,5,5,.4), rgba(5,5,5,.85))" }} />
      <div style={{ position: "relative", width: 420, textAlign: "center" }}>
        <img src="../../assets/logos/leanhippo-white.png" alt="LeanHippo" style={{ height: 92, marginBottom: 30 }} />
        <ADS.GlassPanel lit strong style={{ textAlign: "left" }}>
          <div style={{ marginBottom: 4 }}><ADS.Eyebrow>Connected systems</ADS.Eyebrow></div>
          <h1 style={{ margin: "8px 0 22px", fontFamily: "var(--font-display)", fontWeight: 300, fontSize: 26, color: "var(--text-primary)", letterSpacing: "-.01em" }}>
            Sign in to your control room
          </h1>
          <div style={{ display: "grid", gap: 16 }}>
            <ADS.Input label="Organisation" value={org} onChange={e => setOrg(e.target.value)} iconLeft={<Icon name="search" size={16} />} />
            <ADS.Input label="Access code" defaultValue="LH-0042" mono />
            <ADS.Button variant="primary" full onClick={() => onEnter(org)} iconRight={<Icon name="arrow" size={16} color="#fff" />}>
              Enter the system
            </ADS.Button>
          </div>
        </ADS.GlassPanel>
        <div style={{ ...lbl, marginTop: 18, textAlign: "center" }}>LeanHippo Systems · We build the systems businesses run on</div>
      </div>
    </div>
  );
}

/* ---------------- Sidebar ---------------- */
function Sidebar({ active, setActive }) {
  return (
    <aside style={{ width: 264, flex: "0 0 264px", background: "var(--lh-graphite)", borderRight: "1px solid var(--border-default)",
      display: "flex", flexDirection: "column", padding: "22px 16px" }}>
      <Row style={{ gap: 12, padding: "6px 10px 22px" }}>
        <img src="../../assets/logos/leanhippo-mark-white.png" alt="" style={{ height: 30 }} />
        <div>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: 15, color: "var(--text-primary)", lineHeight: 1 }}>LeanHippo</div>
          <div style={{ ...lbl, fontSize: 9, marginTop: 3 }}>Control Room</div>
        </div>
      </Row>
      <div style={{ ...lbl, padding: "0 12px 10px", fontSize: 9.5 }}>Six organs</div>
      <nav style={{ display: "grid", gap: 4 }}>
        {NAV.map(n => {
          const on = active === n.key;
          return (
            <button key={n.key} onClick={() => setActive(n.key)} style={{
              display: "flex", alignItems: "center", gap: 13, padding: "11px 12px", borderRadius: "var(--radius-sm)",
              cursor: "pointer", textAlign: "left", width: "100%", fontFamily: "var(--font-body)",
              background: on ? "var(--lh-glass-fill-cobalt)" : "transparent",
              border: `1px solid ${on ? "var(--border-lit)" : "transparent"}`,
              boxShadow: on ? "var(--glow-sm)" : "none", transition: "background .15s, border-color .15s" }}
              onMouseEnter={e => { if (!on) e.currentTarget.style.background = "var(--surface-raised)"; }}
              onMouseLeave={e => { if (!on) e.currentTarget.style.background = "transparent"; }}>
              <Icon name={n.icon} size={18} color={on ? "var(--lh-cobalt-100)" : "var(--text-muted)"} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, color: on ? "var(--text-primary)" : "var(--text-secondary)" }}>{n.label}</div>
                <div style={{ ...lbl, fontSize: 9, marginTop: 2 }}>{n.fn}</div>
              </div>
            </button>
          );
        })}
      </nav>
      <div style={{ flex: 1 }} />
      <button style={{ display: "flex", alignItems: "center", gap: 13, padding: "11px 12px", borderRadius: "var(--radius-sm)",
        cursor: "pointer", background: "transparent", border: "1px solid transparent", width: "100%", color: "var(--text-muted)", fontFamily: "var(--font-body)", fontSize: 14 }}>
        <Icon name="settings" size={18} color="var(--text-muted)" /> Settings &amp; approvals
      </button>
    </aside>
  );
}

/* ---------------- Topbar ---------------- */
function Topbar({ org, title, fn }) {
  return (
    <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 32px",
      borderBottom: "1px solid var(--border-default)", flex: "0 0 auto" }}>
      <div>
        <div style={{ marginBottom: 7 }}><ADS.Eyebrow tone="muted">{fn}</ADS.Eyebrow></div>
        <h2 style={{ margin: 0, fontFamily: "var(--font-display)", fontWeight: 300, fontSize: 26, color: "var(--text-primary)", letterSpacing: "-.015em" }}>{title}</h2>
      </div>
      <Row style={{ gap: 14 }}>
        <Row style={{ gap: 9, padding: "9px 14px", background: "var(--surface-inset)", border: "1px solid var(--border-strong)", borderRadius: "var(--radius-sm)", minWidth: 220 }}>
          <Icon name="search" size={15} color="var(--text-muted)" />
          <span style={{ color: "var(--text-faint)", fontSize: 13 }}>Search the system…</span>
        </Row>
        <button style={{ position: "relative", width: 40, height: 40, borderRadius: "var(--radius-sm)", background: "var(--surface-card)", border: "1px solid var(--border-strong)", cursor: "pointer", display: "grid", placeItems: "center" }}>
          <Icon name="bell" size={17} color="var(--text-secondary)" />
          <span style={{ position: "absolute", top: 8, right: 9, width: 7, height: 7, borderRadius: "50%", background: "var(--status-alert)", boxShadow: "0 0 7px var(--status-alert)" }} />
        </button>
        <Row style={{ gap: 10, padding: "5px 14px 5px 6px", background: "var(--surface-card)", border: "1px solid var(--border-strong)", borderRadius: "var(--radius-pill)" }}>
          <div style={{ width: 30, height: 30, borderRadius: "50%", background: "var(--grad-cobalt)", display: "grid", placeItems: "center", color: "#fff", fontSize: 12, fontWeight: 500 }}>R</div>
          <div style={{ fontSize: 13, color: "var(--text-primary)" }}>{org}</div>
        </Row>
      </Row>
    </header>
  );
}

/* ---------------- Content router ---------------- */
function Content({ active }) {
  switch (active) {
    case "control": return <ControlRoomView />;
    case "vault": return <VaultView />;
    case "mind": return <MindView />;
    case "switchboard": return <OrganView eyebrow="Customer response" title="Every enquiry, one system"
      body="Customer messages from Instagram, Facebook, website, forms, and calls are routed into one response system so enquiries stop disappearing between channels. AI classifies, suggests replies, and flags urgency — humans approve sensitive replies before they are sent."
      includes={["Multi-channel capture","Auto-response where suitable","Human handoff","Lead assignment","Missed enquiry alerts","CRM entry","Follow-up reminders","Conversation history","Response templates","Escalation rules"]} />;
    case "playbook": return <OrganView eyebrow="Knowledge & process" title="Institutional memory"
      body="Processes, standards, role instructions, recurring tasks, escalation rules, and operating knowledge are captured into a system staff can actually follow. AI turns rough notes and policies into structured SOPs, checklists, and searchable knowledge."
      includes={["SOP library","Staff checklists","Onboarding flows","Role instructions","Recurring task templates","Escalation rules","Approval logic","Training references","Quality standards","Internal knowledge base"]} />;
    case "supply": return <OrganView eyebrow="Procurement" title="One controlled supply line"
      body="Supplier prices, purchase requests, stock needs, approvals, delivery records, and reorder logic move through one controlled flow. The system shows what is being bought, from whom, why, and at what price."
      includes={["Supplier database","Price comparison","Purchase request flow","Approval workflow","Reorder prompts","Delivery tracking","Procurement history","Preferred supplier logic","Variance alerts","Stock-linked suggestions"]} />;
    default: return <ControlRoomView />;
  }
}

/* ---------------- App ---------------- */
function App() {
  const [org, setOrg] = React.useState(null);
  const [active, setActive] = React.useState("control");
  React.useEffect(() => { if (window.LHNetwork) window.LHNetwork.init(); }, [org]);

  if (!org) return <Login onEnter={setOrg} />;
  const cur = NAV.find(n => n.key === active);
  return (
    <div style={{ display: "flex", height: "100%", background: "var(--lh-black)" }}>
      <Sidebar active={active} setActive={setActive} />
      <main style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0,
        background: "radial-gradient(120% 90% at 80% 0%, #0B0F16 0%, #050505 55%)" }}>
        <Topbar org={org} title={cur.label} fn={`Function · ${cur.fn}`} />
        <div style={{ flex: 1, overflowY: "auto", padding: 32, minHeight: 0 }}>
          <Content active={active} />
        </div>
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
