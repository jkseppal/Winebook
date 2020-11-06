const express = require('express')
const reviewRouter = express.Router()
const Review = require('../models/review')
const User = require('../models/user')
const Wine = require('../models/wine')
const jwt = require('jsonwebtoken')

reviewRouter.get('/', async (request, response, next) => {
  const reviews = await Review
    .find({})
    .populate('user', { username: 1, name: 1 })
    .populate('wine', { name: 1, region: 1 })
  response.json(reviews.map(r => r.toJSON()))
})

reviewRouter.post('/:id', async (request, response, next) => {
  const body = request.body
  if (request.token === undefined) {
    return response.status(401).json({ error: 'token missing' })
  }
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  const wine = await Wine.findById(request.params.id)

  const review = new Review({
    description: body.description,
    points: body.points,
    vintage: body.vintage,
    wine: wine._id,
    user: user._id
  })

  const savedReview = await review.save()
  user.reviews = user.reviews.concat(savedReview._id)
  await user.save()
  wine.reviews = wine.reviews.concat(savedReview._id)
  await wine.save()

  response.json(savedReview.toJSON())
})

module.exports = reviewRouter