import React, { FC, memo } from "react";
import block from "bem-cn";

import "./button.css";

const b = block("button");

export type Props = {
  children: React.ReactNode;
  viewType?: "primary" | "secondary";
  className?: string;
  type?: "submit" | "button" | "reset";
  onClick?: (e: React.MouseEvent) => void;
};

const Button: FC<Props> = ({
  children,
  viewType = "primary",
  className = "",
  type = "button",
  onClick,
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
