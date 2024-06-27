const seller= require("../model/sellerModel");
const { product } = require("../model/productModel");

const handleGetSellers= async(req,res)=>{
    const getSeller =await seller.find({});
    try{
        res.status(200).json({
            getSeller
        })
    }
    catch(e){
        res.json({
            error:e
        })
    }
}

const handleGetSellerById= async(req,res)=>{
    const {id}= req.params;
    const getSeller =await seller.findById(id);
    try{
        res.status(200).json({
            getSeller
        })
    }
    catch(e){
        res.json({
            error:e
        })
    }
}

const handlePostSeller= async(req,res)=>{
    const {pan_number,pan_name,pan_image,gst,location,b_type,b_name,name,country,dob,zip,state,holder,institution,account_no,store_name}= req.body;
    const newSeller = new seller({pan_card:{
        pan_number:pan_number,
        pan_name:pan_name,
        pan_image:pan_image
    },gst,business_info:{
        location:location,
        b_type:b_type,
        b_name:b_name
    },personal_info:{
        name:name,
        country:country,
        dob:dob,
        zip:zip,
        State:state
    },bank_account:{
        holder:holder,
        institution:institution,
        account_no:account_no
    },store_name});
    try{
        await newSeller.save();
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

const handlePostProduct = async (req, res) => {
    const {id}=req.params;
    const getSeller = await seller.findById(id);
    const {
      pname,
      pimage,
      brand,
      colour,
      special_feature,
      dimensions,
      prate,
      category,
      pspecifications,
    } = req.body;
    const newproduct = new product({
      pname,
      pimage,
      pdetails: {
        brand: brand,
        colour: colour,
        feature: special_feature,
        dimensions: dimensions,
      },
      pspecifications,
      prate,
      category,
    });
    try {
      await newproduct.save();
      const updatedSeller = await seller.findByIdAndUpdate(id,{products:[...getSeller.products,newproduct._id]});
      res.status(201).json({
        msg: "Success",
        upadated:updatedSeller
      });
    } 
    catch (e) {
      res.json({
        error: e,
      });
    }
  };

const handleUpdateProduct= async(req,res)=>{
    const {productId}= req.params;
    const {sellerId}= req.body;
    const findProduct =await product.findById(productId);
    const getSeller = await seller.findById(sellerId);
    const {
        pname,
        pimage,
        brand,
        colour,
        special_feature,
        dimensions,
        prate,
        category,
        pspecifications,
      } = req.body;
      try{
        getSeller.products.map(async(p)=>{
            if(p.toString()==productId){
                const updatedProduct=await product.findByIdAndUpdate(productId,{
                    pname,
                    pimage,
                    pdetails: {
                      brand: brand,
                      colour: colour,
                      feature: special_feature,
                      dimensions: dimensions,
                    },
                    prate,
                    category,
                    pspecifications,
                })
                res.status(200).json({
                    msg:"success",
                    updted:updatedProduct
                })
            
            }
        })
    }       
    
    catch(e){
        res.json({
            msg:"access not allowed"
        })
    }
}

const handleDeleteProduct= async(req,res)=>{
    const {productId}= req.params;
    const {sellerId}= req.body;
    const findProduct =await product.findById(productId);
    const getSeller = await seller.findById(sellerId);
    getSeller.products.map(async(p)=>{
        if(p.toString()==productId){
            try{
                const deletedProduct=await product.findByIdAndDelete(productId)
                const updatedArray = getSeller.products.filter((id)=>id!=p.toString())
                const updatedSeller = await seller.findByIdAndUpdate(sellerId,{products:[...updatedArray]});
                res.status(200).json({
                    msg:"success",
                    updated:getSeller
                })
            }
            catch(e){
                res.json({
                    error:e
                })
            }
        }
    })
}

module.exports={handleGetSellers,handleGetSellerById,handlePostProduct,handleDeleteProduct,handlePostSeller,handleUpdateProduct}