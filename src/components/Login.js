import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { showLoading, hideLoading } from 'react-redux-loading'

import { getInitialData } from '../utils/api'
import Select from 'react-select'
import {setAuthedUser} from '../actions/authedUser'
import store from '../store'
import { receiveUsers } from '../actions/users'
import { receiveQuestions } from '../actions/questions'
import LoadingBar from 'react-redux-loading'

class Login extends Component {
  state = {
    redirectToReferrer: false,
    selectOptions: null
  }
  componentDidMount(){
    getInitialData().then(({users,questions}) => {
      const userkeys = Object.keys(users)
      let selectOptions = []
      if (users) {
        selectOptions = userkeys.map((userkey) => 
          { return {value: users[userkey].id, label: users[userkey].name} }
        )
      }
      this.setState({selectOptions})
    })
  }

  handleChange = (e) => {
    console.log(e.value)
    this.setState(() => ({
      userid: e.value
    }))
  }  

  login = () => {
    let referrer = false
    store.dispatch(showLoading())
    // use the getInitialData function again
    // in place of a login request against a server
    getInitialData().then(({users,questions}) => {
      // check if user exists
      // load/initialize data for the app
      if (users[this.state.userid]) {
        referrer = true
        const AUTHED_ID = this.state.userid
        // put the loaded data into the store
        // private store components will receive
        // it from the store
        store.dispatch(setAuthedUser(AUTHED_ID))
        store.dispatch(receiveUsers(users))
        store.dispatch(receiveQuestions(questions))
        store.dispatch(hideLoading())
      }
      // log in via redirect
      this.setState(() => ({
        redirectToReferrer: referrer
      }))
    })
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/app' } }
    const { redirectToReferrer, selectOptions } = this.state

    console.log('Login component state ',this.state)

    if (redirectToReferrer === true) {
      return <Redirect to={from} />
    }

    return (
      <div>
        <LoadingBar />
        <div className="container-small">        
          <h3>You must log in to view the page</h3>
          {
            selectOptions !== null &&
            <Select options={selectOptions} onChange={this.handleChange.bind(this)} />
          }
          <button className="btn" onClick={this.login}>Log in</button>
        </div>
      </div>         
    )
  }
}

export default Login