const blogsRouter = require('express').Router()
const Blog = require('../models/bloglist')

blogsRouter.get('/', async (request, response, next) => {
  try {
    const allBlogs = await Blog.find({})

    response.status(200).json(allBlogs)
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body)

  try {
    const res = await blog.save()
    response.status(201).json(res)
  } catch(exception) {
    next(exception)
  }
})
//TODO Error handling middleware

module.exports = blogsRouter