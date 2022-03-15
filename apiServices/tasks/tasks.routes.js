const express = require('express')
const router = express.Router()

const {
  tasks,
  addTasks
} = require('./tasks.controller')

router.get('/', tasks)
router.post('/', addTasks)
// router.get('/tasks/:username', tasksController.tasksByUser)
// router.get('/tasks/delete/:username/:id', tasksController.deleteTask)

module.exports = router