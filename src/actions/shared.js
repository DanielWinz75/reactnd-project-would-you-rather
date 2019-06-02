import { getInitialData } from '../utils/api'
import { receiveUsers, addAnswerToUsers, addQuestionIdToUsers } from './users'
import { receiveQuestions, addQuestion, voteForQuestion } from './questions'
import { showLoading, hideLoading } from 'react-redux-loading'
import { initOpenQuestionArray, initClosedQuestionArray, addOpenQuestion } from './catalog';
import { saveQuestion, saveQuestionAnswer } from '../utils/api'

export function handleInitialData (AUTHED_ID) {
  return (dispatch) => {
    dispatch(showLoading())
    return getInitialData()
      .then(({ users, questions }) => {

        const openQuestions = Object.keys(questions)
          .filter((id) => {
            const iOne = questions[id].optionOne.votes.indexOf(AUTHED_ID)
            const iTwo = questions[id].optionTwo.votes.indexOf(AUTHED_ID)
            if ( iOne > -1 || iTwo > -1 ) {
              return false
            }
            return true
          })

        const closedQuestions = Object.keys(questions)
          .filter((id) => {
            const iOne = questions[id].optionOne.votes.indexOf(AUTHED_ID)
            const iTwo = questions[id].optionTwo.votes.indexOf(AUTHED_ID)
            if ( iOne > -1 || iTwo > -1 ) {
              return true
            }
            return false
          })

        dispatch(receiveUsers(users))
        dispatch(receiveQuestions(questions))
        dispatch(initOpenQuestionArray(openQuestions))
        dispatch(initClosedQuestionArray(closedQuestions))
        dispatch(hideLoading())
      })
  }
}

export function addNewQuestion(optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authedUser } = getState()
    dispatch(showLoading())

    return saveQuestion({
      optionOneText,
      optionTwoText,  
      author: authedUser,
    })
      .then((question) => dispatch(addQuestion(question)))
      .then((question) => dispatch(addOpenQuestion(question.id)))
      .then((question) => dispatch(addQuestionIdToUsers(authedUser,question.openQuestionId)))
      .then(() => dispatch(hideLoading()))
  }
}

export function addQuestionAnswer({authedUser, qid, option}) {
  return (dispatch) => {
    dispatch(showLoading())

    return saveQuestionAnswer({
      authedUser,
      qid,
      option,
    })
      .then((params) => dispatch(voteForQuestion(params)))
      .then(() => dispatch(addAnswerToUsers(authedUser, qid, option)))
      .then(() => dispatch(hideLoading()))
  }
}