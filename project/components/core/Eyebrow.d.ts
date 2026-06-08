import React from "react";

/**
 * Section eyebrow / kicker — tracked uppercase micro-label, optionally
 * paired with an oversized section number and tick rule. The connective
 * tissue of LeanHippo page and panel headers.
 */
export interface EyebrowProps {
  children: React.ReactNode;
  /** Optional section number, e.g. "04". */
  number?: string | null;
  /** @default "cobalt" */
  tone?: "cobalt" | "muted" | "white";
  style?: React.CSSProperties;
}

export function Eyebrow(props: EyebrowProps): JSX.Element;
