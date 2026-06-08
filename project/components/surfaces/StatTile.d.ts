import React from "react";

/**
 * KPI / metric tile for the visibility layer — label, big numeral, optional
 * unit, delta with trend direction, and an optional cobalt sparkline.
 */
export interface StatTileProps {
  label: React.ReactNode;
  value: React.ReactNode;
  unit?: React.ReactNode;
  /** e.g. "+12%" / "-3". */
  delta?: React.ReactNode;
  /** @default "flat" */
  trend?: "up" | "down" | "flat";
  /** @default "default" */
  tone?: "default" | "cobalt";
  /** Array of numbers 0..1 for the sparkline. */
  sparkline?: number[];
  style?: React.CSSProperties;
}

export function StatTile(props: StatTileProps): JSX.Element;
