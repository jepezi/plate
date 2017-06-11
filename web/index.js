import './index.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import {match, Router, browserHistory} from 'react-router'
import routes from './routes'
import configureStore from './store/configureStore'
import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo'

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:8000/api/graphql'
})

const client = new ApolloClient({
  networkInterface: networkInterface
})

const store = configureStore({initialState: window.__REDUXDATA__, client})
// store.subscribe(() => console.warn(store.getState()))
// console.warn(store.getState())
// store.dispatch({type: 'INCREMENT'})

match(
  { history: browserHistory, routes },
  (error, redirectLocation, renderProps) => {
    ReactDOM.render(
      <ApolloProvider client={client} store={store}>
        <Router {...renderProps} />
      </ApolloProvider>,
      document.getElementById('app')
    )
  }
)
