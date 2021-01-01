import React from "react";
import { Field, Form } from "react-final-form";
import block from "bem-cn";
import { Button } from "../button";
import { FormField } from "../form-field";
import { Input } from "../input";

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
};

type Props<T> = {
  onSubmit: (formValue: T) => void;
  fields: FormViewField[];
  className?: string;
};

const FormView = <T extends Record<string, unknown>>({
  onSubmit,
  fields,
  className = "",
}: Props<T>) => {
  return (
    <div className={b.mix(className)}>
      <Form onSubmit={onSubmit}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            {fields.map(field => {
              return (
                <Field
                  key={field.name}
                  name={field.name}
                  validate={ValidatePattern(field.pattern, field.errorMessage)}
                >
                  {({ input, meta }) => (
                    <FormField
                      error={meta.error}
                      labelText={field.labelText}
                      className={b("form-field")}
                    >
                      <Input
                        name={input.name}
                        onChange={input.onChange}
                        value={input.value}
                        type={field.type}
                      />
                    </FormField>
                  )}
                </Field>
              );
            })}
            <Button type="submit">Submit</Button>
          </form>
        )}
      </Form>
    </div>
  );
};

const WrapperFormView = FormView;
export { WrapperFormView as FormView };
