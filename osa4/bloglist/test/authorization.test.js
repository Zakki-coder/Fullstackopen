const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

describe('Get all users', () => {
  test('Get all', async () => {
    const users = await api
      .get('/api/users')
      .expect(200)

    console.log(users.body)
  })
})

describe('Creation of user', () => {
  test('Creation of a valid user', async () => {
    const validUser = {
      username: 'pera',
      name: 'Pertti Peikkonen',
      password: 'wordpass'
    }
    const response = await api
      .post('/api/users')
      .send(validUser)
      .expect(201)
  })
})