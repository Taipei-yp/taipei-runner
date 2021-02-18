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

// interface IBuildInfo {
//   buildDate: number;
//   version: string;
//   branchName: string;
//   commitId: string;
//   test: string;
// }

// const printBuildInfo = (buildInfoString: string): void => {
//   try {
//     const buildInfo = JSON.parse(buildInfoString) as IBuildInfo;
//     console.info(`version: ${buildInfo.version}`);
//     console.info(`build date: ${new Date(buildInfo.buildDate).toISOString()}`);
//     console.info(`branch: "${buildInfo.branchName}"`);
//     console.info(`commit: "${buildInfo.commitId}"`);
//   } catch {}
// };

// printBuildInfo((process.env.BUILD_INFO as unknown) as string);

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
// TODO uncomment after ssr completed
// if ("serviceWorker" in navigator) {
//   navigator.serviceWorker
//     .register("./sw.js")
//     .then(registration => {
//       console.log(
//         "ServiceWorker registration successful with scope: ",
//         registration.scope,
//       );
//     })
//     .catch((error: string) => {
//       console.log("ServiceWorker registration failed: ", error);
//     });
// }
