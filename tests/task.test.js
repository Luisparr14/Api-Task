const { app, server } = require('../bin/www')
const supertest = require('supertest')
const api = supertest(app)
const { User, Task, sequelize } = require('../models/')

const InitialTasks = [
  {
    title: 'Task 1',
    description: 'Description 1',
    completed: false,
    userId: 1
  },
  {
    title: 'Task 2',
    description: 'Description 2',
    completed: false,
    userId: 2
  }
]

const InitialUsers = [
  {
    userId: 1,
    name: 'User 1',
    lastName: 'Last Name 1',
    email: 'luis@email.com',
    password: '12345678'
  },
  {
    userId: 2,
    name: 'User 2',
    lastName: 'Last Name 2',
    email: 'dan@email.com',
    password: '12345678'
  }
]

beforeEach(() => {
  Task.destroy({ where: {} })
  User.destroy({ where: {} })
})

describe('Tasks', () => {
  test('Get all tasks', async () => {
    await User.create(InitialUsers[0])
    await User.create(InitialUsers[1])
    await Task.create(InitialTasks[0])
    await Task.create(InitialTasks[1])
    await api
      .get('/api/v1/tasks')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('Add task', async () => {
    await User.create(InitialUsers[0])
    await User.create(InitialUsers[1])
    await api
      .post('/api/v1/tasks')
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
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(res.body.tasks.length).toBe(1)
  })
})

afterAll(() => {
  server.close()
  sequelize.close()
})