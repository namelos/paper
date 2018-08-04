const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')
const clientConfig = require('./webpack.config.client')

module.exports = merge(clientConfig, {
  mode: 'production',
  devtool: 'source-map'
})
