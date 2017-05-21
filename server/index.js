const express = require('express')
const path = require('path')
const renderer = require('./renderer')

const publicPath = path.resolve(
  __dirname,
  '..',
  'public'
)

const app = express()
app.use(express.static(publicPath))
app.use(renderer)
app.listen(8000, () => {
  console.warn('running at http://localhost:8000')
})
