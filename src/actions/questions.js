import { saveQuestion, saveQuestionAnswer } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'
import { addOpenQuestion } from './catalog';

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const VOTE_FOR_QUESTION = 'VOTE_FOR_QUESTION'
export const SET_SORTED_IDS = 'SET_SORTED_IDS'
export const ADD_NEW_QUESTION = 'ADD_NEW_QUESTION'

function addQuestion (question) {
  return {
    type: ADD_NEW_QUESTION,
    id: question.id,
    timestamp: question.timestamp,
    author: question.author,
    optionOneText: question.optionOne.text,
    optionTwoText: question.optionTwo.text,
  }
}

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}

export function voteForQuestion({id,optionNr,authedUser}) {
  return {
    type: VOTE_FOR_QUESTION,
    id,
    optionNr,
    authedUser,
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
      .then((params) => dispatch(voteForQuestion(params)) )
      .then(() => dispatch(hideLoading()))
  }
}
