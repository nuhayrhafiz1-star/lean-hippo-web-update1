"use client";

import { createContext, useContext } from "react";

export type BookingService =
  | "bottleneck"
  | "systems"
  | "growth"
  | "financial"
  | "ai"
  | "mind";

export type SiteRoute = "home" | "systems" | "growth" | "accounting";

export type ChromeApi = {
  openBooking: (service?: BookingService) => void;
  openMind: () => void;
  /** Navigate to a site route with an optional anchor id. */
  go: (route: SiteRoute, anchor?: string) => void;
};

export const ChromeContext = createContext<ChromeApi | null>(null);

export function useChrome(): ChromeApi {
  const ctx = useContext(ChromeContext);
  if (!ctx) {
    // Safe no-op fallback so a stray usage never crashes a static render.
    return { openBooking: () => {}, openMind: () => {}, go: () => {} };
  }
  return ctx;
}
