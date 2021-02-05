const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')

usersRouter.get('/', async (request, response, next) => {
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

usersRouter.post('/', async (request, response, next) => {
  const body = request.body
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

  const savedUser = await user.save()

  response.json(savedUser)
})

usersRouter.put('/:id', async (request, response, next) => {
  const body = request.body
  
  if (request.token === undefined) {
    return response.status(401).json({ error: 'token missing' })
  }
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  
  console.log('body: ', body)
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
  response.json(savedUser.toJSON())
})

module.exports = usersRouter
