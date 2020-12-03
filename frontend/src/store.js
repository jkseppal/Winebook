import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import usersReducer from './reducers/usersReducer'
import wineReducer from './reducers/wineReducer'
import reviewReducer from './reducers/reviewReducer'
import notificationReducer from './reducers/notificationReducer'
import errorReducer from './reducers/errorReducer'
import blogReducer from './reducers/blogReducer'

const reducer = combineReducers({
  users: usersReducer,
  wines: wineReducer,
  reviews: reviewReducer,
  notification: notificationReducer,
  errorMessage: errorReducer,
  blogs: blogReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store