import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { authApi } from "client/api";
import { rootReducer } from "./root-reducer";

export type Api = {
  authApi: typeof authApi;
};

const api: Api = {
  authApi,
};

export const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument(api)),
    (window as any).__REDUX_DEVTOOLS_EXTENSION__
      ? (window as any).__REDUX_DEVTOOLS_EXTENSION__()
      : (f: () => void) => f,
  ),
);
