let timeoutID

const notificationReducer = (state = '', action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return action.notification
  default:
    return state
  }
}

export const notificationChange = (notification, timer) => {
  console.log('timer in ms: ', timer * 1000)
  return async dispatch => {
    clearTimeout(timeoutID)
    dispatch({
      type: 'SET_NOTIFICATION',
      notification,
    })
    timeoutID = setTimeout(() => {
      dispatch({
        type: 'SET_NOTIFICATION',
        notification: '',
      })
    }, timer * 1000)
  }
}

export default notificationReducer