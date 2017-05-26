import React from 'react'
import App from './App/App'
import Home from './Home/Home'
import About from './About/About'

const routes = {
  path: '/',
  component: App,
  indexRoute: { component: Home },
  childRoutes: [
    { path: 'about', component: About },
  ]
}

export default routes
