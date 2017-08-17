import path from 'path';;
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import HtmlWebpackIncludeAssetsPlugin from 'html-webpack-include-assets-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

let baseConfig = {
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  }
};

const IndexHtmlPlugins = [
  new HtmlWebpackPlugin({
    template: './src/panel.html',
    filename: 'panel.html',
    inject: 'body'
  }),
  new CopyWebpackPlugin([
    { from: 'src/styles/semantic-ui.css', to: 'css/'}
  ]),
  new HtmlWebpackIncludeAssetsPlugin({
    assets: ['css/semantic-ui.css'],
    append: false
  })
];

let panelConfig = {
  ...baseConfig,
  name: 'panel',
  entry: './src/panel.js',
  output: {
    path: path.resolve('dist'),
    filename: 'panel_bundle.js'
  },
  plugins: IndexHtmlPlugins
};

console.log(panelConfig);

module.exports = {
  ...panelConfig
};
