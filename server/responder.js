const path = require('path')
const React = require('react')
const ReactDOMServer = require('react-dom/server')
const serialize = require('serialize-javascript')
const getMarkupWithAssets = require('./getMarkupWithAssets')
const paths = require('../config/paths')

// Make markup string that has main, vendor, and inlined webpack manifest
const filepath = path.resolve(paths.public, 'ssr.html')
const markup = getMarkupWithAssets(filepath)

module.exports = function(res) {
  return ({ error, redirect, status, element, store }) => {
    if (error) {
      return res.status(500).send(error.message)
    }
    if (redirect) {
      return res.redirect(302, redirect.url)
    }

    const CONTENT = ReactDOMServer.renderToString(element)
    const DATA = store.getState()
    const html = markup
      .replace('__CONTENT__', CONTENT)
      .replace('__DATA__', serialize(DATA))
    return res.send(html)
  }
}
