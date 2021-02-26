import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { GameResultsData } from "client/models/leaderboard";
import { loadProfile } from "client/redux/profile/profile-actions";
import { ProfileStages } from "client/redux/profile/profile-stages";
import { RootState } from "client/redux/root-reducer";
import { Api } from "client/redux/store";
import {
  LEADERBOARD_FAILURE,
  LEADERBOARD_INIT,
  LEADERBOARD_LOADED,
  LEADERBOARD_LOADING,
} from "./types";

type LeaderboardInit = {
  type: typeof LEADERBOARD_INIT;
};

type LeaderboardLoading = {
  type: typeof LEADERBOARD_LOADING;
};

type LeaderboardLoaded = {
  type: typeof LEADERBOARD_LOADED;
  payload: { gameResultsData: GameResultsData | null };
};

type LeaderboardFailure = {
  type: typeof LEADERBOARD_FAILURE;
  payload: { error: string };
};

export const leaderboardInit = (): LeaderboardInit => {
  return {
    type: LEADERBOARD_INIT,
  };
};

export const leaderboardLoading = (): LeaderboardLoading => {
  return {
    type: LEADERBOARD_LOADING,
  };
};

export const leaderboardLoaded = (
  gameResultsData: GameResultsData,
): LeaderboardLoaded => {
  return {
    type: LEADERBOARD_LOADED,
    payload: { gameResultsData },
  };
};

export const leaderboardLoadingFailure = (
  error: string,
): LeaderboardFailure => {
  return {
    type: LEADERBOARD_FAILURE,
    payload: { error },
  };
};

export const saveScore = (
  score: number,
): ThunkAction<void, RootState, Api, AnyAction> => async (
  dispatch,
  state,
  api,
) => {
  dispatch(leaderboardLoading());

  const { saveScore: saveScoreApi } = api.leaderboardApi();
  try {
    if (state().profile.stage !== ProfileStages.LOADED) {
      // TODO it works correct, but IDE types error.. change on refactoring
      // eslint-disable-next-line @typescript-eslint/await-thenable
      await dispatch(loadProfile());
    }

    const { user } = state().profile;
    if (!user) {
      throw new Error("Failed to load user data");
    }

    await saveScoreApi(user.login, score);
    dispatch(leaderboardInit());
  } catch (error) {
    dispatch(leaderboardLoadingFailure(error));
  }
};

export const loadLeaderboard = (
  page = 0,
): ThunkAction<void, RootState, Api, AnyAction> => async (
  dispatch,
  _state,
  api,
) => {
  dispatch(leaderboardLoading());
  const { get: getLeaderboardApi } = api.leaderboardApi();
  try {
    const gameResultsData = await getLeaderboardApi(page);
    dispatch(leaderboardLoaded(gameResultsData));
  } catch (error) {
    dispatch(leaderboardLoadingFailure(error));
  }
};

export type LeaderboardAction =
  | LeaderboardInit
  | LeaderboardFailure
  | LeaderboardLoading
  | LeaderboardLoaded;
