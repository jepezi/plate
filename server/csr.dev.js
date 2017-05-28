const fs = require('fs')
const path = require('path')
const paths = require('../config/paths')

const filepath = path.resolve(paths.public, 'csr.dev.html')
const markup = fs.readFileSync(filepath, 'utf-8')

module.exports = (req, res, next) => {
  res.send(markup)
}
