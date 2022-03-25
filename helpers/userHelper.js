const axios = require('axios')
const { User } = require('../models')
const baseUrl = 'http://localhost:3001'
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

const createUsers = async () => {
  await User.create(InitialUsers[0])
  await User.create(InitialUsers[1])
}

const login = async () => {
  try {
    const response = await axios.post(`${baseUrl}/api/v1/auth/login`, InitialUsers[0])
    return response.data.data
  } catch (error) {
    console.log('error', error)
  }
}

module.exports = {
  createUsers,
  login
}
