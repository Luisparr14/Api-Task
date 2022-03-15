const { app, server } = require('../bin/www')
const { User, sequelize } = require('../models/')
const supertest = require('supertest')
const api = supertest(app)

beforeEach(() => {
  User.destroy({ where: {} })
})

describe('Auth', () => {
  test('Login de usuario', async () => {
    await User.create({
      name: 'Juan',
      lastName: 'Perez',
      email: 'luis@email.com',
      password: 'Luis'
    })

    const res = await api
      .post('/api/v1/auth/login')
      .send({
        email: 'luis@email.com',
        password: 'Luis'
      })
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(res.body.success).toBe(true)
  })

  test('Register', async()=>{
    let email = 'Luis@email.com'
    const res = await api
      .post('/api/v1/auth/register')
      .send({
        name: 'Luis',
        lastName: 'Angel',
        email,
        password: 'Luis',
        confirmPassword: 'Luis'
      })
      .expect(201)
      .expect('Content-Type', /application\/json/)
    expect(res.body.success).toBe(true)    
    const user = await User.findOne({where: {email}})    
    expect(user).not.toBe
    expect(user.dataValues.email).toBe(email)
  })
})

afterAll(() => {
  server.close()
  sequelize.close()
})
