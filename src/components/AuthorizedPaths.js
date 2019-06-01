import React, {Component} from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import LoadingBar from 'react-redux-loading'
import { connect } from 'react-redux'

import Dashboard from './Dashboard'
import NewQuestion from './NewQuestion'
import Nav from './Nav'
import { toggleQuestions } from '../actions/catalog'

class AuthorizedPaths extends Component {

  /**
   * Initialize / Load Data into the App
   */
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(toggleQuestions('open'))
  }
  
  render() {
    const { match } = this.props
    return (
      <div className="primary-layout">
        <main>
          <LoadingBar />
          <Nav />
          <Switch>
            <Route path={`${match.path}`} exact component={Dashboard} />
            <Route path={`${match.path}/new`} component={NewQuestion} />
            <Redirect to={`${match.url}`} />
          </Switch>
        </main>
      </div>
    )
  }
}

function mapStateToProps({ authedUser },{ match }) {
  return {
    authedUser,
    match,
  }
}

export default connect(mapStateToProps)(AuthorizedPaths)