import React, { FC, memo } from "react";
import block from "bem-cn";

import "./text.css";

const b = block("text");

export type Props = {
  color?: "primary" | "light" | "accent";
  size?: "small" | "large" | "extra" | "extra2" | "extra3";
  text?: string;
  className?: string;
  isHeader?: boolean;
};

const Text: FC<Props> = ({
  color = null,
  size = null,
  className = "",
  text = "",
  isHeader = false,
}) => {
  return isHeader ? (
    <h1 className={b({ color, size }).mix(className)}>{text}</h1>
  ) : (
    <span className={b({ color, size }).mix(className)}>{text}</span>
  );
};

const WrappedText = memo(Text);
export { WrappedText as Text };
