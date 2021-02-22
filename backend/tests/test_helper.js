const User = require('../models/user')
const Wine = require('../models/wine')
const Blog = require('../models/blog')
const Review = require('../models/review')

const initialUsers = [
  {
    name: 'Testaaja',
    username: 'testaaja',
    email: 'testaaja@gmail.com',
    password: 'password'
  },
  {
    name: 'Testaaja2',
    username: 'testaaja2',
    email: 'testaaja2@gmail.com',
    password: 'password2'
  }
]

const usersInDB = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const winesInDB = async () => {
  const wines = await Wine.find({})
  return wines.map(w => w.toJSON)
}

const blogsInDB = async () => {
  const blogs = await Blog.find({})
  return blogs.map(b => b.toJSON)
}

const reviewsInDB = async () => {
  const reviews = await Review.find({})
  //return reviews.map(r => r.toJSON)
  return reviews
}

module.exports = {
  initialUsers, usersInDB, winesInDB, blogsInDB, reviewsInDB
}