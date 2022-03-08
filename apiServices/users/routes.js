const express=require('express');

const router=express.Router();

const usercontroller=require('./controller')


router.get("/", usercontroller.users)
router.post("/", usercontroller.adduser)
router.get("/:user", usercontroller.getUser)
router.post("/:user", usercontroller.uniquser)


module.exports=router;
