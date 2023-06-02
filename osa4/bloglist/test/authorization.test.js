const supertest = require('supertest')
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
  console.log('STATUS', blog.body)
  //Move above into test
  //Test with incorrect token and missing token also
})

describe('Testing authorization with tokens', () => {
  test('Add blog ', () => {
    console.log('Hello from test')
  })
})

