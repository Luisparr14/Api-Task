var mysql = require('mysql')
var connection=mysql.createConnection(process.env.JAWSDB_URL)

connection.connect((err)=>{
    if(err)throw err
    console.log('Conectado');
})

module.exports=connection;
