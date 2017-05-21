const webpack = require('webpack')
const path = require('path')

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    main: [
      require.resolve('./polyfills-client'),
      path.resolve(__dirname, '..', 'web/index.js')
    ]
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '..', 'public/dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  'env',
                  {
                    targets: {
                      ie: 9
                    },
                    modules: false,
                    useBuiltIns: false,
                    loose: true,
                    debug: true
                  }
                ],
                'stage-2',
                'react'
              ],
              plugins: [
                [
                  'transform-runtime',
                  {
                    helpers: true,
                    polyfill: false,
                    regenerator: true // includes regenerator runtime
                  }
                ]
              ]
            }
          }
        ]
      }
    ]
  },
  devServer: {
    port: 8001,
    inline: true
  }
}
