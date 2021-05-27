var mysql = require('mysql')

var connection=mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: '',
    database: process.env.DB_DATABASE
})

connection.connect((err)=>{
    if(err)throw err
    console.log('Conectado');
})

module.exports=connection;
