const path = require('path')
const webPath = path.resolve(__dirname, '..', '..', 'web')

const babelPresets = [
  [
    'env',
    {
      targets: {
        browsers: ['last 2 versions', 'ie >= 10']
      },
      modules: false,
      useBuiltIns: false,
      loose: true,
      debug: true
    }
  ],
  'stage-2',
  'react',
]

const transformRuntime = [
  'transform-runtime',
  {
    helpers: true,
    polyfill: false,
    regenerator: true // includes regenerator runtime
  }
]

const dev = {
  test: /.js$/,
  include: webPath,
  use: [
    {
      loader: 'babel-loader',
      options: {
        presets: babelPresets.concat(['react-hmre']),
        plugins: ['relay', transformRuntime]
      }
    }
  ]
}

const prod = {
  test: /.js$/,
  include: webPath,
  use: [
    {
      loader: 'babel-loader',
      options: {
        presets: babelPresets,
        plugins: [
          'relay',
          transformRuntime,
          'transform-react-inline-elements',
          'transform-react-pure-class-to-function',
          'transform-react-constant-elements'
        ]
      }
    }
  ]
}

const server = {
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
                node: 'current'
              }
            }
          ],
          'stage-2',
          'react'
        ],
        plugins: [
          'relay',
          transformRuntime,
          'transform-class-properties',
          'transform-es2015-classes'
        ]
      }
    }
  ]
}

module.exports = {
  dev, // add preset 'react-hmre'
  prod, // add plugin react optimize
  server // add plugin react optimize
}
