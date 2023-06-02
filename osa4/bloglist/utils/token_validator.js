const validateToken = (request) => {
  const token = request.get('Authorization')
  if (token && token.startsWith('Bearer '))
    return token.replace('Bearer ', '')
  return null
}

module.exports = validateToken