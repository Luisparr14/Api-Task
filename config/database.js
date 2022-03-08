var mysql = require('mysql2')
const connectionString = `mysql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}`
var connection = mysql.createConnection(connectionString)

connection.connect((err) => {
    if (err) throw err
    console.log('Connected to database')
})

module.exports = connection;
