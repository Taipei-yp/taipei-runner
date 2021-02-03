import { createSelector } from "reselect";
import { User } from "client/models/user";
import { RootState } from "client/redux/root-reducer";
import { ProfileStages } from "./profile-stages";

export const profileSelector = createSelector(
  [
    (state: RootState) => state.profile.stage,
    (state: RootState) => state.profile.user,
    (state: RootState) => state.profile.error,
  ],
  (stage: ProfileStages, user: User, error: string | undefined) => {
    return { stage, user, error };
  },
);
