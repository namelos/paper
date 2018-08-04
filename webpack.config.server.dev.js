const merge = require('webpack-merge')
const NodemonPlugin = require('nodemon-webpack-plugin')
const serverConfig = require('./webpack.config.server')

module.exports = merge(serverConfig, {
  mode: 'development',
  plugins: [
    new NodemonPlugin()
  ]
})
