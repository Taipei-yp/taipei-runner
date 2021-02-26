import { createSelector } from "reselect";
import { RootState } from "client/redux/root-reducer";
import { LeaderboardStages } from "./leaderboard-stages";

export const leaderboardSelector = createSelector(
  [
    (state: RootState) => state.leaderboard.stage,
    (state: RootState) => state.leaderboard.error,
    (state: RootState) => state.leaderboard.gameResultsData,
  ],
  (stage: LeaderboardStages, error: string | undefined, gameResultsData) => {
    return { stage, error, gameResultsData };
  },
);
