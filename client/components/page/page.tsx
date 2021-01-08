import React, { FC, memo, ReactNode } from "react";
import block from "bem-cn";

import "./page.css";
import { Header } from "../header";
import { Background } from "../background";

const b = block("page");

export type Props = {
  children?: ReactNode;
  className?: string;
  fixHeader?: boolean;
  align?: "center" | "bottom";
  fullWidth?: boolean;
  fullHeight?: boolean;
  left?: ReactNode;
  right?: ReactNode;
  animateBack?: boolean;
  shadeBack?: boolean;
};

const Page: FC<Props> = ({
  children,
  left,
  right,
  className = "",
  fixHeader = false,
  align = "center",
  fullWidth = false,
  fullHeight = false,
  animateBack = true,
  shadeBack = false,
}) => {
  return (
    <div className={b.mix(className)}>
      <Background animate={animateBack} shade={shadeBack} />
      <div className={b("header", { fix: fixHeader })}>
        <Header left={left} right={right} />
      </div>
      <div className={b("content", { align, grow: fullHeight })}>
        <div className={b("item", { grow: fullWidth })}>{children}</div>
      </div>
    </div>
  );
};

const WrappedPage = memo(Page);
export { WrappedPage as Page };
