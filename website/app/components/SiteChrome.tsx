"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ChromeContext, type BookingService, type SiteRoute } from "./chrome-context";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { MindFab, MindPanel } from "./MindPlus";
import { BookingModal } from "./BookingModal";

const NAV_OFFSET = 90;

function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1080px)");
    const on = () => setMobile(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  useEffect(() => {
    document.body.classList.toggle("mobile", mobile);
  }, [mobile]);
  return mobile;
}

function scrollToAnchor(anchor: string, mobile: boolean) {
  const el = document.getElementById(anchor);
  if (!el) return false;
  const top = el.getBoundingClientRect().top + window.scrollY - (mobile ? 76 : NAV_OFFSET);
  window.scrollTo({ top, behavior: "smooth" });
  return true;
}

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const mobile = useIsMobile();
  const [mindOpen, setMindOpen] = useState(false);
  const [booking, setBooking] = useState<{ open: boolean; service: BookingService }>({
    open: false,
    service: "bottleneck",
  });

  const route: SiteRoute = pathname?.startsWith("/business-systems")
    ? "systems"
    : pathname?.startsWith("/accounting")
      ? "accounting"
      : pathname?.startsWith("/growth")
        ? "growth"
        : "home";

  const openBooking = useCallback((service?: BookingService) => {
    setBooking({ open: true, service: service || "bottleneck" });
  }, []);
  const closeBooking = useCallback(() => setBooking((b) => ({ ...b, open: false })), []);
  const openMind = useCallback(() => setMindOpen(true), []);

  const go = useCallback(
    (r: SiteRoute, anchor?: string) => {
      const path =
        r === "systems"
          ? "/business-systems"
          : r === "accounting"
            ? "/accounting"
            : r === "growth"
              ? "/growth"
              : "/";
      const samePage = pathname === path || (path === "/" && pathname === "/");
      if (samePage) {
        if (anchor) {
          if (!scrollToAnchor(anchor, mobile)) {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      } else {
        router.push(anchor ? `${path}#${anchor}` : path);
      }
    },
    [pathname, router, mobile],
  );

  // After a route change, honour any #hash by scrolling to it (Next does not
  // always do this for client-side nav on a freshly mounted page).
  useEffect(() => {
    const hash = typeof window !== "undefined" ? window.location.hash.slice(1) : "";
    if (hash) {
      // Wait a frame for the new page to render.
      const id = window.setTimeout(() => scrollToAnchor(hash, mobile), 60);
      return () => window.clearTimeout(id);
    }
  }, [pathname, mobile]);

  // Page-scoped theme hooks: the Accounting page re-skins the nav (route-accounting)
  // and the Growth page does the same (route-marketing), per the page stylesheets.
  useEffect(() => {
    const b = document.body.classList;
    b.toggle("route-accounting", route === "accounting");
    b.toggle("route-marketing", route === "growth");
    return () => {
      b.remove("route-accounting");
      b.remove("route-marketing");
    };
  }, [route]);

  // Close overlays on Escape.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMindOpen(false);
        closeBooking();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeBooking]);

  return (
    <ChromeContext.Provider value={{ openBooking, openMind, go }}>
      <Nav route={route} mobile={mobile} openBooking={openBooking} openMind={openMind} go={go} />
      {children}
      <Footer route={route} />
      <MindFab onClick={openMind} />
      <MindPanel open={mindOpen} onClose={() => setMindOpen(false)} openBooking={openBooking} />
      <BookingModal open={booking.open} onClose={closeBooking} initialService={booking.service} />
    </ChromeContext.Provider>
  );
}
