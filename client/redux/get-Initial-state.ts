import { RouterState } from "connected-react-router";
import { initialState as auth } from "./auth/auth-reducer";
import { initialState as leaderboard } from "./leaderboard/leaderboard-reducer";
import { initialState as profile } from "./profile/profile-reducer";
import { RootState } from "./root-reducer";
import { initialState as theme } from "./theme/theme-reducer";

export const getInitialState = (pathname = "/"): RootState => {
  return {
    auth,
    profile,
    leaderboard,
    router: {
      location: { pathname, search: "", hash: "", key: "" },
      action: "POP",
    } as RouterState,
    theme,
  };
};
