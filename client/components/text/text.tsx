import React, { FC, memo } from "react";
import block from "bem-cn";

import "./text.css";

const b = block("text");

export type Props = {
  children: React.ReactNode;
  textColor?: "primary" | "light";
  textSize?: "small" | "large";
  className?: string;
};

const Text: FC<Props> = ({
  children,
  textColor = null,
  textSize = null,
  className = "",
}) => {
  return (
    <span
      className={b.mix(b({ color: textColor }, { size: textSize }), className)}
    >
      {children}
    </span>
  );
};

const WrappedText = memo(Text);
export { WrappedText as Text };
