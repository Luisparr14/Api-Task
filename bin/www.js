var app = require('../app')
const connection = require('../models/index')
const server = app.listen(process.env.PORT, async () => {
  console.log('conectado al puerto', process.env.PORT)
  try {
    await connection.sequelize.authenticate()
    console.log('conectado a la base de datos')
    console.log('base de datos:', connection.sequelize.config.database)      
  } catch (error) {
    console.log(error)
  }
})

module.exports = {
  app,
  server
}