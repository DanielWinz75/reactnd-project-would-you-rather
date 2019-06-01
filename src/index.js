import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import './index.css';
import './nav.css'
import App from './components/App'
import store, { history } from './store'

ReactDOM.render(  
    <Provider store={store}>
        <App history={history} />
    </Provider>,
    document.getElementById('root')
)
