import block from "bem-cn";
import React, { FC, memo, useCallback, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "client/components/button";
import { FormView, FormViewField } from "client/components/form-view";
import { Heading } from "client/components/heading";
import { LinkView } from "client/components/link-view";
import { Page } from "client/components/page";
import { Panel } from "client/components/panel";
import { Text } from "client/components/text";
import { SignInUser } from "client/models/user";
import { AuthStages, useAuthService } from "client/services/auth";

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
      signIn(formValue, () => {
        onAuth(true);
        history.push("/");
      });
    },
    [history, signIn, onAuth],
  );

  const content = useMemo(() => {
    switch (auth.stage) {
      case AuthStages.SIGNING_IN:
        return <p>Loading...</p>;
      case AuthStages.ERROR:
        return (
          <div>
            <Heading text="Error" color="primary" />
            <p>
              <Text text={auth.error} />
            </p>
            <Button onClick={reset} viewType="secondary">
              Try again
            </Button>
          </div>
        );
      default:
        return (
          <Panel>
            <Heading color="accent" text="Sign in" className={b("heading")} />
            <FormView onSubmit={formSubmit} fields={SignInFields} />
            <LinkView
              to="/signup"
              label="No account yet?"
              className={b("link")}
            />
          </Panel>
        );
    }
  }, [auth, formSubmit, reset]);

  return (
    <Page fixHeader fullHeight align="center">
      <div className={b.mix(className)}>{content}</div>
    </Page>
  );
};

const WrappedSignIn = memo(SignIn);
export { WrappedSignIn as SignIn };
