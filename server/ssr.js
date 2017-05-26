const path = require('path')
const responder = require('./responder')

// Pull in our compiled renderer
const matchRoute = require(
  path.join(__dirname, '..', 'public/build/static/js/matchRoute.js')
).default

module.exports = function(req, res) {
  return matchRoute(req)
    .then(responder(res))
}
