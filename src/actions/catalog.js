export const INIT_OPEN_QUESTIONS_ARRAY = 'INIT_OPEN_QUESTIONS_ARRAY'
export const ADD_CLOSED_QUESTION = 'ADD_CLOSED_QUESTION'
export const REMOVE_OPEN_QUESTION = 'REMOVE_OPEN_QUESTION'
export const TOGGLE_QUESTIONS = 'TOGGLE_QUESTIONS'
export const ADD_OPEN_QUESTION = 'ADD_OPEN_QUESTION'
export const INIT_CLOSED_QUESTIONS_ARRAY = 'INIT_CLOSED_QUESTIONS_ARRAY'

export function initOpenQuestionArray(openQuestions) {
    return {
        type: INIT_OPEN_QUESTIONS_ARRAY,
        openQuestions,
    }
}

export function initClosedQuestionArray(closedQuestions) {
    return {
        type: INIT_CLOSED_QUESTIONS_ARRAY,
        closedQuestions,
    }
}

export function addClosedQuestion(closedQuestionId) {
    return {
        type: ADD_CLOSED_QUESTION,
        closedQuestionId,
    }
}

export function addOpenQuestion(openQuestionId) {
    return {
        type: ADD_OPEN_QUESTION,
        openQuestionId,
    }
}

export function removeOpenQuestion(openQuestionId) {
    return {
        type: REMOVE_OPEN_QUESTION,
        openQuestionId
    }
}

export function toggleQuestions(displayType) {
    return {
        type: TOGGLE_QUESTIONS,
        displayType
    }
}


