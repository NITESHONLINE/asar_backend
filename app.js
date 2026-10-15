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
app.get('/product', async (req, res) => {
    const product = await Product.find();
    res.json({
        message: "Successfully fetched product.",
        data: product
    })
})

// get single product 

app.get('/product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const singleProduct = await Product.findById(id);

        if (!singleProduct) {
            res.json({
                message: "Product not found."
            })
        }
        res.json({
            message: "Product fetched success.",
            data: singleProduct
        })
    } catch (error) {
        res.json({
            message: "Server error",
            error: error.message
        })
    }

})


// delete product 
app.delete('/product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            res.json({
                message: "Product not found."
            })
        }
        res.json({
            message: "Product deleted successfully."
        })
    } catch (error) {
        res.json({
            message: "Server error",
            error: error.message
        })
    }
})


app.patch('/product/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const {name, price,description,image} = req.body;

        await Product.findByIdAndUpdate(id, {name, price,description,image})

        res.json({
            message:"Product updated succesfully."
        })
    } catch (error) {
        res.json({
            message: "Server error",
            error: error.message
        })
    }
})




// create product 
app.post('/product', async (req, res) => {
    const { name, price, description, image } = req.body;

    const product = await Product.create({ name, price, description, image })

    res.json({
        message: "Product created successfully.",
        data: product
    })
})




app.listen(process.env.PORT, () => {
    console.log("Server started on port 3000");
})

