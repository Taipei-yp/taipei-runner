import React, { FC, ChangeEvent, memo } from "react";
import block from "bem-cn";

import "./textarea.css";

const b = block("textarea");

type Props = {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
  className?: string;
  name?: string;
  fullWidth?: boolean;
};

const Textarea: FC<Props> = ({
  onChange,
  value = "",
  className = "",
  name = "",
  fullWidth,
}) => {
  return (
    <textarea
      className={b({ "full-width": fullWidth }).mix(className)}
      onChange={onChange}
      value={value}
      name={name}
    />
  );
};

const WrappedTextarea = memo(Textarea);
export { WrappedTextarea as Textarea };
