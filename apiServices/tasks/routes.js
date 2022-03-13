const express=require('express')
const router = express.Router()

const tasksController=require('./controller')

router.get('/tasks',tasksController.tasks)
router.post('/tasks', tasksController.addTasks)
router.get('/tasks/:username', tasksController.tasksByUser)
router.get('/tasks/delete/:username/:id', tasksController.deleteTask)

module.exports=router