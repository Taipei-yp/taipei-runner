import block from "bem-cn";
import React, { FC, memo } from "react";

import "./heading.css";

const b = block("heading");

export type Props = {
  text: string;
  color?: "primary" | "accent";
  size?: "s" | "l";
  className?: string;
};

const Heading: FC<Props> = ({
  text = "",
  color = "accent",
  size = null,
  className = "",
}) => {
  return <h1 className={b({ color, size }).mix(className)}>{text}</h1>;
};

const WrappedHeading = memo(Heading);
export { WrappedHeading as Heading };
