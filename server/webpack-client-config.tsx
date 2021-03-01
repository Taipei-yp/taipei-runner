import { Configuration } from "webpack";
import { merge } from "webpack-merge";
import webpackClientConfig from "../webpack/webpack.client";

function mergeConfig(params: Configuration) {
  return merge(webpackClientConfig, params);
}

export default mergeConfig;
