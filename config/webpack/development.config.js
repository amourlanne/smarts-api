const path = require('path');
const NodemonPlugin = require('nodemon-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin/dist/clean-webpack-plugin');

module.exports = {
  entry: path.resolve('src', 'index.ts'),
  devtool: 'inline-source-map',
  target: 'node',
  node: {
    __dirname: false,
  },
  mode: 'development',
  watch: true,
  watchOptions: {
    ignored: /node_modules/,
  },
  output: {
    path: path.resolve('build'),
    filename: 'main.bundle.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: 'ts-loader',
        },
      },
    ],
  },
  plugins: [new CleanWebpackPlugin(), new OpenBrowserPlugin({ url: 'http://localhost:3000' })],
};
