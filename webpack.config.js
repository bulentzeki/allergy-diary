/* eslint-env node */
var webpack = require("webpack");
var autoprefixer = require("autoprefixer");
var precss = require("precss");
var postcssUrl = require("postcss-url");
var path = require("path");

module.exports = function config(packageOpts) {
  "use strict";

  var inDevMode = packageOpts.appMode === "dev";
  var nodeModulesRoot = path.join(__dirname, "node_modules");

  var devModeEntryMap = {
    "login.": ["babel-polyfill", "./ui/login/app/index.js"]
  };
  var distModeEntryMap = {
    "public/javascripts/login.": ["babel-polyfill", "./ui/login/app/index.js"]
  };

  if (packageOpts.appModule) {
    devModeEntryMap["app."] = ["babel-polyfill", "./ui/app/index.js"];
    distModeEntryMap["public/javascripts/patient."] = ["babel-polyfill", "./ui/app/index.js"];
  }

  // if (packageOpts.dashboard) {
  //   devModeEntryMap["dashboard."] = ["babel-polyfill", "./ui/analytics/app/index.js"];
  //   distModeEntryMap["public/javascripts/dashboard."] = ["babel-polyfill", "./ui/analytics/app/index.js"];
  // }

  return {
    entry: inDevMode ? devModeEntryMap : distModeEntryMap,
    module: {
      loaders: [
        {test: /\.js?$/, exclude: /node_modules/, loader: inDevMode ? "react-hot!babel-loader" : "babel"},
        {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff"},
        {test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff"},
        {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream"},
        {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file"},
        {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml"},
        {test: /\.css$/, exclude: /node_modules/, loader: "style-loader!css-loader?modules&camelCase=dashes&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader"}
      ]
    },
    postcss: function() {
      return [autoprefixer, precss, postcssUrl];
    },
    noParse: inDevMode ? [
      path.join(nodeModulesRoot, "react"),
      path.join(nodeModulesRoot, "react-dom"),
      path.join(nodeModulesRoot, "immutable")
    ] : [],
    resolve: {
      extensions: ["", ".js", ".jsx"]
    },
    output: {
      path: __dirname,
      publicPath: inDevMode ? "http://localhost:3333/" : "./",
      filename: "[name]bundle.js"
    },
    cache: inDevMode,
    devTool: inDevMode ? "source-map" : "cheap-module-source-map",
    debug: inDevMode,
    devServer: inDevMode,
    quiet: true,
    hotComponents: inDevMode,
    plugins: inDevMode ? [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.ProvidePlugin({
        React: "react",
        ReactDOM: "react-dom",
        Immutable: "immutable",
        I: "immutable"
      })
    ] : [
      new webpack.ProvidePlugin({ // !!!!!!!!!!! PROD PLUGINS !!!!!!!!!!
        React: "react",
        ReactDOM: "react-dom",
        Immutable: "immutable",
        I: "immutable"
      }),
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: JSON.stringify("production")
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
      new webpack.optimize.DedupePlugin()
    ]
  };
};

// new CompressionPlugin({
//   asset: "[path].gz[query]",
//   algorithm: "gzip",
//   test: /\.js$|\.html$/,
//   threshold: 10240,
//   minRatio: 0.8
// })
