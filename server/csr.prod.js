const fs = require('fs')
const path = require('path')
const getMarkupWithAssets = require('./getMarkupWithAssets')

const filepath = path.resolve(__dirname, '..', 'public', 'csr.prod.html')
const markup = getMarkupWithAssets(filepath)

module.exports = (req, res, next) => {
  res.send(markup)
}
