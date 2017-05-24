const fs = require('fs')
const path = require('path')

const filepath = path.resolve(__dirname, '..', 'public', 'csr.dev.html')
const markup = fs.readFileSync(filepath, 'utf-8')

module.exports = (req, res, next) => {
  res.send(markup)
}
