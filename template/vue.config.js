const webpack = require("webpack");
const path = require("path");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
// gzip资源匹配正则
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;

const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
function resolve(dir) {
  return path.join(__dirname, dir);
}
const { name } = require("./package.json");

let webpackPlugins = [];
if (process.env.NODE_ENV === "production") {
  webpackPlugins = [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new CompressionWebpackPlugin({
      filename: "[path].gz[query]", // 目标资源名称
      algorithm: "gzip",
      test: productionGzipExtensions, // 处理所有匹配此 {RegExp} 的资源
      threshold: 10240, // 只处理比这个值大的资源。按字节计算(10KB)
      minRatio: 0.8, // 只有压缩率比这个值小的资源才会被处理
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        output: {
          comments: false, // 去掉注释
        },
      },
      sourceMap: true,
      parallel: true,
    }),
  ];
}

module.exports = {
  // 选项...
  publicPath: `/${name}/`,
  css: {
    sourceMap: true,
    loaderOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  productionSourceMap: false,
  configureWebpack: {
    plugins: webpackPlugins,
    resolve: {
      alias: {
        "@ant-design/icons/lib/dist$": path.resolve(
          __dirname,
          "./src/configs/icons.js"
        ),
      },
      mainFiles: ["index"],
    },
    devtool: "source-map",
  },
  devServer: {
    port: 8001,
    disableHostCheck: true,
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set("@$", resolve("src"))
      .set("assets", resolve("src/assets"))
      .set("components", resolve("src/components"))
      .set("views", resolve("src/views"))
      .set("api", resolve("src/api"));
  },
};
