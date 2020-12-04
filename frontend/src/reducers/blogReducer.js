import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {

  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'ADD_ENTRY': {
      const id = action.data.id
      const blogToAdd = state.find(b => b.id === id)
      const addedBlog = {
        ...blogToAdd,
        blogEntries: blogToAdd.blogEntries.concat(action.data)
      }
      return state.map(b =>
        b.id !== id ? b : addedBlog)
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
    dispatch ({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export const addBlogEntry = (id, content) => {
  return async dispatch => {
    const addedEntry = await blogService.updateBlog(id, content)
    dispatch({
      type: 'ADD_ENTRY',
      data: addedEntry
    })
  }
}

export default blogReducer