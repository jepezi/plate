import React from 'react'
import PropTypes from 'prop-types'

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

export default function fetchData(prepareFn) {
  return DecoratedComponent => {
    class PrepareRouteDecorator extends React.Component {
      componentDidMount() {
        const {
          context: { store },
          props: { params, location }
        } = this

        prepareFn(store, params, location)
      }

      render() {
        return (
          <DecoratedComponent {...this.props} />
        )
      }
    }

    PrepareRouteDecorator.displayName = 'Fetched(' + getDisplayName(DecoratedComponent) + ')'
    PrepareRouteDecorator.fetchData = prepareFn
    PrepareRouteDecorator.contextTypes = {
      store: PropTypes.object.isRequired
    }

    return PrepareRouteDecorator
  }
}
