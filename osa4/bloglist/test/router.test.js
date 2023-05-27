const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/bloglist')

const api = supertest(app)

const blogs = [
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  },
]

const blogsCompare = [
  {
    id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
  },
  {
    id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  },
  {
    id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
  },
  {
    id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let i = 0; i < blogs.length; i++) {
    let blogObject = new Blog(blogs[i])
    await blogObject.save()
  }
  // await Blog.insertMany(blogs)
})

describe('Let\'s test the REST', () => {
  test('blogs are returned as json', async() => {
    const response = await api.get('/api/blogs')

    expect(response.status).toBe(200)
    expect(response.type).toMatch(/application\/json/)
    expect(response.body.sort()).toEqual(blogsCompare.sort())
  })

  test('blog id should be renamed from _id to id', async () => {
    const response = await api.get('/api/blogs')

    response.body.forEach(blog => {
      expect(blog.id).toBeDefined()
      expect(blog._id).not.toBeDefined()
    })
  })

  test('testing HTTP POST request', async () => {
    const newPost = {
      title: 'New blog',
      author: 'Smart guy',
      url: 'http://blog.smartguy.fi/smarblog',
      likes: 3,
    }

    const blogsBefore = await api.get('/api/blogs')
    const response = await api
      .post('/api/blogs')
      .send(newPost)
      .expect(201)
    const blogsAfter = await api.get('/api/blogs')
    const blogsWithoutId = blogsAfter.body.map(blog => {
      delete blog.id
      return blog
    })
    delete response.body.id
    expect(response.body).toEqual(newPost)
    expect(blogsWithoutId).toContainEqual(newPost)
    expect(blogsAfter.body).toHaveLength(blogsBefore.body.length + 1)
  })

  test('If likes is without value, default should be zero', async () => {
    const newPost = {
      title: 'New blog',
      author: 'Smart guy',
      url: 'http://blog.smartguy.fi/smarblog',
      likes: undefined
    }

    const response = await api
      .post('/api/blogs')
      .send(newPost)
      .expect(201)

    expect(response.body['likes']).toEqual(0)

  })

  test('Title property missing', async() => {
    const newPost = {
      author: 'Smart guy',
      url: 'http://blog.smartguy.fi/smarblog',
      likes: 42
    }

    await api
      .post('/api/blogs')
      .send(newPost)
      .expect(400)
  })

  test('Url property missing', async() => {
    const newPost = {
      title: 'Very important',
      author: 'Smart guy',
      likes: 42
    }

    await api
      .post('/api/blogs')
      .send(newPost)
      .expect(400)
  })

  test('Deletion of a blog', async() => {
    const deleteId = {
      _id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      __v: 0
    }
    const blogsBefore = await api.get('/api/blogs').expect(200)
    await api
      .delete(`/api/blogs/${deleteId._id}`)
      .expect(200)
    const blogsAfter = await api.get('/api/blogs').expect(200)
    expect(blogsBefore.body.length).toBe(blogsAfter.body.length + 1)
  })

  test.only('Update blog', async () => {
    const updatedBlog = {
      _id: '5a422a851b54a676234d17f7',
      title: 'Reakt Reakt',
      author: 'Cha cha cha',
      url: 'https://reactpatterns.com/',
      likes: 10,
      __v: 0
    }

    const allBlogsBefore = await api.get('/api/blogs')
    const res = await api
      .put(`/api/blogs/${updatedBlog._id}`)
      .send(updatedBlog)
    const allBlogsAfter = await api.get('/api/blogs')
    updatedBlog.id = updatedBlog._id
    delete updatedBlog._id
    delete updatedBlog.__v
    expect(res.status).toBe(200)
    expect(res.body).toEqual(updatedBlog)
    expect(allBlogsBefore.body.length).toBe(allBlogsAfter.body.length)
    expect(allBlogsBefore.body).not.toContainEqual(updatedBlog)
    expect(allBlogsAfter.body).toContainEqual(updatedBlog)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})