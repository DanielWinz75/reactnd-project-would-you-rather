import {INIT_OPEN_QUESTIONS_ARRAY, INIT_CLOSED_QUESTIONS_ARRAY, ADD_CLOSED_QUESTION, REMOVE_OPEN_QUESTION, TOGGLE_QUESTIONS, ADD_OPEN_QUESTION} from '../actions/catalog'

export default function catalog(state = {}, action) {
    switch(action.type) {
        case INIT_OPEN_QUESTIONS_ARRAY:
            return {
                ...state,
                openQuestions: action.openQuestions
            }
        case INIT_CLOSED_QUESTIONS_ARRAY:
            return {
                ...state,
                closedQuestions: action.closedQuestions
            }
        case ADD_OPEN_QUESTION: 
            return {
                ...state,
                openQuestions: [...state.openQuestions, action.openQuestionId]
            }
        case ADD_CLOSED_QUESTION:
            return {
                ...state,
                closedQuestions: state.closedQuestions === undefined ? 
                    [action.closedQuestionId] : [...state.closedQuestions, action.closedQuestionId]
            }
        case REMOVE_OPEN_QUESTION:
            return {
                ...state,
                openQuestions: state.openQuestions.filter((id) => id !== action.openQuestionId)
            }
        case TOGGLE_QUESTIONS:
            return {
                ...state,
                displayQuestionType: action.displayType,
            }
        default :
            return state            
    }
}