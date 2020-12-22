import React, { FC, HTMLAttributes } from "react";
import block from "bem-cn";

import "./button.css";

const b = block("button");

export type Props = {
  viewType?: "primary" | "secondary";
  className?: string;
  type?: "submit" | "button" | "reset";
} & HTMLAttributes<HTMLButtonElement>;

export const Button: FC<Props> = ({
  children,
  viewType = "primary",
  className = "",
  type = "button",
  ...props
}) => {
  const bemClassName = b.mix(b({ "view-type": viewType }), className);

  return (
    <button type={type} className={bemClassName} {...props}>
      {children}
    </button>
  );
};
