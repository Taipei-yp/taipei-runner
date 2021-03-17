import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { Topic } from "client/models/forum";
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
  payload: { topics: Topic[]; topic: Topic | null };
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

export const loaded = (topics: Topic[], topic: Topic | null): Loaded => {
  return {
    type: LOADED,
    payload: { topics, topic },
  };
};

export const failure = (error: string): Failure => {
  return {
    type: FAILURE,
    payload: { error },
  };
};

export const loadTopics = (): ThunkAction<
  void,
  RootState,
  Api,
  AnyAction
> => async (dispatch, _state, api) => {
  dispatch(loading());
  const { getTopics } = api.forumApi();
  try {
    const topics = await getTopics();
    dispatch(loaded(topics, null));
  } catch (error) {
    dispatch(failure(error));
  }
};

export const loadTopic = (
  id: number,
): ThunkAction<void, RootState, Api, AnyAction> => async (
  dispatch,
  _state,
  api,
) => {
  dispatch(loading());
  const { getTopic } = api.forumApi();
  try {
    const topic = await getTopic(id);
    dispatch(loaded([], topic));
  } catch (error) {
    dispatch(failure(error));
  }
};

export const replyToMessage = (
  topicId: number,
  messageId: number,
  text: string,
): ThunkAction<void, RootState, Api, AnyAction> => async (
  dispatch,
  _state,
  api,
) => {
  dispatch(loading());
  const { replyToMessage: replyToMessageApi } = api.forumApi();
  try {
    await replyToMessageApi(messageId, text);
    dispatch(loadTopic(topicId));
  } catch (error) {
    dispatch(failure(error));
  }
};

export const addTopic = (
  name: string,
  message: string,
): ThunkAction<void, RootState, Api, AnyAction> => async (
  dispatch,
  _state,
  api,
) => {
  dispatch(loading());
  const { addTopic: addTopicApi } = api.forumApi();
  try {
    const topic = await addTopicApi(name, message);
    dispatch(loaded([], topic));
  } catch (error) {
    dispatch(failure(error));
  }
};

export type ForumAction = Init | Loading | Loaded | Failure;
