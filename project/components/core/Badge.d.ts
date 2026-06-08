import React from "react";

/**
 * Status / category badge. Monospaced, tracked, uppercase — reads as a
 * system label. Tones map to the LeanHippo status palette.
 */
export interface BadgeProps {
  children: React.ReactNode;
  /** @default "neutral" */
  tone?: "neutral" | "cobalt" | "ok" | "pending" | "alert";
  /** @default "soft" */
  variant?: "soft" | "outline" | "dot";
  /** @default "md" */
  size?: "sm" | "md";
  style?: React.CSSProperties;
}

export function Badge(props: BadgeProps): JSX.Element;
