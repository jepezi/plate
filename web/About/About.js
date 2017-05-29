import React from 'react'
import { connect } from 'react-redux'

class About extends React.Component {
  render() {
    return (
      <div>
        <h1>About</h1>
        <div>
          <button onClick={this.props.handleClick}>Click {this.props.count}</button>
        </div>
      </div>
    )
  }
}

function mapState(s) {
  return {
    count: s.counter,
  }
}

function mapDispatch(dispatch) {
  return {
    handleClick: () => {
      dispatch({type: 'INCREMENT'})
    },
  }
}

export default connect(
  mapState,
  mapDispatch
)(About)
