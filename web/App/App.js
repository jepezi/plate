import React from 'react'
import cx from 'classnames'
import css from './App.module.scss'
import Link from 'found/lib/Link'
import { createFragmentContainer, graphql } from 'react-relay'

class App extends React.Component {
  render() {
    const containerCss = cx(
      css.container,
      css.padding20,
    )
    const headingCss = cx(
      css.heading1,
      'blue',
    )
    return (
      <div className={containerCss}>
        <h1 className={headingCss}>App</h1>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
        <div className={css.content}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default App
