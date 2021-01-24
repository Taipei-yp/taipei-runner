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
import { SignUpUser } from "client/models/user";
import { init, signUp } from "client/redux/auth/auth-actions";
import { authSelector } from "client/redux/auth/auth-selectors";
import { AuthStages } from "client/redux/auth/auth-stages";

import "./signup.css";

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
  const { stage, isAuthorized, error } = useSelector(authSelector);

  const dispatch = useDispatch();

  const reset = useCallback(() => {
    dispatch(init());
  }, [dispatch]);

  const formSubmit = useCallback(
    (formValue: SignUpUser) => {
      dispatch(signUp(formValue));
    },
    [dispatch],
  );

  const content = useMemo(() => {
    switch (stage) {
      case AuthStages.SIGNING_UP:
        return <p>Loading...</p>;
      case AuthStages.SIGN_UP_FAILURE:
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
      case AuthStages.SIGNED_UP:
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
  }, [formSubmit, reset, isAuthorized, error, stage]);

  return (
    <Page fixHeader fullHeight align="center">
      <div className={b.mix(className)}>{content}</div>
    </Page>
  );
};

const WrappedSignUp = memo(SignUp);
export { WrappedSignUp as SignUp };
