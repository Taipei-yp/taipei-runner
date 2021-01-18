import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
// import {makeApi} from "../api/api";
import { rootReducer } from "./root-reducer";

// TODO заменить нужными данными
const api = () => {}; // makeApi();

export const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument(api)),
    (window as any).__REDUX_DEVTOOLS_EXTENSION__
      ? (window as any).__REDUX_DEVTOOLS_EXTENSION__()
      : (f: () => void) => f,
  ),
);
