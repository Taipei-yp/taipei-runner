const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { IS_DEV } = require("../utils");

module.exports = {
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
