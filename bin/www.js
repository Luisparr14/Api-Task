const app = require('../app')
const connection = require('../models/index')
const server = app.listen(process.env.PORT, async () => {
  console.log('conectado al puerto', process.env.PORT)
  try {
    await connection.sequelize.authenticate()
  } catch (error) {
    console.log('ERROR', error)
  }
})
module.exports = {
  app,
  server
}
