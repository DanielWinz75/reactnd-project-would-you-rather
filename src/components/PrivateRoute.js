import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

class PrivateRoute extends Component {
  render() {
    const { component: Component, pending, logged, ...rest } = this.props
    
    return (
      <Route {...rest} render={props => {
        return logged
          ? <Component {...props} />
          : <Redirect to={{
              pathname: '/login',
              state: { from: props.location }
            }} />
      }} />
    )
  }
}

function mapStateToProps({ authedUser }) {
  const logged = authedUser !== null ? true : false;
  return {
    logged
  }
}

export default connect(mapStateToProps)(PrivateRoute)
