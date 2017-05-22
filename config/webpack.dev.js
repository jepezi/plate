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
    publicPath: 'http://localhost:8001/'
  },
  module: {
    rules: [
      { // any.js
        test: /.js$/,
        include: path.resolve(__dirname, '..', 'web'),
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
                'react',
                'react-hmre'
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
      },
      { // any.scss
        test: /.s?css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: loader => [require('autoprefixer')()]
            }
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: [path.resolve(__dirname, '../web')]
            }
          }
        ]
      },
      { // any images
        test: /\.(jpe?g|png|gif|bmp)$/,
        loader: 'url-loader',
        options: {
          limit: 50000
        }
      }
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
