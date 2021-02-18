import { connectRouter, RouterState } from "connected-react-router";
import { History } from "history";
import { combineReducers } from "redux";
import { authReducer, AuthState } from "./auth/auth-reducer";
import { profileReducer, ProfileState } from "./profile/profile-reducer";

export type RootState = {
  auth: AuthState;
  profile: ProfileState;
  router: RouterState;
};

export const createRootReducer = (history: History) =>
  combineReducers<RootState>({
    auth: authReducer,
    profile: profileReducer,
    router: connectRouter(history),
  });
