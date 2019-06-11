'use strict'

const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = (env, argv) => {
  const isProduction = false
  const publicPath = isProduction ? '' : '/'


  const webpackConfig = {

    stats: {
      publicPath: true,
      chunks: false,
      modules: false,
      children: false,
      entrypoints: false,
      chunkModules: false,
    },

    devtool: 'source-map',

    entry: './src/index.js',

    output: {
      path: path.join(__dirname, 'dist/s/cashier'),
      publicPath,
      filename: isProduction ? `asset/[name]-${pkg.version}-[chunkhash].js` : 'asset/[name].js',
      chunkFilename: isProduction ? `asset/[name]-${pkg.version}-[chunkhash].js` : 'asset/[name].js',
    },

    resolve: {
      extensions: [
        '.js', '.json', '.less',
      ],
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        }
      ],
    },

    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: '!!awesome-ejs-compiled-loader!src/index.html',
        inject: true,
        minify: {},
      }),
    ],

    devServer: {
      historyApiFallback: true,
      hot: true,
      host: 'localhost',
      port: '8080',
      contentBase: './',
      stats: 'errors-only',
      open: process.env.NODE_ENV !== 'test',

    },

  }



  return webpackConfig
}

