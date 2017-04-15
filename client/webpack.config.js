const { resolve } = require('path')
const webpack = require('webpack')

const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: [
    './index.js'
  ],
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  resolve: {
    alias: {
      app: resolve(__dirname, 'app'),
      presentation: resolve(__dirname, 'presentation')
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          'postcss-loader'
        ]
      }
    ],
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new HTMLWebpackPlugin()
  ],
  devtool: 'inline-source-map',
  devServer: {
    contentBase: resolve(__dirname, 'dist'),
    publicPath: '/',
    historyApiFallback: true
  },
};
