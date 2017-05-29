import './index.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import {match, Router, browserHistory} from 'react-router'
import routes from './routes'
import {createStore} from 'redux'
import { Provider } from 'react-redux'
import reducers from './reducers'

const store = createStore(reducers)
// store.subscribe(() => console.warn(store.getState()))
// console.warn(store.getState())
// store.dispatch({type: 'INCREMENT'})

match(
  { history: browserHistory, routes },
  (error, redirectLocation, renderProps) => {
    ReactDOM.render(
      <Provider store={store}>
        <Router {...renderProps} />
      </Provider>,
      document.getElementById('app')
    )
  }
)
