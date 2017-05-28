const webpack = require('webpack')
const path = require('path')
const paths = require('./paths')
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
  entry: {
    main: [
      require.resolve('./polyfills-server'),
      path.resolve(paths.root, 'server', 'matchRoute.js')
    ]
  },
  output: {
    path: paths.build,
    filename: 'js/matchRoute.js',
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
    modules: [paths.src, 'node_modules']
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
