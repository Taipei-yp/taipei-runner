import block from "bem-cn";
import React, { FC, memo, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { oauthApi } from "client/api";
import { Heading } from "client/components/heading";
import { LinkView } from "client/components/link-view";
import { Page } from "client/components/page";
import { Panel } from "client/components/panel";
import { Text } from "client/components/text";
import { oauthSingIn } from "client/redux/auth/auth-actions";
import { authSelector } from "client/redux/auth/auth-selectors";
import { AuthStages } from "client/redux/auth/auth-stages";

import "./oauth.css";

const b = block("oauth");
const yandexOauthUrl = "https://oauth.yandex.ru/authorize?response_type=code&";

type Props = {
  className?: string;
};

const Oauth: FC<Props> = ({ className = "" }) => {
  const { stage, isAuthorized, error } = useSelector(authSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    async function redirectProd() {
      const redirectUrl = `${window.location.protocol}//${window.location.host}/oauth`;
      try {
        const resp = await oauthApi().clientId();
        const clientId = resp.data;
        document.location.href = `${yandexOauthUrl}client_id=${clientId.service_id}&redirect_uri=${redirectUrl}`; // &redirect_uri=${redirectUrl}
      } catch {}
    }
    const code = new URLSearchParams(window.location.search).get("code");
    if (code != null) {
      dispatch(oauthSingIn({ code }));
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
              text="Oauth Autorization"
              className={b("heading")}
            />
            <LinkView
              to="/signin"
              label="Return to signin page"
              className={b("link")}
            />
          </Panel>
        );
    }
  }, [error, isAuthorized, stage]);

  return (
    <Page fixHeader fullHeight align="center">
      <div className={b.mix(className)}>{content}</div>
    </Page>
  );
};

const WrappedOauth = memo(Oauth);
export { WrappedOauth as Oauth };
