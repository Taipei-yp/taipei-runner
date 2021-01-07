import React, { FC, memo, ReactNode, MouseEvent } from "react";
import block from "bem-cn";

import "./button.css";

const b = block("button");

export type Props = {
  children: ReactNode;
  onClick?: (e: MouseEvent) => void;
  viewType?: "primary" | "secondary";
  className?: string;
  type?: "submit" | "button" | "reset";
  buttonText?: string;
};

const Button: FC<Props> = ({
  children,
  onClick,
  viewType = "primary",
  className = "",
  type = "button",
}) => {
  return (
    <button
      type={type}
      className={b.mix(b({ "view-type": viewType }), className)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const WrappedButton = memo(Button);
export { WrappedButton as Button };
