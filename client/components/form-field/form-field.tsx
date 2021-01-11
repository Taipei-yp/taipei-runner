import block from "bem-cn";
import React, { FC, memo, ReactNode } from "react";

import "./form-field.css";

const b = block("form-field");

type Props = {
  labelText: string;
  error: undefined | string;
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
};

const FormField: FC<Props> = ({
  labelText,
  error,
  children,
  className = "",
  fullWidth,
}) => {
  return (
    <div className={b({ "full-width": fullWidth }).mix(className)}>
      <label className={b("label")}>{labelText}</label>
      <div className={b("control")}>{children}</div>
      {error && <span className={b("error")}>{error}</span>}
    </div>
  );
};

const FormFieldWrapper = memo(FormField);
export { FormFieldWrapper as FormField };
