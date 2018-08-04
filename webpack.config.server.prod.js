const merge = require('webpack-merge')
const serverConfig = require('./webpack.config.server')

module.exports = merge(serverConfig, {
  mode: 'production'
})
