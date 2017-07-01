// @flow
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import routes from '../web/routes'
import configureStore from '../web/store/configureStore'
import { getFarceResult } from 'found/lib/server'
import { ServerFetcher } from '../web/fetcher'
import {historyMiddlewares, render, createResolver} from '../web/router'
import createReduxStore from '../web/createReduxStore'
import { Actions as FarceActions, ServerProtocol } from 'farce'
import { getStoreRenderArgs, resolver, RedirectException } from 'found'
import { RouterProvider } from 'found/lib/server'
import { Provider } from 'react-redux'

async function matchRoute(req, res) {
  const fetcher = new ServerFetcher('http://localhost:8000/api/graphql')
  const store = createReduxStore({
    historyProtocol: new ServerProtocol(req.url),
  })
  const matchContext = { store }
  let renderArgs

  try {
    renderArgs = await getStoreRenderArgs({
      store,
      matchContext,
      resolver: createResolver(fetcher),
    })
  } catch (e) {
    if (e instanceof RedirectException) {
      return {
        redirect: {
          url: store.farce.createHref(e.location),
        },
      }
    }

    throw e
  } finally {
    store.dispatch(FarceActions.dispose())
  }

  const element = (
    <Provider store={store}>
      <RouterProvider router={renderArgs.router}>
        {render(renderArgs)}
      </RouterProvider>
    </Provider>
  )

  const content = ReactDOMServer.renderToString(element)

  return {
    content,
    data: store.getState(),
    relayData: fetcher,
  }
}

export default matchRoute
