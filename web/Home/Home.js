import React from 'react'
import css from './Home.module.scss'
import { connect } from 'react-redux'
import {loadPosts} from '../actions'
import fetchData from '../fetchData'
import { gql, graphql } from 'react-apollo'

class Home extends React.Component {
  render() {
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
    const {data: {viewer, error}} = this.props
    if (error != null) {
      return (
        <p>There is error</p>
      )
    }
    if (viewer == null) {
      return (
        <p>loading...</p>
      )
    }
    const result = viewer.posts.map(e => {
      return (
        <div key={`post_${e.title}`}>{e.title}</div>
      )
    })
    return result
  }
}

const WithData = graphql(gql`
  query {
    viewer {
      id
      posts {
        id
        title
        description
      }
    }
  }
`)(Home)

export default WithData

// function mapState(s) {
//   return {
//     posts: s.posts,
//   }
// }
//
// const Connected = connect(
//   mapState,
// )(Home)
//
// const Fetched = fetchData((store) => {
//   return store.dispatch(loadPosts())
// })(Connected)
//
// export default Fetched
