import React from 'react'
import { connect } from 'react-redux'

class About extends React.Component {
  render() {
    return (
      <div>
        <h1>About</h1>
        <div>
          <div>
            We are pug lover community. All things pugs.
          </div>
          <button onClick={this.props.handleClick}>Click me for fun {this.props.count}</button>
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
