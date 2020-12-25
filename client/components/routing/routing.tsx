import React, { FC } from "react";
import { Route, Switch } from "react-router-dom";

import { SignUp } from "../../pages/signup";

const Routing: FC = () => {
  return (
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
  );
};
export { Routing };
