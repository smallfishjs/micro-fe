'use strict'

const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')


module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production'
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
      path: path.join(__dirname, 'dist/s/bindcard'),
      publicPath,
      filename: isProduction ? `asset/[name]-${pkg.version}-[chunkhash].js` : 'asset/[name].js',
      chunkFilename: isProduction ? `asset/[name]-${pkg.version}-[chunkhash].js` : 'asset/[name].js',
    },

    resolve: {
      extensions: [
        '.js', '.vue', '.json', '.less',
      ],
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        }, {
          test: /\.less$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
            {
              loader: 'less-loader',
              options: {
                strictMath: true,
                noIeCompat: true,
              },
            },
          ],
        }, {
          test: /\.svg$/,
          loader: 'svg-sprite-loader',
          include: /\/icon\/.*svg/,
          options: {
            symbolId: 'icon-[name]',
          },
        }, {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          loader: 'url-loader',
          exclude: /\/icon\/.*svg/,
          options: {
            limit: 4000,
            fallback: {
              loader: 'file-loader',
              options: {
                name: isProduction ? '[name].[hash:7].[ext]' : '[name][hash].[ext]',
                publicPath: isProduction ? '../static' : '',
                outputPath: isProduction ? 'static' : '',
              },
            },
          },
        }, {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 4000,
            fallback: {
              loader: 'file-loader',
              options: {
                name: isProduction ? '[name].[hash:7].[ext]' : '[name][hash].[ext]',
                publicPath: isProduction ? '../font' : '',
                outputPath: isProduction ? 'font' : '',
              },
            },
          },
        },
      ],
    },

    plugins: [
      new MiniCssExtractPlugin({
        filename: isProduction ? 'asset/[name].[contenthash].css' : 'asset/[name].css',
      }),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: '!!awesome-ejs-compiled-loader!src/index.html',
        inject: true,
        minify: isProduction ? {
          removeComments: true,
          collapseWhitespace: true,
          minifyJS: true,
        } : {},
      }),
    ],

    devServer: {
      historyApiFallback: true,
      contentBase: './',
      stats: 'errors-only',
      host: '0.0.0.0',
      port: '9001',
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
      }
    },

    optimization: {
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            name: 'vendors',
            test: /[\\/]node_modules[\\/]/,
            priority: 1,
          },
          default: {
            name: 'commons',
            enforce: true,
            minChunks: 2,
          },
        },
      },
    },
  }

  return webpackConfig
}

