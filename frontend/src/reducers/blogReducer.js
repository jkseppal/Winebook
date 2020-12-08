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