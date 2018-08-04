const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')
const clientConfig = require('./webpack.config.client')

module.exports = merge(clientConfig, {
  mode: 'development',
  devtool: 'cheap-eval-inline-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    port: 3000,
    historyApiFallback: true,
    hot: true,
    proxy: {
      '*': 'http://localhost:4000'
    }
  }
})
