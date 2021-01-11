import React, { FC, useCallback, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { PrivateRoute } from "./components/private-route";
import { Error } from "./pages/error";
import { Forum } from "./pages/forum";
import { ForumTopic } from "./pages/forum-topic";
import { Game } from "./pages/game";
import { GameOver } from "./pages/gameover";
import { Leaderboard } from "./pages/leaderboard";
import { Menu } from "./pages/menu";
import { Profile } from "./pages/profile";
import { SignIn } from "./pages/signin";
import { SignUp } from "./pages/signup";

export const App: FC = () => {
  const [isAuthorized, setAuthorize] = useState(false);
  const handleAuthorize = useCallback((authorize: boolean) => {
    setAuthorize(authorize);
  }, []);

  return (
    <div className="app">
      <Router>
        <Switch>
          <Route
            path="/signin"
            component={() => <SignIn onAuth={handleAuthorize} />}
          />
          <Route
            path="/signup"
            component={() => <SignUp onAuth={handleAuthorize} />}
          />
          <PrivateRoute auth={isAuthorized} exact path="/" component={Menu} />
          <PrivateRoute
            auth={isAuthorized}
            path="/profile"
            component={Profile}
          />
          <PrivateRoute
            auth={isAuthorized}
            path="/leaderboard"
            component={Leaderboard}
          />
          <PrivateRoute
            exact
            auth={isAuthorized}
            path="/forum"
            component={Forum}
          />
          <PrivateRoute
            auth={isAuthorized}
            path="/forum/topic/:id"
            component={ForumTopic}
          />
          <PrivateRoute auth={isAuthorized} path="/game" component={Game} />
          <PrivateRoute
            auth={isAuthorized}
            path="/game-over"
            component={GameOver}
          />
          <Route
            path="*"
            component={() => <Error title="404" description="Not found" />}
          />
        </Switch>
      </Router>
    </div>
  );
};
