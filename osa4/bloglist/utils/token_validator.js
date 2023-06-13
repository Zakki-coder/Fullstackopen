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

module.exports = { tokenExtractor }
