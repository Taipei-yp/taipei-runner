import { Topic } from "client/models/forum";
import { ForumAction } from "./forum-actions";
import { ForumStages } from "./forum-stages";
import { FAILURE, INIT, LOADED, LOADING } from "./types";

export type ForumState = {
  stage: ForumStages;
  topics: Topic[];
  topic: Topic | null;
  error?: string;
};

export const initialState: ForumState = {
  stage: ForumStages.INIT,
  topics: [],
  topic: null,
};

export const forumReducer = (
  state: ForumState = initialState,
  action: ForumAction,
): ForumState => {
  switch (action.type) {
    case INIT:
      return {
        ...state,
        stage: ForumStages.INIT,
        topics: [],
        topic: null,
      };

    case LOADING:
      return {
        ...state,
        stage: ForumStages.LOADING,
        topics: [],
        topic: null,
      };

    case LOADED:
      return {
        ...state,
        stage: ForumStages.LOADED,
        topics: action.payload.topics || [],
        topic: action.payload.topic || null,
      };

    case FAILURE:
      return {
        ...state,
        stage: ForumStages.FAILURE,
        error: action.payload.error,
        topics: [],
        topic: null,
      };

    default:
      return state;
  }
};
