import { createSelector } from "reselect";
import { Topic } from "client/models/forum";
import { RootState } from "client/redux/root-reducer";
import { ForumStages } from "./forum-stages";

export const forumSelector = createSelector(
  [
    (state: RootState) => state.forum.stage,
    (state: RootState) => state.forum.error,
    (state: RootState) => state.forum.topics,
    (state: RootState) => state.forum.topic,
  ],
  (
    stage: ForumStages,
    error: string | undefined,
    topics: Topic[],
    topic: Topic | null,
  ) => {
    return { stage, error, topics, topic };
  },
);
