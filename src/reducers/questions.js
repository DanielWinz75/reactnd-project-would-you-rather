import { RECEIVE_QUESTIONS, VOTE_FOR_QUESTION, ADD_NEW_QUESTION } from '../actions/questions'

function updateVotes(votes, action, optionNr) {
    let newVotes = votes.slice()
    const index = votes.indexOf(action.authedUser)
    newVotes = index > -1 ? newVotes.splice(index-1,1) : newVotes
    if (action.optionNr === optionNr) {
        newVotes = newVotes.concat(action.authedUser)
    }
    console.log(`update votes ${optionNr}: `, newVotes)
    return newVotes
}

export default function questions(state = {}, action) {
    switch (action.type) {
        case RECEIVE_QUESTIONS:
            return {
                ...state,
                ...action.questions
            }
        case VOTE_FOR_QUESTION:
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    answered: true,
                    optionOne: {
                        ...state[action.id].optionOne,
                        votes: updateVotes(state[action.id].optionOne.votes, action, 'optionOne')
                    },
                    optionTwo: {
                        ...state[action.id].optionTwo,
                        votes: updateVotes(state[action.id].optionTwo.votes, action, 'optionTwo')
                    },
                }
            }
        case ADD_NEW_QUESTION:
            return {
                ...state,
                [action.id]: {
                    id: action.id,
                    author: action.author,
                    timestamp: action.timestamp,
                    optionOne: {
                        votes: [],
                        text: action.optionOneText
                    },
                    optionTwo: {
                        votes: [],
                        text: action.optionTwoText
                    }
                }
            }
        default:
            return state
    }
}