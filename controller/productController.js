const { product } = require("../model/productModel");
const user = require("../model/userModel");

const handleGetProduct = async (req, res) => {
  const findProduct = await product.find({});
  try {
    res.status(200).json({ findProduct });
  } catch (e) {
    res.json({ error: "e" });
  }
};
const handleGetProductByCategory = async (req, res) => {
  const { category } = req.body;
  const products = await product.find({ category });
  try {
    res.status(200).json({ products });
  } catch (e) {
    res.json({ error: e });
  }
};
const handleGetProductByPrice = async (req, res) => {
  const findProduct = await product.find({});
  const { minprice, maxprice } = req.body;
  const products = findProduct.filter(
    (p) => p.prate >= minprice && p.prate <= maxprice
  );
  try {
    res.status(200).json({ products });
  } catch (e) {
    res.json({ error: e });
  }
};

const handleGetProductByName = async (req, res) => {
  const { name } = req.body;
  const products = await product.find({ pname: name });
  try {
    res.status(200).json({ products });
  } catch (e) {
    res.json({ error: e });
  }
};

const handlePostProduct = async (req, res) => {
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
    res.status(201).json({
      msg: "Success",
    });
  } catch (e) {
    res.json({
      error: e,
    });
  }
};

const handlePostReviewAndRating = async (req, res) => {
  const { rating, review } = req.body;
  const { id } = req.params;
  console.log(id);
  try {
    const productById= await product.findById(id);
    const reviewAndRating = await product.findByIdAndUpdate(id,{preview:[...productById.preview,review], prating:[...productById.prating,rating]});
    res.status(201).json({
      updated: reviewAndRating,
      msg: "success",
    });
  } catch (e) {
    res.json({
      error: e,
    });
  }
};

module.exports = {
  handleGetProduct,
  handleGetProductByCategory,
  handleGetProductByName,
  handleGetProductByPrice,
  handlePostProduct,
  handlePostReviewAndRating,
};
