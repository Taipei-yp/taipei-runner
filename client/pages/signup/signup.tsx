import React, { FC, memo } from "react";
import block from "bem-cn";
import { Panel } from "../../components/panel";
import { FormViewField, FormView } from "../../components/form-view";

import "./signup.css";

const OnSubmit = (values: Record<string, unknown>) => {
  console.log(values);
};

const b = block("sign-up");

const SignUpFields: FormViewField[] = [
  {
    labelText: "First name",
    pattern: /^.{3,}$/,
    errorMessage: "The length of this field must be > 3 characters",
    type: "text",
    name: "first_name",
  },
  {
    labelText: "Second name",
    pattern: /^.{3,}$/,
    errorMessage: "The length of this field must be > 3 characters",
    type: "text",
    name: "second_name",
  },
  {
    labelText: "Login",
    pattern: /^.{3,}$/,
    errorMessage: "The length of this field must be > 3 characters",
    type: "text",
    name: "login",
  },
  {
    labelText: "Email",
    // eslint-disable-next-line no-useless-escape,max-len
    pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    errorMessage: "Wrong format",
    type: "email",
    name: "email",
  },
  {
    labelText: "Password",
    pattern: /^.{6,}$/,
    errorMessage: "The length of this field must be > 6 characters",
    type: "password",
    name: "password",
  },
  {
    labelText: "Phone",
    pattern: /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
    errorMessage: "Wrong format. Example: 1234567899",
    type: "text",
    name: "phone",
  },
];

type Props = {
  className?: string;
};

const SignUp: FC<Props> = ({ className = "" }) => {
  return (
    <div className={b.mix(className)}>
      <Panel>
        {/* TODO здесь появится Heading компонент, который сделаем позже */}
        <h1>Sign up</h1>
        <FormView onSubmit={OnSubmit} fields={SignUpFields} />
        {/* TODO здесь появится LinkView компонент, который сделаем позже */}
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a>Already have an account</a>
      </Panel>
    </div>
  );
};

const WrappedSignUp = memo(SignUp);
export { WrappedSignUp as SignUp };
