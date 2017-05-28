const path = require('path')
const responder = require('./responder')
const paths = require('../config/paths')

// Pull in our compiled renderer
const matchRoute = require(
  path.resolve(paths.build, 'js/matchRoute.js')
).default

module.exports = function(req, res) {
  return matchRoute(req)
    .then(responder(res))
}
