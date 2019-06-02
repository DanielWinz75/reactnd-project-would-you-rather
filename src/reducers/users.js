import {RECEIVE_USERS, ADD_ANSWER_TO_USERS, ADD_QUESTION_TO_USERS} from '../actions/users'

export default function users(state = {}, action) {

    console.log('reducer: ', action.users)
    switch (action.type) {
        case RECEIVE_USERS:
            return {
                ...state,
                ...action.users,
            }
        case ADD_ANSWER_TO_USERS:
            return {
                ...state,
                [action.userid]: {
                    ...state[action.userid],
                    answers: {
                        ...state[action.userid].answers,
                        [action.questionid]: action.option
                    }
                }
            }
        case ADD_QUESTION_TO_USERS:
            return {
                ...state,
                [action.userid]: {
                    ...state[action.userid],
                    questions: state[action.userid].questions.concat([action.questionid])
                }
            }
        default:
            return state            
    }
}            