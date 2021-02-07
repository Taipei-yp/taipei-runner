const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const nodeExternals = require("webpack-node-externals");
const { rootDir, distDir, IS_DEV } = require("./utils");

const fileLoader = require("./loaders/file");
const cssLoader = require("./loaders/css");
const tjsLoader = require("./loaders/tjs");

const config = {
  name: "server",
  target: "node",
  node: { __dirname: false },
  entry: {
    server: rootDir("./server/server.tsx"),
  },
  module: {
    rules: [fileLoader.server, cssLoader.server, tjsLoader.server],
  },
  output: {
    filename: "server.js",
    path: distDir(),
    publicPath: "/",
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ["server*"],
    }),
  ],
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
module.exports = config;
