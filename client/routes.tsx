import React from "react";
import { match } from "react-router";
import { Dispatch } from "redux";
import { Feedback } from "client/pages/feedback";
import { Error } from "./pages/error";
import { Forum } from "./pages/forum";
import { ForumTopic } from "./pages/forum-topic";
import { ForumTopicCreate } from "./pages/forum-topic-create";
import { Game } from "./pages/game";
import { GameOver } from "./pages/gameover";
import { Leaderboard } from "./pages/leaderboard";
import { Menu } from "./pages/menu";
import { Oauth } from "./pages/oauth";
import { Profile } from "./pages/profile";
import { SignIn } from "./pages/signin";
import { SignUp } from "./pages/signup";
import { loadProfile } from "./redux/profile/profile-actions";

export type RouterFetchDataArgs = {
  dispatch: Dispatch<any>;
  match: match<{ slug: string }>;
};
export default [
  {
    path: "/signin",
    component: SignIn,
    exact: true,
    isPrivate: false,
  },
  {
    path: "/signup",
    component: SignUp,
    exact: true,
    isPrivate: false,
  },
  {
    path: "/oauth",
    component: Oauth,
    exact: true,
    isPrivate: false,
  },
  {
    path: "/",
    component: Menu,
    exact: true,
    isPrivate: true,
  },
  {
    path: "/profile",
    component: Profile,
    exact: true,
    isPrivate: true,
    fetchData({ dispatch }: RouterFetchDataArgs) {
      return dispatch(loadProfile());
    },
  },
  {
    path: "/leaderboard",
    component: Leaderboard,
    exact: true,
    isPrivate: true,
  },
  {
    path: "/forum",
    component: Forum,
    exact: true,
    isPrivate: true,
  },
  {
    path: "/forum/topic/new",
    component: ForumTopicCreate,
    exact: true,
    isPrivate: true,
  },
  {
    path: "/feedback",
    component: Feedback,
    exact: true,
    isPrivate: true,
  },
  {
    path: "/forum/topic/:id",
    component: ForumTopic,
    exact: true,
    isPrivate: true,
    fetchData() {
      //  TODO fetchData after redux completed
      //  fetchData({ dispatch, match }: RouterFetchDataArgs)..
    },
  },
  {
    path: "/game",
    component: Game,
    exact: true,
    isPrivate: true,
  },
  {
    path: "/game-over",
    component: GameOver,
    exact: true,
    isPrivate: true,
  },
  {
    path: "*",
    component: () => <Error title="404" description="Not found" />,
    exact: true,
  },
];
