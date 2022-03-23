const express = require('express')
const router = express.Router()
const extractToken = require('../../middleware/extractToken')
const {
  tasks,
  addTasks
} = require('./tasks.controller')

router.get('/', extractToken, tasks)
router.post('/', extractToken, addTasks)
// router.get('/tasks/:username', tasksController.tasksByUser)
// router.get('/tasks/delete/:username/:id', tasksController.deleteTask)

module.exports = router
