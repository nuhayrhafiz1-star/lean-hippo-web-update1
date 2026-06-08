"use client";

import { Icon } from "./Icon";
import type { BookingService } from "./chrome-context";

const MIND_FEATURES = [
  {
    ic: "eye",
    h: "Sees across every system",
    d: "MIND+ reads from your dashboards, workflows, records, SOPs, and reports — the whole connected business, not one tool.",
  },
  {
    ic: "refresh",
    h: "Grows as you grow",
    d: "Every approval, decision, and exception teaches it. The system gets sharper the longer it runs alongside you.",
  },
  {
    ic: "spark",
    h: "Answers in your context",
    d: "Ask what needs attention, where money is leaking, what changed. It answers from your operating memory — not the open internet.",
  },
  {
    ic: "shield",
    h: "You stay in authority",
    d: "MIND+ drafts, summarizes, and flags. Humans approve every sensitive action. Intelligence assists; it never overrides.",
  },
];

export function MindPanel({
  open,
  onClose,
  openBooking,
}: {
  open: boolean;
  onClose: () => void;
  openBooking: (service?: BookingService) => void;
}) {
  return (
    <>
      <div className={"mind-overlay" + (open ? " open" : "")} onClick={onClose} />
      <aside className={"mind-panel" + (open ? " open" : "")} aria-hidden={!open} aria-label="MIND+">
        <div className="mp-pad">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div className="eyebrow">Add-on · Standalone</div>
            <button className="btn btn-ghost" style={{ padding: 8 }} onClick={onClose} aria-label="Close">
              <Icon name="x" size={18} />
            </button>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16, margin: "22px 0 6px" }}>
            <div className="mind-orb" style={{ width: 64, height: 64, animation: "none", cursor: "default" }}>
              <span className="glyph">
                <span className="m">M</span>
                <span className="p">+</span>
              </span>
            </div>
            <h2 className="display h-md" style={{ fontSize: 38 }}>
              MIND<span className="cobalt">+</span>
            </h2>
          </div>
          <p className="body" style={{ marginTop: 14 }}>
            The intelligence layer that comes with{" "}
            <b style={{ color: "var(--text-primary)", fontWeight: 500 }}>every product we sell</b> — and can be bought on
            its own. MIND+ sits above your systems so the business keeps thinking, learning, and improving from its own
            everyday decisions.
          </p>
          <div style={{ margin: "26px 0 8px" }}>
            {MIND_FEATURES.map((f, i) => (
              <div className="mind-feat" key={i}>
                <div className="mf-ic">
                  <Icon name={f.ic} size={18} color="var(--lh-cobalt-100)" />
                </div>
                <div>
                  <div className="mf-h">{f.h}</div>
                  <div className="mf-d">{f.d}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, margin: "16px 0 10px" }}>
            <div className="glass" style={{ padding: "16px 18px", borderRadius: "var(--radius-md)" }}>
              <div className="fn" style={{ fontSize: 11 }}>As an add-on</div>
              <div className="body" style={{ fontSize: 14.5, marginTop: 8 }}>
                Layers onto any Lean Hippo product. Inherits its data automatically.
              </div>
            </div>
            <div className="glass lit" style={{ padding: "16px 18px", borderRadius: "var(--radius-md)" }}>
              <div className="edge" />
              <div className="fn" style={{ fontSize: 11, color: "var(--lh-cobalt-100)" }}>Standalone</div>
              <div className="body" style={{ fontSize: 14.5, marginTop: 8 }}>
                Connect your existing tools and run MIND+ on its own.
              </div>
            </div>
          </div>
          <button
            className="btn btn-primary btn-lg"
            style={{ width: "100%", marginTop: 14 }}
            onClick={() => {
              onClose();
              openBooking("mind");
            }}
          >
            Add MIND+ to a system <Icon name="arrow" size={17} color="#fff" />
          </button>
          <p className="small" style={{ textAlign: "center", marginTop: 14 }}>
            Included free to evaluate with the Bottleneck Report.
          </p>
        </div>
      </aside>
    </>
  );
}

export function MindFab({ onClick }: { onClick: () => void }) {
  return (
    <div className="mindfab">
      <button className="mind-orb pulse" onClick={onClick} aria-label="Open MIND+">
        <span className="glyph">
          <span className="m">M</span>
          <span className="p">+</span>
        </span>
      </button>
      <span className="mind-cap">MIND+</span>
    </div>
  );
}
