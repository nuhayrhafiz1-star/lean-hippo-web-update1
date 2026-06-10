"use client";

import { useEffect, useMemo, useState } from "react";
import { Icon } from "./Icon";
import type { BookingService } from "./chrome-context";

/* ============================================================
   Booking — glassy multi-step Discovery Session request.

   Validation rules (a booking cannot be confirmed unless ALL pass):
     • At least one Discovery Session is selected (multi-select).
     • Full name and Business are non-empty.
     • Email is well-formed (any valid address).
     • Phone is digits that match the selected country's length.
   Invalid / empty fields are highlighted in red on submit.

   On submit it POSTs the full request (including every selected
   session) as JSON to our n8n webhook, which sends a branded
   confirmation to the requester and a booking alert to
   contact@leanhippo.io.
   ============================================================ */

// n8n webhook (own domain). CORS is allowed on the n8n side. Overridable
// at build time via NEXT_PUBLIC_BOOKING_ENDPOINT.
const BOOKING_ENDPOINT =
  process.env.NEXT_PUBLIC_BOOKING_ENDPOINT ||
  "https://n8n.leanhippo.io/webhook/booking";

// Optional independent logbook (e.g. a Google Apps Script that appends each
// booking to a Google Sheet). Posted fire-and-forget on every submit, so a
// booking is recorded even if n8n is down. Empty = disabled.
const BOOKING_LOG_URL = process.env.NEXT_PUBLIC_BOOKING_LOG_URL || "";

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

/* Country dial codes + expected national mobile-number length range.
   Bangladesh is the default. Israel is intentionally excluded. */
const COUNTRIES: { iso: string; name: string; dial: string; min: number; max: number }[] = [
  { iso: "BD", name: "Bangladesh", dial: "+880", min: 10, max: 10 },
  { iso: "US", name: "United States", dial: "+1", min: 10, max: 10 },
  { iso: "GB", name: "United Kingdom", dial: "+44", min: 10, max: 10 },
  { iso: "IN", name: "India", dial: "+91", min: 10, max: 10 },
  { iso: "PK", name: "Pakistan", dial: "+92", min: 10, max: 10 },
  { iso: "AE", name: "United Arab Emirates", dial: "+971", min: 9, max: 9 },
  { iso: "SA", name: "Saudi Arabia", dial: "+966", min: 9, max: 9 },
  { iso: "QA", name: "Qatar", dial: "+974", min: 8, max: 8 },
  { iso: "KW", name: "Kuwait", dial: "+965", min: 8, max: 8 },
  { iso: "BH", name: "Bahrain", dial: "+973", min: 8, max: 8 },
  { iso: "OM", name: "Oman", dial: "+968", min: 8, max: 8 },
  { iso: "SG", name: "Singapore", dial: "+65", min: 8, max: 8 },
  { iso: "MY", name: "Malaysia", dial: "+60", min: 9, max: 10 },
  { iso: "AU", name: "Australia", dial: "+61", min: 9, max: 9 },
  { iso: "CA", name: "Canada", dial: "+1", min: 10, max: 10 },
  { iso: "NZ", name: "New Zealand", dial: "+64", min: 8, max: 10 },
  { iso: "ZA", name: "South Africa", dial: "+27", min: 9, max: 9 },
  { iso: "NG", name: "Nigeria", dial: "+234", min: 10, max: 10 },
  { iso: "KE", name: "Kenya", dial: "+254", min: 9, max: 9 },
  { iso: "EG", name: "Egypt", dial: "+20", min: 10, max: 10 },
  { iso: "GH", name: "Ghana", dial: "+233", min: 9, max: 9 },
  { iso: "LK", name: "Sri Lanka", dial: "+94", min: 9, max: 9 },
  { iso: "NP", name: "Nepal", dial: "+977", min: 10, max: 10 },
  { iso: "ID", name: "Indonesia", dial: "+62", min: 9, max: 11 },
  { iso: "PH", name: "Philippines", dial: "+63", min: 10, max: 10 },
  { iso: "TH", name: "Thailand", dial: "+66", min: 9, max: 9 },
  { iso: "VN", name: "Vietnam", dial: "+84", min: 9, max: 10 },
  { iso: "CN", name: "China", dial: "+86", min: 11, max: 11 },
  { iso: "HK", name: "Hong Kong", dial: "+852", min: 8, max: 8 },
  { iso: "JP", name: "Japan", dial: "+81", min: 10, max: 10 },
  { iso: "KR", name: "South Korea", dial: "+82", min: 9, max: 10 },
  { iso: "TR", name: "Türkiye", dial: "+90", min: 10, max: 10 },
  { iso: "DE", name: "Germany", dial: "+49", min: 10, max: 11 },
  { iso: "FR", name: "France", dial: "+33", min: 9, max: 9 },
  { iso: "ES", name: "Spain", dial: "+34", min: 9, max: 9 },
  { iso: "IT", name: "Italy", dial: "+39", min: 9, max: 10 },
  { iso: "NL", name: "Netherlands", dial: "+31", min: 9, max: 9 },
  { iso: "SE", name: "Sweden", dial: "+46", min: 7, max: 10 },
  { iso: "CH", name: "Switzerland", dial: "+41", min: 9, max: 9 },
  { iso: "IE", name: "Ireland", dial: "+353", min: 9, max: 9 },
  { iso: "BR", name: "Brazil", dial: "+55", min: 10, max: 11 },
  { iso: "MX", name: "Mexico", dial: "+52", min: 10, max: 10 },
  { iso: "AR", name: "Argentina", dial: "+54", min: 10, max: 11 },
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

/** National digits only, with any single trunk "0" prefix removed. */
function phoneDigits(raw: string) {
  return raw.replace(/\D/g, "").replace(/^0+/, "");
}

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
  const [services, setServices] = useState<BookingService[]>(["bottleneck"]);
  const [date, setDate] = useState<Date | null>(null);
  const [window_, setWindow] = useState<string | null>(null);
  const [iso, setIso] = useState("BD");
  const [form, setForm] = useState({ name: "", business: "", businessType: "", website: "", email: "", phone: "" });
  // One focus note per selected session, keyed by the session key. Every
  // selected session must have a note before checkout is allowed.
  const [sessionNotes, setSessionNotes] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mailtoHref, setMailtoHref] = useState<string | null>(null);
  const days = useMemo(() => nextBusinessDays(12), []);

  useEffect(() => {
    if (open) {
      setStep(0);
      setServices([initialService || "bottleneck"]);
      setDate(null);
      setWindow(null);
      setIso("BD");
      setForm({ name: "", business: "", businessType: "", website: "", email: "", phone: "" });
      setSessionNotes({});
      setTouched(false);
      setSubmitting(false);
      setError(null);
      setMailtoHref(null);
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

  const selectedServices = BOOK_SERVICES.filter((s) => services.includes(s.key));
  const win = BOOK_WINDOWS.find((w) => w.key === window_);
  const country = COUNTRIES.find((c) => c.iso === iso) || COUNTRIES[0];
  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));
  const setNote = (k: string, v: string) => setSessionNotes((n) => ({ ...n, [k]: v }));
  // Phone: digits only, drop any leading 0 (the +dial code is shown separately,
  // so e.g. 01712345678 self-corrects to 1712345678), and hard-cap at the
  // country's max length so it stops exactly on the right number of digits.
  const cleanPhone = (raw: string, max: number) =>
    raw.replace(/\D/g, "").replace(/^0+/, "").slice(0, max);
  const setPhone = (raw: string) => set("phone", cleanPhone(raw, country.max));
  const toggleService = (k: BookingService) =>
    setServices((cur) => {
      if (cur.includes(k)) {
        setSessionNotes((n) => {
          const { [k]: _drop, ...rest } = n;
          return rest;
        });
        return cur.filter((x) => x !== k);
      }
      return [...cur, k];
    });

  // ---- Field-level validity ----
  const emailTrim = form.email.trim().toLowerCase();
  const emailValid = EMAIL_RE.test(emailTrim);

  const pd = phoneDigits(form.phone);
  const phoneValid = pd.length >= country.min && pd.length <= country.max;

  const nameValid = form.name.trim() !== "";
  const businessValid = form.business.trim() !== "";
  const businessTypeValid = form.businessType.trim() !== "";
  const servicesValid = services.length > 0;
  // Every selected session needs its own focus note before checkout.
  const noteValid = (k: string) => (sessionNotes[k] || "").trim() !== "";
  const notesValid = services.every(noteValid);
  const detailsValid =
    nameValid && businessValid && businessTypeValid && emailValid && phoneValid && notesValid;

  const canNext =
    step === 0
      ? servicesValid
      : step === 1
        ? date != null && window_ != null
        : step === 2
          ? true // validated on click so we can reveal red fields
          : true;

  const stepLabels = ["Sessions", "Preferred date", "Details", "Submitted"];
  const dateStr = date ? `${DOW[date.getDay()]} ${date.getDate()} ${MON[date.getMonth()]}` : "—";
  const servicesLabel =
    selectedServices.length === 0
      ? "No session selected"
      : selectedServices.length === 1
        ? selectedServices[0].title
        : `${selectedServices.length} sessions selected`;

  const phoneExpected =
    country.min === country.max ? `${country.min} digits` : `${country.min}–${country.max} digits`;
  const emailMsg = emailValid ? "" : "Enter a valid email address.";

  async function submit() {
    setTouched(true);
    if (!detailsValid || submitting) return;
    setSubmitting(true);
    setError(null);

    const fullPhone = `${country.dial} ${pd}`;
    const sessionTitles = selectedServices.map((s) => s.title);
    const esc = (s: string) =>
      s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    // Per-session focus notes (one note per selected session).
    const sessionDetails = selectedServices.map((s) => ({
      title: s.title,
      note: (sessionNotes[s.key] || "").trim(),
    }));
    const notesText = sessionDetails.map((d) => `• ${d.title}\n${d.note}`).join("\n\n");
    // Pre-rendered, escaped HTML rows the email simply injects (title + note).
    const notesHtml = sessionDetails
      .map(
        (d) =>
          `<tr><td style="padding:14px 0 2px;font-size:13px;font-weight:500;color:#1F5EFF;">${esc(d.title)}</td></tr>` +
          `<tr><td style="padding:0 0 8px;font-size:14px;font-weight:300;color:#1C1F24;line-height:1.55;">${esc(d.note)}</td></tr>`,
      )
      .join("");

    const payload = {
      name: form.name.trim(),
      business: form.business.trim(),
      businessType: form.businessType.trim(),
      website: form.website.trim() || "—",
      email: emailTrim,
      phone: fullPhone,
      country: `${country.name} (${country.dial})`,
      sessions: sessionTitles,
      sessionsText: sessionTitles.join("  •  "),
      sessionsCount: sessionTitles.length,
      date: dateStr,
      availability: win ? `${win.label} · ${win.range}` : "—",
      sessionDetails,
      notesText,
      notesHtml,
      subject: `New Discovery Session request — ${form.business.trim()} (${sessionTitles.length} session${sessionTitles.length > 1 ? "s" : ""})`,
      submittedAt: new Date().toISOString(),
      source: "leanhippo.io booking",
    };

    // Logbook: independent fire-and-forget copy so the booking is recorded
    // even if n8n is unavailable. Never blocks or breaks the main submit.
    if (BOOKING_LOG_URL) {
      fetch(BOOKING_LOG_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      }).catch(() => {});
    }

    // Safety net: if n8n can't be reached, open a pre-filled email so the
    // booking is never lost, and show a clear message + a manual link.
    const failFallback = () => {
      const body = [
        `Name: ${payload.name}`,
        `Business: ${payload.business}`,
        `Email: ${payload.email}`,
        `Phone: ${payload.phone} (${payload.country})`,
        `Sessions: ${payload.sessionsText}`,
        `Preferred date: ${payload.date}`,
        `Availability: ${payload.availability}`,
        ``,
        `Focus notes:`,
        payload.notesText,
      ].join("\n");
      const href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(payload.subject)}&body=${encodeURIComponent(body)}`;
      setMailtoHref(href);
      setError(
        "We couldn't reach our booking system just now — we've opened an email with your details. Please press send and we'll get straight back to you.",
      );
      try {
        window.location.href = href;
      } catch {
        /* ignore */
      }
    };

    try {
      const res = await fetch(BOOKING_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}) as { success?: boolean; message?: string });
      if (res.ok && data.success) {
        setStep(3);
      } else {
        failFallback();
      }
    } catch {
      failFallback();
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
              <h3 className="book-h">Choose your Discovery Sessions</h3>
              <p className="book-sub" style={{ marginTop: -4, marginBottom: 16 }}>
                Select one or more — pick every area you want us to look at.
              </p>
              <div className="book-svcs">
                {BOOK_SERVICES.map((s) => {
                  const sel = services.includes(s.key);
                  return (
                    <button
                      key={s.key}
                      className={"book-svc" + (sel ? " sel" : "")}
                      onClick={() => toggleService(s.key)}
                      aria-pressed={sel}
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
                      <span className={"bs-check" + (sel ? " on" : "")}>
                        {sel ? <Icon name="check" size={15} color="#fff" /> : null}
                      </span>
                    </button>
                  );
                })}
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
                    className={touched && !nameValid ? "invalid" : ""}
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                    placeholder="Naledi Mokoena"
                    required
                  />
                  {touched && !nameValid && <span className="bf-err">Please enter your full name.</span>}
                </label>
                <label className="bf">
                  <span>Business <span className="req">*</span></span>
                  <input
                    className={touched && !businessValid ? "invalid" : ""}
                    value={form.business}
                    onChange={(e) => set("business", e.target.value)}
                    placeholder="Riverside Trading Co"
                    required
                  />
                  {touched && !businessValid && <span className="bf-err">Please enter your business name.</span>}
                </label>
                <label className="bf">
                  <span>Type of business <span className="req">*</span></span>
                  <input
                    className={touched && !businessTypeValid ? "invalid" : ""}
                    value={form.businessType}
                    onChange={(e) => set("businessType", e.target.value)}
                    placeholder="e.g. Retail, Restaurant, Agency, Manufacturing"
                    required
                  />
                  {touched && !businessTypeValid && (
                    <span className="bf-err">Please tell us your type of business.</span>
                  )}
                </label>
                <label className="bf">
                  <span>Company website <em>(optional)</em></span>
                  <input
                    type="url"
                    value={form.website}
                    onChange={(e) => set("website", e.target.value)}
                    placeholder="https://yourbusiness.com"
                  />
                </label>
                <label className="bf">
                  <span>Work email <span className="req">*</span></span>
                  <input
                    type="email"
                    className={touched && !emailValid ? "invalid" : ""}
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    placeholder="you@business.com"
                    required
                  />
                  {touched && !emailValid && <span className="bf-err">{emailMsg}</span>}
                </label>
                <label className="bf">
                  <span>Phone <span className="req">*</span></span>
                  <div className={"book-phone" + (touched && !phoneValid ? " invalid" : "")}>
                    <select
                      className="book-cc"
                      value={iso}
                      onChange={(e) => {
                        const c = COUNTRIES.find((x) => x.iso === e.target.value) || COUNTRIES[0];
                        setIso(e.target.value);
                        set("phone", cleanPhone(form.phone, c.max));
                      }}
                      aria-label="Country code"
                    >
                      {COUNTRIES.map((c) => (
                        <option key={c.iso} value={c.iso}>
                          {c.name} ({c.dial})
                        </option>
                      ))}
                    </select>
                    <input
                      className="book-phone-num"
                      inputMode="numeric"
                      value={form.phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={"X".repeat(country.max)}
                      required
                    />
                  </div>
                  {touched && !phoneValid && (
                    <span className="bf-err">Enter a valid {country.name} number ({phoneExpected}).</span>
                  )}
                </label>
                <div className="bf full book-notes">
                  <span>
                    What should we focus on in each session? <span className="req">*</span>
                  </span>
                  <span className="bf-note-hint">
                    Add a short note for each session you selected — it tells us exactly where to dig in.
                  </span>
                  <div className="book-notes-list">
                    {selectedServices.map((s) => (
                      <label key={s.key} className="bf book-note">
                        <span>{s.title}</span>
                        <textarea
                          className={touched && !noteValid(s.key) ? "invalid" : ""}
                          value={sessionNotes[s.key] || ""}
                          onChange={(e) => setNote(s.key, e.target.value)}
                          rows={2}
                          placeholder="What's happening here, and what you want out of this session…"
                        />
                        {touched && !noteValid(s.key) && (
                          <span className="bf-err">Please add a note for this session.</span>
                        )}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              {touched && !detailsValid && (
                <div className="book-err">Please correct the fields marked in red before confirming.</div>
              )}
              {error && (
                <div className="book-err">
                  {error}
                  {mailtoHref && (
                    <div style={{ marginTop: 10 }}>
                      <a className="btn btn-primary" href={mailtoHref}>
                        Send your booking by email
                      </a>
                    </div>
                  )}
                </div>
              )}
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
                Thank you for requesting a Lean Hippo Discovery Session. A confirmation has been sent to your email, and
                our team will review your request and get in touch shortly to confirm the next step.
              </p>
              <div className="book-summary">
                <div className="bsum-row" style={{ alignItems: "flex-start" }}>
                  <span>{selectedServices.length > 1 ? "Sessions" : "Session"}</span>
                  <b style={{ textAlign: "right" }}>
                    {selectedServices.map((s) => (
                      <span key={s.key} style={{ display: "block" }}>{s.title}</span>
                    ))}
                  </b>
                </div>
                <div className="bsum-row"><span>Preferred date</span><b>{dateStr}</b></div>
                <div className="bsum-row"><span>Availability</span><b>{win ? `${win.label} · ${win.range}` : "—"}</b></div>
                <div className="bsum-row"><span>Contact</span><b>{country.dial} {pd}</b></div>
                <div className="bsum-row"><span>For</span><b>{form.business || form.name || "—"}</b></div>
              </div>
            </div>
          )}
        </div>

        <div className="book-foot">
          {step < 3 ? (
            <>
              <div className="book-foot-info">
                {servicesLabel}
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
                  {step === 2 ? (submitting ? "Sending…" : "Confirm booking") : "Continue"}{" "}
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
