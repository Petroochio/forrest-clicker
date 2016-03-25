/* eslint-disable */
var path = require('path');
var Copy = require('copy-webpack-plugin');

module.exports = {
  entry: {
    app: './src/app.js',
  },

  output: {
    path: path.resolve('build'),
    filename: 'app.js',
    publicPath: '/build/',
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'src'),
        ],
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },

  plugins: [
    new Copy([{ from: 'static' }])
  ],
};
