import path from 'path';;
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import HtmlWebpackIncludeAssetsPlugin from 'html-webpack-include-assets-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const Modules = {
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  }
};

const Plugins = [
  new HtmlWebpackPlugin({
    template: './src/panel.html',
    filename: 'panel.html',
    inject: 'body',
    chunks: ['panel']
  }),
  new CopyWebpackPlugin([
    { from: 'src/styles/semantic-ui.css', to: 'css/'},
    { from: 'src/fonts/icons.ttf', to: 'css/themes/default/assets/fonts/'},
    { from: 'src/fonts/icons.woff', to: 'css/themes/default/assets/fonts/'},
    { from: 'src/fonts/icons.woff2', to: 'css/themes/default/assets/fonts/'}
  ]),
  new HtmlWebpackIncludeAssetsPlugin({
    assets: ['css/semantic-ui.css'],
    append: false
  })
];

const Config = {
  ...Modules,

  entry: {
    panel: './src/panel.js',
    background: './src/background.js'
  },
  output: {
    path: path.resolve('dist'),
    filename: '[name].js'
  },

  plugins: Plugins
};

module.exports = {
  ...Config
};
