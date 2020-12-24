import React, { FC, memo } from "react";
import block from "bem-cn";

import "./heading.css";

const b = block("heading");

export type Props = {
  children: React.ReactNode;
  viewType?: "primary" | "secondary";
  viewSize?: "small" | "medium" | "large";
  className?: string;
};

const Heading: FC<Props> = ({
  children,
  viewType = "primary",
  viewSize = "medium",
  className = "",
}) => {
  return (
    <div
      className={b.mix(b({ "view-type": viewType, size: viewSize }), className)}
    >
      {children}
    </div>
  );
};

const WrappedHeading = memo(Heading);
export { WrappedHeading as Heading };
