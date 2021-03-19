import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { FeedbackMessage } from "client/models/feedback-message";
import { RootState } from "client/redux/root-reducer";
import { Api } from "client/redux/store";
import { FAILURE, INIT, LOADING, SENT } from "./types";

type Init = {
  type: typeof INIT;
};

type Loading = {
  type: typeof LOADING;
};

type Sent = {
  type: typeof SENT;
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

export const sent = (): Sent => {
  return {
    type: SENT,
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
    dispatch(sent());
  } catch (error) {
    dispatch(failure(error));
  }
};

export type FeedbackAction = Init | Loading | Sent | Failure;
