import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Question extends Component {
    render() {
        const { question, username, avatar } = this.props
        const { id } = question
        return (
            <div className="question">
                <div className="question-info">
                    <div>
                        <span>
                            A question by {username} <img src={avatar} className="avatar-small" alt="" /> 
                        </span>
                        <p>..{question.optionOne.text}..</p>
                        <div>
                            <Link to={`/app/votation/${id}`} className="btn">Poll Question</Link>
                        </div>
                    </div>                  
                </div>
            </div>
        )
    }
}

function mapStateToProps({ questions, users }, { id }) {
    const question = questions[id]
    const username = users[question.author].name
    const avatar = users[question.author].avatarURL

    return {
        question,
        username,
        avatar,
    }
}

export default connect(mapStateToProps)(Question)