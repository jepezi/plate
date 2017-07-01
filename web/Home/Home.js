import React from 'react'
import css from './Home.module.scss'
// import { gql, graphql } from 'react-apollo'
import { createFragmentContainer, graphql } from 'react-relay'

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
    // const {data: {viewer, error, loading}} = this.props
    const {viewer} = this.props
    // if (error != null) {
    //   return (
    //     <p>There is error</p>
    //   )
    // }
    // if (loading) {
    //   return (
    //     <p>loading...</p>
    //   )
    // }
    const result = viewer.posts.map(e => {
      return (
        <div key={`post_${e.title}`}>{e.title}</div>
      )
    })
    return result
  }
}

export default createFragmentContainer(
  Home,
  graphql`
    fragment Home_viewer on Viewer {
      id
      posts {
        id
        title
        description
      }
    }
  `,
)

// const WithData = graphql(gql`
//   query {
//     viewer {
//       id
//       posts {
//         id
//         title
//         description
//       }
//     }
//   }
// `)(Home)
//
// export default WithData
