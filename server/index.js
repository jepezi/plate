const express = require('express')
const path = require('path')
const compression = require('compression')
const renderer = require('./renderer')

const publicPath = path.resolve(__dirname, '..', 'public')

const app = express()
if (process.env.NODE_ENV === 'production') {
  app.use(compression())
}
app.use(express.static(publicPath))
app.use(renderer)
app.listen(8000, () => {
  console.warn('running at http://localhost:8000')
})
