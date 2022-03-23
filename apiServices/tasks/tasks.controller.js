const { Task } = require('../../models/')
const tasks = async (req, res) => {
  const { userId } = req.userInfo
  try {
    const tasks = await Task.findAll({ where: { userId } })
    return res.json({
      success: true,
      data: tasks
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
  const { title, description, leftColor, rightColor } = req.body
  const { userId } = req.userInfo
  try {
    await Task.create({
      title,
      description,
      rightColor,
      leftColor,
      completed: false,
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
  addTasks
  // tasksByUser,
  // deleteTask
}
