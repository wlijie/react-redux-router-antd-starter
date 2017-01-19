var webpack = require('webpack');
var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
  devtool: 'source-map',
  entry:{
    app: [
     path.resolve(__dirname, 'src/index'),
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
      { test: /\.scss$/,loader: ExtractTextPlugin.extract("style", 'css!sass')},//这里用了样式分离出来的插件，如果不想分离出来，可以直接这样写 loader:'style!css!sass'
      { test: /\.js$/, exclude: /node_modules/, loader: "babel!babel-loader"},
      { test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=50000&name=[path][name].[ext]'}
    ]
  },
  resolve:{
    react:'/node_modules/react/react.js',
  }
};
