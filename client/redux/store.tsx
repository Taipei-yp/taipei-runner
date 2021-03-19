import { createBrowserHistory, createMemoryHistory } from "history";
import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import {
  authApi,
  forumApi,
  leaderboardApi,
  oauthApi,
  profileApi,
  themeApi,
} from "client/api";
import { feedbackApi } from "client/api/feedback-api";
import { isServer } from "client/helpers/check-server";
import { getInitialState } from "./get-Initial-state";
import { createRootReducer, RootState } from "./root-reducer";

export type Api = {
  authApi: typeof authApi;
  profileApi: typeof profileApi;
  oauthApi: typeof oauthApi;
  leaderboardApi: typeof leaderboardApi;
  themeApi: typeof themeApi;
  forumApi: typeof forumApi;
  feedbackApi: typeof feedbackApi;
};

const api: Api = {
  authApi,
  profileApi,
  oauthApi,
  leaderboardApi,
  themeApi,
  forumApi,
  feedbackApi,
};

const configureStore = (
  initialState: RootState = getInitialState(),
  url = "/",
) => {
  const history = isServer
    ? createMemoryHistory({ initialEntries: [url] })
    : createBrowserHistory();

  const rootReducer = createRootReducer(history);

  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk.withExtraArgument(api)),
      !isServer && (window as any).__REDUX_DEVTOOLS_EXTENSION__
        ? (window as any).__REDUX_DEVTOOLS_EXTENSION__()
        : (f: () => void) => f,
    ),
  );

  return { store, history };
};

export { configureStore };
