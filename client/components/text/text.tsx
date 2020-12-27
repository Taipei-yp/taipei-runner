import block from "bem-cn";
import React, { FC, memo } from "react";

import "./text.css";

const b = block("text");

export type Props = {
  color?: "primary" | "light" | "accent";
  size?: "s" | "l" | "xl" | "xxl";
  text?: string;
  className?: string;
  header?: boolean;
};

const Text: FC<Props> = ({
  color = null,
  size = null,
  className = "",
  text = "",
  header = false,
}) => {
  return header ? (
    <h1 className={b({ color, size }).mix(className)}>{text}</h1>
  ) : (
    <span className={b({ color, size }).mix(className)}>{text}</span>
  );
};

const WrappedText = memo(Text);
export { WrappedText as Text };
