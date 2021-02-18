let timeoutID

const errorReducer = (state = '', action) => {
  switch (action.type) {
  case 'SET_ERROR':
    return action.errorMessage
  default:
    return state
  }
}

export const errorMessageChange = (errorMessage, timer) => {
  console.log('timer in ms: ', timer * 1000)
  return async dispatch => {
    clearTimeout(timeoutID)
    dispatch({
      type: 'SET_ERROR',
      errorMessage,
    })
    timeoutID = setTimeout(() => {
      dispatch({
        type: 'SET_ERROR',
        errorMessage: '',
      })
    }, timer * 1000)
  }
}

export default errorReducer