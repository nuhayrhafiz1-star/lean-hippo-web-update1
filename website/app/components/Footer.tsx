"use client";

import { useChrome, type SiteRoute } from "./chrome-context";

export function Footer({ route = "home" }: { route?: SiteRoute }) {
  const { go, openBooking } = useChrome();
  const acct = route === "accounting";
  return (
    <footer className={"footer" + (acct ? " footer-acc" : "")}>
      <div className="wrap">
        <div className="cols">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={acct ? "/logos/leanhippo-charcoal.png" : "/logos/leanhippo-white.png"}
              alt="Lean Hippo Systems & Tech"
              width={256}
              height={64}
              style={{ height: 64, width: "auto", marginBottom: 30 }}
            />
            <p className="small" style={{ maxWidth: "34ch" }}>
              We build the systems businesses run on. Connected control across people, money, customers, and decisions.
            </p>
          </div>
          <div>
            <div className="ftitle">Wings</div>
            <span className="flink" onClick={() => go("systems")}>Business Systems</span>
            <span className="flink" onClick={() => go("growth")}>Marketing</span>
            <span className="flink" onClick={() => go("accounting")}>Accounting Services</span>
          </div>
          <div>
            <div className="ftitle">Business Systems</div>
            <span className="flink" onClick={() => go("systems", "organs")}>The six organs</span>
            <span className="flink" onClick={() => go("systems", "architecture")}>Architecture</span>
            <span className="flink" onClick={() => openBooking("bottleneck")}>Bottleneck Report</span>
            <span className="flink" onClick={() => go("systems", "mindplus")}>MIND+</span>
          </div>
          <div>
            <div className="ftitle">Company</div>
            <span className="flink" onClick={() => go("systems", "organs")}>About</span>
            <a className="flink" href="mailto:contact@leanhippo.io">Contact</a>
            <span className="flink" onClick={() => openBooking("bottleneck")}>Book a session</span>
          </div>
        </div>
        <div className="legal">
          <span className="fn" style={{ fontSize: 11 }}>© 2026 Lean Hippo Systems &amp; Tech</span>
          <span className="fn" style={{ fontSize: 11 }}>Not an AI wrapper · Operational infrastructure</span>
        </div>
      </div>
    </footer>
  );
}
