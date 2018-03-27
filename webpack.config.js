const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  resolve: {
    extensions: ['*', '.js', '.jsx', '.json']
  },
  // devtool: 'inline-source-map',
  entry: [
    path.resolve(__dirname, 'client/js/index'),
  ],
  target: 'web',
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: false,
      debug: true,
      noInfo: true // false will show every file bundled
    }),
    new HtmlWebpackPlugin({ // Creat html that has reference to bundle
      template: 'client/index.ejs',
      inject: true
    })
  ],
  module: {
    rules: [
      {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
      {test: /\.css$/, use: ['style-loader','css-loader']}
    ]
  }
}
