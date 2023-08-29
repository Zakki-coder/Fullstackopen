const blogsRouter = require('express').Router()
const Blog = require('../models/bloglist')
const User = require('../models/user')
const Comment = require('../models/comments')

blogsRouter.get('/', async (request, response, next) => {
  try {
    const allBlogs = await Blog.find({})
      .populate('user', { username: 1, name: 1, id: 1 })
      .populate('comments')
    response.status(200).json(allBlogs)
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body)
  const user = await User.findById(request.user.id)
  user.blogs = user.blogs.concat(blog._id)
  try {
    await user.save()
  } catch (exception) {
    next(exception)
  }
  blog.user = user
  try {
    const res = await blog.save()
    response.status(201).json(res)
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async(request, response, next) => {
  const { title, author, url, likes } = request.body
  try {
    const res = await Blog.findByIdAndUpdate(
      request.params.id,
      { title, author, url, likes },
      { new: true, runValidators: true, context: 'query', returnDocument: 'after' })
    response.status(200).json(res)
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.post('/:id/comments', async(request, response, next) => {
  const blogId = request.params.id
  const blog = await Blog.findById(blogId)
  const newComment = new Comment({ blog, comment: request.body.comment })
  blog.comments = blog.comments.concat(newComment._id)
  try {
    const res = await newComment.save()
    await blog.save()
    response.status(200).json(res)
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  const blog = await Blog.findById(request.params.id)
  if (!blog.user || blog.user.toString() !== request.user.id.toString())
    return response.status(401).json({ error: 'Unauthorized delete' })
  try {
    await Blog.findByIdAndRemove(request.params.id).exec()
    response.status(200).end()
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.use((err, req, res, next) => {
  if (err.message.includes('Title property missing'))
    res.status(400).send('Title property missing')
  else if (err.message.includes('Url property missing'))
    res.status(400).send('Url property missing')
  else if (err.message.includes('Empty comment'))
    res.status(400).send('Comment missing')
  else if (err.name === 'JsonWebTokenError')
    res.status(401).json({ error: 'token missing or invalid' })
  next(err)
})

module.exports = blogsRouter
