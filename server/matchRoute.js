import React from 'react'
import { match, RouterContext } from 'react-router'
import routes from '../web/routes'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import reducers from '../web/reducers'

function matchRoute(req, res) {
  const store = createStore(reducers)
  return new Promise((resolve, reject) => {
    match(
      { routes, location: req.url },
      (error, redirectLocation, renderProps) => {
        if (error) {
          resolve({ error })
        } else if (redirectLocation) {
          resolve({
            redirect: {
              url: redirectLocation.pathname + redirectLocation.search
            }
          })
        } else if (renderProps) {
          resolve({
            element: (
              <Provider store={store}>
                <RouterContext {...renderProps} />
              </Provider>
            )
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
