import React, { FC, memo, useCallback, useMemo } from "react";
import block from "bem-cn";
import { useHistory } from "react-router-dom";
import { Panel } from "../../components/panel";
import { FormViewField, FormView } from "../../components/form-view";
import { Heading } from "../../components/heading";
import { LinkView } from "../../components/link-view";
import { useAuthService } from "../../services/auth";
import { Text } from "../../components/text";
import { Button } from "../../components/button";
import { SignInUser } from "../../models/user";

import "./signin.css";

const b = block("sign-in");

const SignInFields: FormViewField[] = [
  {
    labelText: "Login",
    pattern: /^.{3,}$/,
    errorMessage: "The length of this field must be > 3 characters",
    type: "text",
    name: "login",
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
  onAuth: (isAuthorized: boolean) => void;
};

const SignIn: FC<Props> = ({ className = "", onAuth }) => {
  const { auth, signIn, reset } = useAuthService();
  const history = useHistory();

  const formSubmit = useCallback(
    (formValue: SignInUser) => {
      signIn(
        formValue,
        () => {
          onAuth(true);
          history.push("/game");
        },
        () => {},
      );
    },
    [history, signIn, onAuth],
  );

  const tryAgain = useCallback(() => {
    reset();
  }, [reset]);

  const content = useMemo(() => {
    switch (auth.stage) {
      case "signing-in":
        return <p>Loading...</p>;
      case "error":
        return (
          <div>
            <Heading text="Error" size="small" color="primary" />
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
            <Heading
              size="medium"
              color="accent"
              text="Sign in"
              className={b("heading")}
            />
            <FormView onSubmit={formSubmit} fields={SignInFields} />
            <LinkView
              to="/signup"
              label="No account yet?"
              size="normal"
              className={b("link")}
            />
          </Panel>
        );
    }
  }, [auth, formSubmit, tryAgain]);

  return <div className={b.mix(className)}>{content}</div>;
};

const WrappedSignIn = memo(SignIn);
export { WrappedSignIn as SignIn };
