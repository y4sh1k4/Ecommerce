const express= require('express');
const router=express.Router();
const {handleGetUser,handleUserLogin,handleUserSignUp,handleAddToCart,handleAddToWishlist}= require("../controller/userController")

router
.get("/",handleGetUser)
.post("/",handleUserSignUp)
.post("/login",handleUserLogin)
.post("/cart/:userId",handleAddToCart)
.post("/wishlist/:userId",handleAddToWishlist)

module.exports=router;