const { User } = require('../../models')
const { compare } = require('bcrypt')
const jwt = require('jsonwebtoken')

const Login = async (req, res) => {  
  const { email, password } = req.body
  console.log(email, password)
  try {
    const user = await User.findOne({ where: { email } })

    let isValidPassword = await compare(password, user.dataValues.password)
    if (!(isValidPassword && user)) {
      return res.status(403).json({
        success: false,
        message: 'Email o contraseña incorrectos'
      })
    }

    const { name, userId } = user.dataValues

    let token = jwt.sign({ name, userId }, process.env.SECRETWORD, {
      expiresIn: 60 * 60 * 24 * 10
    })

    return res.status(200).json({
      success: true,
      message: 'Login exitoso',
      data:{
        name,
        token
      }
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: error
    })
  }
}

const Register = async (req, res) => {
  const { name, lastName, email, password, confirmPassword } = req.body

  if (password !== confirmPassword) {
    return res.status(400).json({
      message: 'Las contraseñas no coinciden'
    })
  }

  try {
    await User.create({
      name,
      lastName,
      email,
      password
    })

    return res.status(201).json({
      success: true,
      message: 'Usuario creado correctamente'
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.errors[0].message
    })
  }
}

module.exports = {
  Login,
  Register
}