import block from "bem-cn";
import React, { FC, memo, ReactNode } from "react";

import "./panel.css";

const b = block("panel");

export type Props = {
  children: ReactNode;
  className?: string;
};

const Panel: FC<Props> = ({ children, className = "" }) => {
  return <div className={b.mix(className)}>{children}</div>;
};

const WrappedPanel = memo(Panel);
export { WrappedPanel as Panel };
