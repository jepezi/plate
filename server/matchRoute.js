import React from 'react'
const ReactDOMServer = require('react-dom/server')
import { match, RouterContext } from 'react-router'
import routes from '../web/routes'
import configureStore from '../web/store/configureStore'
import { ApolloClient, createNetworkInterface, ApolloProvider, getDataFromTree } from 'react-apollo'

function matchRoute(req, res) {
  const client = new ApolloClient({
    ssrMode: true,
    networkInterface: createNetworkInterface({
      uri: 'http://localhost:8000/api/graphql',
      // opts: {
      //   credentials: 'same-origin',
      //   headers: req.headers,
      // },
    }),
  })
  const store = configureStore({client})
  return new Promise((resolve, reject) => {
    match(
      { routes, location: req.url },
      async (error, redirectLocation, renderProps) => {
        if (error) {
          resolve({ error })
        } else if (redirectLocation) {
          resolve({
            redirect: {
              url: redirectLocation.pathname + redirectLocation.search
            }
          })
        } else if (renderProps) {
          // Find all static method called `fetchData` and execute, then wait for all promises to resolve. Then resolve with element. At this point, the store is filled with state already.
          const prefetchMethods = renderProps.components
            .filter(c => c.fetchData)
            .reduce((acc, c) => acc.concat(c.fetchData), [])
          const promises = prefetchMethods
            .map(prefetch => prefetch(store))
          await Promise.all(promises)

          const element = (
            <ApolloProvider client={client} store={store}>
              <RouterContext {...renderProps} />
            </ApolloProvider>
          )

          await getDataFromTree(element)

          const content = ReactDOMServer.renderToString(element)
          const data = store.getState()

          resolve({
            content,
            data
          })
        } else {
          // res.status(404).send('Not found')
          console.warn('not found', req.url)
        }
      }
    )
  })
}

export default matchRoute
