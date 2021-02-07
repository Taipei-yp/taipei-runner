import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { IS_DEV } from "../utils";

const usedRules = () => {
  const rules = [];
  if (IS_DEV) {
    rules.push("style-loader");
  } else {
    rules.push(MiniCssExtractPlugin.loader);
  }
  rules.push({
    loader: "css-loader",
    options: {
      importLoaders: 1,
      sourceMap: IS_DEV,
    },
  });
  rules.push("postcss-loader");
  return rules;
};

export default {
  client: {
    test: /\.css$/,
    use: usedRules(),
  },
  server: {
    test: /\.css$/,
    loader: "null-loader",
  },
};
