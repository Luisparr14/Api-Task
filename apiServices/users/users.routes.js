const express=require('express')

const router=express.Router()

const {
  users
}=require('./users.controller')


router.get('/', users)
// router.post('/', adduser)
// router.get('/:user', getUser)
// router.post('/:user', uniquser)


module.exports=router
