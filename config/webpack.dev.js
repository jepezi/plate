const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: './web/index.js',
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
              presets: ['env', 'stage-2']
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
