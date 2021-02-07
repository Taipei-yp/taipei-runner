import express from "express";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import webpackClientConfig from "./webpack-client-config";
import serverRenderMiddleware from "./server-render-middleware";

const app = express();

if (process.env.NODE_ENV === "development") {
  const compiler = webpack(webpackClientConfig({ mode: "development" }));
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
