import { combineReducers } from "redux";
import { authReducer, AuthState } from "./auth/auth-reducer";
import { forumReducer } from "./forum/forum-reducer";
import { leaderboardReducer } from "./leaderboard/leaderboard-reducer";
import { profileReducer, ProfileState } from "./profile/profile-reducer";

export type RootState = {
  auth: AuthState;
  profile: ProfileState;
};

export const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  forum: forumReducer,
  leaderboard: leaderboardReducer,
});
