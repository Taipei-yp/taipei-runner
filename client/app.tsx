import React, { FC } from "react";
import { Route, Switch } from "react-router-dom";
import { PrivateRoute } from "./components/private-route";
import { useAuth } from "./hooks/auth";
import { useTheme } from "./hooks/theme";
import routes from "./routes";

export const App: FC = () => {
  const { isAuthorized } = useAuth();
  const { nowTheme } = useTheme();
  return (
    <div className={`app ${nowTheme.theme}`}>
      <Switch>
        {routes.map(({ isPrivate, path, component, exact }) => {
          return isPrivate ? (
            <PrivateRoute
              key={path}
              path={path}
              auth={isAuthorized}
              exact={exact}
              component={component}
            />
          ) : (
            <Route
              key={path}
              path={path}
              auth={isAuthorized}
              exact={exact}
              component={component}
            />
          );
        })}
      </Switch>
    </div>
  );
};
