const path = require("path");
const HttpWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: "./src/index.ts",
  output: {
    filename: "index.[hash:8].bundle.js",
    path: path.resolve(__dirname, "dist"), //获取输出路径
  },
  mode: "development", // 整个mode 可以不要，模式是生产坏境就是压缩好对，这里配置开发坏境方便看生成对代码
  plugins: [
    new CleanWebpackPlugin(),
    new HttpWebpackPlugin({
      title: "virtual-dom",
      template: "./public/index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
  devServer: {
    port: 7777
  }
};
