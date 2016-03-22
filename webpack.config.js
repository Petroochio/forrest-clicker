/* eslint-disable */
var path = require('path');

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
};
