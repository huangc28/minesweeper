const webpack = require('webpack')
const path = require('path')
const { join, resolve } = path

module.exports = env => {
  return {
    entry: [
      resolve(__dirname, 'app/index.js')
    ],
    output: {
      path: join(__dirname, 'public'),
      filename: '[name].js',
      publicPath: '/',
    },
    resolve: {
      extensions: ['', 'js']
    },
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: ['es2015']
      }
    ],
    plugins: [
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin({
        multiStep: true,
      }),
      new webpack.NoErrorsPlugin()
    ]
  }
}
