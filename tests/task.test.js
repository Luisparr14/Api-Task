const { app, server } = require('../bin/www')
const supertest = require('supertest')
const api = supertest(app)
const { Task, sequelize } = require('../models/')

beforeEach(() => {
  Task.destroy({ where: {} })
})

describe('Tasks', () => {
  test('Get all tasks', async () => {
    await api
      .get('/api/v1/tasks')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('Add task', async () => {
    await api
      .post('/api/v1/tasks')
      .send({
        title: 'Task test',
        description: null,
        completed: false,
        userId: 2
      })
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const res = await api
      .get('/api/v1/tasks')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(res.body.tasks.length).toBe(1)
  })
})

afterAll(() => {
  server.close()
  sequelize.close()
})