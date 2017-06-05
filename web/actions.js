export function loadPosts() {
  return (dispatch, getState) => {
    const {posts} = getState()
    if (posts.data != null) {
      return
    }
    return dispatch(fetchPosts())
  }
}

export function fetchPosts() {
  return {
    type: 'LOAD_POSTS',
    payload: fetch('http://localhost:8000/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: `query {
          viewer {
            id
            posts {
              id
              title
              description
            }
          }
        }`,
      })
    })
    // payload: fetch('http://localhost:8000/api/posts')
      .then(r => r.json())
  }
}
