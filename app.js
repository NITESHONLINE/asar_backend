require('dotenv').config()
const express = require('express');
const mongodbConnect = require('./database');
const Product = require('./model/productModel');

const app = express();
app.use(express.json())

// databse connect 
mongodbConnect()

// app.http_verbs( path, function)

// get all product 
app.get('/product', async(req,res)=>{
    const product = await Product.find();
    res.json({
        message: "Successfully fetched product.",
        data:product
    }) 
})

// create product 
app.post( '/product',  async(req,res)=>{
    const {name,price, description, image} = req.body;

    const product = await Product.create({ name,price, description, image})

    res.json({
        message: "Product created successfully.",
        data: product
    }) 
})




app.listen(process.env.PORT, ()=>{
    console.log("Server started on port 3000");
})

