/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'
const baseUrl = '/api/users'

let token = null
const setToken = newToken => {
  token = `bearer ${newToken}`
}

const createUser = async newObject => {
  const response = await axios.post(baseUrl, newObject)
  return response.data
}

const getUsers = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  return response.data
}

const updateUser = async (id, newObject) => {
  const config = {
    headers: { Authorization: token }
  }
  
  const request = axios.put(`${baseUrl}/${id}`, newObject, config)
  const response = await request
  return response.data
}

export default {
  setToken: setToken,
  createUser: createUser,
  getUsers: getUsers,
  updateUser: updateUser
}