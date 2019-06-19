import React, { Component } from 'react';
import { addQuestionAnswer } from '../actions/shared'
import { removeOpenQuestion, addClosedQuestion } from '../actions/catalog'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'

class Votation extends Component {  
    handleToggleOption = (e) => {
        const { question, dispatch, authedUser } = this.props
        const optionNr = e.target.value
        const id = question.id

        dispatch(addQuestionAnswer({authedUser,qid: id,option: optionNr}))
        dispatch(addClosedQuestion(id))
        dispatch(removeOpenQuestion(id))
        dispatch(push(`/app/votation/${id}`))
    }
    render() {
        const { 
            question, 
            avatar, 
            username, 
            selectedOption, 
            alreadyAnswered, 
            amountOfUsers,
            amountOneVotes,
            percentageOneVotes,
            amountTwoVotes,
            percentageTwoVotes,
            yourQuestion,
        } = this.props
        const { id, optionOne, optionTwo } = question

        return(
            <div>
                <h3 className='center'>What would you rather?</h3>            
                <div className='question'>
                    <div className="question-info">
                        <div>
                            {alreadyAnswered ? 
                                (<span>
                                    You answered {
                                        yourQuestion ?
                                        (<span>your </span>) :
                                        (<span>{username}'s <img src={avatar} className="avatar-small" alt="" /></span>)
                                    }
                                    question
                                </span>) :
                                (<span>
                                    Question by {username} <img src={avatar} className="avatar-small" alt="" />
                                </span>)
                            }
                            <div>
                                <div >
                                    {alreadyAnswered ?
                                        (
                                        <div>
                                            {selectedOption === 'optionOne' && (<span className="yourvoteinfo">your vote </span>)}<span>"{optionOne.text}" </span><br />
                                            <span className='statisticinfo'>Info: {percentageOneVotes}&#37; - {amountOneVotes} user{amountOneVotes>1?(<span>s</span>):(<span></span>)} out of {amountOfUsers} voted for this answer</span><br /><br />
                                        </div>
                                        ) : (
                                        <div>
                                            <input type="radio" value="optionOne" name={id}
                                                onChange={event => this.handleToggleOption(event)}/>
                                            <span>{optionOne.text}</span>
                                        </div>
                                        )}
                                </div>
                                <div>
                                    {alreadyAnswered ?      
                                        (
                                        <div>
                                            {selectedOption === 'optionTwo' && (<span className="yourvoteinfo">your vote </span>)}<span>"{optionTwo.text}" </span><br />
                                            <span className='statisticinfo'>Info: {percentageTwoVotes}&#37; - {amountTwoVotes} user{amountTwoVotes>1?(<span>s</span>):(<span></span>)} out of {amountOfUsers} voted for this answer</span>
                                        </div>
                                        ) : (
                                        <div>
                                            <input type="radio" value="optionTwo" name={id}
                                                onChange={event => this.handleToggleOption(event)}/>
                                            <span>{optionTwo.text}</span>
                                        </div>
                                        )}
                                </div>
                            </div>                            
                        </div>
                    </div>
                </div>
            </div>            
        )
    }
}

function mapStateToProps(state, props) {
    const { users, authedUser } = state
    const { question } = props

    let selectedOption = null
    if (question.optionOne.votes.indexOf(authedUser) > -1) {
        selectedOption = 'optionOne'
    }
    if (question.optionTwo.votes.indexOf(authedUser) > -1) {
        selectedOption = 'optionTwo'
    }

    const amountOfUsers = Object.keys(question.optionOne.votes).length + Object.keys(question.optionTwo.votes).length
    const amountOneVotes = Object.keys(question.optionOne.votes).length
    const amountTwoVotes = Object.keys(question.optionTwo.votes).length
    let percentageOneVotes = amountOneVotes*100 / amountOfUsers
    percentageOneVotes = percentageOneVotes.toFixed(2)
    let percentageTwoVotes = amountTwoVotes*100 / amountOfUsers
    percentageTwoVotes = percentageTwoVotes.toFixed(2)
    const alreadyAnswered = selectedOption !== null
    const username = users[question.author].name
    const yourQuestion = users[authedUser] === users[question.author] ? true : false
    const avatar = users[question.author].avatarURL


    return {
        question,
        authedUser,
        selectedOption,
        alreadyAnswered,
        username,
        avatar,
        amountOfUsers,
        amountOneVotes,
        percentageOneVotes,
        amountTwoVotes,
        percentageTwoVotes,
        yourQuestion,
    }
}


export default connect(mapStateToProps)(Votation)