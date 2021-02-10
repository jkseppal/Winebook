import userService from '../services/users'

const usersReducer = (state = [], action) => {

  switch(action.type) {
    case 'INIT_USERS':
      return action.data
    case 'ADD_USER':
      return [...state, action.data]
    case 'UPDATE_USER':
      const id = action.data.id
      const userToUpdate = state.find(u => u.id === id)
      const updatedUser = {
        ...userToUpdate,
        name: action.data.name,
        username: action.data.username,
        description: action.data.description,
        email: action.data.email,
        showEmail: action.data.showEmail,
        facebook: action.data.facebook,
        showFacebook: action.data.showFacebook,
        instagram: action.data.instagram,
        showInstagram: action.data.showInstagram,
        twitter: action.data.twitter,
        showTwitter: action.data.showTwitter
      }
      return state.map(u =>
        u.id !== id ? u : updatedUser)
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
    //const newUser = await userService.createUser(content)
    dispatch ({
      type: 'ADD_USER',
      data: content
    })
  }
}

export const updateUser = (id, content) => {
  return async dispatch => {
    //const updatedUser = await userService.addDescription(id, content)
    const updatedUser = await userService.updateUser(id, content)
    console.log('new profile from reducer: ', updatedUser)
    dispatch({
      type: 'UPDATE_USER',
      data: updatedUser
    })
  }
}

export default usersReducer