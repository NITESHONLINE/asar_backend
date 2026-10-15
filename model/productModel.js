const mongoose = require('mongoose');

const productShcema = new mongoose.Schema({
    name:String,
    price:Number,
    description:String,
    image:String
})

const Product = mongoose.model( "Product", productShcema );

module.exports = Product;