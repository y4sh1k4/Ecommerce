const express= require("express");
const mongoose= require("mongoose");
const app=express();
const PORT=3000;
const productRoute= require("./router/productRouter")
const userRoute= require("./router/userRouter")
const sellerRoute= require("./router/sellerRouter")
const cookieParser= require("cookie-parser");
const {checkUserAuth,restrictTo}= require('./middleware/auth')

async function main(){
    mongoose.connect("mongodb+srv://Yashika:Yashi143@cluster0.e0qj0bd.mongodb.net/Ecommerce?retryWrites=true&w=majority&appName=Cluster0")
}

main()
.then(()=>{
    console.log("database connected")
})
.catch((e)=>{
    console.log(e);
})

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/user",userRoute);
app.use(checkUserAuth)
app.use("/product",restrictTo(["Buyer"]),productRoute);
app.use("/seller",restrictTo(["Seller"]),sellerRoute);

app.listen(PORT,()=>{
    console.log(`server started on port ${PORT}`);
})