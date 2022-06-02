const path = require("path");
const miniCssPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    site: ["./assets/scripts/index.js", "./assets/styles/index.scss"],
  },
  output: {
    filename: "assets/scripts/[name].js",
    path: path.resolve(__dirname, ".tmp/dist"),
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [miniCssPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.css$/,
        use: [miniCssPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        use: ["url-loader?limit=100000"],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            "default",
            {
              discardComments: { removeAll: true },
            },
          ],
        },
      }),
    ],
  },
  plugins: [
    new miniCssPlugin({
      filename: "assets/styles/[name].css",
    }),
  ],
};
