const path = require('path')
const webPath = path.resolve(__dirname, '../../web')

// any.module.scss (dev)
const cssModuleDev = {
  test: /\.module\.s?css$/,
  use: [
    'style-loader',
    {
      loader: 'css-loader',
      options: {
        modules: true,
        importLoaders: 2,
        localIdentName: '[name]__[local]___[hash:base64:5]'
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        plugins: loader => [require('autoprefixer')()]
      }
    },
    {
      loader: 'sass-loader',
      options: {
        includePaths: [webPath]
      }
    }
  ]
}

// any.scss (dev)
const cssNonModuleDev = {
  test: /^((?!\.module\.).)*\.s?css$/,
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
        includePaths: [webPath]
      }
    }
  ]
}

module.exports = {
  module: {
    dev: cssModuleDev, // style|css?module|post|sass
  },
  nonmodule: {
    dev: cssNonModuleDev, // style|css|post|sass
  }
}
