const webpack = require('webpack')

module.exports = {
  entry: './index.ts',
  output: {
    filename: '../../priv/static/js/bundle.js'
  },

  devtool: 'source-map',
  resolve: {
    extensions: ['', 'webpack.js', '.ts', '.js']
  },

  // plugins: [
  //   new webpack.optimize.UglifyJsPlugin()
  // ],

  module: {
    loaders: [
      { 
        test: /\.ts?$/,
        loader: 'ts-loader'
      }
    ]
  }
}
