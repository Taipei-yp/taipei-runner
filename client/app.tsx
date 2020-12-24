import React, { FC } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { SignUp } from "./pages/signup";

export const App: FC = () => {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/signin" />
          <Route path="/signup" component={SignUp} />
          <Route path="/profile" />
          <Route path="/leaderboard" />
          <Route path="/forum" />
          <Route path="/forum/topic/:id" />
          <Route path="/feedback" />
          <Route path="/game" />
          <Route path="/game-over" />
          <Route exact path="/" />
          <Route path="/*" />
        </Switch>
      </Router>
    </div>
  );
};
