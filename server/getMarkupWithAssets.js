const fs = require('fs')
const path = require('path')
const paths = require('../config/paths')
const stat = require('../webpack-assets.json')

const webpackManifest = fs.readFileSync(
  path.join(paths.public, stat.manifest.js),
  'utf-8'
)

module.exports = function getMarkupWithAssets(filepath) {
  const markup = fs
    .readFileSync(filepath, 'utf-8')
    .replace('__CSS__', stat.main.css)
    .replace('__VENDOR__', stat.vendor.js)
    .replace('__MAIN__', stat.main.js)
    .replace('__INLINED_WEBPACK_MANIFEST__', webpackManifest)

  return markup
}
