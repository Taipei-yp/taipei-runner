import React, { FC, useCallback, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Feedback } from "./pages/feedback";
import { Forum } from "./pages/forum";
import { SignUp } from "./pages/signup";
import { Error } from "./pages/error";
import { SignIn } from "./pages/signin";
import { Game } from "./pages/game";
import { PrivateRoute } from "./components/private-route";
import { Menu } from "./pages/menu";
import { Profile } from "./pages/profile";
import { ForumTopic } from "./pages/forum-topic";

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
          <PrivateRoute
            auth={isAuthorized}
            path="/profile"
            component={Profile}
          />
          <PrivateRoute auth={isAuthorized} path="/leaderboard" />
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
          <PrivateRoute
            auth={isAuthorized}
            path="/feedback"
            component={Feedback}
          />
          <PrivateRoute auth={isAuthorized} path="/game" component={Game} />
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
