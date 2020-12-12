require("dotenv").config();
const { merge } = require("webpack-merge");
const webpack = require("webpack");
const baseConfig = require("./webpack.base.js");

module.exports = merge(baseConfig, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    historyApiFallback: true,
    open: process.env.BROWSER !== "false",
    hot: true,
    port: 4000,
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
});
