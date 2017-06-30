import './index.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import routes from './routes'
// import configureStore from './store/configureStore'

import BrowserProtocol from 'farce/lib/BrowserProtocol'
import createFarceRouter from 'found/lib/createFarceRouter'
import {historyMiddlewares, render, createResolver} from './router'
import {ClientFetcher} from './fetcher'

const Router = createFarceRouter({
  historyProtocol: new BrowserProtocol(),
  historyMiddlewares,
  routeConfig: routes,
  render,
})

const fetcher = new ClientFetcher('http://localhost:8000/api/graphql')
const resolver = createResolver(fetcher)

ReactDOM.render(
  <Router resolver={resolver} />,
  document.getElementById('app'),
)
