"use client";

import { useEffect, useMemo, useState } from "react";
import { Icon } from "./Icon";
import type { BookingService } from "./chrome-context";

/* ============================================================
   Booking — glassy multi-step Discovery Session request.
   On submit, posts to Web3Forms, which emails the request to
   the address tied to your access key (set it to contact@leanhippo.io).
   The request CANNOT be submitted until every required field is valid.
   ============================================================ */

// Web3Forms access key. Create one free at https://web3forms.com using
// contact@leanhippo.io as the destination, then set it here or via the
// NEXT_PUBLIC_WEB3FORMS_KEY environment variable at build time.
const ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "REPLACE_WITH_WEB3FORMS_ACCESS_KEY";

const CONTACT_EMAIL = "contact@leanhippo.io";

const BOOK_SERVICES: { key: BookingService; icon: string; title: string; desc: string }[] = [
  {
    key: "bottleneck",
    icon: "funnel",
    title: "Bottleneck Discovery Session",
    desc: "Identify where your business is losing time, money, control, or execution speed, and uncover the operational friction holding growth back.",
  },
  {
    key: "systems",
    icon: "systems",
    title: "Business Systems Discovery Session",
    desc: "Review your workflows, approvals, SOPs, dashboards, tools, and data flow to identify what systems need to be built, connected, or improved.",
  },
  {
    key: "growth",
    icon: "megaphone",
    title: "Growth & Marketing Discovery Session",
    desc: "Examine your positioning, lead generation, content systems, campaign structure, customer acquisition, and growth engine to find stronger routes to revenue.",
  },
  {
    key: "financial",
    icon: "calc",
    title: "Accounting & Finance Discovery Session",
    desc: "Assess your financial visibility, reporting structure, reconciliations, payment tracking, cost control, and owner-level financial clarity.",
  },
  {
    key: "ai",
    icon: "brain",
    title: "AI Readiness Discovery Session",
    desc: "Explore where AI can realistically improve your business, from automation and decision support to customer response, reporting, and internal intelligence.",
  },
];

const BOOK_WINDOWS = [
  { key: "first", label: "First half", range: "9:00 AM – 12:00 PM" },
  { key: "second", label: "Second half", range: "2:30 PM – 5:30 PM" },
];

const DOW = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function nextBusinessDays(n: number) {
  const out: Date[] = [];
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 1);
  while (out.length < n) {
    const day = d.getDay();
    if (day !== 0 && day !== 6) out.push(new Date(d));
    d.setDate(d.getDate() + 1);
  }
  return out;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function BookingModal({
  open,
  onClose,
  initialService,
}: {
  open: boolean;
  onClose: () => void;
  initialService: BookingService;
}) {
  const [step, setStep] = useState(0);
  const [service, setService] = useState<BookingService>("bottleneck");
  const [date, setDate] = useState<Date | null>(null);
  const [window_, setWindow] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", business: "", email: "", phone: "", notes: "" });
  const [touched, setTouched] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const days = useMemo(() => nextBusinessDays(12), []);

  useEffect(() => {
    if (open) {
      setStep(0);
      setService(initialService || "bottleneck");
      setDate(null);
      setWindow(null);
      setForm({ name: "", business: "", email: "", phone: "", notes: "" });
      setTouched(false);
      setSubmitting(false);
      setError(null);
    }
  }, [open, initialService]);

  // Lock body scroll while the modal is open.
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  const svc = BOOK_SERVICES.find((s) => s.key === service) || BOOK_SERVICES[0];
  const win = BOOK_WINDOWS.find((w) => w.key === window_);
  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const emailValid = EMAIL_RE.test(form.email.trim());
  const detailsValid =
    form.name.trim() !== "" && form.business.trim() !== "" && emailValid && form.phone.trim() !== "";

  const canNext =
    step === 0
      ? !!service
      : step === 1
        ? date != null && window_ != null
        : step === 2
          ? detailsValid
          : true;

  const stepLabels = ["Session", "Preferred date", "Details", "Submitted"];
  const dateStr = date ? `${DOW[date.getDay()]} ${date.getDate()} ${MON[date.getMonth()]}` : "—";

  async function submit() {
    setTouched(true);
    if (!detailsValid || submitting) return;
    setSubmitting(true);
    setError(null);

    const payload = {
      access_key: ACCESS_KEY,
      subject: `New Discovery Session request — ${svc.title}`,
      from_name: "Lean Hippo Website",
      // Web3Forms maps an "email" field to a reply-to; we send the requester's.
      email: form.email.trim(),
      "Discovery session": svc.title,
      "Preferred date": dateStr,
      "Preferred availability": win ? `${win.label} · ${win.range}` : "—",
      "Full name": form.name.trim(),
      Business: form.business.trim(),
      Phone: form.phone.trim(),
      "What to look at first": form.notes.trim() || "—",
    };

    try {
      if (ACCESS_KEY === "REPLACE_WITH_WEB3FORMS_ACCESS_KEY") {
        // No key configured yet — fall back to a mailto so nothing is lost.
        const body = Object.entries(payload)
          .filter(([k]) => k !== "access_key" && k !== "from_name")
          .map(([k, v]) => `${k}: ${v}`)
          .join("\n");
        window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
          payload.subject,
        )}&body=${encodeURIComponent(body)}`;
        setStep(3);
        setSubmitting(false);
        return;
      }

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setStep(3);
      } else {
        setError(data.message || "Something went wrong. Please email contact@leanhippo.io directly.");
      }
    } catch {
      setError("Network error. Please check your connection or email contact@leanhippo.io directly.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <div className={"book-overlay" + (open ? " open" : "")} onClick={onClose} />
      <div className={"book-modal" + (open ? " open" : "")} role="dialog" aria-modal="true" aria-hidden={!open} aria-label="Book a Discovery Session">
        <div className="book-glow" />
        <button className="book-close" onClick={onClose} aria-label="Close">
          <Icon name="x" size={18} />
        </button>

        <div className="book-head">
          <div className="eyebrow">Book a Discovery Session</div>
          <div className="book-steps">
            {stepLabels.map((l, i) => (
              <div key={i} className={"book-pip" + (i === step ? " on" : "") + (i < step ? " done" : "")}>
                <span className="bp-dot">{i < step ? <Icon name="check" size={11} color="#fff" /> : i + 1}</span>
                <span className="bp-l">{l}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="book-body">
          {step === 0 && (
            <div className="book-pane">
              <h3 className="book-h">Choose your Discovery Session</h3>
              <div className="book-svcs">
                {BOOK_SERVICES.map((s) => (
                  <button
                    key={s.key}
                    className={"book-svc" + (service === s.key ? " sel" : "")}
                    onClick={() => setService(s.key)}
                  >
                    <div className="bs-ic">
                      <Icon name={s.icon} size={20} color="var(--lh-cobalt-100)" />
                    </div>
                    <div className="bs-main">
                      <div className="bs-row">
                        <span className="bs-t">{s.title}</span>
                      </div>
                      <div className="bs-d">{s.desc}</div>
                    </div>
                    <span className="bs-check">
                      {service === s.key ? <Icon name="check" size={15} color="#fff" /> : null}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="book-pane">
              <h3 className="book-h">Pick a preferred date</h3>
              <div className="book-cal">
                {days.map((d, i) => {
                  const sel = !!date && d.toDateString() === date.toDateString();
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
                  <button
                    key={w.key}
                    className={"book-window" + (window_ === w.key ? " sel" : "")}
                    disabled={!date}
                    onClick={() => setWindow(w.key)}
                  >
                    <span className="bw-l">{w.label}</span>
                    <span className="bw-r">{w.range}</span>
                  </button>
                ))}
              </div>
              {!date && <div className="book-hint small">Select a preferred date to choose your availability window.</div>}
            </div>
          )}

          {step === 2 && (
            <div className="book-pane">
              <h3 className="book-h">Your details</h3>
              <div className="book-form">
                <label className="bf">
                  <span>Full name <span className="req">*</span></span>
                  <input
                    className={touched && !form.name.trim() ? "invalid" : ""}
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                    placeholder="Naledi Mokoena"
                    required
                  />
                </label>
                <label className="bf">
                  <span>Business <span className="req">*</span></span>
                  <input
                    className={touched && !form.business.trim() ? "invalid" : ""}
                    value={form.business}
                    onChange={(e) => set("business", e.target.value)}
                    placeholder="Riverside Trading Co"
                    required
                  />
                </label>
                <label className="bf">
                  <span>Work email <span className="req">*</span></span>
                  <input
                    type="email"
                    className={touched && !EMAIL_RE.test(form.email.trim()) ? "invalid" : ""}
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    placeholder="you@business.co.za"
                    required
                  />
                </label>
                <label className="bf">
                  <span>Phone <span className="req">*</span></span>
                  <input
                    className={touched && !form.phone.trim() ? "invalid" : ""}
                    value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    placeholder="+27 ..."
                    required
                  />
                </label>
                <label className="bf full">
                  <span>What should we look at first? <em>(optional)</em></span>
                  <textarea
                    value={form.notes}
                    onChange={(e) => set("notes", e.target.value)}
                    rows={3}
                    placeholder="Cash control, missed enquiries, supplier pricing…"
                  />
                </label>
              </div>
              {touched && !detailsValid && (
                <div className="book-err">Please complete all required fields with a valid email to continue.</div>
              )}
              {error && <div className="book-err">{error}</div>}
            </div>
          )}

          {step === 3 && (
            <div className="book-pane book-confirm">
              <div className="bc-orb">
                <div className="mind-orb" style={{ width: 72, height: 72, animation: "none", cursor: "default" }}>
                  <span className="glyph">
                    <Icon name="check" size={30} color="#fff" />
                  </span>
                </div>
              </div>
              <h3 className="book-h" style={{ textAlign: "center" }}>Request Received</h3>
              <p className="book-sub">
                Thank you for requesting a Lean Hippo Discovery Session. Our team will review your request and get in
                touch shortly to confirm the next step.
              </p>
              <div className="book-summary">
                <div className="bsum-row"><span>Session</span><b>{svc.title}</b></div>
                <div className="bsum-row"><span>Preferred date</span><b>{dateStr}</b></div>
                <div className="bsum-row"><span>Availability</span><b>{win ? `${win.label} · ${win.range}` : "—"}</b></div>
                <div className="bsum-row"><span>For</span><b>{form.business || form.name || "—"}</b></div>
              </div>
            </div>
          )}
        </div>

        <div className="book-foot">
          {step < 3 ? (
            <>
              <div className="book-foot-info">
                {svc.title}
                {date ? ` · ${dateStr}` : ""}
                {win ? ` · ${win.label}` : ""}
              </div>
              <div className="book-foot-btns">
                {step > 0 && (
                  <button className="btn btn-ghost" onClick={() => setStep(step - 1)} disabled={submitting}>
                    Back
                  </button>
                )}
                <button
                  className="btn btn-primary"
                  disabled={!canNext || submitting}
                  onClick={() => (step === 2 ? submit() : setStep(step + 1))}
                >
                  {step === 2 ? (submitting ? "Sending…" : "Submit request") : "Continue"}{" "}
                  {!submitting && <Icon name="arrow" size={16} color="#fff" />}
                </button>
              </div>
            </>
          ) : (
            <button className="btn btn-primary btn-lg" style={{ marginLeft: "auto" }} onClick={onClose}>
              Done
            </button>
          )}
        </div>
      </div>
    </>
  );
}
