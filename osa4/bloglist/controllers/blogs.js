const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/bloglist')
const User = require('../models/user')

blogsRouter.get('/', async (request, response, next) => {
  try {
    const allBlogs = await Blog.find({})
      .populate('user', { username: 1, name: 1, id: 1 })
    response.status(200).json(allBlogs)
  } catch (exception) {
    next(exception)
  }
})

const middleware = {
  authenticate: async(request, response, next) => {
    const token = request.token
    const verifiedUser = jwt.verify(token, process.env.SECRET)
    if (!token || !verifiedUser)
      return response.status(401).json({
        error: 'token invalid'
      })
    const randomUser = await User.findById(verifiedUser.id)
    if (!randomUser)
      return response.status(400).json({ error: 'Could not find user for valid token' })
    request.tokenUserId = verifiedUser.id
    next()
  }
}

blogsRouter.post('/', middleware.authenticate, async (request, response, next) => {
  const blog = new Blog(request.body)
  randomUser.blogs = randomUser.blogs.concat(blog._id)
  try {
    await randomUser.save()
  } catch (exception) {
    next(exception)
  }
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

blogsRouter.delete('/:id', [middleware.authenticate], async (request, response, next) => {
  const blog = await Blog.findById(request.params.id)
  if (!blog.user || blog.user.toString() !== request.tokenUserId.toString())
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
  else if (err.name === 'JsonWebTokenError')
    res.status(401).json({ error: 'token missing or invalid' })
  next(err)
})

module.exports = blogsRouter
