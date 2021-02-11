import axios from 'axios'
const baseUrl = '/api/reviews'

let token = null
const setToken = newToken => {
  token = `bearer ${newToken}`
}

const addReview = async (id, newObject) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(`${baseUrl}/${id}`, newObject, config)
  return response.data
}

const getReviews = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const updateReview = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

export default { setToken, addReview, getReviews, updateReview }