const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/token_validator')
const cors = require('cors')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false) //What's this
// mongoose.set('debug', true)

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MONGODB')
  })
  .catch(error => {
    console.log('Connection to MONGODB failed: ', error)
  })

app.use(cors())
app.use(express.json())
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use(middleware.tokenExtractor)
app.use('/api/blogs', blogsRouter)

module.exports = app
