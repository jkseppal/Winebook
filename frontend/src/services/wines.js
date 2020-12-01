/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'
const baseUrl = '/api/wines'

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

const getWines = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  return response.data
}

export default { setToken, addWine, getWines }