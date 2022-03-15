const { Task } = require('../../models/')
const tasks = async (req, res) => {
  try {
    const response = await Task.findAll()
    return res.json({
      success: true,
      tasks: response
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: 'Error al obtener las tareas'
    })
  }
}

const addTasks = async (req, res) => {
  const { title, description, completed, userId } = req.body
  try {
    await Task.create({
      title,
      description,
      completed,
      userId
    })
    return res.status(201).json({
      success: true,
      message: 'Task created successfully'
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: error.errors[0].message
    })
  }
}

// const tasksByUser = (req, res) => {

// }

// const deleteTask = (req, res) => {

// }

module.exports = {
  tasks,
  addTasks,
  // tasksByUser,
  // deleteTask
}