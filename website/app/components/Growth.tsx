"use client";

import { Icon } from "./Icon";
import { useChrome } from "./chrome-context";

/* Growth & Marketing — Wing 02.
   Page-scoped branding-orange theme lives in globals.css under
   .growth-marketing-page. MIND+ keeps its cobalt orb everywhere. */

const GM_SUITE = [
  { fn: "01 · Diagnosis", icon: "gauge", title: "Growth Diagnosis",
    desc: "Find the leaks before scaling the spend. A clear map of where growth breaks and what to install first." },
  { fn: "02 · Brand", icon: "spark", title: "Brand and Positioning",
    desc: "Make the business easier to understand, remember, and choose. Commercial clarity, not a logo refresh." },
  { fn: "03 · Content", icon: "layers", title: "Content Engine",
    desc: "Turn ideas into consistent market presence — calendar, scripts, reels, stories, brand voice." },
  { fn: "04 · Social", icon: "switchboard", title: "Social Operating System",
    desc: "Not just posting. Channel discipline, content flow, and conversion across every platform." },
  { fn: "05 · Paid", icon: "funnel", title: "Paid and Performance",
    desc: "Spend only when the funnel can convert. Paid social and search tied to tracking and landing pages." },
  { fn: "06 · Campaigns", icon: "megaphone", title: "Campaign Design and Launch",
    desc: "Campaigns that move customers, not just calendars — launches, seasons, offers, influencers." },
  { fn: "07 · Web", icon: "plug", title: "Websites and Landing Pages",
    desc: "Conversion infrastructure for traffic, leads, and sales — forms, booking, tracking, all connected." },
  { fn: "08 · CRM", icon: "vault", title: "Customer Management",
    desc: "The customer memory most businesses lack — profiles, history, segmentation, automated follow-up." },
  { fn: "09 · Follow-up", icon: "refresh", title: "WhatsApp, Email and SMS",
    desc: "Follow-up that does not depend on memory. Lead flows, reactivation, broadcasts, response logic." },
  { fn: "10 · Retention", icon: "link", title: "Retention and Repeat",
    desc: "Growth is not only acquisition. Loyalty, win-backs, VIP lists, post-purchase messaging." },
  { fn: "11 · Visibility", icon: "systems", title: "Growth Visibility",
    desc: "See what is working before spending more — leads, conversions, campaigns, spend, ROI in one view." },
  { fn: "12 · Intelligence", icon: "brain", title: "MIND+ Intelligence",
    desc: "An intelligence layer over every growth product — recommendations, memory, next best actions." },
];

const GM_AGENCY: [string, string][] = [
  ["Agencies post content", "We connect content to conversion"],
  ["Agencies run campaigns", "We connect campaigns to CRM and follow-up"],
  ["Agencies report metrics", "We build visibility into leads and revenue"],
];

const GM_ARCH = ["Brand", "Content", "Channels", "Leads", "CRM", "Sales", "Retention", "Visibility", "Intelligence"];

const GM_PACKAGES = [
  { name: "Starter", tag: "", feat: false, d: "Clarity, presence, and basic growth structure for businesses getting set up.",
    forwho: "Clarity · Presence · Foundations" },
  { name: "Growth", tag: "Most chosen", feat: true, d: "Active execution, campaigns, customer capture, and follow-up running every month.",
    forwho: "Execution · Capture · Follow-up" },
  { name: "Scale", tag: "", feat: false, d: "Full growth system operation, performance marketing, customer intelligence, and visibility.",
    forwho: "Operation · Performance · Intelligence" },
];

const GM_PROCESS = [
  { n: "01", h: "Diagnose", d: "Map where growth is leaking and what to install first." },
  { n: "02", h: "Design", d: "Shape the strategy, offers, and system architecture." },
  { n: "03", h: "Build", d: "Install brand, content, funnels, CRM, and tracking." },
  { n: "04", h: "Launch", d: "Put campaigns and channels live with follow-up wired in." },
  { n: "05", h: "Measure", d: "Track leads, conversions, spend, and customer behaviour." },
  { n: "06", h: "Improve", d: "Refine the system month over month as it matures." },
];

const GM_MIND = [
  { ic: "spark", h: "Campaign and content ideas", d: "Suggests angles from what has already worked across your channels." },
  { ic: "eye", h: "Performance interpretation", d: "Reads results and explains what is moving, in plain language." },
  { ic: "refresh", h: "Follow-up suggestions", d: "Flags leads going cold and recommends the next message or offer." },
  { ic: "layers", h: "Customer segmentation", d: "Groups customers by behaviour and value so spend goes where it converts." },
];

const GM_TRUST = ["Diagnose", "Build", "Operate", "Convert", "Retain", "Measure"];

/* The MIND+ orb — cobalt, identical everywhere, never recoloured. */
function MindOrbMini({ s = 18 }: { s?: number }) {
  return (
    <span className="mind-orb" style={{ width: s, height: s, animation: "none", flex: "0 0 auto", cursor: "default" }}>
      <span className="glyph"><span className="m" style={{ fontSize: s * 0.5 }}>M</span><span className="p" style={{ fontSize: s * 0.42 }}>+</span></span>
    </span>
  );
}
function MindBadge({ lg = false, onClick }: { lg?: boolean; onClick?: () => void }) {
  if (onClick) {
    return (
      <button className={"gm-badge gm-badge-lg"} onClick={onClick}>
        <MindOrbMini s={26} />Upgrade with MIND+
      </button>
    );
  }
  return (
    <span className="gm-badge">
      <MindOrbMini s={16} />Upgrade with MIND+
    </span>
  );
}

function jump(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 92;
  window.scrollTo({ top, behavior: "smooth" });
}

export function Growth() {
  const { go, openMind, openBooking } = useChrome();

  return (
    <main className="growth-marketing-page" data-screen-label="Growth and Marketing">

      {/* ── HERO ──────────────────────────────────────────── */}
      <section data-label="GM Hero" className="section grid-bg"
        style={{ paddingTop: 176, paddingBottom: 84, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0,
          background: "radial-gradient(85% 70% at 80% -5%, rgba(241,96,1,.18), transparent 58%)" }} />
        <div className="wrap" style={{ position: "relative", zIndex: 2 }}>
          <div className="eyebrow"><span className="tick" />Wing 02 · Available now</div>
          <h1 className="display h-xl" style={{ marginTop: 22, maxWidth: "16ch" }}>
            We build the machine <b>behind growth.</b>
          </h1>
          <p className="lead" style={{ marginTop: 24, maxWidth: "52ch" }}>
            We diagnose growth gaps, build the infrastructure, run the channels, capture the customers, and add intelligence with MIND+. One connected system that turns attention into revenue.
          </p>
          <div className="bs-hero-cta" style={{ display: "flex", gap: 14, marginTop: 34, flexWrap: "wrap" }}>
            <button className="btn btn-primary btn-lg" onClick={() => openBooking("growth")}>
              Book a Growth Session <Icon name="arrow" size={17} color="#fff" />
            </button>
            <button className="btn btn-secondary btn-lg" onClick={() => jump("suite")}>
              See what we install
            </button>
          </div>
          <div className="gm-trust">
            <span className="lbl" style={{ color: "var(--text-secondary)" }}>One connected system</span>
            {GM_TRUST.map((t, i) => (
              <span key={i} style={{ display: "contents" }}><span className="sep" /><span className="lbl">{t}</span></span>
            ))}
          </div>
        </div>
      </section>

      {/* ── POSITIONING + AGENCY CONTRAST ─────────────────── */}
      <section data-label="GM Positioning" className="section tight gm-tint-l">
        <div className="wrap">
          <div data-gm-2col style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center", marginBottom: 44 }}>
            <div>
              <div className="eyebrow"><span className="tick" />Infrastructure, not noise</div>
              <h2 className="display h-lg" style={{ marginTop: 18, maxWidth: "15ch" }}>
                Most businesses are marketing <b>without a machine.</b>
              </h2>
            </div>
            <p className="body" style={{ maxWidth: "46ch" }}>
              Content is inconsistent, ads run without funnels, leads slip after first contact, and customer data is scattered.
              <span style={{ display: "block", marginTop: 14, color: "var(--text-primary)" }}>
                It is not a marketing problem. <span className="accent">It is a disconnected growth system problem.</span>
              </span>
            </p>
          </div>
          <div className="changes">
            {GM_AGENCY.map((c, i) => (
              <div className="change" key={i}>
                <div className="before"><span className="clabel">Agency</span>{c[0]}</div>
                <Icon name="arrow" size={18} color="var(--accent-soft)" />
                <div className="after"><span className="clabel">LeanHippo</span>{c[1]}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GROWTH ARCHITECTURE ───────────────────────────── */}
      <section data-label="GM Architecture" className="section tight" id="architecture">
        <div className="wrap">
          <div className="eyebrow"><span className="tick" />One growth operating system</div>
          <h2 className="display h-lg" style={{ marginTop: 18, marginBottom: 32, maxWidth: "20ch" }}>
            Every part connects to <b>the next.</b>
          </h2>
          <div className="gm-arch">
            <div className="edge" />
            <div className="gm-flow">
              {GM_ARCH.map((n, i) => (
                <span key={i} style={{ display: "contents" }}>
                  <div className={"gm-node" + (i === GM_ARCH.length - 1 ? " intel" : "")}>
                    <div className="gdot" />
                    <div className="gnk">{String(i + 1).padStart(2, "0")}</div>
                    <div className="gnn">{n}</div>
                  </div>
                  {i < GM_ARCH.length - 1 && (
                    <div className="gm-conn"><Icon name="arrow" size={16} color="currentColor" /></div>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PRODUCT SUITE ─────────────────────────────────── */}
      <section data-label="GM Suite" className="section tight gm-tint-r" id="suite">
        <div className="wrap">
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 24, marginBottom: 40 }}>
            <div>
              <div className="eyebrow"><span className="tick" />What LeanHippo installs and runs</div>
              <h2 className="display h-lg" style={{ marginTop: 18, maxWidth: "16ch" }}>
                The growth and marketing <b>product suite.</b>
              </h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, alignItems: "flex-start", maxWidth: "38ch" }}>
              <p className="body" style={{ margin: 0 }}>
                Twelve connected products, not isolated services. Each one feeds the next — and every one can be upgraded.
              </p>
              <MindBadge />
            </div>
          </div>
          <div className="organs">
            {GM_SUITE.map((o, i) => (
              <div className="organ" key={i}>
                <div className="oicon"><Icon name={o.icon} size={20} color="var(--accent-soft)" /></div>
                <div className="ofn">{o.fn}</div>
                <div className="otitle">{o.title}</div>
                <div className="odesc">{o.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BUILD vs RUN ──────────────────────────────────── */}
      <section data-label="GM BuildRun" className="section tight">
        <div className="wrap">
          <div style={{ marginBottom: 36 }}>
            <div className="eyebrow"><span className="tick" />Build work and ongoing operation</div>
            <h2 className="display h-lg" style={{ marginTop: 18, maxWidth: "20ch" }}>
              Install it once, <b>or run it every month.</b>
            </h2>
          </div>
          <div className="gm-split">
            <div className="gm-col">
              <div className="edge" />
              <div className="ck">One-off builds</div>
              <div className="ch">The infrastructure</div>
              <ul className="clist">
                {["Websites and landing pages", "CRM and dashboard setup", "Lead, booking, and offer forms", "Campaign and tracking infrastructure"].map((x, k) => <li key={k}>{x}</li>)}
              </ul>
            </div>
            <div className="gm-col lit">
              <div className="edge" />
              <div className="ck">Monthly growth operation</div>
              <div className="ch">The execution</div>
              <ul className="clist">
                {["Content production and social operation", "Performance marketing and campaigns", "CRM follow-up and customer management", "Retention, reporting, and improvement"].map((x, k) => <li key={k}>{x}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── MIND+ GROWTH INTELLIGENCE ─────────────────────── */}
      <section data-label="GM Mind" className="section tight gm-tint-l" id="mindplus">
        <div className="wrap" data-gm-2col style={{ display: "grid", gridTemplateColumns: "0.85fr 1.15fr", gap: 56, alignItems: "center" }}>
          <div>
            <div className="eyebrow"><span className="tick" />The intelligence layer</div>
            <h2 className="display h-lg" style={{ marginTop: 18, maxWidth: "13ch" }}>
              Upgrade any product with <b>MIND+.</b>
            </h2>
            <p className="body" style={{ marginTop: 18, maxWidth: "42ch" }}>
              MIND+ is not a chatbot. It is an intelligence layer over your growth products — learning campaign, brand, and customer patterns to improve conversion over time.
            </p>
            <div style={{ marginTop: 26 }}>
              <MindBadge lg onClick={openMind} />
            </div>
          </div>
          <div className="organs" style={{ gridTemplateColumns: "1fr 1fr" }}>
            {GM_MIND.map((f, i) => (
              <div className="organ" key={i}>
                <div className="oicon"><Icon name={f.ic} size={20} color="var(--accent-soft)" /></div>
                <div className="otitle" style={{ fontSize: 18 }}>{f.h}</div>
                <div className="odesc">{f.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PACKAGES ──────────────────────────────────────── */}
      <section data-label="GM Packages" className="section tight gm-tint-r" id="packages">
        <div className="wrap">
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 24, marginBottom: 40 }}>
            <div>
              <div className="eyebrow"><span className="tick" />Packages</div>
              <h2 className="display h-lg" style={{ marginTop: 18, maxWidth: "18ch" }}>
                Start where you are ready. <b>Expand as you grow.</b>
              </h2>
            </div>
            <p className="body" style={{ maxWidth: "38ch" }}>
              Strategic entry paths, not a pricing page. One-off builds and monthly retainers available depending on scope.
            </p>
          </div>
          <div className="gm-pkgs">
            {GM_PACKAGES.map((p, i) => (
              <div className={"gm-pkg" + (p.feat ? " feat" : "")} key={i}>
                {p.feat && <div className="edge" />}
                <div className="pkk">
                  <span className="pkname">{p.name}</span>
                  {p.tag && <span className="pktag">{p.tag}</span>}
                </div>
                <div className="pkd">{p.d}</div>
                <div className="pkfor">{p.forwho}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────── */}
      <section data-label="GM Process" className="section tight">
        <div className="wrap">
          <div className="eyebrow"><span className="tick" />How LeanHippo works</div>
          <h2 className="display h-lg" style={{ marginTop: 18, marginBottom: 40, maxWidth: "20ch" }}>
            From diagnosis to <b>continuous improvement.</b>
          </h2>
          <div className="gm-process">
            {GM_PROCESS.map((p, i) => (
              <div className="gm-pstep" key={i}>
                <div className="pn">Step {p.n}</div>
                <div className="gm-pdot"><i /></div>
                <div className="ph">{p.h}</div>
                <div className="pd">{p.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────── */}
      <section className="section" id="growth-session" style={{ paddingTop: 90, paddingBottom: 100 }}>
        <div className="wrap">
          <div className="glass lit grid-bg" style={{ padding: "56px 54px", borderRadius: "var(--radius-xl)", position: "relative", overflow: "hidden" }}>
            <div className="edge" />
            <div style={{ position: "absolute", inset: 0, zIndex: 0,
              background: "radial-gradient(80% 120% at 88% 0%, rgba(232,80,2,.22), transparent 60%)" }} />
            <div style={{ position: "relative", zIndex: 2, maxWidth: 640 }}>
              <div className="eyebrow">The next step</div>
              <h2 className="display h-xl" style={{ marginTop: 18, fontSize: 50 }}>
                Book a <b>Growth Session.</b>
              </h2>
              <p className="lead" style={{ marginTop: 20, maxWidth: "50ch" }}>
                See where growth is leaking and what system should be installed first. LeanHippo builds the infrastructure behind customer conversion.
              </p>
              <div className="bs-hero-cta" style={{ display: "flex", gap: 14, marginTop: 32, flexWrap: "wrap" }}>
                <button className="btn btn-primary btn-lg" onClick={() => openBooking("growth")}>
                  Book a Growth Session <Icon name="arrow" size={17} color="#fff" />
                </button>
                <button className="btn btn-ghost btn-lg" onClick={() => go("systems")}>See Business Systems</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
