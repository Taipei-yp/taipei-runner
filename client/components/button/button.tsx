import React, { FC, memo } from "react";
import block from "bem-cn";

import "./button.css";

const b = block("button");

export type Props = {
  onClick: (e: React.MouseEvent) => void;
  children: React.ReactNode;
  viewType?: "primary" | "secondary";
  className?: string;
  type?: "submit" | "button" | "reset";
};

const Button: FC<Props> = ({
  onClick,
  children,
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
