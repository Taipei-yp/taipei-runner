import { createSelector } from "reselect";
import { RootState } from "client/redux/root-reducer";
import { FeedbackStages } from "./feedback-stages";

export const feedbackSelector = createSelector(
  [
    (state: RootState) => state.feedback.stage,
    (state: RootState) => state.feedback.error,
  ],
  (stage: FeedbackStages, error: string | undefined) => {
    return { stage, error };
  },
);
