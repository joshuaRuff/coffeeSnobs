const webpack = require('webpack');

module.exports = {
  entry: './app/client.js',
  devServer: {
    historyApiFallback: true
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.json$/, loader: 'json' },
      { test: /\.scss$/, loaders: ['style-loader', 'css-loader', 'sass-loader'] },
    ],
  },
  output: {
    path: __dirname,
    filename: './app/client.min.js',
  },
  resolve: {},
  plugins: [],
};
