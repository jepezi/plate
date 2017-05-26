import React from 'react'
import css from './Home.module.scss'

const Home = (props) => {
  return (
    <div>
      <div className={css.pug}>
        <div className={css.caption}>Pug is the best</div>
      </div>
    </div>
  )
}

export default Home
