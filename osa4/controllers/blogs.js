const blogsRouter = require('express').Router()
const Blog = require('../models/bloglist')

blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogsRouter.post('/', (request, response) => {
  console.log(request.body)
  const blog = new Blog(request.body)
  console.log('BLOGBLOG', JSON.stringify(blog))

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

module.exports = blogsRouter