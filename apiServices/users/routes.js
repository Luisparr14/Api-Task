const express=require('express');

const router=express.Router();
const db=require('../../config/database')

const usercontroller=require('./controller')


router.get("/user", usercontroller.users)
router.post("/user", usercontroller.adduser)
router.get("/user/:user", usercontroller.getUser)
router.post("/user/:user", usercontroller.uniquser)


module.exports=router;
