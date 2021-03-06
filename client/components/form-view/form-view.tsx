import block from "bem-cn";
import React from "react";
import { Field, Form } from "react-final-form";
import { Button } from "client/components/button";
import { FormField } from "client/components/form-field";
import { Input } from "client/components/input";
import { Textarea } from "client/components/textarea";

import "./form-view.css";

type PatternValidation = (
  pattern: RegExp,
  errorText: string,
) => (value: string) => string | undefined;

const ValidatePattern: PatternValidation = (pattern, errorText) => value =>
  pattern.test(value) ? undefined : errorText;

const b = block("form-view");

export type FormViewField = {
  labelText: string;
  pattern: RegExp;
  errorMessage: string;
  type: "text" | "password" | "email";
  name: string;
  elementType?: "input" | "textarea";
};

type Props<T> = {
  onSubmit: (formValue: T) => void;
  fields: FormViewField[];
  values?: Record<string, string | undefined>;
  className?: string;
  buttonText?: string;
  fullWidth?: boolean;
  align?: "left" | "center" | "right";
};

const FormView = <T extends Record<string, unknown>>({
  onSubmit,
  fields,
  values = {},
  className = "",
  buttonText = "Submit",
  fullWidth,
  align = "left",
}: Props<T>) => {
  return (
    <div className={b.mix(className)}>
      <Form onSubmit={onSubmit}>
        {({ handleSubmit }) => (
          <form className={b("form", { align })} onSubmit={handleSubmit}>
            {fields.map(field => {
              return (
                <Field
                  key={field.name}
                  name={field.name}
                  initialValue={values[field.name]}
                  validate={ValidatePattern(field.pattern, field.errorMessage)}
                >
                  {({ input, meta }) => (
                    <FormField
                      error={meta.error}
                      labelText={field.labelText}
                      className={b("form-field")}
                      fullWidth={fullWidth}
                    >
                      {field.elementType === "textarea" ? (
                        <Textarea
                          name={input.name}
                          onChange={input.onChange}
                          value={input.value}
                          fullWidth={fullWidth}
                        />
                      ) : (
                        <Input
                          name={input.name}
                          onChange={input.onChange}
                          value={input.value}
                          type={field.type}
                          fullWidth={fullWidth}
                        />
                      )}
                    </FormField>
                  )}
                </Field>
              );
            })}
            <Button type="submit">{buttonText}</Button>
          </form>
        )}
      </Form>
    </div>
  );
};

const WrapperFormView = FormView;
export { WrapperFormView as FormView };
