import React, { FC, ChangeEvent, memo } from "react";
import block from "bem-cn";

import "./input.css";

const b = block("input");

type Props = {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  className?: string;
  name?: string;
  type?: "text" | "password" | "email";
  fullWidth?: boolean;
};

const Input: FC<Props> = ({
  onChange,
  value = "",
  className = "",
  name = "",
  type = "text",
  fullWidth,
}) => {
  return (
    <input
      className={b({ "full-width": fullWidth }).mix(className)}
      onChange={onChange}
      value={value}
      name={name}
      type={type}
    />
  );
};

const WrappedInput = memo(Input);
export { WrappedInput as Input };
