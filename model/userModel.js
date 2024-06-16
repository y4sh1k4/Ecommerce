const mongoose= require("mongoose");
const product= require("./productModel");
const userSchema= new mongoose.Schema({
    "id":{
        type:number,
        unique:true,
        required:true
    },
    "name":{
        type:string,
        required:true
    },
    "email":{
        type:string,
        unique:true,
        required:true
    },
    "password":{
        type:string,
        required:true
    },
    "address":{
        type:string
    },
    "orders":{
        type:[product]
    },
    "wishlist":{
        type:[product]
    },
})
const user= mongoose.model('user',userSchema)
module.exports=user;