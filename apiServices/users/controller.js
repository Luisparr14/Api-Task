'use strict'

const db = require('../../config/database')
var bcrypt = require('bcrypt')
const saltRound = 10;

class usercontroller {

    static users(req, res) {
        var sql = "select * from users"

        db.query(sql, (err, result) => {
            res.json(result)
        })
    }

    static adduser(req, res) {
        var { userName, name, lastName, password } = req.body;
        const sql = 'INSERT INTO users (username, name, lastname,password) values (?,?,?,?)'

        bcrypt.genSalt(saltRound, (err, salt) => {
            if (err) throw err

            bcrypt.hash(password, salt, (err, hash) => {
                if (err) throw err

                password = hash

                const params = [userName, name, lastName, password]

                db.query(sql, params, (err, result) => {
                    if (err) {
                        return res.status(500).json({ "error": err.message })
                    }
                    console.log('resultado', result);
                    req.body.id = result.insertId;
                    res.json({
                        'user': req.body
                    })

                })
            })
        })

    }

    // static adduser(req, res) {

    //     var { userName, name, lastName, password } = req.body;
    //     const sql = 'INSERT INTO users (username, name, lastname,password) values (?,?,?,?)'

    //     bcrypt.genSalt(saltRound, (err, salt) => {
    //         if (err) throw err

    //         bcrypt.hash(password, salt, (err, hash) => {
    //             if (err) throw err

    //             password = hash

    //             const params = [userName, name, lastName, password]

    //             db.query(sql, params, (err, result) => {
    //                 if (err) {
    //                     return res.status(500).json({ "error": err.message })
    //                 }
    //                 console.log('resultado', result);
    //                 req.body.id = result.insertId;
    //                 res.json({
    //                     'user': req.body
    //                 })

    //             })
    //         })
    //     })

    // }

    static uniquser(req, res) {
        let passwordV = false;
        var { userName, password } = req.body
        var sql = "select * from users where username = ?"

        db.query(sql, userName, (err, user) => {
            if (err) {
                res.status(500).json({ 'error': err.message });
                return
            }
            if (user.length > 0) {

                bcrypt.compare(password, user[0].password, (err, resul) => {
                    if (err) throw err
                    console.log("Contraseña correcta", resul);
                    if (resul) {
                        passwordV = true
                    }
                    res.json({
                        user,
                        passwordV
                    })
                })
            }
        })
    }

    static getUser(req, res) {

        var sql = "select * from users where username = ?"

        db.query(sql, req.params.user, (err, user) => {
            if (err) {
                res.status(500).json({ 'error': err.message });
                return
            } 
            res.json(user)

        })
    }
}

module.exports = usercontroller


// Technique 1(generate a salt and hash on separate function calls):

// bcrypt.genSalt(saltRounds, function (err, salt) {
//     bcrypt.hash(myPlaintextPassword, salt, function (err, hash) {
//         // Store hash in your password DB.
//     });
// });
// Technique 2(auto - gen a salt and hash):

// bcrypt.hash(myPlaintextPassword, saltRounds, function (err, hash) {
//     // Store hash in your password DB.
// });
// Note that both techniques achieve the same end - result.

// To check a password:
// // Load hash from your password DB.
// bcrypt.compare(myPlaintextPassword, hash, function (err, result) {
//     // result == true
// });
// bcrypt.compare(someOtherPlaintextPassword, hash, function (err, result) {
//     // result == false
// });