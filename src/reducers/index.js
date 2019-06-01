import { combineReducers } from 'redux'
import { loadingBarReducer } from 'react-redux-loading'
import { connectRouter } from 'connected-react-router'

import questions from './questions'
import authedUser from './authedUser'
import catalog from './catalog'
import users from './users'

import loggedUserReducer from './loggedUserReducer'


export default (history) => combineReducers({
  router: connectRouter(history),
  users,
  questions,
  authedUser,
  catalog,
  loggedUserState: loggedUserReducer,
  loadingBar: loadingBarReducer,
})