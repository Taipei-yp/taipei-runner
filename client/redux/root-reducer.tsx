import { combineReducers } from "redux";
import { forumReducer } from "./forum/forum-reducer";
import { leaderboardReducer } from "./leaderboard/leaderboard-reducer";
import { userReducer } from "./user/user-reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  forum: forumReducer,
  leaderboard: leaderboardReducer,
});
