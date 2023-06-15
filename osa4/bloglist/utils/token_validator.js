const jwt = require('jsonwebtoken')
const User = require('../models/user')

const validateToken = (request) => {
  const token = request.get('Authorization')
  if (token && token.startsWith('Bearer '))
    return token.replace('Bearer ', '')
  return null
}

const tokenExtractor = (request, response, next) => {
  const token = validateToken(request)
  if (!token)
    return response.status(401).json({ error: 'Invalid token' })
  request.token = token
  next()
}

const userExtractor = async (request, response, next) => {
  const token = request.token
  let verifiedUser
  try {
    verifiedUser = jwt.verify(token, process.env.SECRET)
  } catch(exception) {
    return response.status(401).json({
      error: 'Invalid token'
    })
  }
  if (!token || !verifiedUser)
    return response.status(401).json({
      error: 'Invalid token'
    })
  const randomUser = await User.findById(verifiedUser.id)
  if (!randomUser)
    return response.status(400).json({ error: 'Could not find user for valid token' })
  request.user = verifiedUser
  next()
}

module.exports = {
  tokenExtractor,
  userExtractor
}
