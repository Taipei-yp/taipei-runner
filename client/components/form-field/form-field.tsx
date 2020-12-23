import React, { FC, memo, ReactNode } from "react";
import block from "bem-cn";

import "./form-field.css";

const b = block("form-field");

type Props = {
  labelText: string;
  error: undefined | string;
  children: ReactNode;
  className?: string;
};

const FormField: FC<Props> = ({
  labelText,
  error,
  children,
  className = "",
}) => {
  return (
    <div className={b.mix(className)}>
      <label className={b("label")}>{labelText}</label>
      <div className={b("control")}>{children}</div>
      {error && <span className={b("error")}>{error}</span>}
    </div>
  );
};

const FormFieldWrapper = memo(FormField);
export { FormFieldWrapper as FormField };
