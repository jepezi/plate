const fs = require('fs')
const path = require('path')

const isProd = process.env.NODE_ENV === 'production'
const isSSR = process.env.SSR === '1' || process.env.SSR === 'true'

let renderer
if (isSSR) {
  renderer = require('./ssr')
} else {
  renderer = isProd ? require('./csr.prod') : require('./csr.dev')
}

module.exports = renderer
