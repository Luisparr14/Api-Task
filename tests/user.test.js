const { User, sequelize } = require('../models/')
const { server, app } = require('../bin/www')
const supertest = require('supertest')
const api = supertest(app)

const initialData = [
  {
    name: 'John',
    lastName: 'Doe',
    email: 'jhon@email.com',
    password: '12345678'
  },
  {
    name: 'Carol',
    lastName: 'Herrera',
    email: 'carol@email.com',
    password: '12345678'
  }
]

beforeEach(() => {
  User.destroy({ where: {} })
})

describe('Tests for user information', () => {
  test('Get All Users', async () => {
    await User.create(initialData[0])
    await User.create(initialData[1])
    const res = await api
      .get('/api/v1/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(res.body.data.length).toBe(2)
  })
})

afterAll(() => {
  server.close()
  sequelize.close()
})
