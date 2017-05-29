import React from 'react'
import css from './Home.module.scss'

class Home extends React.Component {
  state = {data: null}
  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/posts?userId=1')
      .then(r => r.json())
      .then(r => this.setState({data: r}))
  }
  render() {
    console.warn(this.state)
    return (
      <div>
        <div className={css.pug}>
          <div className={css.caption}>Pug is the best</div>
        </div>
        <div>
          {this.state.data && this.state.data.map(e => {
            return (
              <div key={`post_${e.title}`}>{e.title}</div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default Home
