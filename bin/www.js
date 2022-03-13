var app = require('../app')

const server = app.listen(process.env.PORT || 8000, () => {
	console.log('conectado al puerto', process.env.PORT)
})

module.exports = server