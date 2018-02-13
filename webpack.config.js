const webpack = require('webpack');

module.exports = {
  entry: './app/client.js',
  devServer: {
    historyApiFallback: true,
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.json$/, loader: 'json' },
      { test: /\.scss$/, loaders: ['style-loader', 'css-loader', 'sass-loader'] },
      { test: /\.css$/, loaders: ['style-loader', 'css-loader'] },
    ],
  },
  output: {
    path: __dirname,
    filename: './client.min.js',
  },
  resolve: {},
  plugins: [],
};
