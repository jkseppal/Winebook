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

const getUsers = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const updateUser = (id, newObject) => {
  const config = {
    headers: { Authorization: token }
  }
  
  const request = axios.put(`${baseUrl}/${id}`, newObject, config)
  return request.then(response => response.data)
}

export default {
  setToken: setToken,
  createUser: createUser,
  getUsers: getUsers,
  updateUser: updateUser
}