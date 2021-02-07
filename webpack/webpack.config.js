const webpackClientConfig = require("./webpack.client");
const webpackServerConfig = require("./webpack.server");

module.exports = [webpackServerConfig, webpackClientConfig];
