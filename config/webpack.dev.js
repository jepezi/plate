const webpack = require('webpack')
const path = require('path')
const paths = require('./paths')
const babelLoader = require('./utils/babelLoader.js')
const cssLoader = require('./utils/cssLoader.js')
const imageLoader = require('./utils/imageLoader.js')

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    main: [
      require.resolve('./polyfills-client'),
      path.resolve(paths.src, 'index.js')
    ]
  },
  output: {
    filename: '[name].js',
    path: paths.build,
    publicPath: 'http://localhost:8001/'
  },
  module: {
    rules: [
      babelLoader.dev,
      cssLoader.module.dev,
      cssLoader.nonmodule.dev,
      imageLoader,
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: false,
      debug: true
    }),

    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ],
  devServer: {
    port: 8001,
    inline: true,
    hotOnly: true,
    headers: { 'Access-Control-Allow-Origin': 'http://localhost:8000' },
    noInfo: true,
    historyApiFallback: true,
    compress: true
  }
}
