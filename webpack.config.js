var webpack = require('webpack');
var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
  devtool: 'inline-source-map',
  entry: {
    app:[
      './index'
    ],
    vendor: ['react','react-router','react-redux','isomorphic-fetch']
  },
  output: {
      path: path.resolve(__dirname, "build"),
      publicPath: '/build/', // 这个用来成成比如图片的 URL
      filename: "app.js"
  },
  plugins: [
      new webpack.optimize.CommonsChunkPlugin('vendor',  'vendor.js'),  
      new ExtractTextPlugin("[name].css"),
  ],
  module: {
    loaders: [
      // { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.css$/, loader:  ExtractTextPlugin.extract(["css-loader"])},
      {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract("style", 'css!sass') //这里用了样式分离出来的插件，如果不想分离出来，可以直接这样写 loader:'style!css!sass'
      },
      { test: /\.js$/, exclude: /node_modules/, loaders: ['babel','babel-loader']},
      // {test: /\.(png|jpg|gif)$/, loader: 'url?limit=10000'},
      { test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=50000&name=[path][name].[ext]'}
    ]
  },
  resolve:{
    react:'/node_modules/react/react.js'
  }
};
