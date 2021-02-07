import { CleanWebpackPlugin } from "clean-webpack-plugin";
import { Configuration } from "webpack";
import nodeExternals from "webpack-node-externals";
import cssLoader from "./loaders/css";
import fileLoader from "./loaders/file";
import tjsLoader from "./loaders/tjs";
import { distDir, IS_DEV, rootDir } from "./utils";

const config: Configuration = {
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
export default config;
