import React from 'react'
import Route from 'found/lib/Route'
import { graphql } from 'react-relay'

import App from './App/App'

const routes = [{
  path: '/',
  Component: App,
  children: [
    {
      getComponent: () => (
        import('./Home/Home').then(module => module.default)
      ),
      query: graphql`
        query routes_Home_Query($count: Int, $cursor: String) {
          viewer {
            ...Home_viewer
          }
        }
      `,
      prepareVariables: params => ({ ...params, count: 10, cursor: null }),
      // render: ({ Component, props }) => {
      //   console.warn(Component, props)
      //   return (
      //     Component && props ? (
      //       <Component {...props} />
      //     ) : (
      //       <div><small>Loading</small></div>
      //     )
      //   )
      // },
    },
    {
      path: 'about',
      getComponent: () => (
        import('./About/About').then(module => module.default)
      ),
    },
  ]
}]

export default routes
