const express= require("express");
const mongoose= require("mongoose");
const app=express();
const PORT=3000;

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

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.listen(PORT,()=>{
    console.log(`server started on port ${PORT}`);
})