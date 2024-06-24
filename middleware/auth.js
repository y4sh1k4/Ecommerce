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

module.exports={checkUserAuth};