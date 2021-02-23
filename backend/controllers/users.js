const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')

/**
 * Jostain syystä arvostelut putoavat pois profiilin päivityksen yhteydessä.
 * Selvitetään
 */

usersRouter.get('/', async (_request, response) => {
  const users = await User.find({})
    .populate('wines', { name: 1, region: 1 })
    .populate('blogs', { title: 1 })
    .populate({
      path : 'reviews',
      populate : {
        path : 'wine'
      }
    })
  response.json(users.map(u => u.toJSON()))
})

usersRouter.post('/', async (request, response) => {
  const body = request.body
  console.log('body: ', body)
  if (body.password.length < 5) {
    return response.status(400).json({ error: 'password must have at least 5 characters' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    ...body,
    showEmail: false,
    showFacebook: false,
    showInstagram: false,
    showTwitter: false,
    passwordHash,
  })
  console.log('user before save: ', user)

  const savedUser = await user.save()
  console.log('user after save: ', savedUser)

  response.json(savedUser)
})

usersRouter.put('/password/:id', async (request, response) => {
  const body = request.body
  console.log('request.body: ', body)

  const wines = body.wines.map(w => w.id)
  const reviews = body.reviews.map(r => r.id)
  const blogs = body.blogs.map(b => b.id)

  if (request.token === undefined) {
    return response.status(401).json({ error: 'token missing' })
  }
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = {
    ...body,
    wines: wines,
    reviews: reviews,
    blogs: blogs,
    passwordHash
  }
  console.log('user before update: ', user)

  const savedUser = await User.findByIdAndUpdate(request.params.id, user, { new: true, useFindAndModify: false })
  console.log('saved user: ', savedUser)
  response.json(savedUser.toJSON())
})

usersRouter.put('/:id', async (request, response) => {
  const body = request.body
  
  if (request.token === undefined) {
    return response.status(401).json({ error: 'token missing' })
  }
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  
  console.log('body in updateUser: ', body)
  const wines = body.wines.map(w => w.id)
  const reviews = body.reviews.map(r => r.id)
  const blogs = body.blogs.map(b => b.id)

  const user = {
    ...body,
    wines: wines,
    blogs: blogs,
    reviews: reviews,
  }
  const savedUser = await User.findByIdAndUpdate(request.params.id, user, { new: true, useFindAndModify: false })
  console.log('saved user in updateUser: ', savedUser)
  response.json(savedUser.toJSON())
})

module.exports = usersRouter
