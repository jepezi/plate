import React from 'react'

class Post extends React.Component {
  render() {
    const {data} = this.props
    return (
      <div>
        <h3>{data.title}</h3>
        <div>{data.description}</div>
      </div>
    )
  }
}

export default Post
