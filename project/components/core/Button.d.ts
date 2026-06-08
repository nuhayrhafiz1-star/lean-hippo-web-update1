import React from "react";

/**
 * LeanHippo primary action control. Cobalt primary carries a controlled
 * edge-light glow; secondary is graphite glass; ghost is quiet; danger is
 * reserved for destructive/leak actions.
 *
 * @startingPoint section="Core" subtitle="Buttons — primary, secondary, ghost, danger" viewport="700x220"
 */
export interface ButtonProps {
  children: React.ReactNode;
  /** Visual style. @default "primary" */
  variant?: "primary" | "secondary" | "ghost" | "danger";
  /** @default "md" */
  size?: "sm" | "md" | "lg";
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  disabled?: boolean;
  /** Stretch to container width. @default false */
  full?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  style?: React.CSSProperties;
}

export function Button(props: ButtonProps): JSX.Element;
