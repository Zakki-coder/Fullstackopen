const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')
const userHelper = require('../utils/user_helper')

userRouter.get('/', async(request, response, next) => {
  try {
    const allUsers = await User
      .find({})
      .populate('blogs', { url: 1, title: 1, author: 1, id: 1 })
    response.status(200).json(allUsers)
  } catch(exception) {
    next(exception)
  }
})

userRouter.post('/', async(request, response, next) => {
  const { username, name, password } = request.body
  userHelper.validateUser(request, response)
  const passwordHash = await bcrypt.hash(password, 10)
  const newUser = new User({
    username,
    name,
    passwordHash,
  })
  try {
    const user = await newUser.save()
    response.status(201).json(user)
  } catch(exception) {
    next(exception)
  }
})

userRouter.use('/', (err, request, response, next) => {
  if (err.message.match(/(\bPath `username` is required\b)/))
    response.status(400).json(err.message)
  if (err.message.match(/(\bPath `name` is required\b)/))
    response.status(400).json(err.message)
  if (err.message.match(/\bPath `username`.*is shorter\b.*/))
    response.status(400).json(err.message)
  if (err.message.match(/\bexpected `username` to be unique\b.*/))
    response.status(400).json(err.message)
  next(err)
})

module.exports = userRouter
