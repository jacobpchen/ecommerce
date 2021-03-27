const Product = require('../models/products')

// Create new product =>  / api/v1/product/new
exports.newProduct = async (req, res, next) => {
    
    // Get the req.body and save it as product
    const product = await Product.create(req.body)

    res.status(201).json({
        success: true,
        product
    })
}

exports.getProducts = (req, res, next) => {
    res.status(200).json({
        success: true,
        message: 'This route will show all products in database'
    })
}