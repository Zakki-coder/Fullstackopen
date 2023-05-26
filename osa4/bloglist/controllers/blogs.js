const blogsRouter = require('express').Router()
const { identity } = require('lodash')
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

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    console.log({ id: request.params.id })
    await Blog.findByIdAndRemove(request.params.id).exec()
    // const res = await Blog.findByIdAndRemove(request.params.id).exec()
    response.status(200).end()
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.use((err, req, res, next) => {
  if (err.message.includes('Title property missing'))
    res.status(400).send('Title property missing')
  if (err.message.includes('Url property missing'))
    res.status(400).send('Url property missing')
  next(err)
})

module.exports = blogsRouter