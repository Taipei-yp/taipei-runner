import { GameResultsData } from "client/models/leaderboard";
import { LeaderboardAction } from "./leaderboard-actions";
import { LeaderboardStages } from "./leaderboard-stages";
import {
  LEADERBOARD_FAILURE,
  LEADERBOARD_INIT,
  LEADERBOARD_LOADED,
  LEADERBOARD_LOADING,
} from "./types";

export type LeaderboardState = {
  stage: LeaderboardStages;
  gameResultsData: GameResultsData | null;
  error?: string;
};

export const initialState = {
  gameResultsData: [],
  stage: LeaderboardStages.INIT,
};

export const leaderboardReducer = (
  state: LeaderboardState = initialState,
  action: LeaderboardAction,
): LeaderboardState => {
  switch (action.type) {
    case LEADERBOARD_INIT:
      return {
        ...state,
        stage: LeaderboardStages.INIT,
      };

    case LEADERBOARD_FAILURE:
      return {
        ...state,
        stage: LeaderboardStages.FAILURE,
        error: action.payload.error,
      };

    case LEADERBOARD_LOADING:
      return {
        ...state,
        stage: LeaderboardStages.LOADING,
      };

    case LEADERBOARD_LOADED:
      return {
        ...state,
        stage: LeaderboardStages.LOADED,
        gameResultsData: action.payload.gameResultsData,
      };

    default:
      return state;
  }
};
