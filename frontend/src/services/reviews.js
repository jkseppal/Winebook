import axios from 'axios'
const baseUrl = '/api/reviews'

let token = null
const setToken = newToken => {
  token = `bearer ${newToken}`
}

const addReview = (id, newObject) => {
  const config = {
    headers: { Authorization: token }
  }
  const request = axios.post(`${baseUrl}/${id}`, newObject, config)
  return request.then(response => response.data)
}

const getReviews = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export default { setToken, addReview, getReviews }