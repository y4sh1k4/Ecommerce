const user=require("../model/userModel")
const {setUser}= require("../services/auth")
const {product}= require("../model/productModel")
const handleGetUser= async(req,res)=>{
    const users=await user.find({});
    try{
        res.status(201).json({users})
    }
    catch(e){
        res.json({error:e})
    }
}

const handleUserSignUp= async(req,res)=>{
    const {name,email,password,userType}= req.body;
    const newUser= new user({name,email,password,userType});
    try{
        await newUser.save();
        res.status(201).json({
            msg:"success"
        })
    }
    catch(e){
        res.json({
            error:e
        })
    }
}

const handleUserLogin= async(req,res)=>{
    const {email,password}= req.body;
    const findUser=await user.findOne({email,password})
    if(!findUser){
        res.json({
            msg:"Signup first"
        })
    }
    const token= setUser(findUser);
    res.cookie("token",token);
    res.json({
        msg:"success",
        user:findUser
    })
}

const handleAddToWishlist= async(req,res)=>{
    const {userId}= req.params;
    const {productId}=req.body;
    const addedProduct =await product.findById(productId);
    const userById= await user.findById(userId);
    try{
        const AddToWishlist= await user.findByIdAndUpdate(userId,{wishlist:[...userById.wishlist,productId]});
        res.status(200).json({
            msg:"success",
            updated:AddToWishlist
        })
    }
    catch(e){
        res.json({
            error:e
        })
    }
}

const handleAddToCart= async(req,res)=>{
    const {userId}= req.params;
    const {productId}=req.body;
    const addedProduct =await product.findById(productId);
    const userById= await user.findById(userId);
    try{
        const AddToCart= await user.findByIdAndUpdate(userId,{cart:[...userById.cart,addedProduct]});
        res.status(200).json({
            msg:"success",
            updated:AddToCart
        })
    }
    catch(e){
        res.json({
            error:e
        })
    }
}



module.exports={handleGetUser,handleUserLogin,handleUserSignUp,handleAddToWishlist,handleAddToCart};
