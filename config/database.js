var mysql = require('mysql')
console.log('puerto en database: ',process.env.PORT); 
var connection=mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})

connection.connect((err)=>{
    if(err)throw err
    console.log('Conectado');
})

module.exports=connection;
