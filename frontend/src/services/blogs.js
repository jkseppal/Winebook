/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getBlogs = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  return response.data
}

const addBlog = async (newObject) => {
  const config = {
    headers: { Authorization: token }
  }
  const request = axios.post(baseUrl, newObject, config)
  const response = await request
  return response.data
}

const updateBlog = async (id, newObject) => {
  const config = {
    headers: { Authorization: token }
  }
  const request = axios.put(`${baseUrl}/${id}`, newObject, config)
  const response = await request
  console.log('updateBlog response: ', response.data)
  return response.data
}

export default { setToken, getBlogs, addBlog, updateBlog }