import reviewService from '../services/reviews'

const reviewReducer = (state = [], action) => {

  switch (action.type) {
    case 'INIT_REVIEWS':
      return action.data
    case 'NEW_REVIEW':
      const newState = [...state, action.data]
      console.log('new rev state: ', newState)
      return [...state, action.data]
    case 'LIKE': {
      const id = action.data.id
      const reviewToLike = state.find(r => r.id === id)
      const likedReview = {
        ...reviewToLike,
        likes: reviewToLike.likes + 1
      }
      const newState = state.map(r =>
        r.id !== id ? r : likedReview)
      console.log('new state: ', newState)
      return state.map(rev =>
        rev.id !== id ? rev : likedReview)
    }
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

export const likeReview = (id, content) => {
  return async dispatch => {
    const likedReview = await reviewService.updateReview(id, content)
    dispatch({
      type: 'LIKE',
      data: likedReview
    })
  }
}

export default reviewReducer