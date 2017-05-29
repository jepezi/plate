import React, {PropTypes} from 'react';

class About extends React.Component {
  state = {count: 0}
  render() {
    return (
      <div>
        <h1>About</h1>
        <div>
          <button onClick={this._handleClick}>Click {this.state.count}</button>
        </div>
      </div>
    )
  }
  _handleClick = e => {
    this.setState(s => ({count: s.count + 1}))
  }
}

export default About
