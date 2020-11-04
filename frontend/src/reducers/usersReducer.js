import userService from '../services/users'

const usersReducer = (state = [], action) => {

  switch(action.type) {
    case 'INIT_USERS':
      return action.data
    case 'ADD_USER':
      return [...state, action.data]
    default:
      return state
  }
}

export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getUsers()
    dispatch ({
      type: 'INIT_USERS',
      data: users
    })
  }
}

export const createUser = content => {
  return async dispatch => {
    const newUser = await userService.createUser(content)
    dispatch ({
      type: 'ADD_USER',
      data: newUser
    })
  }
}

export default usersReducer