import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk'
import combineReducers from './reducers'
import logger from './middleware/logger'
import { createBrowserHistory } from 'history'

export const history = createBrowserHistory()

const store = createStore(
    combineReducers(history),
    composeWithDevTools(
        applyMiddleware(
            routerMiddleware(history),
            logger,
            thunk,
        ),
    ),
)

export default store