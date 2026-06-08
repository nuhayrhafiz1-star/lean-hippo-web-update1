import React from "react";

/**
 * Text input on the inset surface, with cobalt focus ring/edge. Supports a
 * leading icon, monospaced mode (for IDs / codes), hint and error states.
 *
 * @startingPoint section="Forms" subtitle="Text input with label, icon, states" viewport="700x260"
 */
export interface InputProps {
  label?: React.ReactNode;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  iconLeft?: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  disabled?: boolean;
  /** Monospaced field for codes / IDs. @default false */
  mono?: boolean;
  /** @default true */
  full?: boolean;
  style?: React.CSSProperties;
}

export function Input(props: InputProps): JSX.Element;
