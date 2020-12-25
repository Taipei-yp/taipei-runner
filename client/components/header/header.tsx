import React, { FC, memo, ReactNode } from "react";
import block from "bem-cn";

import "./header.css";

const b = block("header");

export type Props = {
  left?: ReactNode;
  right?: ReactNode;
  className?: string;
};

const Header: FC<Props> = ({ left, right, className = "" }) => {
  return (
    <div className={b.mix(className)}>
      <div className={b("left")}>{left}</div>
      <div className={b("right")}>{right}</div>
    </div>
  );
};

const WrappedHeader = memo(Header);
export { WrappedHeader as Header };
