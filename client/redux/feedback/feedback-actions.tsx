import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { FeedbackMessage } from "client/models/feedback-message";
import { FAILURE, INIT, LOADED, LOADING } from "client/redux/forum/types";
import { RootState } from "client/redux/root-reducer";
import { Api } from "client/redux/store";

type Init = {
  type: typeof INIT;
};

type Loading = {
  type: typeof LOADING;
};

type Loaded = {
  type: typeof LOADED;
};

type Failure = {
  type: typeof FAILURE;
  payload: { error: string };
};

export const init = (): Init => {
  return {
    type: INIT,
  };
};

export const loading = (): Loading => {
  return {
    type: LOADING,
  };
};

export const loaded = (): Loaded => {
  return {
    type: LOADED,
  };
};

export const failure = (error: string): Failure => {
  return {
    type: FAILURE,
    payload: { error },
  };
};

export const sendFeedback = (
  message: FeedbackMessage,
): ThunkAction<void, RootState, Api, AnyAction> => async (
  dispatch,
  _state,
  api,
) => {
  dispatch(loading());
  const { sendFeedback: sendFeedbackApi } = api.feedbackApi();
  try {
    await sendFeedbackApi(message);
    dispatch(loaded());
  } catch (error) {
    dispatch(failure(error));
  }
};

export type FeedbackAction = Init | Loading | Loaded | Failure;
