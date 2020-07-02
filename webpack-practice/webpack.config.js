const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  // 入口
  entry: {
    // 多入口
    index: "./src/index.js",
    b: "./src/b.js",
  },
  // 出口
  output: {
    path: path.join(__dirname, "./dist"),
    filename: "[name].[hash:8].bundle.js",
  },
  // 环境
  mode: "development",
  // 开发服务器
  devServer: {
    port: 3000,
    publicPath: "/",
    open: true,
    hot: true,
  },
  // 插件
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./public/index.html",
      title: "自定义title",
      hash: true,
      minify: {
        // 压缩代码
        removeAttributeQuotes: true,
        // collapseWhitespace: true
      },
      chunks: ["index"],
    }),
    new HtmlWebpackPlugin({
      filename: "b.html",
      template: "./public/index.html",
      title: "自定义title",
      hash: true,
      minify: {
        // 压缩代码
        removeAttributeQuotes: true,
        // collapseWhitespace: true
      },
      chunks: ["b"],
    }),
    new MiniCssExtractPlugin(),
  ],
  module: {
    rules: [
      {
        test: /.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: true,
            },
          },
          "css-loader",
        ],
      },
      {
        test: /.less$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "less-loader" },
        ],
      },
    ],
  },
};
