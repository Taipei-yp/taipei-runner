import React, { FC, memo } from "react";
import block from "bem-cn";
import { Link } from "react-router-dom";
import { Panel } from "../../components/panel";
import { FormViewField, FormView } from "../../components/form-view";
import { Heading } from "../../components/heading";

import "./signin.css";

const OnSubmit = (values: Record<string, unknown>) => {
  console.log(values);
};

const b = block("sign-in");

const SignInFields: FormViewField[] = [
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
];

type Props = {
  className?: string;
};

const SignIn: FC<Props> = ({ className = "" }) => {
  return (
    <div className={b.mix(className)}>
      <Panel>
        <Heading
          size="medium"
          color="accent"
          text="Sign In"
          className={b("heading")}
        />
        <FormView onSubmit={OnSubmit} fields={SignInFields} />
        {/* TODO здесь появится LinkView компонент, который сделаем позже */}
        <Link to="/signup" className={b("link")}>
          No account yet?
        </Link>
      </Panel>
    </div>
  );
};

const WrappedSignIn = memo(SignIn);
export { WrappedSignIn as SignIn };
