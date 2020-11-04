import loginService from '../services/login'

const user = JSON.parse(localStorage.getItem('loggedUser'))
const initialState = user ? { loggedIn: true, user } : null

const userReducer = (state = initialState, action) => {

  switch (action.type) {
    case 'LOGIN':
      return {
        user: { ...action.user }
      }
    case 'LOGOUT':
      return null
    default:
      return state
  }
}

export const loginUser = (user) => {
  
}