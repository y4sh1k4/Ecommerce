const mongoose= require("mongoose");
const { v4: uuidv4 } = require('uuid');
const productSchema= new mongoose.Schema({
    "id":{
        type: String,
        default: uuidv4,
        unique:true
    },
    "pname":{
        type:String,
        required:true
    },
    "pimage":{
        type:String,
        required:true
    },
    "pdetails":{
        brand:String,
        colour:String,
        feature:String,
        dimensions:String
    },
    "pspecifications":{
        type:mongoose.Schema.Types.Mixed
    },
    "prate":{
        type:Number,
        required:true
    },
    "prating":{
        type:[Number]
    },
    "preview":{
        type:[String]
    },
    "category":{
        type:String,
        enum:['Toys','Grinder','Gifts','Bags','All'],
        default:'All'
    }
})
const product= mongoose.model('product',productSchema)
module.exports={product,productSchema};