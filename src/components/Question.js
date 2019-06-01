import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'

class Question extends Component {
    render() {
        const { question, username, avatar, dispatch, authedUser } = this.props
        const { id } = question
        return (
            <div className="question">
                <div className="question-info">
                    <div>
                        <span>
                            Question by <img src={avatar} className="avatar-small" /> {username}
                        </span>
                        <p>..{question.optionOne.text}..</p>
                        <div>
                            <button onClick={() => dispatch(push(`/votation/${authedUser}/${id}`))} className="btn">Poll Question</button>
                        </div>
                    </div>                  
                </div>
            </div>
        )
    }
}

function mapStateToProps({ questions, users, authedUser }, { id }) {
    const question = questions[id]
    let selectedOption = null
    if (question.optionOne.votes.indexOf(authedUser) > -1) {
        selectedOption = 'optionOne'
    }
    if (question.optionTwo.votes.indexOf(authedUser) > -1) {
        selectedOption = 'optionTwo'
    }
    const alreadyAnswered = selectedOption !== null
    const username = users[question.author].name
    const avatar = users[question.author].avatarURL

    return {
        question,
        authedUser,
        selectedOption,
        alreadyAnswered,
        username,
        avatar,
    }
}

export default connect(mapStateToProps)(Question)