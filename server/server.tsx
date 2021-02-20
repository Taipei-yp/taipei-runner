import cookieParser from "cookie-parser";
import express from "express";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import expressAuthMiddleware from "./express-auth-middleware";
import serverRenderMiddleware from "./server-render-middleware";
import webpackClientConfig from "./webpack-client-config";

const app = express();

app.use(cookieParser());

app.use(expressAuthMiddleware);

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
