import React from 'react'
const ReactDOMServer = require('react-dom/server')
import { match, RouterContext } from 'react-router'
import routes from '../web/routes'
import configureStore from '../web/store/configureStore'
import { getFarceResult } from 'found/lib/server'
import { ServerFetcher } from '../web/fetcher'
import {historyMiddlewares, render, createResolver} from '../web/router'

async function matchRoute(req, res) {
  const fetcher = new ServerFetcher('http://localhost:8000/api/graphql')

  const { redirect, status, element } = await getFarceResult({
    url: req.url,
    historyMiddlewares,
    routeConfig: routes,
    resolver: createResolver(fetcher),
    render,
  })

  if (redirect) {
    return {redirect}
  }

  const content = ReactDOMServer.renderToString(element)

  return {
    content,
    data: fetcher
  }
}

export default matchRoute
