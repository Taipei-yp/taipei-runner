import React, { FC, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { PrivateRoute } from "./components/private-route";
import { Error } from "./pages/error";
import { Feedback } from "./pages/feedback";
import { Forum } from "./pages/forum";
import { SignUp } from "./pages/signup";
import { SignIn } from "./pages/signin";
import { PrivateRoute } from "./components/private-route";
import { Menu } from "./pages/menu";
import { Profile } from "./pages/profile";
import { SignIn } from "./pages/signin";
import { SignUp } from "./pages/signup";

export const App: FC = () => {
  const [isAuthorized, setAuthorize] = useState(false);

  return (
    <div className="app">
      <Router>
        <Switch>
          <Route
            path="/signin"
            component={() => <SignIn onAuth={setAuthorize} />}
          />
          <Route
            path="/signup"
            component={() => <SignUp onAuth={setAuthorize} />}
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
          <PrivateRoute
            auth={isAuthorized}
            path="/feedback"
            component={Feedback}
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
