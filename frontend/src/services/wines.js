import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/wines'

let token = null
const setToken = newToken => {
  token = `bearer ${newToken}`
}

const addWine = async newObject => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const getWines = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export default { setToken, addWine, getWines }