/* Lean Hippo website — BookingModal: glassy multi-step Discovery Session request. */

const BOOK_SERVICES = [
  { key: "bottleneck", icon: "funnel", title: "Bottleneck Discovery Session",
    desc: "Identify where your business is losing time, money, control, or execution speed, and uncover the operational friction holding growth back." },
  { key: "systems", icon: "systems", title: "Business Systems Discovery Session",
    desc: "Review your workflows, approvals, SOPs, dashboards, tools, and data flow to identify what systems need to be built, connected, or improved." },
  { key: "growth", icon: "megaphone", title: "Growth & Marketing Discovery Session",
    desc: "Examine your positioning, lead generation, content systems, campaign structure, customer acquisition, and growth engine to find stronger routes to revenue." },
  { key: "financial", icon: "calc", title: "Accounting & Finance Discovery Session",
    desc: "Assess your financial visibility, reporting structure, reconciliations, payment tracking, cost control, and owner-level financial clarity." },
  { key: "ai", icon: "brain", title: "AI Readiness Discovery Session",
    desc: "Explore where AI can realistically improve your business, from automation and decision support to customer response, reporting, and internal intelligence." },
];

const BOOK_WINDOWS = [
  { key: "first", label: "First half", range: "9:00 AM – 12:00 PM" },
  { key: "second", label: "Second half", range: "2:30 PM – 5:30 PM" },
];

function nextBusinessDays(n) {
  const out = [], d = new Date();
  d.setHours(0, 0, 0, 0); d.setDate(d.getDate() + 1);
  while (out.length < n) {
    const day = d.getDay();
    if (day !== 0 && day !== 6) out.push(new Date(d));
    d.setDate(d.getDate() + 1);
  }
  return out;
}
const DOW = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function BookingModal({ open, onClose, initialService }) {
  const [step, setStep] = React.useState(0);
  const [service, setService] = React.useState("bottleneck");
  const [date, setDate] = React.useState(null);
  const [window_, setWindow] = React.useState(null);
  const [form, setForm] = React.useState({ name: "", business: "", email: "", phone: "", notes: "" });
  const days = React.useMemo(() => nextBusinessDays(12), [open]);

  React.useEffect(() => {
    if (open) {
      setStep(0); setService(initialService || "bottleneck");
      setDate(null); setWindow(null);
      setForm({ name: "", business: "", email: "", phone: "", notes: "" });
    }
  }, [open, initialService]);

  const svc = BOOK_SERVICES.find((s) => s.key === service) || BOOK_SERVICES[0];
  const win = BOOK_WINDOWS.find((w) => w.key === window_);
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const canNext = step === 0 ? !!service : step === 1 ? (date != null && window_ != null) : step === 2 ? (form.name && form.email) : true;
  const stepLabels = ["Session", "Preferred date", "Details", "Submitted"];
  const dateStr = date ? `${DOW[date.getDay()]} ${date.getDate()} ${MON[date.getMonth()]}` : "—";

  return (
    <React.Fragment>
      <div className={"book-overlay" + (open ? " open" : "")} onClick={onClose} />
      <div className={"book-modal" + (open ? " open" : "")} role="dialog" aria-modal="true" aria-hidden={!open}>
        <div className="book-glow" />
        <button className="book-close" onClick={onClose} aria-label="Close"><WIcon name="x" size={18} /></button>

        {/* header / progress */}
        <div className="book-head">
          <div className="eyebrow">Book a Discovery Session</div>
          <div className="book-steps">
            {stepLabels.map((l, i) => (
              <div key={i} className={"book-pip" + (i === step ? " on" : "") + (i < step ? " done" : "")}>
                <span className="bp-dot">{i < step ? <WIcon name="check" size={11} color="#fff" /> : i + 1}</span>
                <span className="bp-l">{l}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="book-body">
          {/* STEP 0 — session */}
          {step === 0 && (
            <div className="book-pane">
              <h3 className="book-h">Choose your Discovery Session</h3>
              <div className="book-svcs">
                {BOOK_SERVICES.map((s) => (
                  <button key={s.key} className={"book-svc" + (service === s.key ? " sel" : "")} onClick={() => setService(s.key)}>
                    <div className="bs-ic"><WIcon name={s.icon} size={20} color="var(--lh-cobalt-100)" /></div>
                    <div className="bs-main">
                      <div className="bs-row"><span className="bs-t">{s.title}</span></div>
                      <div className="bs-d">{s.desc}</div>
                    </div>
                    <span className="bs-check">{service === s.key ? <WIcon name="check" size={15} color="#fff" /> : null}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 1 — preferred date + availability window */}
          {step === 1 && (
            <div className="book-pane">
              <h3 className="book-h">Pick a preferred date</h3>
              <div className="book-cal">
                {days.map((d, i) => {
                  const sel = date && d.toDateString() === date.toDateString();
                  return (
                    <button key={i} className={"book-day" + (sel ? " sel" : "")} onClick={() => setDate(d)}>
                      <span className="bd-dow">{DOW[d.getDay()]}</span>
                      <span className="bd-num">{d.getDate()}</span>
                      <span className="bd-mon">{MON[d.getMonth()]}</span>
                    </button>
                  );
                })}
              </div>
              <div className="book-winlabel">Preferred availability</div>
              <div className={"book-windows" + (date ? "" : " disabled")}>
                {BOOK_WINDOWS.map((w) => (
                  <button key={w.key} className={"book-window" + (window_ === w.key ? " sel" : "")} disabled={!date} onClick={() => setWindow(w.key)}>
                    <span className="bw-l">{w.label}</span>
                    <span className="bw-r">{w.range}</span>
                  </button>
                ))}
              </div>
              {!date && <div className="book-hint">Select a preferred date to choose your availability window.</div>}
            </div>
          )}

          {/* STEP 2 — details */}
          {step === 2 && (
            <div className="book-pane">
              <h3 className="book-h">Your details</h3>
              <div className="book-form">
                <label className="bf"><span>Full name</span><input value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Naledi Mokoena" /></label>
                <label className="bf"><span>Business</span><input value={form.business} onChange={(e) => set("business", e.target.value)} placeholder="Riverside Trading Co" /></label>
                <label className="bf"><span>Work email</span><input value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="you@business.co.za" /></label>
                <label className="bf"><span>Phone</span><input value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+27 ..." /></label>
                <label className="bf full"><span>What should we look at first? <em>(optional)</em></span><textarea value={form.notes} onChange={(e) => set("notes", e.target.value)} rows={3} placeholder="Cash control, missed enquiries, supplier pricing…" /></label>
              </div>
            </div>
          )}

          {/* STEP 3 — confirmation */}
          {step === 3 && (
            <div className="book-pane book-confirm">
              <div className="bc-orb">
                <div className="mind-orb" style={{ width: 72, height: 72, animation: "none", cursor: "default" }}>
                  <span className="glyph"><WIcon name="check" size={30} color="#fff" /></span>
                </div>
              </div>
              <h3 className="book-h" style={{ textAlign: "center" }}>Request Received</h3>
              <p className="book-sub">Thank you for requesting a Lean Hippo Discovery Session. Our team will review your request and get in touch shortly to confirm the next step.</p>
              <div className="book-summary">
                <div className="bsum-row"><span>Session</span><b>{svc.title}</b></div>
                <div className="bsum-row"><span>Preferred date</span><b>{dateStr}</b></div>
                <div className="bsum-row"><span>Availability</span><b>{win ? `${win.label} · ${win.range}` : "—"}</b></div>
                <div className="bsum-row"><span>For</span><b>{form.business || form.name || "—"}</b></div>
              </div>
            </div>
          )}
        </div>

        {/* footer / nav */}
        <div className="book-foot">
          {step < 3 ? (
            <React.Fragment>
              <div className="book-foot-info">
                {svc.title}{date ? ` · ${dateStr}` : ""}{win ? ` · ${win.label}` : ""}
              </div>
              <div className="book-foot-btns">
                {step > 0 && <button className="btn btn-ghost" onClick={() => setStep(step - 1)}>Back</button>}
                <button className="btn btn-primary" disabled={!canNext} onClick={() => setStep(step + 1)}>
                  {step === 2 ? "Submit request" : "Continue"} <WIcon name="arrow" size={16} color="#fff" />
                </button>
              </div>
            </React.Fragment>
          ) : (
            <button className="btn btn-primary btn-lg" style={{ marginLeft: "auto" }} onClick={onClose}>Done</button>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}

window.BookingModal = BookingModal;
