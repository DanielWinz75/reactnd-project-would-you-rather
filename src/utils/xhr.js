import store from '../store'
import {setAuthedUser} from '../actions/authedUser'

export const getLoggedUser = () => {
  setTimeout(() => {
    store.dispatch({
      type: 'GET_LOGGED_USER'
    })
  }, 500)
}

// an den login einen nutzernamen übergeben
// die nutzer über api getInitialData laden
// prüfen, ob der nutzer in der liste ist
// wenn ja, dispatch mit logged = true
// wenn nein, reject
export const login = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // store.dispatch({
      //   type: 'SET_LOGGED_USER',
      //   logged: true
      // })
      resolve()
    }, 500)
  })
}

export const logout = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      store.dispatch({
        type: 'SET_LOGGED_USER',
        logged: false
      })
      resolve()
    }, 500)
  })
}