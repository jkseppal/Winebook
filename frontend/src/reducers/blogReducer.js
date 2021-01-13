import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {

  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data
    case 'NEW_BLOG':
      console.log('new blog action.data: ', action.data)
      const newState = [
        ...state,
        action.data
      ]
      console.log('new blog state: ', newState)
      //return [...state, action.data]
      return newState
    case 'ADD_ENTRY': {
      const id = action.data.id
      const blogToAdd = state.find(b => b.id === id)
      const addedBlog = {
        ...blogToAdd,
        blogEntries: action.data.blogEntries
      }
      const newState = state.map(b =>
        b.id !== id ? b : addedBlog)
      console.log('new state: ', newState)
      return state.map(b =>
        b.id !== id ? b : addedBlog)
      }
    case 'ADD_COMMENT': {
      const id = action.data.id
      const index = action.index
      const blog = state.find(b => b.id === id)
      const entry = blog.blogEntries[index]
      const commentedEntry = {
        ...entry,
        comments: entry.comments.concat(action.data.content)
      }
      const commentedBlog = {
        ...blog,
        blogEntries: blog.blogEntries.concat(commentedEntry)
      }
      const newState = state.map(b =>
        b.id !== id ? b : commentedBlog)
      console.log('new state: ', newState)
      return state.map(b =>
        b.id !== id ? b : commentedBlog)
    }
    default:
      return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getBlogs()
    dispatch ({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const createBlog = (content) => {
  return async dispatch => {
    const newBlog = await blogService.addBlog(content)
    console.log('new blog from reducer: ', newBlog)
    dispatch ({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export const addBlogEntry = (id, content) => {
  return async dispatch => {
    const addedEntry = await blogService.updateBlog(id, content)
    console.log('updated blog after updateBlog: ', addedEntry)
    dispatch({
      type: 'ADD_ENTRY',
      data: addedEntry
    })
  }
}

export const addComment = (id, content, index) => {
  return async dispatch => {
    const commentedBlog = await blogService.updateBlog(id, content)
    dispatch({
      type: 'ADD_COMMENT',
      data: commentedBlog,
      index: index
    })
  }
}

export default blogReducer