const jwt = require('jsonwebtoken')
const loginRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

loginRouter.post('/', async(request, response) => {
  const { username, password } = request.body

  const user = await User.findOne({ username })
  const userPassword = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && userPassword)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  response
    .status(200)
    .send({ Authorization: token, username: user.username, name: user.name })
})

module.exports = loginRouter
