import './index.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import {match, Router, browserHistory} from 'react-router'
import routes from './routes'
import {createStore, applyMiddleware} from 'redux'
import { Provider } from 'react-redux'
import reducers from './reducers'
import promiseMiddleware from 'redux-promise-middleware'

function thunk({ dispatch, getState }) {
  return next => action =>
    typeof action === 'function' ?
      action(dispatch, getState) :
      next(action)
}

const store = createStore(
  reducers,
  applyMiddleware(thunk, promiseMiddleware())
)
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
