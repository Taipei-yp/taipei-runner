import React, { FC, memo } from "react";
import block from "bem-cn";

import "./text.css";

const b = block("text");

export type Props = {
  color?: "primary" | "light" | "accent";
  size?: "s" | "l" | "xl" | "xxl";
  text?: string;
  className?: string;
};

const Text: FC<Props> = ({
  color = null,
  size = null,
  className = "",
  text = "",
}) => {
  return <span className={b({ color, size }).mix(className)}>{text}</span>;
};

const WrappedText = memo(Text);
export { WrappedText as Text };
