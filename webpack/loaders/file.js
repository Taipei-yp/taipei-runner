const fileRegex = /\.(?:ico|gif|png|jpg|jpeg|woff(2)?|eot|ttf|otf|svg|ogg|wav|aiff)$/i;
module.exports = {
  client: {
    type: "test",
    test: fileRegex,
  },
  server: {
    loader: "null-loader",
    test: fileRegex,
  },
};
