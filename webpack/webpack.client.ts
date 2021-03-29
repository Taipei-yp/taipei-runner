import { CleanWebpackPlugin } from "clean-webpack-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { Configuration, DefinePlugin } from "webpack";
import { WebpackManifestPlugin } from "webpack-manifest-plugin";
import cssLoader from "./loaders/css";
import fileLoader from "./loaders/file";
import tjsLoader from "./loaders/tjs";
import { clientJsFileName, distDir, IS_DEV, rootDir, srcDir } from "./utils";

const config: Configuration = {
  entry: {
    main: srcDir("/index.tsx"),
    sw: srcDir("/sw.ts"),
  },
  output: {
    path: distDir(),
    publicPath: "/",
    filename: pathData => clientJsFileName(pathData?.chunk?.name),
    assetModuleFilename: "assets/[contenthash][ext][query]",
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ["**/*", "!server*"],
    }),
    new DefinePlugin({
      "process.env.API_HOST": JSON.stringify(
        process.env.API_HOST || "development",
      ),
    }),
    new MiniCssExtractPlugin({
      filename: "styles/[name].[contenthash].css",
      chunkFilename: "[id].css",
    }),
    new WebpackManifestPlugin(),
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
export default config;
