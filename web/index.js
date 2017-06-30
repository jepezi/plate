import './index.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import routes from './routes'
// import configureStore from './store/configureStore'

import BrowserProtocol from 'farce/lib/BrowserProtocol'
// import createFarceRouter from 'found/lib/createFarceRouter'
import createInitialFarceRouter from 'found/lib/createInitialFarceRouter'
import {historyMiddlewares, render, createResolver} from './router'
import {ClientFetcher} from './fetcher'

(async () => {
  const fetcher = new ClientFetcher('http://localhost:8000/api/graphql', window.__REDUXDATA__)
  const resolver = createResolver(fetcher)

  const Router = await createInitialFarceRouter({
    historyProtocol: new BrowserProtocol(),
    historyMiddlewares,
    routeConfig: routes,
    resolver,
    render,
  })

  ReactDOM.render(
    <Router resolver={resolver} />,
    document.getElementById('app'),
  )
})()
