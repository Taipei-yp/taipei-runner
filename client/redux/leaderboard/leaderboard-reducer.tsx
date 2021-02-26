import { GameResults } from "client/models/leaderboard";
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
  gameResults: GameResults | null;
  error?: string;
};

const initialState = {
  gameResults: [],
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
        gameResults: action.payload.gameResults,
      };

    default:
      return state;
  }
};
