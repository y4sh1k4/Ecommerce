const mongoose= require("mongoose");
const productSchema= new mongoose.Schema({
    "id":{
        type:number,
        required:true,
        unique:true
    },
    "pname":{
        type:string,
        required:true
    },
    "pimage":{
        type:string,
        required:true
    },
    "pdetails":{
        type:string,
        required:true
    },
    "prate":{
        type:string,
        required:true
    },
    "prating":{
        type:[number]
    },
    "preview":{
        type:[string]
    }
})
const product= mongoose.model('product',productSchema)
module.exports=product;