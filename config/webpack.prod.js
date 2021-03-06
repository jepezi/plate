const webpack = require('webpack')
const path = require('path')
const paths = require('./paths')
const vendors = require('./vendors')
const babelLoader = require('./utils/babelLoader.js')
const cssLoader = require('./utils/cssLoader.js')
const imageLoader = require('./utils/imageLoader.js')
const AssetsPlugin = require('assets-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  bail: true,
  entry: {
    main: path.resolve(paths.src, 'index.js'),
    vendor: [require.resolve('./polyfills-client')].concat(vendors)
  },
  output: {
    path: paths.build,
    filename: 'js/[name].[chunkhash].js',
    chunkFilename: 'js/[name].[chunkhash].chunk.js',
    publicPath: '/build/'
  },
  module: {
    rules: [
      babelLoader.prod,
      cssLoader.module.prod,
      cssLoader.nonmodule.prod,
      imageLoader
    ]
  },
  resolve: {
    modules: [paths.src, 'node_modules']
  },
  recordsPath: path.resolve(paths.root, 'webpack-records.json'),
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      // Add 'manifest' to create 'manifest' chunk.
      // This will create a small manifest.[chunkhash].js file, which contains ONLY webpack bootstrap code AND manifest mapping hash, which was moved here from vendor.[chunkhash].js file. Now vendor chunk contains only vendor source file. Since manifest chunk contains webpack bootstrap and mapping, we need to INLINE it into html head section BEFORE any other chunks.
      names: ['vendor', 'manifest'],
      minChunks: Infinity
    }),
    // This CommonsChunkPlugin section tells webpack to find common chunks of all chunks and create new chunk that got loaded asynchronously. Useful for code splitting chunks that contain common chunks.
    // `children: true` = find common modules from all children in `names` chunks (names is omitted here meaning all chunks)
    // If we don't set `async: true`, common modules found above will be moved to parent (main.[chunkhash].js). async tells webpack to async load them in parallel.
    new webpack.optimize.CommonsChunkPlugin({
      children: true,
      async: true,
      minChunks: 4 // number of chunks containing a module before it's moved into common chunk. Must be >= 4.
    }),
    new ExtractTextPlugin({
      filename: 'css/[name].[contenthash].css',
      allChunks: true
    }),
    new AssetsPlugin({
      filename: 'webpack-assets.json',
      path: path.resolve(__dirname, '..'),
      prettyPrint: true
    }),
    new webpack.SourceMapDevToolPlugin({
      test: /.js$/,
      filename: '[file].map',
      append: '\n//# sourceMappingURL=/build/js/[url]'
    }),
    new webpack.SourceMapDevToolPlugin({
      test: /.css$/,
      filename: '[file].map',
      append: '\n//# sourceMappingURL=/build/css/[url]'
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false,
        unused: true,
        dead_code: true
      },
      output: {
        comments: false
      },
      sourceMap: true
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
