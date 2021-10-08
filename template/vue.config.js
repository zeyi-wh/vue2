const webpack = require('webpack')
const envConfig = require('./src/configs/env.config')
const path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
// gzip资源匹配正则
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
function resolve (dir) {
  return path.join(__dirname, dir)
}
const { name } = require('./package.json')

let webpackPlugins = []
if (process.env.NODE_ENV === 'production') {
  webpackPlugins = [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new CompressionWebpackPlugin({
      filename: '[path].gz[query]', // 目标资源名称
      algorithm: 'gzip',
      test: productionGzipExtensions, // 处理所有匹配此 {RegExp} 的资源
      threshold: 10240, // 只处理比这个值大的资源。按字节计算(10KB)
      minRatio: 0.8 // 只有压缩率比这个值小的资源才会被处理
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        output: {
          comments: false // 去掉注释
        }
      },
      sourceMap: true,
      parallel: true
    })
  ]
}

module.exports = {
  // 选项...
  publicPath: `/sub_app/${name}/`,
  pages: {
    {{name}}_app: {
      entry: 'src/main.js',
      filename: 'index.html'
    },
    {{name}}_lib: {
      entry: 'src/lib.js',
      filename: 'lib.html'
    }
  },
  css: {
    sourceMap: true,
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  productionSourceMap: true,
  configureWebpack: {
    output: {
      // 包名，在umd模式下可以在window下访问到这个包
      library: `[name]`,
      // 把子应用打包成 umd 库格式
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_${name}`
    },
    plugins: webpackPlugins,
    devtool: 'source-map'
  },
  devServer: {
    port: 8100, // 端口号需要严格设置
    disableHostCheck: true,
    overlay: {
      warning: false,
      errors: false
    },
    historyApiFallback: {
      rewrites: [
        { from: /^\/sub_app\/{{name}}\/lib/, to: '/sub_app/{{name}}/lib.html' },
        { from: /^\/sub_app\/{{name}}\//, to: '/sub_app/{{name}}/index.html' },
        { from: /^\/sub_app\/{{name}}\/login/, to: '/sub_app/{{name}}/index.html' }
      ]
    },
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  chainWebpack: (config) => {
    config.plugin('html-{{name}}_app').tap(args => {
      args[0].envhost = envConfig.DOMAIN
      args[0].title = '{{name}}_app'
      if (process.env.NODE_ENV === 'development') {
        args[0].template = 'public/index-local.html'
      } else if (process.env.NODE_ENV === 'production') {
        args[0].template = 'public/index.html'
      }
      return args
    })
    config.plugin('html-{{name}}_lib').tap(args => {
      args[0].envhost = envConfig.DOMAIN
      args[0].title = '{{name}}_lib'
      if (process.env.NODE_ENV === 'development') {
        args[0].template = 'public/index-local.html'
      } else if (process.env.NODE_ENV === 'production') {
        args[0].template = 'public/index.html'
      }
      return args
    })
    config.plugins.delete('prefetch-{{name}}_app')
    config.plugins.delete('preload-{{name}}_app')
    config.plugins.delete('prefetch-{{name}}_lib')
    config.plugins.delete('preload-{{name}}_lib')
    config.optimization.delete('splitChunks')
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('views', resolve('src/views'))
      .set('api', resolve('src/api'))
    // externals
    config.externals({
      vue: 'Vue',
      'vue-router': 'VueRouter',
      vuex: 'Vuex',
      axios: 'axios',
      'ant-design-vue': 'antdV',
      lodash: '_',
      moment: 'moment',
      qs: 'Qs'
    })
  }
}
