const user=require("../model/userModel")
const {setUser}= require("../services/auth")
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
    const {name,email,password}= req.body;
    const newUser= new user({name,email,password});
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
    res.json(findUser)
}

module.exports={handleGetUser,handleUserLogin,handleUserSignUp};
