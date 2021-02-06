const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ForkTsCheckerNotifierWebpackPlugin = require("fork-ts-checker-notifier-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const WebpackBar = require("webpackbar");
const { EnvironmentPlugin } = require("webpack");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { rootDir, distDir, srcDir, getBuildInfo, IS_DEV } = require("./utils");

const fileLoader = require("./loaders/file");
const cssLoader = require("./loaders/css");
const tjsLoader = require("./loaders/tjs");

const config = {
  entry: {
    main: srcDir("/index.tsx"),
    sw: srcDir("/sw.ts"),
  },
  output: {
    path: distDir(),
    publicPath: "/",
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
        syntactic: true,
        semantic: true,
        declaration: true,
        global: true,
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

module.exports = config;
