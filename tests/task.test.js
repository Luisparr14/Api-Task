const { app, server } = require('../bin/www')
const supertest = require('supertest')
const api = supertest(app)
const { User, Task, sequelize } = require('../models/')
const createTasks = require('../helpers/createTasks')
const { createUsers, login } = require('../helpers/userHelper')
beforeEach(() => {
  Task.destroy({ where: {} })
  User.destroy({ where: {} })
})

describe('Tasks', () => {
  test('Get all tasks', async () => {
    await createUsers()
    await createTasks()
    const response = await login()
    const { token } = response

    await api
      .get('/api/v1/tasks')
      .set({ Authorization: `Bearer ${token}` })
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('Add task', async () => {
    await createUsers()

    const response = await login()
    const { token } = response

    await api
      .post('/api/v1/tasks')
      .set({ Authorization: `Bearer ${token}` })
      .send({
        title: 'Task test',
        description: null,
        completed: false,
        userId: 1
      })
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const res = await api
      .get('/api/v1/tasks')
      .set({ Authorization: `Bearer ${token}` })
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(res.body.data.length).toBe(1)
  })
})

afterAll(() => {
  server.close()
  sequelize.close()
})
