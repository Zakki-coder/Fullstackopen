const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const Blog = require('../models/bloglist')
const User = require('../models/user')

const api = supertest(app)

let loggedInUser = null
beforeEach(async () => {
  const blogPromise = Blog.deleteMany({})
  const userPromise = User.deleteMany({})

  await blogPromise
  await userPromise
  const newUser = ({
    username: 'Hermanni',
    name: 'Pelle',
    password: 'kurko'
  })
  await api
    .post('/api/users')
    .send(newUser)
  loggedInUser = await api
    .post('/api/login')
    .send(newUser)
})

function subObjMatch(subObj, targetObj) {
  return Object.entries(subObj).every(([key]) => {
    return Object.keys(targetObj).includes(key) && targetObj[key] === subObj[key]
  })
}

describe('Testing authorization with tokens', () => {
  test('Add blog ', async () => {
    const newBlog = {
      'url': 'www.blogging.com',
      'title': 'Bloggin bout bloggin',
      'author': 'VIP Kalle',
      'likes': 0
    }
    const blogsBefore = await api
      .get('/api/blogs')
      .set('Authorization', 'Bearer ' + loggedInUser.body.Authorization)
    const blog = await api
      .post('/api/blogs')
      .set('Authorization', 'Bearer ' + loggedInUser.body.Authorization)
      .send(newBlog)
    const blogsAfter = await api
      .get('/api/blogs')
      .set('Authorization', 'Bearer ' + loggedInUser.body.Authorization)
    expect(blogsBefore.length).toBe(blogsAfter.length)
    expect(blog.status).toEqual(201)
  })
  test('Add blog incorrect Auth', async () => {
    const auth = 123
    const newBlog = {
      'url': 'www.blogging.com',
      'title': 'Bloggin bout bloggin',
      'author': 'VIP Kalle',
      'likes': 0
    }
    const blog = await api
      .post('/api/blogs')
      .set('Authorization', 'Bearer ' + auth)
      .send(newBlog)
    expect(subObjMatch(newBlog, blog.body)).toBe(false)
    expect(blog.status).toBe(401)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
