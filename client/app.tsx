import React, { FC, useCallback, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Forum } from "./pages/forum";
import { SignUp } from "./pages/signup";
import { SignIn } from "./pages/signin";
import { PrivateRoute } from "./components/private-route";
import { Menu } from "./pages/menu";

export const App: FC = () => {
  const [isAuthorized, setAuthorize] = useState(false);
  const handleAuthorize = useCallback((authorize: boolean) => {
    setAuthorize(authorize);
  }, []);

  return (
    <div className="app">
      <Router>
        <Switch>
          <Route exact path="/" />
          <Route
            path="/signin"
            component={() => <SignIn onAuth={handleAuthorize} />}
          />
          <Route
            path="/signup"
            component={() => <SignUp onAuth={handleAuthorize} />}
          />
          <PrivateRoute auth={isAuthorized} path="/menu" component={Menu} />
          <PrivateRoute auth={isAuthorized} path="/profile" />
          <PrivateRoute auth={isAuthorized} path="/leaderboard" />
          <PrivateRoute auth={isAuthorized} path="/forum" component={Forum} />
          <PrivateRoute auth={isAuthorized} path="/forum/topic/:id" />
          <PrivateRoute auth={isAuthorized} path="/game" />
          <PrivateRoute auth={isAuthorized} path="/game-over" />
          <Route path="*" />
          <Route
            path="*"
            component={() => <Error title="404" description="Not found" />}
          />
        </Switch>
      </Router>
    </div>
  );
};
