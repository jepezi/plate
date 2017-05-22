import React from 'react'
import cx from 'classnames'
import css from './App.module.scss'

class App extends React.Component {
  render() {
    const containerStyles = cx(
      css.container,
      css.padding20,
    )
    const headingStyle = cx(
      css.heading1,
      'blue',
    )
    return (
      <div className={containerStyles}>
        <h1 className={headingStyle}>Hello</h1>
        <div className={css.pug}>
          <div className={css.caption}>Pug is the best</div>
        </div>
      </div>
    )
  }
}

export default App
