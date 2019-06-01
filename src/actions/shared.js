import { getInitialData } from '../utils/api'
import { receiveUsers } from '../actions/users'
import { receiveQuestions } from '../actions/questions'
import { showLoading, hideLoading } from 'react-redux-loading'
import { initOpenQuestionArray, initClosedQuestionArray } from '../actions/catalog';

// export function preLoadData () {
//   return (dispatch) => {
//     dispatch(showLoading())
//     return getInitialData()
//       .then(({ users }) => {
//         dispatch(receiveUsers(users))      
//         dispatch(hideLoading())
//       })
//   }
// }

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