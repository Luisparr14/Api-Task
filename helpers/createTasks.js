const { Task } = require('../models/')
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

const createTasks = async () => {
  await Task.create(InitialTasks[0])
  await Task.create(InitialTasks[1])
}

module.exports = createTasks