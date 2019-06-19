import React, {Component} from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import LoadingBar from 'react-redux-loading'
import { connect } from 'react-redux'
import { createMatchSelector } from 'connected-react-router'

import Dashboard from './Dashboard'
import NewQuestion from './NewQuestion'
import Nav from './Nav'
import Leaderboard from './LeaderBoard'
import { toggleQuestions } from '../actions/catalog'
import Votation from './Votation';

class AuthorizedPaths extends Component {

  /**
   * Set up the App
   */
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(toggleQuestions('open'))
  }
  
  render() {
    const { match, questions, questionid } = this.props
    return (
      <div className="primary-layout">
        <main>
          <LoadingBar />
          <Nav />
          <Switch>
            <Route path="/add" exact component={NewQuestion} />
            <Route path={`${match.path}`} exact render={() => (<Redirect to={`${match.url}/dashboard`} />)} />
            <Route path={`${match.path}/dashboard`} component={Dashboard} />
            <Route path={`${match.path}/leaderboard`} component={Leaderboard} />
            <Route path={`${match.path}/votation/:question_id`} render={(props) => {
                const qexists = questions[questionid]
                if(qexists) {
                  return <Votation {...props} question={qexists} />
                } else {
                  return (<h3 className='center'>404 - Page doesn't exist.</h3>)
                }
              }} />
            <Redirect to={`${match.url}`} />
          </Switch>
        </main>
      </div>
    )
  }
}

function mapStateToProps(state,{ match }) {
  const { authedUser, questions } = state
  const matchSelector = createMatchSelector('/app/votation/:question_id')
  const actmatch = matchSelector(state)
  let questionid
  if(actmatch !== null) {
    questionid = actmatch.params.question_id
  }
  
  return {
    authedUser,
    questions,
    match,
    questionid,
  }
}

export default connect(mapStateToProps)(AuthorizedPaths)