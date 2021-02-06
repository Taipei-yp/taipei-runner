import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { IS_DEV } from "../utils";

export default {
  client: {
    test: /\.css$/,
    use: [
      IS_DEV && "style-loader",
      !IS_DEV && MiniCssExtractPlugin.loader,
      {
        loader: "css-loader",
        options: {
          importLoaders: 1,
          sourceMap: IS_DEV,
        },
      },
      "postcss-loader",
    ].filter(Boolean),
  },
  server: {
    test: /\.css$/,
    loader: "null-loader",
  },
};
