var webpack = require('webpack')
var path = require('path')

module.exports = {
  entry: ['whatwg-fetch', './index.js'],

  output: {
    path: 'public',
    filename: 'bundle_201609131044.js',
    publicPath: '/'
  },
  plugins: process.env.NODE_ENV === 'production' ? [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ] : [],

  devServer: {
    inline:true,
    contentBase: 'public',
    port: 8080,
    host: '0.0.0.0',
    historyApiFallback: true,
    proxy: {
      '/api/*': {
        target: 'http://127.0.0.1:3000',
        rewrite: function(req) {
          req.url = req.url.replace(/^\/api/, '\/backend');
        }
      }
    },
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
      { test: /\.css$/, loader: "style!css" },
      { test: /\.scss$/, loaders: ["style", "css", "sass"]},
      { test: /\.less$/, loaders: ["style", "css", "less"]}
    ]
  }
}
