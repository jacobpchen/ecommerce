const jwt = require('jsonwebtoken');
const user = require('../models/user');
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");

// Checks if the user is authenticated or not
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {

    // authenticate the user on the back end
    const {token} = req.cookies
    
    if(!token){
        return next(new ErrorHandler('Please log in first.', 401))
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await user.findById(decoded.id)
    next()

})