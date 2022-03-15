const { app, server } = require('../bin/www')
const sequelize = require('../models/index')
const supertest = require('supertest')
const api = supertest(app)
const Task = require('../models/task')

beforeAll(async () => {
  try {
    await Task.destroy({ where: {} })
  } catch (error) {
    console.log(error)
  }
})

describe('Tasks', () => {
  test('Get all tasks', async () => {
    await api
      .get('/api/v1/tasks')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
})

afterAll(() => {
  server.close()
  sequelize.close()
})