import React from 'react'
import css from './PostList.module.scss'
import { createFragmentContainer, createPaginationContainer, graphql } from 'react-relay'
import Post from './Post'

class PostList extends React.Component {
  render() {
    return (
      <div>
        <button onClick={this._loadMore}>More</button>
        {this._renderPosts()}
      </div>
    )
  }
  _renderPosts = () => {
    const {viewer} = this.props
    const result = viewer.posts.edges.map(e => {
      return (
        <Post
          key={`post_${e.node.title}`}
          data={e.node}
        />
      )
    })
    return result
  }
  _loadMore = () => {
    console.warn(this.props.relay.hasMore(), this.props.relay.isLoading());
    if (!this.props.relay.hasMore() || this.props.relay.isLoading()) {
      return;
    }

    this.props.relay.loadMore(
      10, // Fetch the next 10 feed items
      e => {
        console.log(e);
      },
    );
  }
}

export default createPaginationContainer(
  PostList,
  graphql`
      fragment PostList_viewer on Viewer {
        id
        posts(
          first: $count,
          after: $cursor,
        ) @connection(key: "PostList_posts") {
          edges {
            node {
              id,
              title,
              description,
            }
          },
          pageInfo {
            hasNextPage
            hasPreviousPage
            endCursor
            startCursor
          }
        }
      }
    `,
    {
    getFragmentVariables(prevVars, totalCount) {
      console.warn('getFragmentVariables', prevVars, totalCount);
      return {
        ...prevVars,
        count: totalCount,
      };
    },
    getVariables(props, vars, fragmentVariables) {
      console.warn('getVariables', vars, fragmentVariables);
      return {
        count: vars.count,
        cursor: vars.cursor,
        // in most cases, for variables other than connection filters like
        // `first`, `after`, etc. you may want to use the previous values.
        // orderBy: fragmentVariables.orderBy,
      };
    },
    query: graphql`
      query PostListPaginationQuery(
        $count: Int
        $cursor: String
      ) {
        viewer {
          # You could reference the fragment defined previously.
          ...PostList_viewer
        }
      }
    `
  }
)
// export default createFragmentContainer(
//   PostList,
//   graphql`
//     fragment PostList_viewer on Viewer {
//       posts {
//         id
//         title
//         description
//       }
//     }
//   `,
// )
