const merge = require('webpack-merge')
const common = require('./webpack.config.comon')

module.exports = merge(common, {
  target: 'node',
  node: {
    __dirname: false
  },
  entry: './src/server.ts',
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
