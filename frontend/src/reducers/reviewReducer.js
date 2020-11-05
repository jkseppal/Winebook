import reviewService from '../services/reviews'

const reviewReducer = (state = {}, action) => {

  switch (action.type) {
    case 'INIT_REVIEWS':
      return action.data
    case 'NEW_REVIEW':
      return [...state, action.data]
    default:
      return state
  }
}

export const initializeReviews = () => {
  return async dispatch => {
    const reviews = await reviewService.getReviews()
    dispatch ({
      type: 'INIT_REVIEWS',
      data: reviews
    })
  }
}

export const createReview = (id, content) => {
  return async dispatch => {
    const newReview = await reviewService.addReview(id, content)
    dispatch ({
      type: 'NEW_REVIEW',
      data: newReview
    })
  }
}

export default reviewReducer