import express from "express";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import configs from "../webpack/webpack.config";
import serverRenderMiddleware from "./server-render-middleware";

import "babel-polyfill";

const app = express();

if (process.env.NODE_ENV === "development") {
  const compiler = webpack(configs[0]);
  app.use(webpackHotMiddleware(compiler));
  app.use(
    webpackDevMiddleware(compiler, {
      serverSideRender: true,
      writeToDisk: true,
    }),
  );
}

app.get("/*", serverRenderMiddleware);

export { app };
