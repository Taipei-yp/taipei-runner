const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ForkTsCheckerNotifierWebpackPlugin = require("fork-ts-checker-notifier-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const WebpackBar = require("webpackbar");
const { EnvironmentPlugin } = require("webpack");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const { rootDir, distDir, srcDir, getBuildInfo } = require("./utils");

module.exports = {
  entry: {
    main: srcDir("/index.tsx"),
  },
  output: {
    path: distDir(),
    filename: "[name].js",
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./client/index.html",
    }),
    new WebpackBar(),
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
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    modules: [rootDir(), "node_modules"],
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              babelrc: false,
              presets: [
                [
                  "@babel/preset-env",
                  {
                    useBuiltIns: "usage",
                    corejs: { version: 3, proposals: true },
                  },
                ],
                "@babel/preset-typescript",
                "@babel/preset-react",
              ],
              plugins: [
                ["@babel/plugin-proposal-decorators", { legacy: true }],
                ["@babel/plugin-proposal-class-properties", { loose: true }],
                "react-hot-loader/babel",
              ],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              sourceMap: true,
            },
          },
          "postcss-loader",
        ],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: "asset",
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: "asset",
      },
    ],
  },
};
