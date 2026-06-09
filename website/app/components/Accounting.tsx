"use client";

import { Icon } from "./Icon";
import { useChrome } from "./chrome-context";

/* Accounting & Financial Services — Wing 03.
   Page-scoped deep-green accent + cream canvas live in globals.css under
   .accounting-services-page (folded in from the Claude Design handoff). */

const A_SOLVE: [string, string][] = [
  ["Decisions are made on incomplete data", "Live reporting and dashboards put real numbers behind every decision."],
  ["Cash flow problems surface too late to act on", "Cash flow visibility shows money in, money out, and what is coming."],
  ["Audits mean pressure and a last minute scramble", "Clean records and reconciliations mean you go in prepared, not pressured."],
  ["Tax filings are fragmented and easy to miss", "We take over filing, tracking and structuring, end to end."],
  ["Compliance is handled as occasional fixes", "Continuous statutory oversight on a managed compliance calendar."],
  ["Finance and operations sit on separate islands", "One operating layer connects finance, operations and technology."],
];

const A_PILLARS = [
  { fn: "01 · Reporting", icon: "layers", title: "Accounting and Reporting",
    desc: "Clean records and structured reporting that give owners real financial visibility.",
    inc: ["Bookkeeping and ledger", "Profit and Loss · Balance Sheet", "Management reporting", "Audit support"] },
  { fn: "02 · Payroll", icon: "systems", title: "Payroll and HR",
    desc: "Accurate payrolls and statutory workforce administration, run on time, every time.",
    inc: ["Gross to net processing", "Leave, overtime and benefits", "Salary tax and TDS filing", "Labour law compliance"] },
  { fn: "03 · Tax", icon: "calc", title: "Tax Services",
    desc: "Corporate, VAT and withholding tax handled and tracked. Your business, our responsibility.",
    inc: ["Corporate income tax", "VAT registration and Mushak", "Withholding tax", "Tax advisory and strategy"] },
  { fn: "Secretarial", icon: "check", title: "Secretarial and Compliance",
    desc: "Continuous statutory oversight. You run your company; we control the noise.",
    inc: ["Statutory registers", "RJSC annual returns", "Board meeting support", "Compliance calendar"] },
  { fn: "Formation", icon: "plug", title: "Entity Formation",
    desc: "Incorporation, licensing and operational readiness structured from day one.",
    inc: ["Company incorporation", "BOI and BIDA approvals", "Trade and VAT registration", "Import and export licensing"] },
  { fn: "Advisory", icon: "spark", title: "Corporate Advisory",
    desc: "Boardroom level strategy. Strong financial decisions are structured, not reactive.",
    inc: ["Financial modelling", "Cost optimisation", "Mergers and acquisitions", "Cash flow strategy"] },
  { fn: "Governance", icon: "shield", title: "Audit, Risk and Governance",
    desc: "Risk based audits and governance frameworks that keep control intact as you scale.",
    inc: ["Internal audit", "Governance frameworks", "Enterprise risk management", "Control and policy design"] },
];

const A_PROCESS = [
  { n: "01", h: "Assessment", d: "We identify the gaps, risks and inefficiencies across your finance and operations." },
  { n: "02", h: "Structuring", d: "We design the systems and processes that close them." },
  { n: "03", h: "Implementation", d: "We build the reporting, controls and workflows, and connect your tools." },
  { n: "04", h: "Ongoing Management", d: "We monitor, refine and improve the system as you scale." },
];

const A_AUDIENCE = ["Scaling startups", "Service businesses", "Multi entity corporates", "SME and growing enterprise", "Manufacturing"];

const A_WHY = [
  { icon: "systems", h: "Cross functional expertise", d: "Chartered accountants, certified PMs and specialists under one roof." },
  { icon: "shield", h: "Control and oversight", d: "Structured control frameworks with strong governance and accountability." },
  { icon: "gauge", h: "Data led decisions", d: "Integrated reporting that turns complex data into clear, actionable insight." },
  { icon: "layers", h: "Scalable and contextual", d: "Solutions aligned to your scale, complexity and stage of growth." },
  { icon: "check", h: "Senior led execution", d: "Core leadership stays directly involved across every engagement." },
];

const A_TRUST = ["Reporting", "Payroll", "Tax", "Compliance", "Formation", "Advisory", "Audit"];

function jump(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 92;
  window.scrollTo({ top, behavior: "smooth" });
}

export function Accounting() {
  const { go, openBooking } = useChrome();

  return (
    <main className="accounting-services-page" data-screen-label="Accounting and Financial Services">

      {/* ── HERO · what we do ──────────────────────────────── */}
      <section data-label="AF Hero" className="section grid-bg"
        style={{ paddingTop: 172, paddingBottom: 88, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0,
          background: "radial-gradient(90% 70% at 78% 0%, rgba(27,139,96,.14), transparent 60%)" }} />
        <div className="wrap" style={{ position: "relative", zIndex: 2 }}>
          <div className="eyebrow"><span className="tick" />Wing 03 · Accounting and Financial Services</div>
          <h1 className="display h-xl" style={{ marginTop: 22, maxWidth: "19ch" }}>
            Financial control, <b>visibility, and governance</b> — as one system.
          </h1>
          <p className="lead" style={{ marginTop: 26, maxWidth: "58ch" }}>
            We keep your numbers accurate, show you where the money is going, and make sure nothing breaks when someone audits you — accounting, compliance, tax, and advisory in one controlled operating layer.
          </p>
          <div className="bs-hero-cta" style={{ display: "flex", gap: 14, marginTop: 38, flexWrap: "wrap" }}>
            <button className="btn btn-primary btn-lg" onClick={() => openBooking("financial")}>
              Request a Financial Control Review <Icon name="arrow" size={17} color="#fff" />
            </button>
            <button className="btn btn-secondary btn-lg" onClick={() => jump("services")}>
              Explore Services
            </button>
          </div>
          <div className="acc-trust">
            <span className="lbl" style={{ color: "var(--text-secondary)" }}>A complete suite</span>
            {A_TRUST.map((t, i) => (
              <span key={i} style={{ display: "contents" }}><span className="sep" /><span className="lbl">{t}</span></span>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE PROBLEM · what is broken ───────────────────── */}
      <section data-label="AF Problem" className="section tight" style={{ paddingTop: 74, paddingBottom: 74 }}>
        <div className="wrap">
          <div data-acc-2col style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}>
            <div>
              <div className="eyebrow"><span className="tick" />The real problem</div>
              <h2 className="display h-md" style={{ marginTop: 18, fontSize: 40, maxWidth: "16ch" }}>
                Most businesses do not have a revenue problem. They have a <b>control problem.</b>
              </h2>
            </div>
            <p className="body" style={{ maxWidth: "46ch" }}>
              The business works — but only because people hold it together every day. Information sits across spreadsheets, reports, and people, and the gaps stay invisible until they become expensive.
              <span style={{ display: "block", marginTop: 16, color: "var(--text-primary)" }}>
                That is not control. <span className="accent">That is exposure.</span>
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* ── HOW WE SOLVE IT · problem → solution ───────────── */}
      <section data-label="AF Solve" className="section tight acc-tint-l">
        <div className="wrap">
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 24, marginBottom: 44 }}>
            <div>
              <div className="eyebrow"><span className="tick" />How we solve it</div>
              <h2 className="display h-lg" style={{ marginTop: 18, maxWidth: "18ch" }}>
                Not outsourcing. <b>An operating layer.</b>
              </h2>
            </div>
            <p className="body" style={{ maxWidth: "42ch" }}>
              We are not a reactive accounting vendor. We are an integrated layer that turns scattered finance work into structured control and visibility at scale.
            </p>
          </div>
          <div className="changes">
            {A_SOLVE.map((c, i) => (
              <div className="change" key={i}>
                <div className="before"><span className="clabel">The problem</span>{c[0]}</div>
                <Icon name="arrow" size={18} color="var(--accent-soft)" />
                <div className="after"><span className="clabel">How we solve it</span>{c[1]}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 32 }}>
            <button className="btn btn-secondary" onClick={() => go("systems")}>
              See Business Systems <Icon name="arrowUR" size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ── WHAT WE DELIVER · seven pillars ────────────────── */}
      <section data-label="AF Services" className="section tight" id="services">
        <div className="wrap">
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 24, marginBottom: 44 }}>
            <div>
              <div className="eyebrow"><span className="tick" />What we deliver</div>
              <h2 className="display h-lg" style={{ marginTop: 18, maxWidth: "20ch" }}>
                A complete suite, run as <b>one unified system.</b>
              </h2>
            </div>
            <p className="body" style={{ maxWidth: "40ch" }}>
              Seven pillars designed to eliminate siloed functions and operate as one connected business system — with one point of control.
            </p>
          </div>
          <div className="organs">
            {A_PILLARS.map((o, i) => (
              <div className="organ" key={i}>
                <div className="oicon"><Icon name={o.icon} size={20} color="var(--accent-soft)" /></div>
                <div className="ofn">{o.fn}</div>
                <div className="otitle">{o.title}</div>
                <div className="odesc">{o.desc}</div>
                <ul className="inc-list">{o.inc.map((x, k) => <li key={k}>{x}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW WE WORK · process ──────────────────────────── */}
      <section data-label="AF Process" className="section tight acc-tint-r">
        <div className="wrap">
          <div className="eyebrow"><span className="tick" />How we work</div>
          <h2 className="display h-lg" style={{ marginTop: 18, marginBottom: 44, maxWidth: "20ch" }}>
            Structured engagement, in <b>four stages.</b>
          </h2>
          <div className="acc-process">
            {A_PROCESS.map((p, i) => (
              <div className="acc-pstep" key={i}>
                <div className="pn">Phase {p.n}</div>
                <div className="acc-pdot"><i /></div>
                <div className="ph">{p.h}</div>
                <div className="pd">{p.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY LEAN HIPPO · off-white premium band ────────── */}
      <section data-label="AF Why" className="section acc-advisory" id="why">
        <div className="wrap">
          <div data-acc-2col style={{ display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: 56, alignItems: "flex-end" }}>
            <div>
              <div className="eyebrow"><span className="tick" />Why Lean Hippo</div>
              <h2 className="display h-lg" style={{ marginTop: 18, maxWidth: "16ch" }}>
                We build capability, <b>not dependence.</b>
              </h2>
            </div>
            <p className="body" style={{ color: "#4A5249", maxWidth: "48ch" }}>
              Most firms provide recurring services that keep you dependent. We build systems, establish capability, and deliver sustainable results that stay as you scale.
            </p>
          </div>
          <div className="acc-advcards five">
            {A_WHY.map((r, i) => (
              <div className="acc-advcard" key={i}>
                <div className="ai"><Icon name={r.icon} size={22} color="var(--acc-green-600)" /></div>
                <div className="at">{r.h}</div>
                <div className="ad">{r.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BUILT FOR · audience ───────────────────────────── */}
      <section data-label="AF Audience" className="section tight">
        <div className="wrap">
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 24, marginBottom: 36 }}>
            <div>
              <div className="eyebrow"><span className="tick" />Built for</div>
              <h2 className="display h-lg" style={{ marginTop: 18, maxWidth: "20ch" }}>
                For businesses that are <b>growing or already complex.</b>
              </h2>
            </div>
            <p className="body" style={{ maxWidth: "40ch" }}>
              We bring practical experience across business sizes and stages, so the structure we build fits how you actually operate.
            </p>
          </div>
          <div className="chipgrid">
            {A_AUDIENCE.map((a, i) => <span className="chip2" key={i}><span className="dot" />{a}</span>)}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ──────────────────────────────────────── */}
      <section className="section" id="review">
        <div className="wrap">
          <div className="glass lit grid-bg" style={{ padding: "58px 56px", borderRadius: "var(--radius-xl)", position: "relative", overflow: "hidden" }}>
            <div className="edge" />
            <div style={{ position: "absolute", inset: 0, zIndex: 0,
              background: "radial-gradient(80% 120% at 88% 0%, rgba(27,139,96,.16), transparent 60%)" }} />
            <div style={{ position: "relative", zIndex: 2, maxWidth: 700 }}>
              <div className="eyebrow">The next step</div>
              <h2 className="display h-xl" style={{ marginTop: 18, fontSize: 50 }}>
                Request an Accounting and <b>Financial Services Review.</b>
              </h2>
              <p className="lead" style={{ marginTop: 22, maxWidth: "52ch" }}>
                We help identify where reporting, compliance, cash movement, payroll, tax, and financial control need stronger structure — and design the system to close the gaps.
              </p>
              <div className="bs-hero-cta" style={{ display: "flex", gap: 14, marginTop: 34, flexWrap: "wrap" }}>
                <button className="btn btn-primary btn-lg" onClick={() => openBooking("financial")}>
                  Request a Review <Icon name="arrow" size={17} color="#fff" />
                </button>
                <button className="btn btn-ghost btn-lg" onClick={() => jump("services")}>Explore Services</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
