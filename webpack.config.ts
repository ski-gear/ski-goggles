const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackIncludeAssetsPlugin = require("html-webpack-include-assets-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");

const Modules = {
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
};

const Plugins = [
  new HtmlWebpackPlugin({
    template: "./src/html/panel.html",
    filename: "panel.html",
    inject: "body",
    chunks: ["panel"]
  }),
  new HtmlWebpackPlugin({
    template: "./src/html/options.html",
    filename: "options.html",
    inject: "body",
    chunks: ["options"]
  }),
  new CopyWebpackPlugin([
    { from: "src/assets/styles/semantic-ui.css", to: "css" },
    { from: "src/assets/styles/snow.css", to: "css" },
    { from: "src/assets/styles/panel.css", to: "css" },
    {
      from: "node_modules/highlight.js/styles/atom-one-light.css",
      to: "css/highlight.css"
    },
    {
      from: "node_modules/jsondiffpatch/public/formatters-styles/html.css",
      to: "css/jsondiffpatch.css"
    },
    { from: "src/assets/fonts", to: "css/themes/default/assets/fonts" },
    {
      from: "src/assets/images",
      to: "images",
      ignore: ["dev/**/*", ".DS_Store"]
    },
    {
      from: "node_modules/ski-providers/assets/images/providers",
      to: "images/providers"
    },
    { from: "src/chrome/manifest.json", to: "manifest.json" }
  ]),
  new HtmlWebpackIncludeAssetsPlugin({
    assets: ["css/highlight.css", "css/panel.css", "css/jsondiffpatch.css"],
    append: false,
    files: ["panel.html"]
  }),
  new HtmlWebpackIncludeAssetsPlugin({
    assets: ["css/semantic-ui.css"],
    append: false,
    files: ["panel.html", "options.html"]
  }),
  new HtmlWebpackIncludeAssetsPlugin({
    assets: ["css/snow.css"],
    append: false,
    files: ["options.html"]
  }),
  new HtmlWebpackPlugin({
    template: "./src/html/devtools.html",
    filename: "devtools.html",
    inject: "head",
    chunks: ["devtools"]
  }),
  new webpack.EnvironmentPlugin(["NODE_ENV"])
];

const DevPlugins = [
  new CopyWebpackPlugin([
    { from: "src/assets/images/dev/ski-goggles-48.png", to: "images/ski-goggles-48.png", toType: 'file', force: true },
    { from: "src/assets/images/dev/ski-goggles-expanded.png", to: "images/ski-goggles-expanded.png", toType: 'file', force: true },
  ]),
];

const AllPlugins = env => env.NODE_ENV === "dev" ? Plugins.concat(DevPlugins) : Plugins;

const Config = env => {
  return {
    ...Modules,

    entry: {
      panel: "./src/Panel.tsx",
      background: "./src/chrome/Background.ts",
      devtools: "./src/chrome/Devtools.ts",
      options: "./src/Options.tsx",
    },
    output: {
      path: path.resolve("dist/chrome"),
      filename: "[name].js",
    },
    resolve: {
      extensions: ["*", ".ts", ".tsx", ".js", ".json"],
    },
    plugins: AllPlugins(env),
  };
};

module.exports = env => {
  return Config(env || {})
};
