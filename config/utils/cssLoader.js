const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
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

// any.module.scss (prod)
const cssModuleProd = {
  test: /\.module\.s?css$/,
  use: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [
      {
        loader: 'css-loader',
        options: {
          modules: true,
          importLoaders: 2,
          localIdentName: '[hash:base64:8]',
          minimize: true
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
  })
}

// any.module.scss (server)
const cssModuleServer = {
  test: /\.module\.s?css$/,
  use: [
    {
      loader: 'css-loader/locals',
      options: {
        modules: true,
        importLoaders: 2,
        localIdentName: '[hash:base64:8]'
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

// any.scss (prod)
const cssNonModuleProd = {
  test: /^((?!\.module\.).)*\.s?css$/,
  use: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [
      {
        loader: 'css-loader',
        options: {
          importLoaders: 2,
          localIdentName: '[hash:base64:8]',
          minimize: true
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
  })
}

// any.scss (server)
const cssNonModuleServer = {
  test: /^((?!\.module\.).)*\.s?css$/,
  use: [
    'css-loader/locals',
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
    prod: cssModuleProd, // extract - css?module|post|sass
    server: cssModuleServer // use local - css/local?module|post|sass
  },
  nonmodule: {
    dev: cssNonModuleDev, // style|css|post|sass
    prod: cssNonModuleProd, // extract - css|post|sass
    server: cssNonModuleServer // use local - css/local|post|sass
  }
}
