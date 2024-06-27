const {getUser}= require('../services/auth');

const checkUserAuth = async(req,res,next)=>{
    const token= req.cookies?.token;
    if(!token){
        return res.json({
            msg:"user not logged in "
        })
    }
    try{
        const user = getUser(token);
        req.user= user;
        next();
    }
    catch(e){
        return res.status(401).json({
            msg: "Invalid token"
        });
    }
}

const restrictTo=(roles)=>{
    return function (req,res,next){
        if(!req.user){
            return res.json({
                msg:"user not logged in"
            })
        }
        console.log(req.user);
        if(!roles.includes(req.user.userType)){
            return res.json({
                msg:"unauthorized"
            })
        }
        return next();
    }
}






module.exports={checkUserAuth,restrictTo};