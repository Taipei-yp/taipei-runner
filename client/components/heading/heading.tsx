import React, { FC, memo } from "react";
import block from "bem-cn";

import "./heading.css";

const b = block("heading");

export type Props = {
  text: string;
  color?: "primary" | "accent";
  size?: "small" | "medium" | "large";
  className?: string;
};

const Heading: FC<Props> = ({
  text = "",
  color = "accent",
  size = "medium",
  className = "",
}) => {
  return <div className={b({ color, size }).mix(className)}>{text}</div>;
};

const WrappedHeading = memo(Heading);
export { WrappedHeading as Heading };
