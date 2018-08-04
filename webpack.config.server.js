const merge = require('webpack-merge')
const NodemonPlugin = require('nodemon-webpack-plugin')
const common = require('./webpack.config.comon')

module.exports = merge(common, {
  target: 'node',
  node: {
    __dirname: false
  },
  entry: './src/server.tsx',
  output: {
    filename: 'server.js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      },
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto",
      }
    ]
  }
})
