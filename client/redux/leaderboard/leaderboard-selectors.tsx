import { createSelector } from "reselect";
import { RootState } from "client/redux/root-reducer";
import { LeaderboardStages } from "./leaderboard-stages";

export const leaderboardSelector = createSelector(
  [
    (state: RootState) => state.leaderboard.stage,
    (state: RootState) => state.leaderboard.error,
  ],
  (stage: LeaderboardStages, error: string | undefined) => {
    return { stage, error };
  },
);
