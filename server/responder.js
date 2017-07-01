const path = require('path')
const serialize = require('serialize-javascript')
const getMarkupWithAssets = require('./getMarkupWithAssets')
const paths = require('../config/paths')

// Make markup string that has main, vendor, and inlined webpack manifest
const filepath = path.resolve(paths.public, 'ssr.html')
const markup = getMarkupWithAssets(filepath)

module.exports = function(res) {
  return ({ error, redirect, status, content, data, relayData }) => {
    if (error) {
      return res.status(500).send(error.message)
    }
    if (redirect) {
      return res.redirect(302, redirect.url)
    }

    const html = markup
      .replace('___CONTENT___', content)
      .replace('___DATA___', serialize(data, { isJSON: true }))
      .replace('___RELAYDATA___', serialize(relayData, { isJSON: true }))
    return res.send(html)
  }
}
