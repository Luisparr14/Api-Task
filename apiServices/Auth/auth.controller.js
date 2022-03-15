const {User} = require('../../models')
const { compare } = require('bcrypt')
const Login = async (req, res) => {
  const { email, password } = req.body
  console.log(email, password)
  try {
    const user = await User.findOne({ where: { email } })
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'El correo no está registrado'
      })
    }

    let isValidPassword = await compare(password, user.dataValues.password)
    if (!isValidPassword) {
      return res.status(403).json({
        success: false,
        message: 'Email o contraseña incorrectos'
      })
    }
    return res.status(200).json({
      success: true,
      message: 'Login exitoso',
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