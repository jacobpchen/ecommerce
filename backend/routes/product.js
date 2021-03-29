const express = require('express')
const router = express.Router()

const { 
    getProducts, 
    newProduct,
    getSingleProduct,
    updateProduct, 
    deleteProduct
    } = require('../controllers/productController')

const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth')

// All users
router.route('/products').get(getProducts)
router.route('/product/:id').get(getSingleProduct)

// Admin 
router.route('/admin/product/new').post(isAuthenticatedUser, authorizeRoles('admin'), newProduct)
router.route('/admin/product/:id')
    .put(isAuthenticatedUser, authorizeRoles('admin'),  updateProduct)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct)

module.exports = router