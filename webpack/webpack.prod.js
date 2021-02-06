const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const baseConfig = require("./webpack.base.js");
const { distDir } = require("./utils");

module.exports = merge(baseConfig, {
  mode: "production",
  devtool: false,
  output: {
    path: distDir(),
    publicPath: "/",
    filename: pathData => pathData.chunk.name === "sw" ? "sw.js" : "js/[name].[contenthash].js",
    assetModuleFilename: "assets/[contenthash][ext][query]",
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "styles/[name].[contenthash].css",
      chunkFilename: "[id].css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          "postcss-loader",
        ],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin(), "..."],
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
});
