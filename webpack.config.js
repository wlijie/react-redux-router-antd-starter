var webpack = require('webpack');
var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
  devtool: 'inline-source-map',
  entry: {
    app:[
      // 'webpack-dev-server/client?http://0.0.0.0:3000', // WebpackDevServer host and port
      // 'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
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
      new webpack.HotModuleReplacementPlugin(),
      new webpack.optimize.CommonsChunkPlugin('vendor',  'vendor.js'),  
      new ExtractTextPlugin("[name].css"),
      new webpack.DefinePlugin({
        'process.env':{
          'NODE_ENV': JSON.stringify('development'),
        }
      }),
  ],
  module: {
    loaders: [
      { test: /\.css$/, loader:  ExtractTextPlugin.extract(["css-loader"])},
      { test: /\.scss$/, loader: ExtractTextPlugin.extract("style", 'css!sass')},//这里用了样式分离出来的插件，如果不想分离出来，可以直接这样写 loader:'style!css!sass'
      { test: /\.js$/, exclude: /node_modules/, loaders: ['react-hot','babel']},
      { test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=50000&name=[path][name].[ext]'}
    ]
  },
  resolve:{
    react:'/node_modules/react/react.js'
  }
};
