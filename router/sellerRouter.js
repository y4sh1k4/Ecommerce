const express= require('express');
const router= express.Router();
const {handleGetSellers,handleGetSellerById,handlePostProduct,handleDeleteProduct,handlePostSeller,handleUpdateProduct}= require("../controller/sellerController");

router
.get("/",handleGetSellers)
.get("/:id",handleGetSellerById)
.post("/",handlePostSeller)
.post("/product/:id",handlePostProduct)
.put("/update/:productId",handleUpdateProduct)
.delete("/product/:productId",handleDeleteProduct)

module.exports=router;