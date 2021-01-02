import React, { FC, memo, useCallback, useMemo } from "react";
import block from "bem-cn";
import { useHistory } from "react-router-dom";
import { Panel } from "../../components/panel";
import { FormViewField, FormView } from "../../components/form-view";
import { Heading } from "../../components/heading";
import { useAuthService } from "../../services/auth";
import { SignUpUser } from "../../models/user";
import { Text } from "../../components/text";
import { Button } from "../../components/button";
import { LinkView } from "../../components/link-view";

import "./signup.css";
import { Page } from "../../components/page";

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
  onAuth: (isAuthorized: boolean) => void;
};

const SignUp: FC<Props> = ({ className = "", onAuth }) => {
  const { auth, signUp, reset } = useAuthService();
  const history = useHistory();

  const formSubmit = useCallback(
    (formValue: SignUpUser) => {
      signUp(formValue, () => {
        onAuth(true);
        history.push("/menu");
      });
    },
    [onAuth, history, signUp],
  );

  const tryAgain = useCallback(() => {
    reset();
  }, [reset]);

  const content = useMemo(() => {
    switch (auth.stage) {
      case "signing-up":
        return <p>Loading...</p>;
      case "error":
        return (
          <div>
            <Heading text="Error" color="primary" />
            <p>
              <Text text={auth.error} />
            </p>
            <Button onClick={tryAgain} viewType="secondary">
              Try again
            </Button>
          </div>
        );
      default:
        return (
          <Panel>
            <Heading color="accent" text="Sign Up" className={b("heading")} />
            <FormView onSubmit={formSubmit} fields={SignUpFields} />
            <LinkView
              to="/signin"
              label="Already have an account"
              className={b("link")}
            />
          </Panel>
        );
    }
  }, [auth, formSubmit, tryAgain]);

  return (
    <Page fixHeader fullHeight align="center">
      <div className={b.mix(className)}>{content}</div>
    </Page>
  );
};

const WrappedSignUp = memo(SignUp);
export { WrappedSignUp as SignUp };
