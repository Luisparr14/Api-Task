const jwt = require('jsonwebtoken')
module.exports = (req, res, next) => {
  const authorization = req.headers.authorization
  let token

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    token = req.headers.authorization.split(' ')[1]
  }
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'No token provided'
    })
  }

  jwt.verify(token, process.env.SECRETWORD, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: 'Token is not valid'
      })
    }
    req.userInfo = decoded
    next()
  })
}
