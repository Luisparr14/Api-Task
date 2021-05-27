var express=require('express')
var path=require('path')
var bodyParser=require('body-parser')
var logger=require('morgan');
var cors=require('cors')
require('dotenv').config()

var users = require('./apiServices/users/routes')
var tasks = require('./apiServices/tasks/routes')

var app=express();

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

module.exports=app;