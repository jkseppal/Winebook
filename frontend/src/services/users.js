import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/users'

const createUser = async newObject => {
  const response = await axios.post(baseUrl, newObject)
  return response.data
}

const getUsers = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export default { createUser, getUsers }