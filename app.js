var express=require('express')
var path=require('path')
var bodyParser=require('body-parser')
var logger=require('morgan');
var cors=require('cors')
require('dotenv').config()

var users = require('./apiServices/users/routes')
var tasks = require('./apiServices/tasks/routes')

const app=express();

const corsOptions = {
    origin: '*'
}

//middlewares
app.use(logger('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use("/api",cors(corsOptions),users)
app.use("/api",cors(corsOptions),tasks)

app.get("/", (req,res)=>{
    res.send('funcionando')
})

app.listen(process.env.PORT||8000,()=>{
    console.log('conectado al puerto', process.env.PORT);
})

module.exports=app;