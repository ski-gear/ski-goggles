import path from 'path';;
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

let baseConfig = {
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  }
};

const IndexHtmlWebPackConfig = new HtmlWebpackPlugin({
  template: './src/panel.html',
  filename: 'panel.html',
  inject: 'body'
});

let panelConfig = {
  ...baseConfig,
  name: 'panel',
  entry: './src/panel.js',
  output: {
    path: path.resolve('dist'),
    filename: 'panel_bundle.js'
  },
  plugins: [IndexHtmlWebPackConfig]
};

console.log(panelConfig);

module.exports = {
  ...panelConfig
};
