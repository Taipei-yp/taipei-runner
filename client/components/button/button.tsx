import block from "bem-cn";
import React, { FC, memo, MouseEvent, ReactNode } from "react";

import "./button.css";

const b = block("button");

export type Props = {
  children: ReactNode;
  onClick?: (e: MouseEvent) => void;
  viewType?: "primary" | "secondary";
  className?: string;
  type?: "submit" | "button" | "reset";
  size?: "s";
};

const Button: FC<Props> = ({
  children,
  onClick,
  viewType = "primary",
  className = "",
  type = "button",
  size = null,
}) => {
  return (
    <button
      type={type}
      className={b.mix(b({ "view-type": viewType, size }), className)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const WrappedButton = memo(Button);
export { WrappedButton as Button };
