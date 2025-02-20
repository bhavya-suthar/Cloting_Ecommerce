const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  image: String,
  title: String,
  description: Sring,
  category: String,
  brand: String,
  price: number,
  salePrice: number,
  totalStock: number,
},{timestamps:true});


module.exports = mongoose.model('Product',ProductSchema)