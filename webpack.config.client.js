const merge = require('webpack-merge')
const common = require('./webpack.config.comon')

module.exports = merge(common, {
  entry: './src/browser/index.tsx',
  devtool: 'cheap-eval-inline-source-map',
  output: {
    filename: 'main.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['babel-loader', 'awesome-typescript-loader']
      }
    ]
  }
})
