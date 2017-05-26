const webpack = require('webpack')
const path = require('path')
const vendors = require('./vendors')
const babelLoader = require('./utils/babelLoader.js')
const cssLoader = require('./utils/cssLoader.js')
const imageLoader = require('./utils/imageLoader.js')
const AssetsPlugin = require('assets-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  bail: true,
  target: 'node',
  // devtool: 'source-map',
  entry: {
    main: [
      require.resolve('./polyfills-server'),
      path.resolve(__dirname, '..', 'server/matchRoute.js')
    ]
  },
  output: {
    path: path.resolve(__dirname, '..', 'public', 'build'),
    filename: 'static/js/matchRoute.js',
    publicPath: '/build/',
    libraryTarget: 'commonjs2'
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      babelLoader.server,
      cssLoader.module.server,
      cssLoader.nonmodule.server,
      imageLoader
    ]
  },
  resolve: {
    modules: [path.resolve(__dirname, '..', 'web'), 'node_modules']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    })
  ],
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    dns: 'empty',
    crypto: 'empty'
  }
}
