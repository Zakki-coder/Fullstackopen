// const http = require('http')
// const express = require('express')
// const cors = require('cors')
// const Blog = require('./models/bloglist')
const app = require('./app')
//config
//logger


// mongoose.set('strictQuery', false) //Wtf is this

// const mongoUrl = 'mongodb://localhost/bloglist'
// mongoose.connect(mongoUrl)
// .then(() => {
// 	console.log('Connected to MONGODB')
// })
// .catch(error => {
//   console.log('Connection to MONGODB failed: ', error)
// })

// const blogSchema = mongoose.Schema({
//   title: String,
//   author: String,
//   url: String,
//   likes: Number
// })

// const Blog = mongoose.model('Blog', blogSchema)

// app.use(cors())
// app.use(express.json())

// app.get('/api/blogs', (request, response) => {
//   Blog
//     .find({})
//     .then(blogs => {
//       response.json(blogs)
//     })
// })

// app.post('/api/blogs', (request, response) => {
//   console.log(request.body)
//   const blog = new Blog(request.body)
//   console.log('BLOGBLOG', JSON.stringify(blog))

//   blog
//     .save()
//     .then(result => {
//       response.status(201).json(result)
//     })
// })

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})