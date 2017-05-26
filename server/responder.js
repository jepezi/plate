const path = require('path')
const React = require('react')
const ReactDOMServer = require('react-dom/server')
const getMarkupWithAssets = require('./getMarkupWithAssets')

// Make markup string that has main, vendor, and inlined webpack manifest
const filepath = path.resolve(__dirname, '..', 'public', 'ssr.html')
const markup = getMarkupWithAssets(filepath)

module.exports = function(res) {
  return ({ error, redirect, status, element }) => {
    if (error) {
      return res.status(500).send(error.message)
    }
    if (redirect) {
      return res.redirect(302, redirect.url)
    }

    const CONTENT = ReactDOMServer.renderToString(element)
    const html = markup.replace('__CONTENT__', CONTENT)
    return res.send(html)
  }
}
