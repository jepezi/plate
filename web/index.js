import './index.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import {match, Router, browserHistory} from 'react-router'
import routes from './routes'
import {createStore} from 'redux'

function counter(state = 0, action) {
  switch (action.type) {
  case 'INCREMENT':
    return state + 1
  case 'DECREMENT':
    return state - 1
  default:
    return state
  }
}
const store = createStore(counter)
store.subscribe(() => console.warn(store.getState()))
console.warn(store.getState())
store.dispatch({type: 'INCREMENT'})

match(
  { history: browserHistory, routes },
  (error, redirectLocation, renderProps) => {
    ReactDOM.render(
      <Router {...renderProps} />,
      document.getElementById('app')
    )
  }
)
