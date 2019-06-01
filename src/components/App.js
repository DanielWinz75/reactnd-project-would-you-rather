import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router'
import { ConnectedRouter } from 'connected-react-router'

import PrivateRoute from './PrivateRoute'
import Login from './Login'
import AuthorizedPaths from './AuthorizedPaths'

class App extends Component {
  render() {
    return (
      <ConnectedRouter history={this.props.history}>
          <div>
            <Switch>
              <Route path="/login" component={Login} />
              <PrivateRoute path="/app" component={AuthorizedPaths} />
              <Redirect to="/login" />
            </Switch>            
          </div>
      </ConnectedRouter>
    )
  }
}

export default App