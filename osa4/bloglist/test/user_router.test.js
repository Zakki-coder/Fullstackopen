const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const api = supertest(app)

const initialUsers = [{
  username: 'root',
  name: 'annoying admin',
  password: 'toor'
},
]

beforeEach(async() => {
  await User.deleteMany({})
  const allUsers = JSON.parse(JSON.stringify(initialUsers))

  for (const user of allUsers) {
    user.passwordHash = await bcrypt.hash(user.password, 10)
    if (user.passwordHash) {
      delete user.password
      const newUser = new User(user)
      await newUser.save()
    }
  }
})

describe('Get all users', () => {
  test('Collection is initialized with one user', async () => {
    const users = await api
      .get('/api/users')
      .expect(200)

    expect(users.type).toMatch(/application\/json/)
    expect(users.body).toHaveLength(1)
  })
})

describe('Creation of user', () => {
  const minLen = 3

  test('Creation of a valid user', async () => {
    const usersBefore = await api
      .get('/api/users')
    expect(usersBefore.status).toEqual(200)
    const validUser = {
      username: 'pera',
      name: 'Pertti Peikkonen',
      password: 'wordpass'
    }
    const response = await api
      .post('/api/users')
      .send(validUser)
      .expect(201)
    const usersAfter = await api
      .get('/api/users')
    expect(usersAfter.status).toEqual(200)
    expect(usersBefore.body).toHaveLength(usersAfter.body.length - 1)

    expect(response.body.passwordHash).toBe(undefined)
    expect(response.body.password).toBe(undefined)
  })
  //TODO Test for user username and password
  //Username and password has to have min 3 length
  //Validate pw in controllers
  test('User with undefined password value', async() => {
    const usersBefore = await api
      .get('/api/users')

    const invalid = {
      username: 'pera',
      name: 'Pertti Peikkonen',
      password: undefined
    }

    const response = await api
      .post('/api/users')
      .send(invalid)
    const usersAfter = await api
      .get('/api/users')
    expect(response.status).toEqual(400)
    expect(usersBefore.body).toHaveLength(usersAfter.body.length)
  })

  test('User without password property', async() => {
    const usersBefore = await api
      .get('/api/users')

    const invalid = {
      username: 'pera',
      name: 'Pertti Peikkonen',
    }

    const response = await api
      .post('/api/users')
      .send(invalid)
    const usersAfter = await api
      .get('/api/users')
    expect(response.status).toEqual(400)
    expect(usersBefore.body).toHaveLength(usersAfter.body.length)
  })

  test('password too short', async() => {
    const usersBefore = await api
      .get('/api/users')

    const invalid = {
      username: 'pera',
      name: 'Pertti Peikkonen',
      password: 'om'
    }

    const response = await api
      .post('/api/users')
      .send(invalid)
    const usersAfter = await api
      .get('/api/users')
    expect(response.status).toEqual(400)
    expect(usersBefore.body).toHaveLength(usersAfter.body.length)
  })

  test('Username missing', async() => {
    const usersBefore = await api
      .get('/api/users')

    const invalid = {
      name: 'Pertti Peikkonen',
      password: 'omnipotentti'
    }

    const response = await api
      .post('/api/users')
      .send(invalid)
    const usersAfter = await api
      .get('/api/users')
    expect(response.status).toEqual(400)
    expect(usersBefore.body).toHaveLength(usersAfter.body.length)
  })

  test('Username too short', async() => {
    const usersBefore = await api
      .get('/api/users')

    const invalid = {
      name: 'Pertti Peikkonen',
      username: 'Pe',
      password: 'omnipotentti'
    }

    const response = await api
      .post('/api/users')
      .send(invalid)
    const usersAfter = await api
      .get('/api/users')
    expect(response.status).toEqual(400)
    expect(usersBefore.body).toHaveLength(usersAfter.body.length)
  })

  test('Username not unique', async() => {
    const person = {
      name: 'Pertti Peikkonen',
      username: 'Pera',
      password: 'omnipotentti'
    }

    const response = await api
      .post('/api/users')
      .send(person)
    expect(response.status).toEqual(201)

    const nextResponse = await api
      .post('/api/users')
      .send(person)
    expect(nextResponse.status).toEqual(400)
  })

  test('name missing', async() => {
    const usersBefore = await api
      .get('/api/users')

    const invalid = {
      name: undefined,
      username: 'Pera',
      password: 'omnipotentti'
    }

    const response = await api
      .post('/api/users')
      .send(invalid)
    const usersAfter = await api
      .get('/api/users')
    expect(response.status).toEqual(400)
    expect(usersBefore.body).toHaveLength(usersAfter.body.length)
  })

})