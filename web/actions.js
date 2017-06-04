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
    payload: fetch('https://jsonplaceholder.typicode.com/posts?userId=1')
      .then(r => r.json())
  }
}
