import { RouterState } from "connected-react-router";
import { initialState as auth } from "./auth/auth-reducer";
import { initialState as profile } from "./profile/profile-reducer";
import { RootState } from "./root-reducer";

export const getInitialState = (pathname = "/"): RootState => {
  return {
    auth,
    profile,
    router: {
      location: { pathname, search: "", hash: "", key: "" },
      action: "POP",
    } as RouterState,
  };
};
