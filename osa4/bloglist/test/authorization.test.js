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
  //Create user
  await api
    .post('/api/users')
    .send(newUser)
  //Authenticate user and get token
  loggedInUser = await api
    .post('/api/login')
    .send(newUser)
  //Move above into test
  //Test with incorrect token and missing token also
})

function subObjMatch(subObj, targetObj) {
  return Object.entries(subObj).every(([key, val]) => {
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
    const blog = await api
      .post('/api/blogs')
      .set('Authorization', 'Bearer ' + loggedInUser.body.Authorization)
      .send(newBlog)
    expect(subObjMatch(newBlog, blog.body)).toBe(true)
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
