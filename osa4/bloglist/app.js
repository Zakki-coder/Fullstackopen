// const http = require('http')
require('dotenv').config()
const express = require('express')
const app = express()
const notesRouter = require('./controllers/blogs')
const cors = require('cors')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false) //What's this

const mongoUrl = process.env.MONGODB_URI
mongoose.connect(mongoUrl)
  .then(() => {
    console.log('Connected to MONGODB')
  })
  .catch(error => {
    console.log('Connection to MONGODB failed: ', error)
  })

app.use(cors())
app.use(express.json())
app.use('/api/blogs', notesRouter)

module.exports = app