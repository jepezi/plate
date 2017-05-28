const path = require('path')
const getMarkupWithAssets = require('./getMarkupWithAssets')
const paths = require('../config/paths')

const filepath = path.resolve(paths.public, 'csr.prod.html')
const markup = getMarkupWithAssets(filepath)

module.exports = (req, res, next) => {
  res.send(markup)
}
