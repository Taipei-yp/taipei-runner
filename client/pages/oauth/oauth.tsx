import block from "bem-cn";
import React, { FC, memo, useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { oauthApi } from "client/api";
import { FormView, FormViewField } from "client/components/form-view";
import { Heading } from "client/components/heading";
import { LinkView } from "client/components/link-view";
import { Page } from "client/components/page";
import { Panel } from "client/components/panel";
import { Text } from "client/components/text";
import { OauthCode } from "client/models/oauth";
import { oauthSingIn } from "client/redux/auth/auth-actions";
import { authSelector } from "client/redux/auth/auth-selectors";
import { AuthStages } from "client/redux/auth/auth-stages";

import "./oauth.css";

const b = block("oauth");
const devClientId = "4e6403c4c04942098c6c8bef6f353985";
const yandexOauthUrl = "https://oauth.yandex.ru/authorize?response_type=code&";

const SignInFields: FormViewField[] = [
  {
    labelText: "Code",
    pattern: /^\S+$/,
    errorMessage: "Require",
    type: "text",
    name: "code",
  },
];

type Props = {
  className?: string;
};

const Oauth: FC<Props> = ({ className = "" }) => {
  const { stage, isAuthorized, error } = useSelector(authSelector);

  const dispatch = useDispatch();

  const formSubmit = useCallback(
    (formValue: OauthCode) => {
      dispatch(oauthSingIn(formValue));
    },
    [dispatch],
  );

  useEffect(() => {
    async function redirectProd() {
      const redirectUrl = `${window.location.protocol}//${window.location.host}/oauth`;
      const resp = await oauthApi().clientId();
      const clientId = resp.data;
      document.location.href = `${yandexOauthUrl}client_id=${clientId.service_id}&redirect_uri=${redirectUrl}`;
    }

    const code = new URLSearchParams(window.location.search).get("code");
    if (code != null) {
      dispatch(oauthSingIn({ code }));
    } else if (process.env.NODE_ENV === "development") {
      window.open(`${yandexOauthUrl}client_id=${devClientId}`);
    } else {
      redirectProd();
    }
  }, [dispatch]);

  const content = useMemo(() => {
    switch (stage) {
      case AuthStages.SIGN_IN_FAILURE:
        return (
          <div>
            <Heading text="Error" color="primary" />
            <p>
              <Text text={error} />
            </p>
            <LinkView
              to="/signin"
              label="Return to signin page"
              className={b("link")}
            />
          </div>
        );
      case AuthStages.SIGNED_IN:
        if (isAuthorized) {
          return <Redirect to="/" />;
        }
        return (
          <div>
            <Heading text="Error" color="primary" />
            <p>Something went wrong</p>
            <LinkView
              to="/signin"
              label="Return to signin page"
              className={b("link")}
            />
          </div>
        );
      default:
        return (
          <Panel>
            <Heading
              color="accent"
              text="Oauth Code"
              className={b("heading")}
            />
            <FormView onSubmit={formSubmit} fields={SignInFields} />
            <LinkView
              to="/signin"
              label="Return to signin page"
              className={b("link")}
            />
          </Panel>
        );
    }
  }, [error, formSubmit, isAuthorized, stage]);

  return (
    <Page fixHeader fullHeight align="center">
      <div className={b.mix(className)}>{content}</div>
    </Page>
  );
};

const WrappedOauth = memo(Oauth);
export { WrappedOauth as Oauth };
