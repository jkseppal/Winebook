const express = require('express')
const testingRouter = express.Router()
const Review = require('../models/review')
const User = require('../models/user')
const Wine = require('../models/wine')
const Blog = require('../models/blog')

testingRouter.post('/reset', async (request, response) => {
  await Review.deleteMany({})
  await User.deleteMany({})
  await Wine.deleteMany({})
  await Blog.deleteMany({})

  response.status(204).end()
})

module.exports = testingRouter