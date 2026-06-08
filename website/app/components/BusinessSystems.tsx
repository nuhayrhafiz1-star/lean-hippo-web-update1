"use client";

import { Icon } from "./Icon";
import { Network } from "./Network";
import { useChrome } from "./chrome-context";

const ORGANS = [
  {
    fn: "01 · Visibility",
    icon: "gauge",
    title: "The Control Room",
    desc: "Your whole business — cash, sales, stock, tasks, approvals — live on one screen.",
    inc: ["Live business dashboard", "Cash & sales visibility", "Stock & task visibility", "Exception alerts", "Branch / department views", "Daily & weekly snapshots"],
  },
  {
    fn: "02 · Money",
    icon: "vault",
    title: "The Vault",
    desc: "Full financial control — cash movement, approvals, monthly P&L, cash flow, and reporting. Nothing of value moves unseen.",
    inc: ["Monthly P&L reports", "Cash flow tracking", "Bank reconciliation", "Expense & purchase approval", "Debtors & creditors", "Petty cash & till tracking", "Financial dashboards", "Audit history"],
  },
  {
    fn: "03 · Customers",
    icon: "switchboard",
    title: "The Switchboard",
    desc: "Every enquiry caught, answered, assigned, and tracked — across social, web, email, and calls.",
    inc: ["Multi-channel capture", "Auto-response where suitable", "Lead assignment", "Missed-enquiry alerts", "CRM entry & history", "Follow-up reminders"],
  },
  {
    fn: "04 · Knowledge",
    icon: "book",
    title: "The Playbook",
    desc: "SOPs, checklists, and operating knowledge captured into a system your staff can actually follow.",
    inc: ["SOP library", "Staff checklists", "Onboarding flows", "Role instructions", "Escalation rules", "Searchable knowledge base"],
  },
  {
    fn: "05 · Procurement",
    icon: "truck",
    title: "The Supply Line",
    desc: "Supplier prices, requests, approvals, and reorders move through one controlled pipeline.",
    inc: ["Supplier database", "Price comparison", "Purchase request flow", "Approval workflow", "Reorder prompts", "Delivery & variance tracking"],
  },
  {
    fn: "06 · Decisions",
    icon: "brain",
    title: "The Mind",
    desc: "The AI intelligence layer that answers from your business's own operating memory.",
    inc: ["Ask the business", "Activity summaries", "Issue & anomaly detection", "Drafted responses", "Suggested next actions", "Weekly decision briefs"],
  },
];

const VAULT_FINANCIALS = [
  { icon: "calc", h: "Monthly P&L reports", d: "Profit & loss compiled every month — revenue, costs, and margin, ready to read, not reconstruct." },
  { icon: "gauge", h: "Cash flow tracking", d: "Money in, money out, and what's coming — so cash is never a surprise at month-end." },
  { icon: "refresh", h: "Bank reconciliation", d: "Statements matched against records, with exceptions flagged for review." },
  { icon: "layers", h: "Debtors & creditors", d: "Who owes you, who you owe, and when — tracked and chased on schedule." },
  { icon: "eye", h: "Financial dashboards", d: "Live financial health — margin, burn, and runway — beside the rest of the business." },
  { icon: "shield", h: "Tax-ready exports", d: "Clean, structured records your accountant or SARS submission can use directly." },
];

const WORKSWITH = ["Instagram", "Facebook", "POS", "Spreadsheets", "Accounting tools", "Forms", "Inventory records", "Supplier records", "Google Drive", "PDFs", "Email records"];

const SAFEGUARDS = [
  { ic: "shield", h: "Human approval", d: "Critical actions — payments, supplier commitments, customer-sensitive replies — wait for a person to approve." },
  { ic: "eye", h: "Full auditability", d: "Every action is logged: who requested, who approved, what happened, and when. Nothing moves blindly." },
  { ic: "layers", h: "Permission levels", d: "Review queues, permission tiers, and manual override keep authority where it belongs — with you." },
];

const CHANGES = [
  ["Decisions wait on people", "Decisions are routed and tracked"],
  ["Enquiries get missed", "Every enquiry is captured"],
  ["Cash is checked late", "Cash is traceable in real time"],
  ["Knowledge lives in people's heads", "Knowledge lives in the system"],
  ["Reports are delayed", "Reports are live"],
  ["AI has no company context", "AI answers from your business data"],
];

const LAYERS = [
  { k: "Layer 1", n: "Data Layer", d: "Where the business stores what is happening — customers, sales, stock, suppliers, approvals, tasks, SOPs, and reports." },
  { k: "Layer 2", n: "Workflow Layer", d: "Where routine work moves through defined steps — requests, approvals, assignments, reminders, and escalations." },
  { k: "Layer 3", n: "Visibility Layer", d: "Where management sees what is happening — dashboards, alerts, summaries, and exception reports." },
  { k: "Layer 4", n: "AI Intelligence Layer", d: "Where the system answers questions, detects issues, drafts responses, and helps management decide.", lit: true },
];

const STEPS = [
  { n: "01", h: "Bottleneck Report", d: "We diagnose where control is weakest, where money or customers leak, and what to build first." },
  { n: "02", h: "System Map", d: "We decide which organs connect first and design the architecture around how you operate." },
  { n: "03", h: "Build & Connect", d: "We install the highest-impact system, connect your existing tools, and train your team." },
];

export function BusinessSystems() {
  const { go, openMind, openBooking } = useChrome();
  return (
    <main data-screen-label="Business Systems">
      {/* HERO */}
      <section data-label="BS Hero" className="section grid-bg" style={{ paddingTop: 180, paddingBottom: 90, position: "relative", overflow: "hidden" }}>
        <Network
          density={0.5}
          formed={0.9}
          seed={4}
          core
          speed={0.7}
          className="lh-network"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.45, zIndex: 0 }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            background:
              "linear-gradient(90deg, var(--lh-black) 32%, rgba(5,5,5,.4) 100%), linear-gradient(180deg, transparent 60%, var(--lh-black))",
          }}
        />
        <div className="wrap" style={{ position: "relative", zIndex: 2 }}>
          <div className="eyebrow"><span className="tick" />Wing 01 · Available now</div>
          <h1 className="display h-xl" style={{ marginTop: 22, maxWidth: "17ch" }}>
            Business Systems. <b>One connected operating system.</b>
          </h1>
          <p className="lead" style={{ marginTop: 26, maxWidth: "54ch" }}>
            Not more scattered tools. Lean Hippo installs the control layer between your people, money, customers, stock,
            suppliers, approvals, and decisions.
          </p>
          <div className="bs-hero-cta" style={{ display: "flex", gap: 14, marginTop: 38, flexWrap: "wrap" }}>
            <button className="btn btn-primary btn-lg" onClick={() => openBooking("bottleneck")}>
              Book a Discovery Session <Icon name="arrow" size={17} color="#fff" />
            </button>
            <button
              className="btn btn-secondary btn-lg"
              onClick={() => go("systems", "organs")}
              style={{ background: "var(--lh-slate-700)", borderColor: "var(--lh-slate-600)", color: "var(--lh-white)" }}
            >
              The Six Organs
            </button>
          </div>
        </div>
      </section>

      {/* THE PROBLEM */}
      <section data-label="The Problem" className="section tight" style={{ paddingTop: 70, paddingBottom: 70 }}>
        <div className="wrap" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}>
          <div>
            <div className="eyebrow"><span className="tick" />The problem</div>
            <h2 className="display h-md" style={{ marginTop: 18, fontSize: 38, maxWidth: "18ch" }}>
              Most businesses don&apos;t have systems. They have <b>people compensating</b> for the lack of them.
            </h2>
          </div>
          <div>
            <p className="body">
              Information sits across spreadsheets, POS reports, people&apos;s heads, supplier chats, and scattered files.
              The business works — but only because people hold it together every day.
            </p>
            <p className="body" style={{ marginTop: 18, color: "var(--text-primary)" }}>
              That is not control. <span className="accent">That is dependence.</span>
            </p>
          </div>
        </div>
      </section>

      {/* SIX ORGANS */}
      <section data-label="Six Organs" className="section tight" id="organs">
        <div className="wrap">
          <div className="eyebrow"><span className="tick" />The system map</div>
          <h2 className="display h-lg" style={{ marginTop: 18, marginBottom: 44, maxWidth: "20ch" }}>
            One business nervous system. <b>Six organs.</b>
          </h2>
          <div className="organs">
            {ORGANS.map((o, i) => (
              <div className="organ" key={i}>
                <div className="oicon"><Icon name={o.icon} size={20} color="var(--lh-cobalt-100)" /></div>
                <div className="ofn">{o.fn}</div>
                <div className="otitle">{o.title}</div>
                <div className="odesc">{o.desc}</div>
                <ul className="inc-list">
                  {o.inc.map((x, k) => (
                    <li key={k}>{x}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE VAULT · FINANCIALS */}
      <section data-label="Vault Financials" className="section tight" id="financials" style={{ background: "radial-gradient(120% 100% at 15% 0%, #0B0F16, var(--lh-black))" }}>
        <div className="wrap">
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 24, marginBottom: 44 }}>
            <div>
              <div className="eyebrow"><span className="tick" />The Vault · Financial control</div>
              <h2 className="display h-lg" style={{ marginTop: 18, maxWidth: "18ch" }}>
                The Vault has <b>everything financial.</b>
              </h2>
              <p className="body" style={{ marginTop: 18, maxWidth: "46ch" }}>
                Beyond approvals and cash control, the Vault runs your reporting — monthly P&amp;L, cash flow,
                reconciliation, and the numbers you need to make decisions.
              </p>
            </div>
            <button className="btn btn-primary btn-lg" onClick={() => openBooking("financial")}>
              Book a financial / P&amp;L review <Icon name="arrow" size={16} color="#fff" />
            </button>
          </div>
          <div className="organs">
            {VAULT_FINANCIALS.map((f, i) => (
              <div className="organ" key={i}>
                <div className="oicon"><Icon name={f.icon} size={20} color="var(--lh-cobalt-100)" /></div>
                <div className="otitle" style={{ fontSize: 19 }}>{f.h}</div>
                <div className="odesc">{f.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ARCHITECTURE */}
      <section data-label="Architecture" className="section tight" id="architecture" style={{ background: "radial-gradient(120% 100% at 80% 0%, #0B0F16, var(--lh-black))" }}>
        <div className="wrap" style={{ display: "grid", gridTemplateColumns: "0.8fr 1.2fr", gap: 56, alignItems: "center" }}>
          <div>
            <div className="eyebrow"><span className="tick" />The architecture</div>
            <h2 className="display h-lg" style={{ marginTop: 18, maxWidth: "14ch" }}>
              Every system has <b>four layers.</b>
            </h2>
            <p className="body" style={{ marginTop: 20, maxWidth: "40ch" }}>
              Four stacked layers, connected by signal lines. Not just automations — architecture that turns scattered
              work into one operating system.
            </p>
            <button className="btn btn-secondary" style={{ marginTop: 26 }} id="mindplus" onClick={openMind}>
              <span className="mind-orb" style={{ width: 22, height: 22, animation: "none", flex: "0 0 auto" }}>
                <span className="glyph">
                  <span className="m" style={{ fontSize: 11 }}>M</span>
                  <span className="p" style={{ fontSize: 9 }}>+</span>
                </span>
              </span>
              Add MIND+ to your stack
            </button>
          </div>
          <div className="layers">
            {LAYERS.map((l, i) => (
              <div key={i} style={{ display: "contents" }}>
                <div className={"layer" + (l.lit ? " lit" : "")}>
                  <div>
                    <div className="lk">{l.k}</div>
                    <div className="lname">{l.n}</div>
                  </div>
                  <div className="ldesc">{l.d}</div>
                </div>
                {i < LAYERS.length - 1 && <div className="lconn" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section data-label="How It Works" className="section tight">
        <div className="wrap">
          <div className="eyebrow"><span className="tick" />How engagement works</div>
          <h2 className="display h-lg" style={{ marginTop: 18, marginBottom: 44, maxWidth: "18ch" }}>
            The system grows in <b>controlled stages.</b>
          </h2>
          <div className="steps">
            {STEPS.map((s, i) => (
              <div className={"step" + (i === 2 ? " lit" : "")} key={i}>
                <div className="sn">{s.n}</div>
                <div className="sh">{s.h}</div>
                <div className="sd">{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORKS WITH */}
      <section data-label="Works With" className="section tight" style={{ background: "radial-gradient(120% 100% at 20% 0%, #0B0F16, var(--lh-black))" }}>
        <div className="wrap">
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 20, marginBottom: 40 }}>
            <div>
              <div className="eyebrow"><span className="tick" />Works with what you already use</div>
              <h2 className="display h-lg" style={{ marginTop: 18, maxWidth: "18ch" }}>
                We connect the business <b>you already have.</b>
              </h2>
            </div>
            <p className="body" style={{ maxWidth: "40ch" }}>
              The system adapts to the business before the business is asked to adapt to the system — through
              integrations, structured imports, forms, and lightweight tools.
            </p>
          </div>
          <div className="chipgrid">
            {WORKSWITH.map((w, i) => (
              <span className="chip2" key={i}>
                <span className="dot" />
                {w}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* HUMAN APPROVAL */}
      <section data-label="Human Approval" className="section tight">
        <div className="wrap">
          <div className="eyebrow"><span className="tick" />Human approval &amp; auditability</div>
          <h2 className="display h-lg" style={{ marginTop: 18, marginBottom: 12, maxWidth: "20ch" }}>
            The business gets capacity. <b>You keep control.</b>
          </h2>
          <p className="body" style={{ marginBottom: 44, maxWidth: "60ch" }}>
            Automation removes drudgery, not authority. The system can remind, draft, route, detect, and summarise —
            critical actions stay gated behind people.
          </p>
          <div className="steps">
            {SAFEGUARDS.map((s, i) => (
              <div className="step" key={i}>
                <div className="oicon" style={{ marginBottom: 16 }}><Icon name={s.ic} size={20} color="var(--lh-cobalt-100)" /></div>
                <div className="sh">{s.h}</div>
                <div className="sd">{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT CHANGES */}
      <section data-label="What Changes" className="section tight" style={{ background: "radial-gradient(120% 100% at 80% 0%, #0B0F16, var(--lh-black))" }}>
        <div className="wrap">
          <div className="eyebrow"><span className="tick" />What changes</div>
          <h2 className="display h-lg" style={{ marginTop: 18, marginBottom: 44, maxWidth: "20ch" }}>
            The business begins to <b>operate differently.</b>
          </h2>
          <div className="changes">
            {CHANGES.map((c, i) => (
              <div className="change" key={i}>
                <div className="before"><span className="clabel">Before</span>{c[0]}</div>
                <Icon name="arrow" size={18} color="var(--lh-cobalt-100)" />
                <div className="after"><span className="clabel">After</span>{c[1]}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTLENECK CTA */}
      <section className="section" id="bottleneck">
        <div className="wrap">
          <div className="glass lit grid-bg" style={{ padding: "60px 56px", borderRadius: "var(--radius-xl)", position: "relative", overflow: "hidden" }}>
            <div className="edge" />
            <div style={{ position: "relative", zIndex: 2, maxWidth: 680 }}>
              <div className="eyebrow">The entry point</div>
              <h2 className="display h-xl" style={{ marginTop: 18, fontSize: 52 }}>
                See what is really <b>running your business.</b>
              </h2>
              <p className="lead" style={{ marginTop: 22, maxWidth: "50ch" }}>
                Start with a Bottleneck Discovery Session — a business scan that maps where control is leaking, where
                information is scattered, and which system to build first. MIND+ is included free to evaluate.
              </p>
              <div style={{ display: "flex", gap: 14, marginTop: 34, flexWrap: "wrap" }}>
                <button className="btn btn-primary btn-lg" onClick={() => openBooking("bottleneck")}>
                  Book a Discovery Session <Icon name="arrow" size={17} color="#fff" />
                </button>
                <button className="btn btn-ghost btn-lg" onClick={openMind}>What is MIND+</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
