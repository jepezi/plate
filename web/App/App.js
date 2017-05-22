import React from 'react'
import css from './App.module.scss'

class App extends React.Component {
  render() {
    return (
      <div className={css.container}>
        <h1 className={css.heading1}>Hello</h1>
        <div className={css.pug}>
          <div className={css.caption}>Pug is the best</div>
        </div>
      </div>
    )
  }
}

export default App
