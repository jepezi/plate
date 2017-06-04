import React from 'react'
import { match, RouterContext } from 'react-router'
import routes from '../web/routes'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import configureStore from '../web/store/configureStore'
import {fetchPosts} from '../web/actions'

function matchRoute(req, res) {
  const store = configureStore()
  // await store.dispatch(fetchPosts())
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

          resolve({
            element: (
              <Provider store={store}>
                <RouterContext {...renderProps} />
              </Provider>
            ),
            store
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
