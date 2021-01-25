import { createSelector } from "reselect";
import { RootState } from "client/redux/root-reducer";
import { AuthStages } from "./auth-stages";

export const authStatusSelector = (state: RootState) =>
  state.auth.status === `AUTH`;

export const stageSelector = (state: RootState) => state.auth.stage;

export const errorSelector = (state: RootState) => state.auth.error;

export const authSelector = createSelector(
  [authStatusSelector, stageSelector, errorSelector],
  (isAuthorized: boolean, stage: AuthStages, error: string | undefined) => {
    return { isAuthorized, stage, error };
  },
);
