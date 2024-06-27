const mongoose= require("mongoose");
const { productSchema } = require("./productModel");
const { v4: uuidv4 } = require('uuid');
const sellerSchema= new mongoose.Schema({
    "id":{
        type:String,
        unique:true,
        default:uuidv4
    },
    "pan_card":{
        pan_number:String,
        pan_name:String,
        pan_image:String
    },
    "gst":{
        type:String,
        unique:true
    },
    "business_info":{
        location:String,
        b_type:{
            type:String,
            enum:["state-owned Business","publicly-owned","privately-owned","charity","none"]
        },
        b_name:String
    },
    "personal_info":{
        name:String,
        country:String,
        dob:Date,
        zip:Number,
        State:String
    },
    "bank_account":{
        holder:String,
        institution:String,
        account_no:Number
    },
    "store_name":{
        type:String
    },
    "products":{
        type: [mongoose.ObjectId]
    }
})
const seller= mongoose.model("seller",sellerSchema)
module.exports=seller;