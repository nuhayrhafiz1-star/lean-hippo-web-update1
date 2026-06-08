"use client";

import { Icon } from "./Icon";
import { Network } from "./Network";
import { useChrome } from "./chrome-context";

const WINGS = [
  {
    key: "systems",
    num: "Wing 01",
    icon: "systems",
    title: "Business Systems",
    desc: "Connected dashboards, workflows, databases, and AI intelligence. The control layer between your people, money, customers, and decisions.",
    status: "live",
  },
  {
    key: "marketing",
    num: "Wing 02",
    icon: "megaphone",
    title: "Marketing",
    desc: "Demand, brand, and growth systems that feed the same connected operating company. Built on the same control layer.",
    status: "soon",
  },
  {
    key: "accounting",
    num: "Wing 03",
    icon: "calc",
    title: "Accounting Services",
    desc: "Books, compliance, and financial visibility wired directly into your systems — so the numbers are never a surprise.",
    status: "soon",
  },
];

export function Landing() {
  const { go, openMind, openBooking } = useChrome();
  return (
    <main data-screen-label="Landing">
      {/* HERO */}
      <section
        data-label="Hero"
        className="section grid-bg"
        style={{ paddingTop: 200, paddingBottom: 120, position: "relative", overflow: "hidden" }}
      >
        <Network
          density={0.7}
          formed={0.8}
          seed={11}
          speed={0.7}
          core
          className="lh-network"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 1, zIndex: 0 }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            background:
              "radial-gradient(95% 75% at 50% 2%, rgba(5,5,5,.05), rgba(5,5,5,.45) 62%, rgba(5,5,5,.78) 100%), linear-gradient(180deg, transparent 58%, var(--lh-black))",
          }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logos/leanhippo-white.png"
          alt=""
          aria-hidden="true"
          className="hero-watermark"
          style={{
            position: "absolute",
            left: "50%",
            top: "54%",
            transform: "translate(-50%,-50%)",
            width: "min(680px, 78%)",
            opacity: 0.05,
            zIndex: 1,
            pointerEvents: "none",
          }}
        />
        <div className="wrap" style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
          <div className="eyebrow" style={{ justifyContent: "center" }}>Connected business systems</div>
          <h1 className="display h-xxl" style={{ margin: "26px auto 0", maxWidth: "16ch" }}>
            We build the systems <b>businesses run on.</b>
          </h1>
          <p className="lead" style={{ margin: "30px auto 0", maxWidth: "56ch" }}>
            Lean Hippo gives businesses control, visibility, and intelligence — so they stop running on memory and start
            running on systems.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", marginTop: 40 }}>
            <button className="btn btn-secondary btn-lg" onClick={() => go("home", "wings")}>
              Core Capabilities
            </button>
            <button className="btn btn-primary btn-lg" onClick={() => openBooking("bottleneck")}>
              Book a Discovery Session <Icon name="arrow" size={17} color="#fff" />
            </button>
          </div>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 30, flexWrap: "wrap" }}>
            <span className="pill">
              <span className="dot" style={{ background: "var(--accent)", boxShadow: "0 0 8px var(--accent)" }} />
              Operational infrastructure
            </span>
            <span className="pill">Not an AI wrapper</span>
            <span className="pill">Human approval, always</span>
          </div>
        </div>
      </section>

      {/* THREE WINGS */}
      <section data-label="Three Wings" className="section" id="wings" style={{ paddingTop: 40 }}>
        <div className="wrap">
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 20,
              marginBottom: 46,
            }}
          >
            <div>
              <div className="eyebrow"><span className="tick" />Three wings · one operating company</div>
              <h2 className="display h-lg" style={{ marginTop: 18, maxWidth: "18ch" }}>
                Choose where you want <b>control first.</b>
              </h2>
            </div>
            <p className="body" style={{ maxWidth: "38ch" }}>
              Each wing runs on the same connected control layer — so the systems you build never sit on islands.
            </p>
          </div>

          <div className="wings">
            {WINGS.map((w) => {
              const live = w.status === "live";
              return (
                <div
                  key={w.key}
                  className={"wing " + (live ? "available" : "soon")}
                  onClick={live ? () => go("systems") : () => openBooking("bottleneck")}
                >
                  <div className="edge" />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span className="wnum">{w.num}</span>
                    <span className={"pill " + (live ? "live" : "soon")}>
                      <span className="dot" />
                      {live ? "Available now" : "Coming soon"}
                    </span>
                  </div>
                  <div className="wicon">
                    <Icon name={w.icon} size={26} color="var(--lh-cobalt-100)" />
                  </div>
                  <div className="wtitle">{w.title}</div>
                  <div className="wdesc">{w.desc}</div>
                  <div className="wfoot">
                    {live ? (
                      <span className="btn btn-primary" style={{ pointerEvents: "none" }}>
                        Enter Business Systems <Icon name="arrowUR" size={16} color="#fff" />
                      </span>
                    ) : (
                      <span className="btn btn-secondary" style={{ pointerEvents: "none" }}>
                        Join the waitlist <Icon name="arrow" size={15} />
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* MIND+ strip */}
          <div
            className="glass lit"
            style={{
              marginTop: 26,
              padding: "28px 34px",
              borderRadius: "var(--radius-lg)",
              display: "flex",
              alignItems: "center",
              gap: 28,
              flexWrap: "wrap",
            }}
          >
            <div className="edge" />
            <div className="mind-orb" style={{ width: 64, height: 64, animation: "none", flex: "0 0 auto", cursor: "default" }}>
              <span className="glyph">
                <span className="m">M</span>
                <span className="p">+</span>
              </span>
            </div>
            <div style={{ flex: 1, minWidth: 240 }}>
              <div className="eyebrow">Comes with everything</div>
              <h3 className="display h-md" style={{ marginTop: 10, fontSize: 28 }}>
                MIND<span className="cobalt">+</span> — the intelligence layer on every product.
              </h3>
              <p className="body" style={{ marginTop: 10, maxWidth: "62ch" }}>
                An add-on to every service so your system grows with you and learns from your everyday decisions — or a
                standalone product on its own.
              </p>
            </div>
            <button className="btn btn-secondary btn-lg" style={{ flex: "0 0 auto" }} onClick={openMind}>
              What is MIND+ <Icon name="arrow" size={16} />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
