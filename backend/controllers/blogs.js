const express = require('express')
const blogRouter = express.Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response, next) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
  response.json(blogs.map(b => b.toJSON()))
})

blogRouter.post('/', async (request, response, next) => {
  const body = request.body
  if (request.token === undefined) {
    return response.status(401).json({ error: 'token missing' })
  }
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    ...body,
    likes: 0,
    user: user
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.json(savedBlog.toJSON())
})

blogRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const blog = {
    ...body
  }
  const savedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true, useFindAndModify: false })
  response.json(savedBlog.toJSON())
})

module.exports = blogRouter