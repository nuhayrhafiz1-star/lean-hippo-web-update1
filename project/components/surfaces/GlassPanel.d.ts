import React from "react";

/**
 * Dark-glass surface for dashboards, system cards, data layers and AI
 * interfaces. Carries the matte top edge-light; `lit` adds the controlled
 * cobalt glow used for active / focused panels.
 *
 * @startingPoint section="Surfaces" subtitle="Glass dashboard panel" viewport="700x340"
 */
export interface GlassPanelProps {
  children: React.ReactNode;
  title?: React.ReactNode;
  /** Tracked uppercase kicker above the title. */
  eyebrow?: React.ReactNode;
  /** Right-aligned header slot (buttons, badges). */
  actions?: React.ReactNode;
  /** Cobalt-lit edge + glow for the active panel. @default false */
  lit?: boolean;
  /** Graphite (true) vs charcoal (false) glass fill. @default false */
  strong?: boolean;
  padding?: string;
  style?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;
}

export function GlassPanel(props: GlassPanelProps): JSX.Element;
