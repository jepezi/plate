import {createStore, applyMiddleware, combineReducers, compose} from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import {counter, posts} from './reducers'

import { Actions as FarceActions, createHistoryEnhancer, queryMiddleware } from 'farce'
import createMatchEnhancer from 'found/lib/createMatchEnhancer'
import foundReducer from 'found/lib/foundReducer'
import Matcher from 'found/lib/Matcher'

import routes from './routes'

function thunk({ dispatch, getState }) {
  return next => action =>
    typeof action === 'function' ?
      action(dispatch, getState) :
      next(action)
}

export default function createReduxStore({initialState, historyProtocol}) {
  const store = createStore(
    combineReducers({
      // posts,
      counter,
      found: foundReducer,
    }),
    initialState,
    compose(
      createHistoryEnhancer({
        protocol: historyProtocol,
        middlewares: [queryMiddleware],
      }),
      createMatchEnhancer(
        new Matcher(routes),
      ),
      applyMiddleware(thunk, promiseMiddleware())
    ),
  )
  store.dispatch(FarceActions.init())
  return store
}
