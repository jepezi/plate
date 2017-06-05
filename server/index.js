const express = require('express')
const path = require('path')
const compression = require('compression')
const proxy = require('http-proxy-middleware')
const renderer = require('./renderer')
const paths = require('../config/paths')

const app = express()
if (process.env.NODE_ENV === 'production') {
  app.use(compression())
}
app.use('/api', proxy({target: 'http://localhost:3000', changeOrigin: true}))
app.use(express.static(paths.public))
app.use(renderer)
app.listen(8000, () => {
  console.warn('running at http://localhost:8000')
})
