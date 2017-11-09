require('dotenv').config({silent: true});
const webpack = require('webpack');
const path = require('path');
const pkg = require(__dirname + '/package.json');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

const siteJs = path.resolve(__dirname, 'src', 'scripts', 'site.js');
const siteCss = path.resolve(__dirname, 'src', 'styles', 'app.scss');

const config = {
  devtool: IS_PRODUCTION ? false : 'source-map',
  entry: [
    siteCss,
    siteJs
  ],
  module: {
    rules: [
      {
        test: /\.(sass|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'sass-loader']
        })
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: './scripts/site-bundle.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      '__DEBUG__': JSON.stringify(!IS_PRODUCTION)
    }),

    new ExtractTextPlugin({
      filename: './styles/app.css',
      allChunks: true
    }),

    new webpack.optimize.UglifyJsPlugin({
      beautify: !IS_PRODUCTION,
      compress: IS_PRODUCTION ? {
        drop_console: true, // eslint-disable-line camelcase
        warnings: false
      } : false,
      mangle: IS_PRODUCTION ? {
          except: ['_'] // don't mangle lodash
      } : false
    })
  ]
}

module.exports = config;
