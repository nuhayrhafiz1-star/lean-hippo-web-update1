"use client";

import { useEffect, useState } from "react";
import { Icon } from "./Icon";
import type { ChromeApi, SiteRoute } from "./chrome-context";

export function Nav({
  route,
  mobile,
  openBooking,
  openMind,
  go,
}: {
  route: SiteRoute;
  mobile: boolean;
} & ChromeApi) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [route]);

  useEffect(() => {
    setMenuOpen(false);
  }, [route, mobile]);

  const nav = (fn: () => void) => {
    setMenuOpen(false);
    fn();
  };

  return (
    <header className={"nav" + (scrolled || menuOpen ? " scrolled" : "")}>
      <div className="brand" onClick={() => nav(() => go("home"))}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logos/leanhippo-white.png" alt="Lean Hippo Systems & Tech" width={232} height={58} />
      </div>

      {!mobile && (
        <>
          <nav className="links" aria-label="Primary">
            <span className={"link" + (route === "home" ? " on" : "")} onClick={() => go("home")}>Home</span>
            <span className={"link" + (route === "systems" ? " on" : "")} onClick={() => go("systems")}>Business Systems</span>
            <span className={"link" + (route === "growth" ? " on" : "")} onClick={() => go("growth")}>Marketing</span>
            <span className={"link" + (route === "accounting" ? " on" : "")} onClick={() => go("accounting")}>Accounting</span>
            <span className="link" onClick={openMind}>MIND+</span>
          </nav>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <button className="btn btn-primary" onClick={() => openBooking("bottleneck")}>
              Book a Discovery Session <Icon name="arrow" size={16} color="#fff" />
            </button>
          </div>
        </>
      )}

      {mobile && (
        <button
          className={"nav-burger" + (menuOpen ? " open" : "")}
          aria-label="Menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      )}

      {mobile && (
        <>
          <div className={"nav-scrim" + (menuOpen ? " open" : "")} onClick={() => setMenuOpen(false)} />
          <nav className={"nav-menu" + (menuOpen ? " open" : "")} aria-label="Mobile">
            <span className={"nav-mlink" + (route === "home" ? " on" : "")} onClick={() => nav(() => go("home"))}>Home</span>
            <span className={"nav-mlink" + (route === "systems" ? " on" : "")} onClick={() => nav(() => go("systems"))}>Business Systems</span>
            <span className={"nav-mlink" + (route === "growth" ? " on" : "")} onClick={() => nav(() => go("growth"))}>Marketing</span>
            <span className={"nav-mlink" + (route === "accounting" ? " on" : "")} onClick={() => nav(() => go("accounting"))}>Accounting</span>
            <span className="nav-mlink" onClick={() => nav(openMind)}>MIND+</span>
            <button
              className="btn btn-primary btn-lg"
              style={{ width: "100%", marginTop: 14 }}
              onClick={() => nav(() => openBooking("bottleneck"))}
            >
              Book a Discovery Session <Icon name="arrow" size={16} color="#fff" />
            </button>
          </nav>
        </>
      )}
    </header>
  );
}
