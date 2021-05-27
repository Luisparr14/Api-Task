var app = require('../app')

console.log(process.env.PORT);
console.log(process.env.DB_HOSTNAME);
app.listen(process.env.PORT || 8000, () => {
    console.log('conectado al puerto', process.env.PORT);
})