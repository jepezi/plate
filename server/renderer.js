const fs = require('fs')
const path = require('path')

const isProd = process.env.NODE_ENV === 'production'

let renderer = isProd ? require('./csr.prod') : require('./csr.dev')

module.exports = renderer
