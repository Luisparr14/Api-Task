'use strict'

const { User } = require('../../models')

const users = async (req, res) => {
  try {
    const users = await User.findAll()
    res.json({
      success: true,
      data: users
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error
    })
  }
}

module.exports = {
  users
}
