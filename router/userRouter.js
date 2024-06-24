const express= require('express');
const router=express.Router();
const {handleGetUser,handleUserLogin,handleUserSignUp}= require("../controller/userController")

router
.get("/",handleGetUser)
.post("/",handleUserSignUp)
.post("/login",handleUserLogin)

module.exports=router;