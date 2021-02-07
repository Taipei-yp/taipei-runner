import { Configuration } from "webpack";
import { merge } from "webpack-merge";
import webpackClientConfig from "../webpack/webpack.client";
import { IS_DEV } from "../webpack/utils";

const defConfig = webpackClientConfig as Configuration;

export default function (params: Configuration) {
  const z = IS_DEV;
  return merge(defConfig, params);
}
