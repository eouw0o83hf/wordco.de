const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  context: path.resolve(__dirname, "src"),

  devtool: "source-map",

  entry: ["babel-polyfill", "./main.js"],

  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "",
    filename: "bundle.[hash].min.js"
  },

  resolve: {
    modules: [path.resolve(__dirname, "src"), "node_modules"],
    extensions: [".js", ".jsx", ".css", ".json", ".txt"],
    alias: {
      components: path.resolve(__dirname, "src/components")
    }
  },

  plugins: [
    new ExtractTextPlugin("style.css"),
    new CleanWebpackPlugin(["dist"], {
      verbose: false,
      dry: false
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.DefinePlugin({
      __DEVELOPMENT__: false,
      "process.env.NODE_ENV": JSON.stringify("production")
    }),
    new HtmlWebpackPlugin({
      title: "wordco.de",
      template: "index.ejs"
    }),
    new CopyWebpackPlugin([
      {
        from: "content/english.txt",
        to: "content/english.txt",
        toType: "file"
      }
    ])
  ],

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "autoprefixer-loader", options: { browsers: "last 2 versions" } }
        ]
      },
      {
        test: /\.(ttf|eot|svg|woff|txt)(\?[a-z0-9]+)?$/,
        use: [{ loader: "file-loader?name=[path][name].[ext]" }]
      },
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader"
          }
        ]
      }
    ]
  }
};
