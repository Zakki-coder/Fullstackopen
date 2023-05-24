const blogsRouter = require('express').Router()
const Blog = require('../models/bloglist')

// blogsRouter.get('/', (request, response) => {
  // Blog
    // .find({})
    // .then(blogs => {
      // response.json(blogs)
    // })
// })

blogsRouter.get('/', async (request, response, next) => {
  try {
    const allBlogs = await Blog.find({})

    response.status(200).json(allBlogs)
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

//TODO Error handling middleware

module.exports = blogsRouter