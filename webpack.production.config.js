var webpack = require('webpack');
var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
  devtool: 'source-map',
  entry:{
    app: [
      "./index.js"
    ],
    vendor: ['react','react-router','react-redux','isomorphic-fetch']
  },
  output: {
      path: path.resolve(__dirname, "build"),
      publicPath: '/build/', // 这个用来成成比如图片的 URL
      filename: "app.js"
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production'),
      }
    }),
    new webpack.optimize.CommonsChunkPlugin('vendor',  'vendor.js'), 
    new ExtractTextPlugin("[name].css"),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap:true
    })
  ],
  module: {
    loaders: [
      { test: /\.css$/, loader:  ExtractTextPlugin.extract(["css-loader"])},
      // { test: /\.css$/, loader: "style-loader!css-loader"},
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
      { test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=50000&name=[path][name].[ext]'}
    ]
  },
  resolve:{
    react:'/node_modules/react/react.js',
  }
};
