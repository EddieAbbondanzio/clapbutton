const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const isDev = process.env.NODE_ENV == 'development';

module.exports = {
  entry: "./src/js/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist")
  },
  devServer: {
    open: true,
    contentBase: "dist"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    })
  ],
  module: {
    rules: [
      {
        test: /\.(s*)css$/,
        
        use: !isDev ? [
          "style-loader",
          {
            loader: "file-loader",
            options: {
              name: "[name].css"
            }
          },
          "sass-loader"
        ] 
        : ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.scss']
  }
};
