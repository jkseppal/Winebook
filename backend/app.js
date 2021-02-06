const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const usersRouter = require('./controllers/users')
const winesRouter = require('./controllers/wines')
const loginRouter = require('./controllers/login')
const reviewRouter = require('./controllers/reviews')
const blogRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB: ', error.message)
  })

  app.use(cors())
  app.use(express.static('build'))
  app.use(express.json())
  app.use(middleware.tokenExtractor)
  app.use(middleware.errorHandler)

  app.use('/api/blogs', blogRouter)
  app.use('/api/users', usersRouter)
  app.use('/api/wines', winesRouter)
  app.use('/api/login', loginRouter)
  app.use('/api/reviews', reviewRouter)

  if (process.env.NODE_ENV === 'test') {
    const testingRouter = require('./controllers/testing')
    app.use('/api/testing', testingRouter)
  }

  module.exports = app