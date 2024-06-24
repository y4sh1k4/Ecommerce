const jwt = require("jsonwebtoken");
const secret_key="Yashi@143";
const setUser= (user)=>{
    console.log(user);
    return jwt.sign({
        email:user.email,
        password:user.password
    },secret_key)
}
const getUser= (token)=>{
    console.log(token);
    return jwt.verify(token,secret_key);
}
module.exports={setUser,getUser};
