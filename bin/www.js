var app=require('../app')

app.listen(process.env.PORT||8000,()=>{
    console.log('conectado al puerto', process.env.PORT);
})