export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const VOTE_FOR_QUESTION = 'VOTE_FOR_QUESTION'
export const SET_SORTED_IDS = 'SET_SORTED_IDS'
export const ADD_NEW_QUESTION = 'ADD_NEW_QUESTION'

export function addQuestion (question) {
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
