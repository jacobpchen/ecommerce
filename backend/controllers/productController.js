const Product = require('../models/products')

const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')

// Create new product =>  / api/v1/admin/product/new
exports.newProduct = catchAsyncErrors (async (req, res, next) => {
    
    // Get the req.body and save it as product
    const product = await Product.create(req.body)

    res.status(201).json({
        success: true,
        product
    })
})

// Get all products => /api/v1/products
exports.getProducts = catchAsyncErrors (async (req, res, next) => {

    // Gets all the products in the collection
    const products = await Product.find()

    res.status(200).json({
        success: true,
        count: products.length,
        products
    })
})

// Get single product details => /api/v1/product/:id
exports.getSingleProduct = catchAsyncErrors (async (req, res, next) => {

    const product = await Product.findById(req.params.id)

    // If the product doesn't exist send 404 error message
    if(!product){
        return next(new ErrorHandler('Product not found', 404))
    }

    res.status(200).json({
        success: true,
        product
    })
})

// Update Product => /api/v1/admin/product/:id
exports.updateProduct =catchAsyncErrors ( async(req, res, next) => {

    // find product
    let product = await Product.findById(req.params.id)

    // If the product doesn't exist send 404 error message
    if(!product){
        return next(new ErrorHandler('Product not found', 404))
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body,{
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        product
    })
})

// Delete Product => /api/v1/admin/product/:id
exports.deleteProduct = catchAsyncErrors (async(req, res, next) => {

    // find product
    const product = await Product.findById(req.params.id)

    // If the product doesn't exist send 404 error message
    if(!product){
        return next(new ErrorHandler('Product not found', 404))
    }

    await product.remove()

    res.status(200).json({
        success:true,
        message: 'Product is deleted.'
    })
})