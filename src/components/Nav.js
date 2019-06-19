import React, { Component } from 'react'
import { unsetAuthedUser } from '../actions/authedUser';
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

class Nav extends Component {
  signOut = () => {
    this.props.dispatch(unsetAuthedUser())
  }

  render() {
    return (
      <nav>
        <div className="container">
          <ul className="horizontal">
            <li>
              <NavLink to={'/app/dashboard'}>Dashboard</NavLink>
            </li>
            <li>
              <NavLink to={'/add'}>New Question</NavLink>
            </li>          
            <li>
              <NavLink to={'/app/leaderboard'}>Leaderboard</NavLink>
            </li>                  
          </ul>
          <ul className="horizontal">
            <li>
              <img src={this.props.avatarURL} className="avatar-small" alt="" />
            </li>
            <li>
              {this.props.username}
            </li>        
            <li>
              <NavLink to="/login" className="btn" onClick={this.signOut}>Sign out</NavLink>
            </li>                  
          </ul>
        </div>
      </nav>
    )
  }
}

function mapStateToProps({authedUser,users}) {
  const username = users[authedUser].name
  const avatarURL = users[authedUser].avatarURL
  return {
    username,
    avatarURL,
    authedUser
  }
}

export default connect(mapStateToProps)(Nav)