const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  }
  next()
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  next(error)
}

module.exports = {
  tokenExtractor,
  errorHandler
}