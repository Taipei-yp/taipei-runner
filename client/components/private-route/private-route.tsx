import React, { ComponentType, FC, memo } from "react";
import { Route, Redirect, RouteComponentProps } from "react-router-dom";

type Props = {
  auth: boolean;
  path: string;
  component?: ComponentType<RouteComponentProps<any>> | ComponentType<any>;
  exact?: boolean;
};

const PrivateRoute: FC<Props> = ({ auth, component, path, exact }) => {
  return auth ? (
    <Route exact={exact} path={path} component={component} />
  ) : (
    <Redirect to="/signin" />
  );
};

const WrappedPrivateRoute = memo(PrivateRoute);
export { WrappedPrivateRoute as PrivateRoute };
