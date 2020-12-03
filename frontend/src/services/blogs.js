/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getBlogs = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const addBlog = (newObject) => {
  const config = {
    headers: { Authorization: token }
  }
  const request = axios.post(baseUrl, newObject, config)
  return request.then(response => response.data)
}

//todo const updateBlog

export default { setToken, getBlogs, addBlog }