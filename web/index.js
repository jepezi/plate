// @flow
import './index.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import createReduxStore from './createReduxStore'
import { Provider } from 'react-redux'
import BrowserProtocol from 'farce/lib/BrowserProtocol'
import {render, createResolver} from './router'
import {ClientFetcher} from './fetcher'

import createConnectedRouter from 'found/lib/createConnectedRouter'
import getStoreRenderArgs from 'found/lib/getStoreRenderArgs'

const store = createReduxStore({
  historyProtocol: new BrowserProtocol(),
  initialState: window.__REDUXDATA__,
})
const matchContext = { store }
const ConnectedRouter = createConnectedRouter({ render });

(async () => {
  const fetcher = new ClientFetcher(
    'http://localhost:8000/api/graphql',
    window.__RELAYDATA__
  )
  const resolver = createResolver(fetcher)

  const initialRenderArgs = await getStoreRenderArgs({
    store,
    matchContext,
    resolver,
  })

  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter
        matchContext={matchContext}
        resolver={resolver}
        initialRenderArgs={initialRenderArgs}
      />
    </Provider>,
    document.getElementById('app'),
  )
})()
