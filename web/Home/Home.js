import React from 'react'
import css from './Home.module.scss'
import { connect } from 'react-redux'
import {loadPosts} from '../actions'
import fetchData from '../fetchData'

class Home extends React.Component {
  // state = {data: null}
  // componentDidMount() {
  //   this.props.dispatch(loadPosts())
  // }
  render() {
    const {posts} = this.props
    return (
      <div>
        <div className={css.pug}>
          <div className={css.caption}>Pug is the best</div>
        </div>
        <div>
          {this._renderPosts()}
        </div>
      </div>
    )
  }
  _renderPosts() {
    const {posts} = this.props
    if (posts.isRejected) {
      return (
        <p>There is error</p>
      )
    }
    if (posts.data == null) {
      return (
        <p>loading...</p>
      )
    }
    const result = posts.data.map(e => {
      return (
        <div key={`post_${e.title}`}>{e.title}</div>
      )
    })
    return result
  }
}

function mapState(s) {
  return {
    posts: s.posts,
  }
}

const Connected = connect(
  mapState,
)(Home)

const Fetched = fetchData((store) => {
  return store.dispatch(loadPosts())
})(Connected)

export default Fetched
