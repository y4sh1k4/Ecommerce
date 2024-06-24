const mongoose= require("mongoose");
const {productSchema}= require("./productModel");
const { v4: uuidv4 } = require('uuid');
const userSchema= new mongoose.Schema({
    "id":{
        type:String,
        unique:true,
        default:uuidv4
    },
    "name":{
        type:String,
        required:true
    },
    "email":{
        type:String,
        unique:true,
        required:true
    },
    "password":{
        type:String,
        required:true
    },
    "address":{
        type:String
    },
    "orders":{
        type:[productSchema]
    },
    "wishlist":{
        type:[productSchema]
    },
})
const user= mongoose.model('user',userSchema)
module.exports=user;