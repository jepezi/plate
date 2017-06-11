import {createStore, applyMiddleware, combineReducers} from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import {counter, posts} from '../reducers'

function thunk({ dispatch, getState }) {
  return next => action =>
    typeof action === 'function' ?
      action(dispatch, getState) :
      next(action)
}

export default function configureStore({initialState, client}) {
  const store = createStore(
    combineReducers({
      posts,
      counter,
      apollo: client.reducer(),
    }),
    initialState,
    applyMiddleware(client.middleware(), thunk, promiseMiddleware())
  )
  return store
}
