import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router'
import { ConnectedRouter } from 'connected-react-router'

import PrivateRoute from './PrivateRoute'
import Login from './Login'
import AuthorizedPaths from './AuthorizedPaths'

class App extends Component {
  render() {
    return (
      // routing inspired by
      // https://tylermcginnis.com/react-router-protected-routes-authentication/
      // https://codepen.io/bradwestfall/project/editor/XWNWge?preview_height=50&open_file=src/app.js
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