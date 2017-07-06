import React from 'react'
import { createFragmentContainer, graphql } from 'react-relay'
import PostList from '../Posts/PostList.js'

class Home extends React.Component {
  render() {
    const {viewer} = this.props
    return (
      <div>
        <h2>Latest Posts</h2>
        <div>
          <PostList viewer={viewer} />
        </div>
      </div>
    )
  }
}

export default createFragmentContainer(
  Home,
  graphql`
    fragment Home_viewer on Viewer {
      id
      ...PostList_viewer
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
