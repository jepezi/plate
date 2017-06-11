import './index.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import {match, Router, browserHistory} from 'react-router'
import routes from './routes'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo'

const store = configureStore(window.__REDUXDATA__)
// store.subscribe(() => console.warn(store.getState()))
// console.warn(store.getState())
// store.dispatch({type: 'INCREMENT'})

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:8000/api/graphql'
})

const client = new ApolloClient({
  networkInterface: networkInterface
})

match(
  { history: browserHistory, routes },
  (error, redirectLocation, renderProps) => {
    ReactDOM.render(
      <ApolloProvider client={client}>
        <Router {...renderProps} />
      </ApolloProvider>,
      document.getElementById('app')
    )
  }
)
