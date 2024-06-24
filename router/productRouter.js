const express= require('express');
const router=express.Router();
const {handleGetProduct,handleGetProductByCategory,handleGetProductByName,handleGetProductByPrice,handlePostProduct,handlePostReviewAndRating}= require("../controller/productController");

router
.get("/",handleGetProduct)
.get("/category",handleGetProductByCategory)
.get("/name",handleGetProductByName)
.get("/price",handleGetProductByPrice)
.post("/",handlePostProduct)
.post("/review/:id",handlePostReviewAndRating)

module.exports=router;