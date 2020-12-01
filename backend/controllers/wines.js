const express = require('express')
const winesRouter = express.Router()
const Wine = require('../models/wine')
const User = require('../models/user')
const Review = require('../models/review')
const jwt = require('jsonwebtoken')

winesRouter.get('/', async (request, response, next) => {
  const wines = await Wine
    .find({})
    .populate('user', { username: 1, name: 1 })
    .populate({
      path : 'reviews',
      populate : {
        path : 'user'
      }
    })
  response.json(wines.map(w => w.toJSON()))
})

winesRouter.post('/', async (request, response) => {
  const body = request.body
  if (request.token === undefined) {
    return response.status(401).json({ error: 'token missing' })
  }
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const wine = new Wine({
    /*name: body.name,
    region: body.region,
    type: body.type,
    country: body.country,
    appellation: body.appellation,
    grapes: body.grapes,*/
    ...body,
    user: user._id
  })

  if (body.name === undefined) {
    response.status(400).end()
  } else {
    const savedWine = await wine.save()
    user.wines = user.wines.concat(savedWine._id)
    await user.save()

    response.json(savedWine.toJSON())
  }
})

module.exports = winesRouter