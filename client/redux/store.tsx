import { createStore } from "redux";
import initialState from "./initial-state";
import rootReducer from "./root-reducer";

const store = createStore(rootReducer, initialState);

export default store;
