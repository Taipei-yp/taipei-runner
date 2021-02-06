import { CleanWebpackPlugin } from "clean-webpack-plugin";
import ForkTsCheckerNotifierWebpackPlugin from "fork-ts-checker-notifier-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import WebpackBar from "webpackbar";
import { EnvironmentPlugin, Configuration } from "webpack";
import CaseSensitivePathsPlugin from "case-sensitive-paths-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";

import { rootDir, distDir, srcDir, getBuildInfo, IS_DEV } from "./utils";

import fileLoader from "./loaders/file";
import cssLoader from "./loaders/css";
import tjsLoader from "./loaders/tjs";

const config: Configuration = {
  entry: {
    main: srcDir("/index.tsx"),
    sw: srcDir("/sw.ts"),
  },
  output: {
    path: distDir(),
    filename: pathData =>
      IS_DEV
        ? "[name].js"
        : pathData.chunk.name === "sw"
        ? "sw.js"
        : "js/[name].[contenthash].js",
  },
  plugins: [
    new CleanWebpackPlugin(),
    new WebpackBar({}),
    new EnvironmentPlugin({
      BUILD_INFO: JSON.stringify(getBuildInfo()),
    }),
    new CaseSensitivePathsPlugin(),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        // syntactic: true,
        // semantic: true,
        // declaration: true,
        // global: true,
      },
    }),
    new ForkTsCheckerNotifierWebpackPlugin({
      skipSuccessful: true,
    }),
    new MiniCssExtractPlugin({
      filename: "styles/[name].[contenthash].css",
      chunkFilename: "[id].css",
    }),
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    modules: [rootDir(), "node_modules"],
  },
  module: {
    rules: [fileLoader.client, cssLoader.client, tjsLoader.client],
  },
  optimization: {
    minimize: !IS_DEV,
    minimizer: [new CssMinimizerPlugin(), "..."],
  },
  performance: {
    hints: IS_DEV ? false : "warning",
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
};

export default config;
