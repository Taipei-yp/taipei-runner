import { Request, Response } from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import Helmet, { HelmetData } from "react-helmet";
import { Provider } from "react-redux";
import { StaticRouterContext } from "react-router";
import { matchPath, StaticRouter } from "react-router-dom";
import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import url from "url";
import { App } from "../client/app";
import { getInitialState } from "../client/redux/get-Initial-state";
import { RootState } from "../client/redux/root-reducer";
import { Api, configureStore } from "../client/redux/store";
import routes from "../client/routes";

export default (req: Request, res: Response) => {
  const location = req.url;
  const context: StaticRouterContext = {};

  const { store } = configureStore(getInitialState(location), location);

  function renderApp() {
    const reduxState = store.getState();
    const helmetData = Helmet.renderStatic();

    const jsx = (
      <Provider store={store}>
        <StaticRouter context={context} location={location}>
          <App />
        </StaticRouter>
      </Provider>
    );
    const reactHtml = renderToString(jsx);

    res.send(getHtml(reactHtml, reduxState, helmetData));
  }

  const dataRequirements: (void | ThunkAction<
    void,
    unknown,
    Api,
    AnyAction
  >)[] = [];

  routes.some(route => {
    const { fetchData: fetchMethod } = route;
    const match = matchPath<{ slug: string }>(
      url.parse(location).pathname as string,
      route,
    );

    if (match && fetchMethod) {
      dataRequirements.push(
        fetchMethod({
          dispatch: store.dispatch,
          match,
        }),
      );
    }

    return Boolean(match);
  });

  return Promise.all(dataRequirements)
    .then(() => {
      renderApp();
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
};

function getHtml(
  reactHtml: string,
  reduxState: RootState,
  helmetData: HelmetData,
) {
  return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="google-site-verification" content="nLL5VlSAgcKL756luG6o6UwKcvR8miU2duRnhU-agmE" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <link rel="shortcut icon" type="image/png" href="/images/favicon.png">
            <link href="/main.css" rel="stylesheet">
            ${helmetData.title.toString()}
            ${helmetData.meta.toString()}
        </head>
        <body>
            <div id="app">${reactHtml}</div>
            <script>
              window.__INITIAL_STATE__ = ${JSON.stringify(reduxState)}
            </script>
            <script src="/main.js"></script>
        </body>
        </html>
    `;
}
