import cookieParser from "cookie-parser";
import express from "express";
import { DATA, EVAL, expressCspHeader, INLINE, SELF } from "express-csp-header";
import path from "path";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import apiRouter from "./api/routes";
import { checkAuthCkookieMiddleware } from "./auth-middlewares";
import { initDatabases } from "./db";
import serverRenderMiddleware from "./server-render-middleware";
import webpackClientConfig from "./webpack-client-config";

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
app.use(express.static(path.resolve(__dirname, "../dist")));

app.use(cookieParser());

app.use(checkAuthCkookieMiddleware);

app.use(express.json());

app.use("/api", apiRouter);

app.use(
  expressCspHeader({
    directives: {
      "default-src": [SELF, "https://ya-praktikum.tech"],
      "script-src": [SELF, INLINE, EVAL],
      "font-src": [SELF, DATA],
      "img-src": [DATA, SELF, INLINE, "https://ya-praktikum.tech"],
      "style-src": [SELF, INLINE],
      "worker-src": [SELF],
    },
  }),
);

app.get("/*", serverRenderMiddleware);

export { app, initDatabases };
