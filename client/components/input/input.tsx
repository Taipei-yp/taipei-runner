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
};

const Input: FC<Props> = ({
  onChange,
  value = "",
  className = "",
  name = "",
  type = "text",
}) => {
  return (
    <input
      className={b.mix(className)}
      onChange={onChange}
      value={value}
      name={name}
      type={type}
    />
  );
};

const WrappedInput = memo(Input);
export { WrappedInput as Input };