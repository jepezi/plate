const path = require('path')

const babelPresets = [
  [
    'env',
    {
      targets: {
        "browsers": ["last 2 versions", "ie >= 10"]
      },
      modules: false,
      useBuiltIns: false,
      loose: true,
      debug: true
    }
  ],
  'stage-2',
  'react'
]

const dev = {
  test: /.js$/,
  include: path.resolve(__dirname, '..', '..', 'web'),
  use: [
    {
      loader: 'babel-loader',
      options: {
        presets: babelPresets.concat(['react-hmre']),
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

module.exports = {
  dev, // add preset 'react-hmre'
}
