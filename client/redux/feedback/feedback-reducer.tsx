import { FeedbackAction } from "./feedback-actions";
import { FeedbackStages } from "./feedback-stages";
import { FAILURE, INIT, LOADING, SENT } from "./types";

export type FeedbackState = {
  stage: FeedbackStages;
  error?: string;
};

export const initialState: FeedbackState = {
  stage: FeedbackStages.INIT,
};

export const feedbackReducer = (
  state: FeedbackState = initialState,
  action: FeedbackAction,
): FeedbackState => {
  switch (action.type) {
    case INIT:
      return {
        ...state,
        stage: FeedbackStages.INIT,
      };

    case LOADING:
      return {
        ...state,
        stage: FeedbackStages.LOADING,
      };

    case SENT:
      return {
        ...state,
        stage: FeedbackStages.LOADED,
      };

    case FAILURE:
      return {
        ...state,
        stage: FeedbackStages.FAILURE,
        error: action.payload.error,
      };

    default:
      return state;
  }
};
