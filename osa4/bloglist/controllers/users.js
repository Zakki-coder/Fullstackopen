const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')


userRouter.get('/', async(request, response, next) => {
  console.log('LOL')
  try {
    const allUsers = await User.find({})
    response.status(200).json(allUsers)
  } catch(exception) {
    next(exception)
  }
})

userRouter.post('/', async(request, response, next) => {
  const { username, name, password } = request.body
  const passwordHash = await bcrypt.hash(password, 10)
  const newUser = new User({
    username,
    name,
    passwordHash,
  })
  // console.log(newUser)
  try {
    const user = await newUser.save()
    response.status(201).json(user)
  } catch(exception) {
    next(exception)
  }
})

module.exports = userRouter