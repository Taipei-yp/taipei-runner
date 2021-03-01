import { ConnectedRouter } from "connected-react-router";
import React from "react";
import { hydrate } from "react-dom";
import { Provider } from "react-redux";
import { App } from "./app";
import { RootState } from "./redux/root-reducer";
import { configureStore } from "./redux/store";

import "./styles/style.css";

declare global {
  interface Window {
    __INITIAL_STATE__?: RootState;
  }
}

const initialState = window.__INITIAL_STATE__;
delete window.__INITIAL_STATE__;

const { store, history } = configureStore(initialState);
hydrate(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("app"),
);

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./sw.js")
    .then(registration => {
      console.log(
        "ServiceWorker registration successful with scope: ",
        registration.scope,
      );
    })
    .catch((error: string) => {
      console.log("ServiceWorker registration failed: ", error);
    });
}
