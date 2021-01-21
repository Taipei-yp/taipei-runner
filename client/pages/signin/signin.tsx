import block from "bem-cn";
import React, { FC, memo, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Button } from "client/components/button";
import { FormView, FormViewField } from "client/components/form-view";
import { Heading } from "client/components/heading";
import { LinkView } from "client/components/link-view";
import { Page } from "client/components/page";
import { Panel } from "client/components/panel";
import { Text } from "client/components/text";
import { SignInUser } from "client/models/user";
import { init, signIn } from "client/redux/user/actions";
import {
  SIGN_IN_FAILURE,
  SIGNED_IN,
  SIGNING_IN,
} from "client/redux/user/types";
import {
  authSelector,
  errorSelector,
  stageSelector,
} from "client/redux/user/user-selectors";

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
};

const SignIn: FC<Props> = ({ className = "" }) => {
  const stage = useSelector(stageSelector);
  const isAuthorized = useSelector(authSelector);
  const error = useSelector(errorSelector);

  const dispatch = useDispatch();

  const reset = useCallback(() => {
    dispatch(init());
  }, [dispatch]);

  const formSubmit = useCallback(
    (formValue: SignInUser) => {
      dispatch(signIn(formValue));
    },
    [dispatch],
  );

  const content = useMemo(() => {
    switch (stage) {
      case SIGNING_IN:
        return <p>Loading...</p>;
      case SIGN_IN_FAILURE:
        return (
          <div>
            <Heading text="Error" color="primary" />
            <p>
              <Text text={error} />
            </p>
            <Button onClick={reset} viewType="secondary">
              Try again
            </Button>
          </div>
        );
      case SIGNED_IN:
        if (isAuthorized) {
          return <Redirect to="/" />;
        }
        return (
          <div>
            <Heading text="Error" color="primary" />
            <p>Something went wrong</p>
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
  }, [error, stage, formSubmit, reset, isAuthorized]);

  return (
    <Page fixHeader fullHeight align="center">
      <div className={b.mix(className)}>{content}</div>
    </Page>
  );
};

const WrappedSignIn = memo(SignIn);
export { WrappedSignIn as SignIn };
