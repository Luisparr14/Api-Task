'use strict'

const db = require('../../config/database')

class tasksController {

    static tasks(req, res) {
        var sql = 'select * from tasks'
        db.query(sql, (err, tasks) => {
            res.json(tasks)
        })

    }

    static addTasks(req, res) {
        const { name, description, username, leftColor, rightColor } = req.body;

        const sql = "insert into tasks (name, description,left_color,right_color,username) values (?,?,?,?,?)"
        const params = [name, description, leftColor, rightColor, username]

        db.query(sql, params, (err, tasks) => {

            if (err) {
                res.status(500).json({ 'error': err.message })
                return;
            }

            req.body.id = tasks.insertId;

            res.json({
                'id': req.body
            })
        })

    }

    static tasksByUser(req, res) {
        const sql = 'select * from tasks where username = ?'

        db.query(sql, req.params.username, (err, tasks) => {
            if (err) {
                res.satatus(500).json({ 'error': err.message });
                return;
            }
            res.json(
                tasks
            )
        });
    }

    static deleteTask(req,res){
        const sql="delete from tasks where username = ? and id_task=?"
        const params=[req.params.username,req.params.id]
        
        db.query(sql, params,(err,task)=>{
            if (err) {
                res.status(500).json({ 'error': err.message });
                return;
            }
            res.json(task)
        })
    }

}

module.exports = tasksController