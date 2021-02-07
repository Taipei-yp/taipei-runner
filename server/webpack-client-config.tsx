import { Configuration } from "webpack";
import { merge } from "webpack-merge";
import webpackClientConfig from "../webpack/webpack.client";

const defConfig = webpackClientConfig as Configuration;

export default function (params: Configuration) {
  return merge(defConfig, params);
}
