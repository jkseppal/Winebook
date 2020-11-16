const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response, next) => {
  const users = await User.find({})
  .populate('wines', { name: 1, region: 1 })
  .populate({
    path : 'reviews',
    populate : {
      path : 'wine'
    }
  })
  response.json(users.map(u => u.toJSON()))
  //.catch(error => next(error))
})

usersRouter.post('/', async (request, response, next) => {
  const body = request.body
  if (body.password.length < 5) {
    return response.status(400).json({ error: 'password must have at least 5 characters' })
  }

  /*const userInDb = await User.find({ username: body.username })
  console.log('user in db: ', userInDb)
  if (userInDb !== []) {
    return response.status(403).json({ error: 'username allready in use' })
  }*/

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.json(savedUser)
  //.catch(error => next(error))
})

module.exports = usersRouter
