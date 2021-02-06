import { Configuration } from "webpack";
import nodeExternals from "webpack-node-externals";
import { rootDir, distDir, IS_DEV } from "./utils";

import fileLoader from "./loaders/file";
import cssLoader from "./loaders/css";
import tjsLoader from "./loaders/tjs";

const config: Configuration = {
  name: "server",
  target: "node",
  node: { __dirname: false },
  entry: rootDir("./server"),
  module: {
    rules: [fileLoader.server, cssLoader.server, tjsLoader.server],
  },
  output: {
    filename: "[name].js",
    libraryTarget: "commonjs2",
    path: distDir(),
    publicPath: "/",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    modules: [rootDir(), "node_modules"],
  },

  devtool: "source-map",

  performance: {
    hints: IS_DEV ? false : "warning",
  },

  externals: [nodeExternals({ allowlist: [/\.(?!(?:tsx?|json)$).{1,5}$/i] })],

  optimization: { nodeEnv: false },
};

export default config;
